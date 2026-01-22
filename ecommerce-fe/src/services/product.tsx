import { axiosClient } from "./axios";

export interface IProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discountPrice: number;
  description: string;
  stockQuantity: number;
  categoryId: number;
  specs: JSON;
  isActive: boolean;
}

export interface IProductListResponse {
  status: string;
  data: IProduct[];
}
export const fetchProductList = async (isSale: boolean, keyword: string) => {
  const res = await axiosClient.get<IProductListResponse>("/products", {
    params: { isSale, keyword },
  });
  return res;
};
