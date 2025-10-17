import { Item, ItemCategory, ItemSubcategory } from "@/app/utils/types";
import { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
} from "react-bootstrap";

type ItemSelector = {
  itemCategories: ItemCategory[];
  items: Item[];
  selectedItem: Item | undefined;
  setSelectedItem(item: Item): void;
  setIsCreatingNewItem(isCreatingNewItem: boolean): void;
};
export default function ItemSelector({
  itemCategories,
  items,
  selectedItem,
  setSelectedItem,
  setIsCreatingNewItem,
}: ItemSelector) {
  const [selectedItemSubcategory, setSelectedItemSubcategory] =
    useState<ItemSubcategory>();

  function getCategorySelector() {
    if (!itemCategories) {
      return <></>;
    }
    return (
      <div className="bg-slate-700 overflow-auto">
        <Accordion defaultActiveKey="0">
          {itemCategories?.map((itemCategory) => (
            <AccordionItem
              eventKey={itemCategory.id.toString()}
              key={itemCategory.id}
            >
              <AccordionHeader>{itemCategory.name}</AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col">
                  {itemCategory.itemSubcategories?.map((subcategory) => (
                    <p
                      key={subcategory.id}
                      onClick={() => {
                        setSelectedItemSubcategory(subcategory);
                      }}
                      className={
                        selectedItemSubcategory?.name == subcategory.name
                          ? "bg-slate-100"
                          : ""
                      }
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
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                setIsCreatingNewItem(false);
              }}
              className={selectedItem?.name == item.name ? "bg-slate-100 pt-1 pb-1" : "pt-1 pb-1"}
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
