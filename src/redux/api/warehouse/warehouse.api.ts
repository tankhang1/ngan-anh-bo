import { BASE_PORT, HTTPS_METHOD } from "../../../constants";
import {
  BaseQuery,
  TWarehouseDocument,
  TWarehouseDocumentImport,
  TWarehouseExport,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from "../../store";
export enum WarehouseEnum {
  EXPORT_DETAIL = "EXPORT_DETAIL",
}
export const warehouseApi = createApi({
  reducerPath: "warehouseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_PORT}/warehouse`,
    prepareHeaders: (headers) => {
      const token = store.getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return;
    },
  }),
  tagTypes: [WarehouseEnum.EXPORT_DETAIL],
  endpoints: (builder) => ({
    getExportDetail: builder.query<TWarehouseExport[], BaseQuery>({
      query: (params) => ({
        url: "/export/time/detail",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getExportDetailCounter: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/export/time/detail/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getExportByDocument: builder.query<TWarehouseExport[], { code: string }>({
      query: (params) => ({
        url: "/export/document",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getExportByDocumentCounter: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/export/time/document/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getImportByDocumentCounter: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/import/time/document/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getImportByDocument: builder.query<TWarehouseExport[], { code: string }>({
      query: (params) => ({
        url: "/import/document",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getImportDetail: builder.query<TWarehouseExport[], BaseQuery>({
      query: (params) => ({
        url: "/import/time/detail",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),

    getExportDocuments: builder.query<TWarehouseDocument[], BaseQuery>({
      query: (params) => ({
        url: "/export/time/document",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getImportDocuments: builder.query<TWarehouseDocumentImport[], BaseQuery>({
      query: (params) => ({
        url: "/import/time/document",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
  }),
});

export const {
  useGetExportDetailQuery,
  useGetExportDetailCounterQuery,
  useGetImportDetailQuery,
  useGetExportByDocumentQuery,
  useGetImportByDocumentCounterQuery,
  useGetExportByDocumentCounterQuery,
  useGetImportByDocumentQuery,
  useGetExportDocumentsQuery,
  useGetImportDocumentsQuery,
} = warehouseApi;
