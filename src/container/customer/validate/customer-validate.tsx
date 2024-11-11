import React, { Fragment, useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { GroupCode, TCustomerRes } from "../../../assets/types";
import AppId from "../../../components/common/app-id";
import { useNavigate } from "react-router-dom";
import {
  useGetCounterCustomerQuery,
  useGetListCustomerQuery,
  useGetListGroupObjectiveQuery,
} from "../../../redux/api/manage/manage.api";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MapCustomerType } from "../../../constants";
import { Checkbox } from "@mui/material";
import { useExportCustomerDataMutation } from "../../../redux/api/excel/excel.api";
import { ToastContext } from "../../../components/AppToast";
import AppConfirm from "../../../components/AppConfirm";
import { useLogCustomerQuery } from "../../../redux/api/log/log.api";
import AppHistory from "../../../components/AppHistory";

function CustomerValidation() {
  const toast = useContext(ToastContext);
  const { permission, username } = useSelector(
    (state: RootState) => state.auth
  );
  const { data: groupObjectives } = useGetListGroupObjectiveQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const [isLoadingExportExcel, setIsLoadingExportExcel] = useState(false);
  const [exportExcel] = useExportCustomerDataMutation();

  const [search, setSearch] = useState("");
  const [customerType, setCustomerType] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const handleExportExcel = async () => {
    await exportExcel({
      t: customerType,
      k: "",
      u: username,
      st: 0,
      ed: 0,
    })
      .unwrap()
      .then((value) => {
        toast.showToast(
          "Xuất dữ liệu thành công, vui lòng kiểm tra mục danh sách yêu cầu"
        );
      });
  };
  const onChangeCustomerType = (type: string) => {
    if (type !== customerType) {
      setSearch("");
      setCustomerType(type);
    }
  };
  const { data: counterCustomer } = useGetCounterCustomerQuery(
    {
      t: customerType,
      s: 1,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: customerType ? false : true,
    }
  );
  const { data: customers, isLoading: isLoadingCustomer } =
    useGetListCustomerQuery(
      {
        nu: page - 1,
        sz: counterCustomer ?? 200,
        t: customerType,
        s: 1,
      },
      {
        refetchOnMountOrArgChange: true,
        skip: customerType ? false : true,
      }
    );

  return (
    <Fragment>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body>
            <div className="contact-header">
              <div className="d-sm-flex d-block align-items-center justify-content-between">
                <div className="h5 fw-semibold mb-0">Tìm kiếm thông tin</div>
                <div className="d-flex w-sm-100 mt-sm-0 mt-2 align-items-center">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      className="bg-light"
                      placeholder="Nhập thông tin"
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                    />
                    <Button
                      variant=""
                      aria-label="button"
                      className="btn btn-primary"
                      type="button"
                      id="search-contact-member"
                    >
                      <i className="ri-search-line"></i>
                    </Button>
                  </InputGroup>
                  {/* <Dropdown className="ms-2">
                    <Dropdown.Toggle
                      variant=""
                      aria-label="button"
                      className="btn btn-icon btn-primary-light btn-wave no-caret"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti ti-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu as="ul" className="dropdown-menu-start">
                      {AGENT_FILTERS.map((item, index) => (
                        <Dropdown.Item
                          active={item.key === searchBy}
                          key={index}
                          onClick={() => setSearchBy(item.key)}
                        >
                          {item.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown> */}
                  <Dropdown className="ms-2">
                    <Dropdown.Toggle
                      variant=""
                      aria-label="button"
                      className="btn btn-icon btn-info-light btn-wave no-caret"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti ti-exchange"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu as="ul" className="dropdown-menu-start">
                      {[
                        { symbol: "ALL", name: "Tất cả" },
                        ...(groupObjectives?.filter(
                          (item) => item.symbol !== "ANONYMOUS"
                        ) ?? []),
                      ]?.map((item, index) => (
                        <Dropdown.Item
                          active={item.symbol === customerType}
                          key={index}
                          onClick={() => {
                            setSearch("");
                            onChangeCustomerType(item.symbol);
                          }}
                        >
                          {item.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  {permission.createValidateCustomer ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip className="tooltip">Thêm mới</Tooltip>}
                    >
                      <Button
                        variant=""
                        aria-label="button"
                        type="button"
                        className="btn btn-icon btn-secondary-light ms-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Add Contact"
                        onClick={() => navigate(`ce/${true}/-1`)}
                      >
                        <i className="ri-add-line"></i>
                      </Button>
                    </OverlayTrigger>
                  ) : null}
                  {permission.exportValidateCustomer ? (
                    <AppConfirm onAccept={handleExportExcel}>
                      <Button
                        variant=""
                        aria-label="button"
                        type="button"
                        className={`btn btn-icon btn-success-light ms-2 ${
                          isLoadingExportExcel && "btn-loader"
                        }`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Add Contact"
                      >
                        {isLoadingExportExcel ? (
                          <span className="loading">
                            <i className="ri-loader-2-fill fs-19"></i>
                          </span>
                        ) : (
                          <i className="ti ti-database-export"></i>
                        )}
                      </Button>
                    </AppConfirm>
                  ) : null}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Card className="custom-card">
        <AppTable
          isHeader={false}
          externalSearch={search}
          title="Thông tin đại lý"
          isLoading={isLoadingCustomer}
          isChange={customerType}
          headers={[
            {
              key: "id",
              label: "ID",
              render: (value: TCustomerRes) => (
                <td>
                  <AppId id={value.id ?? ""} />
                </td>
              ),
            },
            {
              key: "customer_code",
              label: "Mã khách hàng",
              render: (value: TCustomerRes) => <td>{value.customer_code}</td>,
            },

            {
              key: "name",
              label: "Họ và tên khách hàng",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.customer_name}</span>
                </td>
              ),
            },
            {
              key: "sign_board",
              label: "Tên cửa hàng",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.sign_board}</span>
                </td>
              ),
            },
            {
              key: "customer_province_name",
              label: "Tỉnh thành",
              render: (value) => <td>{value.customer_province_name}</td>,
            },
            {
              key: "phone",
              label: "Số điện thoại",
              render: (value) => <td>{value.phone}</td>,
            },
            {
              key: "customer_type",
              label: "Nhóm khách hàng",
              render: (value) => (
                <td>
                  {value?.customer_type
                    ? MapCustomerType.get(value.customer_type)
                    : ""}
                </td>
              ),
            },
            {
              key: "retailer_group_name",
              label: "Nhóm đại lý",
              render: (value) => <td>{value?.retailer_group_name ?? ""}</td>,
            },
            {
              key: "info_primary",
              label: "Tham gia tích điểm",
              render: (value) => (
                <td>
                  <Checkbox checked={value.info_primary ? true : false} />
                </td>
              ),
            },
            {
              key: "time_verify",
              label: "Thời gian xác thực",
              render: (value) => (
                <td>
                  {value?.time_verify
                    ? format(new Date(value.time_verify), "dd/MM/yyyy hh:mm:ss")
                    : ""}
                </td>
              ),
            },
            {
              key: "source_channel_used",
              label: "Nguồn đăng kí",
              render: (value) => <td>{value.source_channel_used}</td>,
            },
            {
              key: "status",
              label: "Trạng thái",
              render: (value) => (
                <td>
                  {value.status === 1 ? (
                    <span className="bg-success bg-opacity-100 text-white badge ">
                      Đã xác thực
                    </span>
                  ) : (
                    <span className="bg-warning bg-opacity-100 text-white badge ">
                      Chờ xác thực
                    </span>
                  )}
                </td>
              ),
            },
            {
              key: "",
              label: "Chức năng",
              render: (value) => (
                <td className="d-flex justify-content-center align-item-center">
                  <button
                    className="btn btn-icon btn-sm btn-primary-ghost"
                    onClick={() =>
                      navigate(`ce/${false}/${value.customer_code}`)
                    }
                  >
                    <i className="ti ti-edit"></i>
                  </button>
                </td>
              ),
            },
            {
              key: "time",
              label: "Thời gian đăng ký",
              render: (value) => <td>{value.time}</td>,
            },
            {
              key: "time_updated",
              label: "Thời gian cập nhật",
              render: (value) => (
                <td>
                  {value.time_updated
                    ? format(value.time_updated, "dd/MM/yyyy HH:mm:ss")
                    : ""}
                </td>
              ),
            },
          ]}
          data={customers || []}
        />
      </Card>
    </Fragment>
  );
}

export default CustomerValidation;
