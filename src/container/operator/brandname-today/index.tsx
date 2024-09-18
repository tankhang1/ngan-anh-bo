import React, { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
} from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { TBrandname, TCustomerRes, TSMSGateway } from "../../../assets/types";
import AppId from "../../../components/common/app-id";
import { useNavigate } from "react-router-dom";
import {
  useGetCounterCustomerQuery,
  useGetListBrandnameTodayQuery,
  useGetListCustomerQuery,
  useGetListGroupObjectiveQuery,
  useGetListSMSGatewayQuery,
} from "../../../redux/api/manage/manage.api";
import { format } from "date-fns";

const AGENT_FILTERS = [
  {
    key: "phone",
    label: "Số điện thoại",
  },
];

function BrandnameToday() {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(AGENT_FILTERS[0].key);

  const [page, setPage] = useState(1);

  const { data: listBrandname, isLoading: isLoadingBrandname } =
    useGetListBrandnameTodayQuery();
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
            isLoading={isLoadingBrandname}
            setExternalPage={setPage}
            headers={[
              {
                key: "phone",
                label: "Số điện thoại",
                render: (value: TBrandname) => <td>{value.phone}</td>,
              },

              {
                key: "content",
                label: "Nội dung",
                render: (value: TBrandname) => <td>{value.content}</td>,
              },
              {
                key: "transactionid",
                label: "Mã giao dịch",
                render: (value: TBrandname) => <td>{value.transactionid}</td>,
              },
              {
                key: "status",
                label: "Trạng thái",
                render: (value: TBrandname) => (
                  <td>
                    <Badge bg="success">Thành công</Badge>
                  </td>
                ),
              },
            ]}
            data={listBrandname ?? []}
            searchByExternal={searchBy}
          />
        </Card>
      </Col>
    </Fragment>
  );
}

export default BrandnameToday;
