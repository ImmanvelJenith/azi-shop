import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import type { CartItem } from '../types/type';
import { cartService } from '../api/cart';
import { useAuth } from '../hooks/useAuth';

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  loading: boolean;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextValue>({} as CartContextValue);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const cartItems = await cartService.getCart(user.id);
      setItems(cartItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = async (productId: string, quantity: number = 1) => {
    if (!user) throw new Error('User must be logged in to add items to cart');
    
    try {
      await cartService.addItem(user.id, productId, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (!user) throw new Error('User must be logged in');
    
    try {
      if (quantity <= 0) {
        await removeItem(cartItemId);
      } else {
        await cartService.updateQuantity(cartItemId, quantity);
        await fetchCart();
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  };

  const removeItem = async (cartItemId: string) => {
    if (!user) throw new Error('User must be logged in');
    
    try {
      await cartService.removeItem(cartItemId);
      await fetchCart();
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!user) throw new Error('User must be logged in');
    
    try {
      await cartService.clearCart(user.id);
      await fetchCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const value = {
    items,
    count,
    total,
    loading,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};

