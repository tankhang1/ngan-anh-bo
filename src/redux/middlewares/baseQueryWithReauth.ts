import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import baseQuery from "./baseQuery";

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    // Token expired or unauthorized, attempt to refresh the token
    window.location.replace(window.location.origin);
  }

  return result;
};
export default baseQueryWithReauth;
