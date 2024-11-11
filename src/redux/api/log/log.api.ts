import { BaseQuery, GroupCode, TActionLog } from "../../../assets/types";
import { BASE_PORT, HTTPS_METHOD } from "../../../constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from "../../store";

export const logApi = createApi({
  reducerPath: "logApi",
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
    logAccount: builder.query<TActionLog[], { group: GroupCode }>({
      query: (params) => ({
        url: "/api/customer/logs",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    logCustomer: builder.query<TActionLog[], { group: GroupCode }>({
      query: (params) => ({
        url: "/api/customer/logs",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    logProduct: builder.query<TActionLog[], { group: GroupCode }>({
      query: (params) => ({
        url: "/api/product/logs",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    logProgram: builder.query<TActionLog[], { group: GroupCode }>({
      query: (params) => ({
        url: "/api/program/logs",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    logEmployee: builder.query<TActionLog[], { group: GroupCode }>({
      query: (params) => ({
        url: "/api/staff/logs",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    logWarehouse: builder.query<TActionLog[], { group: GroupCode }>({
      query: (params) => ({
        url: "/api/staff/logs",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    logReport: builder.query<TActionLog[], { group: GroupCode }>({
      query: (params) => ({
        url: "/api/report/logs",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    logSetting: builder.query<TActionLog[], { group: GroupCode }>({
      query: (params) => ({
        url: "/api/setting/logs",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
  }),
});
export const {
  useLogAccountQuery,
  useLogCustomerQuery,
  useLogEmployeeQuery,
  useLogProductQuery,
  useLogProgramQuery,
  useLogReportQuery,
  useLogSettingQuery,
  useLogWarehouseQuery,
} = logApi;
