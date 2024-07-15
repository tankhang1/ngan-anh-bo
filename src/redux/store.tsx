import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/auth/auth.api";
import reducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { infoApi } from "./api/info/info.api";
import { productApi } from "./api/product/product.api";
import { mediaApi } from "./api/media/media.api";
import { programApi } from "./api/program/program.api";
import { manageApi } from "./api/manage/manage.api";
import { otherApi } from "./api/other/other.api";
import { customerApi } from "./api/customer/customer.api";

const store = configureStore({
  reducer: {
    theme: reducer,
    [authApi.reducerPath]: authApi.reducer,
    [infoApi.reducerPath]: infoApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
    [manageApi.reducerPath]: manageApi.reducer,
    [otherApi.reducerPath]: otherApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
  },
  // No need to explicitly pass middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(infoApi.middleware)
      .concat(productApi.middleware)
      .concat(mediaApi.middleware)
      .concat(programApi.middleware)
      .concat(manageApi.middleware)
      .concat(otherApi.middleware)
      .concat(customerApi.middleware),
});

export default store;
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
