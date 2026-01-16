import axios from "axios";
import { fetchProductList } from "../services/product";
import { useState } from "react";
import { useProductListStore } from "../stores/useProductStore";

export const useFetchProductList = (initialParams?: { isSale?: boolean }) => {
  const [error, setError] = useState("");
  const setProductList = useProductListStore((state) => state.setProductList);
  const isSale = initialParams?.isSale ?? false;

  const handleFetchProductList = async () => {
    try {
      setError("");

      const res = await fetchProductList(isSale);
      setProductList(res.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("An error occurred");
      } else {
        setError("Un expected error occurred");
      }
    }
  };

  return { error, handleFetchProductList };
};
