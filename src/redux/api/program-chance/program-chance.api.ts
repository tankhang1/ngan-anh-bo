import { BASE_PORT_8180, HTTPS_METHOD, LOCAL_KEY } from "../../../constants";
import {
  BASE_RES,
  TPresent,
  TPresentLanding,
  TProgramChance,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TagsEnum } from "../tags.enum.api";
import store from "../../store";

export const programChanceApi = createApi({
  reducerPath: "programChanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_PORT_8180,
    prepareHeaders: (headers) => {
      const token = store.getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return;
    },
  }),
  tagTypes: [
    TagsEnum.PRESENT,
    TagsEnum.PROGRAM_CHANCE,
    TagsEnum.PROGRAM_LANDING,
  ],
  endpoints: (builder) => ({
    getListProgramPresentFarmer: builder.query<TPresent[], void>({
      query: () => ({
        url: "/program/lucky/present/farmer/list",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: () => [{ type: TagsEnum.PRESENT, id: "FARMER" }],
    }),
    getListProgramPresentRetailer: builder.query<TPresent[], void>({
      query: () => ({
        url: "/program/lucky/present/retailer/list",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: () => [{ type: TagsEnum.PRESENT, id: "RETAILER" }],
    }),
    getProgramFarmer: builder.query<TProgramChance, void>({
      query: () => ({
        url: "/program/lucky/farmer/detail",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: () => [{ type: TagsEnum.PROGRAM_CHANCE, id: "FARMER" }],
    }),
    getProgramRetailer: builder.query<TProgramChance, void>({
      query: () => ({
        url: "/program/lucky/retailer/detail",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: () => [{ type: TagsEnum.PROGRAM_CHANCE, id: "RETAILER" }],
    }),
    updateProgramFarmer: builder.mutation<BASE_RES, TProgramChance>({
      query: (body) => ({
        url: "/program/lucky/update",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: () => [{ type: TagsEnum.PROGRAM_CHANCE, id: "FARMER" }],
    }),
    updateProgramRetailer: builder.mutation<BASE_RES, TProgramChance>({
      query: (body) => ({
        url: "/program/lucky/update",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: () => [
        { type: TagsEnum.PROGRAM_CHANCE, id: "RETAILER" },
      ],
    }),
    createProgramPresentFarmer: builder.mutation<BASE_RES, TPresent>({
      query: (body) => ({
        url: "/program/lucky/present/create",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: () => [{ type: TagsEnum.PRESENT, id: "FARMER" }],
    }),
    updateProgramPresentFarmer: builder.mutation<BASE_RES, TPresent>({
      query: (body) => ({
        url: "/program/lucky/present/update",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: () => [{ type: TagsEnum.PRESENT, id: "FARMER" }],
    }),
    createProgramPresentRetailer: builder.mutation<BASE_RES, TPresent>({
      query: (body) => ({
        url: "/program/lucky/present/create",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: () => [{ type: TagsEnum.PRESENT, id: "RETAILER" }],
    }),
    updateProgramPresentRetailer: builder.mutation<BASE_RES, TPresent>({
      query: (body) => ({
        url: "/program/lucky/present/update",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: () => [{ type: TagsEnum.PRESENT, id: "RETAILER" }],
    }),
    activeProgramRetailer: builder.mutation<BASE_RES, TProgramChance>({
      query: (body) => ({
        url: "/program/lucky/active",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: () => [{ type: TagsEnum.PRESENT, id: "RETAILER" }],
    }),
    activeProgramFarmer: builder.mutation<BASE_RES, TProgramChance>({
      query: (body) => ({
        url: "/program/lucky/active",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: () => [{ type: TagsEnum.PRESENT, id: "FARMER" }],
    }),
    deactiveProgramRetailer: builder.mutation<BASE_RES, TProgramChance>({
      query: (body) => ({
        url: "/program/lucky/active",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: () => [{ type: TagsEnum.PRESENT, id: "RETAILER" }],
    }),
    deactiveProgramFarmer: builder.mutation<BASE_RES, TProgramChance>({
      query: (body) => ({
        url: "/program/lucky/active",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: () => [{ type: TagsEnum.PRESENT, id: "FARMER" }],
    }),
    getLuckyPresentLanding: builder.query<TPresentLanding[], void>({
      query: () => ({
        url: "/game-landing-page/lucky/present/list",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: () => [
        { type: TagsEnum.PROGRAM_LANDING, id: "LUCKY_PRESENT" },
      ],
    }),
    createLuckyPresentLanding: builder.mutation<BASE_RES, TPresentLanding>({
      query: (body) => ({
        url: "/game-landing-page/lucky/present/create",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: () => [
        { type: TagsEnum.PROGRAM_LANDING, id: "LUCKY_PRESENT" },
      ],
    }),
    updateLuckyPresentLanding: builder.mutation<BASE_RES, TPresentLanding>({
      query: (body) => ({
        url: "/game-landing-page/lucky/present/update",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: () => [
        { type: TagsEnum.PROGRAM_LANDING, id: "LUCKY_PRESENT" },
      ],
    }),
    deleteLuckyPresentLanding: builder.mutation<BASE_RES, { gift: string }>({
      query: (body) => ({
        url: "/game-landing-page/lucky/present/remove",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: () => [
        { type: TagsEnum.PROGRAM_LANDING, id: "LUCKY_PRESENT" },
      ],
    }),
  }),
});

export const {
  useGetListProgramPresentFarmerQuery,
  useGetListProgramPresentRetailerQuery,
  useGetProgramFarmerQuery,
  useGetProgramRetailerQuery,
  useActiveProgramFarmerMutation,
  useActiveProgramRetailerMutation,
  useCreateProgramPresentFarmerMutation,
  useCreateProgramPresentRetailerMutation,
  useDeactiveProgramFarmerMutation,
  useDeactiveProgramRetailerMutation,
  useUpdateProgramFarmerMutation,
  useUpdateProgramPresentFarmerMutation,
  useUpdateProgramPresentRetailerMutation,
  useUpdateProgramRetailerMutation,
  useCreateLuckyPresentLandingMutation,
  useDeleteLuckyPresentLandingMutation,
  useGetLuckyPresentLandingQuery,
  useUpdateLuckyPresentLandingMutation,
} = programChanceApi;
