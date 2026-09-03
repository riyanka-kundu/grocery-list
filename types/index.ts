export type TGroceryItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

export type TSortOrder = "asc" | "desc";

export type TCartItem = TGroceryItem & {
  quantity: number;
};

export type TCart = {
  items: TCartItem[];
  percentOff: number;
  couponCode: string;
};
