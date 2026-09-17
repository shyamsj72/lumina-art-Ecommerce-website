import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  ArrowUpRight,
  MessageCircle,
  Sparkles,
  Search,
  X,
  Layers,
  Check,
  Gift,
  ShoppingBag,
} from 'lucide-react';
import { CategoryData, Product, ProductVariant } from '../types';
import { ProductImage } from './ProductImage';
import { openWhatsAppQuickOrder } from '../utils/whatsapp';

interface ProductCatalogScreenProps {
  products: Product[];
  categories: CategoryData[];
  onSelectProduct: (product: Product) => void;
  onBackToShowroom: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  initialCategorySlug?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigateToCustomDesign?: () => void;
}

export const ProductCatalogScreen: React.FC<ProductCatalogScreenProps> = ({
  products,
  categories,
  onSelectProduct,
  onBackToShowroom,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  initialCategorySlug,
  searchQuery,
  onSearchChange,
  onNavigateToCustomDesign,
}) => {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(
    initialCategorySlug || 'all'
  );
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Category filter tabs
  const categoryFilters = [
    { slug: 'all', name: 'All Categories', count: products.length },
    ...categories.map((c) => ({
      slug: c.slug,
      name: c.name || c.category,
      count: products.filter((p) => p.categorySlug === c.slug).length,
    })),
  ];

  // Filtering & Sorting
  const filteredProducts = products
    .filter((p) => {
      const matchesCategory =
        selectedCategorySlug === 'all' || p.categorySlug === selectedCategorySlug;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesBasic =
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const matchesKeywords = p.keywords?.some((k) => k.toLowerCase().includes(q));

      const tokens = q.split(/\s+/).filter(Boolean);
      const matchesTokens =
        tokens.length > 1 &&
        tokens.every(
          (t) =>
            p.name.toLowerCase().includes(t) ||
            p.category.toLowerCase().includes(t) ||
            p.description.toLowerCase().includes(t) ||
            p.keywords?.some((k) => k.toLowerCase().includes(t))
        );

      const matchesSearch = matchesBasic || matchesKeywords || matchesTokens;
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.minPrice - b.minPrice;
      if (sortBy === 'price-desc') return b.minPrice - a.minPrice;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const handleQuickAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.variants[0], 1);
    setAddedNotice(product.id);
    setTimeout(() => setAddedNotice(null), 1800);
  };

  const handleQuickWhatsApp = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    openWhatsAppQuickOrder(product, product.variants[0], 1);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Navigation Header */}
      <div className="bg-[#F8FAF6] rounded-4xl p-6 md:p-8 soft-border shadow-soft-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToShowroom}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-3 cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Showroom</span>
          </button>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Lumina Art Craft Catalog
            </h1>
            <span className="text-xs font-black bg-[#DCF763] text-slate-950 px-2.5 py-0.5 rounded-full">
              {products.length} Designs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Custom CNC name boards, laser cut acrylics, interior lattice partitions, and glowing LED neon signage.
          </p>
        </div>

        {/* Sorting & Search */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          {/* Mobile search bar if top is hidden */}
          <div className="relative md:hidden w-full">
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search catalog..."
              className="w-full bg-white text-xs px-4 py-2 pl-9 rounded-full border border-slate-200"
            />
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-2.5 text-slate-400"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-xs border border-slate-200/60 text-xs">
            <span className="text-slate-400 font-bold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-0 text-slate-800 font-bold focus:ring-0 p-0 text-xs cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>

          {onNavigateToCustomDesign && (
            <button
              onClick={onNavigateToCustomDesign}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-black text-white px-3.5 py-2 rounded-full text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#DCF763]" />
              <span>Upload Custom Design</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Keyword Discovery Bar */}
      <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-2.5 px-4 border border-slate-200/70 shadow-xs flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Trending Keywords:</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() =>
              onSearchChange(
                searchQuery.toLowerCase().includes('favorite person')
                  ? ''
                  : 'gift your favorite person'
              )
            }
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              searchQuery.toLowerCase().includes('favorite person')
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200/80 shadow-2xs'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-pink-600" />
            <span>gift your favorite person</span>
            {searchQuery.toLowerCase().includes('favorite person') && (
              <X className="w-3 h-3 ml-0.5" />
            )}
          </button>
          <button
            type="button"
            onClick={() =>
              onSearchChange(searchQuery.toLowerCase() === 'acrylic clocks' ? '' : 'acrylic clocks')
            }
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              searchQuery.toLowerCase() === 'acrylic clocks'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80'
            }`}
          >
            acrylic clocks
          </button>
          <button
            type="button"
            onClick={() =>
              onSearchChange(
                searchQuery.toLowerCase() === 'personalized gifts' ? '' : 'personalized gifts'
              )
            }
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              searchQuery.toLowerCase() === 'personalized gifts'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            personalized gifts
          </button>
          <button
            type="button"
            onClick={() =>
              onSearchChange(searchQuery.toLowerCase() === 'led signage' ? '' : 'led signage')
            }
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              searchQuery.toLowerCase() === 'led signage'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200/80'
            }`}
          >
            led signage
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-[11px] font-bold text-slate-400 hover:text-slate-800 underline ml-1 cursor-pointer"
            >
              Clear keyword
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categoryFilters.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategorySlug(cat.slug)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategorySlug === cat.slug
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white/80 hover:bg-white text-slate-700 shadow-xs border border-slate-200/60'
            }`}
          >
            <span>{cat.name}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                selectedCategorySlug === cat.slug
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#F8FAF6] rounded-4xl p-12 text-center soft-border shadow-soft-card space-y-3">
          <Layers className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No products found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            We couldn't find any designs matching your search or category filter. Try clearing your filters or search keywords.
          </p>
          <button
            onClick={() => {
              setSelectedCategorySlug('all');
              onSearchChange('');
            }}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-full cursor-pointer hover:bg-black"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-[#F8FAF6] rounded-3xl p-4 soft-border shadow-soft-card flex flex-col justify-between hover:shadow-lg transition-all duration-300 group cursor-pointer relative"
            >
              {/* Top Row: Category Tag + Wishlist */}
              <div className="flex items-center justify-between mb-3 z-10">
                <span className="text-[10px] font-bold bg-white text-slate-700 px-2.5 py-1 rounded-full shadow-xs border border-slate-100">
                  {product.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                    isWishlisted(product.id)
                      ? 'bg-red-50 text-red-500'
                      : 'bg-white text-slate-400 hover:text-red-500 shadow-xs'
                  }`}
                  title="Wishlist item"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isWishlisted(product.id) ? 'fill-current text-red-500' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Product Artwork Container */}
              <div className="w-full aspect-square rounded-2xl bg-white p-3 border border-slate-200/50 shadow-inner flex items-center justify-center relative overflow-hidden mb-3">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  categorySlug={product.categorySlug}
                  className="w-full h-full rounded-xl object-contain"
                />

                {/* Optional Badge */}
                {product.badge && (
                  <span className="absolute top-2 left-2 text-[9px] font-black bg-slate-900 text-[#DCF763] px-2 py-0.5 rounded-full shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-1.5 mb-3 flex-1">
                <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-black line-clamp-2 leading-snug">
                  {product.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-xs font-black text-slate-900">
                    ₹{product.minPrice} – ₹{product.maxPrice}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    ({product.variants.map((v) => v.thickness).join(' / ')})
                  </span>
                </div>

                {product.keywords?.includes('gift your favorite person') && (
                  <div className="pt-1 flex items-center gap-1">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-pink-50 text-pink-700 border border-pink-200/80 px-2 py-0.5 rounded-full">
                      <Gift className="w-2.5 h-2.5 text-pink-600" />
                      <span>Gift your favorite person</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200/60 flex items-center gap-2">
                {/* Standalone Quick WhatsApp Order Button */}
                <button
                  onClick={(e) => handleQuickWhatsApp(product, e)}
                  className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
                  title="Order on WhatsApp (+91 8590 729 342)"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </button>

                {/* Add to Cart button */}
                <button
                  onClick={(e) => handleQuickAddToCart(product, e)}
                  className="flex-1 bg-[#DCF763] hover:bg-[#d0ed53] text-slate-950 py-2 px-3 rounded-full text-xs font-black flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
                  title="Add standard variant to cart"
                >
                  {addedNotice === product.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
