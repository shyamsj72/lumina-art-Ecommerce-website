import React from 'react';
import { X, Heart, ShoppingBag, Trash2, MessageCircle } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { ProductImage } from './ProductImage';
import { openWhatsAppQuickOrder } from '../utils/whatsapp';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onSelectProduct,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#F8FAF6] rounded-4xl soft-border shadow-2xl overflow-hidden relative p-6 md:p-8 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <h2 className="text-xl font-black text-slate-900">Saved Wishlist</h2>
            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
              {wishlistedProducts.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-600 hover:text-black cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {wishlistedProducts.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Heart className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-bold text-slate-700">No designs saved yet</p>
              <p className="text-xs text-slate-400">
                Click the heart icon on any name board, jali, or acrylic craft to save it here.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="bg-white rounded-2xl p-3.5 soft-border flex items-center gap-3 shadow-xs hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-slate-50 p-1 flex items-center justify-center overflow-hidden shrink-0 border border-slate-100">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    categorySlug={product.categorySlug}
                    className="w-full h-full rounded-lg object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{product.name}</h4>
                  <p className="text-[11px] text-slate-500">{product.category}</p>
                  <p className="text-xs font-black text-slate-900 mt-0.5">
                    From ₹{product.minPrice}
                  </p>
                </div>
                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() =>
                      openWhatsAppQuickOrder(product, product.variants[0], 1)
                    }
                    className="p-2 rounded-full bg-[#25D366] text-white text-xs font-bold transition-all hover:bg-[#20ba59] cursor-pointer"
                    title="Order on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button
                    onClick={() => onAddToCart(product, product.variants[0], 1)}
                    className="p-2 rounded-full bg-[#DCF763] hover:bg-[#d0ed53] text-slate-900 text-xs font-bold transition-all cursor-pointer"
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveWishlist(product.id)}
                    className="p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
