import axios from 'axios';
import type {
  AuthResponse,
  Category,
  Product,
  ProductsResponse,
  Order,
  OrderStats
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth
export const authApi = {
  register: async (data: { email: string; password: string; name: string; role?: string }) => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
  login: async (data: { email: string; password: string }) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Categories
export const categoriesApi = {
  getAll: async () => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  },
  getBySlug: async (slug: string) => {
    const response = await api.get<Category & { products: Product[] }>(`/categories/slug/${slug}`);
    return response.data;
  },
  create: async (data: { name: string }) => {
    const response = await api.post<Category>('/categories', data);
    return response.data;
  },
  update: async (id: string, data: { name?: string }) => {
    const response = await api.put<Category>(`/categories/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

// Products
export const productsApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    categoryId?: string;
    featured?: boolean;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const response = await api.get<ProductsResponse>('/products', { params });
    return response.data;
  },
  getFeatured: async () => {
    const response = await api.get<Product[]>('/products/featured');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },
  create: async (data: Partial<Product>) => {
    const response = await api.post<Product>('/products', data);
    return response.data;
  },
  update: async (id: string, data: Partial<Product>) => {
    const response = await api.put<Product>(`/products/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Orders
export const ordersApi = {
  getAll: async () => {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },
  create: async (data: {
    items: Array<{ productId: string; quantity: number }>;
    address?: string;
    phone?: string;
  }) => {
    const response = await api.post<Order>('/orders', data);
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await api.put<Order>(`/orders/${id}/status`, { status });
    return response.data;
  },
  getStats: async () => {
    const response = await api.get<OrderStats>('/orders/stats');
    return response.data;
  },
};

// Upload
export const uploadApi = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  uploadMultiple: async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    const response = await api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const getImageUrl = (path: string | undefined | null) => {
  if (!path) return '/placeholder.svg';

  // Si c'est un tableau converti en string, ignorer
  if (path.startsWith('[') || path === 'undefined' || path === 'null') {
    return '/placeholder.svg';
  }

  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
};

// Helper pour extraire les images d'un produit (gère le cas où c'est une string JSON)
export const getProductImages = (images: string[] | string | undefined | null): string[] => {
  if (!images) return [];

  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return images ? [images] : [];
    }
  }

  return Array.isArray(images) ? images : [];
};

export default api;
