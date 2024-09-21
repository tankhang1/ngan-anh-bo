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
    getCounterProgramTopupByStatus: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/program/topup/status/counter",
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
  }),
});

export const {
  useGetListProgramPointStatusQuery,
  useGetListProgramTopupStatusQuery,
  useGetCounterProgramPointByStatusQuery,
  useGetCounterProgramTopupByStatusQuery,
} = programApi;
