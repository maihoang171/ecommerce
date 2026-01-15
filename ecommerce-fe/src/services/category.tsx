import { axiosClient } from "./axios";

export interface ICategory {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ICategoryListResponse {
  status: string;
  data: ICategory[];
}

export const fetchCategoryList = async () => {
  const res = await axiosClient.get<ICategoryListResponse>("/categories");
  return res;
};
