import React, { Fragment, useDeferredValue, useEffect, useState } from "react";
import { Button, Card, Col, Form, Stack } from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { Formik } from "formik";
import {
  useGetExportDetailCounterQuery,
  useGetExportDetailQuery,
  useGetImportDetailCounterQuery,
  useGetImportDetailQuery,
  useGetImportDocumentsQuery,
} from "../../../redux/api/warehouse/warehouse.api";
import { BaseQuery, TWarehouseExport } from "../../../assets/types";
import { exportExcelFile, fDate } from "../../../hooks";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
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
const WarehouseImport = () => {
  const { permission } = useSelector((state: RootState) => state.auth);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState<BaseQuery>();

  const {
    data: imports,
    isLoading: loadingImport,
    refetch: refetchImport,
  } = useGetImportDocumentsQuery(
    {
      st: query?.st,
      ed: query?.ed,
      type: query?.type,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !query ? true : false,
    }
  );

  const onSearch = (values: TImportForm) => {
    setSearch(values.document_code);
    if (
      query?.st === +(format(values.start_date, "yyyyMMdd") + "0000") &&
      query?.ed === +(format(values.end_date, "yyyyMMdd") + "2359") &&
      query?.type === values?.type
    )
      return;
    setQuery({
      st: +(format(values.start_date, "yyyyMMdd") + "0000"),
      ed: +(format(values.end_date, "yyyyMMdd") + "2359"),
      type: values?.type,
    });

    refetchImport();
  };
  const handleExportExcel = () => {
    if (imports) exportExcelFile(imports, "Thông tin nhập kho");
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
                              Mã xuất kho:{" "}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="bg-light"
                              placeholder="Tìm kiếm thông tin"
                              aria-describedby="search-contact-member"
                              name="document_code"
                              defaultValue={values.document_code}
                              onChange={handleChange}
                              isValid={
                                touched.document_code && !!errors.document_code
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.document_code}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="d-flex gap-3 align-items-center">
                            <Form.Label
                              className="text-nowrap text-black"
                              style={{ width: 100 }}
                            >
                              Loại xuất kho:{" "}
                            </Form.Label>
                            <Form.Select
                              className="form-select"
                              name="type"
                              defaultValue={values.type}
                              onChange={(e) =>
                                setFieldValue("type", e.target.value)
                              }
                              isInvalid={touched.type && !!errors.type}
                            >
                              <option value={""}>
                                -- Chọn loại nhập kho --
                              </option>
                              {TypeBinImport.map((item, index) => (
                                <option value={item.value} key={index}>
                                  {item.label}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.type}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Stack>
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
            isLoading={loadingImport}
            maxPage={imports?.length}
            headers={[
              {
                key: "document_code",
                label: "Mã phiếu",
                render: ({ document_code }) => <td>{document_code}</td>,
              },
              {
                key: "agent_code",
                label: "Mã đại lý",
                render: ({ agent_code }) => <td>{agent_code}</td>,
              },
              {
                key: "agent_name",
                label: "Tên đại lý",
                render: ({ agent_name }) => <td>{agent_name}</td>,
              },
              {
                key: "staff_import_code",
                label: "Mã nhân viên nhập kho",
                render: ({ staff_import_code }) => <td>{staff_import_code}</td>,
              },
              {
                key: "staff_import_name",
                label: "Tên nhân viên nhập kho",
                render: ({ staff_import_name }) => <td>{staff_import_name}</td>,
              },
              {
                key: "shipper",
                label: "Người giao hàng",
                render: ({ shipper }) => <td>{shipper}</td>,
              },
              {
                key: "time_import",
                label: "Thời gian nhập kho",
                render: ({ time_import }) => <td>{time_import}</td>,
              },
            ]}
            data={imports || []}
            externalSearch={search}
            searchByExternal="document_code"
          />
        </Card>
      </Col>
    </Fragment>
  );
};

export default WarehouseImport;
