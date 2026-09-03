import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORY_COLORS: Record<string, string> = {
  Grains: "bg-amber-100 text-amber-700",
  Essentials: "bg-slate-200 text-slate-700",
  Dairy: "bg-sky-100 text-sky-700",
  Protein: "bg-rose-100 text-rose-700",
  Fruits: "bg-orange-100 text-orange-700",
  Vegetables: "bg-emerald-100 text-emerald-700",
  Bakery: "bg-yellow-100 text-yellow-700",
  Beverages: "bg-cyan-100 text-cyan-700",
  Snacks: "bg-violet-100 text-violet-700",
  Spices: "bg-red-100 text-red-700",
};
