import { HTTPS_METHOD } from "../../../constants";
import { TGroupRetailer, BASE_RES } from "../../../assets/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../middlewares/baseQueryWithReauth";
export enum SettingEnum {
  GROUP_RETAILER = "GROUP_RETAILER",
}
export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [SettingEnum.GROUP_RETAILER],
  endpoints: (builder) => ({
    createGroupRetailer: builder.mutation<BASE_RES, TGroupRetailer>({
      query: (data) => ({
        url: "/customer/retailer/group/create",
        method: HTTPS_METHOD.POST,
        body: data,
      }),
    }),
  }),
});

export const { useCreateGroupRetailerMutation } = settingApi;
