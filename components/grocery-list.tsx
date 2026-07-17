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
    if (category) {
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
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-end mb-5">
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <GroceryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default GroceryList;
