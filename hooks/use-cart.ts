"use client";

import { TCart, TGroceryItem } from "@/types";
import { createContext, useContext } from "react";

export const CART_KEY = "grocery-cart";

export const defaultCart: TCart = { items: [], percentOff: 0, couponCode: "" };

export const loadCart = (): TCart => {
  if (typeof window === "undefined") return defaultCart;
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : defaultCart;
};

type Action =
  | { type: "ADD"; item: TGroceryItem }
  | { type: "SET_QUANTITY"; id: number; quantity: number }
  | { type: "APPLY_COUPON"; code: string; percent: number };

export const reducer = (cart: TCart, action: Action): TCart => {
  switch (action.type) {
    case "ADD": {
      const exists = cart.items.some((i) => i.id === action.item.id);
      return {
        ...cart,
        items: exists
          ? cart.items.map((i) =>
              i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i,
            )
          : [...cart.items, { ...action.item, quantity: 1 }],
      };
    }

    case "SET_QUANTITY":
      return {
        ...cart,
        items: cart.items
          .map((i) =>
            i.id === action.id ? { ...i, quantity: action.quantity } : i,
          )
          .filter((i) => i.quantity > 0),
      };

    case "APPLY_COUPON":
      return { ...cart, percentOff: action.percent, couponCode: action.code };

    default:
      return cart;
  }
};

export const CartContext = createContext<{
  cart: TCart;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");

  const { cart, dispatch } = ctx;

  const addToCart = (item: TGroceryItem) => dispatch({ type: "ADD", item });

  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: "SET_QUANTITY", id, quantity });

  const applyCoupon = (code: string) => {
    const subtotal = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );
    const match = code.match(/^OFF(\d+)$/);

    if (!match || subtotal < 1000) return false;

    dispatch({ type: "APPLY_COUPON", code, percent: Number(match[1]) });
    return true;
  };

  const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = subtotal >= 1000 ? subtotal * (cart.percentOff / 100) : 0;
  const total = subtotal - discount;

  return {
    cart,
    addToCart,
    updateQuantity,
    applyCoupon,
    subtotal,
    discount,
    total,
  };
};
