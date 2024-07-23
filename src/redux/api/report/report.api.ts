import { BASE_PORT, HTTPS_METHOD, LOCAL_KEY } from "../../../constants";
import {
  BaseQuery,
  TPointTableDashboard,
  TTopupTableDashboard,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export enum ProgramEnum {
  REPORT_PROGRAM_POINT_BY_TIME = "REPORT_PROGRAM_POINT_BY_TIME",
  REPORT_PROGRAM_TOPUP_BY_TIME = "REPORT_PROGRAM_TOPUP_BY_TIME",
}
export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_PORT}/api/report`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LOCAL_KEY.TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return;
    },
  }),
  tagTypes: [ProgramEnum.REPORT_PROGRAM_POINT_BY_TIME],
  endpoints: (builder) => ({
    getReportProgramPointByTime: builder.query<
      TPointTableDashboard[],
      BaseQuery
    >({
      query: (params) => ({
        url: "/program/point",
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
        url: "/program/topup",
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
  }),
});

export const {
  useGetReportProgramPointByTimeQuery,
  useGetReportProgramTopupByTimeQuery,
} = reportApi;
