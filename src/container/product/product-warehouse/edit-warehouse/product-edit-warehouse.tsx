import React, { Fragment, useContext, useMemo, useState } from "react";
import {
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap";
import * as formik from "formik";

import { TAgentForm, TProductForm } from "../../../../assets/types";
import {
  BASE_PORT,
  BASE_URL,
  COUNTRIES,
  ProductTypeEnum,
} from "../../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import Editor from "../../../forms/formeditors/formeditordata";
import {
  useGetListBinsIdQuery,
  useGetListProductsQuery,
} from "../../../../redux/api/info/info.api";
import {
  useCreateProductMutation,
  useGetListDevicesQuery,
  useGetListIngredientsQuery,
  useUpdateProductByWarehouseMutation,
  useUpdateProductMutation,
} from "../../../../redux/api/product/product.api";
import { useUploadFileMutation } from "../../../../redux/api/media/media.api";
import { FilePondFile } from "filepond";
import { ToastContext } from "../../../../components/AppToast";
import { fNumber } from "../../../../hooks";
import { NumericFormat } from "react-number-format";
import productSchema from "../../../../schema/product.schema";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import AppWarning from "../../../../components/AppWarning";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType
);

function ProductEditWarehouse() {
  const { roles } = useSelector((state: RootState) => state.auth);
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [files1, setFiles1] = useState<FilePondFile[] | any>([]);
  const toast = useContext(ToastContext);
  const { Formik } = formik;
  const navigate = useNavigate();

  const { data: product } = useGetListProductsQuery(null, {
    selectFromResult: ({ data }) => ({
      data: data?.find((item) => item.code === id),
    }),
  });
  const { data: binIds } = useGetListBinsIdQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: devices } = useGetListDevicesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: ingredients } = useGetListIngredientsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateProduct, { isLoading: isLoadingUpdate }] =
    useUpdateProductByWarehouseMutation();

  const onHandleSubmit = async (values: TProductForm) => {
    setIsEdit(!isEdit);

    if (product && isEdit === true) {
      await updateProduct({
        ...product,
        ...values,
        qr_mapping: values.qr_mapping ? 1 : 0,
        qr_printing: values.qr_printing ? 1 : 0,
        sku_bin: +(values?.sku_bin ?? 0),
        sku_box: +(values?.sku_box ?? 0),
        bin_pallet: +(values?.bin_pallet ?? 0),
        mop: +(values?.mop ?? 0),
        net_weight: +(values.net_weight ?? 0),
        type: +values.type,
      })
        .unwrap()
        .then(async (value) => {
          if (value?.status === 0) {
            toast.showToast("Chỉnh sửa sản phẩm thành công");
          } else toast.showToast("Chỉnh sửa sản phẩm thất bại");
        })
        .catch(() => {
          toast.showToast("Chỉnh sửa sản phẩm thất bại");
        });
    }
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          bin_pallet: product?.bin_pallet ?? 0,
          code: product?.code ?? "",
          code_bin: product?.code_bin ?? "",
          brand_code: product?.brand_code ?? "",
          brand_name: product?.brand_name ?? "",
          category_code: product?.category_code ?? "",
          category_name: product?.category_name ?? "",
          certificate_of_origin: product?.certificate_of_origin ?? "",
          description: product?.description ?? "",
          detail_url: product?.detail_url ?? "",
          ingredient: `<p>${product?.ingredient ?? ""}</p>`,
          ingredient_id: product?.ingredient_id ?? "",
          name_display_label: product?.name_display_label ?? "",
          net_weight: product?.net_weight ?? 0,
          pack_configuration: product?.pack_configuration ?? "",
          product_name_detail: product?.product_name_detail ?? "",
          qr_mapping: product?.qr_mapping === 1 ? true : false,
          qr_printing: product?.qr_printing === 1 ? true : false,
          short_info: product?.short_info ?? "",
          sku_bin: product?.sku_bin ?? 0,
          sku_box: product?.sku_box ?? 0,
          type: product?.type.toString() ?? "",
          unit: product?.unit ?? "",
          mop: product?.mop ?? 0,
          device_code: product?.device_code ?? "",
          point: product?.point ?? 1,
          c1_price_vnd: product?.c1_price_vnd ?? 0,
          c2_price_vnd: product?.c2_price_vnd ?? 0,
          name_display_root: product?.name_display_root ?? "",
          version: product?.version ?? "",
        }}
        enableReinitialize
        onSubmit={onHandleSubmit}
        validationSchema={productSchema}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>
                {!isEdit
                  ? "Thông tin sản phẩm"
                  : "Chỉnh sửa thông tin sản phẩm"}
              </Card.Title>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-danger-light"
                  type={"button"}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Trở lại
                </button>

                {isEdit ? (
                  <AppWarning
                    onAccept={() => {
                      if (!errors)
                        toast.showToast("Vui lòng điền đầy đủ thông tin");
                      else handleSubmit(values as any);
                    }}
                  >
                    <button
                      className={`btn btn-purple-light justify-content-center align-items-center ${
                        isLoadingUpdate && "btn-loader"
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
                ) : (
                  <button
                    className={`btn btn-purple-light justify-content-center align-items-center}`}
                    type={"button"}
                    onClick={() => setIsEdit(true)}
                  >
                    <span>Chỉnh sửa</span>
                  </button>
                )}
              </div>
            </Card.Header>
            <Card.Body>
              <Stack className="d-flex gap-2">
                <Row className="d-flex mb-2">
                  <Col xl={6}>
                    <Stack className="d-flex justify-content-center align-items-center">
                      <img
                        src={
                          `${BASE_PORT}/${values.code}.jpg` ||
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
                        }
                        className="img object-fit-cover img-fluid"
                        style={{
                          maxHeight: 500,
                        }}
                      />
                    </Stack>
                  </Col>
                  <Col xl={6}>
                    <Stack className="d-flex gap-2">
                      <Form.Group>
                        <Form.Label className="text-black">
                          Mã sản phẩm <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="code_validate"
                          placeholder="Mã sản phẩm"
                          name="name"
                          defaultValue={values.code}
                          onChange={handleChange}
                          isInvalid={touched.code && !!errors.code}
                          className="input-placeholder"
                          disabled={true}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.code}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Tên sản phẩm <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="product_name_detail_validate"
                          placeholder="Tên sản phẩm"
                          name="product_name_detail"
                          defaultValue={values.product_name_detail}
                          onChange={handleChange}
                          isInvalid={
                            touched.product_name_detail &&
                            !!errors.product_name_detail
                          }
                          className="input-placeholder"
                          disabled={true}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.product_name_detail}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Tên sản phẩm (thu gọn){" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="name_display_label_validate"
                          placeholder="Tên sản phẩm (thu gọn)"
                          name="name_display_label"
                          defaultValue={values.name_display_label}
                          onChange={handleChange}
                          isInvalid={
                            touched.name_display_label &&
                            !!errors.name_display_label
                          }
                          className="input-placeholder"
                          disabled={true}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name_display_label}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Mã thương hiệu <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="brand_code_validate"
                          placeholder="Mã thương hiệu"
                          name="brand_code"
                          defaultValue={values.brand_code}
                          onChange={handleChange}
                          isInvalid={touched.brand_code && !!errors.brand_code}
                          className="input-placeholder"
                          disabled={true}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.brand_code}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Tên thương hiệu{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="brand_name_validate"
                          placeholder="Tên thương hiệu"
                          name="brand_name"
                          defaultValue={values.brand_name}
                          onChange={handleChange}
                          isInvalid={touched.brand_name && !!errors.brand_name}
                          className="input-placeholder"
                          disabled={true}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.brand_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Mã nhóm sản phẩm{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="category_code"
                          placeholder="Mã nhóm sản phẩm"
                          name="category_code"
                          defaultValue={values.category_code}
                          onChange={handleChange}
                          isInvalid={
                            touched.category_code && !!errors.category_code
                          }
                          className="input-placeholder"
                          disabled={true}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.category_code}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Tên nhóm sản phẩm{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="category_name"
                          placeholder="Tên nhóm sản phẩm"
                          name="category_name"
                          defaultValue={values.category_name}
                          onChange={handleChange}
                          isInvalid={
                            touched.category_name && !!errors.category_name
                          }
                          className="input-placeholder"
                          disabled={true}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.category_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Phiên bảng <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="version"
                          placeholder="Mã phiên bảng"
                          name="version"
                          defaultValue={values.version}
                          onChange={handleChange}
                          isInvalid={touched.version && !!errors.version}
                          className="input-placeholder"
                          disabled={isEdit === false}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.version}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Stack>
                  </Col>
                </Row>
                <Row>
                  <Form.Group as={Col} md={4}>
                    <Form.Label className="text-black">
                      Số điểm thưởng <span style={{ color: "red" }}>*</span>
                    </Form.Label>

                    <NumericFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      customInput={Form.Control as any}
                      defaultValue={values.point}
                      name="point"
                      onChange={handleChange}
                      min={1}
                      placeholder="Số điểm thưởng"
                      className="input-placeholder"
                      disabled={true}
                    />
                    {errors.point && touched.point && (
                      <p style={{ color: "red", fontSize: 12 }}>
                        {errors.point}
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md={4}>
                    <Form.Label className="text-black">Giá C1</Form.Label>

                    <NumericFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      customInput={Form.Control as any}
                      min={0}
                      defaultValue={values.c1_price_vnd}
                      name="c1_price_vnd"
                      onChange={handleChange}
                      placeholder="Số tiền 1"
                      className="input-placeholder"
                      disabled={true}
                    />
                    {errors.c1_price_vnd && touched.c1_price_vnd && (
                      <p style={{ color: "red", fontSize: 12 }}>
                        {errors.c1_price_vnd}
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md={4}>
                    <Form.Label className="text-black">Giá C2</Form.Label>

                    <NumericFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      customInput={Form.Control as any}
                      min={0}
                      defaultValue={values.c2_price_vnd}
                      name="c2_price_vnd"
                      onChange={handleChange}
                      placeholder="Số tiền 2"
                      className="input-placeholder"
                      disabled={true}
                    />
                    {errors.c2_price_vnd && touched.c2_price_vnd && (
                      <p style={{ color: "red", fontSize: 12 }}>
                        {errors.c2_price_vnd}
                      </p>
                    )}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label className="text-black">
                      Hình thức đóng gói <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Select
                      className="form-select input-placeholder"
                      id="type_validate"
                      name="type"
                      defaultValue={values.type}
                      onChange={handleChange}
                      isInvalid={touched.type && !!errors.type}
                      required
                      disabled={true}
                    >
                      {[
                        { value: "", label: "-- Chọn hình thức đóng gói --" },
                        {
                          value: ProductTypeEnum.PACKET.toString(),
                          label: "Gói",
                        },
                        {
                          value: ProductTypeEnum.BAG.toString(),
                          label: "Túi",
                        },
                        {
                          value: ProductTypeEnum.BOTTLE.toString(),
                          label: "Chai",
                        },
                        {
                          value: ProductTypeEnum.BOX.toString(),
                          label: "Hộp",
                        },
                        {
                          value: ProductTypeEnum.BIN.toString(),
                          label: "Thùng",
                        },
                      ].map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.type}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Label className="text-black">
                      Mã thùng <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Select
                      className="form-select input-placeholder"
                      id="code_bin_validate"
                      name="code_bin"
                      defaultValue={values.code_bin}
                      onChange={handleChange}
                      isInvalid={touched.code_bin && !!errors.code_bin}
                      required
                      disabled={true}
                    >
                      <option value={""}>-- Chọn mã thùng --</option>
                      {binIds?.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.code_bin}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md={4}>
                    <Form.Label className="text-black">
                      Quy cách đóng gói <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      id="pack_configuration_validate"
                      name="pack_configuration"
                      defaultValue={values.pack_configuration}
                      onChange={handleChange}
                      isInvalid={
                        touched.pack_configuration &&
                        !!errors.pack_configuration
                      }
                      placeholder="Quy cách đóng gói"
                      className="input-placeholder"
                      disabled={true}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.pack_configuration}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={4}>
                    <Form.Label className="text-black">
                      Trọng lượng <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      id="net_weight_validate"
                      name="net_weight"
                      min={0}
                      defaultValue={fNumber(values.net_weight)}
                      onChange={handleChange}
                      isInvalid={touched.net_weight && !!errors.net_weight}
                      required
                      className="input-placeholder"
                      disabled={true}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.net_weight}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={4}>
                    <Form.Label className="text-black">
                      Đơn vị tính <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Select
                      className="form-select input-placeholder"
                      id="unit_validate"
                      name="unit"
                      defaultValue={values.unit}
                      onChange={handleChange}
                      isInvalid={touched.unit && !!errors.unit}
                      required
                      disabled={true}
                    >
                      {[
                        { value: "", label: "-- Chọn đơn vị tính --" },
                        { value: "gr", label: "Gram" },
                        { value: "ml", label: "Milliliter " },
                      ].map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.unit}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group>
                  <Form.Label className="text-black">
                    Mã nguyên liệu <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Select
                    className="form-select input-placeholder"
                    required
                    id="ingredient_id_validate"
                    name="ingredient_id"
                    defaultValue={values.ingredient_id}
                    onChange={handleChange}
                    isInvalid={touched.ingredient_id && !!errors.ingredient_id}
                    disabled={isEdit === false}
                  >
                    <option value={""}>-- Mã nguyên liệu --</option>
                    {ingredients?.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.ingredient_id}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label className="text-black">
                      Mô tả sản phẩm (thu gọn)
                    </Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      id="short_info_validate"
                      name="short_info"
                      defaultValue={values.short_info}
                      onChange={handleChange}
                      isInvalid={touched.short_info && !!errors.short_info}
                      placeholder="Mô tả sản phẩm (thu gọn)"
                      rows={3} // You can adjust the number of rows as needed
                      className="input-placeholder"
                      disabled={true}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.short_info}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Label className="text-black">
                      Mô tả sản phẩm (chi tiết)
                    </Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      id="description_validate"
                      name="description"
                      defaultValue={values.description}
                      onChange={handleChange}
                      isInvalid={touched.description && !!errors.description}
                      placeholder="Mô tả sản phẩm (chi tiết)"
                      rows={3} // You can adjust the number of rows as needed
                      className="input-placeholder"
                      disabled={true}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group>
                  <Form.Label className="text-black">
                    Thành phần nguyên liệu
                  </Form.Label>
                  <Editor
                    placeholder="Thành phần nguyên liệu"
                    value={values.ingredient}
                    handOnChange={(value) => setFieldValue("ingredient", value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ingredient}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label className="text-black">
                      Link sản phẩm
                    </Form.Label>
                    <Form.Control
                      required
                      type="link"
                      id="detail_url_validate"
                      name="detail_url"
                      defaultValue={values.detail_url}
                      onChange={handleChange}
                      isInvalid={touched.detail_url && !!errors.detail_url}
                      placeholder="Mô tả sản phẩm (chi tiết)"
                      className="input-placeholder"
                      disabled={true}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.detail_url}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Label className="text-black">Xuất xứ</Form.Label>
                    <Form.Select
                      className="form-select input-placeholder"
                      id="certificate_of_origin_validate"
                      name="certificate_of_origin"
                      defaultValue={values.certificate_of_origin}
                      onChange={handleChange}
                      isInvalid={
                        touched.certificate_of_origin &&
                        !!errors.certificate_of_origin
                      }
                      required
                      disabled={true}
                    >
                      <option value={""}>-- Chọn xuất xứ --</option>
                      <option value={"NONE"}>Không rõ xuất xứ</option>
                      {COUNTRIES.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.certificate_of_origin}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group as={Col} md={4}>
                  <Form.Label className="text-black">Sản xuất</Form.Label>
                  <Form.Check
                    label="Đóng gói"
                    onChange={(e) =>
                      setFieldValue("qr_mapping", e.target.checked)
                    }
                    checked={values.qr_mapping}
                    disabled={isEdit === false}
                  />
                  <Form.Check
                    label="In trên bao bì"
                    onChange={(e) =>
                      setFieldValue("qr_printing", e.target.checked)
                    }
                    checked={values.qr_printing}
                    disabled={isEdit === false}
                  />
                </Form.Group>
                <Row>
                  <Form.Group as={Col} md={3}>
                    <Form.Label className="text-black">
                      Số lượng sản xuất tối thiểu{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      id="mop_validate"
                      name="mop"
                      min={0}
                      defaultValue={values.mop}
                      onChange={handleChange}
                      isInvalid={touched.mop && !!errors.mop}
                      placeholder="Số lượng sản xuất tối thiểu"
                      className="input-placeholder"
                      disabled={isEdit === false}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mop}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={3}>
                    <Form.Label className="text-black">
                      Số sản phẩm / thùng{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      id="sku_bin_validate"
                      name="sku_bin"
                      min={0}
                      defaultValue={values.sku_bin}
                      onChange={handleChange}
                      isInvalid={touched.sku_bin && !!errors.sku_bin}
                      placeholder="Số sản phẩm / thùng"
                      className="input-placeholder"
                      disabled={isEdit === false}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.sku_bin}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={3}>
                    <Form.Label className="text-black">
                      Số sản phẩm / hộp <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      id="sku_box_validate"
                      name="sku_box"
                      min={0}
                      defaultValue={values.sku_box}
                      onChange={handleChange}
                      isInvalid={touched.sku_box && !!errors.sku_box}
                      placeholder="Số sản phẩm / hộp"
                      className="input-placeholder"
                      disabled={isEdit === false}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.sku_box}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={3}>
                    <Form.Label className="text-black">
                      Số thùng / lô <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      id="bin_pallet_validate"
                      name="bin_pallet"
                      min={0}
                      defaultValue={values.bin_pallet}
                      onChange={handleChange}
                      isInvalid={touched.bin_pallet && !!errors.bin_pallet}
                      placeholder="Số sản phẩm / hộp"
                      className="input-placeholder"
                      disabled={isEdit === false}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bin_pallet}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group>
                  <Form.Label className="text-black">
                    Thiết bị in bao bì
                  </Form.Label>
                  <Form.Select
                    className="form-select input-placeholder"
                    id="device_code_validate"
                    name="device_code"
                    defaultValue={values.device_code}
                    onChange={handleChange}
                    isInvalid={touched.device_code && !!errors.device_code}
                    required
                    disabled={isEdit === false}
                  >
                    <option value={""}>-- Chọn thiết bị --</option>
                    {devices?.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.device_code}
                  </Form.Control.Feedback>
                </Form.Group>
              </Stack>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
}

export default ProductEditWarehouse;
