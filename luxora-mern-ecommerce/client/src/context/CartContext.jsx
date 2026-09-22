import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";
import "../styles/CartContext.css";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("luxora_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("luxora_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, ...product, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });

    // Best-effort sync to backend if the user is logged in.
    const token = localStorage.getItem("luxora_token");
    if (token) {
      api.addToCart(product._id, quantity).catch(() => {});
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id);
    setItems((prev) => prev.map((i) => (i._id === id ? { ...i, quantity } : i)));
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, totalCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
