import { BASE_PORT, HTTPS_METHOD, LOCAL_KEY } from "../../../constants";
import {
  BaseQuery,
  TProgramChanceReportRES,
  TProgramPoint,
  TProgramTopup,
  TUserLuckyPresent,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TagsEnum } from "../tags.enum.api";
import store from "../../store";

export const programApi = createApi({
  reducerPath: "programApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_PORT}/api`,
    prepareHeaders: (headers) => {
      const token = store.getState().auth.token;
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
    getListProgramChanceDetail: builder.query<
      TProgramChanceReportRES[],
      { zalo_user_id: string }
    >({
      query: (params) => ({
        url: "/program/lucky/detail/customer",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    getListUserLuckyPresent: builder.query<TUserLuckyPresent[], void>({
      query: () => ({
        url: "/program/landingpage",
        method: HTTPS_METHOD.GET,
      }),
    }),
  }),
});

export const {
  useGetListProgramPointStatusQuery,
  useGetListProgramTopupStatusQuery,
  useGetCounterProgramPointByStatusQuery,
  useGetCounterProgramTopupByStatusQuery,
  useGetListProgramChanceDetailQuery,
  useGetListUserLuckyPresentQuery,
} = programApi;
