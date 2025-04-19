import { HTTPS_METHOD } from "../../../constants";
import {
  TDevice,
  TProduct,
  TIngredient,
  TProductCreateForm,
  BASE_RES,
  TIngredientPacking,
  TProgramPointDetail,
  TProgramTopupDetail,
  TManufactorOrder,
  TProgramChanceReportRES,
} from "../../../assets/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../middlewares/baseQueryWithReauth";
import { TagsEnum } from "../tags.enum.api";
export enum ProductEnum {
  PRODUCT_CODE = "PRODUCT_CODE",
  DEVICES = "DEVICES",
  INGREDIENTS = "INGREDIENTS",
  CREATE_PRODUCT = "CREATE_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
}
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    TagsEnum.PRODUCTS,
    TagsEnum.DEVICES,
    TagsEnum.INGREDIENTS,
    TagsEnum.INGREDIENTS_PACKING,
  ],
  endpoints: (builder) => ({
    getNewProductCode: builder.query<string, void | null>({
      query: () => ({
        url: "/product/code-new",
        method: HTTPS_METHOD.GET,
        responseHandler: (response) => response.text(),
        cache: "no-cache",
      }),
      keepUnusedDataFor: 0,
    }),
    getListDevices: builder.query<{ label: string; value: string }[], void>({
      query: () => ({
        url: "/product/devices",
        method: HTTPS_METHOD.GET,
      }),
      transformResponse: (response: TDevice[]) => {
        return response
          ?.filter((item) => !!item?.device_ip)
          .map((value) => ({
            label: `${value.device_name}-${value.device_ip}`,
            value: value.device_code,
          }));
      },
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ value }) => ({
                type: TagsEnum.DEVICES as const,
                value,
              })),
              TagsEnum.DEVICES,
            ]
          : [TagsEnum.DEVICES],
    }),
    getListIngredients: builder.query<{ label: string; value: string }[], void>(
      {
        query: () => ({
          url: "/product/ingredients",
          method: HTTPS_METHOD.GET,
        }),
        transformResponse: (response: TIngredient[]) => {
          return response.map((value) => ({
            label: `${value.description} (${value.code})`,
            value: value.code,
          }));
        },
        providesTags: (results) =>
          results
            ? [
                ...results.map((item) => ({
                  type: TagsEnum.INGREDIENTS as const,
                  item,
                })),
                TagsEnum.INGREDIENTS,
              ]
            : [TagsEnum.INGREDIENTS],
      }
    ),
    createProduct: builder.mutation<any, TProductCreateForm>({
      query: (body) => ({
        url: "/product/create",
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [TagsEnum.PRODUCTS],
    }),

    updateProductByMarketing: builder.mutation<any, TProduct>({
      query: (body) => ({
        url: "/product/update/info",
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TagsEnum.PRODUCTS as const, id: arg.id! },
      ],
    }),
    updateProductByWarehouse: builder.mutation<any, TProduct>({
      query: (body) => ({
        url: "/product/update/manufacture",
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TagsEnum.PRODUCTS as const, id: arg.id! },
      ],
    }),
    createIngredient: builder.mutation<
      BASE_RES,
      Omit<
        TIngredient,
        | "id"
        | "code"
        | "code_old"
        | "product_line"
        | "product_line_name"
        | "brand_name"
      >
    >({
      query: (body) => ({
        url: "/product/ingredient/create",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.INGREDIENTS],
    }),
    updateIngredientByCode: builder.mutation<
      BASE_RES,
      Omit<
        TIngredient,
        "id" | "code_old" | "product_line" | "product_line_name" | "brand_name"
      >
    >({
      query: (body) => ({
        url: "/product/ingredient/update",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.INGREDIENTS],
    }),
    importIngredientPacking: builder.mutation<
      BASE_RES,
      Omit<TIngredientPacking, "id" | "ingredient_name">
    >({
      query: (body) => ({
        url: "/product/ingredient-package/import",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.INGREDIENTS_PACKING],
    }),
    getListProgramPointDetail: builder.query<
      { name: string; sign_board: string; data: TProgramPointDetail[] },
      { zl: string }
    >({
      query: (params) => ({
        url: "/program/point/customer/identify",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    getListProgramTopupDetail: builder.query<
      { name: string; sign_board: string; data: TProgramTopupDetail[] },
      { zl: string }
    >({
      query: (params) => ({
        url: "/program/topup/customer/identify",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    getListProgramChanceDetail: builder.query<
      TProgramChanceReportRES[],
      { zalo_user_id: string }
    >({
      query: (params) => ({
        url: "/api/program/lucky/detail/customer",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    createProcedureOrder: builder.mutation<BASE_RES, TManufactorOrder>({
      query: (body) => ({
        url: "/product/procedure-order/import",
        method: HTTPS_METHOD.POST,
        body,
      }),
    }),
  }),
});

export const {
  useGetListDevicesQuery,
  useGetNewProductCodeQuery,
  useGetListIngredientsQuery,
  useCreateProductMutation,
  useUpdateProductByMarketingMutation,
  useUpdateProductByWarehouseMutation,
  useCreateIngredientMutation,
  useImportIngredientPackingMutation,
  useUpdateIngredientByCodeMutation,
  useGetListProgramPointDetailQuery,
  useGetListProgramTopupDetailQuery,
  useCreateProcedureOrderMutation,
  useGetListProgramChanceDetailQuery,
} = productApi;
