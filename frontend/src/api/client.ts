/// <reference types="vite/client" />
import { CategoryData, Product } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export const apiClient = {
  async getCategories(): Promise<CategoryData[]> {
    const res = await fetch(`${API_BASE}/api/v1/categories/`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    return data.results || data; // Handle pagination if present
  },

  async getProducts(params?: {
    category?: string;
    search?: string;
    featured?: boolean;
    bestSeller?: boolean;
  }): Promise<Product[]> {
    const url = new URL(`${API_BASE}/api/v1/products/`, window.location.origin);
    
    if (params?.category && params.category !== 'all') {
      url.searchParams.append('category__slug', params.category);
    }
    if (params?.search) {
      url.searchParams.append('search', params.search);
    }
    if (params?.featured) {
      url.searchParams.append('is_featured', 'true');
    }
    if (params?.bestSeller) {
      url.searchParams.append('is_best_seller', 'true');
    }

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    // Assuming DRF pagination
    return data.results || data;
  },

  async sendCustomDesignEmail(formData: FormData): Promise<{ status: string; message: string }> {
    const res = await fetch(`${API_BASE}/api/v1/custom-design/send-email/`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to send email');
    return await res.json();
  },

  async sendChatMessage(message: string, sessionId?: string): Promise<{ sessionId: string; reply: string; rateLimited?: boolean }> {
    const res = await fetch(`${API_BASE}/api/v1/chatbot/message/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, sessionId }),
    });
    // Even if 429/500, our backend returns JSON if handled, but let's check
    const data = await res.json();
    if (!res.ok && !data.rateLimited) {
      throw new Error('Failed to send message');
    }
    return data;
  }
};
