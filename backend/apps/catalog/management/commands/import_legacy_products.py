import json
import os
from pathlib import Path
from django.core.management.base import BaseCommand
from django.core.files import File
from apps.catalog.models import Category, Product, ProductVariant, ProductImage
from django.conf import settings

class Command(BaseCommand):
    help = 'Import legacy products from JSON fixture'

    def handle(self, *args, **options):
        fixture_path = os.path.join(settings.BASE_DIR, 'apps', 'catalog', 'fixtures', 'legacy_products.json')
        if not os.path.exists(fixture_path):
            self.stdout.write(self.style.ERROR(f'Fixture file not found: {fixture_path}'))
            return

        with open(fixture_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        frontend_dir = settings.BASE_DIR.parent
        public_dir = frontend_dir / 'public'
        
        # Clear existing data for a clean import
        self.stdout.write('Clearing existing catalog data...')
        Product.objects.all().delete()
        Category.objects.all().delete()

        self.stdout.write('Importing categories...')
        cat_order = 0
        categories_map = {}
        for c in data['categories']:
            cat, created = Category.objects.get_or_create(
                slug=c['slug'],
                defaults={
                    'name': c['category'],
                    'description': c['description'],
                    'icon': c['icon'],
                    'accent_color': c['accentColor'],
                    'order': cat_order
                }
            )
            cat_order += 1
            categories_map[c['slug']] = cat

        self.stdout.write('Importing products, variants, and images...')
        for p in data['products']:
            cat = categories_map.get(p['categorySlug'])
            if not cat:
                continue
            
            prod = Product.objects.create(
                category=cat,
                name=p['name'],
                slug=p['id'],
                description=p['description'],
                keywords=p['keywords'],
                is_featured=p.get('isFeatured', False),
                is_best_seller=p.get('isBestSeller', False),
                badge=p.get('badge'),
                badge_type=p.get('badgeType'),
                is_active=True
            )

            for order, v in enumerate(p['variants']):
                ProductVariant.objects.create(
                    product=prod,
                    thickness=v['thickness'],
                    price=v['price'],
                    order=order
                )

            img_path_str = p.get('image', '').lstrip('/')
            if img_path_str:
                local_img_path = public_dir / img_path_str
                if not local_img_path.exists():
                    local_img_path = frontend_dir / 'src' / 'assets' / 'images' / img_path_str

                if local_img_path.exists():
                    with open(local_img_path, 'rb') as img_file:
                        ProductImage.objects.create(
                            product=prod,
                            image=File(img_file, name=img_path_str),
                            is_primary=True,
                            order=0
                        )
                else:
                    self.stdout.write(self.style.WARNING(f"Image not found: {img_path_str} for {prod.name}"))

        self.stdout.write(self.style.SUCCESS('Successfully imported products!'))
