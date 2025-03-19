import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, InputGroup } from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { TCustomerRes } from "../../../assets/types";
import AppId from "../../../components/common/app-id";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetCounterCustomerQuery,
  useGetListCustomerQuery,
  useGetListGroupObjectiveQuery,
} from "../../../redux/api/manage/manage.api";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useCheckTokenExpiredMutation } from "../../../redux/api/other/other.api";

const AGENT_FILTERS = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "customer_name",
    label: "Tên khách hàng",
  },
  {
    key: "phone",
    label: "Số điện thoại",
  },
];

function CustomerToday() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state: RootState) => state.auth);

  const { data: groupObjectives } = useGetListGroupObjectiveQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(AGENT_FILTERS[0].key);
  const [customerType, setCustomerType] = useState<string>(
    groupObjectives?.[0].symbol || ""
  );
  const [page, setPage] = useState(1);

  const onChangeCustomerType = (type: string) => {
    if (type !== customerType) {
      setSearch("");
      setCustomerType(type);
    }
  };
  const [checkToken] = useCheckTokenExpiredMutation();

  const { data: counterCustomer } = useGetCounterCustomerQuery(
    {
      st: +(format(new Date(), "yyyyMMdd") + "0000"),
      ed: +(format(new Date(), "yyyyMMdd") + "2359"),
      t: customerType,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: customerType ? false : true,
    }
  );
  const { data: customers, isLoading: isLoadingCustomer } =
    useGetListCustomerQuery(
      {
        st: +(format(new Date(), "yyyyMMdd") + "0000"),
        ed: +(format(new Date(), "yyyyMMdd") + "2359"),
        nu: page - 1,
        sz: 10,
        t: customerType,
      },
      {
        refetchOnMountOrArgChange: true,
        skip: customerType ? false : true,
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
  useEffect(() => {
    if (groupObjectives) {
      setCustomerType(groupObjectives?.[0].symbol);
    }
  }, [groupObjectives]);
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
                      {groupObjectives?.map((item, index) => (
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
            externalSearch={search}
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
                render: (value) => (
                  <td>
                    {value?.time
                      ? format(new Date(value.time), "dd/MM/yyyy HH:mm:ss")
                      : ""}
                  </td>
                ),
              },
              {
                key: "time_verify",
                label: "Thời gian xác thực",
                render: (value) => (
                  <td>
                    {value?.time_verify
                      ? format(
                          new Date(value.time_verify),
                          "dd/MM/yyyy HH:mm:ss"
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
            ]}
            data={customers || []}
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

export default CustomerToday;
