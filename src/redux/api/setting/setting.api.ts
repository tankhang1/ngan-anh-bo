import { HTTPS_METHOD } from "../../../constants";
import {
  TGroupRetailer,
  BASE_RES,
  TBrand,
  TFormulation,
  TIndication,
  TWarehouseDevice,
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
    TagsEnum.DEVICES_WAREHOUSE,
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
    getListWarehouseDevices: builder.query<TWarehouseDevice[], void>({
      query: () => ({
        url: "/app/warehouse/devices",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.DEVICES_WAREHOUSE as const,
                id,
              })),
              TagsEnum.DEVICES_WAREHOUSE,
            ]
          : [TagsEnum.DEVICES_WAREHOUSE],
    }),
    createDeviceKey: builder.mutation<BASE_RES, { work_center_code: string }>({
      query: (body) => ({
        url: "/app/warehouse/device/generate",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.DEVICES_WAREHOUSE],
    }),
    deactiveDeviceKey: builder.mutation<
      BASE_RES,
      { work_center_code: string; key: string; device_id: string }
    >({
      query: (body) => ({
        url: "/app/warehouse/device/deactive",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.DEVICES_WAREHOUSE],
    }),
    activeDeviceKey: builder.mutation<
      BASE_RES,
      { work_center_code: string; key: string; device_id: string }
    >({
      query: (body) => ({
        url: "/app/warehouse/device/active",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.DEVICES_WAREHOUSE],
    }),
  }),
});

export const {
  useCreateGroupRetailerMutation,
  useCreateBrandMutation,
  useCreateFormulationMutation,
  useCreateIndicationMutation,

  useGetListWarehouseDevicesQuery,
  useActiveDeviceKeyMutation,
  useCreateDeviceKeyMutation,
  useDeactiveDeviceKeyMutation,
} = settingApi;
