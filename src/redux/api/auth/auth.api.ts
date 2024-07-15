import { BASE_PORT_8180, HTTPS_METHOD } from "../../../constants";
import { TAuthReq, TAuthRes } from "../../../assets/types/auth.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export enum AuthEnum {
  SIGN_IN = "SIGN_IN",
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_PORT_8180,
  }),
  tagTypes: [AuthEnum.SIGN_IN],
  endpoints: (builder) => ({
    signIn: builder.mutation<TAuthRes, TAuthReq>({
      query: (body) => ({
        url: "/login",
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [AuthEnum.SIGN_IN],
    }),
  }),
});

export const { useSignInMutation } = authApi;
