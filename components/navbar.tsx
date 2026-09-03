"use client";

import CartDialog from "@/components/cart-dialog";
import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
          Grocery Cart
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <CartDialog />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
