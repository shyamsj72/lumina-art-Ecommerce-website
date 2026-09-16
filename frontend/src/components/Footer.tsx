import React from 'react';
import { Mail, Instagram, MessageCircle, MapPin, Sparkles, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { ScreenType } from '../types';
import { LuminaLogo } from './LuminaLogo';
import { openWhatsAppGeneralInquiry, DISPLAY_PHONE_NUMBER } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  currentScreen: ScreenType;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentScreen }) => {
  return (
    <footer className="mt-12 pt-8 border-t border-slate-300/60 text-slate-700" data-purpose="application-footer">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col items-start">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 mb-3 text-left cursor-pointer group"
          >
            <LuminaLogo size="md" />
          </button>
          <p className="text-xs text-slate-600 leading-relaxed max-w-sm mb-4">
            Custom Cut. Delivered Fast. Premium CNC-cut architectural name boards, laser-cut acrylic craft, bespoke LED signage, and jali panels manufactured with millimeter precision.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Studio Workshop: Kerala, India • Express Pan-India Shipping</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="md:col-span-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">
            Explore Showroom
          </h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className={`hover:text-slate-950 transition-colors cursor-pointer ${
                  currentScreen === 'home' ? 'font-bold text-slate-950' : 'text-slate-600'
                }`}
              >
                Showroom Highlights
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('catalog')}
                className={`hover:text-slate-950 transition-colors cursor-pointer ${
                  currentScreen === 'catalog' ? 'font-bold text-slate-950' : 'text-slate-600'
                }`}
              >
                All Products Catalog (14+ Styles)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('custom-design')}
                className={`hover:text-slate-950 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  currentScreen === 'custom-design' ? 'font-bold text-slate-950' : 'text-slate-600'
                }`}
              >
                <span>Upload Custom Design</span>
                <span className="text-[9px] bg-[#DCF763] text-slate-950 font-black px-1.5 py-0.2 rounded-full">New</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('contact')}
                className={`hover:text-slate-950 transition-colors cursor-pointer ${
                  currentScreen === 'contact' ? 'font-bold text-slate-950' : 'text-slate-600'
                }`}
              >
                Contact & Support
              </button>
            </li>
          </ul>
        </div>

        {/* Direct Connect */}
        <div className="md:col-span-5">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">
            Direct Studio Connect
          </h4>
          <div className="space-y-2.5 text-xs">
            {/* Email */}
            <a
              href="mailto:luminaart0@gmail.com"
              className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 hover:bg-white border border-slate-200/60 transition-all text-slate-800 group"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-slate-400 block font-semibold">Email Us</span>
                <span className="font-bold truncate block group-hover:text-blue-600">luminaart0@gmail.com</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/lumina___art?stkn=YmQ4aDJ5NWl2dWZw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 hover:bg-white border border-slate-200/60 transition-all text-slate-800 group"
            >
              <div className="w-7 h-7 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                <Instagram className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-slate-400 block font-semibold">Follow on Instagram</span>
                <span className="font-bold truncate block group-hover:text-pink-600">@lumina___art</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* WhatsApp */}
            <button
              onClick={openWhatsAppGeneralInquiry}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-white/70 hover:bg-white border border-slate-200/60 transition-all text-slate-800 text-left group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MessageCircle className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-slate-400 block font-semibold">WhatsApp & Calls</span>
                <span className="font-bold truncate block group-hover:text-emerald-700">{DISPLAY_PHONE_NUMBER}</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Trust */}
      <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <span>© {new Date().getFullYear()} Lumina Art. All rights reserved.</span>
          <span>•</span>
          <span>Handcrafted in Kerala, India</span>
        </div>

        <div className="flex items-center gap-3 font-semibold">
          <span className="flex items-center gap-1 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Weather-Proof Acrylic & Teak</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
