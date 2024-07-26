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
// export default function themeReducer(state = initialState, action: any) {
//   const { type, payload } = action;
//   switch (type) {
//     case "ThemeChanger":
//       return { ...state, ...payload };

//     case "ADD_TO_CART":
//       return {
//         ...state,
//         ecommercedata: Maindata.filter((item) => item.id === payload),
//       };

//     case "PRODUCT":
//       return {
//         ...state,
//         ecommercedata: state.ecommercedata.filter(
//           (item) => item.id === payload
//         ),
//       };

//     default:
//       return state;
//   }
// }
const themeReducer = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    ThemeChanger: (state, action) => {
      return { ...state, ...action.payload };
    },
    AddToCart: (state, action) => {
      return {
        ...state,
      };
    },
    ProductReduxData: (state, action) => {
      return {
        ...state,
      };
    },
  },
});

export const { AddToCart, ProductReduxData, ThemeChanger } =
  themeReducer.actions;
export default themeReducer.reducer;
