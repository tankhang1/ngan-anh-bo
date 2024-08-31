import { BASE_PORT, HTTPS_METHOD } from "../../../constants";
import { TArea, TProvince } from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TagsEnum } from "../tags.enum.api";

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_PORT,
  }),
  tagTypes: [TagsEnum.DISTRICT, TagsEnum.PROVINCE],
  endpoints: (builder) => ({
    uploadFile: builder.mutation<string, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/upload-files/product/${id}`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
    }),
    uploadStaffFile: builder.mutation<string, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/upload-files/staff/${id}`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
    }),
    getDistrict: builder.query<
      { label: string; value: string }[],
      { p: string }
    >({
      query: (params) => ({
        url: "/api/address/district",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      transformResponse: (responses: TProvince[]) => {
        return responses.map((item) => ({
          label: item.district_name,
          value: item.district_code,
        }));
      },
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ value }) => ({
                type: TagsEnum.DISTRICT as const,
                value,
              })),
              TagsEnum.DISTRICT,
            ]
          : [TagsEnum.DISTRICT],
    }),
    getListProvince: builder.query<TArea[], void | null>({
      query: () => ({
        url: "/api/address/province",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.PROVINCE as const,
                id,
              })),
              TagsEnum.PROVINCE,
            ]
          : [TagsEnum.PROVINCE],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useUploadStaffFileMutation,
  useGetDistrictQuery,
  useGetListProvinceQuery,
} = mediaApi;
