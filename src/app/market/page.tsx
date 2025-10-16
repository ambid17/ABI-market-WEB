"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "react-bootstrap";
import MarketView from "./components/marketView";
import CategoryFilter from "./components/categoryFilter";

export type Item = {
  name: string;
  itemType: string;
  tier: number;
  priceHistory: ItemPrice[];
  isFavorite: boolean;
};

export type ItemPrice = {
  price: number;
  date: Date;
};

export type ItemType = {
  name: string;
  subTypes?: ItemType[];
};

export default function MarketPage() {
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [selectedItemType, setSelectedItemType] = useState<ItemType>();

  const itemTypes: ItemType[] = [
    {
      name: "Favorites",
    },
    {
      name: "Equipment",
      subTypes: [
        { name: "Helmet" },
        { name: "Mask" },
        { name: "Body Armor" },
        { name: "Unarmored Chest Rigs" },
        { name: "Armored Rig" },
        { name: "Backpack" },
        { name: "Headset" },
        { name: "Gas Mask" },
      ],
    },
    { name: "Weapon Accessories" },
    { name: "Weapon Bolts" },
    { name: "Ammo", subTypes: [{ name: "7.62 x 54mm" }] },
    {
      name: "Medical Supplies",
      subTypes: [
        { name: "Medicine" },
        { name: "Treatments" },
        { name: "Medkits" },
        { name: "Stimulants" },
      ],
    },
    { name: "Tactical Items" },
    { name: "Keys" },
    { name: "Miscellaneous" },
    { name: "Provisions" },
  ];

  const items: Item[] = [
    {
      name: "Kelsey Fire Helmet",
      itemType: "Helmet",
      tier: 1,
      isFavorite: false,
      priceHistory: [{ price: 100, date: new Date() }],
    },
    {
      name: "Lightweight Safety Helmet",
      itemType: "Helmet",
      tier: 1,
      isFavorite: true,
      priceHistory: [{ price: 100, date: new Date() }],
    },
  ];

  const getItemsOfType = () => {
    return (
      <div className="grid p-4">
        {items
          .filter((item) => item.itemType == selectedItemType?.name)
          .map((item) => (
            <Card className="p-4" key={item.name}>
              <CardImg variant="top" src="holder.js/100px180" />
              <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                  Tier: {item.tier}
                </CardSubtitle>
                <Button onClick={() => setSelectedItem(item)}>Select</Button>
              </CardBody>
            </Card>
          ))}
      </div>
    );
  };

  const getSelectedItemView = () => {
    if (!selectedItemType) {
      return <p>Select an Item category</p>;
    }
    if (!selectedItem) {
      return getItemsOfType();
    }

    return <MarketView selectedItem={selectedItem} />;
  };
  return (
    <div className="flex flex-row h-11/12">
      <CategoryFilter
        itemTypes={itemTypes}
        selectedItemType={selectedItemType}
        setSelectedItem={(item) => {
          setSelectedItem(item);
        }}
        setSelectedItemType={(itemType) => {
          setSelectedItemType(itemType)
        }}
      />
      {getSelectedItemView()}
    </div>
  );
}
