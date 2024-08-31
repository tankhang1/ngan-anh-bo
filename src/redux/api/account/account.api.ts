import { BASE_RES, TAccount, TAccountRole } from "../../../assets/types";
import { HTTPS_METHOD } from "../../../constants";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../middlewares/baseQueryWithReauth";
import { TagsEnum } from "../tags.enum.api";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [TagsEnum.ACCOUNTS, TagsEnum.ACCOUNT_ROLE],
  endpoints: (builder) => ({
    getAllAccount: builder.query<TAccount[], void>({
      query: () => ({
        url: "/admin/accounts",
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.ACCOUNTS as const,
                id,
              })),
              TagsEnum.ACCOUNTS,
            ]
          : [TagsEnum.ACCOUNTS],
    }),
    signUpAccount: builder.mutation<BASE_RES, TAccount>({
      query: (body) => ({
        url: "/admin/signup",
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [TagsEnum.ACCOUNTS],
    }),
    deleteAccount: builder.mutation<BASE_RES, string>({
      query: (body) => ({
        url: `/admin/account/remove/${body}`,
        method: HTTPS_METHOD.POST,
      }),
      invalidatesTags: [TagsEnum.ACCOUNTS],
    }),
    getAccountRoleList: builder.query<TAccountRole[], void>({
      query: () => ({
        url: `/admin/roles`,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.ACCOUNT_ROLE as const,
                id,
              })),
              TagsEnum.ACCOUNT_ROLE,
            ]
          : [TagsEnum.ACCOUNT_ROLE],
    }),
  }),
});

export const {
  useGetAllAccountQuery,
  useSignUpAccountMutation,
  useDeleteAccountMutation,
  useGetAccountRoleListQuery,
} = accountApi;
