import * as Yup from "yup";
const accountSchema = Yup.object().shape({
  username: Yup.string()
    .required("Tên đăng nhập là bắt buộc")
    .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),

  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),

  staff_code: Yup.string().required("Mã nhân viên là bắt buộc"),

  roles: Yup.string().required("Vai trò là bắt buộc"),
});
export default accountSchema;
