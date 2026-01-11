import { axiosClient } from "./axios";
import axios from "axios";
import {registerUserDTO, loginDTO} from "../../../shared/user-dto.js"
import type z from "zod";

export type IRegisterUserRequest = z.infer<typeof registerUserDTO>

export type ILoginRequest = z.infer<typeof loginDTO>

export interface IUser {
  id: string;
  username: string;
  fullName: string;
  phone: string;
  role: string;
  createdAt: Date;
}

export const registerUser = async (payload: IRegisterUserRequest) => {
  const res = await axiosClient.post("/auth/register", payload);
  return res;
};

export const login = async (payload: ILoginRequest) => {
  const res = await axiosClient.post("/auth/login", payload);
  return res;
};

export const getMe = async () => {
  const res = await axiosClient.get<IUser>("/auth/me");
  return res;
};

//--------Location
export interface IWard {
  code: number;
  codename: string;
  district_code: number;
  division_type: string;
  name: string;
}

export interface IDistrict {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  province_code: number;
  wards: IWard[];
}

export interface IProvince {
  code: number;
  codename: string;
  districts: IDistrict[];
  division_type: string;
  name: string;
  phone_code: number;
}

export const fetchProvinces = async () => {
  const res = await axios.get<IProvince[]>(
    "https://provinces.open-api.vn/api/v1/p/"
  );
  return res.data;
};

export const fetchDistrictsByProvince = async (provinceCode: number) => {
  const res = await axios.get<IProvince>(
    `https://provinces.open-api.vn/api/v1/p/${provinceCode}?depth=2`
  );
  return res.data.districts;
};

export const fetchWardsByDistrict = async (districtCode: number) => {
  const res = await axios.get<IDistrict>(
    `https://provinces.open-api.vn/api/v1/d/${districtCode}?depth=2`
  );
  return res.data.wards;
};
