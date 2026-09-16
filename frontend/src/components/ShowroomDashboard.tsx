import React, { useState } from 'react';
import {
  ArrowUpRight,
  Layers,
  Grid,
  Scissors,
  Sparkles,
  Zap,
  Heart,
  Star,
  Flame,
  MessageCircle,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Clock,
  Gift,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Product, CategoryData } from '../types';

import { ProductImage } from './ProductImage';
import { openWhatsAppQuickOrder, openWhatsAppGeneralInquiry } from '../utils/whatsapp';

interface ShowroomDashboardProps {
  products: Product[];
  categories: CategoryData[];
  onSelectProduct: (product: Product) => void;
  onViewAllProducts: (categorySlug?: string, searchKeyword?: string) => void;
  onOpenReviews: () => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  onNavigateToCustomDesign?: () => void;
  onNavigateToContact?: () => void;
}

export const ShowroomDashboard: React.FC<ShowroomDashboardProps> = ({
  products,
  categories,
  onSelectProduct,
  onViewAllProducts,
  onOpenReviews,
  onToggleWishlist,
  isWishlisted,
  onNavigateToCustomDesign,
  onNavigateToContact,
}) => {
  const [stepperIndex, setStepperIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Steppers highlighting Lumina Art's genuine manufacturing process
  const stepperStories = [
    {
      num: '01',
      title: 'Precision CNC Cutting',
      desc: 'Computer numerical controlled micro-routing for crisp, razor-sharp geometric lines and deep relief engravings.',
      badge: 'Industrial Accuracy',
    },
    {
      num: '02',
      title: 'Weather-Proof Acrylic',
      desc: 'UV-resistant, waterproof cast acrylics engineered to withstand harsh sun, rain, and humidity outdoors.',
      badge: '100% Exterior Safe',
    },
    {
      num: '03',
      title: 'Fast Pan-India Dispatch',
      desc: 'Hand-buffed, bubble-armored packaging with express insured courier delivery right to your doorstep.',
      badge: 'Express Shipping',
    },
  ];

  const currentStep = stepperStories[stepperIndex];

  const heroProduct = products.find((p) => p.isFeatured) || products[0] || ({} as Product);
  const bestSellerProduct = products.find((p) => p.isBestSeller) || products[1] || heroProduct;
  const spotlightProduct = products.find((p) => p.badgeType === 'lime' && p.id !== heroProduct?.id) || products[2] || heroProduct;
  const featuredCatProduct = products.find((p) => p.badgeType === 'blue') || products[3] || heroProduct;

  // Selected variant on hero, safely fallback if products is empty
  const activeHeroVariant = heroProduct.variants?.[selectedVariantIndex] || heroProduct.variants?.[0] || { thickness: 'Default', price: 0 };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-3.5 h-3.5" />;
      case 'Grid':
        return <Grid className="w-3.5 h-3.5" />;
      case 'Scissors':
        return <Scissors className="w-3.5 h-3.5" />;
      case 'Sparkles':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'Zap':
        return <Zap className="w-3.5 h-3.5" />;
      case 'Clock':
        return <Clock className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="flex flex-col gap-6" data-purpose="showroom-dashboard">
      {/* TOP ROW: Hero Showcase (8 cols) + Side Cards (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" data-purpose="showroom-main-grid">
        {/* LEFT SECTION: Hero Showcase + Studio Highlights (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
        {/* BEGIN: HeroProductBanner */}
        <section
          className="bg-[#F8FAF6] rounded-4xl p-6 sm:p-8 xl:p-10 relative overflow-hidden soft-border shadow-soft-card flex flex-col justify-between"
          data-purpose="hero-banner"
        >
          {/* Top Tag & Direct WhatsApp Quick Contact */}
          <div className="flex items-center justify-between z-10 flex-wrap gap-2.5 pb-4 border-b border-slate-200/60">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#DCF763] ring-2 ring-slate-900/10 animate-pulse"></span>
              <span>CNC &amp; Laser Architectural Fabrication Studio</span>
            </div>

            <button
              onClick={openWhatsAppGeneralInquiry}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-slate-900 bg-white shadow-xs hover:shadow transition-all cursor-pointer border border-slate-200/60"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>+91 8590 729 342</span>
            </button>
          </div>

          {/* Hero 2-Column Responsive Layout: Left Pitch & Right Showcase Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-6 z-10">
            {/* Left Content (7 cols) */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]"
                >
                  Custom Cut. <br />
                  <span className="text-slate-700">Delivered Fast.</span>
                </motion.h1>

                <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-lg leading-relaxed">
                  {heroProduct.description || 'Premium custom CNC-cut entrance name boards, architectural jali partitions, and bespoke acrylic designs manufactured with millimeter precision in Kerala and delivered pan-India.'}
                </p>

                {/* Thickness Variant Selector for Flagship */}
                <div className="flex flex-wrap items-center gap-2 mt-4 bg-white/80 p-1.5 rounded-2xl border border-slate-200/70 w-fit shadow-xs">
                  <span className="text-[11px] font-bold text-slate-500 pl-2">Thickness:</span>
                  {(heroProduct.variants || []).map((variant, idx) => (
                    <button
                      key={variant.thickness}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedVariantIndex === idx
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {variant.thickness} • ₹{variant.price.toFixed(0)}
                    </button>
                  ))}
                </div>

                {/* Gift Your Favorite Person Interactive Callout */}
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => onViewAllProducts(undefined, 'gift your favorite person')}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-800 text-xs font-bold border border-pink-200/80 shadow-2xs transition-all cursor-pointer group text-left"
                  >
                    <Gift className="w-3.5 h-3.5 text-pink-600 group-hover:scale-110 transition-transform" />
                    <span>Gift your favorite person — Personalized clocks & custom art</span>
                    <ArrowUpRight className="w-3 h-3 text-pink-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Feature Stepper Carousel */}
              <div className="mt-6 pt-5 border-t border-slate-200/60">
                <div
                  onClick={() => setStepperIndex((prev) => (prev + 1) % stepperStories.length)}
                  className="flex items-start sm:items-center gap-3.5 cursor-pointer group select-none bg-white/70 hover:bg-white p-3 rounded-2xl border border-slate-200/60 transition-all shadow-xs"
                  title="Click to cycle craftsmanship features"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-[#DCF763] font-mono text-sm font-black flex items-center justify-center shrink-0">
                    {currentStep.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-black text-slate-900 tracking-wide">{currentStep.title}</h4>
                      <span className="text-[9px] bg-slate-200/80 px-1.5 py-0.2 rounded text-slate-700 font-bold">
                        {stepperIndex + 1}/3
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{currentStep.desc}</p>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 group-hover:text-slate-700 shrink-0 hidden sm:block">
                    Next →
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <button
                    onClick={() => onViewAllProducts()}
                    className="inline-flex items-center gap-2.5 bg-[#DCF763] hover:bg-[#d0ed53] active:scale-95 text-slate-950 font-black px-5 py-2.5 rounded-full shadow-xs transition-all group cursor-pointer"
                  >
                    <span className="text-xs">View All Products</span>
                    <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </button>

                  <button
                    onClick={() => openWhatsAppQuickOrder(heroProduct, activeHeroVariant, 1)}
                    className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-full shadow-xs border border-slate-200/80 transition-all cursor-pointer"
                    title="Order this name board directly on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>Order on WhatsApp (₹{activeHeroVariant.price.toFixed(0)})</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Showcase Product Card (In regular document flow, ZERO overlap) (5 cols) */}
            <div className="md:col-span-5 flex justify-center w-full">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectProduct(heroProduct)}
                className="w-full max-w-[320px] bg-white rounded-3xl p-4 sm:p-5 shadow-lg border border-slate-200/80 flex flex-col justify-between cursor-pointer group hover:shadow-xl transition-shadow"
                title="Click to customize Style 1 Name Board"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] bg-slate-900 text-[#DCF763] px-2.5 py-0.5 rounded-full font-extrabold tracking-wide">
                    Featured Craft
                  </span>
                  <span className="text-xs font-black text-slate-900">
                    ₹{activeHeroVariant.price.toFixed(0)}
                  </span>
                </div>

                {/* Product Artwork Container */}
                <div className="w-full aspect-square max-h-52 rounded-2xl overflow-hidden bg-slate-50/80 border border-slate-100 flex items-center justify-center p-3 relative my-2 group-hover:bg-slate-50 transition-colors">
                  <ProductImage
                    src={heroProduct.image || ''}
                    alt={heroProduct.name || ''}
                    categorySlug={heroProduct.categorySlug}
                    className="w-full h-full rounded-xl object-contain group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/60 shadow-xs">
                    {activeHeroVariant.thickness}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mt-1">
                    <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-black transition-colors truncate">
                      {heroProduct.name || 'Featured Name Board'}
                    </h3>
                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#DCF763] transition-colors shrink-0 ml-2">
                      <ArrowUpRight className="w-3 h-3 text-slate-800" />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                    Weather-proof acrylic with gold 3D inlay
                  </p>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-[10px] font-semibold">
                    <span className="text-emerald-700 font-bold">In Stock • 24-48h Dispatch</span>
                    <span className="text-slate-700 underline group-hover:text-black">Customize →</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Social / Direct Contact Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200/60 z-10 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-bold">Lumina Art Direct:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={openWhatsAppGeneralInquiry}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold transition-colors cursor-pointer border border-emerald-200/60"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-3 h-3 fill-current" />
                  <span>WhatsApp Studio</span>
                </button>
                <button
                  onClick={() => onViewAllProducts('name-boards')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  <span>14 Name Board Styles</span>
                </button>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
              100% Weather-Proof Cast Acrylic &amp; Teak
            </div>
          </div>
        </section>
        {/* END: HeroProductBanner */}

        {/* BEGIN: StudioHighlightsRow (Balanced 2-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Popular Spotlight Craft with WhatsApp Order Button */}
          <div
            className="bg-[#F8FAF6] rounded-4xl p-5 soft-border shadow-soft-card flex items-center justify-between gap-3 relative group cursor-pointer hover:shadow-md transition-shadow"
            data-purpose="featured-spotlight"
            onClick={() => onSelectProduct(spotlightProduct)}
          >
            <div className="flex flex-col justify-between h-full flex-1 min-w-0 pr-1">
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold">
                  <Flame className="w-3 h-3 fill-current" />
                  Popular Craft
                </span>
                <h3 className="text-xs font-bold text-slate-900 mt-2 leading-snug group-hover:text-black transition-colors line-clamp-2">
                  {spotlightProduct.name}
                </h3>
                <p className="text-[11px] text-slate-500 font-bold mt-1">
                  From ₹{spotlightProduct.minPrice}
                </p>
              </div>

              {/* Order on WhatsApp Quick Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openWhatsAppQuickOrder(spotlightProduct, spotlightProduct.variants[0], 1);
                }}
                className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-[10px] font-bold shadow-xs transition-transform active:scale-95 cursor-pointer w-fit shrink-0"
                title="Order on WhatsApp"
              >
                <MessageCircle className="w-3 h-3 fill-current" />
                <span>WhatsApp Order</span>
              </button>
            </div>

            {/* Product Image & Arrow */}
            <div className="flex flex-col items-end shrink-0">
              <div
                aria-label="Details"
                className="w-6 h-6 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-700 group-hover:bg-[#DCF763] group-hover:scale-110 transition-all mb-1.5"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-xs bg-white border border-slate-200/60 p-1 group-hover:scale-105 transition-transform flex items-center justify-center">
                <ProductImage
                  src={spotlightProduct.image}
                  alt={spotlightProduct.name}
                  categorySlug={spotlightProduct.categorySlug}
                  className="w-full h-full rounded-xl object-contain"
                />
              </div>
              <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 mt-1">
                Handcrafted
              </span>
            </div>
          </div>

          {/* Card 2: More Products Showcase with Real Product Count */}
          <div
            className="bg-[#F8FAF6] rounded-4xl p-5 soft-border shadow-soft-card flex flex-col justify-between"
            data-purpose="catalog-preview"
          >
            <div className="flex items-start justify-between">
              <div>
                <button
                  onClick={() => onViewAllProducts()}
                  className="text-left group cursor-pointer"
                >
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-black transition-colors">
                    More Products
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold">
                    {products.length} designs in 5 categories
                  </p>
                </button>
              </div>
              <button
                onClick={() => heroProduct.id && onToggleWishlist(heroProduct.id)}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors cursor-pointer ${
                  heroProduct.id && isWishlisted(heroProduct.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-red-50 text-red-500 hover:bg-red-100'
                }`}
                title="Save flagship to wishlist"
              >
                <Heart className="w-3 h-3 fill-current" />
              </button>
            </div>

            {/* Product Thumbnails Strip */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {products.slice(1, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectProduct(item)}
                  className="aspect-square rounded-2xl bg-white p-1 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform cursor-pointer group relative border border-slate-200/60 shadow-xs"
                  title={item.name}
                >
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    categorySlug={item.categorySlug}
                    className="w-full h-full rounded-xl object-contain"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => onViewAllProducts()}
              className="mt-3 text-[11px] font-bold text-slate-700 hover:text-black flex items-center justify-between pt-2 border-t border-slate-100 cursor-pointer"
            >
              <span>Explore full catalog</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
        {/* END: StudioHighlightsRow */}
      </div>
      {/* END: LEFT SECTION */}

      {/* RIGHT SECTION: Side Cards (4 cols) */}
      <aside className="lg:col-span-4 flex flex-col gap-6" data-purpose="sidebar-products">
        {/* BEGIN: CategoriesCard (Replaces Popular Colors) */}
        <div
          className="bg-[#F8FAF6] rounded-4xl p-5 soft-border shadow-soft-card"
          data-purpose="categories-widget"
        >
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-xs font-bold text-slate-900">Categories</h3>
            <span className="text-[11px] font-bold text-slate-400">
              {categories.length} Disciplines
            </span>
          </div>

          {/* Circular swatch/icon per category */}
          <div className="grid grid-cols-6 gap-1">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => onViewAllProducts(cat.slug)}
                className="group flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none py-1"
                title={`Filter by ${cat.name || cat.category}`}
              >
                <div
                  className="w-9 h-9 rounded-full shadow-xs flex items-center justify-center transition-all group-hover:scale-110 group-hover:ring-2 group-hover:ring-offset-2 ring-slate-800 shrink-0"
                  style={{
                    backgroundColor: cat.accentColor,
                    color: '#0f172a',
                  }}
                >
                  {getCategoryIcon(cat.icon)}
                </div>
                <span className="text-[9px] font-bold text-slate-600 group-hover:text-slate-900 w-full truncate text-center">
                  {(cat.name || cat.category)?.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
        {/* END: CategoriesCard */}

        {/* BEGIN: FeaturedCategoryCard (Replaces New Gen X-Bud) */}
        <div
          onClick={() => onSelectProduct(featuredCatProduct)}
          className="bg-[#F8FAF6] rounded-4xl p-5 soft-border shadow-soft-card flex items-center justify-between gap-4 group cursor-pointer hover:shadow-md transition-shadow"
          data-purpose="featured-category-card"
        >
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-bold bg-[#DCF763] text-slate-950 px-2 py-0.5 rounded-full inline-block mb-1.5">
              New: LED Signage
            </span>
            <h3 className="text-sm font-black text-slate-900 leading-snug group-hover:text-black transition-colors line-clamp-2">
              {featuredCatProduct.name}
            </h3>
            <p className="text-[11px] font-bold text-slate-500 mt-1">From ₹{featuredCatProduct.minPrice}</p>

            <div
              aria-label="View LED Signage"
              className="mt-4 inline-flex w-7 h-7 rounded-full bg-white shadow-xs items-center justify-center text-slate-700 group-hover:bg-[#DCF763] group-hover:scale-110 transition-all border border-slate-200/60"
            >
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Real Featured Product Image */}
          <div className="w-28 h-28 shrink-0 rounded-2xl bg-white p-2 border border-slate-200/60 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
            <ProductImage
              src={featuredCatProduct.image}
              alt={featuredCatProduct.name}
              categorySlug={featuredCatProduct.categorySlug}
              className="w-full h-full rounded-xl object-contain"
            />
          </div>
        </div>
        {/* END: FeaturedCategoryCard */}

        {/* BEGIN: StudioTrustCard (Verified Studio badge moved from congested grid to sidebar) */}
        <div
          onClick={onOpenReviews}
          className="bg-[#F8FAF6] hover:bg-white rounded-4xl p-4 sm:p-5 soft-border shadow-soft-card flex items-center justify-between gap-4 group cursor-pointer transition-all border border-slate-200/70"
          data-purpose="studio-trust-card"
          title="Read verified customer craft reviews"
        >
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 mb-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Verified Architectural Studio</span>
            </div>
            <h4 className="text-xs font-black text-slate-900">500+ Orders Handcrafted</h4>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold mt-1">
              <div className="flex text-amber-400">
                {'★'.repeat(5)}
              </div>
              <span className="font-bold text-slate-800">4.8 / 5.0</span>
              <span className="text-slate-400 text-[10px]">(Verified Reviews)</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-700 group-hover:bg-[#DCF763] group-hover:scale-105 transition-all shrink-0 border border-slate-200/60">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        {/* END: StudioTrustCard */}
      </aside>
      {/* END: RIGHT SECTION */}
      </div>
      {/* END: TOP ROW GRID */}

      {/* BEGIN: BestSellersSection (Moved to bottom, smaller & refined compact cards) */}
      <section className="mt-1" data-purpose="bestsellers-bottom-section">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 px-1">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
              <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
              Best-Sellers
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              Most Loved Entrance Boards &amp; Signs
            </h3>
          </div>
          <button
            onClick={() => onViewAllProducts('name-boards')}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer group"
          >
            <span>View all styles</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Compact 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            products.find((p) => p.id === 'name-boards-3') || bestSellerProduct,
            products.find((p) => p.id === 'name-boards-2') || products[1],
            products.find((p) => p.id === 'name-boards-4') || products[3],
            products.find((p) => p.id === 'name-boards-1') || products[0],
          ].filter(p => p && p.id).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="bg-[#F8FAF6] hover:bg-white rounded-3xl p-3 sm:p-3.5 soft-border shadow-soft-card flex items-center gap-3 group cursor-pointer hover:shadow-md transition-all border border-slate-200/70"
            >
              {/* Smaller, compact product thumbnail */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white p-1.5 border border-slate-200/60 shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  categorySlug={item.categorySlug}
                  className="w-full h-full rounded-xl object-contain"
                />
              </div>

              {/* Compact info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60">
                    Best-Seller
                  </span>
                  <div className="w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-500 group-hover:bg-[#DCF763] group-hover:text-slate-900 transition-colors shrink-0">
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-900 truncate mt-1 group-hover:text-black">
                  {item.name}
                </h4>

                <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-200/50">
                  <span className="text-xs font-black text-slate-900">
                    From ₹{item.minPrice}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    In Stock
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* END: BestSellersSection */}

      {/* BEGIN: CustomDesignAtelierBanner (Spans across the bottom) */}
      {onNavigateToCustomDesign && (
        <div
          className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-4xl p-6 sm:p-7 text-white soft-border shadow-soft-card relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group"
          data-purpose="custom-design-callout"
        >
          {/* Ambient Background Accents */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#DCF763]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

          <div className="z-10 max-w-lg">
            <div className="inline-flex items-center gap-2 bg-[#DCF763] text-slate-950 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3 h-3" />
              <span>Custom Fabrication Studio</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
              Have your own reference sketch or design?
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Upload a photo, sketch, or PDF of your custom name plate, LED neon, or CNC cut design. Tell us your requirements and we'll craft it for you.
            </p>
          </div>

          <div className="z-10 flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={onNavigateToCustomDesign}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#DCF763] hover:bg-[#c9e652] text-slate-950 font-black text-xs py-3 px-5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span>Upload Design</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {onNavigateToContact && (
              <button
                onClick={onNavigateToContact}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-3 px-4 rounded-full border border-white/20 transition-colors cursor-pointer"
              >
                <span>Contact Team</span>
              </button>
            )}
          </div>
        </div>
      )}
      {/* END: CustomDesignAtelierBanner */}
    </div>
  );
};
