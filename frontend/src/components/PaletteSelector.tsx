import React, { useState } from 'react';
import { Palette, Check, Sparkles, X, RotateCcw } from 'lucide-react';
import { PaletteId, PALETTES } from '../data/palettes';

interface PaletteSelectorProps {
  currentPaletteId: PaletteId;
  onSelectPalette: (id: PaletteId) => void;
}

export const PaletteSelector: React.FC<PaletteSelectorProps> = ({
  currentPaletteId,
  onSelectPalette,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPalette = PALETTES.find((p) => p.id === currentPaletteId) || PALETTES[0];

  return (
    <div className="fixed bottom-5 right-5 z-40 print:hidden">
      {/* Expanded Palette Menu */}
      {isOpen ? (
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-4 shadow-2xl w-80 max-w-[calc(100vw-2.5rem)] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Showroom Color Palette</h4>
                <p className="text-[10px] text-slate-500">Live preview curated aesthetic themes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              title="Close switcher"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
            {PALETTES.map((p) => {
              const isSelected = p.id === currentPaletteId;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPalette(p.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex items-center -space-x-1.5 shrink-0">
                      <div
                        className="w-5 h-5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: p.previewColor }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: p.previewSecondary }}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate flex items-center gap-1.5">
                        <span>{p.name}</span>
                        {p.id === 'atelier' && (
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                              isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            Suggested
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-[10px] truncate ${
                          isSelected ? 'text-slate-300' : 'text-slate-400'
                        }`}
                      >
                        {p.subtitle}
                      </div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Instant real-time update</span>
            </span>
            <button
              onClick={() => onSelectPalette('original')}
              className="text-[10px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset original</span>
            </button>
          </div>
        </div>
      ) : (
        /* Floating Pill Button */
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-white/95 hover:bg-white text-slate-900 px-3.5 py-2 rounded-full shadow-lg border border-slate-200/80 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          title="Try different showroom color palettes"
        >
          <div className="flex items-center -space-x-1">
            <div
              className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs"
              style={{ backgroundColor: currentPalette.previewColor }}
            />
            <div
              className="w-3 h-3 rounded-full border border-black/10 shadow-2xs"
              style={{ backgroundColor: currentPalette.previewSecondary }}
            />
          </div>
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
            <Palette className="w-3.5 h-3.5 text-slate-600 group-hover:rotate-12 transition-transform" />
            <span>Theme: {currentPalette.name}</span>
          </span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">
            Preview
          </span>
        </button>
      )}
    </div>
  );
};
