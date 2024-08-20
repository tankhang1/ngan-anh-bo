import * as Yup from "yup";
const departmentSchema = Yup.object().shape({
  code: Yup.string().required("Trường bắt buộc"),
  name: Yup.string().required("Trường bắt buộc"),
  note: Yup.string(),
});
export default departmentSchema;
