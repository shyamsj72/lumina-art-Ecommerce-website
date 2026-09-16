import React, { useState } from 'react';
import { Layers, Grid, Scissors, Sparkles, Zap, Clock } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  categorySlug?: string;
  className?: string;
  priority?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  categorySlug,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  // Return dynamic artisanal SVG badge when image fails or while placeholder is active
  const renderFallback = () => {
    switch (categorySlug) {
      case 'cnc-jali-cutting':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#2D1B14] to-[#1F130E] text-[#F3C28D] p-4 text-center rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F3C28D_2px,transparent_2px)] [background-size:16px_16px]"></div>
            <Grid className="w-10 h-10 mb-2 stroke-[1.5]" />
            <span className="text-[11px] font-mono tracking-wider uppercase opacity-80">Architectural Lattice</span>
            <span className="text-[10px] text-amber-200/60 mt-0.5 font-bold">CNC Moisture Proof</span>
          </div>
        );
      case 'laser-cutting':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#12242D] to-[#0A161E] text-[#6CE5E8] p-4 text-center rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-15 border border-[#6CE5E8]/30 m-3 rounded-xl border-dashed"></div>
            <Scissors className="w-10 h-10 mb-2 stroke-[1.5]" />
            <span className="text-[11px] font-mono tracking-wider uppercase opacity-80">Precision Laser</span>
            <span className="text-[10px] text-cyan-200/60 mt-0.5 font-bold">Micro-Accurate Kerf</span>
          </div>
        );
      case 'wood-acrylic-craft':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#261E1A] to-[#191310] text-[#FFB37C] p-4 text-center rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <Sparkles className="w-10 h-10 mb-2 stroke-[1.5]" />
            <span className="text-[11px] font-mono tracking-wider uppercase opacity-80">Hardwood &amp; Cast Acrylic</span>
            <span className="text-[10px] text-orange-200/60 mt-0.5 font-bold">Hand-Buffed Finish</span>
          </div>
        );
      case 'led-signage':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1A102E] to-[#0E071A] text-[#DCF763] p-4 text-center rounded-2xl relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,247,99,0.15),transparent_70%)]"></div>
            <Zap className="w-10 h-10 mb-2 stroke-[1.5] drop-shadow-[0_0_12px_rgba(220,247,99,0.8)]" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#DCF763] drop-shadow-[0_0_8px_rgba(220,247,99,0.6)] font-bold">
              Neon Flex 12V
            </span>
            <span className="text-[10px] text-lime-200/60 mt-0.5 font-bold">3D Halo Glow</span>
          </div>
        );
      case 'acrylic-clocks':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1E1B18] to-[#141210] text-[#F59E0B] p-4 text-center rounded-2xl relative overflow-hidden shadow-inner">
            <div className="absolute inset-2 border border-[#F59E0B]/25 rounded-full"></div>
            <Clock className="w-10 h-10 mb-2 stroke-[1.5]" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#F59E0B] font-bold">
              Silent Quartz Clock
            </span>
            <span className="text-[10px] text-amber-200/70 mt-0.5 font-bold">Dual-Layer 3D Acrylic</span>
          </div>
        );
      case 'name-boards':
      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1E232A] to-[#12161B] text-[#DCF763] p-4 text-center rounded-2xl relative overflow-hidden">
            <div className="absolute inset-2 border border-[#DCF763]/25 rounded-xl"></div>
            <Layers className="w-10 h-10 mb-2 stroke-[1.5]" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-slate-200 font-bold">
              Lumina Art Entrance Board
            </span>
            <span className="text-[10px] text-[#DCF763] mt-0.5 font-bold">Weather-Proof Acrylic</span>
          </div>
        );
    }
  };

  if (hasError || !src) {
    return renderFallback();
  }

  const isContain = className.includes('object-contain');

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`w-full h-full ${isContain ? 'object-contain' : 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
        loading="lazy"
      />
    </div>
  );
};
