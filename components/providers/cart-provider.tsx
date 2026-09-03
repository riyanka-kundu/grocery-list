"use client";

import { CartContext } from "@/hooks/use-cart";

import { TCart, TGroceryItem } from "@/types";
import { useEffect, useReducer } from "react";

export const CART_KEY = "grocery-cart";

export const defaultCart: TCart = {
  items: [],
  percentOff: 0,
  couponCode: "",
};

export type Action =
  | { type: "ADD"; item: TGroceryItem }
  | { type: "SET_QUANTITY"; id: number; quantity: number }
  | { type: "APPLY_COUPON"; code: string; percent: number };

const loadCart = (): TCart => {
  if (typeof window === "undefined") {
    return defaultCart;
  }

  const stored = localStorage.getItem(CART_KEY);

  return stored ? JSON.parse(stored) : defaultCart;
};

const reducer = (cart: TCart, action: Action): TCart => {
  switch (action.type) {
    case "ADD": {
      const item = cart.items.find((i) => i.id === action.item.id);

      if (item) {
        return {
          ...cart,
          items: cart.items.map((i) =>
            i.id === action.item.id
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                }
              : i,
          ),
        };
      }

      return {
        ...cart,
        items: [
          ...cart.items,
          {
            ...action.item,
            quantity: 1,
          },
        ],
      };
    }

    case "SET_QUANTITY":
      return {
        ...cart,
        items: cart.items
          .map((i) =>
            i.id === action.id
              ? {
                  ...i,
                  quantity: action.quantity,
                }
              : i,
          )
          .filter((i) => i.quantity > 0),
      };

    case "APPLY_COUPON":
      return {
        ...cart,
        percentOff: action.percent,
        couponCode: action.code,
      };

    default:
      return cart;
  }
};

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
