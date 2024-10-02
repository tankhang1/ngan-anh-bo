import React, { Fragment, useContext, useEffect, useState } from "react";
import { Card, Col, Form, Row, Stack } from "react-bootstrap";
import * as formik from "formik";
import { TCustomerRes } from "../../../../assets/types";
import { PROVINCES } from "../../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetListCustomerQuery,
  useGetListEmployeeQuery,
  useGetListGroupObjectiveQuery,
  useGetListGroupRetailerQuery,
} from "../../../../redux/api/manage/manage.api";
import {
  useGetDistrictQuery,
  useGetListProvinceQuery,
} from "../../../../redux/api/media/media.api";

import { ToastContext } from "../../../../components/AppToast";
import { format } from "date-fns";
import { fDate, fParseNumber } from "../../../../hooks";
import { NumericFormat } from "react-number-format";
import {
  useCreateUpdateCustomerMutation,
  useGetNewUUIDQuery,
  useUpdateCustomerMutation,
  useVerifyCustomerMutation,
} from "../../../../redux/api/other/other.api";
import customerSchema from "../../../../schema/customers.schema";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import AppWarning from "../../../../components/AppWarning";
import AppSelect from "../../../../components/AppSelect";
import { useGetCustomerByCodeQuery } from "../../../../redux/api/info/info.api";

