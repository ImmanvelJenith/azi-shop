import { supabase } from './supabaseClient';
import type { CartItem } from '../types/type';

export const cartService = {
  async getCart(userId: string): Promise<CartItem[]> {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async addItem(userId: string, productId: string, quantity: number = 1): Promise<CartItem> {
    // Check if item already exists in cart
    const existing = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (existing.data) {
      // Update quantity
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.data.quantity + quantity })
        .eq('id', existing.data.id)
        .select(`
          *,
          product:products(*)
        `)
        .single();

      if (error) throw error;
      return data;
    } else {
      // Insert new item
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: productId,
          quantity,
        })
        .select(`
          *,
          product:products(*)
        `)
        .single();

      if (error) throw error;
      return data;
    }
  },

  async updateQuantity(cartItemId: string, quantity: number): Promise<CartItem> {
    if (quantity <= 0) {
      await this.removeItem(cartItemId);
      throw new Error('Item removed from cart');
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .select(`
        *,
        product:products(*)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async removeItem(cartItemId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) throw error;
  },

  async clearCart(userId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
  },

  async getCartCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('cart_items')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) throw error;
    return count || 0;
  },

  async getCartTotal(userId: string): Promise<number> {
    const cartItems = await this.getCart(userId);
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  },
};

