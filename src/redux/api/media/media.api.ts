import { BASE_PORT, BASE_URL, HTTPS_METHOD } from "../../../constants";
import { TProvince } from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export enum MediaEnum {
  UPLOAD_IMAGE = "UPLAD_IMAGE",
  PRODVINCE = "PROVINCE",
}
export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_PORT,
  }),
  tagTypes: [MediaEnum.UPLOAD_IMAGE, MediaEnum.PRODVINCE],
  endpoints: (builder) => ({
    uploadFile: builder.mutation<string, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/upload-files/product/${id}`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [MediaEnum.UPLOAD_IMAGE],
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
          ? results.map(({ value }) => ({ type: MediaEnum.PRODVINCE, value }))
          : [MediaEnum.PRODVINCE],
    }),
  }),
});

export const { useUploadFileMutation, useGetDistrictQuery } = mediaApi;
