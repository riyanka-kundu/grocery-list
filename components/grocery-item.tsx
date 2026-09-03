"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { CATEGORY_COLORS, cn } from "@/lib/utils";
import { TGroceryItem } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    <Card className="group relative flex h-full flex-col gap-3 overflow-hidden border border-border/60 bg-card pb-0 pt-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
      <Link
        href={`/items/${item.id}`}
        className="relative block aspect-4/3 overflow-hidden bg-muted"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <CardContent className="flex flex-1 flex-col gap-1.5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link
            href={`/items/${item.id}`}
            className="text-base font-semibold tracking-wide uppercase line-clamp-1 transition-colors hover:text-primary"
          >
            {item.name}
          </Link>

          <Badge
            variant="secondary"
            className={cn(
              "shrink-0 rounded-full px-2.5 py-0.5 text-[0.6rem]",
              CATEGORY_COLORS[item.category],
            )}
          >
            {item.category}
          </Badge>
        </div>

        <p className="text-2xl font-bold tracking-tight text-primary">
          ₹{item.price}
          <span className="text-sm font-medium text-muted-foreground">
            {" "}
            / per unit
          </span>
        </p>
      </CardContent>

      <CardFooter className="pb-5 pt-3">
        {cartItem ? (
          <div className="flex w-full items-center justify-between rounded-full border border-border/60 bg-muted/40 px-1 py-1">
            <Button
              size="icon-xs"
              variant="ghost"
              onClick={() => handleQuantity(cartItem.quantity - 1)}
              className="rounded-full"
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>

            <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
              {cartItem.quantity}
            </span>

            <Button
              size="icon-xs"
              variant="default"
              onClick={() => handleQuantity(cartItem.quantity + 1)}
              className="rounded-full"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <Button
            className="w-full gap-2 rounded-full"
            size="sm"
            onClick={handleAdd}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GroceryItem;
