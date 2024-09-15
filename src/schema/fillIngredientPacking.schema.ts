import * as Yup from "yup";

const fillIngredientSchema = Yup.object().shape({
  shipment_code: Yup.string().required("Vui lòng nhập phiếu xuất kho"), // Required string
  ingredient_code: Yup.string().required("Vui lòng chọn mã vật tư"), // Required string
  packing: Yup.string().required("Vui lòng nhập quy cách đóng gói"), // Required string
  weight: Yup.number()
    .required("Vui lòng nhập khối lượng")
    .positive("Khối lượng phải lớn hơn 0")
    .typeError("Khối lượng phải là số hợp lệ"), // Number validation
  unit: Yup.string().required("Vui lòng chọn đơn vị tính"), // Required string
  manufacture_date: Yup.date()
    .required("Vui lòng chọn ngày sản xuất")
    .typeError("Ngày sản xuất không hợp lệ"), // Date validation
  expiration_date: Yup.date()
    .required("Vui lòng chọn ngày hết hạn")
    .typeError("Ngày hết hạn không hợp lệ"), // Date validation
  expiry: Yup.number()
    .required("Vui lòng nhập hạn sử dụng")
    .positive("Hạn sử dụng phải lớn hơn 0")
    .typeError("Hạn sử dụng phải là số hợp lệ"), // Number validation
  orgin: Yup.string().required("Vui lòng chọn xuất xứ"), // Required string for origin
  import_date: Yup.date()
    .required("Vui lòng chọn ngày nhập kho")
    .typeError("Ngày nhập kho không hợp lệ"), // Date validation
  note: Yup.string().optional(), // Optional string for note
});

export default fillIngredientSchema;
