import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import baseQuery from "./baseQuery";
import { resetAccountInfo, resetToken } from "../slices/authSlice";
import { HTTPS_METHOD } from "../../constants";
import store from "../store";

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    // Token expired or unauthorized, attempt to refresh the token
    try {
      const refreshResult = await baseQuery(
        {
          url: "/refresh-token",
          method: HTTPS_METHOD.POST,
        },
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
    } catch (error) {
      api.dispatch(resetAccountInfo());
    }
  }

  return result;
};
export default baseQueryWithReauth;
