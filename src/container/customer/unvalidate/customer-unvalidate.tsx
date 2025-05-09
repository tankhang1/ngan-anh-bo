import React, { Fragment, useDeferredValue, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { GroupCode, TCustomerRes } from "../../../assets/types";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetCounterCustomerQuery,
  useGetListCustomerQuery,
} from "../../../redux/api/manage/manage.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { format } from "date-fns";
import { MapCustomerType } from "../../../constants";
import { useLogCustomerQuery } from "../../../redux/api/log/log.api";
import AppHistory from "../../../components/AppHistory";
import { useCheckTokenExpiredMutation } from "../../../redux/api/other/other.api";

const CUSTOMER_TYPE = [
  {
    key: "ANONYMOUS",
    label: "Chưa định danh",
  },
];
function CustomerUnValidation() {
  const { permission, token } = useSelector((state: RootState) => state.auth);
  const [search, setSearch] = useState("");
  const deferSearchValue = useDeferredValue(search);
  const [customerType, setCustomerType] = useState(CUSTOMER_TYPE[0].key);

  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const [checkToken] = useCheckTokenExpiredMutation();

  // const { data: groupObjectives } = useGetListGroupObjectiveQuery();
  const { data: counterCustomer } = useGetCounterCustomerQuery(
    {
      t: customerType,
      s: 0,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: customers, isLoading: isLoadingCustomer } =
    useGetListCustomerQuery(
      {
        nu: page - 1,
        sz: counterCustomer ?? 200,
        t: "ANONYMOUS",
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );
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
            <div className="contact-header">
              <div className="d-sm-flex d-block align-items-center justify-content-between">
                <div className="h5 fw-semibold mb-0">Tìm kiếm thông tin</div>
                <div className="d-flex w-sm-100 mt-sm-0 mt-2 align-items-center">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      className="bg-light"
                      placeholder="Nhập thông tin"
                      aria-describedby="search-contact-member"
                      onChange={(e) => setSearch(e.target.value)}
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

                  {/* {permission.createUnValidateCustomer ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip className="tooltip">Thêm mới</Tooltip>}
                    >
                      
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
                  ) : null} */}
                  {permission.exportUnValidateCustomer ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip className="tooltip">Xuất file</Tooltip>}
                    >
                      <Button
                        variant=""
                        aria-label="button"
                        type="button"
                        className="btn btn-icon btn-success-light ms-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Add Contact"
                        onClick={() => {}}
                      >
                        <i className="ti ti-database-export"></i>
                      </Button>
                    </OverlayTrigger>
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
          externalSearch={deferSearchValue}
          title="Thông tin đại lý"
          isLoading={isLoadingCustomer}
          isChange={customerType}
          headers={[
            {
              key: "customer_code",
              label: "Mã khách hàng",
              render: (value: TCustomerRes) => <td>{value.customer_code}</td>,
            },
            {
              key: "name",
              label: "Tên đăng kí",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.name}</span>
                </td>
              ),
            },
            {
              key: "name",
              label: "Họ và tên",
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
              key: "province",
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
              key: "source_channel_used",
              label: "Nguồn đăng kí",
              render: (value) => <td>{value.source_channel_used}</td>,
            },

            {
              key: "time_verify",
              label: "Thời gian xác thực",
              render: (value) => (
                <td>
                  {value?.time_verify
                    ? format(
                        new Date(value.time_verify),
                        "dd/MM/yyyy0 hh:mm:ss"
                      )
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
                    onClick={() => navigate(`ce/${false}/${value.uuid}`)}
                  >
                    <i className="ti ti-edit"></i>
                  </button>
                </td>
              ),
            },
            {
              key: "time",
              label: "Thời gian đăng ký",
              render: (value) => (
                <td>
                  {value.time ? format(value.time, "dd/MM/yyyy HH:mm:ss") : ""}
                </td>
              ),
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

export default CustomerUnValidation;
