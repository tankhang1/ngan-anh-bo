import { BASE_PORT, HTTPS_METHOD, LOCAL_KEY } from "../../../constants";
import {
  BaseQuery,
  TPointTableDashboard,
  TProgramChanceReportRES,
  TProgramPointDetail,
  TProgramTopupDetail,
  TTopupTableDashboard,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from "../../store";

export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_PORT}`,
    prepareHeaders: (headers) => {
      const token = store.getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return;
    },
  }),

  endpoints: (builder) => ({
    getReportProgramTopupDetailByTime: builder.query<
      TProgramTopupDetail[],
      BaseQuery
    >({
      query: (params) => ({
        url: "/api/program/topup/detail",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    getReportProgramTopupDetailToday: builder.query<
      TProgramTopupDetail[],
      void
    >({
      query: () => ({
        url: "/api/program/topup/detail/today",
        method: HTTPS_METHOD.GET,
      }),
    }),
    getReportProgramPointDetailByTime: builder.query<
      TProgramPointDetail[],
      BaseQuery
    >({
      query: (params) => ({
        url: "/api/program/point/detail",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getReportProgramPointDetailToday: builder.query<
      TProgramPointDetail[],
      void
    >({
      query: () => ({
        url: "/api/program/point/detail/today",
        method: HTTPS_METHOD.GET,
      }),
    }),
    getReportProgramPointDetailCounter: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/program/point/detail/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getReportProgramTopupDetailCounter: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/program/topup/detail/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getReportProgramChanceRetailerCounter: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/program/lucky/retailer/detail/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getReportProgramChanceFarmerCounter: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/program/lucky/farmer/detail/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getReportProgramChanceFarmerReport: builder.query<
      TProgramChanceReportRES[],
      BaseQuery
    >({
      query: (params) => ({
        url: "/api/program/lucky/farmer/detail",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getReportProgramChanceRetailerReport: builder.query<
      TProgramChanceReportRES[],
      BaseQuery
    >({
      query: (params) => ({
        url: "/api/program/lucky/retailer/detail",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
  }),
});

export const {
  useGetReportProgramTopupDetailByTimeQuery,
  useGetReportProgramTopupDetailTodayQuery,
  useGetReportProgramPointDetailByTimeQuery,
  useGetReportProgramPointDetailCounterQuery,
  useGetReportProgramPointDetailTodayQuery,
  useGetReportProgramTopupDetailCounterQuery,
  useGetReportProgramChanceFarmerCounterQuery,
  useGetReportProgramChanceFarmerReportQuery,
  useGetReportProgramChanceRetailerCounterQuery,
  useGetReportProgramChanceRetailerReportQuery,
} = reportApi;
