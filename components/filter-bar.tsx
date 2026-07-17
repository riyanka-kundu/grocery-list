"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TSortOrder } from "@/types";
import { Search } from "lucide-react";

type FilterBarProps = {
  search: string;
  setSearch: (value: string) => void;
  sortOrder: TSortOrder;
  setSortOrder: (value: TSortOrder) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: {
    label: string;
    value: string;
  }[];
};

const sortItems = [
  { label: "Low to High", value: "asc" },
  { label: "High to Low", value: "desc" },
];

const FilterBar = ({
  search,
  setSearch,
  sortOrder,
  setSortOrder,
  category,
  setCategory,
  categories,
}: FilterBarProps) => {
  return (
    <div className="mb-8 rounded-xl p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

          <Input
            placeholder="Search groceries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort */}
        <Select
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value as TSortOrder)}
        >
          <SelectTrigger className="w-full lg:w-52">
            <SelectValue placeholder="Sort by">
              {sortItems.find((item) => item.value === sortOrder)?.label}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {sortItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category */}
        <Select
          value={category || "all"}
          onValueChange={(value) =>
            setCategory(!value || value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-full lg:w-52">
            <SelectValue placeholder="Category">
              {category
                ? categories.find((item) => item.value === category)?.label
                : "All"}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>

            {categories.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
