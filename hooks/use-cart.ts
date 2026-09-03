"use client";

import { Action } from "@/components/providers/cart-provider";
import { TCart, TGroceryItem } from "@/types";
import { createContext, useContext } from "react";

export const CartContext = createContext<{
  cart: TCart;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const { cart, dispatch } = ctx;

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const addToCart = (item: TGroceryItem) => {
    dispatch({ type: "ADD", item });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({
      type: "SET_QUANTITY",
      id,
      quantity,
    });
  };

  const applyCoupon = (code: string) => {
    const match = code.match(/^OFF(\d+)$/);

    if (!match || subtotal < 1000) return false;

    dispatch({
      type: "APPLY_COUPON",
      code,
      percent: Number(match[1]),
    });

    return true;
  };

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
