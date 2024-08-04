import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
  Stack,
} from "react-bootstrap";
import * as formik from "formik";
import { TEmployee } from "../../../assets/types";
import { PROVINCES } from "../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useGetListEmployeeQuery } from "../../../redux/api/manage/manage.api";
import { useGetDistrictQuery } from "../../../redux/api/media/media.api";

import { ToastContext } from "../../../components/AppToast";
import { fDate } from "../../../hooks";
import {
  useCreateEmployeeMutation,
  useGetNewUUIDQuery,
  useUpdateEmployeeMutation,
} from "../../../redux/api/other/other.api";
import { FilePond } from "react-filepond";
import { FilePondFile } from "filepond";
import { format } from "date-fns";
import Select from "react-select";

function EmployeeCreateEdit() {
  const { isCreate, id } = useParams();
  const toast = useContext(ToastContext);
  const [isEdit, setIsEdit] = useState(false);
  const [provinceId, setProvinceId] = useState(PROVINCES[0].value);
  const [files1, setFiles1] = useState<FilePondFile[] | any>([]);

  const { Formik } = formik;
  const navigate = useNavigate();
  // const schema = yup.object().shape({
  //   customer_code: yup.string().required(),
  //   customer_name: yup.string().required(),
  //   customer_province: yup.string().required(),
  //   customer_type: yup.string().required("Trường bắt buộc"),
  //   info_primary: yup.number().required(),
  //   sign_board: yup.string().required(),
  //   name: yup.string().required("Trường bắt buộc"),
  //   province: yup.string().required("Trường bắt ")
  //   customer_address: yup.string().required(),
  //   customer_district: yup.string().required(),
  // });

  const { data: newUUID } = useGetNewUUIDQuery(null, {
    skip: isCreate !== "true",
  });
  const { data: employees } = useGetListEmployeeQuery(null, {
    selectFromResult: ({ data }) => ({
      data: data?.find((employee) => employee.uuid == id),
    }),
    skip: isCreate === "true" || !id,
  });
  //   const [updateAgent] = useUpdateAgentMutation();
  //   const [createAgent] = useCreateAgentMutation();
  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();

  const handleSubmitEmployee = async (values: TEmployee) => {
    // if (files1.length>0)
    //     {
    //         const formData = new FormData();
    //         formData.append("files", files1[0].file);
    //         try {
    //             await uploadImage({
    //               id: product?.code,
    //               body: formData,
    //             })
    //               .unwrap()
    //               .then(() => console.log("success"));
    //           } catch (error) {
    //             console.error("Upload failed:", error);
    //           }
    //     }

    if (isCreate === "true") {
      await createEmployee({
        ...values,
        gender: +(values.gender ?? 0),
        citizen_number: +(values.citizen_number ?? 0),
        citizen_day: values?.citizen_day
          ? +format(values.citizen_day, "yyyyMMdd")
          : 0,
        birthday: values?.birthday ? +format(values.birthday, "yyyyMMdd") : 0,
      })
        .unwrap()
        .then((value) => {
          console.log("create employee success", value);
          if (value?.status === -2) {
            toast.showToast("Nhân viên đã tồn tại");
            return;
          }
          if (value?.status === 0) {
            toast.showToast("Thêm nhân viên thành công");
            return;
          }
          toast.showToast("Thêm mới thất bại");
        })
        .catch((e) => {
          console.log("create employee fail", e.message);
        });
    } else {
      setIsEdit(!isEdit);
      if (isEdit === true)
        await updateEmployee({
          ...values,
          gender: +(values.gender ?? 0),
          citizen_number: +(values.citizen_number ?? 0),
          citizen_day: values?.citizen_day
            ? +format(values.citizen_day, "yyyyMMdd")
            : 0,
          birthday: values?.birthday ? +format(values.birthday, "yyyyMMdd") : 0,
        })
          .unwrap()
          .then((value) => {
            console.log("create employee success", value);
            if (value?.status === -2) {
              toast.showToast("Nhân viên đã tồn tại");
              return;
            }
            if (value?.status === 0) {
              toast.showToast("Thêm nhân viên thành công");
              return;
            }
            toast.showToast("Cập nhật thất bại");
          })
          .catch((e) => {
            console.log("create employee fail", e.message);
          });
    }
  };

  useEffect(() => {
    if (employees?.province) setProvinceId(employees.province);
  }, [employees]);

  return (
    <Fragment>
      <Formik
        initialValues={{
          uuid: employees?.uuid || newUUID?.toString() || "",
          name: employees?.name ?? "",
          province: employees?.province ?? "",
          phone: employees?.phone ?? "",
          email: employees?.email ?? "",
          gender: employees?.gender ?? 1,
          birthday: employees?.birthday ? fDate(employees.birthday) : "",
          citizen_number: employees?.citizen_number
            ? employees.citizen_number.toString()
            : "",
          citizen_day: employees?.citizen_day
            ? fDate(employees.citizen_day)
            : "",
          note: employees?.note ?? "",
          avatar: employees?.avatar ?? "",
        }}
        enableReinitialize
        onSubmit={handleSubmitEmployee}
        // validationSchema={schema.nullable()}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Stack>
              <Card className="custom-card">
                <Card.Header className="justify-content-between">
                  <Card.Title>
                    {!isEdit
                      ? "Thông tin nhân viên"
                      : "Chỉnh sửa thông tin nhân viên"}
                  </Card.Title>
                  <div className="d-flex flex-row align-items-center gap-2">
                    <button
                      className="btn btn-danger-light"
                      type={"button"}
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      Trở lại
                    </button>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip className="tooltip">
                          {!isEdit ? "Chỉnh sửa" : "Lưu"}
                        </Tooltip>
                      }
                    >
                      {isCreate === "true" ? (
                        <button
                          className="btn  btn-purple-light ms-2"
                          type="submit"
                          onClick={() => {}}
                        >
                          Thêm mới
                        </button>
                      ) : (
                        <button
                          className="btn btn-purple-light"
                          type="submit"
                          onClick={() => {}}
                        >
                          {!isEdit ? "Chỉnh sửa" : "Lưu"}
                        </button>
                      )}
                    </OverlayTrigger>
                  </div>
                </Card.Header>
              </Card>
              <Row>
                <Stack as={Col} md={6}>
                  <Card className="custom-card">
                    <Card.Header className="justify-content-between">
                      <Card.Title>Thông tin cá nhân</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Stack>
                        <Row>
                          <Form.Group
                            as={Col}
                            md={4}
                            controlId="image_validate"
                          >
                            <Form.Label>Hình đại diện</Form.Label>
                            <FilePond
                              files={files1}
                              onupdatefiles={setFiles1}
                              labelIdle="Drag & Drop your file here or click "
                              acceptedFileTypes={["image/jpeg"]}
                            ></FilePond>

                            <Form.Control.Feedback type="invalid">
                              {errors.avatar}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Stack as={Col} md={8}>
                            <Form.Group controlId="id_validate">
                              <Form.Label>Mã nhân viên</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Mã nhân viên"
                                name="name"
                                id="name_validate"
                                defaultValue={values.name}
                                onChange={handleChange}
                                isInvalid={touched.name && !!errors.name}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.name}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="name_validate">
                              <Form.Label>Tên nhân viên</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Tên nhân viên"
                                name="name"
                                id="name_validate"
                                defaultValue={values.name}
                                onChange={handleChange}
                                isInvalid={touched.name && !!errors.name}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.name}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="birthday_validate">
                              <Form.Label>Ngày sinh</Form.Label>
                              <Form.Control
                                required
                                type="date"
                                placeholder="Ngày sinh"
                                name="birthday"
                                id="birthday_validate"
                                defaultValue={values.birthday}
                                onChange={handleChange}
                                isInvalid={
                                  touched.birthday && !!errors.birthday
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.birthday}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="gender_validate">
                              <Form.Label>Chọn giới tính</Form.Label>
                              <Form.Select
                                className="form-select"
                                name="gender"
                                id="gender_validate"
                                defaultValue={values.gender}
                                onChange={(e) =>
                                  setFieldValue("gender", e.target.value)
                                }
                                isInvalid={touched.gender && !!errors.gender}
                                required
                              >
                                <option value={0}>Nữ</option>
                                <option value={1}>Nam</option>
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {errors.gender}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="phone_validate">
                              <Form.Label>Số điện thoại</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Số điện thoại"
                                name="phone"
                                id="phone_validate"
                                defaultValue={values.phone}
                                onChange={handleChange}
                                isInvalid={touched.phone && !!errors.phone}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.phone}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Stack>
                        </Row>

                        <Form.Group controlId="email_validate">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Email"
                            name="email"
                            id="email_validate"
                            defaultValue={values.email}
                            onChange={handleChange}
                            isInvalid={touched.email && !!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Row>
                          <Form.Group
                            as={Col}
                            md={6}
                            controlId="citizen_number_validate"
                          >
                            <Form.Label>CCCD</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="CCCD"
                              name="citizen_number"
                              id="citizen_number_validate"
                              defaultValue={values.citizen_number}
                              onChange={handleChange}
                              isInvalid={
                                touched.citizen_number &&
                                !!errors.citizen_number
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.citizen_number}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md={6}
                            controlId="citizen_day_validate"
                          >
                            <Form.Label>Ngày cấp</Form.Label>
                            <Form.Control
                              required
                              type="date"
                              placeholder="Ngày cấp"
                              name="citizen_day"
                              id="citizen_day_validate"
                              defaultValue={values.citizen_day}
                              onChange={handleChange}
                              isInvalid={
                                touched.citizen_day && !!errors.citizen_day
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.citizen_day}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Form.Group
                          controlId="province_validate"
                          className="mb-2"
                        >
                          <Form.Label>Tỉnh thành</Form.Label>

                          <Form.Select
                            className="form-select"
                            name="province"
                            id="province_validate"
                            defaultValue={values.province}
                            onChange={(e) =>
                              setFieldValue("province", e.target.value)
                            }
                            isInvalid={touched.province && !!errors.province}
                            required
                          >
                            {PROVINCES.map((item, index) => (
                              <option value={item.value} key={index}>
                                {item.label}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.province}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="note_validate" className="mb-2">
                          <Form.Label>Ghi chú</Form.Label>

                          <Form.Control
                            required
                            type="text"
                            placeholder="Ghi chú"
                            name="note"
                            id="note_validate"
                            defaultValue={values.note}
                            onChange={handleChange}
                            isInvalid={touched.note && !!errors.note}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.note}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Stack>
                <Stack as={Col} md={6}>
                  <Card className="custom-card">
                    <Card.Header>
                      <Card.Title>Thông tin Vai trò & Nhiệm vụ</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Stack>
                        <Form.Group controlId="role_validate">
                          <Form.Label>Phòng ban</Form.Label>
                          <Form.Select
                            className="form-select"
                            name="role"
                            id="role_validate"
                            defaultValue={values.gender}
                            onChange={(e) =>
                              setFieldValue("role", e.target.value)
                            }
                            isInvalid={touched.gender && !!errors.gender}
                            required
                          >
                            <option value={0}>A</option>
                            <option value={1}>B</option>
                            <option value={2}>C</option>
                            <option value={2}>D</option>
                            <option value={2}>E</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.gender}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="role_validate">
                          <Form.Label>Vai trò</Form.Label>
                          <Form.Select
                            className="form-select"
                            name="role"
                            id="role_validate"
                            defaultValue={values.gender}
                            onChange={(e) =>
                              setFieldValue("role", e.target.value)
                            }
                            isInvalid={touched.gender && !!errors.gender}
                            required
                          >
                            <option value={0}>Trưởng vùng</option>
                            <option value={1}>Nhân viên kinh doanh</option>
                            <option value={2}>Kỹ thuật</option>
                            <option value={2}>Nhân viên kho</option>
                            <option value={2}>Sản xuất</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.gender}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="role_validate">
                          <Form.Label>Vùng kinh doanh</Form.Label>
                          <Select
                            isMulti
                            name="colors"
                            options={[{ value: "VDD", label: "Vùng 1" }] as any}
                            className="default basic-multi-select custom-multi mb-3"
                            id="choices-multiple-default"
                            menuPlacement="auto"
                            classNamePrefix="Select2"
                            isSearchable
                            isClearable
                            placeholder="Chọn vùng"
                            defaultValue={[PROVINCES[0] as any]}
                            // value={values.locations}
                            // onChange={(value) => setFieldValue("locations", value)}
                          />

                          <Form.Control.Feedback type="invalid">
                            {errors.gender}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="role_validate">
                          <Form.Label>Tỉnh thành</Form.Label>
                          <Select
                            isMulti
                            name="colors"
                            options={
                              [
                                { value: "all", label: "Chọn tất cả" },
                                ...PROVINCES,
                              ] as any
                            }
                            className="default basic-multi-select custom-multi mb-3"
                            id="choices-multiple-default"
                            menuPlacement="auto"
                            classNamePrefix="Select2"
                            isSearchable
                            isClearable
                            placeholder="Chọn vùng"
                            defaultValue={[PROVINCES[0] as any]}
                            // value={values.locations}
                            // onChange={(value) => setFieldValue("locations", value)}
                          />

                          <Form.Control.Feedback type="invalid">
                            {errors.gender}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="note_validate" className="mb-2">
                          <Form.Label>Mã shiper</Form.Label>

                          <Form.Control
                            required
                            type="text"
                            placeholder="Mã số người giao hàng"
                            name="note"
                            id="note_validate"
                            defaultValue={values.note}
                            onChange={handleChange}
                            isInvalid={touched.note && !!errors.note}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.note}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Stack>
                    </Card.Body>
                  </Card>
                  <Card className="custom-card">
                    <Card.Header>
                      <Card.Title>Thông tin xuất hàng</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Stack>
                        <Form.Group controlId="note_validate" className="mb-2">
                          <Form.Label>Mã số KH-XK</Form.Label>

                          <Form.Control
                            required
                            type="text"
                            placeholder="Mã số dùng để xuất kho"
                            name="note"
                            id="note_validate"
                            defaultValue={values.note}
                            onChange={handleChange}
                            isInvalid={touched.note && !!errors.note}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.note}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="note_validate" className="mb-2">
                          <Form.Label>Ghi chú địa chỉ nhận hàng</Form.Label>

                          <Form.Control
                            required
                            type="text"
                            placeholder="Ghi chú số điện thoại; Địa chỉ nhận hàng; Huyện; tỉnh"
                            name="note"
                            id="note_validate"
                            defaultValue={values.note}
                            onChange={handleChange}
                            isInvalid={touched.note && !!errors.note}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.note}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="note_validate" className="mb-2">
                          <Form.Label>Ghi chú khác</Form.Label>

                          <Form.Control
                            required
                            type="text"
                            placeholder="Ghi nhận lại các thông tin khác không có"
                            name="note"
                            id="note_validate"
                            defaultValue={values.note}
                            onChange={handleChange}
                            isInvalid={touched.note && !!errors.note}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.note}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Stack>
              </Row>
            </Stack>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}

export default EmployeeCreateEdit;
