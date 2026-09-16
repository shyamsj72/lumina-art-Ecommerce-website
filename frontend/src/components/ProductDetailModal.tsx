import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  MessageCircle,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  Layers,
  PhoneCall,
  Gift,
} from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { ProductImage } from './ProductImage';
import { openWhatsAppQuickOrder, openWhatsAppGeneralInquiry } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Price updates live with selected variant and quantity
  const lineTotal = selectedVariant.price * quantity;

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    openWhatsAppQuickOrder(product, selectedVariant, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-[#F8FAF6] rounded-4xl soft-border shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-black transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column: Product Image Artwork */}
            <div className="bg-white rounded-3xl p-6 soft-border flex flex-col items-center justify-center relative min-h-[300px] shadow-sm">
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="text-[10px] font-black bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="text-[10px] font-black bg-[#DCF763] text-slate-950 px-2.5 py-0.5 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="w-full aspect-square max-h-64 flex items-center justify-center p-2">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  categorySlug={product.categorySlug}
                  className="w-full h-full rounded-2xl object-contain drop-shadow-md"
                />
              </div>

              {/* Material Spec Tag */}
              <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-slate-600 bg-slate-100/80 px-3 py-1 rounded-full">
                <Layers className="w-3.5 h-3.5 text-slate-700" />
                <span>Selected: {selectedVariant.thickness} Thickness</span>
              </div>
            </div>

            {/* Right Column: Details, Variant Selector, Quantity, and Actions */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Custom Cut to Order
                  </span>
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isWishlisted(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-slate-400 hover:text-red-500'
                    } shadow-xs`}
                    title="Save to Wishlist"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1.5 leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-slate-500 font-bold">{product.category}</p>
              </div>

              {/* Price Display (updates live with selected variant) */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  ₹{selectedVariant.price.toFixed(0)}
                </span>
                <span className="text-xs font-bold text-slate-400">per piece</span>
                <span className="text-xs font-bold text-emerald-600 ml-1">
                  • In-Stock Materials
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{product.description}</p>

              {/* Variant Selector (Thickness: 2mm / 4mm, price updates live) */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Select Thickness / Grade:</span>
                  <span className="text-slate-500 font-bold">{selectedVariant.thickness}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant.thickness === variant.thickness;
                    return (
                      <button
                        key={variant.thickness}
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-3 rounded-2xl text-left transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200/80 hover:border-slate-400'
                        }`}
                      >
                        <div className="text-xs font-black">{variant.thickness}</div>
                        <div
                          className={`text-[11px] font-bold mt-0.5 ${
                            isSelected ? 'text-[#DCF763]' : 'text-slate-500'
                          }`}
                        >
                          ₹{variant.price.toFixed(0)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper & Add to Cart */}
              <div className="flex items-center gap-3 pt-2">
                {/* Quantity modifier */}
                <div className="flex items-center bg-white rounded-full shadow-xs border border-slate-200/70 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#DCF763] hover:bg-[#d0ed53] text-slate-950 font-black px-5 py-3 rounded-full shadow-xs transition-all active:scale-98 cursor-pointer text-xs"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-800" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart • ₹{lineTotal.toFixed(0)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Standalone "Order this on WhatsApp" button for quick single-item enquiry */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-3 rounded-full shadow-xs transition-all active:scale-98 cursor-pointer text-xs"
                title="Direct enquiry for this product on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Order this on WhatsApp (₹{lineTotal.toFixed(0)})</span>
              </button>

              {/* Gift Your Favorite Person Callout & Tags */}
              <div className="bg-pink-50/70 border border-pink-200/80 rounded-2xl p-3 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-black text-pink-950">
                    <Gift className="w-3.5 h-3.5 text-pink-600" />
                    <span>Gift your favorite person</span>
                  </div>
                  <span className="text-[10px] font-bold bg-pink-100 text-pink-800 px-2 py-0.2 rounded-full">
                    Custom Gifting
                  </span>
                </div>
                <p className="text-[11px] text-pink-900/80 leading-relaxed">
                  Personalize with custom engraved names, couple silhouettes, or heartfelt messages. Free gift wrapping & direct courier dispatch available on request.
                </p>
                {product.keywords && product.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {product.keywords.slice(0, 5).map((kw) => (
                      <span
                        key={kw}
                        className="text-[10px] font-semibold bg-white/90 text-pink-700 px-2 py-0.5 rounded-full border border-pink-100"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Assurance Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 text-[10px] text-slate-500 border-t border-slate-200/50">
                <div className="flex items-center gap-1.5 font-medium">
                  <Truck className="w-3.5 h-3.5 text-slate-700" />
                  <span>Insured Courier</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                  <span>Weather-Proof</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-slate-700" />
                  <span>Hand Finished</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Craft Notes */}
          <div className="pt-4 border-t border-slate-200/60 text-xs text-slate-600 bg-white/70 p-4 rounded-3xl soft-border space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Ordering Customization Details</span>
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-600">
              When ordering via WhatsApp, you can share your custom family names, house numbers, architectural dimensions, or specific vector artwork. Our team previews the CAD layout with you prior to laser/CNC machining!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
