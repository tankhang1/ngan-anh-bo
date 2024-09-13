import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, InputGroup } from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { TCustomerRes } from "../../../assets/types";
import AppId from "../../../components/common/app-id";
import { useNavigate } from "react-router-dom";
import {
  useGetCounterCustomerQuery,
  useGetListCustomerQuery,
  useGetListGroupObjectiveQuery,
  useGetListSMSGatewayQuery,
} from "../../../redux/api/manage/manage.api";
import { format } from "date-fns";

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

function SMSGateway() {
  const { data: groupObjectives } = useGetListGroupObjectiveQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(AGENT_FILTERS[0].key);
  const [customerType, setCustomerType] = useState<string>(
    groupObjectives?.[0].symbol || ""
  );
  const [page, setPage] = useState(1);

  const { data, isLoading: isLoadingSMSGateway } = useGetListSMSGatewayQuery();
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
            isLoading={isLoadingSMSGateway}
            setExternalPage={setPage}
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
                key: "code",
                label: "Mã iQR",
                render: (value: TCustomerRes) => <td>{value.code}</td>,
              },
              {
                key: "product_name",
                label: "Tên sản phẩm",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.product_name}</span>
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
            data={data ?? []}
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

export default SMSGateway;
