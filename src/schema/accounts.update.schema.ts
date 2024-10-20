import * as Yup from "yup";
const accountUpdateSchema = Yup.object().shape({
  username: Yup.string()
    .required("Tên đăng nhập là bắt buộc")
    .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),

  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  password_recheck: Yup.string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([Yup.ref("password"), ""], "Mật khẩu không khớp"),
});
export default accountUpdateSchema;
