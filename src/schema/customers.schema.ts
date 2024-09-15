import * as Yup from "yup";

const customerSchema = Yup.object().shape({
  customer_name: Yup.string().required("Tên khách hàng là bắt buộc"),

  customer_province: Yup.string().required("Tỉnh thành khách hàng là bắt buộc"),

  customer_type: Yup.string().required("Loại khách hàng là bắt buộc"),

  name: Yup.string().nullable(),

  province: Yup.string().nullable(),

  info_primary: Yup.number(),

  phone: Yup.string().trim().required("Số điện thoại là bắt buộc"),
  sign_board: Yup.string()
    .nullable()
    .when("customer_type", ([customer_type], schema) => {
      //@ts-ignore
      if (customer_type === "RETAILER1" || customer_type === "RETAILER2") {
        return schema.required("Tên biển hiệu là bắt buộc cho nhà bán lẻ");
      }
      return schema;
    }),

  customer_address: Yup.string().nullable(),

  customer_district: Yup.string(),

  province_name: Yup.string().nullable(),

  status: Yup.number()
    .oneOf([0, 1], "Trạng thái không hợp lệ")
    .required("Trạng thái là bắt buộc"),

  gender: Yup.number(),

  birthday: Yup.date().nullable(),

  email: Yup.string().email("Email không hợp lệ"),

  citizen_number: Yup.string().nullable(),

  citizen_day: Yup.date().nullable(),

  business_document: Yup.string(),

  tags: Yup.string().nullable(),

  note: Yup.string().nullable(),

  area_size: Yup.number().nullable(),

  source_channel_used: Yup.string().nullable(),

  avatar: Yup.string().nullable(),

  sale_code: Yup.string(),
  export_code: Yup.string().nullable(),

  export_address: Yup.string().nullable(),

  retailer_group: Yup.string().nullable(),
});

export default customerSchema;
