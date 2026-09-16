import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, X, MessageCircle, ArrowRight, Gift, Sparkles } from 'lucide-react';
import { ScreenType, Product } from '../types';
import { openWhatsAppGeneralInquiry } from '../utils/whatsapp';
import { LuminaLogo } from './LuminaLogo';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectProduct,
  products,
  searchQuery,
  onSearchChange,
}) => {
  const [searchFocused, setSearchFocused] = useState(false);

  const searchResults = searchQuery.trim()
    ? products.filter((p) => {
        const q = searchQuery.toLowerCase().trim();
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
        return matchesBasic || matchesKeywords || matchesTokens;
      })
    : [];

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 mb-7 relative z-30" data-purpose="top-navigation">
      {/* Official Company Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none py-1 transition-transform group-hover:scale-[1.02]"
          title="Lumina Art Home"
        >
          <LuminaLogo size="md" />
        </button>

        {/* View Switcher Pill */}
        <nav className="hidden lg:flex items-center bg-white/80 backdrop-blur-xs p-1 rounded-full border border-white/90 shadow-xs ml-2">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              currentScreen === 'home'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Showroom
          </button>
          <button
            onClick={() => onNavigate('catalog')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              currentScreen === 'catalog'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => onNavigate('custom-design')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentScreen === 'custom-design'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Custom Design</span>
            <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
              currentScreen === 'custom-design' ? 'bg-[#DCF763] text-slate-950' : 'bg-[#DCF763] text-slate-950'
            }`}>
              Upload
            </span>
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              currentScreen === 'contact'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Contact
          </button>
        </nav>
      </div>

      {/* Pill-shaped Search Bar */}
      <div className="flex-1 max-w-md mx-auto relative hidden md:block">
        <div className="relative flex items-center">
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 240)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onNavigate('catalog');
                setSearchFocused(false);
              }
            }}
            className="w-full bg-white/90 border-0 rounded-full py-2.5 pl-6 pr-12 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DCF763] shadow-xs transition-all"
            data-purpose="product-search"
            placeholder='Search "gift your favorite person", clocks, name boards...'
            type="text"
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-10 text-slate-400 hover:text-slate-600 p-1"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : null}
          <button
            onClick={() => {
              onNavigate('catalog');
              setSearchFocused(false);
            }}
            aria-label="Search"
            className="absolute right-1.5 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Predictive Search Dropdown & Trending Keywords */}
        {searchFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 overflow-hidden max-h-96 overflow-y-auto">
            {/* Quick Trending Keywords Row */}
            <div className="mb-2.5 pb-2 border-b border-slate-100">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                <span>Popular Search Keywords</span>
                <span className="text-[10px] text-emerald-600 font-semibold lowercase">tap to search</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSearchChange('gift your favorite person');
                    onNavigate('catalog');
                    setSearchFocused(false);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold bg-pink-50 text-pink-700 hover:bg-pink-100 hover:text-pink-900 border border-pink-200/80 px-2.5 py-1 rounded-full transition-all cursor-pointer shadow-xs"
                >
                  <Gift className="w-3 h-3 text-pink-600" />
                  <span>gift your favorite person</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSearchChange('acrylic clocks');
                    onNavigate('catalog');
                    setSearchFocused(false);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                >
                  <span>acrylic clocks</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSearchChange('personalized gifts');
                    onNavigate('catalog');
                    setSearchFocused(false);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                >
                  <span>personalized gifts</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSearchChange('led signage');
                    onNavigate('catalog');
                    setSearchFocused(false);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/70 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                >
                  <span>led signage</span>
                </button>
              </div>
            </div>

            {searchQuery.trim().length > 0 && (
              <>
                <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>
                    {searchResults.length}{' '}
                    {searchResults.length === 1 ? 'Design found' : 'Designs found'}
                  </span>
                  <button
                    onClick={() => {
                      onNavigate('catalog');
                      setSearchFocused(false);
                    }}
                    className="text-[11px] text-slate-900 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    View all <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="px-4 py-4 text-xs text-slate-500 text-center">
                    No designs match "{searchQuery}". Try <button type="button" onClick={() => onSearchChange('gift your favorite person')} className="font-bold text-pink-600 underline">"gift your favorite person"</button>, "acrylic clocks", or "name boards".
                  </div>
                ) : (
                  searchResults.slice(0, 5).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        setSearchFocused(false);
                      }}
                      className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl text-left transition-colors cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-contain rounded-lg bg-slate-100 p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2">
                          <span>{product.category}</span>
                          <span>•</span>
                          <span className="font-semibold text-slate-800">From ₹{product.minPrice}</span>
                          {product.keywords?.includes('gift your favorite person') && (
                            <span className="text-[9px] font-bold bg-pink-100 text-pink-700 px-1.5 py-0.2 rounded-full">
                              Gift
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Controls: Cart + Wishlist + WhatsApp Contact (No fake profile) */}
      <div className="flex items-center gap-2.5">
        {/* Wishlist Button */}
        <button
          onClick={onOpenWishlist}
          aria-label="Wishlist"
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs hover:shadow transition-shadow text-red-500 relative cursor-pointer group"
          title="Saved Wishlist"
        >
          <Heart className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Cart Icon Button */}
        <button
          onClick={onOpenCart}
          aria-label="Shopping Cart"
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs hover:shadow transition-shadow text-slate-800 relative cursor-pointer group"
          title="Shopping Cart"
        >
          <ShoppingBag className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#DCF763] text-slate-950 text-[10px] font-black flex items-center justify-center ring-2 ring-white animate-pulse">
              {cartCount}
            </span>
          )}
        </button>

        {/* WhatsApp Quick Contact Pill (Replaces fake user profile) */}
        <button
          onClick={openWhatsAppGeneralInquiry}
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white pl-3.5 pr-4 py-2 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer font-bold text-xs"
          title="Chat directly on WhatsApp (+91 8590 729 342)"
        >
          <MessageCircle className="w-4 h-4 fill-current text-white" />
          <span className="hidden sm:inline">Chat on WhatsApp</span>
          <span className="sm:hidden text-[11px]">Chat</span>
        </button>
      </div>

      {/* Mobile & Tablet Secondary Navigation Pills */}
      <div className="w-full lg:hidden flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 -mt-2">
        <button
          onClick={() => onNavigate('home')}
          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            currentScreen === 'home'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white/80 text-slate-700 hover:bg-white'
          }`}
        >
          Showroom
        </button>
        <button
          onClick={() => onNavigate('catalog')}
          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            currentScreen === 'catalog'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white/80 text-slate-700 hover:bg-white'
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => onNavigate('custom-design')}
          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            currentScreen === 'custom-design'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white/80 text-slate-700 hover:bg-white'
          }`}
        >
          <span>Custom Design</span>
          <span className="text-[9px] bg-[#DCF763] text-slate-950 font-black px-1.5 py-0.2 rounded-full">
            Upload
          </span>
        </button>
        <button
          onClick={() => onNavigate('contact')}
          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            currentScreen === 'contact'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white/80 text-slate-700 hover:bg-white'
          }`}
        >
          Contact
        </button>
      </div>
    </header>
  );
};
