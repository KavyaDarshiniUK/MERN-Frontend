import React, { createContext, useContext, useEffect, useState } from 'react';
import { readLocalStorage, writeLocalStorage } from './localStorage';

const CartContext = createContext();
const CART_STORAGE_KEY = 'kc-kavya-cart';
const WISHLIST_STORAGE_KEY = 'kc-kavya-wishlist';

const isStoredItems = (value) => Array.isArray(value);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => readLocalStorage(CART_STORAGE_KEY, [], isStoredItems));
  const [wishlistItems, setWishlistItems] = useState(() => readLocalStorage(WISHLIST_STORAGE_KEY, [], isStoredItems));

  useEffect(() => {
    writeLocalStorage(CART_STORAGE_KEY, cartItems);
  }, [cartItems]);

  useEffect(() => {
    writeLocalStorage(WISHLIST_STORAGE_KEY, wishlistItems);
  }, [wishlistItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.filter(i => i.id !== product.id);
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => wishlistItems.some(i => i.id === id);

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQty, clearCart,
      wishlistItems, toggleWishlist, isInWishlist,
      cartTotal, cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
