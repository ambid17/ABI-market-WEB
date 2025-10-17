"use client";
import { useState } from "react";
import MarketView from "./components/marketView";
import ItemSelector from "./components/CategoryFilter/categoryFilter";
import { Item, ItemCategory } from "../utils/types";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import NewItem from "./components/NewItem/newItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function MarketPage() {
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [isCreatingNewItem, setIsCreatingNewItem] = useState<boolean>(false);

  const fetchCategories = (): Promise<ItemCategory[]> =>
    axios
      .get("http://localhost:5255/Market/getCategories")
      .then((response) => response.data);

  const {
    isPending: isCategoriesPending,
    error: categoryError,
    data: itemCategories,
  } = useQuery({
    queryKey: ["itemCategories"],
    queryFn: fetchCategories,
  });

  const fetchItems = (): Promise<Item[]> =>
    axios
      .get("http://localhost:5255/Market/getItems")
      .then((response) => response.data);

  const {
    isPending: isItemsPending,
    error: itemError,
    data: items,
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  function getMainView() {
    if (isCreatingNewItem) {
      return <NewItem itemCategories={itemCategories} />;
    } else if (selectedItem) {
      return <MarketView selectedItem={selectedItem} />;
    } else {
      return <p>Select an item</p>;
    }
  }

  return (
    <div className="flex flex-row h-11/12">
      <ItemSelector
        itemCategories={itemCategories ?? []}
        items={items ?? []}
        selectedItem={selectedItem}
        setSelectedItem={(item) => {
          setSelectedItem(item);
        }}
        setIsCreatingNewItem={(isCreating) => {
          setIsCreatingNewItem(isCreating);
        }}
      />
      {getMainView()}
    </div>
  );
}
