import * as Yup from "yup";
const customerSchema = Yup.object().shape({
  customer_code: Yup.string().required("Trường bắt buộc"),
  customer_name: Yup.string().required("Trường bắt buộc"),
  customer_province: Yup.string().required("Trường bắt buộc"),
  customer_type: Yup.string().required("Trường bắt buộc"),
  name: Yup.string().required("Trường bắt buộc"),
  province: Yup.string().required("Trường bắt buộc"),
  info_primary: Yup.number().required("Trường bắt buộc"),
  phone: Yup.string().required("Trường bắt buộc"),
  sign_board: Yup.string().notRequired(),
  customer_address: Yup.string().notRequired(),
  customer_district: Yup.string().notRequired(),
  province_name: Yup.string().notRequired(),
  status: Yup.number().required("Trường bắt buộc"),
  time: Yup.string().notRequired(),
  gender: Yup.number().notRequired(),
  birthday: Yup.string().notRequired(),
  email: Yup.string().email("Không đúng định dạng email"),
  citizen_number: Yup.number().notRequired(),
  citizen_day: Yup.string().notRequired(),
  business_document: Yup.string().notRequired(),
  tags: Yup.string().notRequired(),
  note: Yup.string().notRequired(),
  area_size: Yup.number().min(0, "Diện tích nhỏ nhất là 0").notRequired(),
  source_channel_used: Yup.string().notRequired(),
  avatar: Yup.string().notRequired(),
  sale_code: Yup.string().required("Trường bắt buộc"), // mã nhân viên
  export_code: Yup.string().notRequired(), // mã xuất kho
  export_address: Yup.string().notRequired(),
  retailer_group: Yup.string().required("Trường bắt buộc"),
});
export default customerSchema;
