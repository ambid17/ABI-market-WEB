import { Item, ItemCategory, ItemSubcategory } from "./types";

export const itemCategories: ItemCategory[] = [
  { id: 1, name: "Equipment" },
  { id: 2, name: "Weapon Accessories" },
  { id: 3, name: "Weapon Bolts" },
  { id: 4, name: "Ammo" },
  { id: 5, name: "Medical Supplies" },
  { id: 6, name: "Tactical Items" },
  { id: 7, name: "Keys" },
  { id: 8, name: "Miscellaneous" },
  { id: 9, name: "Provisions" },
];

export const itemSubcategories: ItemSubcategory[] = [
  { name: "Helmet", id: 1,  categoryId: 1},
  { name: "Mask", id: 2,  categoryId: 1 },
  { name: "Body Armor", id: 3,  categoryId: 1 },
  { name: "Unarmored Chest Rigs", id: 4,  categoryId: 1 },
  { name: "Armored Rig", id: 5,  categoryId: 1 },
  { name: "Backpack", id: 6,  categoryId: 1 },
  { name: "Headset", id: 7,  categoryId: 1 },
  { name: "Gas Mask", id: 8,  categoryId: 1 },
];

export const items: Item[] = [
  {
    id: 1,
    name: "Kelsey Fire Helmet",
    itemCategoryId: 1,
    itemSubcategoryId: 1,
    priceHistory: [{ price: 100, date: new Date() }],
  },
  {
    id: 2,
    name: "Lightweight Safety Helmet",
    itemCategoryId: 1,
    itemSubcategoryId: 1,
    priceHistory: [{ price: 100, date: new Date() }],
  },
];