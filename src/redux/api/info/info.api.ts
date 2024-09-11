import { BASE_PORT, HTTPS_METHOD } from "../../../constants";
import {
  TProduct,
  TBin,
  TBinPackage,
  TWarehouseExport,
  TAgent,
  TCustomerRes,
  BASE_RES,
  BaseQuery,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TagsEnum } from "../tags.enum.api";

export const infoApi = createApi({
  reducerPath: "infoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_PORT,
  }),
  tagTypes: [
    TagsEnum.PRODUCTS,
    TagsEnum.BINS,
    TagsEnum.PRODUCT_CODE,
    TagsEnum.DEVICES,
  ],
  endpoints: (builder) => ({
    getListProducts: builder.query<TProduct[], void | null>({
      query: () => ({
        url: "/api/product/all",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.PRODUCTS as const,
                id,
              })),
              TagsEnum.PRODUCTS,
            ]
          : [TagsEnum.PRODUCTS],
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
          ? [
              ...results.map((item) => ({
                type: TagsEnum.BINS as const,
                item,
              })),
              TagsEnum.BINS,
            ]
          : [TagsEnum.BINS],
    }),
    getBinPackageByCode: builder.query<TBinPackage, { val: string }>({
      query: (params) => ({
        url: "/api/bin-package/code",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getProductBySku: builder.query<TProduct, { sku: string }>({
      query: (params) => ({
        url: "/api/product/code",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getWarehouseExportBin: builder.query<TWarehouseExport, string>({
      query: (params) => ({
        url: `/warehouse/export/bin-seri/${params}`,
        method: HTTPS_METHOD.GET,
      }),
    }),
    getCustomerByCode: builder.query<TAgent, { c: string }>({
      query: (params) => ({
        url: "/api/customer/code",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getCustomer: builder.query<TCustomerRes[], BaseQuery>({
      query: (params) => ({
        url: "/api/customer/search",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    getCustomerCounter: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/customer/search/counter",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
  }),
});
export const {
  useGetListProductsQuery,
  useGetListBinsIdQuery,
  useGetBinPackageByCodeQuery,
  useGetProductBySkuQuery,
  useGetWarehouseExportBinQuery,
  useGetCustomerByCodeQuery,
  useGetCustomerQuery,
  useGetCustomerCounterQuery,
} = infoApi;
