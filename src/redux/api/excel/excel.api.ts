import { BaseQuery, THistoryFile } from "../../../assets/types";
import { BASE_PORT, HTTPS_METHOD } from "../../../constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from "../../store";
import { TagsEnum } from "../tags.enum.api";

export const excelApi = createApi({
  reducerPath: "excelApi",
  tagTypes: [TagsEnum.GET_HISTORY_EXCEL],
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
      invalidatesTags: [TagsEnum.GET_HISTORY_EXCEL],
    }),
    exportBin: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/report/bin/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.GET_HISTORY_EXCEL],
    }),
    exportPackage: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/report/package/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.GET_HISTORY_EXCEL],
    }),
    exportWarehouseExportDetail: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/warehouse/export/time/detail/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.GET_HISTORY_EXCEL],
    }),
    exportWarehouseImportDetail: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/warehouse/import/time/detail/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.GET_HISTORY_EXCEL],
    }),
    exportBrandname: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/report/brandname/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.GET_HISTORY_EXCEL],
    }),
    exportSMS: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/report/sms/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.GET_HISTORY_EXCEL],
    }),
    exportProgramPointDetail: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/program/point/detail/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.GET_HISTORY_EXCEL],
    }),
    exportProgramTopupDetail: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/program/topup/detail/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.GET_HISTORY_EXCEL],
    }),
    getListHistoryExcel: builder.query<THistoryFile[], BaseQuery | undefined>({
      query: (params) => ({
        url: "/api/report/history/file",
        method: HTTPS_METHOD.GET,
        params: params || {},
      }),
      providesTags: [TagsEnum.GET_HISTORY_EXCEL],
    }),
    exportProgramChanceFarmer: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/program/lucky/farmer/detail/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.GET_HISTORY_EXCEL],
    }),
    exportProgramChanceRetailer: builder.mutation<{ data: string }, BaseQuery>({
      query: (body) => ({
        url: "/api/program/lucky/retailer/detail/excel",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.GET_HISTORY_EXCEL],
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
  useGetListHistoryExcelQuery,
  useExportProgramChanceFarmerMutation,
  useExportProgramChanceRetailerMutation,
} = excelApi;
