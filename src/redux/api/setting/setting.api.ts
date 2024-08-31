import { HTTPS_METHOD } from "../../../constants";
import { TGroupRetailer, BASE_RES } from "../../../assets/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../middlewares/baseQueryWithReauth";
import { TagsEnum } from "../tags.enum.api";

export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TagsEnum.RETAILER_GROUP],
  endpoints: (builder) => ({
    createGroupRetailer: builder.mutation<BASE_RES, TGroupRetailer>({
      query: (data) => ({
        url: "/customer/retailer/group/create",
        method: HTTPS_METHOD.POST,
        body: data,
      }),
      invalidatesTags: [TagsEnum.RETAILER_GROUP],
    }),
  }),
});

export const { useCreateGroupRetailerMutation } = settingApi;
