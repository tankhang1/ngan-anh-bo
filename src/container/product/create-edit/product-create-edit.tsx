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

import {
  TAgentForm,
  TProductCreateForm,
  TProductForm,
} from "../../../assets/types";
import {
  BASE_PORT,
  BASE_URL,
  COUNTRIES,
  ProductTypeEnum,
} from "../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import Editor from "../../forms/formeditors/formeditordata";
import { useGetListBinsIdQuery } from "../../../redux/api/info/info.api";
import {
  useCreateProductMutation,
  useGetListDevicesQuery,
  useGetListIngredientsQuery,
  useGetNewProductCodeQuery,
} from "../../../redux/api/product/product.api";
import { useUploadFileMutation } from "../../../redux/api/media/media.api";
import { FilePondFile } from "filepond";
import { ToastContext } from "../../../components/AppToast";
import { fNumber, fParseNumber } from "../../../hooks";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import productCreateSchema from "../../../schema/product.create.schema";
import AppWarning from "../../../components/AppWarning";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType
);

function ProductCreate() {
  const { roles } = useSelector((state: RootState) => state.auth);
  const { isCreate, id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [files1, setFiles1] = useState<FilePondFile[] | any>([]);
  const toast = useContext(ToastContext);
  const { Formik } = formik;
  const navigate = useNavigate();

  const { data: binIds } = useGetListBinsIdQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: devices } = useGetListDevicesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: ingredients } = useGetListIngredientsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: productId } = useGetNewProductCodeQuery(null, {
    refetchOnFocus: true,
  });

  const [uploadImage] = useUploadFileMutation();
  const [createProduct, { isLoading: isLoadingCreate }] =
    useCreateProductMutation();

  const onHandleSubmit = async (values: TProductCreateForm) => {
    if (productId)
      await createProduct({
        ...values,
        qr_mapping: values.qr_mapping ? 1 : 0,
        qr_printing: values.qr_printing ? 1 : 0,
        sku_bin: +(values?.sku_bin ?? 0),
        sku_box: +(values?.sku_box ?? 0),
        bin_pallet: +(values?.bin_pallet ?? 0),
        mop: +(values?.mop ?? 0),
        net_weight: +(values.net_weight ?? 0),
        type: +values.type,
        code: productId,
        c1_price_vnd: fParseNumber(values.c1_price_vnd.toString()),
        c2_price_vnd: fParseNumber(values.c2_price_vnd.toString()),
        point: fParseNumber(values.point.toString()),
      })
        .unwrap()
        .then(async (value) => {
          if (value?.status === 0) {
            toast.showToast("Thêm mới sản phẩm thành công");
            if (files1.length > 0) {
              const formData = new FormData();
              formData.append("files", files1[0].file);
              console.log(formData);
              try {
                await uploadImage({
                  id: productId,
                  body: formData,
                })
                  .unwrap()
                  .then(() => console.log("success"));
              } catch (error) {
                console.error("Upload failed:", error);
              }
            }
          } else toast.showToast("Thêm mới thất bại");
        })
        .catch(() => {
          toast.showToast("Hết hạn token");
        });
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          bin_pallet: 0,
          code: productId ?? "",
          code_bin: "",
          certificate_of_origin: "",
          description: "",
          detail_url: "",
          ingredient: `<p></p>`,
          ingredient_id: "",
          name_display_root: "",
          name_display_label: "",
          net_weight: 0,
          pack_configuration: "",
          product_name_detail: "",
          qr_mapping: false,
          qr_printing: false,
          short_info: "",
          sku_bin: 0,
          sku_box: 0,
          type: "",
          unit: "",
          mop: 0,
          device_code: "",
          point: 0,
          c1_price_vnd: 0,
          c2_price_vnd: 0,
          version: "",
        }}
        enableReinitialize
        onSubmit={onHandleSubmit}
        validationSchema={productCreateSchema}
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
                <AppWarning onAccept={() => handleSubmit()}>
                  <button
                    className={`btn  btn-purple-light ms-2 justify-content-center align-items-center ${
                      isLoadingCreate && "btn-loader"
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
              </div>
            </Card.Header>
            <Card.Body>
              <Stack className="d-flex gap-2">
                <Row className="d-flex mb-2">
                  <Col xl={6}>
                    {isCreate === "false" && isEdit === false ? (
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
                    ) : (
                      <Form.Group>
                        <Form.Label className="text-black">
                          Hình ảnh sản phẩm
                        </Form.Label>
                        <FilePond
                          files={files1}
                          onupdatefiles={setFiles1}
                          labelIdle="Drag & Drop your file here or click "
                          acceptedFileTypes={["image/jpeg"]}
                        ></FilePond>

                        <Form.Control.Feedback type="invalid">
                          {errors.code}
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Col>
                  <Col xl={6}>
                    <Stack className="d-flex gap-2">
                      <Form.Group>
                        <Form.Label className="text-black">
                          Mã sản phẩm (Hệ thống)
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="code_validate"
                          placeholder="Mã sản phẩm"
                          name="name"
                          defaultValue={
                            isCreate === "true" ? productId : values.code
                          }
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
                          Tên sản phẩm
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
                          disabled={isCreate === "false" && isEdit === false}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.product_name_detail}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Tên sản phẩm (thu gọn)
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
                          disabled={isCreate === "false" && isEdit === false}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name_display_label}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="text-black">
                          Hình thức đóng gói{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Select
                          className="form-select input-placeholder"
                          id="type_validate"
                          name="type"
                          defaultValue={values.type}
                          onChange={handleChange}
                          isInvalid={touched.type && !!errors.type}
                          required
                          disabled={isCreate === "false" && isEdit === false}
                        >
                          {[
                            {
                              value: "",
                              label: "-- Chọn hình thức đóng gói --",
                            },
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
                      {values.type !== ProductTypeEnum.BIN.toString() && (
                        <Form.Group>
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
                            disabled={isCreate === "false" && isEdit === false}
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
                      )}
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
                      Số điểm thưởng
                    </Form.Label>

                    <NumericFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      customInput={Form.Control as any}
                      defaultValue={values.point}
                      name="point"
                      onChange={handleChange}
                      min={0}
                      placeholder="Số điểm thưởng"
                      className="input-placeholder"
                      disabled={isCreate === "false" && isEdit === false}
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
                      disabled={isCreate === "false" && isEdit === false}
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
                      disabled={isCreate === "false" && isEdit === false}
                    />
                    {errors.c2_price_vnd && touched.c2_price_vnd && (
                      <p style={{ color: "red", fontSize: 12 }}>
                        {errors.c2_price_vnd}
                      </p>
                    )}
                  </Form.Group>
                </Row>
                {/* <Row>
                  <Form.Group
                    as={Col}
                    md={values.type !== ProductTypeEnum.BIN.toString() ? 6 : 12}
                  >
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
                      disabled={isCreate === "false" && isEdit === false}
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
                  {values.type !== ProductTypeEnum.BIN.toString() && (
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
                        disabled={isCreate === "false" && isEdit === false}
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
                  )}
                </Row> */}
                <Row>
                  <Form.Group as={Col} md={4}>
                    <Form.Label className="text-black">
                      Quy cách đóng gói
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
                      disabled={isCreate === "false" && isEdit === false}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.pack_configuration}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={4}>
                    <Form.Label className="text-black">Trọng lượng</Form.Label>
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
                      disabled={isCreate === "false" && isEdit === false}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.net_weight}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={4}>
                    <Form.Label className="text-black">Đơn vị tính</Form.Label>
                    <Form.Select
                      className="form-select input-placeholder"
                      id="unit_validate"
                      name="unit"
                      defaultValue={values.unit}
                      onChange={handleChange}
                      isInvalid={touched.unit && !!errors.unit}
                      required
                      disabled={isCreate === "false" && isEdit === false}
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
                  <Form.Label className="text-black">Mã nguyên liệu</Form.Label>
                  <Form.Select
                    className="form-select input-placeholder"
                    required
                    id="ingredient_id_validate"
                    name="ingredient_id"
                    defaultValue={values.ingredient_id}
                    onChange={handleChange}
                    isInvalid={touched.ingredient_id && !!errors.ingredient_id}
                    disabled={isCreate === "false" && isEdit === false}
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
                      disabled={isCreate === "false" && isEdit === false}
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
                      disabled={isCreate === "false" && isEdit === false}
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
                  <Form.Group>
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
                      disabled={isCreate === "false" && isEdit === false}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.detail_url}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                {/* <Form.Group as={Col} md={4}>
                  <Form.Label className="text-black">Sản xuất </Form.Label>
                  <Form.Check
                    label="Đóng gói"
                    onChange={(e) =>
                      setFieldValue("qr_mapping", e.target.checked)
                    }
                    checked={values.qr_mapping}
                  />
                  <Form.Check
                    label="In trên bao bì"
                    onChange={(e) =>
                      setFieldValue("qr_printing", e.target.checked)
                    }
                    checked={values.qr_printing}
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
                      disabled={isCreate === "false" && isEdit === false}
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
                      disabled={isCreate === "false" && isEdit === false}
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
                      disabled={isCreate === "false" && isEdit === false}
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
                      disabled={isCreate === "false" && isEdit === false}
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
                    disabled={isCreate === "false" && isEdit === false}
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
                </Form.Group> */}
              </Stack>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
}

export default ProductCreate;
