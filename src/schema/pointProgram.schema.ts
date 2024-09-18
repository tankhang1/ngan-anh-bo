import * as Yup from "yup";
const pointProgramSchema = Yup.object().shape({
  name: Yup.string()
    .required("Tên chương trình là bắt buộc")
    .max(40, "Tên chương trình không quá 40 ký tự"),

  products: Yup.array()
    .min(1, "Vui lòng chọn ít nhất một sản phẩm")
    .of(
      Yup.object({
        value: Yup.string().required("Mã sản phẩm là bắt buộc"),
        label: Yup.string().required("Tên sản phẩm là bắt buộc"),
      })
    ),
  agent_or_group_agent: Yup.number().required(
    "Chọn theo đại lý hoặc nhóm đại lý là bắt buộc"
  ),

  agents: Yup.array(),

  retailer_group: Yup.string(),
  point_coefficient: Yup.number()
    .min(1, "Hệ số điểm phải lớn hơn hoặc bằng 1")
    .required("Hệ số điểm là bắt buộc"),

  objectives: Yup.array(),

  time_end: Yup.date()
    .nullable()
    .required("Ngày kết thúc là bắt buộc")
    .min(Yup.ref("time_start"), "Ngày kết thúc phải sau ngày bắt đầu"),

  time_start: Yup.date().nullable().required("Ngày bắt đầu là bắt buộc"),

  // locations: Yup.array()
  //   .min(1, "Vui lòng chọn ít nhất một địa điểm")
  //   .of(
  //     Yup.object({
  //       value: Yup.string().required("Giá trị bắt buộc"),
  //       label: Yup.string().required("Giá trị là bắt buộc"),
  //     })
  //   ),
  goods_type: Yup.array()
    .min(1, "Vui lòng chọn ít nhất 1 loại sản phẩm")
    .of(
      Yup.object({
        value: Yup.string().required("Giá trị bắt buộc"),
        label: Yup.string().required("Giá trị là bắt buộc"),
      })
    ),

  status: Yup.number().required("Trạng thái là bắt buộc"),

  uuid: Yup.string().required("UUID là bắt buộc"),
});

export default pointProgramSchema;
