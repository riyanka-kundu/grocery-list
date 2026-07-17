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
      <DialogTrigger>
        <Button>
          <ShoppingCart className="h-4 w-4" />
          Cart
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
          </DialogTitle>
        </DialogHeader>

        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">
              Add some grocery items
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="max-h-[350px] space-y-4 overflow-y-auto pr-2">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border p-3"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="w-6 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <Button
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 rounded-xl bg-muted/40 p-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Discount</span>
                <span className="text-green-600">-₹{discount}</span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TicketPercent className="h-5 w-5 text-muted-foreground" />
                <p className="font-medium">Apply Coupon</p>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="OFF50"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <Button onClick={handleCoupon}>Apply</Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Coupon applies only above ₹1000
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
