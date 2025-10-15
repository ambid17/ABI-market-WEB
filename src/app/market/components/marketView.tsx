import { Item } from "../page";

type MarketViewProps = {
    selectedItem: Item
}
export default function MarketView({selectedItem}: MarketViewProps) {
  return (
    <div>
      <p>Item Name: {selectedItem.name}</p>
      <p>CurrentPrice: {selectedItem.currentPrice}</p>
    </div>
  );
}
