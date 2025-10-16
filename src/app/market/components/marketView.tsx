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
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Item } from "@/app/utils/types";

type MarketViewProps = {
  selectedItem: Item;
};

export default function MarketView({ selectedItem }: MarketViewProps) {
  const [inputPrice, setInputPrice] = useState<number>(0.0);

  function submitPrice() {
    console.log(`submitting: ${inputPrice}`);
  }
  return (
    <div className="flex flex-row justify-around">
      <div className="flex flex-col">
        <div>
          <p>Item Name: {selectedItem.name}</p>
          <p>
            CurrentPrice:{" "}
            {
              selectedItem.priceHistory[selectedItem.priceHistory.length - 1]
                .price
            }
          </p>
        </div>
        <div>
          <Form>
            <FormGroup>
              <FormLabel>Submit the current price</FormLabel>
              <FormControl
                type="number"
                min="0"
                step="0.01"
                value={inputPrice}
                onChange={(e) => setInputPrice(parseFloat(e.target.value))}
              ></FormControl>
              <Button variant="primary" type="button" onClick={submitPrice}>
                Submit
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>

      <ResponsiveContainer width={500} height="100%">
        <LineChart
          data={selectedItem.priceHistory}
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
