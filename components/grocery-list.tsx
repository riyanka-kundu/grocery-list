"use client";

import CartDialog from "@/components/cart-dialog";
import FilterBar from "@/components/filter-bar";
import GroceryItem from "@/components/grocery-item";
import { GROCERY_DATA } from "@/data";
import { TSortOrder } from "@/types";
import { useMemo, useState } from "react";

const GroceryList = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<TSortOrder>("asc");
  const [category, setCategory] = useState<string>("all");

  const categoryItems = useMemo(() => {
    return [...new Set(GROCERY_DATA.map((item) => item.category))].map(
      (category) => ({
        label: category,
        value: category,
      }),
    );
  }, []);

  const filteredItems = useMemo(() => {
    let items = [...GROCERY_DATA];

    // Search
    if (search) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Category filter
    if (category && category !== "all") {
      items = items.filter((item) => item.category === category);
    }

    // Sort
    items.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      }

      return b.price - a.price;
    });

    return items;
  }, [search, category, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Fresh everyday
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Grocery Cart
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse and shop fresh essentials
          </p>
        </div>
        <CartDialog />
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        category={category}
        setCategory={setCategory}
        categories={categoryItems}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <GroceryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default GroceryList;
