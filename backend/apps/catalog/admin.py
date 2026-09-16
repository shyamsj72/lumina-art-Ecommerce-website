from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Category, Product, ProductVariant, ProductImage

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order')
    list_editable = ('order',)
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="100" height="auto" />')
        return "No Image"
    image_preview.short_description = 'Preview'

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'thumbnail', 'name', 'category', 'get_min_price', 'get_max_price', 
        'is_active', 'is_featured', 'is_best_seller'
    )
    list_editable = ('is_active', 'is_featured', 'is_best_seller')
    list_filter = ('category', 'is_active', 'is_featured', 'is_best_seller', 'badge_type')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductVariantInline, ProductImageInline]

    def get_min_price(self, obj):
        return obj.min_price
    get_min_price.short_description = 'Min Price'

    def get_max_price(self, obj):
        return obj.max_price
    get_max_price.short_description = 'Max Price'

    def thumbnail(self, obj):
        img = obj.primary_image
        if img and img.image:
            return mark_safe(f'<img src="{img.image.url}" width="50" height="auto" />')
        return "-"
    thumbnail.short_description = 'Image'
