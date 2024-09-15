import * as Yup from "yup";

const createIngredientSchema = Yup.object().shape({
  description: Yup.string(), // Required string
  packing: Yup.string().required("Vui lòng nhập mô tả vật liệu"), // Required string
  product_type: Yup.string().required("Vui lòng chọn loại sản phẩm"), // Required string
  formulation: Yup.string().required("Vui lòng nhập mã công thức"), // Required string for formulation code
  weight: Yup.number()
    .required("Vui lòng nhập trọng lượng")
    .positive("Trọng lượng phải lớn hơn 0") // Positive number
    .typeError("Trọng lượng phải là số hợp lệ"), // Ensure it's a valid number
  product_indication: Yup.string().required("Vui lòng nhập mã chỉ định"), // Required string for indication code
  brand_code: Yup.string().required("Vui lòng nhập mã thương hiệu"), // Required string for brand code
  ingredient: Yup.string().required("Vui lòng nhập thành phần"), // Required string
  certificate_of_origin: Yup.string().required(
    "Vui lòng nhập giấy chứng nhận xuất xứ"
  ), // Required string
  material: Yup.string().required("Vui lòng nhập mã vật liệu"), // Required string for material code
});

export default createIngredientSchema;
