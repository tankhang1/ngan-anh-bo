import { BASE_PORT, HTTPS_METHOD, LOCAL_KEY } from "../../../constants";
import {
  BaseQuery,
  TPointTableDashboard,
  TProgramPointDetail,
  TTopupTableDashboard,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export enum ProgramEnum {
  REPORT_PROGRAM_POINT_BY_TIME = "REPORT_PROGRAM_POINT_BY_TIME",
  REPORT_PROGRAM_TOPUP_BY_TIME = "REPORT_PROGRAM_TOPUP_BY_TIME",
  PROGRAM_TOPUP_DETAIL = "PROGRAM_TOPUP_DETAIL",
  PROGRAM_POINT_DETAIL_TODAY = "PROGRAM_POINT_DETAIL_TODAY",
  PROGRAM_POINT_DETAIL = "PROGRAM_POINT_DETAIL",
  PROGRAM_COUNTER_POINT_DETAIL = "PROGRAM_COUNTER_POINT_DETAIL",
}
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
  tagTypes: [
    ProgramEnum.REPORT_PROGRAM_POINT_BY_TIME,
    ProgramEnum.PROGRAM_COUNTER_POINT_DETAIL,
    ProgramEnum.PROGRAM_POINT_DETAIL,
    ProgramEnum.PROGRAM_POINT_DETAIL_TODAY,
  ],
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
      providesTags: (response) =>
        response
          ? response.map(({ id }) => ({
              type: ProgramEnum.REPORT_PROGRAM_POINT_BY_TIME,
              id,
            }))
          : [ProgramEnum.REPORT_PROGRAM_POINT_BY_TIME],
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
      providesTags: (response) =>
        response
          ? response.map(({ id }) => ({
              type: ProgramEnum.REPORT_PROGRAM_POINT_BY_TIME,
              id,
            }))
          : [ProgramEnum.REPORT_PROGRAM_POINT_BY_TIME],
    }),
    getCounterPointDetail: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/program/point/detail/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ProgramEnum.PROGRAM_COUNTER_POINT_DETAIL],
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
      providesTags: [ProgramEnum.PROGRAM_COUNTER_POINT_DETAIL],
    }),
    getReportProgramPointDetailToday: builder.query<
      TProgramPointDetail[],
      void
    >({
      query: () => ({
        url: "/api/program/point/detail/today",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: [ProgramEnum.PROGRAM_POINT_DETAIL_TODAY],
    }),
  }),
});

export const {
  useGetReportProgramPointByTimeQuery,
  useGetReportProgramTopupByTimeQuery,
  useGetCounterPointDetailQuery,
  useGetReportProgramPointDetailByTimeQuery,
  useGetReportProgramPointDetailTodayQuery,
} = reportApi;
