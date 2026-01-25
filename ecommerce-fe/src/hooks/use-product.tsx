import axios from "axios";
import { fetchProductList } from "../services/product";
import { useState } from "react";
import { useProductListStore } from "../stores/useProductStore";

export const useFetchProductList = () => {
  const [error, setError] = useState("");
  const setProductList = useProductListStore((state) => state.setProductList);
  const setSaleProductList = useProductListStore(
    (state) => state.setSaleProductList,
  );

  const handleFetchSaleProductList = async () => {
    try {
      setError("");

      const res = await fetchProductList(true, "", undefined);
      setSaleProductList(res.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("An error occurred while fetch sale products");
      } else {
        setError("Un expected error occurred");
      }
    }
  };

  const handleFetchProductList = async (keyword: string, categoryId: number) => {
    try {
      setError("");

      const res = await fetchProductList(false, keyword, categoryId);
      setProductList(res.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("An error occurred while searching");
      } else {
        setError("Un expected error occurred");
      }
    }
  };

  return { error, handleFetchSaleProductList, handleFetchProductList };
};
