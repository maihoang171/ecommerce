import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { camelizeKeys } from "humps";

export function toArray<T>(t?: T | T[]): T[] {
  return Array.isArray(t) ? t : t ? [t] : [];
}

const baseURL = "http://localhost:3000/api/v1";
const defaultConfig: AxiosRequestConfig = {
  timeout: 60000,
  withCredentials: true,
  baseURL,
};

const camelizeResponseKeys = (data: unknown) => {
  return data instanceof Blob ? data : camelizeKeys(data);
};

const createAxiosClient = (config: AxiosRequestConfig = defaultConfig) => {
  const instance = axios.create({
    ...config,
    transformResponse: [
      ...toArray(axios.defaults.transformResponse),
      camelizeResponseKeys,
    ],
  });

  return instance;
};

export const axiosClient = createAxiosClient();
