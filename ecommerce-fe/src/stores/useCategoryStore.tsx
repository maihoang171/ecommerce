import { create } from "zustand";
import type { ICategory } from "../services/category";

interface ICategoryState {
  categoryList: ICategory[] | [];
  setCategoryList: (data: ICategory[]) => void;
}

export const useCategoryStore = create<ICategoryState>()((set) => ({
  categoryList: [],
  setCategoryList: (data) => set({ categoryList: Array.isArray(data) ? data : [] }),
}));
