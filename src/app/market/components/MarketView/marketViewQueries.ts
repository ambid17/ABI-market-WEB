import { Item, ItemPrice } from "@/app/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetItemQuery = (itemId: number) => {
  const fetchItem = (): Promise<Item> =>
    axios
      .get(`http://localhost:5255/Market/item/${itemId}`)
      .then((response) => response.data);
  const { isPending, error, data } = useQuery({
    queryKey: ["item", itemId],
    queryFn: fetchItem,
    enabled: itemId > 0,
  });

  return { isPending, error, data };
};

export const useDeletePriceMutation = () => {
  const queryClient = useQueryClient();
  const deleteItemPrice = (priceId: number) => {
    return axios.post(`http://localhost:5255/Market/deletePrice/${priceId}`);
  };

  const mutation = useMutation({
    mutationFn: (priceId: number) => deleteItemPrice(priceId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["item"], refetchType: "all" });
    },
  });

  return mutation;
};
