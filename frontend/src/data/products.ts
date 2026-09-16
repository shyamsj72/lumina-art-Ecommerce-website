import { CategoryData, Product } from '../types';

export const CATEGORIES_DATA: CategoryData[] = [
  {
    category: 'Name Boards',
    slug: 'name-boards',
    description:
      'Premium custom CNC-cut name board. High quality, weather-resistant, and beautifully designed to make your entrance stand out.',
    icon: 'Layers',
    accentColor: '#DCF763', // Lime accent from nitec design
    products: [
      { name: 'Live-Edge Wooden Name Board (തെക്കേമഠം)', image: '/nameboard1.png' },
      { name: 'Black Acrylic Family Name Board (സ്നേഹനിലയം)', image: '/nameboard2.png' },
      { name: 'Two-Tone Teak & Om Wooden Board (ആദിശിവം)', image: '/nameboard3.png' },
      { name: 'Lord Krishna Gokulam Gold Inlay Board (Gokulam)', image: '/nameboard4.png' },
      { name: 'Golden Brass House Crest (Baith Al Nihmath)', image: '/nameboard5.png' },
      { name: 'Rustic Wooden Christ & Dove Plaque (കല്ലടയിൽ)', image: '/nameboard6.png' },
      { name: 'Cottage Silhouette Wooden Board (അനിൽ കെ സജി)', image: '/nameboard7.png' },
      { name: 'Trishul Motif Live-Edge Plaque (ദേവികൃപ)', image: '/nameboard8.png' },
      { name: 'Gabled Cottage Wood Sign (Sree Chithira)', image: '/nameboard9.png' },
      { name: 'Botanical Rose Floral Plate (Mohabbat)', image: '/nameboard10.png' },
      { name: 'Traditional Kerala Roof Board (Shifana Manzil)', image: '/nameboard11.png' },
      { name: 'Glossy Gold Arabic Calligraphy (ما شاء الله)', image: '/nameboard12.png' },
      { name: 'Royal Oval Walnut & Gold Crest (കുടുംബം)', image: '/kudumbam_royal_oval_1789380588818.png' },
      { name: 'Architectural Dual-Layer Acrylic Sign', image: '/nameboard14.png' },
    ],
    variants: [
      { thickness: '2mm', price: 549.0 },
      { thickness: '4mm', price: 850.0 },
    ],
  },
  {
    category: 'CNC Jali Cutting',
    slug: 'cnc-jali-cutting',
    description:
      'Architectural CNC jali screens & decorative lattice wall partitions custom-machined for residences, temples, and luxury interiors.',
    icon: 'Grid',
    accentColor: '#FBBF24',
    products: [
      { name: 'CNC Jali Architectural Panel - Design 1', image: '/product1.png' },
      { name: 'Geometric CNC Lattice Screen - Design 2', image: '/product2.png' },
      { name: 'Floral Motif CNC Partition - Design 3', image: '/product3.png' },
    ],
    variants: [
      { thickness: '6mm', price: 1250.0 },
      { thickness: '12mm', price: 2200.0 },
    ],
  },
  {
    category: 'Laser Cutting',
    slug: 'laser-cutting',
    description:
      'Micro-precision laser cut acrylic keychains, gift boxes, industrial templates, and artistic silhouette keepsakes.',
    icon: 'Scissors',
    accentColor: '#38BDF8',
    products: [
      { name: 'Custom Engraved Acrylic Keychain', image: '/keychain.png' },
      { name: 'Laser-Cut Wooden Keepsake Box', image: '/box.png' },
      { name: 'Precision Laser Cut Desk Emblem', image: '/product4.png' },
      { name: 'Decorative Acrylic Mandala Cutout', image: '/product5.png' },
    ],
    variants: [
      { thickness: '3mm', price: 299.0 },
      { thickness: '5mm', price: 499.0 },
    ],
  },
  {
    category: 'Wood & Acrylic Craft',
    slug: 'wood-acrylic-craft',
    description:
      'Handcrafted blend of rich organic hardwoods and glossy cast acrylics for bespoke tabletop organizers, awards, and artistic wall decor.',
    icon: 'Sparkles',
    accentColor: '#FB923C',
    products: [
      { name: 'Dual-Layer Acrylic & Teak Desk Organizer', image: '/product6.png' },
      { name: 'Minimalist Silhouette Wall Accent Clock', image: '/product7.png' },
      { name: 'Custom Silhouette Tabletop Memento', image: '/product8.png' },
    ],
    variants: [
      { thickness: '4mm', price: 699.0 },
      { thickness: '8mm', price: 1150.0 },
    ],
  },
  {
    category: 'LED Signage',
    slug: 'led-signage',
    description:
      'High-impact neon flex and backlit 3D acrylic signage engineered for storefronts, cafes, modern studios, and exhibition booths.',
    icon: 'Zap',
    accentColor: '#A855F7',
    products: [
      {
        name: '99 Names of Allah Concentric Halo LED Sign (Asma-ul-Husna)',
        image: '/led_names_allah_1789384084474.jpg',
      },
      {
        name: 'Ayat al-Kursi Dual-Tone Illuminated Crescent LED Plaque',
        image: '/led_ayat_kursi_1789384103815.jpg',
      },
      { name: 'Neon-Flex Glow Custom Signage', image: '/sign.png' },
      { name: 'Backlit 3D Acrylic Boutique Lettering', image: '/product9.png' },
      { name: 'Edge-Lit Acrylic Floating Logo Plaque', image: '/product10.png' },
    ],
    variants: [
      { thickness: '12" Diameter (Warm Gold 12V)', price: 1899.0 },
      { thickness: '18" Diameter (Warm Gold 12V)', price: 2999.0 },
      { thickness: '24" Diameter (Dual Halo Glow)', price: 4499.0 },
    ],
  },
  {
    category: 'Acrylic Clocks',
    slug: 'acrylic-clocks',
    description:
      'Precision laser-crafted dual-tone acrylic wall clocks featuring artistic optical silhouettes, embossed brushed gold Roman numerals, and silent sweep quartz movements.',
    icon: 'Clock',
    accentColor: '#F59E0B',
    products: [
      {
        name: 'Monochrome Silhouette Dual-Tone Acrylic Clock (Roman Gold)',
        image: '/acrylic_wall_clock_1789385759022.jpg',
        keywords: [
          'gift your favorite person',
          'gift yout favaorite person',
          'favorite person',
          'gift',
          'acrylic clock',
          'wall clock',
          'silhouette clock',
          'anniversary gift',
          'birthday gift',
          'couple gift',
          'personalized gift',
        ],
      },
      {
        name: 'Hexagonal Floating Clear Acrylic Silhouette Clock (Rose Gold)',
        image: '/acrylic_hex_clock_1789386467214.jpg',
        keywords: [
          'gift your favorite person',
          'gift yout favaorite person',
          'favorite person',
          'gift',
          'acrylic clock',
          'hexagonal clock',
          'rose gold clock',
          'floating clock',
          'luxury gift',
          'anniversary gift',
          'personalized gift',
        ],
      },
    ],
    variants: [
      { thickness: '12" (30cm) Silent Quartz', price: 1299.0 },
      { thickness: '16" (40cm) Silent Quartz', price: 1899.0 },
      { thickness: '20" (50cm) Silent Quartz', price: 2699.0 },
    ],
  },
];

