import { BASE_MOBILE, BASE_PORT, HTTPS_METHOD } from "../../../constants";
import { TInventory } from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TagsEnum } from "../tags.enum.api";

export const mobiApi = createApi({
  reducerPath: "mobiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_MOBILE,
  }),
  tagTypes: [TagsEnum.INVENTORY, TagsEnum.INVENTORY_DETAIL],
  endpoints: (builder) => ({
    getListInventoryBatchNumber: builder.query<TInventory[], void>({
      query: () => ({
        url: "/api/app/v1/warehouse/inventory-batch-number",
        method: HTTPS_METHOD.GET,
      }),

      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.INVENTORY as const,
                id,
              })),
              TagsEnum.INVENTORY,
            ]
          : [TagsEnum.INVENTORY],
    }),
    getInventoryBatchNumber: builder.query<
      TInventory[],
      { batchNumner: string }
    >({
      query: (params) => ({
        url: "/api/app/v1/warehouse/inventory-batch-number/detail",
        method: HTTPS_METHOD.GET,
        params,
      }),

      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.INVENTORY_DETAIL as const,
                id,
              })),
              TagsEnum.INVENTORY_DETAIL,
            ]
          : [TagsEnum.INVENTORY_DETAIL],
    }),
  }),
});

export const {
  useGetListInventoryBatchNumberQuery,
  useGetInventoryBatchNumberQuery,
} = mobiApi;
