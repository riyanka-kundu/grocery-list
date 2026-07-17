"use client";

import {
  CART_KEY,
  CartContext,
  defaultCart,
  loadCart,
  reducer,
} from "@/hooks/use-cart";
import { useEffect, useReducer } from "react";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(reducer, defaultCart, loadCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
