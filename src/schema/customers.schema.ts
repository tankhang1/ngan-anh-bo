import * as Yup from "yup";
const customerSchema = Yup.object().shape({
  customer_code: Yup.string().required("Mã khách hàng là bắt buộc"),

  customer_name: Yup.string().required("Tên khách hàng là bắt buộc"),

  customer_province: Yup.string().required("Tỉnh thành khách hàng là bắt buộc"),

  customer_type: Yup.string().required("Loại khách hàng là bắt buộc"),

  name: Yup.string().nullable(),

  province: Yup.string().required("Tỉnh là bắt buộc"),

  info_primary: Yup.number()
    .required("Thông tin chính là bắt buộc")
    .min(1, "Thông tin chính không hợp lệ"),

  phone: Yup.string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),

  sign_board: Yup.string().required("Biển hiệu là bắt buộc"),

  customer_address: Yup.string().required("Địa chỉ khách hàng là bắt buộc"),

  customer_district: Yup.string().required("Quận huyện khách hàng là bắt buộc"),

  province_name: Yup.string().nullable(),

  status: Yup.number()
    .oneOf([0, 1], "Trạng thái không hợp lệ")
    .required("Trạng thái là bắt buộc"),

  time: Yup.string().required("Thời gian là bắt buộc"),

  gender: Yup.number()
    .oneOf([0, 1], "Giới tính không hợp lệ")
    .required("Giới tính là bắt buộc"),

  birthday: Yup.date().nullable().required("Ngày sinh là bắt buộc"),

  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),

  citizen_number: Yup.string().nullable(),

  citizen_day: Yup.date().nullable(),

  business_document: Yup.string().required("Tài liệu doanh nghiệp là bắt buộc"),

  tags: Yup.string().nullable(),

  note: Yup.string().nullable(),

  area_size: Yup.number().nullable(),

  source_channel_used: Yup.string().nullable(),

  avatar: Yup.string().nullable(),

  sale_code: Yup.string().required("Mã nhân viên là bắt buộc"),

  export_code: Yup.string().nullable(),

  export_address: Yup.string().nullable(),

  retailer_group: Yup.string().nullable(),
});

export default customerSchema;
