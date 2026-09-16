import uuid
from django.db import models

class ChatConversation(models.Model):
    session_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.session_id)


class ChatMessage(models.Model):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('model', 'Bot'), # Using 'model' to align with Gemini's terminology
    ]
    
    conversation = models.ForeignKey(ChatConversation, related_name='messages', on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"[{self.role}] {self.content[:50]}"
