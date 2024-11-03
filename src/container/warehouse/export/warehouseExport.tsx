import React, { Fragment, useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { Formik } from "formik";
import {
  useGetExportByDocumentCounterQuery,
  useGetExportByDocumentQuery,
  useGetExportDocumentsQuery,
} from "../../../redux/api/warehouse/warehouse.api";
import { BaseQuery } from "../../../assets/types";
import { exportExcelFileWithHeader } from "../../../hooks";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useExportWarehouseExportDetailMutation } from "../../../redux/api/excel/excel.api";
import { ToastContext } from "../../../components/AppToast";
type TSearchItem = {
  label: string;
  value: string;
};
const TypeBinExport: TSearchItem[] = [
  {
    label: "Hàng hóa",
    value: "SALE",
  },
  {
    label: "Khuyến mãi",
    value: "MARKETING",
  },
  {
    label: "Hàng mượn",
    value: "BORROW",
  },
  {
    label: "Hàng quảng bá",
    value: "PROMOTION",
  },
];
type TExportForm = {
  document_code: string;
  type: string;
  start_date: string;
  end_date: string;
};
const WarehouseExport = () => {
  const toast = useContext(ToastContext);
  const { permission, username } = useSelector(
    (state: RootState) => state.auth
  );
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState<BaseQuery>();
  const [documentDetail, setDocumentDetail] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [exportExcel] = useExportWarehouseExportDetailMutation();
  const {
    data: exports,
    isLoading: isLoadingExport,
    refetch: refetchExport,
  } = useGetExportDocumentsQuery(
    {
      st: query?.st,
      ed: query?.ed,
      type: query?.type ?? "undefined",
      nu: page - 1,
      sz: 10,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !query ? true : false,
    }
  );

  const { data: counterExports } = useGetExportByDocumentCounterQuery(
    {
      st: query?.st,
      ed: query?.ed,
      type: query?.type ?? "undefined",
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !query ? true : false,
    }
  );
  const { data: exportDetail, isLoading: loadingExportDetail } =
    useGetExportByDocumentQuery(
      {
        code: documentDetail!,
      },
      {
        skip: documentDetail ? false : true,
      }
    );
  const onSearch = (values: TExportForm) => {
    if (values.document_code !== search) setSearch(values.document_code);

    if (
      query?.st === +(format(values.start_date, "yyyyMMdd") + "0000") &&
      query?.ed === +(format(values.end_date, "yyyyMMdd") + "2359") &&
      query?.type === values?.type
    )
      return;
    setTimeout(() => {
      setQuery({
        st: +(format(values.start_date, "yyyyMMdd") + "0000"),
        ed: +(format(values.end_date, "yyyyMMdd") + "2359"),
        type: values?.type,
      });
      refetchExport();
    }, 200);
  };
  const handleExportExcel = async () => {
    console.log("log");
    if (exports)
      await exportExcel({
        st: query?.st,
        ed: query?.ed,
        t: query?.type ?? "ALL",
        u: username,
      })
        .unwrap()
        .then(() => {
          toast.showToast(
            "Xuất dữ liệu thành công, vui lòng kiểm tra mục danh sách yêu cầu"
          );
        });
  };

  const handleManualExportExcel = () => {
    exportExcelFileWithHeader(exportDetail || [], [
      {
        label: "Mã phiếu",
        key: "document_code",
      },
      {
        label: "Mã chi tiết phiếu",
        key: "document_code_detail",
      },
      {
        label: "Mã đơn hàng",
        key: "code",
      },
      {
        label: "Mã hash đơn hàng",
        key: "code_hash",
      },
      {
        label: "Số seri",
        key: "seri",
      },
      {
        label: "Mã đại lý",
        key: "agent_code",
      },
      {
        label: "Tên đại lý",
        key: "agent_name",
      },
      {
        label: "Mã lô",
        key: "batch_number",
      },
      {
        label: "Thiết bị",
        key: "device",
      },
      {
        label: "Mã sản phẩm",
        key: "sku",
      },
      {
        label: "Mã sản phẩm (sub) ",
        key: "sku_sub",
      },
      {
        label: "ID đơn hàng",
        key: "procedure_order_detail_item",
      },
      {
        label: "Thời gian",
        key: "time",
      },
      {
        label: "Mã thời gian",
        key: "time_number",
      },
      {
        label: "Loại hàng hóa",
        key: "goods_type",
      },
      {
        label: "Địa chỉ",
        key: "address",
      },
      {
        label: "Mã nhân nhập kho",
        key: "staff_import_code",
      },
      {
        label: "Tên nhân nhập kho",
        key: "staff_import_name",
      },
      {
        label: "Mã nhân viên xuất kho",
        key: "staff_export_code",
      },
      {
        label: "Tên nhân viên xuất kho",
        key: "staff_export_name",
      },
      {
        label: "Người nhận",
        key: "receiver",
      },
      {
        label: "Mã kho",
        key: "work_center_export_code",
      },
    ]);
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
                        {permission.warehouseExportFileExport ? (
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip className="tooltip">
                                Xuất dữ liệu chi tiết
                              </Tooltip>
                            }
                          >
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
                          </OverlayTrigger>
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
                              <option value={""}>Tất cả</option>
                              {TypeBinExport.map((item, index) => (
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
            title="Thông tin xuất kho"
            isLoading={isLoadingExport}
            maxPage={counterExports}
            setExternalPage={setPage}
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
                key: "goods_type",
                label: "Loại hàng xuất",
                render: ({ goods_type }) => <td>{goods_type}</td>,
              },
              {
                key: "staff_export_code",
                label: "Mã nhân viên xuất kho",
                render: ({ staff_export_code }) => <td>{staff_export_code}</td>,
              },
              {
                key: "staff_export_name",
                label: "Tên nhân viên xuất kho",
                render: ({ staff_export_name }) => <td>{staff_export_name}</td>,
              },
              {
                key: "receiver",
                label: "Tên người nhận",
                render: ({ receiver }) => <td>{receiver}</td>,
              },
              {
                key: "time",
                label: "Thời gian xuất kho",
                render: ({ time_export }) => (
                  <td>
                    {time_export
                      ? format(new Date(time_export), "dd/MM/yyyy HH:mm:ss")
                      : ""}
                  </td>
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
                        setDocumentDetail(value.document_code);
                      }}
                    >
                      <i className="ti ti-edit"></i>
                    </button>
                  </td>
                ),
              },
            ]}
            data={exports || []}
            externalSearch={search}
            searchByExternal="document_code"
          />
        </Card>
      </Col>
      <Modal
        show={documentDetail ? true : false}
        onHide={() => setDocumentDetail(undefined)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Danh sách thùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-end mr-2 ">
            <Button
              variant=""
              aria-label="button"
              type="button"
              className="btn btn-success-light ms-2"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-title="Add Contact"
              onClick={handleManualExportExcel}
            >
              Xuất Excel
            </Button>
          </div>
          <AppTable
            isHeader={false}
            title="Thông tin xuất kho"
            isLoading={loadingExportDetail}
            maxPage={exportDetail?.length}
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
                key: "batch_number",
                label: "Mã lô",
                render: ({ batch_number }) => <td>{batch_number}</td>,
              },
              {
                key: "seri",
                label: "Mã thùng",
                render: ({ seri }) => <td>{seri}</td>,
              },
              {
                key: "sku",
                label: "Mã sản phẩm",
                render: ({ sku }) => <td>{sku}</td>,
              },
              {
                key: "staff_export_code",
                label: "Mã nhân viên xuất kho",
                render: ({ staff_export_code }) => <td>{staff_export_code}</td>,
              },
              {
                key: "staff_export_name",
                label: "Tên nhân viên xuất kho",
                render: ({ staff_export_name }) => <td>{staff_export_name}</td>,
              },
              {
                key: "receiver",
                label: "Người nhận",
                render: ({ receiver }) => <td>{receiver}</td>,
              },
              {
                key: "work_center_export_code",
                label: "Mã kho",
                render: ({ work_center_export_code }) => (
                  <td>{work_center_export_code}</td>
                ),
              },
              {
                key: "time",
                label: "Thời gian xuất kho",
                render: ({ time }) => <td>{time}</td>,
              },
            ]}
            data={exportDetail || []}
            searchByExternal="document_code"
            externalSearch=""
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default WarehouseExport;
