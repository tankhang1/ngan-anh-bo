import {
  BASE_PORT_8180,
  BASE_URL,
  HTTPS_METHOD,
  LOCAL_KEY,
} from "../../../constants";

import {
  BASE_RES,
  TPointCreateForm,
  TTopupCreateForm,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export enum OtherEnum {
  CREATE_POINT_PROGRAM = "CREATE_POINT_PROGRAM",
  CREATE_TOPUP_PROGRAM = "CREATE_TOPUP_PROGRAM",
  UPDATE_POINT_PROGRAM = "UPDATE_POINT_PROGRAM",
  UPDATE_TOPUP_PROGRAM = "UPDATE_TOPUP_PROGRAM",
}

export const otherApi = createApi({
  reducerPath: "otherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_PORT_8180,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LOCAL_KEY.TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    OtherEnum.CREATE_POINT_PROGRAM,
    OtherEnum.CREATE_TOPUP_PROGRAM,
    OtherEnum.UPDATE_POINT_PROGRAM,
    OtherEnum.UPDATE_TOPUP_PROGRAM,
  ],
  endpoints: (builder) => ({
    getNewUUID: builder.query<number, void | null>({
      query: () => ({
        url: "/generate/uuid",
        method: HTTPS_METHOD.GET,
        responseHandler: (response) => response.text(),
      }),
    }),
    createPointProgram: builder.mutation<BASE_RES, TPointCreateForm>({
      query: (body) => ({
        url: `/program/point/create`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [OtherEnum.CREATE_POINT_PROGRAM],
    }),
    createTopupProgram: builder.mutation<void, TTopupCreateForm>({
      query: (body) => ({
        url: `/program/topup/create`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [OtherEnum.CREATE_TOPUP_PROGRAM],
    }),
    updateTopupProgram: builder.mutation<void, TTopupCreateForm>({
      query: (body) => ({
        url: `/program/topup/update`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [OtherEnum.UPDATE_TOPUP_PROGRAM],
    }),
    updatePointProgram: builder.mutation<BASE_RES, TPointCreateForm>({
      query: (body) => ({
        url: `/program/point/update`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [OtherEnum.UPDATE_POINT_PROGRAM],
    }),
  }),
});
export const {
  useGetNewUUIDQuery,
  useCreatePointProgramMutation,
  useCreateTopupProgramMutation,
  useUpdatePointProgramMutation,
  useUpdateTopupProgramMutation,
} = otherApi;
