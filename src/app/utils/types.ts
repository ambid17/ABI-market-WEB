export type Item = {
  id: number;
  name: string;
  itemCategoryId: number;
  itemSubcategoryId: number;
  priceHistory: ItemPrice[];
};

export type ItemPrice = {
  price: number;
  date: Date;
};

export type ItemCategory = {
  id: number;
  name: string;
  itemSubcategories?: ItemSubcategory[];
};

export type ItemSubcategory = {
  id: number;
  name: string;
  categoryId: number;
};
