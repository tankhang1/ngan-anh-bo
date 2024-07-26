export const ThemeChanger =
  (value: any) =>
  async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch({
      type: "theme/ThemeChanger",
      payload: value,
    });
  };

export const AddToCart =
  (id: any) =>
  async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch({
      type: "theme/ADD_TO_CART",
      payload: id,
    });
  };
export const ProductReduxData =
  (id: any) =>
  async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch({
      type: "theme/PRODUCT",
      payload: id,
    });
  };
