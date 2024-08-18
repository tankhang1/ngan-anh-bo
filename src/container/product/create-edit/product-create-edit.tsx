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

import { TAgentForm, TProductForm } from "../../../assets/types";
import {
  BASE_PORT,
  BASE_URL,
  COUNTRIES,
  ProductTypeEnum,
} from "../../../constants";
import { useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import Editor from "../../forms/formeditors/formeditordata";
import {
  useGetListBinsIdQuery,
  useGetListProductsQuery,
} from "../../../redux/api/info/info.api";
import {
  useCreateProductMutation,
  useGetListDevicesQuery,
  useGetListIngredientsQuery,
  useGetNewProductCodeQuery,
  useUpdateProductMutation,
} from "../../../redux/api/product/product.api";
import { useUploadFileMutation } from "../../../redux/api/media/media.api";
import { FilePondFile } from "filepond";
import { ToastContext } from "../../../components/AppToast";
import { fNumber } from "../../../hooks";
import { NumericFormat } from "react-number-format";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType
);

function ProductCreateEdit() {
  const { isCreate, id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [files1, setFiles1] = useState<FilePondFile[] | any>([]);
  const toast = useContext(ToastContext);
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

  const { data: product } = useGetListProductsQuery(null, {
    selectFromResult: ({ data }) => ({
      data: data?.find((item) => item.code === id),
    }),
    skip: isCreate === "true",
  });
  const { data: binIds } = useGetListBinsIdQuery();
  const { data: devices } = useGetListDevicesQuery();
  const { data: ingredients } = useGetListIngredientsQuery();
  const { data: productId } = useGetNewProductCodeQuery(null, {
    refetchOnFocus: true,
    skip: isCreate !== "true",
  });

  const [updateProduct] = useUpdateProductMutation();
  const [uploadImage] = useUploadFileMutation();
  const [createProduct] = useCreateProductMutation();

  const onHandleSubmit = async (values: TProductForm) => {
    if (isCreate === "true") {
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
    } else {
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
              if (files1.length > 0 && product?.code) {
                const formData = new FormData();
                formData.append("files", files1[0].file);
                try {
                  await uploadImage({
                    id: product?.code,
                    body: formData,
                  })
                    .unwrap()
                    .then(() => console.log("success"));
                } catch (error) {
                  console.error("Upload failed:", error);
                }
              }
              console.log("chỉnh sửa sản phẩm thành công");
              toast.showToast("Chỉnh sửa sản phẩm thành công");
            } else toast.showToast("Chỉnh sửa sản phẩm thất bại");
          })
          .catch(() => {
            toast.showToast("Chỉnh sửa sản phẩm thất bại");
          });
      }
    }
  };

  console.log(
    isCreate === "true" ? productId ?? "" : product?.code ?? "",
    productId
  );
  return (
    <Fragment>
      <Formik
        initialValues={{
          bin_pallet: product?.bin_pallet ?? 0,
          code: isCreate === "true" ? productId ?? "" : product?.code ?? "",
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
          type: product?.type.toString() ?? 0,
          unit: product?.unit ?? "",
          mop: product?.mop ?? 0,
          device_code: product?.device_code ?? "",
          point: product?.point ?? 1,
          c1_price_vnd: product?.c1_price_vnd ?? 0,
          c2_price_vnd: product?.c2_price_vnd ?? 0,
        }}
        enableReinitialize
        onSubmit={(values) => {
          console.log(values);
        }}

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
                    ? "Thông tin sản phẩm"
                    : "Chỉnh sửa thông tin sản phẩm"}
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
                        onClick={() => onHandleSubmit(values)}
                      >
                        Thêm mới
                      </button>
                    ) : (
                      <button
                        className="btn btn-purple-light"
                        type="submit"
                        onClick={() => onHandleSubmit(values)}
                      >
                        {!isEdit ? "Chỉnh sửa" : "Lưu"}
                      </button>
                    )}
                  </OverlayTrigger>
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
                        <Form.Group controlId="image_validate">
                          <Form.Label className="text-black">
                            {" "}
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
                        <Form.Group controlId="code_validate">
                          <Form.Label className="text-black">
                            Mã sản phẩm
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
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.code}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="product_name_detail_validate">
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
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.product_name_detail}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="name_display_label_validate">
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
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name_display_label}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="brand_code_validate">
                          <Form.Label className="text-black">
                            Mã thương hiệu
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            id="brand_code_validate"
                            placeholder="Tên sản phẩm"
                            name="brand_code"
                            defaultValue={values.brand_code}
                            onChange={handleChange}
                            isInvalid={
                              touched.brand_code && !!errors.brand_code
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.brand_code}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="brand_name_validate">
                          <Form.Label className="text-black">
                            Tên thương hiệu
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            id="brand_name_validate"
                            placeholder="Tên thương hiệu"
                            name="brand_name"
                            defaultValue={values.brand_name}
                            onChange={handleChange}
                            isInvalid={
                              touched.brand_name && !!errors.brand_name
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.brand_name}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="category_code_validate">
                          <Form.Label className="text-black">
                            Mã nhóm sản phẩm
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
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.category_code}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="category_name_validate">
                          <Form.Label className="text-black">
                            Tên nhóm sản phẩm
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
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.category_name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Stack>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group as={Col} md={4} controlId="point_validate">
                      <Form.Label className="text-black">
                        Số điểm thưởng
                      </Form.Label>
                      {/* <Form.Control
                        required
                        type="number"
                        min={1}
                        id="point_validate"
                        placeholder="Số điểm thưởng"
                        name="point"
                        defaultValue={values.point}
                        onChange={handleChange}
                        isInvalid={touched.point && !!errors.point}
                      /> */}
                      <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        customInput={Form.Control as any}
                        defaultValue={values.point}
                        name="point"
                        onChange={handleChange}
                        min={1}
                        placeholder="Số điểm thưởng"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.point}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md={4}
                      controlId="c1_price_vnd_validate"
                    >
                      <Form.Label className="text-black">Giá C1</Form.Label>
                      {/* <Form.Control
                        required
                        type="number"
                        min={0}
                        id="c1_price_vnd_validate"
                        placeholder="Số tiền 1"
                        name="c1_price_vnd"
                        defaultValue={fNumber(values.c1_price_vnd)}
                        onChange={handleChange}
                        isInvalid={
                          touched.c1_price_vnd && !!errors.c1_price_vnd
                        }
                      /> */}
                      <NumericFormat
                        thousandSeparator="."
                        customInput={Form.Control as any}
                        suffix=" VND"
                        min={0}
                        defaultValue={values.c1_price_vnd}
                        name="c1_price_vnd"
                        onChange={handleChange}
                        placeholder="Số tiền 1"
                        decimalSeparator=","
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.c1_price_vnd}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md={4}
                      controlId="c2_price_vnd_validate"
                    >
                      <Form.Label className="text-black">Giá C2</Form.Label>
                      {/* <Form.Control
                        required
                        as={NumericFormat}
                        type="number"
                        min={0}
                        id="c1_price_vnd_validate"
                        placeholder="Số tiền 2"
                        thousandSeparator
                        name="c2_price_vnd"
                        defaultValue={values.c2_price_vnd}
                        onChange={handleChange}
                        isInvalid={
                          touched.c2_price_vnd && !!errors.c2_price_vnd
                        }
                      /> */}
                      <NumericFormat
                        thousandSeparator="."
                        customInput={Form.Control as any}
                        suffix=" VND"
                        min={0}
                        defaultValue={values.c2_price_vnd}
                        name="c2_price_vnd"
                        onChange={handleChange}
                        placeholder="Số tiền 2"
                        decimalSeparator=","
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.c2_price_vnd}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} md={6} controlId="type_validate">
                      <Form.Label className="text-black">
                        Hình thức đóng gói
                      </Form.Label>
                      <Form.Select
                        className="form-select"
                        id="type_validate"
                        name="type"
                        defaultValue={values.type}
                        onChange={handleChange}
                        isInvalid={touched.type && !!errors.type}
                        required
                      >
                        {[
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
                    <Form.Group as={Col} md={6} controlId="code_bin_validate">
                      <Form.Label className="text-black">Mã thùng</Form.Label>
                      <Form.Select
                        className="form-select"
                        id="code_bin_validate"
                        name="code_bin"
                        defaultValue={values.code_bin}
                        onChange={handleChange}
                        isInvalid={touched.code_bin && !!errors.code_bin}
                        required
                      >
                        {binIds?.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.code_bin}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      md={4}
                      controlId="pack_configuration_validate"
                    >
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
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.pack_configuration}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={4} controlId="net_weight_validate">
                      <Form.Label className="text-black">
                        Trọng lượng
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
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.net_weight}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={4} controlId="unit_validate">
                      <Form.Label className="text-black">
                        Đơn vị tính
                      </Form.Label>
                      <Form.Select
                        className="form-select"
                        id="unit_validate"
                        name="unit"
                        defaultValue={values.unit}
                        onChange={handleChange}
                        isInvalid={touched.unit && !!errors.unit}
                        required
                      >
                        {[
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
                  <Form.Group controlId="ingredient_id_validate">
                    <Form.Label className="text-black">
                      Mã nguyên liệu
                    </Form.Label>
                    <Form.Select
                      className="form-select"
                      required
                      id="ingredient_id_validate"
                      name="ingredient_id"
                      defaultValue={values.ingredient_id}
                      onChange={handleChange}
                      isInvalid={
                        touched.ingredient_id && !!errors.ingredient_id
                      }
                    >
                      {ingredients?.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.ingredient_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Row>
                    <Form.Group as={Col} md={6} controlId="short_info_validate">
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
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.short_info}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md={6}
                      controlId="description_validate"
                    >
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
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Form.Group controlId="ingredient_validate">
                    <Form.Label className="text-black">
                      Thành phần nguyên liệu
                    </Form.Label>
                    <Editor
                      placeholder="Thành phần nguyên liệu"
                      value={values.ingredient}
                      handOnChange={(value) =>
                        setFieldValue("ingredient", value)
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ingredient}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row>
                    <Form.Group as={Col} md={6} controlId="detail_url_validate">
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
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.detail_url}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md={6}
                      controlId="certificate_of_origin_validate"
                    >
                      <Form.Label className="text-black">Xuất xứ</Form.Label>
                      <Form.Select
                        className="form-select"
                        id="certificate_of_origin_validate"
                        name="certificate_of_origin"
                        defaultValue={values.certificate_of_origin}
                        onChange={handleChange}
                        isInvalid={
                          touched.certificate_of_origin &&
                          !!errors.certificate_of_origin
                        }
                        required
                      >
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
                  <Form.Group
                    as={Col}
                    md={4}
                    controlId="certificate_of_origin_validate"
                  >
                    <Form.Label className="text-black">Sản xuất</Form.Label>
                    <Form.Check label="Đóng gói" />
                    <Form.Check defaultChecked label="In trên bao bì" />
                  </Form.Group>
                  <Row>
                    <Form.Group as={Col} md={3} controlId="mop_validate">
                      <Form.Label className="text-black">
                        Số lượng sản xuất tối thiểu
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
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mop}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={3} controlId="sku_bin_validate">
                      <Form.Label className="text-black">
                        Số sản phẩm / thùng
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
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mop}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={3} controlId="sku_box_validate">
                      <Form.Label className="text-black">
                        Số sản phẩm / hộp
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
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.sku_box}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={3} controlId="bin_pallet_validate">
                      <Form.Label className="text-black">
                        Số thùng / lô
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
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.bin_pallet}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Form.Group controlId="device_code_validate">
                    <Form.Label className="text-black">
                      Thiết bị in bao bì
                    </Form.Label>
                    <Form.Select
                      className="form-select"
                      id="device_code_validate"
                      name="device_code"
                      defaultValue={values.device_code}
                      onChange={handleChange}
                      isInvalid={touched.device_code && !!errors.device_code}
                      required
                    >
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
          </form>
        )}
      </Formik>
    </Fragment>
  );
}

export default ProductCreateEdit;
