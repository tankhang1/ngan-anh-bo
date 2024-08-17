import { BASE_RES, TAccount, TAccountRole } from "../../../assets/types";
import { BASE_PORT_8180, HTTPS_METHOD, LOCAL_KEY } from "../../../constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../middlewares/baseQueryWithReauth";
export enum AccountEnum {
  ACCOUNTS = "ACCOUNTS",
  ACCOUNT_ROLE = "ACCOUNT_ROLE",
}
export const accountApi = createApi({
  reducerPath: "accountApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `${BASE_PORT_8180}/admin`,
  //   prepareHeaders: (headers) => {
  //     const token = localStorage.getItem(LOCAL_KEY.TOKEN);
  //     if (token) {
  //       headers.set("Authorization", `Bearer ${token}`);
  //     }
  //     return;
  //   },
  // }),
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
