import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "en",
  dir: "ltr",
  dataThemeMode: "light",
  dataMenuStyles: "dark",
  dataNavLayout: "vertical",
  dataHeaderStyles: "gradient",
  defaultHeaderStyles: "",
  dataVerticalStyle: "overlay",
  StylebodyBg: "107 64 64",
  StyleDarkBg: "93 50 50",
  toggled: "",
  dataNavStyle: "",
  horStyle: "",
  dataPageStyle: "regular",
  dataWidth: "fullwidth",
  dataMenuPosition: "fixed",
  dataHeaderPosition: "fixed",
  loader: "disable",
  iconOverlay: "",
  colorPrimaryRgb: "",
  bodyBg: "",
  Light: "",
  darkBg: "",
  inputBorder: "",
  bgImg: "",
  iconText: "",
  body: {
    class: "",
  },
  ecommercedata: [],
};

const themeReducer = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    ThemeChanger: (state, action) => {
      return { ...state, ...action.payload };
    },
    AddToCart: (state) => {
      return {
        ...state,
      };
    },
    ProductReduxData: (state) => {
      return {
        ...state,
      };
    },
  },
});

export const { AddToCart, ProductReduxData, ThemeChanger } =
  themeReducer.actions;
export default themeReducer.reducer;
