import React, { Fragment, useDeferredValue, useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Stack } from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { Formik } from "formik";
import {
  useGetProcedureOrderByTimeQuery,
  useGetProcedureOrderCounterByTimeQuery,
  useGetProcedureOrderDetailByTimeQuery,
} from "../../../redux/api/warehouse/warehouse.api";
import { BaseQuery } from "../../../assets/types";
import { fDate } from "../../../hooks";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useExportWarehouseImportDetailMutation } from "../../../redux/api/excel/excel.api";
type TSearchItem = {
  label: string;
  value: string;
};
const TypeBinImport: TSearchItem[] = [
  {
    label: "Trả hàng",
    value: "RETURN",
  },
  {
    label: "Chuyển kho",
    value: "WAREHOUSE",
  },
];
type TImportForm = {
  document_code: string;
  type: string;
  start_date: string;
  end_date: string;
};
const WarehouseListOrder = () => {
  const { permission } = useSelector((state: RootState) => state.auth);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState<BaseQuery>();
  const [page, setPage] = useState(1);
  const [documentDetail, setDocumentDetail] = useState("");
  const [exportExcel] = useExportWarehouseImportDetailMutation();
  const {
    data: procedureOrders,
    isLoading: loadingProcedureOrder,
    refetch: refetchImport,
  } = useGetProcedureOrderByTimeQuery(
    {
      st: query?.st,
      ed: query?.ed,
      nu: page - 1,
      sz: 10,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !query ? true : false,
    }
  );
  const { data: counterProcedureOrder } =
    useGetProcedureOrderCounterByTimeQuery(
      {
        st: query?.st,
        ed: query?.ed,
      },
      {
        refetchOnMountOrArgChange: true,
        skip: !query ? true : false,
      }
    );
  const { data: orderDetails, isLoading: loadingOrderDetail } =
    useGetProcedureOrderDetailByTimeQuery(
      {
        c: documentDetail!,
      },
      {
        skip: documentDetail ? false : true,
      }
    );
  const onSearch = (values: TImportForm) => {
    if (search !== values.document_code) setSearch(values.document_code);
    if (
      query?.st === +format(values.start_date, "yyyyMMdd") &&
      query?.ed === +format(values.end_date, "yyyyMMdd") &&
      query?.type === values?.type
    )
      return;
    setTimeout(() => {
      setQuery({
        st: +format(values.start_date, "yyyyMMdd"),
        ed: +format(values.end_date, "yyyyMMdd"),
        type: values?.type,
      });

      refetchImport();
    }, 200);
  };
  console.log(procedureOrders);
  const handleExportExcel = async () => {
    if (procedureOrders)
      await exportExcel({
        st: query?.st,
        ed: query?.ed,
        t: query?.type ?? "ALL",
      })
        .unwrap()
        .then(async (url) => {
          if (url) window.open(url.data, "_blank");
        });
  };
  return (
    <Fragment>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body>
            <Formik
              initialValues={{
                document_code: "",
                type: "",
                start_date: "",
                end_date: "",
              }}
              onSubmit={onSearch}
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
                  <div className="contact-header">
                    <div className="d-flex flex-column gap-2 mb-1">
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="text-lg fw-semibold mb-0">
                          Lọc thông tin
                        </p>
                        {permission.warehouseExportFileImport ? (
                          <Button
                            variant=""
                            aria-label="button"
                            type="button"
                            className="btn btn-success-light ms-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Add Contact"
                            onClick={handleExportExcel}
                          >
                            Xuất Excel
                          </Button>
                        ) : null}
                      </div>

                      <div className="d-flex flex-column flex-md-row mt-sm-0 mt-2 gap-4 align-items-center justify-content-between">
                        <Stack gap={2}>
                          <Form.Group className="d-flex gap-3 align-items-center">
                            <Form.Label
                              className="text-nowrap text-black"
                              style={{ width: 100 }}
                            >
                              Ngày bắt đầu:{" "}
                            </Form.Label>
                            <Form.Control
                              className="form-select"
                              type="date"
                              onKeyDown={(e) => e.preventDefault()}
                              name="start_date"
                              defaultValue={values.start_date}
                              onChange={handleChange}
                              isInvalid={
                                touched.start_date && !!errors.start_date
                              }
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">
                              {errors.start_date}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="d-flex gap-3 align-items-center">
                            <Form.Label
                              className="text-nowrap text-black"
                              style={{ width: 100 }}
                            >
                              Ngày kết thúc:{" "}
                            </Form.Label>
                            <Form.Control
                              className="form-select"
                              type="date"
                              onKeyDown={(e) => e.preventDefault()}
                              name="end_date"
                              defaultValue={values.end_date}
                              onChange={handleChange}
                              isInvalid={touched.end_date && !!errors.end_date}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">
                              {errors.end_date}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Stack>
                      </div>
                      <button
                        className="btn bg-primary text-white mx-auto px-5"
                        type="submit"
                      >
                        Tìm kiếm
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={12}>
        <Card className="custom-card">
          <AppTable
            isHeader={false}
            title="Thông tin nhập kho"
            isLoading={loadingProcedureOrder}
            maxPage={counterProcedureOrder}
            setExternalPage={setPage}
            headers={[
              {
                key: "code",
                label: "Lệnh xuất kho",
                render: ({ code }) => <td>{code}</td>,
              },
              {
                key: "product_name",
                label: "Tên lệnh sản phẩm",
                render: ({ product_name }) => <td>{product_name}</td>,
              },
              {
                key: "ingredient_name",
                label: "Tên nguyên liệu",
                render: ({ ingredient_name }) => <td>{ingredient_name}</td>,
              },
              {
                key: "work_center_code",
                label: "Mã nhà kho",
                render: ({ work_center_code }) => <td>{work_center_code}</td>,
              },
              {
                key: "container_number",
                label: "Số lượng thùng",
                render: ({ container_number }) => <td>{container_number}</td>,
              },
              {
                key: "bin_pallet",
                label: "Số thùng/lô",
                render: ({ bin_pallet }) => <td>{bin_pallet}</td>,
              },
              {
                key: "sku_bin",
                label: "Số sản phẩm/thùng",
                render: ({ sku_bin }) => <td>{sku_bin}</td>,
              },
              {
                key: "sku_box",
                label: "Số sản phẩm/hộp",
                render: ({ sku_box }) => <td>{sku_box}</td>,
              },
              {
                key: "manufacture_date",
                label: "Ngày sản xuất",
                render: ({ manufacture_date }) => (
                  <td>{fDate(manufacture_date)}</td>
                ),
              },
              {
                key: "expiration_date",
                label: "Ngày hết hạn",
                render: ({ expiration_date }) => (
                  <td>{fDate(expiration_date)}</td>
                ),
              },
              {
                key: "expect_packing_date",
                label: "Ngày đóng gói",
                render: ({ expect_packing_date }) => (
                  <td>{fDate(expect_packing_date)}</td>
                ),
              },

              {
                key: "",
                label: "Chức năng",
                render: (value) => (
                  <td>
                    <button
                      className="btn btn-icon btn-sm btn-primary-ghost"
                      onClick={() => {
                        setDocumentDetail(value.code);
                      }}
                    >
                      <i className="ti ti-edit"></i>
                    </button>
                  </td>
                ),
              },
            ]}
            data={procedureOrders || []}
          />
        </Card>
      </Col>
      <Modal
        show={documentDetail ? true : false}
        onHide={() => setDocumentDetail("")}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Danh sách thùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppTable
            isHeader={false}
            title="Thông tin nhập kho"
            isLoading={loadingOrderDetail}
            maxPage={orderDetails?.length}
            headers={[
              {
                key: "procedure_order_code",
                label: "Mã phiếu",
                render: ({ procedure_order_code }) => (
                  <td>{procedure_order_code}</td>
                ),
              },
              {
                key: "product_name",
                label: "Tên lệnh sản phẩm",
                render: ({ product_name }) => <td>{product_name}</td>,
              },

              {
                key: "batch_number",
                label: "Mã lô",
                render: ({ batch_number }) => <td>{batch_number}</td>,
              },
              {
                key: "sku_bin",
                label: "Số sản phẩm/thùng",
                render: ({ sku_bin }) => <td>{sku_bin}</td>,
              },
              {
                key: "sku_box",
                label: "Số sản phẩm/hộp",
                render: ({ sku_box }) => <td>{sku_box}</td>,
              },
              {
                key: "manufacture_date",
                label: "Ngày sản xuất",
                render: ({ manufacture_date }) => (
                  <td>{fDate(manufacture_date)}</td>
                ),
              },
              {
                key: "expiration_date",
                label: "Ngày hết hạn",
                render: ({ expiration_date }) => (
                  <td>{fDate(expiration_date)}</td>
                ),
              },
              {
                key: "expect_packing_date",
                label: "Ngày đóng gói",
                render: ({ expect_packing_date }) => (
                  <td>{fDate(expect_packing_date)}</td>
                ),
              },
            ]}
            data={orderDetails || []}
            searchByExternal="document_code"
            externalSearch=""
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default WarehouseListOrder;
