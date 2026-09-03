"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { TGroceryItem } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

type AddToCartProps = {
  item: TGroceryItem;
};

const AddToCart = ({ item }: AddToCartProps) => {
  const { cart, addToCart, updateQuantity } = useCart();

  const cartItem = cart.items.find((cartItem) => cartItem.id === item.id);
  const previousQuantity = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    addToCart(item);

    toast.success(`${item.name} added to cart`, {
      action: {
        label: "Undo",
        onClick: () => updateQuantity(item.id, previousQuantity),
      },
    });
  };

  const handleQuantity = (quantity: number) => {
    updateQuantity(item.id, quantity);

    if (quantity === 0) {
      toast.error(`${item.name} removed`, {
        action: {
          label: "Undo",
          onClick: () => updateQuantity(item.id, previousQuantity),
        },
      });
    }
  };

  if (cartItem) {
    return (
      <div className="flex w-fit items-center justify-between gap-4 rounded-full border border-border/60 bg-muted/40 px-2 py-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => handleQuantity(cartItem.quantity - 1)}
          className="rounded-full"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="min-w-10 text-center text-lg font-semibold tabular-nums">
          {cartItem.quantity}
        </span>

        <Button
          size="icon"
          variant="default"
          onClick={() => handleQuantity(cartItem.quantity + 1)}
          className="rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button size="lg" className="gap-2 rounded-full" onClick={handleAdd}>
      <ShoppingCart className="h-4 w-4" />
      Add to Cart
    </Button>
  );
};

export default AddToCart;
