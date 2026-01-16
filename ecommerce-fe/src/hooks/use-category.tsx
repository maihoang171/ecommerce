import { useState } from "react";
import { fetchCategoryList } from "../services/category";
import { useCategoryStore } from "../stores/useCategoryStore";
import axios from "axios";

export const useFetchCategoryList = () => {
  const setCategoryList = useCategoryStore((state) => state.setCategoryList);
  const [error, setError] = useState("");

  const handleFetchCategoryList = async () => {
    try {
      setError("");
      const res = await fetchCategoryList();
      setCategoryList(res.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("An errored occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return {
    error,
    setError,
    handleFetchCategoryList,
  };
};
