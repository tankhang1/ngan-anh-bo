import { BASE_RES, TAccount, TAccountRole } from "../../../assets/types";
import { HTTPS_METHOD } from "../../../constants";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../middlewares/baseQueryWithReauth";
export enum AccountEnum {
  ACCOUNTS = "ACCOUNTS",
  ACCOUNT_ROLE = "ACCOUNT_ROLE",
}
export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [AccountEnum.ACCOUNTS, AccountEnum.ACCOUNT_ROLE],
  endpoints: (builder) => ({
    getAllAccount: builder.query<TAccount[], void>({
      query: () => ({
        url: "/admin/accounts",
      }),
      providesTags: (results) =>
        results
          ? results.map(({ id }) => ({ type: AccountEnum.ACCOUNTS, id }))
          : [AccountEnum.ACCOUNTS],
    }),
    signUpAccount: builder.mutation<BASE_RES, TAccount>({
      query: (body) => ({
        url: "/admin/signup",
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [AccountEnum.ACCOUNTS],
    }),
    deleteAccount: builder.mutation<BASE_RES, string>({
      query: (body) => ({
        url: `/admin/account/remove/${body}`,
        method: HTTPS_METHOD.POST,
      }),
      invalidatesTags: [AccountEnum.ACCOUNTS],
    }),
    getAccountRoleList: builder.query<TAccountRole[], void>({
      query: () => ({
        url: `/admin/roles`,
      }),
      providesTags: (results) =>
        results
          ? results.map(({ id }) => ({ type: AccountEnum.ACCOUNT_ROLE, id }))
          : [AccountEnum.ACCOUNT_ROLE],
    }),
  }),
});

export const {
  useGetAllAccountQuery,
  useSignUpAccountMutation,
  useDeleteAccountMutation,
  useGetAccountRoleListQuery,
} = accountApi;
