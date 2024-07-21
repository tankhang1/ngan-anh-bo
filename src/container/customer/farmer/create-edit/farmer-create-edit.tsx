import React, { Fragment, useContext, useEffect, useState } from "react";
import { Card, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import * as formik from "formik";
import { TFarmerForm, TObjectiveEnum } from "../../../../assets/types";
import { PROVINCES } from "../../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { useGetListFarmersByStatusQuery } from "../../../../redux/api/manage/manage.api";
import { useGetDistrictQuery } from "../../../../redux/api/media/media.api";
import { useUpdateFarmerMutation } from "../../../../redux/api/customer/customer.api";
import { ToastContext } from "../../../../components/AppToast";

function FarmerCreateEdit() {
  const { isCreate, id } = useParams();
  const toast = useContext(ToastContext);
  const [isEdit, setIsEdit] = useState(false);
  const [provinceId, setProvinceId] = useState(PROVINCES[0].value);
  const { Formik } = formik;
  // const schema = yup.object().shape({
  //   customer_code: yup.string().required().default(""),
  //   customer_name: yup.string().required().default(""),
  //   customer_province: yup.string().required().default(""),
  //   customer_type: yup.string().required("Trường bắt buộc"),
  //   info_primary: yup.number().required(),
  //   sign_board: yup.string().required(),
  //   customer_address: yup.string().required(),
  //   customer_district: yup.string().required(),
  // });
  const navigate = useNavigate();
  const { data: farmer } = useGetListFarmersByStatusQuery(
    {
      status: +(id?.split("_")[1] ?? 1),
      sz: 10,
      nu: +(id?.split("_")[2] ?? 0),
    },
    {
      selectFromResult: ({ data }) => ({
        data: data?.find(
          (farmer) => farmer.customer_code === id?.split("_")[0]
        ),
      }),
      skip: isCreate === "true",
    }
  );
  console.log(farmer, isCreate, isEdit, id);
  const [updateFarmer] = useUpdateFarmerMutation();

  const { data: districts } = useGetDistrictQuery(
    {
      p: provinceId as string,
    },
    {
      skip: !provinceId ? true : false,
    }
  );

  const handleSubmitAgent = async (values: TFarmerForm) => {
    setIsEdit(!isEdit);
    if (isEdit === true)
      await updateFarmer({
        ...farmer,
        ...values,
        info_primary: values.info_primary ? 1 : 0,
        customer_province: provinceId,
        status: +(values?.status ?? 1),
      })
        .unwrap()
        .then((value) => {
          if (value?.status === 0) {
            toast.showToast("Cập nhật thông tin nông dân thành công");
            return;
          }
          toast.showToast("Cập nhật thông tin nông dân thất bại");
        })
        .catch(() => {
          toast.showToast("Hết hạn token. Vui lòng đăng nhập lại");
          navigate("/");
        });
  };

  useEffect(() => {
    if (farmer?.customer_province) setProvinceId(farmer.customer_province);
  }, [farmer]);

  return (
    <Fragment>
      <Formik
        initialValues={{
          customer_code: farmer?.customer_code ?? "",
          customer_name: farmer?.customer_name ?? "",
          customer_province: farmer?.customer_province ?? PROVINCES[0].value,
          customer_type:
            farmer?.customer_type ?? (TObjectiveEnum.RETAILER as any),
          name: farmer?.name ?? "",
          province: farmer?.province ?? PROVINCES[0].value,
          info_primary: farmer?.info_primary ?? 0,
          phone: farmer?.phone ?? "",
          sign_board: farmer?.sign_board ?? "",
          type: farmer?.type ?? 0,
          verify: farmer?.verify ?? 0,
          customer_address: farmer?.customer_province ?? "",
          customer_district: farmer?.customer_district ?? "",
          status: farmer?.status ?? 1,
          time: farmer?.time ?? "",
          finger_province: farmer?.finger_province ?? "",
        }}
        onSubmit={handleSubmitAgent}
        //validationSchema={schema.nullable()}
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
                  {!isEdit
                    ? "Thông tin nông dân"
                    : "Chỉnh sửa thông tin nông dân"}
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
                      disabled
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
                      disabled
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
                      type="text"
                      id="time_validate"
                      placeholder="Ngày đăng kí"
                      name="time"
                      value={values.time}
                      onChange={handleChange}
                      isInvalid={touched.name && !!errors.name}
                      disabled
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

export default FarmerCreateEdit;
