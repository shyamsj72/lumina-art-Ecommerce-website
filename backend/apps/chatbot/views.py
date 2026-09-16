from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django.conf import settings
from .models import ChatConversation, ChatMessage
from .utils import build_knowledge_context
from google import genai
from google.genai import types

class ChatbotThrottle(AnonRateThrottle):
    scope = 'chatbot'

class ChatMessageView(APIView):
    throttle_classes = [ChatbotThrottle]

    def post(self, request, *args, **kwargs):
        session_id = request.data.get('sessionId')
        user_message = request.data.get('message', '').strip()

        if not user_message:
            return Response({'error': 'Message cannot be empty.'}, status=400)

        # Get or create conversation
        if session_id:
            try:
                conversation = ChatConversation.objects.get(session_id=session_id)
            except ChatConversation.DoesNotExist:
                conversation = ChatConversation.objects.create()
        else:
            conversation = ChatConversation.objects.create()

        session_id_str = str(conversation.session_id)

        # Retrieve last 6 messages
        recent_messages = list(conversation.messages.order_by('-created_at')[:6])
        recent_messages.reverse()

        # Build Gemini context
        knowledge_context = build_knowledge_context()

        system_instruction = (
            "You are 'Lumina', the friendly AI assistant for Lumina Art, a custom acrylic and wood CNC-craft showroom.\n"
            "Only answer using the catalog/business info provided in this prompt. If something isn't in it, say you're not sure and suggest the customer ask on WhatsApp. Never invent a product, price, or policy.\n"
            "Keep replies short (2-4 sentences) and conversational, matching a small craft business's warm tone, not a corporate support bot.\n"
            "If the customer wants to actually place an order, tell them to add the item to their cart and use the checkout button, which opens WhatsApp directly with their order pre-filled — don't try to 'take' an order yourself.\n"
            "Never claim to be human; if asked, say you're Lumina, an AI assistant for the shop.\n\n"
            f"--- KNOWLEDGE BASE ---\n{knowledge_context}"
        )

        # Save user message
        ChatMessage.objects.create(conversation=conversation, role='user', content=user_message)

        try:
            client = genai.Client(api_key=settings.GEMINI_API_KEY)
            
            # Format history for Gemini SDK
            history = []
            for msg in recent_messages:
                # model role in db is 'model', user is 'user'
                history.append(types.Content(role=msg.role, parts=[types.Part.from_text(text=msg.content)]))
            
            # Create a chat session
            chat = client.chats.create(
                model="gemini-3.5-flash-lite",
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    max_output_tokens=300,
                    temperature=0.7,
                )
            )
            
            # If we had a history, we can either pass it in initialization or send the messages
            # The genai SDK supports passing history when creating chat!
            if history:
                chat = client.chats.create(
                    model="gemini-3.5-flash-lite",
                    config=types.GenerateContentConfig(
                        system_instruction=system_instruction,
                        max_output_tokens=300,
                        temperature=0.7,
                    ),
                    history=history
                )
            
            response = chat.send_message(user_message)
            bot_reply = response.text

            # Save bot reply
            ChatMessage.objects.create(conversation=conversation, role='model', content=bot_reply)

            return Response({
                'sessionId': session_id_str,
                'reply': bot_reply
            })
        except Exception as e:
            # Handle rate limiting / quota / unexpected errors gracefully
            print(f"Gemini API Error: {e}")
            canned_reply = "I'm getting a lot of questions right now — tap here to chat with us directly on WhatsApp!"
            return Response({
                'sessionId': session_id_str,
                'reply': canned_reply,
                'rateLimited': True
            })
