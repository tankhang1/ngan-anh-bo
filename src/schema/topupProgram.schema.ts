import * as Yup from "yup";
const topupProgramSchema = Yup.object().shape({
  name: Yup.string().required("Tên chương trình là bắt buộc"),

  products: Yup.array()
    .min(1, "Vui lòng chọn ít nhất một sản phẩm")
    .of(
      Yup.object({
        value: Yup.string().required("Mã sản phẩm là bắt buộc"),
        label: Yup.string().required("Tên sản phẩm là bắt buộc"),
      })
    ),

  price: Yup.number()
    .min(1, "Giá phải lớn hơn hoặc bằng 1")
    .required("Giá là bắt buộc"),

  objectives: Yup.array()
    .min(1, "Vui lòng chọn ít nhất một đối tượng")
    .of(
      Yup.object({
        value: Yup.string().required("Mã mục tiêu là bắt buộc"),
        label: Yup.string().required("Tên mục tiêu là bắt buộc"),
      })
    ),

  time_end: Yup.date()
    .nullable()
    .required("Ngày kết thúc là bắt buộc")
    .min(Yup.ref("time_start"), "Ngày kết thúc phải sau ngày bắt đầu"),

  time_start: Yup.date().nullable().required("Ngày bắt đầu là bắt buộc"),

  status: Yup.number()
    .oneOf([0, 1, 2, 3], "Trạng thái không hợp lệ")
    .required("Trạng thái là bắt buộc"),
  agent_or_group_name: Yup.number().required(
    "Chọn theo đại lý hoặc nhóm đại lý là bắt buộc"
  ),

  agents: Yup.array(),

  retailer_group: Yup.string(),
  uuid: Yup.string().required("Mã chương trình là bắt buộc"),
});
export default topupProgramSchema;
