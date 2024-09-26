import { BaseQuery } from "../../../assets/types";
import { BASE_PORT, HTTPS_METHOD } from "../../../constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from "../../store";

export const excelApi = createApi({
  reducerPath: "excelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_PORT,
    prepareHeaders: (headers) => {
      const token = store.getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return;
    },
  }),

  endpoints: (builder) => ({
    exportCustomerData: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/customer/list/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
    }),
    exportBin: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/report/bin/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
    }),
    exportPackage: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/report/package/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
    }),
    exportWarehouseExportDetail: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/warehouse/export/time/detail/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
    }),
    exportWarehouseImportDetail: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/warehouse/import/time/detail/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
    }),
    exportBrandname: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/report/brandname/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
    }),
    exportSMS: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/report/sms/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
    }),
    exportProgramPointDetail: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/program/point/detail/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
    }),
    exportProgramTopupDetail: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/program/topup/detail/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
    }),
  }),
});
export const {
  useExportBinMutation,
  useExportCustomerDataMutation,
  useExportPackageMutation,
  useExportWarehouseExportDetailMutation,
  useExportWarehouseImportDetailMutation,
  useExportBrandnameMutation,
  useExportProgramPointDetailMutation,
  useExportProgramTopupDetailMutation,
  useExportSMSMutation,
} = excelApi;
