"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, ShoppingCart, TicketPercent } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CartDialog = () => {
  const { cart, updateQuantity, applyCoupon, subtotal, discount, total } =
    useCart();
  const [coupon, setCoupon] = useState("");

  const totalItems = cart.items.length;

  const handleCoupon = () => {
    const applied = applyCoupon(coupon.toUpperCase());

    if (applied) {
      toast.success("Coupon applied successfully");
    } else {
      toast.error("Invalid coupon or cart below ₹1000");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="relative gap-2 rounded-full">
            <ShoppingCart className="h-4 w-4" />
            Cart
          </Button>
        }
      >
        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground">
            {totalItems}
          </span>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-lg gap-0 p-0">
        <DialogHeader className="border-b border-border/50 px-6 py-4">
          <DialogTitle className="flex items-center gap-2.5 text-lg tracking-wide">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Shopping Cart
          </DialogTitle>
        </DialogHeader>

        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
              <ShoppingCart className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold">Your cart is empty</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add some grocery items to get started
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/20 px-4 py-3"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      size="icon-xs"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="w-6 text-center text-sm font-semibold tabular-nums">
                      {item.quantity}
                    </span>

                    <Button
                      size="icon-xs"
                      variant="default"
                      className="rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-5 h-px bg-border/50" />

            <div className="space-y-2.5 rounded-xl bg-muted/30 p-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="h-px bg-border/40" />

              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-2">
                <TicketPercent className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Apply Coupon</p>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="e.g. OFF50"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="h-9 rounded-lg border-border/60 bg-background text-sm"
                />
                <Button
                  size="sm"
                  className="rounded-lg px-4"
                  onClick={handleCoupon}
                >
                  Apply
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Coupon applies on orders above ₹1000
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
