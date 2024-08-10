import { BASE_RES, TAccount } from "../../../assets/types";
import { BASE_PORT_8180, HTTPS_METHOD, LOCAL_KEY } from "../../../constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export enum AccountEnum {
  ACCOUNTS = "ACCOUNTS",
}
export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_PORT_8180}/admin`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LOCAL_KEY.TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return;
    },
  }),
  tagTypes: [AccountEnum.ACCOUNTS],
  endpoints: (builder) => ({
    getAllAccount: builder.query<TAccount[], void>({
      query: () => ({
        url: "/accounts",
      }),
      providesTags: (results) =>
        results
          ? results.map(({ id }) => ({ type: AccountEnum.ACCOUNTS, id }))
          : [AccountEnum.ACCOUNTS],
    }),
    signUpAccount: builder.mutation<BASE_RES, TAccount>({
      query: (body) => ({
        url: "/signup",
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [AccountEnum.ACCOUNTS],
    }),
    deleteAccount: builder.mutation<BASE_RES, string>({
      query: (body) => ({
        url: `/account/remove/${body}`,
        method: HTTPS_METHOD.POST,
      }),
      invalidatesTags: [AccountEnum.ACCOUNTS],
    }),
  }),
});

export const {
  useGetAllAccountQuery,
  useSignUpAccountMutation,
  useDeleteAccountMutation,
} = accountApi;
