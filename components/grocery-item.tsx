"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { TGroceryItem } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

type GroceryItemProps = {
  item: TGroceryItem;
};

const GroceryItem = ({ item }: GroceryItemProps) => {
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

  return (
    <Card className="group relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {item.name}
          </CardTitle>

          <Badge variant="secondary" className="shrink-0">
            {item.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold tracking-tight text-primary">
          ₹{item.price}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Per unit</p>
      </CardContent>

      <CardFooter>
        {cartItem ? (
          <div className="flex w-full items-center justify-between rounded-lg border bg-muted/30 p-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => handleQuantity(cartItem.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="min-w-8 text-center text-lg font-semibold">
              {cartItem.quantity}
            </span>

            <Button
              size="icon"
              onClick={() => handleQuantity(cartItem.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button className="w-full gap-2" onClick={handleAdd}>
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GroceryItem;
