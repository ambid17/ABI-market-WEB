export type Item = {
  id: number;
  name: string;
  itemCategoryId: number;
  itemCategory?: ItemCategory;
  itemSubcategoryId: number;
  itemSubcategory?: ItemSubcategory;
  itemPrices?: ItemPrice[];
};

export type ItemPrice = {
  id: number;
  itemId: number;
  item?: Item;
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

export type GraphDisplayItem = {
  itemPrices: GraphItemPrice[];
};

export type GraphItemPrice = {
  price: number;
  date: string;
  id: number;
}
