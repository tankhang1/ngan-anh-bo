import * as Yup from "yup";
const accountSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Tên quá ngắn")
    .max(70, "Tên quá dài")
    .required("Trường bắt buộc"),
  password: Yup.string()
    .min(8, "Mật khẩu quá ngắn")
    .required("Trường bắt buộc"),
  roles: Yup.array()
    .min(1, "Phải có ít nhất là một vai trò")
    .required("Trường bắt buộc"),
  staff_code: Yup.string().required("Trường bắt buộc"),
});
export default accountSchema;
