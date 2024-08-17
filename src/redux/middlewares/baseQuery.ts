import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";
import { BASE_PORT_8180 } from "../../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_PORT_8180,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export default baseQuery;
