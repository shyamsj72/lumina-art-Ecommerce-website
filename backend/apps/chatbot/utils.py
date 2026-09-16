from django.core.cache import cache
from apps.catalog.models import Category, Product

def build_knowledge_context():
    cache_key = 'chatbot_knowledge_context'
    context = cache.get(cache_key)

    if context:
        return context

    # 1. Business & WhatsApp intro
    lines = [
        "Lumina Art is a custom acrylic and wood CNC-craft showroom.",
        "To place an order, customers should browse products, add to cart, and tap checkout. This will open WhatsApp with their order pre-filled.",
        "We also offer Custom Designs. Customers can upload a reference image on the Custom Design page, describe their requirements, and receive a quote and mock-up.",
        "Our contact/WhatsApp number is +918590729342.",
        "\n--- PRODUCT CATALOG ---"
    ]

    # 2. Categories
    categories = Category.objects.all()
    for cat in categories:
        lines.append(f"\nCategory: {cat.name} - {cat.description}")
        products = Product.objects.filter(category=cat, is_active=True)
        if not products:
            lines.append(" (No products currently available)")
            continue

        for p in products:
            price_min = p.min_price
            price_max = p.max_price
            thicknesses = ", ".join(set(v.thickness for v in p.variants.all() if v.thickness))
            
            p_line = f" - {p.name}: {p.description[:100]}... Price: Rs. {price_min}"
            if price_max > price_min:
                p_line += f" - Rs. {price_max}"
            if thicknesses:
                p_line += f" (Thicknesses: {thicknesses})"
            lines.append(p_line)

    context = "\n".join(lines)
    
    # Cache for 15 minutes
    cache.set(cache_key, context, timeout=15 * 60)
    
    return context
