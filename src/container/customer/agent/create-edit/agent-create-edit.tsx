import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { TAgent, TAgentForm, TObjectiveEnum } from "../../../../assets/types";
import { PROVINCES } from "../../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetListAgentsByStatusQuery,
  useGetListAgentsQuery,
} from "../../../../redux/api/manage/manage.api";
import { useGetDistrictQuery } from "../../../../redux/api/media/media.api";
import {
  useCreateAgentMutation,
  useUpdateAgentMutation,
} from "../../../../redux/api/customer/customer.api";
import { ToastContext } from "../../../../components/AppToast";

function AgentCreateEdit() {
  const { isCreate, id } = useParams();
  const toast = useContext(ToastContext);
  const [isEdit, setIsEdit] = useState(false);
  const [provinceId, setProvinceId] = useState(PROVINCES[0].value);
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

  const { data: agent } = useGetListAgentsByStatusQuery(
    {
      status: +(id?.split("_")[1] ?? 1),
    },
    {
      selectFromResult: ({ data }) => ({
        data: data?.find((agent) => agent.customer_code === id?.split("_")[0]),
      }),
    }
  );
  console.log(agent, isCreate, isEdit, id);
  const [updateAgent] = useUpdateAgentMutation();
  const [createAgent] = useCreateAgentMutation();

  const { data: districts } = useGetDistrictQuery(
    {
      p: provinceId as string,
    },
    {
      skip: !provinceId ? true : false,
    }
  );

  const handleSubmitAgent = async (values: TAgentForm) => {
    if (isCreate === "true") {
      await createAgent({
        ...values,
        info_primary: values.info_primary ? 1 : 0,
        customer_province: provinceId,
        status: +(values?.status ?? 1),
      })
        .unwrap()
        .then((value) => {
          console.log("create agent success", value);
          if (value?.status === -2) {
            toast.showToast("Đại lí đã tồn tại");
            return;
          }
          if (value?.status === 0) {
            toast.showToast("Thêm đại lí thành công");
            return;
          }
          toast.showToast("Thêm mới đại lí thất bại");
        })
        .catch((e) => {
          console.log("create agent fail", e.message);
        });
    } else {
      setIsEdit(!isEdit);
      if (isEdit === true)
        await updateAgent({
          ...agent,
          ...values,
          info_primary: values.info_primary ? 1 : 0,
          customer_province: provinceId,
          status: +(values?.status ?? 1),
        })
          .unwrap()
          .then((value) => {
            if (value?.status === 0) {
              toast.showToast("Chỉnh sửa thông tin lí thành công");
              return;
            }

            toast.showToast("Chỉnh sửa thông tin lí thất bại");
          })
          .catch(() => {
            toast.showToast("Hết hạn token. Vui lòng đăng nhập lại");
            navigate("/");
          });
    }
  };
  const initialValue = useMemo(
    () => ({
      customer_code: agent?.customer_code ?? "",
      customer_name: agent?.customer_name ?? "",
      customer_province: agent?.customer_province ?? PROVINCES[0].value,
      customer_type: agent?.customer_type ?? (TObjectiveEnum.RETAILER as any),
      name: agent?.name ?? "",
      province: agent?.province ?? PROVINCES[0].value,
      info_primary: agent?.info_primary ?? 1,
      phone: agent?.phone ?? "",
      sign_board: agent?.sign_board ?? "",
      type: agent?.type ?? 0,
      verify: agent?.verify ?? 0,
      customer_address: agent?.customer_province ?? "",
      customer_district: agent?.customer_district ?? "",
      status: agent?.status ?? 1,
      time: agent?.time ?? "",
      finger_province: agent?.finger_province ?? "",
    }),
    [agent]
  );

  useEffect(() => {
    if (agent?.customer_province) setProvinceId(agent.customer_province);
  }, [agent]);
  const result = (values: TAgentForm) => {
    console.log(values);
    if (isEdit) {
      console.log(values);
    }
    setIsEdit(!isEdit);
  };

  return (
    <Fragment>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmitAgent}
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
            <Card className="custom-card">
              <Card.Header className="justify-content-between">
                <Card.Title>
                  {!isEdit ? "Thông tin đại lí" : "Chỉnh sửa thông tin đại lí"}
                </Card.Title>
                <div>
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
              <Card.Body>
                <Row className="mb-2">
                  <Form.Group as={Col} md={6} controlId="sign_board_validate">
                    <Form.Label>Nhập biển hiệu</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Vui lòng nhập biển hiệu"
                      name="sign_board"
                      value={values.sign_board}
                      onChange={handleChange}
                      isInvalid={touched.sign_board && !!errors.sign_board}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.sign_board}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md={6}
                    controlId="customer_type_validate"
                  >
                    <Form.Label>Chọn đối tượng tham gia</Form.Label>
                    <Form.Select
                      className="form-select"
                      name="customer_type"
                      value={values.customer_type}
                      onChange={handleChange}
                      isInvalid={
                        touched.customer_type && !!errors.customer_type
                      }
                      required
                    >
                      <option value={TObjectiveEnum.FARMER}>
                        {TObjectiveEnum.FARMER}
                      </option>
                      <option value={TObjectiveEnum.RETAILER}>
                        {TObjectiveEnum.RETAILER}
                      </option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.customer_type as any}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group
                    as={Col}
                    md={4}
                    controlId="name_validate"
                    className="mb-2"
                  >
                    <Form.Label>Tên (đăng ký)</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      id="name_validate"
                      placeholder="Tên (đăng ký)"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md={4}
                    controlId="province_validate"
                    className="mb-2"
                  >
                    <Form.Label>Tỉnh thành (đăng ký)</Form.Label>

                    <Form.Select
                      className="form-select"
                      name="province"
                      value={values.province}
                      onChange={handleChange}
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
                  <Form.Group className="mb-2" as={Col} md={4}>
                    <Form.Label>Ngày đăng kí</Form.Label>
                    <Form.Control
                      required
                      type="date"
                      placeholder="Ngày đăng kí"
                      name="time"
                      value={values.time}
                      onChange={handleChange}
                      isInvalid={touched.time && !!errors.time}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.time}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-2">
                  <Form.Group
                    as={Col}
                    md={6}
                    controlId="customer_name_validate"
                  >
                    <Form.Label>Nhập tên (xác thực)</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Tên (Xác thực)"
                      name="customer_name"
                      value={values.customer_name}
                      onChange={handleChange}
                      isInvalid={
                        touched.customer_name && !!errors.customer_name
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.customer_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md={6}
                    controlId="customer_province_validate"
                  >
                    <Form.Label>Tỉnh thành (xác thực)</Form.Label>
                    <Form.Select
                      className="form-select"
                      name="customer_province"
                      value={values.customer_province}
                      onChange={(value) => {
                        setFieldValue("customer_province", value.target.value);
                        setProvinceId(value.target.value);
                      }}
                      isInvalid={
                        touched.customer_province && !!errors.customer_province
                      }
                      required
                    >
                      {PROVINCES.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.customer_province}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group
                  controlId="customer_district_validate"
                  className="mb-2"
                >
                  <Form.Label>Chọn quận huyện</Form.Label>
                  <Form.Select
                    className="form-select"
                    name="customer_district"
                    value={values.customer_district}
                    onChange={handleChange}
                    isInvalid={
                      touched.customer_district && !!errors.customer_district
                    }
                    required
                  >
                    {districts?.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.customer_district}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  controlId="customer_address_validate"
                  className="mb-2"
                >
                  <Form.Label>Nhập địa chỉ chi tiết</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nhập địa chỉ chi tiết"
                    name="customer_address"
                    value={values.customer_address}
                    onChange={handleChange}
                    isInvalid={
                      touched.customer_address && !!errors.customer_address
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.customer_address}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="phone_validate" className="mb-2">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="phone_validate"
                    placeholder="Nhập địa chỉ chi tiết"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isInvalid={touched.phone && !!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                {isCreate === "false" && isEdit === false && (
                  <Form.Group
                    controlId="finger_province_validate"
                    className="mb-2"
                  >
                    <Form.Label>Tỉnh thành (hệ thống đinh vị)</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      id="finger_province_validate"
                      placeholder="Tỉnh thành (hệ thống đinh vị)"
                      name="finger_province"
                      value={values.finger_province}
                      onChange={handleChange}
                      isInvalid={
                        touched.finger_province && !!errors.finger_province
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.finger_province}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                <Form.Group controlId="info_primary_validate">
                  <Form.Label>Xác nhận tham gia chương trình</Form.Label>
                  <Form.Check
                    type="switch"
                    checked={values.info_primary === 1 ? true : false}
                    onChange={(value) =>
                      setFieldValue(
                        "info_primary",
                        value.target.checked ? 1 : 0
                      )
                    }
                    required
                    name="info_primary"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.info_primary}
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
            </Card>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}

export default AgentCreateEdit;
