import { BASE_PORT_8180, HTTPS_METHOD, LOCAL_KEY } from "../../../constants";
import {
  TDevice,
  TProduct,
  TProductForm,
  TIngredient,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export enum ProductEnum {
  PRODUCT_CODE = "PRODUCT_CODE",
  DEVICES = "DEVICES",
  INGREDIENTS = "INGREDIENTS",
  CREATE_PRODUCT = "CREATE_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
}
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_PORT_8180}/product`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LOCAL_KEY.TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    ProductEnum.DEVICES,
    ProductEnum.PRODUCT_CODE,
    ProductEnum.INGREDIENTS,
    ProductEnum.CREATE_PRODUCT,
    ProductEnum.UPDATE_PRODUCT,
  ],
  endpoints: (builder) => ({
    getNewProductCode: builder.query<string, void | null>({
      query: () => ({
        url: "/code-new",
        method: HTTPS_METHOD.GET,
        responseHandler: (response) => response.text(),
      }),
      keepUnusedDataFor: 0,
    }),
    getListDevices: builder.query<{ label: string; value: string }[], void>({
      query: () => ({
        url: "/devices",
        method: HTTPS_METHOD.GET,
      }),
      transformResponse: (response: TDevice[]) => {
        return response.map((value) => ({
          label: value.device_name,
          value: value.device_code,
        }));
      },
      providesTags: (results) =>
        results
          ? results.map(({ value }) => ({
              type: ProductEnum.DEVICES,
              value,
            }))
          : [ProductEnum.DEVICES],
    }),
    getListIngredients: builder.query<string[], void>({
      query: () => ({
        url: "/ingredients",
        method: HTTPS_METHOD.GET,
      }),
      transformResponse: (response: TIngredient[]) => {
        return response.map((value) => value.code);
      },
      providesTags: (results) =>
        results
          ? results.map((item) => ({
              type: ProductEnum.INGREDIENTS,
              item,
            }))
          : [ProductEnum.INGREDIENTS],
    }),
    createProduct: builder.mutation<any, TProductForm>({
      query: (body) => ({
        url: "/create",
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [ProductEnum.CREATE_PRODUCT],
    }),
    updateProduct: builder.mutation<any, TProduct>({
      query: (body) => ({
        url: "/update",
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [ProductEnum.UPDATE_PRODUCT],
    }),
  }),
});

export const {
  useGetListDevicesQuery,
  useGetNewProductCodeQuery,
  useGetListIngredientsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApi;
