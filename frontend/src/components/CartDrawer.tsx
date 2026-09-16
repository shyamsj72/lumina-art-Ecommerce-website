import React from 'react';
import {
  X,
  Trash2,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { CartItem } from '../types';
import { ProductImage } from './ProductImage';
import { openWhatsAppCartCheckout, openWhatsAppGeneralInquiry } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, thickness: string, quantity: number) => void;
  onRemoveItem: (productId: string, thickness: string) => void;
  onClearCart: () => void;
  onBrowseCatalog: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBrowseCatalog,
}) => {
  if (!isOpen) return null;

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const grandTotal = items.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0
  );

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;
    openWhatsAppCartCheckout(items, grandTotal);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#F8FAF6] h-full shadow-2xl flex flex-col justify-between soft-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200/70 flex items-center justify-between bg-white/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-[#DCF763] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight">Your Order Bag</h2>
              <span className="text-[11px] text-slate-500 font-bold">
                {totalItemsCount} {totalItemsCount === 1 ? 'piece' : 'pieces'} selected
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[11px] font-bold text-slate-400 hover:text-red-500 transition-colors cursor-pointer px-2 py-1"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-white text-slate-300 flex items-center justify-center shadow-xs border border-slate-200/60">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm font-extrabold text-slate-800">Your order bag is empty</p>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Explore our curated name boards, precision jali panels, and laser-crafted acrylic pieces to start your order.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowseCatalog();
                }}
                className="mt-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const itemTotal = item.variant.price * item.quantity;
                return (
                  <div
                    key={`${item.product.id}-${item.variant.thickness}`}
                    className="bg-white rounded-2xl p-3.5 soft-border flex items-center gap-3 relative shadow-xs"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-slate-50 p-1 flex items-center justify-center overflow-hidden border border-slate-100 shrink-0">
                      <ProductImage
                        src={item.product.image}
                        alt={item.product.name}
                        categorySlug={item.product.categorySlug}
                        className="w-full h-full rounded-lg object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500 font-medium">
                        <Layers className="w-3 h-3 text-slate-400" />
                        <span>{item.variant.thickness}</span>
                        <span>•</span>
                        <span>₹{item.variant.price.toFixed(0)} ea</span>
                      </div>
                      <div className="text-xs font-black text-slate-900 mt-1">
                        ₹{itemTotal.toFixed(0)}
                      </div>
                    </div>

                    {/* Quantity modifier */}
                    <div className="flex items-center bg-slate-100 rounded-full p-0.5 shrink-0">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            item.variant.thickness,
                            item.quantity - 1
                          )
                        }
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-slate-600 hover:bg-white font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            item.variant.thickness,
                            item.quantity + 1
                          )
                        }
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-slate-600 hover:bg-white font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() =>
                        onRemoveItem(item.product.id, item.variant.thickness)
                      }
                      className="text-slate-300 hover:text-red-500 p-1 transition-colors cursor-pointer shrink-0"
                      title="Remove piece"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}

              {/* Order Information Note */}
              <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-3 text-[11px] text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>How WhatsApp Checkout Works</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Clicking checkout opens WhatsApp with your pre-formatted order summary. You can then provide your customized text, house name, or custom artwork directly to our master craftsman!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout on WhatsApp */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-slate-200/70 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({totalItemsCount} pieces)</span>
                <span className="font-bold text-slate-900">₹{grandTotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Pan-India Courier Dispatch</span>
                <span className="text-emerald-600 font-bold">Calculated on WhatsApp</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                <span>Estimated Total</span>
                <span className="text-lg text-slate-900">₹{grandTotal.toFixed(0)}</span>
              </div>
            </div>

            {/* Prominent WhatsApp Checkout Button */}
            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer text-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Checkout on WhatsApp • ₹{grandTotal.toFixed(0)}</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-3 h-3 text-slate-400" />
              <span>Direct WhatsApp Communication • +91 8590 729 342</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
