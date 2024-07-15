import {
  BASE_PORT_8180,
  BASE_URL,
  HTTPS_METHOD,
  LOCAL_KEY,
} from "../../../constants";
import { BaseQuery, TProgramPoint, TProgramTopup } from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export enum ProgramEnum {
  COUNTER_PROGRAM_TOPUP = "COUNTER_PROGRAM_TOPUP",
  COUNTER_PROGRAM_POINT = "COUNTER_PROGRAM_POINT",
  PROGRAM_TOPUP = "PROGRAM_TOPUP",
  PROGRAM_POINT = "PROGRAM_POINT",
  LIST_PROGRAM_POINT = "LIST_PROGRAM_POINT",
  LIST_PROGRAM_TOPUP = "LIST_PROGRAM_TOPUP",
}
export const programApi = createApi({
  reducerPath: "programApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_PORT_8180}/program`,
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
  ],
  endpoints: (builder) => ({
    getCounterProgramTopup: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/topup/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ProgramEnum.COUNTER_PROGRAM_TOPUP],
    }),
    getCounterProgramPoint: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/point/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ProgramEnum.COUNTER_PROGRAM_POINT],
    }),
    getListProgramTopup: builder.query<TProgramTopup[], BaseQuery>({
      query: (params) => ({
        url: "/topup",
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
    getListProgramPoint: builder.query<TProgramTopup[], BaseQuery>({
      query: (params) => ({
        url: "/point",
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
    getListProgramPointByTime: builder.query<TProgramPoint[], void | null>({
      query: () => ({
        url: "/point",
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
        url: "/topup",
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
  }),
});

export const {
  useGetCounterProgramTopupQuery,
  useGetCounterProgramPointQuery,
  useGetListProgramPointQuery,
  useGetListProgramTopupQuery,
  useGetListProgramPointByTimeQuery,
  useGetListProgramTopupByTimeQuery,
} = programApi;
