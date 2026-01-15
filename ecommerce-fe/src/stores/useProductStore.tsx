import { create } from "zustand";
import type { IProduct } from "../services/product";

interface IProductState {
  productList: IProduct[] | [];
  setProductList: (data: IProduct[]) => void;
}

export const useProductListStore = create<IProductState>()((set) => ({
  productList: [],
  setProductList: (data) =>
    set({ productList: Array.isArray(data) ? data : [] }),
}));
