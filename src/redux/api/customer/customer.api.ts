import {
  BASE_PORT_8180,
  BASE_URL,
  HTTPS_METHOD,
  LOCAL_KEY,
} from "../../../constants";
import { BASE_RES, TAgentForm, TFarmerForm } from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../middlewares/baseQueryWithReauth";
export enum CustomerEnum {
  CREATE_AGENT = "CREATE_AGENT",
  CREATE_FARMER = "CREATE_FARMER",
  UPDATE_AGENT = "UPDATE_AGENT",
  UPDATE_FARMER = "UPDATE_FARMER",
  CONFIRM_AGENT = "CONFIRM_AGENT",
  CONFIRM_FARMER = "CONFIRM_FARMER",
}
export const customerApi = createApi({
  reducerPath: "customerApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `${BASE_PORT_8180}/customer`,
  //   prepareHeaders: (headers) => {
  //     const token = localStorage.getItem(LOCAL_KEY.TOKEN);
  //     if (token) {
  //       headers.set("Authorization", `Bearer ${token}`);
  //     }
  //     return;
  //   },
  // }),
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    CustomerEnum.CONFIRM_AGENT,
    CustomerEnum.CONFIRM_FARMER,
    CustomerEnum.CREATE_AGENT,
    CustomerEnum.CREATE_FARMER,
    CustomerEnum.UPDATE_AGENT,
    CustomerEnum.UPDATE_FARMER,
  ],
  endpoints: (builder) => ({
    createAgent: builder.mutation<void | BASE_RES, TAgentForm>({
      query: (body) => ({
        url: "/customer/agent/create",
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [CustomerEnum.CREATE_AGENT],
    }),
    updateAgent: builder.mutation<void | BASE_RES, TAgentForm>({
      query: (body) => ({
        url: "/customer/agent/update",
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [CustomerEnum.UPDATE_AGENT],
    }),
    updateFarmer: builder.mutation<void | BASE_RES, TFarmerForm>({
      query: (body) => ({
        url: "/customer/farmer/update",
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [CustomerEnum.UPDATE_FARMER],
    }),
    createFarmer: builder.mutation<void, TFarmerForm>({
      query: (body) => ({
        url: "/customer/farmer/create",
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [CustomerEnum.CREATE_FARMER],
    }),
  }),
});

export const {
  useCreateAgentMutation,
  useUpdateAgentMutation,
  useUpdateFarmerMutation,
  useCreateFarmerMutation,
} = customerApi;
