import { create } from "zustand";
import type { IProduct } from "../services/product";

interface IProductState {
  productList: IProduct[] | [];
  saleProductList: IProduct[] | [];
  setProductList: (data: IProduct[]) => void;
  setSaleProductList: (data: IProduct[]) => void;
}

export const useProductListStore = create<IProductState>()((set) => ({
  productList: [],
  saleProductList: [],
  setProductList: (data) =>
    set({ productList: Array.isArray(data) ? data : [] }),
  setSaleProductList: (data) =>
    set({ saleProductList: Array.isArray(data) ? data : [] }),
}));
