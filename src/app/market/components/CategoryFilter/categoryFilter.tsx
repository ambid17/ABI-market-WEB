import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
} from "react-bootstrap";
import { Item, ItemCategory, ItemSubcategory } from "@/app/utils/types";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ItemSelector = {
  itemCategories: ItemCategory[];
  items: Item[];
  selectedItem: Item | undefined;
  setSelectedItem(item: Item | undefined): void;
  setIsCreatingNewItem(isCreatingNewItem: boolean): void;
};
export default function ItemSelector({
  itemCategories,
  items,
  selectedItem,
  setSelectedItem,
  setIsCreatingNewItem
}: ItemSelector) {
  const [selectedItemSubcategory, setSelectedItemSubcategory] =
    useState<ItemSubcategory>();

  function getCategorySelector() {
    return (
      <div className="bg-slate-700 overflow-auto">
        <Accordion defaultActiveKey="0">
          {itemCategories?.map((itemCategory) => (
            <AccordionItem eventKey={itemCategory.name} key={itemCategory.name}>
              <AccordionHeader>{itemCategory.name}</AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col">
                  {itemCategory.itemSubcategories?.map((subcategory) => (
                    <p
                      onClick={() => {
                        setSelectedItemSubcategory(subcategory);
                      }}
                      className={
                        selectedItemSubcategory?.name == subcategory.name
                          ? "bg-slate-100"
                          : ""
                      }
                      key={subcategory.id}
                    >
                      {subcategory.name}
                    </p>
                  ))}
                </div>
              </AccordionBody>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  function getItemSelector() {
    if (!selectedItemSubcategory) {
      return <></>;
    }
    return (
      <div className="flex flex-col p-4 border">
        {items
          ?.filter(
            (item) => item.itemSubcategoryId == selectedItemSubcategory.id
          )
          .map((item) => (
            <p
              onClick={() => setSelectedItem(item)}
              className={selectedItem?.name == item.name ? "bg-slate-100" : ""}
            >
              {item.name}
            </p>
          ))}
          <Button onClick={() => setIsCreatingNewItem(true)}>+</Button>
      </div>
    );
  }

  return (
    <>
      {getCategorySelector()}
      {getItemSelector()}
    </>
  );
}
