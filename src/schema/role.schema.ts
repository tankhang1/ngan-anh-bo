import * as Yup from "yup";
const roleSchema = Yup.object().shape({
  name: Yup.string().required("Trường bắt buộc"),
  note: Yup.string(),
});
export default roleSchema;
