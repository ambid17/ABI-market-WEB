import { Item } from "@/app/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { defaultItem } from "../../page";
import PriceSubmitter from "./priceSubmitter";

type MarketViewProps = {
  selectedItem: Item;
};

export default function MarketView({ selectedItem }: MarketViewProps) {
  const fetchItem = (): Promise<Item> =>
    axios
      .get(`http://localhost:5255/Market/item/${selectedItem.id}`)
      .then((response) => response.data);

  const {
    isPending: isItemPending,
    error: itemError,
    data: item,
  } = useQuery({
    queryKey: ["item", selectedItem.id],
    queryFn: fetchItem,
    enabled: selectedItem.id > 0,
  });

  const existingItem = item ?? defaultItem;
  
  const getCurrentPrice = () => {
    if(!existingItem.itemPrices){
      return "No price data";
    }else{
      const priceHistory = existingItem.itemPrices ?? []
      return priceHistory[priceHistory.length - 1].price;
    }
  }


  
  return (
    <div className="flex flex-row justify-around">
      <div className="flex flex-col">
        <div>
          <p>Item Name: {selectedItem.name}</p>
          <p>CurrentPrice: {getCurrentPrice()}</p>
        </div>
        <div>
          <PriceSubmitter selectedItem={selectedItem}/>
        </div>
      </div>

      <ResponsiveContainer width={500} height="100%">
        <LineChart
          data={existingItem.itemPrices}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="price" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
