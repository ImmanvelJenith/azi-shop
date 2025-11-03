import { supabase } from './supabaseClient';
import type { Product } from '../types/type';

export interface ProductFilters {
  categoryId?: string;
  subcategoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  brand?: string;
}

export const productService = {
  async getAll(filters?: ProductFilters): Promise<Product[]> {
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories!products_category_id_fkey(*),
        subcategory:categories!products_subcategory_id_fkey(*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (filters?.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }

    if (filters?.subcategoryId) {
      query = query.eq('subcategory_id', filters.subcategoryId);
    }

    if (filters?.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters?.inStock) {
      query = query.gt('stock', 0);
    }

    if (filters?.brand) {
      query = query.eq('brand', filters.brand);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories!products_category_id_fkey(*),
        subcategory:categories!products_subcategory_id_fkey(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },

  async getByCategory(categoryId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories!products_category_id_fkey(*),
        subcategory:categories!products_subcategory_id_fkey(*)
      `)
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getBySubcategory(subcategoryId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories!products_category_id_fkey(*),
        subcategory:categories!products_subcategory_id_fkey(*)
      `)
      .eq('subcategory_id', subcategoryId)
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async search(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories!products_category_id_fkey(*),
        subcategory:categories!products_subcategory_id_fkey(*)
      `)
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`)
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getFeatured(limit: number = 8): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories!products_category_id_fkey(*),
        subcategory:categories!products_subcategory_id_fkey(*)
      `)
      .eq('is_active', true)
      .gt('stock', 0)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async create(product: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'category' | 'subcategory'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select(`
        *,
        category:categories!products_category_id_fkey(*),
        subcategory:categories!products_subcategory_id_fkey(*)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        category:categories!products_category_id_fkey(*),
        subcategory:categories!products_subcategory_id_fkey(*)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async uploadImage(file: File, productId: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${productId}-${Math.random()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },
};

