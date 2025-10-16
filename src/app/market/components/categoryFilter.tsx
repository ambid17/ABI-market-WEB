import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-bootstrap";
import { Item, ItemCategory, ItemSubcategory } from "@/app/utils/types";
import { useState } from "react";
import { itemCategories, items } from "@/app/utils/mockData";
import { useQuery } from "@tanstack/react-query";

type ItemSelector = {
  selectedItem: Item | undefined;
  setSelectedItem(item: Item | undefined): void;
};
export default function ItemSelector({
  selectedItem,
  setSelectedItem,
}: ItemSelector) {
  const [selectedItemSubcategory, setSelectedItemSubcategory] =
    useState<ItemSubcategory>();

  const { isPending, error, data } = useQuery({
    queryKey: ["itemCategories"],
    queryFn: () => fetch("http://localhost:5255/Market/getCategories"),
  });

  if (isPending) {
    return "Loading";
  }

  if (error) {
    return `error has occurred: ${error.message}`;
  }

  function getCategoryFilter() {
    return (
      <div className="bg-slate-700 overflow-auto">
        <Accordion defaultActiveKey="0">
          {itemCategories.map((itemCategory) => (
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
                      key={subcategory.name}
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
          .filter(
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
      </div>
    );
  }

  return (
    <>
      {getCategoryFilter()}
      {getItemSelector()}
    </>
  );
}