// Popular suggested search keywords & quick filters
export const POPULAR_SEARCH_KEYWORDS = [
  'gift your favorite person',
  'acrylic clocks',
  'personalized gifts',
  'led signage',
  'name boards',
  'wooden keepsake',
];

const DEFAULT_CATEGORY_KEYWORDS: Record<string, string[]> = {
  'acrylic-clocks': [
    'gift your favorite person',
    'gift yout favaorite person',
    'gift',
    'favorite person',
    'acrylic clocks',
    'wall clocks',
    'silent quartz',
    'personalized gift',
    'anniversary gift',
    'romantic gift',
    'silhouette clock',
    'home decor',
  ],
  'name-boards': [
    'gift your favorite person',
    'gift yout favaorite person',
    'gift',
    'favorite person',
    'name boards',
    'entrance board',
    'housewarming gift',
    'family gift',
    'custom nameplate',
    'wooden board',
    'acrylic sign',
  ],
  'laser-cutting': [
    'gift your favorite person',
    'gift yout favaorite person',
    'gift',
    'favorite person',
    'laser cutting',
    'keepsake box',
    'custom keychain',
    'engraved gift',
    'desk emblem',
  ],
  'wood-acrylic-craft': [
    'gift your favorite person',
    'gift yout favaorite person',
    'gift',
    'favorite person',
    'wood craft',
    'tabletop memento',
    'desk organizer',
    'anniversary gift',
    'personalized gift',
  ],
  'led-signage': [
    'gift your favorite person',
    'gift yout favaorite person',
    'gift',
    'favorite person',
    'led signage',
    'neon sign',
    'backlit plaque',
    'room decor gift',
    'custom neon',
  ],
  'cnc-jali-cutting': [
    'cnc jali',
    'lattice screen',
    'partition panel',
    'interior screen',
    'architectural decor',
  ],
};

