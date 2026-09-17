import React, { useState, useEffect } from 'react';
import { ScreenType, Product, ProductVariant, CartItem, CategoryData } from './types';
import { apiClient } from './api/client';
import { Header } from './components/Header';
import { ShowroomDashboard } from './components/ShowroomDashboard';
import { ProductCatalogScreen } from './components/ProductCatalogScreen';
import { CustomDesignSection } from './components/CustomDesignSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { ReviewsModal } from './components/ReviewsModal';
import { LuminaChatbot } from './components/LuminaChatbot';

const CART_STORAGE_KEY = 'lumina_art_cart_v2';
const WISHLIST_STORAGE_KEY = 'lumina_art_wishlist_v2';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.getProducts(),
      apiClient.getCategories()
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch data', err);
        setIsLoading(false);
      });
  }, []);

  // Modals & Drawer states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  // Cart state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return [];
  });

  // Wishlist state with localStorage persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return [];
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist]);

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    variant: ProductVariant,
    quantity = 1
  ) => {
    const compositeId = `${product.id}-${variant.thickness}`;
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === compositeId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: compositeId,
          product,
          variant,
          quantity,
        },
      ];
    });
  };

  const handleUpdateQuantity = (
    productId: string,
    thickness: string,
    quantity: number
  ) => {
    const compositeId = `${productId}-${thickness}`;
    if (quantity <= 0) {
      handleRemoveItem(productId, thickness);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === compositeId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string, thickness: string) => {
    const compositeId = `${productId}-${thickness}`;
    setCart((prev) => prev.filter((item) => item.id !== compositeId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
      );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Navigate to catalog with optional category preselection and search keyword
  const handleViewAllProducts = (categorySlug?: string, searchKeyword?: string) => {
    if (categorySlug) {
      setCatalogCategoryFilter(categorySlug);
    } else {
      setCatalogCategoryFilter('all');
    }
    if (searchKeyword !== undefined) {
      setSearchQuery(searchKeyword);
    }
    setCurrentScreen('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E8EDE7]">
        <div className="text-slate-500 font-bold animate-pulse">Loading Lumina Art...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-6 lg:p-10 text-slate-800 selection:bg-[#DCF763] selection:text-black">
      {/* Main Dashboard Container */}
      <main
        id="lumina-art-app-root"
        className="w-full max-w-[1340px] bg-[#E8EDE7] rounded-[2.5rem] md:rounded-[3rem] p-5 sm:p-7 md:p-9 shadow-2xl border border-white/60 relative overflow-hidden"
      >
        {/* Top Header */}
        <Header
          currentScreen={currentScreen}
          onNavigate={(screen) => {
            setCurrentScreen(screen);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          wishlistCount={wishlist.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onSelectProduct={setSelectedProduct}
          products={products}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Screen Routing */}
        {currentScreen === 'home' && (
          <ShowroomDashboard
            products={products}
            categories={categories}
            onSelectProduct={setSelectedProduct}
            onViewAllProducts={handleViewAllProducts}
            onOpenReviews={() => setIsReviewsOpen(true)}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={isWishlisted}
            onNavigateToCustomDesign={() => {
              setCurrentScreen('custom-design');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToContact={() => {
              setCurrentScreen('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentScreen === 'catalog' && (
          <ProductCatalogScreen
            products={products}
            categories={categories}
            onSelectProduct={setSelectedProduct}
            onBackToShowroom={() => {
              setCurrentScreen('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={isWishlisted}
            initialCategorySlug={catalogCategoryFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onNavigateToCustomDesign={() => {
              setCurrentScreen('custom-design');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentScreen === 'custom-design' && (
          <CustomDesignSection
            onBackToShowroom={() => {
              setCurrentScreen('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToContact={() => {
              setCurrentScreen('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentScreen === 'contact' && (
          <ContactSection
            onBackToShowroom={() => {
              setCurrentScreen('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToCustomDesign={() => {
              setCurrentScreen('custom-design');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Global Application Footer */}
        <Footer
          currentScreen={currentScreen}
          onNavigate={(screen) => {
            setCurrentScreen(screen);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={isWishlisted}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onBrowseCatalog={() => {
          setCurrentScreen('catalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={products}
        onSelectProduct={setSelectedProduct}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Reviews Trust Modal */}
      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
      />

      <LuminaChatbot />
    </div>
  );
}
