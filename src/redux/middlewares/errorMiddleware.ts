// import { Alert } from 'react-native';
import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";

import { useSignInMutation } from "../api/auth/auth.api";
import { SetStateAction, useContext } from "react";
import { LOCAL_KEY } from "../../constants";
import { ToastContext } from "../../components/AppToast";

export const rtkQueryErrorLogger: Middleware =
  () => (next) => async (action: any) => {
    const toast = useContext(ToastContext);
    const [signIn] = useSignInMutation();
    if (isRejectedWithValue(action)) {
      if (action?.payload?.status === 403) {
        await signIn({
          username: "admin",
          password: "admin",
        })
          .unwrap()
          .then((value) => {
            localStorage.setItem(LOCAL_KEY.TOKEN, value.token);
            toast.showToast(
              "Bạn vừa hết hạn token hoạt động, vui lòng thực hiện lại!"
            );
          })
          .catch((err: { message: SetStateAction<string> }) => {
            console.log(err);
          });
      }
    }

    return next(action);
  };
