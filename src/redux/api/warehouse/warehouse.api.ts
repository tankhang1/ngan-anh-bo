import { BASE_PORT, HTTPS_METHOD } from "../../../constants";
import {
  BaseQuery,
  TBinByBatch,
  TCustomerStaff,
  TIngredient,
  TIngredientPacking,
  TProcedure,
  TProcedureOrderDetail,
  TWarehouseDocument,
  TWarehouseDocumentImport,
  TWarehouseExport,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from "../../store";
import { TagsEnum } from "../tags.enum.api";

export const warehouseApi = createApi({
  reducerPath: "warehouseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_PORT}/warehouse`,
    prepareHeaders: (headers) => {
      const token = store.getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return;
    },
  }),
  tagTypes: [
    TagsEnum.INGREDIENTS,
    TagsEnum.INGREDIENTS_PACKING,
    TagsEnum.BINS_BY_BATCH,
  ],
  endpoints: (builder) => ({
    getExportDetail: builder.query<TWarehouseExport[], BaseQuery>({
      query: (params) => ({
        url: "/export/time/detail",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getExportDetailCounter: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/export/time/detail/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getExportByDocument: builder.query<TWarehouseExport[], { code: string }>({
      query: (params) => ({
        url: "/export/document",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getExportByDocumentCounter: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/export/time/document/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getImportByDocumentCounter: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/import/time/document/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getImportByDocument: builder.query<TWarehouseExport[], { code: string }>({
      query: (params) => ({
        url: "/import/document",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getImportDetail: builder.query<TWarehouseExport[], BaseQuery>({
      query: (params) => ({
        url: "/import/time/detail",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),

    getExportDocuments: builder.query<TWarehouseDocument[], BaseQuery>({
      query: (params) => ({
        url: "/export/time/document",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getImportDocuments: builder.query<TWarehouseDocumentImport[], BaseQuery>({
      query: (params) => ({
        url: "/import/time/document",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getListIngredientAll: builder.query<TIngredient[], void>({
      query: () => ({
        url: "/ingredient/all",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.INGREDIENTS as const,
                id,
              })),
              TagsEnum.INGREDIENTS,
            ]
          : [TagsEnum.INGREDIENTS],
    }),
    getListIngredientPacking: builder.query<TIngredientPacking[], void>({
      query: () => ({
        url: "/ingredient-packing/all",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.INGREDIENTS_PACKING as const,
                id,
              })),
              TagsEnum.INGREDIENTS_PACKING,
            ]
          : [TagsEnum.INGREDIENTS_PACKING],
    }),
    getIngredientByCode: builder.query<TIngredient, { code: string }>({
      query: (params) => ({
        url: "/ingredient/detail",
        method: HTTPS_METHOD.GET,
        params,
      }),
      providesTags: (result, error, arg) => [
        { type: TagsEnum.INGREDIENTS as const, id: result?.id },
      ],
    }),
    getIngredientPackingByShipmentCode: builder.query<
      TIngredient,
      { code: string }
    >({
      query: (params) => ({
        url: "/ingredient-packing/detail",
        method: HTTPS_METHOD.GET,
        params,
      }),
      providesTags: (result, error, arg) => [
        { type: TagsEnum.INGREDIENTS as const, id: result?.id },
      ],
    }),
    getIngredientPackingByIngredientCode: builder.query<
      TIngredient,
      { code: string }
    >({
      query: (params) => ({
        url: "/ingredient-packing/ingredient",
        method: HTTPS_METHOD.GET,
        params,
      }),
      providesTags: (result, error, arg) => [
        { type: TagsEnum.INGREDIENTS as const, id: result?.id },
      ],
    }),
    getCustomerStaff: builder.query<TCustomerStaff[], void>({
      query: () => ({
        url: "/consumer-staff",
        method: HTTPS_METHOD.GET,
      }),
    }),
    getExportBinsByBatch: builder.query<TBinByBatch[], { bn: string }>({
      query: ({ bn }) => ({
        url: "/batch-number/bin-list",
        method: HTTPS_METHOD.GET,
        params: {
          bn: bn,
        },
      }),
      providesTags: (result, error, arg) => [
        { type: TagsEnum.BINS_BY_BATCH as const, id: arg.bn },
      ],
    }),
    getProcedureOrderByTime: builder.query<TProcedure[], BaseQuery>({
      query: (query) => ({
        url: "/procedure-order/list",
        method: HTTPS_METHOD.GET,
        params: query,
      }),
    }),
    getProcedureOrderCounterByTime: builder.query<number, BaseQuery>({
      query: (query) => ({
        url: "/procedure-order/counter",
        method: HTTPS_METHOD.GET,
        params: query,
      }),
    }),
    getProcedureOrderDetailByTime: builder.query<
      TProcedureOrderDetail[],
      BaseQuery
    >({
      query: (query) => ({
        url: "/procedure-order/detail",
        method: HTTPS_METHOD.GET,
        params: query,
      }),
    }),
    getProcedureOrderDetailCounterByTime: builder.query<number, BaseQuery>({
      query: (query) => ({
        url: "/procedure-order-detail/counter",
        method: HTTPS_METHOD.GET,
        params: query,
      }),
    }),
  }),
});

export const {
  useGetExportDetailQuery,
  useGetExportDetailCounterQuery,
  useGetImportDetailQuery,
  useGetExportByDocumentQuery,
  useGetImportByDocumentCounterQuery,
  useGetExportByDocumentCounterQuery,
  useGetImportByDocumentQuery,
  useGetExportDocumentsQuery,
  useGetImportDocumentsQuery,
  useGetIngredientByCodeQuery,
  useGetListIngredientAllQuery,
  useGetIngredientPackingByIngredientCodeQuery,
  useGetIngredientPackingByShipmentCodeQuery,
  useGetListIngredientPackingQuery,
  useGetCustomerStaffQuery,
  useGetExportBinsByBatchQuery,
  useGetProcedureOrderByTimeQuery,
  useGetProcedureOrderCounterByTimeQuery,
  useGetProcedureOrderDetailByTimeQuery,
  useGetProcedureOrderDetailCounterByTimeQuery,
} = warehouseApi;
