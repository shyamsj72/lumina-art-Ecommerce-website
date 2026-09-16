export type ScreenType = 'home' | 'catalog' | 'custom-design' | 'contact';

export interface CustomDesignRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  material: string;
  size: string;
  customizationDetails: string;
  fileName?: string;
  fileSize?: string;
  fileDataUrl?: string;
  fileType?: string;
  createdAt: string;
}

export interface ProductVariant {
  thickness: string;
  price: number;
}

export interface RawProduct {
  name: string;
  image: string;
  keywords?: string[];
}

export interface CategoryData {
  category: string;
  slug: string;
  description: string;
  icon: string; // lucide icon identifier
  accentColor: string;
  products: RawProduct[];
  variants: ProductVariant[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  image: string;
  description: string;
  variants: ProductVariant[];
  minPrice: number;
  maxPrice: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  badge?: string;
  badgeType?: 'lime' | 'orange' | 'blue' | 'dark';
  keywords?: string[];
}

export interface CartItem {
  id: string; // composite key: `${productId}-${variant.thickness}`
  product: Product;
  variant: ProductVariant;
  quantity: number;
}
