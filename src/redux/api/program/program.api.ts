import { BASE_PORT, HTTPS_METHOD, LOCAL_KEY } from "../../../constants";
import { BaseQuery, TProgramPoint, TProgramTopup } from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export enum ProgramEnum {
  COUNTER_PROGRAM_TOPUP = "COUNTER_PROGRAM_TOPUP",
  COUNTER_PROGRAM_POINT = "COUNTER_PROGRAM_POINT",
  COUNTER_PROGRAM_POINT_STATUS = "COUNTER_PROGRAM_POINT_STATUS",
  COUNTER_PROGRAM_TOPUP_STATUS = "COUNTER_PROGRAM_TOPUP_STATUS",
  PROGRAM_TOPUP = "PROGRAM_TOPUP",
  PROGRAM_POINT = "PROGRAM_POINT",
  LIST_PROGRAM_POINT = "LIST_PROGRAM_POINT",
  LIST_PROGRAM_POINT_STATUS = "LIST_PROGRAM_POINT_STATUS",
  LIST_PROGRAM_TOPUP = "LIST_PROGRAM_TOPUP",
  LIST_PROGRAM_TOPUP_STATUS = "LIST_PROGRAM_TOPUP_STATUS",
}
export const programApi = createApi({
  reducerPath: "programApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_PORT}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LOCAL_KEY.TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return;
    },
  }),
  tagTypes: [
    ProgramEnum.COUNTER_PROGRAM_TOPUP,
    ProgramEnum.COUNTER_PROGRAM_POINT,
    ProgramEnum.PROGRAM_TOPUP,
    ProgramEnum.PROGRAM_POINT,
    ProgramEnum.LIST_PROGRAM_POINT,
    ProgramEnum.LIST_PROGRAM_TOPUP,
    ProgramEnum.LIST_PROGRAM_POINT_STATUS,
    ProgramEnum.LIST_PROGRAM_TOPUP_STATUS,
    ProgramEnum.COUNTER_PROGRAM_POINT_STATUS,
    ProgramEnum.COUNTER_PROGRAM_TOPUP_STATUS,
  ],
  endpoints: (builder) => ({
    getCounterProgramTopup: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/program/topup/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ProgramEnum.COUNTER_PROGRAM_TOPUP],
    }),
    getCounterProgramTopupByStatus: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/program/topup/status/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ProgramEnum.COUNTER_PROGRAM_TOPUP_STATUS],
    }),
    getCounterProgramPoint: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/program/point/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ProgramEnum.COUNTER_PROGRAM_POINT],
    }),
    getCounterProgramPointByStatus: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/program/point/status/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ProgramEnum.COUNTER_PROGRAM_POINT_STATUS],
    }),
    getListProgramTopup: builder.query<TProgramTopup[], BaseQuery>({
      query: (params) => ({
        url: "/program/topup",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: (response) =>
        response
          ? response.map(({ uuid }) => ({
              type: ProgramEnum.PROGRAM_TOPUP,
              uuid,
            }))
          : [ProgramEnum.PROGRAM_TOPUP],
    }),
    getListProgramPoint: builder.query<TProgramPoint[], BaseQuery>({
      query: (params) => ({
        url: "/program/point",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: (response) =>
        response
          ? response.map(({ uuid }) => ({
              type: ProgramEnum.PROGRAM_POINT,
              uuid,
            }))
          : [ProgramEnum.PROGRAM_POINT],
    }),
    getListProgramPointStatus: builder.query<TProgramPoint[], BaseQuery>({
      query: (params) => ({
        url: "/program/point/status",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: (response) =>
        response
          ? response.map(({ uuid }) => ({
              type: ProgramEnum.LIST_PROGRAM_POINT_STATUS,
              uuid,
            }))
          : [ProgramEnum.LIST_PROGRAM_POINT_STATUS],
    }),
    getListProgramPointByTime: builder.query<TProgramPoint[], void | null>({
      query: () => ({
        url: "/program/point",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (response) =>
        response
          ? response.map(({ uuid }) => ({
              type: ProgramEnum.LIST_PROGRAM_POINT,
              uuid,
            }))
          : [ProgramEnum.LIST_PROGRAM_POINT],
    }),
    getListProgramTopupByTime: builder.query<TProgramTopup[], void | null>({
      query: () => ({
        url: "/program/topup",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (response) =>
        response
          ? response.map(({ uuid }) => ({
              type: ProgramEnum.LIST_PROGRAM_TOPUP,
              uuid,
            }))
          : [ProgramEnum.LIST_PROGRAM_TOPUP],
    }),
    getListProgramTopupStatus: builder.query<TProgramTopup[], BaseQuery>({
      query: (params) => ({
        url: "/program/topup/status",
        method: HTTPS_METHOD.GET,
        params,
      }),
      providesTags: (response) =>
        response
          ? response.map(({ uuid }) => ({
              type: ProgramEnum.LIST_PROGRAM_TOPUP_STATUS,
              uuid,
            }))
          : [ProgramEnum.LIST_PROGRAM_TOPUP_STATUS],
    }),
  }),
});

export const {
  useGetCounterProgramTopupQuery,
  useGetCounterProgramPointQuery,
  useGetListProgramPointQuery,
  useGetListProgramTopupQuery,
  useGetListProgramPointByTimeQuery,
  useGetListProgramTopupByTimeQuery,
  useGetListProgramPointStatusQuery,
  useGetListProgramTopupStatusQuery,
  useGetCounterProgramPointByStatusQuery,
  useGetCounterProgramTopupByStatusQuery,
} = programApi;