function CustomerUnValidationCreateEdit() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const { isCreate, id } = useParams();
  const toast = useContext(ToastContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [provinceId, setProvinceId] = useState(PROVINCES[0].value);
  const { Formik } = formik;
  const navigate = useNavigate();
  const { data: groupObjectives } = useGetListGroupObjectiveQuery();
  const { data: employees } = useGetListEmployeeQuery();
  const { data: provinces } = useGetListProvinceQuery();
  const { data: newUUID } = useGetNewUUIDQuery(null, {
    refetchOnMountOrArgChange: true,
    skip: isCreate !== "true",
  });
  const { data: customer } = useGetCustomerByCodeQuery(
    {
      c: id!,
    },
    {
      skip: isCreate === "true",
      refetchOnMountOrArgChange: true,
    }
  );
  const [createCustomer, { isLoading: isLoadingCreate }] =
    useCreateUpdateCustomerMutation();
  const [updateCustomer, { isLoading: isLoadingUpdate }] =
    useUpdateCustomerMutation();
  const [verifyCustomer, { isLoading: isLoadingVerify }] =
    useVerifyCustomerMutation();
  const { data: groupRetailers } = useGetListGroupRetailerQuery();

  const { data: districts } = useGetDistrictQuery(
    {
      p: provinceId as string,
    },
    {
      skip: !provinceId ? true : false,
    }
  );
  const onValidateCustomer = async (values: TCustomerRes) => {
    await verifyCustomer({
      ...values,
      uuid: values?.uuid ? values.uuid : newUUID?.toString(),
      info_primary: values.info_primary ? 1 : 0,
      customer_province: provinceId,
      status: 1,
      gender: +(values?.gender ?? 1),
      birthday: values?.birthday ? +format(values.birthday, "yyyyMMdd") : null,
      area_size: values?.area_size ? +values.area_size : null,
      citizen_number: values?.citizen_number
        ? +values.citizen_number
        : values.citizen_number,
      citizen_day: values?.citizen_day
        ? +format(values.citizen_day, "yyyyMMdd")
        : values?.citizen_day,
    })
      .unwrap()
      .then((value) => {
        setIsEdit(false);
        console.log("create agent success", value);
        if (value?.status === -2) {
          toast.showToast("Đại lý đã tồn tại");
          return;
        }
        if (value?.status === 0) {
          navigate(-1);
          toast.showToast("Xác thực thành công");
          return;
        }
        toast.showToast("Xác thực thất bại");
      })
      .catch((e) => {
        setIsEdit(false);
        console.log("create agent fail", e.message);
      });
  };

  const handleSubmitAgent = async (values: TCustomerRes) => {
    if (isCreate === "true") {
      await createCustomer({
        ...values,
        uuid: values?.uuid ? values.uuid : newUUID?.toString(),
        info_primary: values.info_primary ? 1 : 0,
        customer_province: provinceId,
        status: 1,
        gender: +(values?.gender ?? 1),
        birthday: values?.birthday
          ? +format(values.birthday, "yyyyMMdd")
          : null,
        area_size: values?.area_size
          ? fParseNumber(values.area_size.toString())
          : null,
        citizen_number: values?.citizen_number
          ? +values.citizen_number
          : values.citizen_number,
        citizen_day: values?.citizen_day
          ? +format(values.citizen_day, "yyyyMMdd")
          : values?.citizen_day,
      })
        .unwrap()
        .then((value) => {
          console.log("create agent success", value);
          if (value?.status === -2) {
            toast.showToast("Khách hàng đã tồn tại");
            return;
          }
          if (value?.status === 0) {
            toast.showToast("Thêm khách hàng thành công");
            return;
          }
          toast.showToast("Thêm mới thất bại");
        })
        .catch((e) => {
          console.log("create agent fail", e.message);
        });
    } else {
      onValidateCustomer(values);
    }
  };
  const handleUpdateAgent = async (values: TCustomerRes) => {
    if (isEdit === true) {
      await updateCustomer({
        ...values,
        uuid: values?.uuid ? values.uuid : newUUID?.toString(),
        info_primary: 0,
        customer_province: provinceId,
        status: 0,
        gender: +(values?.gender ?? 1),
        birthday: values?.birthday
          ? +format(values.birthday, "yyyyMMdd")
          : null,
        area_size: values?.area_size
          ? fParseNumber(values.area_size.toString())
          : null,
        citizen_number: values?.citizen_number
          ? +values.citizen_number
          : values.citizen_number,
        citizen_day: values?.citizen_day
          ? +format(values.citizen_day, "yyyyMMdd")
          : values?.citizen_day,
      })
        .unwrap()
        .then((value) => {
          setIsEdit(false);
          console.log("create agent success", value);
          if (value?.status === -2) {
            toast.showToast("Đại lý đã tồn tại");
            return;
          }
          if (value?.status === 0) {
            toast.showToast("Cập nhật đại lý thành công");
            return;
          }
          toast.showToast("Cập nhật thất bại");
        })
        .catch((e) => {
          setIsEdit(false);
          console.log("create agent fail", e.message);
        });
    }
  };

  useEffect(() => {
    if (customer?.customer_province) setProvinceId(customer.customer_province);
  }, [customer]);

  return (
    <Fragment>
      <Formik
        initialValues={{
          uuid: customer?.uuid ?? newUUID?.toString(),
          customer_code: customer?.customer_code ?? "",
          customer_name: customer?.customer_name ?? "",
          customer_province: customer?.customer_province ?? "",
          customer_type: customer?.customer_type ?? "",
          name: customer?.name ?? "",
          province: customer?.province ?? "",
          info_primary: customer?.info_primary ?? 1,
          phone: customer?.phone ?? "",
          sign_board: customer?.sign_board ?? "",
          customer_address: customer?.customer_address ?? "",
          customer_district: customer?.customer_district ?? "",
          province_name: customer?.province_name ?? "",
          status: customer?.status ?? 1,
          time: customer?.time ?? "",
          gender: customer?.gender ?? -1,
          birthday: customer?.birthday ? fDate(customer.birthday) : undefined,
          email: customer?.email ?? "",
          citizen_number: customer?.citizen_number,
          citizen_day: customer?.citizen_day,
          business_document: customer?.business_document ?? "",
          tags: customer?.tags ?? "",
          note: customer?.note ?? "",
          area_size: customer?.area_size ?? 0,
          source_channel_used: customer?.source_channel_used ?? "",
          avatar: customer?.avatar ?? "",
          sale_code: customer?.sale_code ?? "", // mã nhân viên
          export_code: customer?.export_code, // mã xuất kho
          export_address: customer?.export_address,
          retailer_group: customer?.retailer_group || "",
        }}
        onSubmit={handleSubmitAgent}
        enableReinitialize
        validationSchema={customerSchema}
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
                <Card.Title>Thông tin khách hàng</Card.Title>
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
                  {isEdit && isCreate !== "true" && (
                    <div className="d-flex gap-2">
                      {permission.verifyUnvalidateCustomer && (
                        <AppWarning
                          onAccept={() => {
                            if (values.customer_type === "ANONYMOUS") {
                              toast.showToast(
                                "Đối tượng khách hàng phải khác chưa định danh trước khi xác thực khách hàng"
                              );
                            } else handleSubmit();
                          }}
                        >
                          <button
                            className={`btn btn-teal-light justify-content-center align-items-center ${
                              isLoadingVerify && "btn-loader "
                            }`}
                          >
                            <span>Xác thực</span>
                            {isLoadingVerify && (
                              <span className="loading">
                                <i className="ri-loader-2-fill fs-19"></i>
                              </span>
                            )}
                          </button>
                        </AppWarning>
                      )}
                      {permission.editUnValidateCustomer && (
                        <AppWarning
                          onAccept={() => {
                            if (!errors)
                              toast.showToast("Vui lòng bổ sung thông tin");
                            else handleUpdateAgent(values);
                          }}
                        >
                          <button
                            className={`btn  btn-purple-light justify-content-center align-items-center ${
                              isLoadingUpdate && "btn-loader "
                            }`}
                          >
                            <span>Lưu</span>
                            {isLoadingUpdate && (
                              <span className="loading">
                                <i className="ri-loader-2-fill fs-19"></i>
                              </span>
                            )}
                          </button>
                        </AppWarning>
                      )}
                    </div>
                  )}
                  {permission.editUnValidateCustomer &&
                    !isEdit &&
                    isCreate !== "true" && (
                      <button
                        className={`btn btn-purple-light justify-content-center align-items-center
                            `}
                        onClick={() => setIsEdit(true)}
                      >
                        <span>Chỉnh sửa</span>
                      </button>
                    )}
                  {permission.createUnValidateCustomer &&
                    isCreate === "true" && (
                      <AppWarning onAccept={() => handleSubmit()}>
                        <button
                          className={`btn btn-purple-light justify-content-center align-items-center ${
                            isLoadingCreate && "btn-loader "
                          }`}
                        >
                          <span>Thêm mới</span>
                          {isLoadingCreate && (
                            <span className="loading">
                              <i className="ri-loader-2-fill fs-19"></i>
                            </span>
                          )}
                        </button>
                      </AppWarning>
                    )}
                </div>
              </Card.Header>
            </Card>
            <Row>
              <Stack as={Col} md={6}>
                <Card className="custom-card">
                  <Card.Header className="justify-content-between">
                    <Card.Title>
                      {!isEdit
                        ? "Thông tin khách hàng"
                        : "Chỉnh sửa thông tin khách hàng"}
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row className="mb-2">
                      <Form.Group as={Col} md={4}>
                        <Form.Label className="text-black">
                          Họ và tên <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          className="input-placeholder"
                          type="text"
                          placeholder="Họ và tên"
                          name="customer_name"
                          value={values.customer_name}
                          onChange={handleChange}
                          isInvalid={
                            touched.customer_name && !!errors.customer_name
                          }
                          disabled={isCreate === "false" && isEdit === false}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.customer_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md={4}>
                        <Form.Label className="text-black">
                          Giới tính
                        </Form.Label>
                        <Form.Select
                          className="form-select input-placeholder"
                          name="gender"
                          value={values.gender}
                          onChange={(e) =>
                            setFieldValue("gender", e.target.value)
                          }
                          isInvalid={touched.gender && !!errors.gender}
                          required
                          disabled={isCreate === "false" && isEdit === false}
                        >
                          <option value={-1}>--Chọn giới tính--</option>
                          <option value={0}>Nữ</option>
                          <option value={1}>Nam</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} md={4}>
                        <Form.Label className="text-black">
                          Ngày sinh
                        </Form.Label>
                        <Form.Control
                          required
                          type="date"
                          onKeyDown={(e) => e.preventDefault()}
                          id="birthday_validate"
                          placeholder="Ngày sinh"
                          name="birthday"
                          value={values.birthday}
                          lang="vi"
                          onChange={handleChange}
                          className="input-placeholder"
                          isInvalid={touched.birthday && !!errors.birthday}
                          disabled={isCreate === "false" && isEdit === false}
                        />
                      </Form.Group>
                    </Row>
                    <Form.Group>
                      <Form.Label className="text-black">
                        Nhóm khách hàng <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Select
                        className="form-select input-placeholder"
                        name="customer_type"
                        value={values.customer_type}
                        onChange={(e) => {
                          if (e.target.value === "FARMER")
                            setFieldValue("info_primary", 1);
                          setFieldValue("customer_type", e.target.value);
                        }}
                        isInvalid={
                          touched.customer_type && !!errors.customer_type
                        }
                        required
                        disabled={isCreate === "false" && isEdit === false}
                      >
                        <option value="">-- Chọn nhóm khách hàng --</option>
                        {groupObjectives?.map((item) => (
                          <option key={item.id} value={item.symbol}>
                            {item.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.customer_type as any}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {values.customer_type === "RETAILER1" && (
                      <Form.Group>
                        <Form.Label className="text-black">
                          Nhóm đại lý
                        </Form.Label>
                        <Form.Select
                          className="form-select input-placeholder"
                          name="retailer_group"
                          onChange={(e) =>
                            setFieldValue("retailer_group", e.target.value)
                          }
                          isInvalid={
                            touched.retailer_group && !!errors.retailer_group
                          }
                          required
                          disabled={isCreate === "false" && isEdit === false}
                        >
                          <option value="">-- Chọn nhóm đại lý --</option>
                          {groupRetailers?.map((item) => (
                            <option key={item.id} value={item.code}>
                              {item.name}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.retailer_group as any}
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                    <Form.Group className="mb-2">
                      <Form.Label className="text-black">
                        Số điện thoại <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        id="phone_validate"
                        placeholder="Nhập số điện thoại"
                        name="text"
                        value={values.phone}
                        className="input-placeholder"
                        onChange={handleChange}
                        isInvalid={touched.phone && !!errors.phone}
                        disabled={isCreate === "false"}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                      <Form.Label className="text-black">
                        Số điện thoại tham gia tích điểm{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Check
                        type="switch"
                        className="form-check-md mb-2 input-placeholder"
                        disabled={isCreate === "false" && isEdit === false}
                        checked={values.info_primary === 1 ? true : false}
                        onChange={(value) => {
                          if (values.customer_type === "FARMER")
                            setFieldValue("info_primary", 1);
                          else
                            setFieldValue(
                              "info_primary",
                              value.target.checked ? 1 : 0
                            );
                        }}
                        required
                        name="info_primary"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.info_primary}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label className="text-black">
                        Địa chỉ email
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        className="input-placeholder"
                        placeholder="Nhập địa chỉ chi tiết"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={touched.email && !!errors.email}
                        disabled={isCreate === "false" && isEdit === false}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                      <Form.Group as={Col} md={6} className="mb-2">
                        <Form.Label className="text-black">CCCD</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Nhập căn cước công dân"
                          name="citizen_number"
                          value={values.citizen_number}
                          className="input-placeholder"
                          onChange={handleChange}
                          disabled={isCreate === "false" && isEdit === false}
                          isInvalid={
                            touched.citizen_number && !!errors.citizen_number
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.citizen_number}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md={6} className="mb-2">
                        <Form.Label className="text-black">
                          Ngày cấp CCCD
                        </Form.Label>
                        <Form.Control
                          required
                          type="date"
                          onKeyDown={(e) => e.preventDefault()}
                          className="input-placeholder"
                          placeholder="Nhập ngày cấp CCCD"
                          name="citizen_day"
                          value={values.citizen_day}
                          onChange={handleChange}
                          isInvalid={
                            touched.citizen_day && !!errors.citizen_day
                          }
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

                      <AppSelect
                        onChange={(value) => {
                          setFieldValue("customer_province", value);
                          setProvinceId(value);
                        }}
                        data={
                          provinces?.map((item) => ({
                            label: item.name ?? "",
                            value: item.code ?? "",
                          })) ?? []
                        }
                        value={values?.customer_province}
                        placeholder="Chọn tỉnh thành"
                        isInValid={
                          !!errors.customer_province &&
                          touched.customer_province
                        }
                        errorText={errors.customer_province}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.customer_province}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label className="text-black">
                        Chọn quận huyện
                      </Form.Label>

                      <AppSelect
                        onChange={(value) => {
                          setFieldValue("customer_district", value);
                        }}
                        data={
                          districts?.map((item) => ({
                            label: item.label ?? "",
                            value: item.value ?? "",
                          })) ?? []
                        }
                        value={values?.customer_district}
                        placeholder="Chọn quận huyện"
                        isInValid={
                          !!errors.customer_district &&
                          touched.customer_district
                        }
                        errorText={errors.customer_district}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label className="text-black">
                        Nhập địa chỉ chi tiết
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Nhập địa chỉ chi tiết"
                        name="customer_address"
                        className="input-placeholder"
                        disabled={isCreate === "false" && isEdit === false}
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

                    <Form.Group>
                      <Form.Label className="text-black">
                        Nhân viên phụ trách
                      </Form.Label>

                      <AppSelect
                        onChange={(value) => {
                          setFieldValue("sale_code", value);
                        }}
                        data={
                          employees?.map((item) => ({
                            label: `${item.name} - ${item.code}`,
                            value: item.code ?? "",
                          })) ?? []
                        }
                        value={values?.sale_code}
                        placeholder="Chọn nhân viên phụ trách"
                        isInValid={!!errors.sale_code && touched.sale_code}
                        errorText={errors.sale_code}
                      />
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label className="text-black">Giấy phép</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Giấy phép"
                        name="business_document"
                        className="input-placeholder"
                        disabled={isCreate === "false" && isEdit === false}
                        value={values.business_document}
                        onChange={handleChange}
                        isInvalid={
                          touched.business_document &&
                          !!errors.business_document
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.business_document}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                      <Form.Group as={Col} md={6} className="mb-2">
                        <Form.Label className="text-black">
                          Nhập cây trồng chính
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          className="input-placeholder"
                          placeholder="Nhập cây trồng chính"
                          name="tags"
                          value={values.tags}
                          onChange={handleChange}
                          isInvalid={touched.tags && !!errors.tags}
                          disabled={isCreate === "false" && isEdit === false}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.tags}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md={6} className="mb-2">
                        <Form.Label className="text-black">
                          Nhập diện tích cây trồng chính
                        </Form.Label>
                        <NumericFormat
                          thousandSeparator="."
                          decimalSeparator=","
                          customInput={Form.Control as any}
                          defaultValue={values.area_size}
                          name="area_size"
                          onChange={handleChange}
                          className="input-placeholder"
                          disabled={isCreate === "false" && isEdit === false}
                          min={1}
                          placeholder="Diện tích cây trồng chính"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.area_size}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Form.Group className="mb-2">
                      <Form.Label className="text-black">
                        Nhập ghi chú
                      </Form.Label>
                      <Form.Control
                        required
                        className="input-placeholder"
                        type="text"
                        placeholder="Ghi chú"
                        name="note"
                        value={values.note}
                        onChange={handleChange}
                        isInvalid={touched.note && !!errors.note}
                        disabled={isCreate === "false" && isEdit === false}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.note}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="text-black">
                        Nhập bảng hiệu / Tên doanh nghiệp{" "}
                        {(values.customer_type === "RETAILER1" ||
                          values.customer_type === "RETAILER2") && (
                          <span style={{ color: "red" }}>*</span>
                        )}
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Vui lòng nhập bảng hiệu"
                        name="sign_board"
                        disabled={isCreate === "false" && isEdit === false}
                        value={values.sign_board}
                        onChange={handleChange}
                        className="input-placeholder"
                        isInvalid={touched.sign_board && !!errors.sign_board}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.sign_board}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Stack>
              <Stack as={Col} md={6}>
                <Card className="custom-card">
                  <Card.Header className="justify-content-between">
                    <Card.Title>Thông tin đăng kí</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Stack>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Tên đăng ký
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Tên đăng ký"
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
                      <Form.Group>
                        <Form.Label className="text-black">
                          Số điện thoại <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Số điện thoại"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          isInvalid={touched.phone && !!errors.phone}
                          disabled
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Tỉnh đăng ký
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Tỉnh đăng ký"
                          name="province_name"
                          value={values.province_name}
                          onChange={handleChange}
                          isInvalid={
                            touched.province_name && !!errors.province_name
                          }
                          disabled
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.province_name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label className="text-black">
                          Nguồn tham gia
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Nguồn tham gia"
                          name="source_channel_used"
                          value={values.source_channel_used}
                          onChange={handleChange}
                          isInvalid={
                            touched.source_channel_used &&
                            !!errors.source_channel_used
                          }
                          disabled
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.source_channel_used}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Stack>
                  </Card.Body>
                </Card>
                {(values.customer_type === "RETAILER1" ||
                  values.customer_type === "RETAILER2") && (
                  <Card className="custom-card">
                    <Card.Header className="justify-content-between">
                      <Card.Title>Thông tin xuất kho</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Stack>
                        <Form.Group>
                          <Form.Label className="text-black">
                            Mã số KH-XK
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Mã số KH-XK"
                            name="export_code"
                            value={values.export_code}
                            onChange={handleChange}
                            className="input-placeholder"
                            disabled={isCreate === "false" && isEdit === false}
                            isInvalid={
                              touched.export_code && !!errors.export_code
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.export_code}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label className="text-black">
                            Ghi chú thông tin địa chỉ giao hàng
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Ghi chú thông tin địa chỉ giao hàng"
                            name="export_address"
                            value={values.export_address}
                            onChange={handleChange}
                            className="input-placeholder"
                            disabled={isCreate === "false" && isEdit === false}
                            isInvalid={
                              touched.export_address && !!errors.export_address
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.export_address}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Stack>
                    </Card.Body>
                  </Card>
                )}
              </Stack>
            </Row>
          </Stack>
        )}
      </Formik>
    </Fragment>
  );
}

export default CustomerUnValidationCreateEdit;
