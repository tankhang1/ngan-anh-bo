import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import baseQuery from "./baseQuery";
import { resetAccountInfo, resetToken } from "../slices/authSlice";

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Token expired or unauthorized, attempt to refresh the token
    const refreshResult = await baseQuery(
      "/admin/refresh-token",
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Assuming the API response contains the new token
      const newToken = (refreshResult.data as { data: string }).data;

      // Store the new token
      api.dispatch(resetToken({ token: newToken }));

      // Retry the original query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed, log out the user
      api.dispatch(resetAccountInfo());
    }
  }

  return result;
};
export default baseQueryWithReauth;
