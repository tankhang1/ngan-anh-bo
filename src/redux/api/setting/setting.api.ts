import { HTTPS_METHOD } from "../../../constants";
import {
  TGroupRetailer,
  BASE_RES,
  TBrand,
  TFormulation,
  TIndication,
} from "../../../assets/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../middlewares/baseQueryWithReauth";
import { TagsEnum } from "../tags.enum.api";

export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    TagsEnum.RETAILER_GROUP,
    TagsEnum.BRAND,
    TagsEnum.INDICATION,
    TagsEnum.FORMULATION,
  ],
  endpoints: (builder) => ({
    createGroupRetailer: builder.mutation<BASE_RES, TGroupRetailer>({
      query: (data) => ({
        url: "/customer/retailer/group/create",
        method: HTTPS_METHOD.POST,
        body: data,
      }),
      invalidatesTags: [TagsEnum.RETAILER_GROUP],
    }),
    createBrand: builder.mutation<BASE_RES, Omit<TBrand, "id">>({
      query: (body) => ({
        url: "/product/brand/create",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.BRAND],
    }),
    createIndication: builder.mutation<BASE_RES, Omit<TIndication, "id">>({
      query: (body) => ({
        url: "/product/indication/create",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.INDICATION],
    }),
    createFormulation: builder.mutation<BASE_RES, Omit<TFormulation, "id">>({
      query: (body) => ({
        url: "/product/formulation/create",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.FORMULATION],
    }),
  }),
});

export const {
  useCreateGroupRetailerMutation,
  useCreateBrandMutation,
  useCreateFormulationMutation,
  useCreateIndicationMutation,
} = settingApi;
