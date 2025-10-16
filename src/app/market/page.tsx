"use client";
import { useState } from "react";
import MarketView from "./components/marketView";
import ItemSelector from "./components/categoryFilter";
import { Item } from "../utils/types";

export default function MarketPage() {
  const [selectedItem, setSelectedItem] = useState<Item>();
  

  return (
    <div className="flex flex-row h-11/12">
      <ItemSelector
        selectedItem={selectedItem}
        setSelectedItem={(item) => {
          setSelectedItem(item);
        }}
      />
      {
        selectedItem && <MarketView selectedItem={selectedItem} />
      }
    </div>
  );
}
