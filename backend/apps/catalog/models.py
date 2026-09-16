from django.db import models
from django.utils.translation import gettext_lazy as _
from django.db.models import Min, Max

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, help_text="Lucide icon name")
    accent_color = models.CharField(max_length=20, help_text="Hex color code (e.g. #DCF763)")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Product(models.Model):
    class BadgeType(models.TextChoices):
        LIME = 'lime', _('Lime')
        ORANGE = 'orange', _('Orange')
        BLUE = 'blue', _('Blue')
        DARK = 'dark', _('Dark')

    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    description = models.TextField()
    keywords = models.JSONField(default=list, blank=True, help_text="List of string keywords")
    is_featured = models.BooleanField(default=False)
    is_best_seller = models.BooleanField(default=False)
    badge = models.CharField(max_length=100, blank=True, null=True)
    badge_type = models.CharField(
        max_length=20, 
        choices=BadgeType.choices, 
        blank=True, 
        null=True
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

    @property
    def min_price(self):
        # We handle this property to avoid crashing if there are no variants,
        # but normally we'd annotate this in a queryset for efficiency.
        agg = self.variants.aggregate(min_p=Min('price'))
        return agg['min_p'] or 0

    @property
    def max_price(self):
        agg = self.variants.aggregate(max_p=Max('price'))
        return agg['max_p'] or 0
        
    @property
    def primary_image(self):
        img = self.images.filter(is_primary=True).first()
        if not img:
            img = self.images.first()
        return img


class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    thickness = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'price']

    def __str__(self):
        return f"{self.product.name} - {self.thickness}"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/%Y/%m/')
    is_primary = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-is_primary']

    def __str__(self):
        return f"Image for {self.product.name}"