// Flattened product catalog with unique IDs and computed price ranges
export const ALL_PRODUCTS: Product[] = CATEGORIES_DATA.flatMap((catGroup) => {
  return catGroup.products.map((item, index) => {
    const minPrice = Math.min(...catGroup.variants.map((v) => v.price));
    const maxPrice = Math.max(...catGroup.variants.map((v) => v.price));
    const id = `${catGroup.slug}-${index + 1}`;

    // Select featured / bestseller badges based on user's layout needs
    const isHero = id === 'name-boards-1';
    const isBestSeller = id === 'name-boards-3';
    const isPopularSpotlight = id === 'laser-cutting-2'; // Wooden keepsake box
    const isFeaturedCategory = catGroup.slug === 'led-signage' && index === 0;
    const isNewClockArrival = catGroup.slug === 'acrylic-clocks' && index === 0;

    let badge: string | undefined;
    let badgeType: 'lime' | 'orange' | 'blue' | 'dark' | undefined;

    if (isHero) {
      badge = 'Featured Choice';
      badgeType = 'lime';
    } else if (isBestSeller) {
      badge = 'Best Seller';
      badgeType = 'orange';
    } else if (isPopularSpotlight) {
      badge = 'Popular Craft';
      badgeType = 'lime';
    } else if (isFeaturedCategory) {
      badge = 'New Arrival';
      badgeType = 'blue';
    } else if (isNewClockArrival) {
      badge = 'New Craft';
      badgeType = 'orange';
    }

    const defaultKeywords = DEFAULT_CATEGORY_KEYWORDS[catGroup.slug] || [];
    const itemKeywords = item.keywords || [];
    const combinedKeywords = Array.from(new Set([...defaultKeywords, ...itemKeywords]));

    return {
      id,
      name: item.name,
      category: catGroup.category,
      categorySlug: catGroup.slug,
      image: item.image,
      description: catGroup.description,
      variants: catGroup.variants,
      minPrice,
      maxPrice,
      isFeatured: isHero,
      isBestSeller,
      badge,
      badgeType,
      keywords: combinedKeywords,
    };
  });
});

export const HERO_PRODUCT = ALL_PRODUCTS.find((p) => p.id === 'name-boards-1') || ALL_PRODUCTS[0];
export const BEST_SELLER_PRODUCT = ALL_PRODUCTS.find((p) => p.id === 'name-boards-3') || ALL_PRODUCTS[2];
export const POPULAR_SPOTLIGHT_PRODUCT = ALL_PRODUCTS.find((p) => p.id === 'laser-cutting-2') || ALL_PRODUCTS[18];
export const FEATURED_CATEGORY_PRODUCT = ALL_PRODUCTS.find((p) => p.categorySlug === 'led-signage') || ALL_PRODUCTS[24];
