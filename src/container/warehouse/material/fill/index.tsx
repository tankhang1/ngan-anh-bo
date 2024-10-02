import React, { Fragment, useContext } from "react";
import { Card, Col, Form, Row, Stack } from "react-bootstrap";
import AppWarning from "../../../../components/AppWarning";
import {
  useGetListIngredientsQuery,
  useImportIngredientPackingMutation,
} from "../../../../redux/api/product/product.api";
import { useNavigate } from "react-router-dom";
import * as formik from "formik";
import { TIngredientPacking } from "../../../../assets/types";
import { COUNTRIES } from "../../../../constants";
import { ToastContext } from "../../../../components/AppToast";
import { format } from "date-fns";
import fillIngredientSchema from "../../../../schema/fillIngredientPacking.schema";

const FillMaterialWarehouse = () => {
  const [importIngredientPacking, { isLoading: isLoadingCreate }] =
    useImportIngredientPackingMutation();
  const navigate = useNavigate();
  const toast = useContext(ToastContext);
  const { Formik } = formik;

  const { data: listIngredient } = useGetListIngredientsQuery();
  const onHandleCreateIngredient = async (
    values: Omit<TIngredientPacking, "id" | "ingredient_name">
  ) => {
    await importIngredientPacking({
      ...values,
      import_date: +format(new Date(values.import_date), "yyyyMMdd"),
      manufacture_date: +format(
        new Date(values.manufacture_date),
        "yyyyMMdd"
      ) as any,
      expiration_date: +format(
        new Date(values.expiration_date),
        "yyyyMMdd"
      ) as any,
    })
      .unwrap()
      .then((result) => {
        if (result.status === 0) {
          toast.showToast("Tạo nguyên vật liệu thành công");
        } else toast.showToast("Thêm mới nguyên vật liệu thất bại");
      });
  };
  return (
    <Fragment>
      <Formik
        initialValues={{
          shipment_code: "",
          ingredient_code: "",
          packing: "",
          weight: 0,
          unit: "",
          manufacture_date: 0,
          expiration_date: 0,
          expiry: 0,
          orgin: "",
          import_date: 0, // yyyy/mm/dd
          note: "",
        }}
        onSubmit={onHandleCreateIngredient}
        enableReinitialize
        validationSchema={fillIngredientSchema}
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
              <Card.Title>Thông tin nguyên vật liệu</Card.Title>
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
              </div>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-md-row flex-column gap-3">
                <Stack gap={2} as={Col} md={6}>
                  <Row>
                    <Form.Group as={Col} md={6}>
                      <Form.Label className="text-black">
                        Mã vận đơn <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Mã vận đơn (VD: PO105244052061 )"
                        name="shipment_code"
                        defaultValue={values.shipment_code as string}
                        onChange={handleChange}
                        isInvalid={
                          touched.shipment_code && !!errors.shipment_code
                        }
                        className="input-placeholder"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.shipment_code}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                      <Form.Label className="text-black">
                        Ngày nhập kho
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="date"
                        name="import_date"
                        onKeyDown={(e) => e.preventDefault()}
                        defaultValue={values.import_date}
                        onChange={handleChange}
                        isInvalid={touched.import_date && !!errors.import_date}
                        placeholder="Ngày nhập kho"
                        className="input-placeholder"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.import_date}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Form.Group>
                    <Form.Label className="text-black">
                      Mã vật tư <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Select
                      className="form-select input-placeholder"
                      name="ingredient_code"
                      defaultValue={values.ingredient_code}
                      onChange={(e) =>
                        setFieldValue("ingredient_code", e.target.value)
                      }
                      isInvalid={
                        touched.ingredient_code && !!errors.ingredient_code
                      }
                      required
                    >
                      <option value={""}>Chọn mã vật tư</option>
                      {listIngredient?.map((ingredient) => (
                        <option value={ingredient.value} key={ingredient.value}>
                          {ingredient.label} ({ingredient.value})
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.ingredient_code}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text-black">
                      Quy cách đóng gói
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="packing"
                      defaultValue={values.packing}
                      onChange={handleChange}
                      isInvalid={touched.packing && !!errors.packing}
                      placeholder="Quy cách đóng gói ( VD: Thùng 25 lt )"
                      className="input-placeholder"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.packing}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text-black">
                      Đơn vị tính
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Select
                      className="form-select input-placeholder"
                      id="unit_validate"
                      name="unit"
                      defaultValue={values.unit}
                      onChange={handleChange}
                      isInvalid={touched.unit && !!errors.unit}
                      required
                    >
                      {[
                        { value: "", label: "Chọn đơn vị tính" },
                        { value: "Kg", label: "Kilogram" },
                        { value: "Lt", label: "Lit" },
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

                  <Form.Group>
                    <Form.Label className="text-black">
                      Khối lượng (kg/lt)
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="weight"
                      min={0}
                      defaultValue={values.weight}
                      onChange={handleChange}
                      isInvalid={touched.weight && !!errors.weight}
                      placeholder="Khối lượng"
                      className="input-placeholder"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.weight}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row>
                    <Form.Group as={Col} md={4}>
                      <Form.Label className="text-black">
                        Ngày sản xuất
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="date"
                        name="manufacture_date"
                        defaultValue={values.manufacture_date}
                        onChange={handleChange}
                        isInvalid={
                          touched.manufacture_date && !!errors.manufacture_date
                        }
                        placeholder="Ngày sản xuất"
                        className="input-placeholder"
                        onKeyDown={(e) => e.preventDefault()}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.manufacture_date}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4}>
                      <Form.Label className="text-black">
                        Ngày hết hạn
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="date"
                        onKeyDown={(e) => e.preventDefault()}
                        name="expiration_date"
                        defaultValue={values.expiration_date}
                        onChange={handleChange}
                        isInvalid={
                          touched.expiration_date && !!errors.expiration_date
                        }
                        placeholder="Ngày hết hạn"
                        className="input-placeholder"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.expiration_date}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={4}>
                      <Form.Label className="text-black">
                        Thời hạn sử dụng (tháng){" "}
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="expiry"
                        min={0}
                        defaultValue={values.expiry}
                        onChange={handleChange}
                        isInvalid={touched.expiry && !!errors.expiry}
                        placeholder="Thời hạn sử dụng"
                        className="input-placeholder"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.expiry}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Form.Group>
                    <Form.Label className="text-black">
                      Chọn xuất xứ <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Select
                      className="form-select input-placeholder"
                      name="orgin"
                      defaultValue={values.orgin}
                      onChange={(e) => setFieldValue("orgin", e.target.value)}
                      isInvalid={touched.orgin && !!errors.orgin}
                      required
                    >
                      <option value={""}>Chọn xuất xứ</option>
                      <option value={"NONE"}>Không rõ xuất xứ</option>
                      {COUNTRIES.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.orgin}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text-black">Ghi chú</Form.Label>
                    <Form.Control
                      required
                      name="note"
                      defaultValue={values.note}
                      onChange={handleChange}
                      isInvalid={touched.note && !!errors.note}
                      placeholder="Ghi chú"
                      className="input-placeholder"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.note}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Stack>
              </div>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
};

export default FillMaterialWarehouse;
