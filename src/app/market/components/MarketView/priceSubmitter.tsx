import { Item, ItemPrice } from "@/app/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

type PriceSubmitterProps = {
    selectedItem: Item;
}

export default function PriceSubmitter({selectedItem}: PriceSubmitterProps) {
  const queryClient = useQueryClient();
  const [inputPrice, setInputPrice] = useState<number>(0.0);

  const postItemPrice = (itemPrice: ItemPrice) => {
    return axios.post("http://localhost:5255/Market/addPrice", itemPrice);
  };

  const mutation = useMutation({
    mutationFn: postItemPrice,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["item"], refetchType: "all" });
    },
  });

  function submitPrice() {
    var itemPrice: ItemPrice = {
        id: 0,
        itemId: selectedItem.id,
        date: new Date(),
        price: inputPrice,
    }
    mutation.mutate(itemPrice);
  }

  function onPriceUpdate(priceUpdate: string){
    var parsedPrice = parseFloat(priceUpdate);
    if(!Number.isNaN(parsedPrice)){
        setInputPrice(parsedPrice);
    }else{
        setInputPrice(0);
    }
  }

  return (
    <Form>
      <FormGroup>
        <FormLabel>Submit the current price</FormLabel>
        <FormControl
          type="number"
          min="0"
          step="0.01"
          value={inputPrice == 0 ? "" : inputPrice}
          onChange={(e) => setInputPrice(parseFloat(e.target.value))}
        ></FormControl>
        <Button variant="primary" type="button" onClick={submitPrice}>
          Submit
        </Button>
      </FormGroup>
    </Form>
  );
}
