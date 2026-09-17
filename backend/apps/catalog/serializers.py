from rest_framework import serializers
from .models import Category, Product, ProductVariant, ProductImage

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'slug', 'description', 'icon', 'accent_color']


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['thickness', 'price']


class ProductImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['image', 'is_primary']

    def get_image(self, obj):
        from django.conf import settings
        import os
        if obj.image:
            if not settings.DEBUG and not getattr(settings, 'CLOUDINARY_URL', None):
                return f"/{os.path.basename(obj.image.name)}"
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    min_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    max_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    image = serializers.SerializerMethodField()
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'slug', 'name', 'category', 'category_slug', 'description',
            'keywords', 'is_featured', 'is_best_seller', 'badge', 'badge_type',
            'variants', 'min_price', 'max_price', 'image', 'images'
        ]

    def get_image(self, obj):
        img = obj.primary_image
        if img and img.image:
            from django.conf import settings
            import os
            if not settings.DEBUG and not getattr(settings, 'CLOUDINARY_URL', None):
                return f"/{os.path.basename(img.image.name)}"
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(img.image.url)
            return img.image.url
        return None

    def to_representation(self, instance):
        # Override the id field to use the slug, keeping frontend compatibility
        data = super().to_representation(instance)
        data['id'] = data['slug']
        return data


class CategoryWithProductsSerializer(CategorySerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta(CategorySerializer.Meta):
        fields = CategorySerializer.Meta.fields + ['products']
