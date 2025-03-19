import React, { Fragment, useContext, useEffect, useState } from "react";
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
  useGetExportByDocumentQuery,
  useGetExportDetailCounterQuery,
  useGetExportDocumentsQuery,
} from "../../../redux/api/warehouse/warehouse.api";
import { BaseQuery } from "../../../assets/types";

import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useExportWarehouseExportDetailMutation } from "../../../redux/api/excel/excel.api";
import { ToastContext } from "../../../components/AppToast";
import AppConfirm from "../../../components/AppConfirm";
import { useLocation, useNavigate } from "react-router-dom";
import { useCheckTokenExpiredMutation } from "../../../redux/api/other/other.api";
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
    label: "Hàng quảng bá",
    value: "MARKETING",
  },
  {
    label: "Hàng mượn",
    value: "BORROW",
  },
  {
    label: "Hàng khuyến mãi",
    value: "PROMOTION",
  },
];
type TExportForm = {
  document_code: string;
  type: string;
};
const WarehouseReportExport = () => {
  const toast = useContext(ToastContext);
  const { permission, username, token } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const location = useLocation();

  const [documentDetail, setDocumentDetail] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState<BaseQuery>({
    st: +(format(new Date(), "yyyyMMdd") + "0000"),
    ed: +(format(new Date(), "yyyyMMdd") + "2399"),
    type: "",
  });
  const [exportExcel] = useExportWarehouseExportDetailMutation();
  const [checkToken] = useCheckTokenExpiredMutation();

  const { data: counterExports } = useGetExportDetailCounterQuery(
    {
      st: query?.st,
      ed: query?.ed,
      type: query?.type,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
      skip: !query ? true : false,
    }
  );
  const {
    data: exports,
    isLoading: isLoadingExport,
    refetch: refetchExport,
  } = useGetExportDocumentsQuery(
    {
      st: query?.st,
      ed: query?.ed,
      type: query?.type,
      nu: page - 1,
      sz: 10,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
      skip: !query ? true : false,
    }
  );

  const { data: exportDetails, isLoading: isLoadingExportDetail } =
    useGetExportByDocumentQuery(
      {
        code: documentDetail!,
      },
      {
        skip: !documentDetail ? true : false,
      }
    );
  console.log("page", page);
  const onSearch = (values: TExportForm) => {
    if (values.document_code !== search) setSearch(values.document_code);

    if (query?.type === values?.type) return;
    setTimeout(() => {
      setQuery({
        ...query,
        type: values?.type,
      });
      refetchExport();
    }, 200);
  };
  const handleExportExcel = async () => {
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
  const onCheckToken = async () => {
    await checkToken({
      token: token,
    })
      .unwrap()
      .then((value) => {
        console.log("value expired", value);
        if (!value) {
          return;
        }
        navigate("/", { replace: true });
      })
      .catch(() => {
        navigate("/", { replace: true });
      });
  };
  useEffect(() => {
    console.log("log");
    onCheckToken();
  }, [location.pathname]); // Runs when the route changes
  return (
    <Fragment>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body>
            <Formik
              initialValues={{
                document_code: "",
                type: "",
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
                          <AppConfirm onAccept={handleExportExcel}>
                            <Button
                              variant=""
                              aria-label="button"
                              type="button"
                              className="btn btn-success-light ms-2"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-title="Add Contact"
                            >
                              Xuất Excel
                            </Button>
                          </AppConfirm>
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
                              <option value={""}>Chọn tất cả</option>
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
            isChange={query.type}
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
                key: "time_export",
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
          <AppTable
            isHeader={false}
            title="Thông tin xuất kho"
            isLoading={isLoadingExportDetail}
            maxPage={exportDetails?.length}
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
            data={exportDetails || []}
            searchByExternal="document_code"
            externalSearch=""
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default WarehouseReportExport;
