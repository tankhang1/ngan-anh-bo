import * as Yup from "yup";
import { ProductTypeEnum } from "../constants";

const productSchema = Yup.object().shape({
  bin_pallet: Yup.number()
    .min(0, "Số lượng pallet phải lớn hơn hoặc bằng 0")
    .required("Số lượng pallet là bắt buộc"),

  code: Yup.string().required("Mã sản phẩm là bắt buộc"),

  code_bin: Yup.string(),

  brand_code: Yup.string().required("Mã thương hiệu là bắt buộc"),

  brand_name: Yup.string().required("Tên thương hiệu là bắt buộc"),

  category_code: Yup.string().required("Mã danh mục là bắt buộc"),

  category_name: Yup.string().required("Tên danh mục là bắt buộc"),

  certificate_of_origin: Yup.string().nullable(),

  description: Yup.string().nullable(),

  detail_url: Yup.string().url("URL không hợp lệ").nullable(),

  ingredient: Yup.string().nullable(),

  ingredient_id: Yup.string().required("Mã thành phần là bắt buộc"),

  name_display_label: Yup.string().required("Tên nhãn hiển thị là bắt buộc"),

  net_weight: Yup.number()
    .min(0, "Khối lượng tịnh phải lớn hơn hoặc bằng 0")
    .required("Khối lượng tịnh là bắt buộc"),

  pack_configuration: Yup.string().required("Quy cách đóng gói"),

  product_name_detail: Yup.string().required(
    "Tên chi tiết sản phẩm là bắt buộc"
  ),

  qr_mapping: Yup.boolean().required("Trạng thái QR mapping là bắt buộc"),

  qr_printing: Yup.boolean().required("Trạng thái QR printing là bắt buộc"),

  short_info: Yup.string().nullable(),

  sku_bin: Yup.number()
    .min(0, "SKU bin phải lớn hơn hoặc bằng 0")
    .required("SKU bin là bắt buộc"),

  sku_box: Yup.number()
    .min(0, "SKU box phải lớn hơn hoặc bằng 0")
    .required("SKU box là bắt buộc"),

  type: Yup.string()
    .required("Vui lòng chọn hình thức đóng gói") // Custom error message for when no option is selected
    .oneOf(
      [
        ProductTypeEnum.PACKET.toString(),
        ProductTypeEnum.BAG.toString(),
        ProductTypeEnum.BOTTLE.toString(),
        ProductTypeEnum.BOX.toString(),
        ProductTypeEnum.BIN.toString(),
      ],
      "Hình thức đóng gói không hợp lệ" // Error message for invalid option
    ),

  unit: Yup.string().required("Đơn vị tính là bắt buộc"),

  mop: Yup.number()
    .min(0, "MOP phải lớn hơn hoặc bằng 0")
    .required("MOP là bắt buộc"),

  device_code: Yup.string().nullable(),

  point: Yup.number().required("Điểm là bắt buộc"),

  c1_price_vnd: Yup.string()
    .min(0, "Giá C1 phải lớn hơn hoặc bằng 0")
    .required("Giá C1 là bắt buộc"),

  c2_price_vnd: Yup.string()
    .min(0, "Giá C2 phải lớn hơn hoặc bằng 0")
    .required("Giá C2 là bắt buộc"),
});

export default productSchema;
