import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { BASE_PORT, PROVINCES } from "../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetListEmployeeDepartmentQuery,
  useGetListEmployeeQuery,
  useGetListEmployeeRoleQuery,
} from "../../../redux/api/manage/manage.api";
import {
  useGetDistrictQuery,
  useGetListProvinceQuery,
  useUploadStaffFileMutation,
} from "../../../redux/api/media/media.api";

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
import lodash from "lodash";
import employeeSchema from "../../../schema/employee.schema";
import AppWarning from "../../../components/AppWarning";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IconLoader } from "@tabler/icons-react";

function EmployeeCreateEdit() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const { isCreate, id } = useParams();
  const toast = useContext(ToastContext);
  const [isEdit, setIsEdit] = useState(false);
  const [files1, setFiles1] = useState<FilePondFile[] | any>([]);

  const { Formik } = formik;
  const navigate = useNavigate();

  const { data: newUUID } = useGetNewUUIDQuery(null, {
    skip: isCreate !== "true",
    refetchOnMountOrArgChange: true,
  });
  const { data: employees } = useGetListEmployeeQuery(null, {
    selectFromResult: ({ data }) => ({
      data: data?.find((employee) => employee.uuid == id),
    }),
    skip: isCreate === "true" || !id,
  });
  console.log(employees);
  const { data: provinces } = useGetListProvinceQuery();
  const { data: roles } = useGetListEmployeeRoleQuery();
  const { data: departments } = useGetListEmployeeDepartmentQuery();
  const [createEmployee, { isLoading: isLoadingCreate }] =
    useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: isLoadingUpdate }] =
    useUpdateEmployeeMutation();
  const [uploadStaffImage] = useUploadStaffFileMutation();
  const groupArea = useMemo(
    () => lodash.groupBy(provinces || [], "area"),
    [provinces]
  );

  const handleSubmitEmployee = async (values: TEmployee) => {
    if (isCreate === "true") {
      if (newUUID)
        await createEmployee({
          ...values,
          gender: +(values.gender ?? 0),
          citizen_number: +(values.citizen_number ?? 0),
          citizen_day: values?.citizen_day
            ? +format(values.citizen_day, "yyyyMMdd")
            : 0,
          birthday: values?.birthday ? +format(values.birthday, "yyyyMMdd") : 0,
          avatar: `${BASE_PORT}/staff-image/${newUUID}.jpg`,
          provinces: values.provinces
            ?.map((item) => item.value)
            .join(",") as any,
          areas: values.areas?.map((item) => item.value).join(",") as any,
          province: values?.province?.value as any,
          uuid: newUUID.toString(),
        })
          .unwrap()
          .then(async (value) => {
            console.log("create employee success", value);
            if (value?.status === -2) {
              toast.showToast("Nhân viên đã tồn tại");
              return;
            }
            if (value?.status === -5) {
              toast.showToast("Mã xuất kho đã tồn tại");
              return;
            }
            if (value?.status === 0) {
              if (files1.length > 0) {
                const formData = new FormData();
                formData.append("files", files1[0].file);
                console.log(formData);
                try {
                  await uploadStaffImage({
                    id: newUUID?.toString()!,
                    body: formData,
                  })
                    .unwrap()
                    .then(() => console.log("success"));
                } catch (error) {
                  console.error("Upload failed:", error);
                }
              }
              toast.showToast("Thêm nhân viên thành công");
              return;
            }
            toast.showToast("Thêm mới thất bại");
          })
          .catch((e) => {
            console.log("create employee fail", e.message);
          });
    } else {
      if (isEdit === true)
        await updateEmployee({
          ...values,
          gender: +(values.gender ?? 0),
          citizen_number: +(values.citizen_number ?? 0),
          citizen_day: values?.citizen_day
            ? +format(values.citizen_day, "yyyyMMdd")
            : 0,
          birthday: values?.birthday ? +format(values.birthday, "yyyyMMdd") : 0,
          provinces: values.provinces
            ?.map((item) => item.value)
            .join(",") as any,
          areas: values.areas
            ? (values.areas?.map((item) => item.value).join(",") as any)
            : "",
          province: values?.province?.value as any,
          uuid: employees?.uuid,
          avatar: `${BASE_PORT}/staff-image/${employees?.uuid}.jpg`,
        })
          .unwrap()
          .then(async (value) => {
            setIsEdit(!isEdit);
            console.log("uppdate employee success", value);
            if (value?.status === -2) {
              toast.showToast("Nhân viên đã tồn tại");
              return;
            }
            if (value?.status === 0) {
              if (files1.length > 0 && employees?.uuid) {
                const formData = new FormData();
                formData.append("files", files1[0].file);
                console.log(formData);
                try {
                  await uploadStaffImage({
                    id: employees?.uuid,
                    body: formData,
                  })
                    .unwrap()
                    .then(() => console.log("success"));
                } catch (error) {
                  console.error("Upload failed:", error);
                }
              }
              toast.showToast("Cập nhật nhân viên thành công");
              return;
            }
            toast.showToast("Cập nhật thất bại");
          })
          .catch((e) => {
            setIsEdit(!isEdit);
            console.log("create employee fail", e.message);
          });
    }
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          code: employees?.code || "",
          name: employees?.name ?? "",
          province:
            { value: employees?.province, label: employees?.province_name } ||
            "",
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
          areas: employees?.areas
            ? (employees?.areas as string)
                .split(",")
                .map((item) => ({ label: item, value: item }))
            : "",
          provinces: employees?.provinces
            ? provinces
                ?.filter((province) =>
                  (employees?.provinces as string)
                    .split(",")
                    .includes(province.code)
                )
                .map((item) => ({ label: item.name, value: item.code }))
            : "",
          staff_role: employees?.staff_role,
          staff_role_name: employees?.staff_role_name || "",
          staff_department_code: employees?.staff_department_code || "",
          staff_department_name: employees?.staff_department_name || "",
          export_address: employees?.export_address || "",
          export_code: employees?.export_code || "",
        }}
        enableReinitialize
        onSubmit={handleSubmitEmployee}
        validationSchema={employeeSchema}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
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

                  {isCreate === "true"
                    ? permission.createEmployee && (
                        <AppWarning onAccept={() => handleSubmit()}>
                          <button
                            className={`btn btn-purple-light justify-content-center align-items-center ${
                              isLoadingCreate && "btn-loader "
                            }`}
                          >
                            <span>Thêm mới</span>
                            {isLoadingCreate && (
                              <span className="loading">
                                <IconLoader size={19} />
                              </span>
                            )}
                          </button>
                        </AppWarning>
                      )
                    : isEdit
                    ? permission.editEmployee && (
                        <AppWarning onAccept={() => handleSubmit()}>
                          <button
                            className={`btn btn-purple-light justify-content-center align-items-center ${
                              isLoadingUpdate && "btn-loader "
                            }`}
                          >
                            <span>Lưu</span>
                            {isLoadingUpdate && (
                              <span className="loading">
                                <IconLoader size={19} />
                              </span>
                            )}
                          </button>
                        </AppWarning>
                      )
                    : permission.editEmployee && (
                        <button
                          onClick={() => setIsEdit(true)}
                          className={`btn btn-purple-light justify-content-center align-items-center`}
                        >
                          <span>Chỉnh sửa</span>
                        </button>
                      )}
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
                        <Form.Group as={Col} md={4}>
                          <Form.Label className="text-black">
                            Hình ảnh nhân viên
                          </Form.Label>
                          {isCreate === "false" && isEdit === false ? (
                            <Stack className="d-flex justify-content-center align-items-center text-black">
                              <img
                                src={
                                  values.avatar ||
                                  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
                                }
                                className="img object-fit-cover img-fluid"
                                style={{
                                  maxHeight: 500,
                                }}
                              />
                            </Stack>
                          ) : (
                            <Form.Group>
                              <FilePond
                                files={files1}
                                onupdatefiles={setFiles1}
                                labelIdle="Kéo và bỏ ảnh tại đây"
                                acceptedFileTypes={["image/jpeg"]}
                              ></FilePond>

                              <Form.Control.Feedback type="invalid">
                                {errors.code}
                              </Form.Control.Feedback>
                            </Form.Group>
                          )}

                          <Form.Control.Feedback type="invalid">
                            {errors.avatar}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Stack as={Col} md={8}>
                          {isCreate !== "true" && (
                            <Form.Group>
                              <Form.Label className="text-black">
                                Mã nhân viên{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Mã nhân viên"
                                name="code"
                                defaultValue={values.code}
                                onChange={handleChange}
                                isInvalid={touched.code && !!errors.code}
                                className="input-placeholder"
                                disabled={false}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.code}
                              </Form.Control.Feedback>
                            </Form.Group>
                          )}
                          <Form.Group>
                            <Form.Label className="text-black">
                              Tên nhân viên{" "}
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Tên nhân viên"
                              name="name"
                              id="name_validate"
                              defaultValue={values.name as string}
                              onChange={handleChange}
                              isInvalid={touched.name && !!errors.name}
                              className="input-placeholder"
                              disabled={
                                isCreate === "false" && isEdit === false
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label className="text-black">
                              Ngày sinh
                            </Form.Label>
                            <Form.Control
                              required
                              type="date"
                              onKeyDown={(e) => e.preventDefault()}
                              placeholder="Ngày sinh"
                              name="birthday"
                              defaultValue={values.birthday}
                              onChange={handleChange}
                              isInvalid={touched.birthday && !!errors.birthday}
                              className="input-placeholder"
                              disabled={
                                isCreate === "false" && isEdit === false
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.birthday}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label className="text-black">
                              Chọn giới tính{" "}
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Select
                              className="form-select input-placeholder"
                              name="gender"
                              defaultValue={values.gender}
                              onChange={(e) =>
                                setFieldValue("gender", e.target.value)
                              }
                              isInvalid={touched.gender && !!errors.gender}
                              required
                              disabled={
                                isCreate === "false" && isEdit === false
                              }
                            >
                              <option value={0}>Nữ</option>
                              <option value={1}>Nam</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.gender}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label className="text-black">
                              Số điện thoại{" "}
                              <span style={{ color: "red" }}>*</span>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Số điện thoại"
                              name="phone"
                              defaultValue={values.phone}
                              onChange={handleChange}
                              isInvalid={touched.phone && !!errors.phone}
                              className="input-placeholder"
                              disabled={isCreate === "false"}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.phone}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Stack>
                      </Row>

                      <Form.Group>
                        <Form.Label className="text-black">
                          Email <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Email"
                          name="email"
                          defaultValue={values.email as string}
                          onChange={handleChange}
                          isInvalid={touched.email && !!errors.email}
                          className="input-placeholder"
                          disabled={isCreate === "false" && isEdit === false}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Row>
                        <Form.Group as={Col} md={6}>
                          <Form.Label className="text-black">CCCD</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="CCCD"
                            name="citizen_number"
                            id="citizen_number_validate"
                            defaultValue={values.citizen_number as string}
                            onChange={handleChange}
                            isInvalid={
                              touched.citizen_number && !!errors.citizen_number
                            }
                            className="input-placeholder"
                            disabled={isCreate === "false" && isEdit === false}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.citizen_number}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={6}>
                          <Form.Label className="text-black">
                            Ngày cấp
                          </Form.Label>
                          <Form.Control
                            required
                            type="date"
                            onKeyDown={(e) => e.preventDefault()}
                            placeholder="Ngày cấp"
                            name="citizen_day"
                            id="citizen_day_validate"
                            defaultValue={values.citizen_day}
                            onChange={handleChange}
                            isInvalid={
                              touched.citizen_day && !!errors.citizen_day
                            }
                            className="input-placeholder"
                            disabled={isCreate === "false" && isEdit === false}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.citizen_day}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Form.Group className="mb-2">
                        <Form.Label className="text-black">
                          Tỉnh thành <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        <Select
                          //@ts-ignore
                          options={
                            provinces
                              ? provinces.map((item) => ({
                                  label: item.name,
                                  value: item.code,
                                }))
                              : []
                          }
                          className="basic-multi-select custom-multi mb-3 input-placeholder"
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          isSearchable
                          isClearable
                          name="province"
                          placeholder="Chọn tỉnh"
                          value={values.province}
                          onChange={(value) => {
                            setFieldValue("province", value);
                          }}
                          isDisabled={isCreate === "false" && isEdit === false}
                        />

                        {errors.province && touched.province && (
                          <p style={{ color: "red", fontSize: 12 }}>
                            {errors.province}
                          </p>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label className="text-black">Ghi chú</Form.Label>

                        <Form.Control
                          required
                          type="text"
                          placeholder="Ghi chú"
                          name="note"
                          id="note_validate"
                          defaultValue={values.note as string}
                          onChange={handleChange}
                          isInvalid={touched.note && !!errors.note}
                          className="input-placeholder"
                          disabled={isCreate === "false" && isEdit === false}
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
                    <Card.Title className="text-black">
                      Thông tin Cấp bậc & Nhiệm vụ
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Stack>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Phòng ban <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        <Select
                          options={
                            departments?.map((item) => ({
                              label: item.name,
                              value: `${item.code}-${item.name}`,
                            })) as any
                          }
                          className="basic-multi-select custom-multi mb-3 input-placeholder"
                          id="choices-multiple-default"
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          isSearchable
                          isClearable
                          placeholder="Chọn phòng ban"
                          value={
                            {
                              value: `${values.staff_department_code}-${values.staff_department_name}`,
                              label: values.staff_department_name,
                            } as any
                          }
                          //@ts-ignore
                          onChange={(value: {
                            label: string;
                            value: string;
                          }) => {
                            setFieldValue(
                              "staff_department_code",
                              value.value.split("-")[0]
                            );
                            setFieldValue(
                              "staff_department_name",
                              value.value.split("-")[1]
                            );
                          }}
                          isDisabled={isCreate === "false" && isEdit === false}
                        />
                        {errors.staff_department_code &&
                          errors.staff_department_name &&
                          touched.staff_department_code &&
                          touched.staff_department_name && (
                            <p style={{ color: "red", fontSize: 12 }}>
                              {errors.staff_department_code}
                            </p>
                          )}

                        {/* <Form.Control.Feedback type="invalid">
                            {errors.gender}
                          </Form.Control.Feedback> */}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Cấp bậc <span style={{ color: "red" }}>*</span>
                        </Form.Label>

                        <Select
                          options={
                            roles?.map((item) => ({
                              label: item.name,
                              value: `${item.id}-${item.name}`,
                            })) as any
                          }
                          className="basic-multi-select custom-multi mb-3 input-placeholder"
                          id="choices-multiple-default"
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          isSearchable
                          isClearable
                          placeholder="Chọn vai trò"
                          value={
                            {
                              value: `${values.staff_role}-${values.staff_role_name}`,
                              label: values.staff_role_name,
                            } as any
                          }
                          //@ts-ignore
                          onChange={(value: {
                            label: string;
                            value: string;
                          }) => {
                            setFieldValue(
                              "staff_role",
                              value.value.split("-")[0]
                            );
                            setFieldValue(
                              "staff_role_name",
                              value.value.split("-")[1]
                            );
                          }}
                          isDisabled={isCreate === "false" && isEdit === false}
                        />
                        {errors.staff_role &&
                          errors.staff_role_name &&
                          touched.staff_role &&
                          touched.staff_role_name && (
                            <p style={{ color: "red", fontSize: 12 }}>
                              {errors.staff_role}
                            </p>
                          )}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Vùng kinh doanh{" "}
                        </Form.Label>
                        <Select
                          isMulti
                          name="colors"
                          options={
                            Object.keys(groupArea).map((item) => ({
                              label: item,
                              value: item,
                            })) as any
                          }
                          className="basic-multi-select custom-multi mb-3 input-placeholder"
                          id="choices-multiple-default"
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          isSearchable
                          isClearable
                          placeholder="Chọn vùng"
                          value={values.areas as any}
                          //@ts-ignore
                          onChange={(
                            value: { label: string; value: string }[]
                          ) => {
                            setFieldValue("areas", value);
                            setFieldValue(
                              "provinces",
                              value
                                .map((item) => groupArea[item.value])
                                .flat()
                                .map((item) => ({
                                  label: item.name,
                                  value: item.code,
                                }))
                            );
                          }}
                          isDisabled={isCreate === "false" && isEdit === false}
                        />

                        {errors.areas &&
                          touched.areas &&
                          values.areas?.length === 0 && (
                            <p style={{ color: "red", fontSize: 12 }}>
                              {errors.areas}
                            </p>
                          )}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Tỉnh thành <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Select
                          isMulti
                          name="colors"
                          //@ts-ignore
                          options={
                            provinces
                              ? provinces.map((item) => ({
                                  label: item.name,
                                  value: item.code,
                                }))
                              : []
                          }
                          className="basic-multi-select custom-multi mb-3 input-placeholder"
                          id="choices-multiple-default"
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          isSearchable
                          isClearable
                          placeholder="Chọn tỉnh"
                          value={values.provinces}
                          onChange={(value) =>
                            setFieldValue("provinces", value)
                          }
                          isDisabled={isCreate === "false" && isEdit === false}
                        />

                        {errors.provinces && touched.provinces && (
                          <p style={{ color: "red", fontSize: 12 }}>
                            {errors.provinces}
                          </p>
                        )}
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
                      <Form.Group className="mb-2">
                        <Form.Label className="text-black">
                          Mã số KH-XK
                        </Form.Label>

                        <Form.Control
                          required
                          type="text"
                          placeholder="Mã số dùng để xuất kho"
                          name="export_code"
                          defaultValue={values.export_code}
                          onChange={handleChange}
                          isInvalid={
                            touched.export_code && !!errors.export_code
                          }
                          className="input-placeholder"
                          disabled={isCreate === "false" && isEdit === false}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.export_code}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label className="text-black">
                          Ghi chú địa chỉ nhận hàng
                        </Form.Label>

                        <Form.Control
                          required
                          type="text"
                          placeholder="Ghi chú số điện thoại; Địa chỉ nhận hàng; Huyện; tỉnh"
                          name="export_address"
                          defaultValue={values.export_address}
                          onChange={handleChange}
                          isInvalid={
                            touched.export_address && !!errors.export_address
                          }
                          className="input-placeholder"
                          disabled={isCreate === "false" && isEdit === false}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.export_address}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Stack>
                  </Card.Body>
                </Card>
              </Stack>
            </Row>
          </Stack>
        )}
      </Formik>
    </Fragment>
  );
}

export default EmployeeCreateEdit;
