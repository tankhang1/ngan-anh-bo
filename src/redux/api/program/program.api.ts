import { BASE_PORT, HTTPS_METHOD, LOCAL_KEY } from "../../../constants";
import {
  BaseQuery,
  TProgramPoint,
  TProgramPointDetail,
  TProgramTopup,
  TProgramTopupDetail,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TagsEnum } from "../tags.enum.api";

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
  tagTypes: [TagsEnum.PROGRAM_TOPUP, TagsEnum.PROGRAM_POINT],
  endpoints: (builder) => ({
    getCounterProgramTopup: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/program/topup/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getCounterProgramTopupByStatus: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/program/topup/status/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getCounterProgramPoint: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/program/point/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getCounterProgramPointByStatus: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/program/point/status/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getListProgramTopup: builder.query<TProgramTopup[], BaseQuery>({
      query: (params) => ({
        url: "/program/topup",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.map(({ uuid }) => ({
                type: TagsEnum.PROGRAM_TOPUP as const,
                uuid,
              })),
              TagsEnum.PROGRAM_TOPUP,
            ]
          : [TagsEnum.PROGRAM_TOPUP],
    }),
    getListProgramPoint: builder.query<TProgramPoint[], BaseQuery>({
      query: (params) => ({
        url: "/program/point",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.map(({ uuid }) => ({
                type: TagsEnum.PROGRAM_POINT as const,
                uuid,
              })),
              TagsEnum.PROGRAM_POINT,
            ]
          : [TagsEnum.PROGRAM_POINT],
    }),
    getListProgramPointStatus: builder.query<TProgramPoint[], BaseQuery>({
      query: (params) => ({
        url: "/program/point/status",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.map(({ uuid }) => ({
                type: TagsEnum.PROGRAM_POINT as const,
                uuid,
              })),
              TagsEnum.PROGRAM_POINT,
            ]
          : [TagsEnum.PROGRAM_POINT],
    }),
    getListProgramPointByTime: builder.query<TProgramPoint[], void | null>({
      query: () => ({
        url: "/program/point",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.map(({ uuid }) => ({
                type: TagsEnum.PROGRAM_POINT as const,
                uuid,
              })),
              TagsEnum.PROGRAM_POINT,
            ]
          : [TagsEnum.PROGRAM_POINT],
    }),
    getListProgramTopupByTime: builder.query<TProgramTopup[], void | null>({
      query: () => ({
        url: "/program/topup",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.map(({ uuid }) => ({
                type: TagsEnum.PROGRAM_TOPUP as const,
                uuid,
              })),
              TagsEnum.PROGRAM_TOPUP,
            ]
          : [TagsEnum.PROGRAM_TOPUP],
    }),
    getListProgramTopupStatus: builder.query<TProgramTopup[], BaseQuery>({
      query: (params) => ({
        url: "/program/topup/status",
        method: HTTPS_METHOD.GET,
        params,
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.map(({ uuid }) => ({
                type: TagsEnum.PROGRAM_TOPUP as const,
                uuid,
              })),
              TagsEnum.PROGRAM_TOPUP,
            ]
          : [TagsEnum.PROGRAM_TOPUP],
    }),
    getListProgramPointDetail: builder.query<
      TProgramPointDetail[],
      { zl: string }
    >({
      query: (params) => ({
        url: "/program/point/customer/identify",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    getListProgramTopupDetail: builder.query<
      TProgramTopupDetail[],
      { zl: string }
    >({
      query: (params) => ({
        url: "/program/topup/customer/identify",
        method: HTTPS_METHOD.GET,
        params,
      }),
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
  useGetListProgramPointDetailQuery,
  useGetListProgramTopupDetailQuery,
} = programApi;
