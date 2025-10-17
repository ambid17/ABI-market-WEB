import { GraphDisplayItem, Item, GraphItemPrice } from "@/app/utils/types";
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
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  DotProps,
  Legend,
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { defaultItem } from "../../page";
import PriceSubmitter from "./priceSubmitter";
import { useDeletePriceMutation, useGetItemQuery } from "./marketViewQueries";

type MarketViewProps = {
  selectedItem: Item;
};

export default function MarketView({ selectedItem }: MarketViewProps) {
  const [isDeletingPrices, setIsDeletingPrices] = useState<boolean>(false);
  const deletePriceMutation = useDeletePriceMutation();

  const {
    isPending: isItemPending,
    error: itemError,
    data: item,
  } = useGetItemQuery(selectedItem.id);

  const existingItem = item ?? defaultItem;
  function getConvertedDatePrices(): GraphDisplayItem {
    if (!existingItem.itemPrices || existingItem.itemPrices.length == 0) {
      return { itemPrices: []} as GraphDisplayItem;
    } else {
      return {
        itemPrices: existingItem.itemPrices?.map((price) => {
          return {
            date: new Date(price.date).toLocaleDateString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            }),
            price: price.price,
            id: price.id,
          } as GraphItemPrice;
        }),
      } as GraphDisplayItem;
    }
  }
  const convertedDatePrices = getConvertedDatePrices();

  function getCurrentPrice() {
    if (!existingItem.itemPrices || existingItem.itemPrices.length === 0) {
      return "No price data";
    } else {
      const priceHistory = existingItem.itemPrices ?? [];
      return priceHistory[priceHistory.length - 1].price;
    }
  }

  function tryDeletePrice(data: any, index: number) {
    if (!isDeletingPrices) {
      return;
    }
    console.log(JSON.stringify(data.id));
    deletePriceMutation.mutate(data.id);
  }

  function onLineClick(x: any, y: any) {
    console.log(x);
  }

  return (
    <div className="flex flex-row justify-around p-4">
      <div className="flex flex-col">
        <div>
          <p>Item Name: {selectedItem.name}</p>
          <p>CurrentPrice: {getCurrentPrice()}</p>
        </div>
        <div>
          <PriceSubmitter selectedItem={selectedItem} />
        </div>
        <div>
          <Button
            onClick={() => setIsDeletingPrices(!isDeletingPrices)}
            variant={isDeletingPrices ? "outline-danger" : "danger"}
            className="m-4"
          >
            Delete Prices
          </Button>
          <p></p>
        </div>
      </div>

      <ResponsiveContainer width={800} height="100%">
        <BarChart
          data={convertedDatePrices.itemPrices}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString("en-US")}
          />
          <YAxis dataKey="price" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="price"
            activeBar={<Rectangle fill="green" stroke="blue" />}
            onClick={tryDeletePrice}
          >
            {convertedDatePrices.itemPrices.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill="#82ca9d"
                key={`cell-${index}`}
              ></Cell>
            ))}
          </Bar>
          {/* <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            activeDot={{onClick: dot => tryDeletePrice(dot), r: 12 }}
            dot={{onClick: dot => tryDeletePrice(dot), r:8}}
            onClick={onLineClick}
          /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
