import React, { Fragment, useState } from "react";
import { Button, Card, Col, Dropdown, Form, InputGroup } from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { TCustomerRes } from "../../../assets/types";

import {
  useGetCounterCustomerQuery,
  useGetListCustomerQuery,
} from "../../../redux/api/manage/manage.api";
import { format } from "date-fns";
import { MapCustomerType } from "../../../constants";

const AGENT_FILTERS = [
  {
    key: "customer_name",
    label: "Tên khách hàng",
  },
  {
    key: "phone",
    label: "Số điện thoại",
  },
];

function CustomerValidateToday() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: counterCustomer } = useGetCounterCustomerQuery(
    {
      st: +(format(new Date(), "yyyyMMdd") + "0000"),
      ed: +(format(new Date(), "yyyyMMdd") + "2359"),
      s: 1,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: customers, isLoading: isLoadingCustomer } =
    useGetListCustomerQuery(
      {
        st: +(format(new Date(), "yyyyMMdd") + "0000"),
        ed: +(format(new Date(), "yyyyMMdd") + "2359"),
        nu: page - 1,
        sz: 10,
        s: 1,
      },
      {
        refetchOnMountOrArgChange: true,
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
                key: "customer_name",
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
          />
        </Card>
      </Col>
    </Fragment>
  );
}

export default CustomerValidateToday;
