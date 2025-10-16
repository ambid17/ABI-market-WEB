import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-bootstrap";
import { Item, ItemType } from "../page";
import { Dispatch, SetStateAction } from "react";

type CategoryFilterProps = {
  itemTypes: ItemType[];
  setSelectedItem(item: Item | undefined): void;
  selectedItemType: ItemType | undefined;
  setSelectedItemType(itemType: ItemType | undefined): void;
};
export default function CategoryFilter({
  itemTypes,
  setSelectedItem,
  selectedItemType,
  setSelectedItemType,
}: CategoryFilterProps) {
  return (
    <div className="bg-slate-700 overflow-auto">
      <Accordion defaultActiveKey="0">
        {itemTypes.map((itemType) => (
          <AccordionItem eventKey={itemType.name} key={itemType.name}>
            <AccordionHeader>{itemType.name}</AccordionHeader>
            <AccordionBody>
              <div className="flex flex-col">
                {itemType.subTypes?.map((subtype) => (
                  <p
                    onClick={() => {
                      setSelectedItem(undefined);
                      setSelectedItemType(subtype);
                    }}
                    className={
                      selectedItemType?.name == subtype.name
                        ? "bg-slate-100"
                        : ""
                    }
                    key={subtype.name}
                  >
                    {subtype.name}
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
