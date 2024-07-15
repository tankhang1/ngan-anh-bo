import { BASE_PORT, HTTPS_METHOD } from "../../../constants";
import { TProduct, TBin } from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export enum InfoEnum {
  PRODUCTS = "PRODUCTS",
  BINS = "BINS",
  PRODUCT_CODE = "PRODUCT_CODE",
  DEVICES = "DEVICES",
}

export const infoApi = createApi({
  reducerPath: "infoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_PORT,
  }),
  tagTypes: [
    InfoEnum.PRODUCTS,
    InfoEnum.BINS,
    InfoEnum.PRODUCT_CODE,
    InfoEnum.DEVICES,
  ],
  endpoints: (builder) => ({
    getListProducts: builder.query<TProduct[], void | null>({
      query: () => ({
        url: "/api/product/demo/all",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? results.map(({ id }) => ({ type: InfoEnum.PRODUCTS, id }))
          : [InfoEnum.PRODUCTS],
    }),
    getListBinsId: builder.query<string[], void>({
      query: () => ({
        url: "/api/product/bin",
        method: HTTPS_METHOD.GET,
      }),
      transformResponse: (response: TBin[]) => {
        return response.map((item) => item.code);
      },
      providesTags: (results) =>
        results
          ? results.map((item) => ({ type: InfoEnum.BINS, item }))
          : [InfoEnum.BINS],
    }),
  }),
});
export const { useGetListProductsQuery, useGetListBinsIdQuery } = infoApi;
