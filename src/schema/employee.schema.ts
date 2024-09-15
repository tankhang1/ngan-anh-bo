import * as Yup from "yup";
const employeeSchema = Yup.object().shape({
  code: Yup.string(),
  name: Yup.string().required("Trường bắt buộc"),
  province: Yup.mixed()
    .test(
      "is-selected",
      "Trường bắt buộc",
      (value) => value && typeof value === "object" && value.value !== undefined
    )
    .required("Trường bắt buộc"),
  phone: Yup.string().trim().required("Trường bắt buộc"),
  email: Yup.string().email().required("Trường bắt buộc"),
  gender: Yup.number().required("Trường bắt buộc"),
  citizen_number: Yup.string(),
  citizen_day: Yup.string(),
  note: Yup.string(),
  avatar: Yup.string(),
  areas: Yup.array(),
  provinces: Yup.array()
    .min(1, "Trường bắt buộc") // Ensure at least 1 object is selected
    .of(Yup.object().required()) // Ensure the items in the array are objects
    .required("Trường bắt buộc"),
  staff_role: Yup.string().required("Trường bắt buộc"),
  staff_role_name: Yup.string().required("Trường bắt buộc"),
  staff_department_code: Yup.string().required("Trường bắt buộc"),
  staff_department_name: Yup.string().required("Trường bắt buộc"),
  export_address: Yup.string(),
  export_code: Yup.string(),
});
export default employeeSchema;
