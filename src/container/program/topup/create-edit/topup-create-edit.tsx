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
import { TAgent, TAgentForm, TObjectiveEnum } from "../../../../assets/types";
import { COUNTRIES, ProductTypeEnum, PROVINCES } from "../../../../constants";
import { useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import Editor from "../../../forms/formeditors/formeditordata";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType
);

function TopupCreateEdit() {
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
          name: "",
          products: [],
          agents: [],
          price: 0,
          objectives: [],
          time_end: "",
          time_start: "",
          locations: [],
          status: "0",
          uuid: "",
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
                <Stack className="d-flex gap-1">
                  <Form.Group controlId="uuid_validate">
                    <Form.Label>Mã chương trình</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      id="uuid_validate"
                      placeholder="Mã chương trình"
                      name="uuid"
                      value={values.uuid}
                      onChange={handleChange}
                      isInvalid={touched.uuid && !!errors.uuid}
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.uuid}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="name_validate">
                    <Form.Label>Tên chương trình</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      id="name_validate"
                      placeholder="Tên chương trình"
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
                  <Form.Group controlId="time_start_validate">
                    <Form.Label>Tên chương trình</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      id="time_start_validate"
                      placeholder="Ngày bắt đầu"
                      name="time_start"
                      value={values.time_start}
                      onChange={handleChange}
                      isInvalid={touched.time_start && !!errors.time_start}
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.time_start}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Row>
                    <Form.Group
                      controlId="time_start_validate"
                      className="mb-2"
                      as={Col}
                      md={6}
                    >
                      <Form.Label>Ngày bắt đầu</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        id="time_start_validate"
                        placeholder="Ngày đăng kí"
                        name="time_start"
                        value={values.time_start}
                        onChange={handleChange}
                        isInvalid={touched.time_start && !!errors.time_start}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.time_start}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      controlId="time_end_validate"
                      className="mb-2"
                      as={Col}
                      md={6}
                    >
                      <Form.Label>Ngày bắt đầu</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        id="time_end_validate"
                        placeholder="Ngày kết thúc"
                        name="time_end"
                        value={values.time_end}
                        onChange={handleChange}
                        isInvalid={touched.time_end && !!errors.time_end}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.time_end}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Form.Group controlId="customer_province_validate">
                    <Form.Label>Chọn sản phẩm</Form.Label>
                    <Form.Select
                      className="form-select"
                      name="products"
                      value={values.products}
                      onChange={handleChange}
                      isInvalid={touched.products && !!errors.products}
                      required
                    >
                      {PROVINCES.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.products}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="locations_validate">
                    <Form.Label>Chọn tỉnh thành</Form.Label>
                    <Form.Select
                      className="form-select"
                      name="locations"
                      value={values.locations}
                      onChange={handleChange}
                      isInvalid={touched.locations && !!errors.locations}
                      required
                    >
                      {PROVINCES.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.locations}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="objectives_validate">
                    <Form.Label>Chọn đối tượng tham gia</Form.Label>
                    <Form.Select
                      className="form-select"
                      name="objectives"
                      value={values.objectives}
                      onChange={handleChange}
                      isInvalid={touched.objectives && !!errors.objectives}
                      required
                    >
                      <option>{TObjectiveEnum.FARMER}</option>
                      <option>{TObjectiveEnum.RETAILER}</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.objectives}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="agents_validate">
                    <Form.Label>Chọn đại lí cấp 1</Form.Label>
                    <Form.Select
                      className="form-select"
                      name="agents"
                      value={values.agents}
                      onChange={handleChange}
                      isInvalid={touched.agents && !!errors.agents}
                      required
                    >
                      <option>{TObjectiveEnum.FARMER}</option>
                      <option>{TObjectiveEnum.RETAILER}</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.agents}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="point_validate">
                    <Form.Label>Nhập số điểm</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      min={0}
                      placeholder="Nhập số điểm"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      isInvalid={touched.price && !!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="status_validate">
                    <Form.Label>Trạng thái</Form.Label>
                    <Form.Select
                      className="form-select"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      isInvalid={touched.status && !!errors.status}
                      required
                    >
                      <option>{TObjectiveEnum.FARMER}</option>
                      <option>{TObjectiveEnum.RETAILER}</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
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

export default TopupCreateEdit;
