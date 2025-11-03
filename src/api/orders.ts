import { supabase } from './supabaseClient';
import type { Order, OrderItem, ShippingAddress } from '../types/type';
import { cartService } from './cart';

export const orderService = {
  async getAll(userId?: string): Promise<Order[]> {
    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          *,
          product:products(*)
        )
      `)
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          *,
          product:products(*)
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },

  async create(
    userId: string,
    shippingAddress: ShippingAddress
  ): Promise<Order> {
    // Get cart items
    const cartItems = await cartService.getCart(userId);

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    // Calculate total
    const totalAmount = cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        shipping_address: shippingAddress,
        status: 'pending',
        payment_status: 'pending',
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItemsData = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.product?.price || 0,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsData);

    if (itemsError) throw itemsError;

    // Clear cart
    await cartService.clearCart(userId);

    // Fetch complete order with items
    const completeOrder = await this.getById(order.id);
    if (!completeOrder) throw new Error('Failed to fetch created order');

    return completeOrder;
  },

  async updateStatus(id: string, status: Order['status']): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select(`
        *,
        order_items:order_items(
          *,
          product:products(*)
        )
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async updatePaymentStatus(
    id: string,
    paymentStatus: Order['payment_status']
  ): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ payment_status: paymentStatus })
      .eq('id', id)
      .select(`
        *,
        order_items:order_items(
          *,
          product:products(*)
        )
      `)
      .single();

    if (error) throw error;
    return data;
  },

  async getStats(): Promise<{
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    completedOrders: number;
  }> {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*');

    if (error) throw error;

    const totalOrders = orders?.length || 0;
    const totalRevenue =
      orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
    const pendingOrders =
      orders?.filter((o) => o.status === 'pending').length || 0;
    const completedOrders =
      orders?.filter((o) => o.status === 'delivered').length || 0;

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      completedOrders,
    };
  },
};

