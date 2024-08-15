import React, {
  Fragment,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { TCustomerRes } from "../../../assets/types";
import AppId from "../../../components/common/app-id";
import { useNavigate } from "react-router-dom";
import {
  useGetCounterCustomerQuery,
  useGetCounterCustomerRegisterQuery,
  useGetListCustomerQuery,
  useGetListCustomerRegisterQuery,
  useGetListGroupObjectiveQuery,
} from "../../../redux/api/manage/manage.api";
import { PROVINCES } from "../../../constants";
import { label } from "yet-another-react-lightbox";

const AGENT_FILTERS = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Tên đại lý",
  },
  {
    key: "phone",
    label: "Số điện thoại",
  },
];

const CUSTOMER_TYPE = [
  {
    key: "ANONYMOUS",
    label: "Chưa định danh",
  },
];
function CustomerUnValidation() {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(AGENT_FILTERS[0].key);
  const deferSearchValue = useDeferredValue(search);
  const [customerType, setCustomerType] = useState(CUSTOMER_TYPE[0].key);
  const [page, setPage] = useState(1);
  const [listCustomers, setListCustomers] = useState<TCustomerRes[]>([]);
  const navigate = useNavigate();

  // const { data: groupObjectives } = useGetListGroupObjectiveQuery();
  const { data: counterCustomer } = useGetCounterCustomerRegisterQuery(
    {
      t: customerType,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: customers, isLoading: isLoadingCustomer } =
    useGetListCustomerRegisterQuery(
      {
        nu: page - 1,
        sz: 10,
        t: customerType,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );
  const onChangeCustomerType = (type: string) => {
    if (type !== customerType) {
      setCustomerType(type);
      setListCustomers([]);
    }
  };
  useEffect(() => {
    if (
      counterCustomer &&
      customers &&
      listCustomers.length + customers.length <= counterCustomer
    ) {
      setListCustomers([...listCustomers, ...customers]);
    }
  }, [customers, counterCustomer]);
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
                      placeholder="Tìm kiếm thông tin"
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
                  <Dropdown className="ms-2">
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
                  </Dropdown>
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
                      {CUSTOMER_TYPE?.map((item, index) => (
                        <Dropdown.Item
                          active={item.key === customerType}
                          key={index}
                          onClick={() => onChangeCustomerType(item.key)}
                        >
                          {item.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip className="tooltip">Thêm mới đại lý </Tooltip>
                    }
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
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={12}>
        <Card className="custom-card">
          <AppTable
            isHeader={false}
            externalSearch={deferSearchValue}
            title="Thông tin đại lý"
            isLoading={isLoadingCustomer}
            setExternalPage={setPage}
            maxPage={counterCustomer}
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
                label: "Tên đăng kí",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.name}</span>
                  </td>
                ),
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
                key: "province",
                label: "Tỉnh",
                render: (value) => <td>{value.customer_province_name}</td>,
              },
              {
                key: "phone",
                label: "Số điện thoại",
                render: (value) => <td>{value.phone}</td>,
              },
              {
                key: "time",
                label: "Thời gian đăng kí",
                render: (value) => <td>{value.time}</td>,
              },
              {
                key: "time_verify",
                label: "Thời gian xác thực",
                render: (value) => <td>{value.time_verify}</td>,
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
                      <span className="bg-secondary bg-opacity-100 text-white badge ">
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
                        navigate(
                          `ce/${false}/${value.id}_${customerType}_${page - 1}`
                        )
                      }
                    >
                      <i className="ti ti-edit"></i>
                    </button>
                  </td>
                ),
              },
            ]}
            data={listCustomers || []}
            filters={[
              {
                key: "status",
                label: "Tất cả",
                value: "ALL",
              },
            ]}
            searchByExternal={searchBy}
          />
        </Card>
      </Col>
    </Fragment>
  );
}

export default CustomerUnValidation;
