from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = {
        'category__slug': ['exact'],
        'is_featured': ['exact'],
        'is_best_seller': ['exact'],
    }
    search_fields = ['name', 'description', 'keywords']

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage
from django.conf import settings

class SendCustomDesignEmailView(APIView):
    def post(self, request, *args, **kwargs):
        name = request.data.get('name', '')
        phone = request.data.get('phone', '')
        email = request.data.get('email', '')
        material = request.data.get('material', '')
        size = request.data.get('size', '')
        customization_details = request.data.get('customizationDetails', '')
        
        file = request.FILES.get('file')

        subject = f"Custom Design Request - {name}"
        body = (
            f"Hi Lumina Art Team,\n\n"
            f"New custom design quote request:\n\n"
            f"Name: {name}\n"
            f"Phone/WhatsApp: {phone}\n"
            f"Email: {email}\n"
            f"Preferred Material: {material}\n"
            f"Dimensions: {size}\n\n"
            f"Customization Requirements:\n{customization_details}\n\n"
        )

        email_message = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.EMAIL_HOST_USER or 'noreply@luminaart.com',
            to=['luminaart0@gmail.com'],
            reply_to=[email] if email else None
        )

        if file:
            email_message.attach(file.name, file.read(), file.content_type)

        try:
            email_message.send(fail_silently=False)
            return Response({'status': 'success', 'message': 'Email sent successfully.'})
        except Exception as e:
            return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

