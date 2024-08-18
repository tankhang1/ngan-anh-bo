import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/auth/auth.api";
import reducer from "./reducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { infoApi } from "./api/info/info.api";
import { productApi } from "./api/product/product.api";
import { mediaApi } from "./api/media/media.api";
import { programApi } from "./api/program/program.api";
import { manageApi } from "./api/manage/manage.api";
import { otherApi } from "./api/other/other.api";
import { customerApi } from "./api/customer/customer.api";
import { reportApi } from "./api/report/report.api";
import { accountApi } from "./api/account/account.api";
import AuthReducer from "./slices/authSlice";
import { settingApi } from "./api/setting/setting.api";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
  timeout: 10000, // Increase timeout to 10 seconds
};
const rootReducer = combineReducers({
  theme: reducer,
  auth: AuthReducer,
  [authApi.reducerPath]: authApi.reducer,
  [infoApi.reducerPath]: infoApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [mediaApi.reducerPath]: mediaApi.reducer,
  [manageApi.reducerPath]: manageApi.reducer,
  [otherApi.reducerPath]: otherApi.reducer,
  [programApi.reducerPath]: programApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [reportApi.reducerPath]: reportApi.reducer,
  [accountApi.reducerPath]: accountApi.reducer,
  [settingApi.reducerPath]: settingApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  // No need to explicitly pass middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore the persist actions that contain non-serializable values
        ignoredActions: ["persist/PERSIST"],
      },
    })
      // .concat(rtkQueryErrorLogger)
      .concat(authApi.middleware)
      .concat(infoApi.middleware)
      .concat(productApi.middleware)
      .concat(mediaApi.middleware)
      .concat(programApi.middleware)
      .concat(manageApi.middleware)
      .concat(otherApi.middleware)
      .concat(customerApi.middleware)
      .concat(reportApi.middleware)
      .concat(accountApi.middleware)
      .concat(settingApi.middleware),
});

export default store;
export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
