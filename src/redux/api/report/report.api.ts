import { BASE_PORT, HTTPS_METHOD, LOCAL_KEY } from "../../../constants";
import {
  BaseQuery,
  TPointTableDashboard,
  TProgramPointDetail,
  TTopupTableDashboard,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_PORT}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LOCAL_KEY.TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return;
    },
  }),

  endpoints: (builder) => ({
    getReportProgramPointByTime: builder.query<
      TPointTableDashboard[],
      BaseQuery
    >({
      query: (params) => ({
        url: "/api/program/point",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    getReportProgramTopupByTime: builder.query<
      TTopupTableDashboard[],
      BaseQuery
    >({
      query: (params) => ({
        url: "/api/program/topup",
        method: HTTPS_METHOD.GET,
        params,
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
  }),
});

export const {
  useGetReportProgramPointByTimeQuery,
  useGetReportProgramTopupByTimeQuery,
  useGetReportProgramPointDetailByTimeQuery,
} = reportApi;
