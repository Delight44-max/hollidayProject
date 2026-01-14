'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CartItem, CartContextType } from '@/types/cart';

export const CartContext = createContext<CartContextType | undefined>(undefined);


const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { itemCount, totalPrice };
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);


  useEffect(() => {
    const savedCart = localStorage.getItem('semicolon-cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);


  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('semicolon-cart', JSON.stringify(items));
    } else if (localStorage.getItem('semicolon-cart')) {

      localStorage.removeItem('semicolon-cart');
    }
  }, [items]);



  const addItem: CartContextType['addItem'] = useCallback((product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {

        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const removeItem: CartContextType['removeItem'] = useCallback((id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const updateQuantity: CartContextType['updateQuantity'] = useCallback((id, quantity) => {
    setItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== id);
      }
      return prevItems.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      );
    });
  }, []);

  const clearCart: CartContextType['clearCart'] = useCallback(() => {
      setItems([]);
  }, []);

  const { itemCount, totalPrice } = useMemo(() => calculateTotals(items), [items]);

  const contextValue = useMemo(() => ({
    items,
    itemCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }), [items, itemCount, totalPrice, addItem, removeItem, updateQuantity, clearCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};