import React, { Fragment, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { TAgent, TAgentForm, TObjectiveEnum } from "../../../assets/types";
import { COUNTRIES, ProductTypeEnum, PROVINCES } from "../../../constants";
import { useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import Editor1 from "../../forms/formeditors/formeditordata1";
import Editor from "../../forms/formeditors/formeditordata";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType
);

function ProductCreateEdit() {
  const { isCreate, id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [files1, setFiles1] = useState<any>([]);

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
  console.log(typeof isCreate, id);

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
        initialValues={{
          bin_pallet: 0,
          code: "" ?? "",
          code_bin: "",
          brand_code: "",
          brand_name: "",
          category_code: "",
          category_name: "",
          certificate_of_origin: "",
          description: "",
          detail_url: "",
          ingredient: "",
          ingredient_id: "",
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
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        //validationSchema={schema.nullable()}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
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
                        onClick={() => {}}
                      >
                        Thêm mới
                      </button>
                    ) : (
                      <button
                        className="btn btn-purple-light"
                        type="submit"
                        onClick={() => {
                          setIsEdit(!isEdit);
                        }}
                      >
                        {isEdit ? "Chỉnh sửa" : "Lưu"}
                      </button>
                    )}
                  </OverlayTrigger>
                </div>
              </Card.Header>
              <Card.Body>
                <Row className="d-flex mb-2">
                  <Col xl={6}>
                    <Form.Group controlId="code_validate">
                      <Form.Label> Hình ảnh sản phẩm</Form.Label>
                      <FilePond
                        files={files1}
                        onupdatefiles={setFiles1}
                        allowMultiple={true}
                        maxFiles={3}
                        server="/api"
                        name="files" /* sets the file input name, it's filepond by default */
                        labelIdle="Drag & Drop your file here or click "
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.code}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xl={6}>
                    <Stack className="d-flex gap-2">
                      <Form.Group controlId="code_validate">
                        <Form.Label>Mã sản phẩm</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="code_validate"
                          placeholder="Mã sản phẩm"
                          name="name"
                          value={values.code}
                          onChange={handleChange}
                          isInvalid={touched.code && !!errors.code}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.code}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="product_name_detail_validate">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="product_name_detail_validate"
                          placeholder="Tên sản phẩm"
                          name="product_name_detail"
                          value={values.product_name_detail}
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
                      <Form.Group controlId="brand_code_validate">
                        <Form.Label>Mã thương hiệu</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="brand_code_validate"
                          placeholder="Tên sản phẩm"
                          name="brand_code"
                          value={values.brand_code}
                          onChange={handleChange}
                          isInvalid={touched.brand_code && !!errors.brand_code}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.brand_code}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="brand_name_validate">
                        <Form.Label>Tên thương hiệu</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="brand_name_validate"
                          placeholder="Tên thương hiệu"
                          name="brand_name"
                          value={values.brand_name}
                          onChange={handleChange}
                          isInvalid={touched.brand_name && !!errors.brand_name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.brand_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="category_code_validate">
                        <Form.Label>Mã nhóm sản phẩm</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="category_code"
                          placeholder="Mã nhóm sản phẩm"
                          name="category_code"
                          value={values.category_code}
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
                        <Form.Label>Tên nhóm sản phẩm</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          id="category_name"
                          placeholder="Tên nhóm sản phẩm"
                          name="category_code"
                          value={values.category_name}
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
                  <Form.Group as={Col} md={6} controlId="type_validate">
                    <Form.Label>Hình thức đóng gói</Form.Label>
                    <Form.Select
                      className="form-select"
                      id="type_validate"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      isInvalid={touched.type && !!errors.type}
                      required
                    >
                      {[
                        {
                          value: ProductTypeEnum.PACKET.toString(),
                          label: "Gói",
                        },
                        { value: ProductTypeEnum.BAG.toString(), label: "Túi" },
                        {
                          value: ProductTypeEnum.BOTTLE.toString(),
                          label: "Chai",
                        },
                        { value: ProductTypeEnum.BOX.toString(), label: "Hộp" },
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
                    <Form.Label>Mã thùng</Form.Label>
                    <Form.Select
                      className="form-select"
                      id="code_bin_validate"
                      name="code_bin"
                      value={values.code_bin}
                      onChange={handleChange}
                      isInvalid={touched.code_bin && !!errors.code_bin}
                      required
                    >
                      {[
                        {
                          value: ProductTypeEnum.PACKET.toString(),
                          label: "Gói",
                        },
                        { value: ProductTypeEnum.BAG.toString(), label: "Túi" },
                        {
                          value: ProductTypeEnum.BOTTLE.toString(),
                          label: "Chai",
                        },
                        { value: ProductTypeEnum.BOX.toString(), label: "Hộp" },
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
                    <Form.Label>Quy cách đóng gói</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      id="pack_configuration_validate"
                      name="pack_configuration"
                      value={values.pack_configuration}
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
                    <Form.Label>Trọng luọng</Form.Label>
                    <Form.Control
                      type="number"
                      id="net_weight_validate"
                      name="net_weight"
                      min={0}
                      value={values.net_weight}
                      onChange={handleChange}
                      isInvalid={touched.net_weight && !!errors.net_weight}
                      required
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.net_weight}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={4} controlId="unit_validate">
                    <Form.Label>Hình thức đóng gói</Form.Label>
                    <Form.Select
                      className="form-select"
                      id="unit_validate"
                      name="unit"
                      value={values.unit}
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
                <Form.Group as={Col} md={4} controlId="ingredient_id_validate">
                  <Form.Label>Mã nguyên liệu</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="ingredient_id_validate"
                    name="ingredient_id"
                    value={values.ingredient_id}
                    onChange={handleChange}
                    isInvalid={touched.ingredient_id && !!errors.ingredient_id}
                    placeholder="Mã nguyên liệu"
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.ingredient_id}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="ingredient_validate">
                  <Form.Label>Thành phần nguyên liệu</Form.Label>
                  <Editor placeholder="Thành phần nguyên liệu" />
                  <Form.Control.Feedback type="invalid">
                    {errors.ingredient}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Form.Group as={Col} md={6} controlId="short_info_validate">
                    <Form.Label>Mô tả sản phẩm (thu gọn)</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      id="short_info_validate"
                      name="short_info"
                      value={values.short_info}
                      onChange={handleChange}
                      isInvalid={touched.short_info && !!errors.short_info}
                      placeholder="Mô tả sản phẩm (thu gọn)"
                      rows={3} // You can adjust the number of rows as needed
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.short_info}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="description_validate">
                    <Form.Label>Mô tả sản phẩm (chi tiết)</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      id="description_validate"
                      name="description"
                      value={values.description}
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
                <Row>
                  <Form.Group as={Col} md={6} controlId="detail_url_validate">
                    <Form.Label>Link sản phẩm</Form.Label>
                    <Form.Control
                      required
                      type="link"
                      id="detail_url_validate"
                      name="detail_url"
                      value={values.detail_url}
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
                    md={4}
                    controlId="certificate_of_origin_validate"
                  >
                    <Form.Label>Xuất xứ</Form.Label>
                    <Form.Select
                      className="form-select"
                      id="certificate_of_origin_validate"
                      name="certificate_of_origin"
                      value={values.certificate_of_origin}
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
                  <Form.Label>Sản xuất</Form.Label>
                  <Form.Check label="Đóng gói" />
                  <Form.Check defaultChecked label="In trên bao bì" />
                </Form.Group>
                <Row>
                  <Form.Group as={Col} md={3} controlId="mop_validate">
                    <Form.Label>Số lượng sản xuất tối thiểu</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      id="mop_validate"
                      name="mop"
                      min={0}
                      value={values.mop}
                      onChange={handleChange}
                      isInvalid={touched.mop && !!errors.mop}
                      placeholder="Số lượng sản xuất tối thiểu"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mop}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={3} controlId="sku_bin_validate">
                    <Form.Label>Số sản phẩm / thùng</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      id="sku_bin_validate"
                      name="sku_bin"
                      min={0}
                      value={values.sku_bin}
                      onChange={handleChange}
                      isInvalid={touched.sku_bin && !!errors.sku_bin}
                      placeholder="Số sản phẩm / thùng"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mop}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={3} controlId="sku_box_validate">
                    <Form.Label>Số sản phẩm / hộp</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      id="sku_box_validate"
                      name="sku_box"
                      min={0}
                      value={values.sku_box}
                      onChange={handleChange}
                      isInvalid={touched.sku_box && !!errors.sku_box}
                      placeholder="Số sản phẩm / hộp"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.sku_box}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={3} controlId="bin_pallet_validate">
                    <Form.Label>Số thùng / lô</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      id="bin_pallet_validate"
                      name="bin_pallet"
                      min={0}
                      value={values.bin_pallet}
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
                  <Form.Label>Thiết bị in bao bì</Form.Label>
                  <Form.Select
                    className="form-select"
                    id="device_code_validate"
                    name="device_code"
                    value={values.device_code}
                    onChange={handleChange}
                    isInvalid={touched.device_code && !!errors.device_code}
                    required
                  >
                    {COUNTRIES.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.device_code}
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

export default ProductCreateEdit;
