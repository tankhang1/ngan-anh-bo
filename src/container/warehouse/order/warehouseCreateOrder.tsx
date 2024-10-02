import { Formik } from "formik";
import React, { Fragment, useContext, useMemo, useState } from "react";
import { ProductTypeEnum, TManufactorOrder } from "../../../assets/types";
import { Card, Col, Form, InputGroup, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppWarning from "../../../components/AppWarning";
import AppSelect from "../../../components/AppSelect";
import { useGetListProductsQuery } from "../../../redux/api/info/info.api";
import { useGetListIngredientPackingQuery } from "../../../redux/api/warehouse/warehouse.api";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import {
  useCreateProcedureOrderMutation,
  useGetListDevicesQuery,
} from "../../../redux/api/product/product.api";
import { ToastContext } from "../../../components/AppToast";

const WarehouseCreateManufactorOrder = () => {
  const toast = useContext(ToastContext);
  const { data: products } = useGetListProductsQuery();
  const { data: ingredientPackings } = useGetListIngredientPackingQuery();
  const { data: devices } = useGetListDevicesQuery();
  const [typeExport, setTypeExport] = useState<"BIN" | "PACKET">("BIN");
  const [createProcedureOrder, { isLoading: isLoadingCreate }] =
    useCreateProcedureOrderMutation();
  const filterProduct = useMemo(() => {
    if (typeExport === "BIN")
      return products?.filter(
        (product) => product?.type === ProductTypeEnum.BIN
      );
    else
      return products?.filter(
        (product) => product?.type === ProductTypeEnum.PACKET
      );
  }, [typeExport, products]);

  const onCreateManufactorOrder = async (values: TManufactorOrder) => {
    await createProcedureOrder({
      ...values,
      expect_packing_date: values.expect_packing_date
        ? +format(new Date(values.expect_packing_date), "yyyyMMdd")
        : 0,
      total_extra: values?.total_extra ?? 0,
    })
      .unwrap()
      .then((value) => {
        console.log("log", value);
        if (value.status === 0) toast.showToast("Tạo lệnh sản xuất thành công");
        else toast.showToast("Tạo lệnh sản xuất thất bại");
      })
      .catch(() => toast.showToast("Tạo lệnh sản xuất thất bại"));
  };
  const navigate = useNavigate();
  return (
    <Fragment>
      <Formik
        initialValues={{
          device_code: null,
          expect_packing_date: null,
          product_code: null,
          shipment_code: null,
          total_bin: null,
          total_extra: null,
          ingredient_id: null,
          min_bin: null,
        }}
        onSubmit={onCreateManufactorOrder}
        enableReinitialize
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          resetForm,
          values,
          touched,
          errors,
        }) => (
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <Card.Title>Thông tin lệnh xuất kho</Card.Title>
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
                    <span>Tạo lệnh</span>
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
                <Stack gap={2}>
                  <div>
                    <Form.Label className="text-black">
                      Loại lệnh xuất kho <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => {
                          if (typeExport !== "BIN") {
                            setTypeExport("BIN");
                            resetForm();
                          }
                        }}
                        className={`btn ${
                          typeExport === "BIN"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                      >
                        Tạo lệnh xuất thùng
                      </button>
                      <button
                        onClick={() => {
                          if (typeExport !== "PACKET") {
                            setTypeExport("PACKET");
                            resetForm();
                          }
                        }}
                        className={`btn ${
                          typeExport === "PACKET"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                      >
                        Tạo lệnh xuất gói
                      </button>
                    </div>
                  </div>
                  <Form.Group>
                    <Form.Label className="text-black">
                      Chọn sản phẩm <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <AppSelect
                      onChange={(value) => {
                        const [ingredient_id, code, bin_pallet] =
                          value.split("-");
                        setFieldValue("product_code", code);
                        setFieldValue("ingredient_id", ingredient_id);
                        setFieldValue("min_bin", bin_pallet);
                        setFieldValue("total_bin", bin_pallet);
                        setFieldValue("shipment_code", "");
                      }}
                      data={
                        filterProduct?.map((item) => ({
                          label: item.description ?? "",
                          value: `${item.ingredient_id}-${item.code}-${item.bin_pallet}`,
                        })) ?? []
                      }
                      value={`${values?.ingredient_id}-${values.product_code}-${values.min_bin}`}
                      placeholder="Chọn sản phẩm"
                      isInValid={!!errors.product_code && touched.product_code}
                      errorText={errors.product_code}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text-black">
                      Lô nguyên liệu <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <AppSelect
                      onChange={(value) => {
                        setFieldValue("shipment_code", value);
                      }}
                      data={
                        ingredientPackings
                          ?.filter(
                            (ingredientPacking) =>
                              ingredientPacking.ingredient_code ===
                              values.ingredient_id
                          )
                          .map((item) => ({
                            label: `${item.ingredient_name} - ${item.shipment_code}`,
                            value: item.shipment_code ?? "",
                          })) ?? []
                      }
                      value={values?.shipment_code ?? ""}
                      placeholder="Chọn lô nguyên liệu"
                      isInValid={
                        !!errors.shipment_code && touched.shipment_code
                      }
                      errorText={errors.shipment_code}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="text-black">
                      Nhập số lượng sản xuất{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      min={values?.min_bin ?? 50}
                      placeholder="Nhập số lượng sản xuất"
                      name="total_bin"
                      className="input-placeholder"
                      value={values.total_bin ?? 0}
                      onChange={handleChange}
                      isInvalid={touched.total_bin && !!errors.total_bin}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.total_bin}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {typeExport === "PACKET" && (
                    <Form.Group className="mb-2">
                      <Form.Label className="text-black">
                        Nhập số gói khấu hao dự kiến{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        min={0}
                        placeholder="Số lượng khấu hao dự kiến"
                        name="total_extra"
                        className="input-placeholder"
                        onChange={handleChange}
                        isInvalid={touched.total_extra && !!errors.total_extra}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.total_extra}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
                  <Form.Group>
                    <Form.Label className="text-black">
                      Chọn thiết bị <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <AppSelect
                      onChange={(value) => {
                        setFieldValue("device_code", value);
                      }}
                      data={
                        devices?.map((item) => ({
                          label: item.label,
                          value: item.value ?? "",
                        })) ?? []
                      }
                      value={values?.device_code ?? ""}
                      placeholder="Chọn thiết bị"
                      isInValid={!!errors.device_code && touched.device_code}
                      errorText={errors.device_code}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="text-black">
                      Ngày thực thi dự kiến{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>

                    <DatePicker
                      name="expect_packing_date"
                      onChange={(date) => {
                        if (date)
                          setFieldValue(
                            "expect_packing_date",
                            format(date, "yyyy-MM-dd")
                          );
                      }}
                      value={
                        values?.expect_packing_date
                          ? format(
                              new Date(values.expect_packing_date),
                              "dd-MM-yyyy"
                            )
                          : ""
                      }
                      placeholderText="Chọn ngày khấu hao dự kiến (DD/MM/YYYY)"
                      isClearable
                      minDate={new Date()}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.expect_packing_date}
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

export default WarehouseCreateManufactorOrder;
