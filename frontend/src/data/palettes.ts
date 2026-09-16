export type PaletteId = 'atelier' | 'sage' | 'cashmere' | 'obsidian' | 'original';

export interface PaletteConfig {
  id: PaletteId;
  name: string;
  subtitle: string;
  previewColor: string;
  previewSecondary: string;
  bodyBg: string;
  bodyGradient: string;
  containerBg: string;
  containerBorder: string;
  containerShadow: string;
  textClass: string;
  isDark: boolean;
}

export const PALETTES: PaletteConfig[] = [
  {
    id: 'atelier',
    name: 'Warm Atelier',
    subtitle: 'Travertine & Alabaster Luxury',
    previewColor: '#EBE8E1',
    previewSecondary: '#D4AF37',
    bodyBg: '#EBE8E1',
    bodyGradient:
      'radial-gradient(at 12% 12%, #FAF7F2 0px, transparent 65%), radial-gradient(at 88% 88%, #DDD7CD 0px, transparent 65%)',
    containerBg: '#FAF8F5',
    containerBorder: 'rgba(215, 207, 196, 0.75)',
    containerShadow: '0 25px 60px -15px rgba(60, 52, 42, 0.12)',
    textClass: 'text-slate-800',
    isDark: false,
  },
  {
    id: 'sage',
    name: 'Nordic Sage',
    subtitle: 'Organic Mineral Neutral',
    previewColor: '#D6DFD8',
    previewSecondary: '#1E392F',
    bodyBg: '#D6DFD8',
    bodyGradient:
      'radial-gradient(at 12% 12%, #EBF2EC 0px, transparent 65%), radial-gradient(at 88% 88%, #C2CEC5 0px, transparent 65%)',
    containerBg: '#F3F6F4',
    containerBorder: 'rgba(200, 212, 203, 0.75)',
    containerShadow: '0 25px 60px -15px rgba(35, 52, 40, 0.12)',
    textClass: 'text-slate-800',
    isDark: false,
  },
  {
    id: 'cashmere',
    name: 'Soft Cashmere',
    subtitle: 'Warm Boutique & Gifting',
    previewColor: '#EAE4E1',
    previewSecondary: '#C97A63',
    bodyBg: '#EAE4E1',
    bodyGradient:
      'radial-gradient(at 12% 12%, #F9F5F3 0px, transparent 65%), radial-gradient(at 88% 88%, #D9CECA 0px, transparent 65%)',
    containerBg: '#F9F6F4',
    containerBorder: 'rgba(220, 210, 205, 0.75)',
    containerShadow: '0 25px 60px -15px rgba(55, 42, 38, 0.12)',
    textClass: 'text-slate-800',
    isDark: false,
  },
  {
    id: 'obsidian',
    name: 'Obsidian Gallery',
    subtitle: 'Dark LED & Neon Showcase',
    previewColor: '#10141C',
    previewSecondary: '#DCF763',
    bodyBg: '#0D1117',
    bodyGradient:
      'radial-gradient(at 12% 12%, #1A2433 0px, transparent 65%), radial-gradient(at 88% 88%, #07090C 0px, transparent 65%)',
    containerBg: '#151C26',
    containerBorder: 'rgba(255, 255, 255, 0.12)',
    containerShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
    textClass: 'text-slate-100',
    isDark: true,
  },
  {
    id: 'original',
    name: 'Original Slate',
    subtitle: 'Industrial Grey Studio',
    previewColor: '#8C999C',
    previewSecondary: '#DCF763',
    bodyBg: '#8C999C',
    bodyGradient:
      'radial-gradient(at 10% 10%, #A4B2B4 0px, transparent 60%), radial-gradient(at 90% 90%, #768386 0px, transparent 60%)',
    containerBg: '#E8EDE7',
    containerBorder: 'rgba(255, 255, 255, 0.6)',
    containerShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    textClass: 'text-slate-800',
    isDark: false,
  },
];
