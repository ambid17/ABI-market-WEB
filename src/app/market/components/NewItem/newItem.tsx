import { Item, ItemCategory } from "@/app/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
} from "react-bootstrap";

type NewItemProps = {
  itemCategories: ItemCategory[] | undefined;
};
export default function NewItem({ itemCategories }: NewItemProps) {
  const [itemName, setItemName] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<number>(0);
  const [itemSubcategory, setItemSubcategory] = useState<number>(0);
  const queryClient = useQueryClient();

  const postItem = (item: Item) => {
    return axios.post("http://localhost:5255/Market/addItem", item);
  };

  const mutation = useMutation({
    mutationFn: postItem,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  function submitItem() {
    mutation.mutate({
      id: 0,
      name: itemName,
      itemCategoryId: itemCategory,
      itemSubcategoryId: itemSubcategory,
    });
  }
  return (
    <Form>
      <FormGroup>
        <FormLabel>Item Name</FormLabel>
        <FormControl
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Item Category</FormLabel>
        <FormSelect
          onChange={(e) => {
            setItemCategory(parseInt(e.target.value));
            setItemSubcategory(0); // clear subcategory selection
          }}
        >
          <option value={0}>Select a category</option>
          {itemCategories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </FormSelect>
      </FormGroup>
      <FormGroup>
        <FormLabel>Item Subcategory</FormLabel>
        <FormSelect
          onChange={(e) => setItemSubcategory(parseInt(e.target.value))}
          disabled={itemCategory == 0}
        >
          <option value={0}>Select a category</option>
          {itemCategories
            ?.find((category) => category.id == itemCategory)
            ?.itemSubcategories?.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
        </FormSelect>
      </FormGroup>
      <Button
        variant="primary"
        type="button"
        onClick={submitItem}
        disabled={itemName == "" || itemCategory == 0 || itemSubcategory == 0}
      >
        Submit
      </Button>
    </Form>
  );
}
