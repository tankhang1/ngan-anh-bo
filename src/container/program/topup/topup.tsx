import React, { Fragment, useDeferredValue, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import {
  TAgentDashboardTable,
  TProgramPoint,
  TProgramTopup,
} from "../../../assets/types";
import AppId from "../../../components/common/app-id";
import { useNavigate } from "react-router-dom";
import { MAP_PROGRAM_STATUS } from "../../../constants";

const AGENT_FILTERS = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Tên",
  },
  {
    key: "phone",
    label: "Số điện thoại",
  },
  {
    key: "province",
    label: "Địa chỉ",
  },
  {
    key: "time_verify",
    label: "Địa chỉ",
  },
];
function TopupProgram() {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(AGENT_FILTERS[0].key);
  const deferSearchValue = useDeferredValue(search);
  const navigate = useNavigate();
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
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip className="tooltip">Thêm mới đại lí </Tooltip>
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
            title="Thông tin chương trình tích điểm"
            headers={[
              {
                key: "id",
                label: "ID",
                render: (value: TProgramTopup) => (
                  <td>
                    <AppId id={value.id} />
                  </td>
                ),
              },
              {
                key: "name",
                label: "Tên chương trình",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.name}</span>
                  </td>
                ),
              },
              {
                key: "time_start",
                label: "Ngày bắt đầu",
                render: (value) => <td>{value.time_start}</td>,
              },
              {
                key: "time_end",
                label: "Ngày kết thúc",
                render: (value) => <td>{value.time_end}</td>,
              },
              {
                key: "price",
                label: "Số tiền",
                render: (value) => <td>{value.price}</td>,
              },
              {
                key: "status",
                label: "Trạng thái",
                render: (value) => {
                  const tmp = MAP_PROGRAM_STATUS.get(value.status);
                  console.log(tmp);
                  return (
                    <td>
                      <Badge bg={tmp?.color} className="rounded-pill">
                        {tmp?.labe}
                      </Badge>
                    </td>
                  );
                },
              },
              {
                key: "products",
                label: "Sản phẩm áp dụng",
                render: (value) => <td>{value.name}</td>,
              },
              {
                key: "agents",
                label: "Đại lí áp dụng",
                render: (value) => (
                  <td>
                    <span className="d-flex gap-1 flex-wrap">
                      {value.agents?.split(",").map((item, index) => (
                        <Badge
                          bg="primary-transparent"
                          className="round-pill"
                          key={index}
                        >
                          {item}
                        </Badge>
                      ))}
                    </span>
                  </td>
                ),
              },
              {
                key: "locations",
                label: "Khu vực áp dụng",
                render: (value) => (
                  <td>
                    <span className="d-flex gap-1 flex-wrap">
                      {value.locations?.split(",").map((item, index) => (
                        <Badge
                          bg="secondary-transparent"
                          className="round-pill"
                          key={index}
                        >
                          {item}
                        </Badge>
                      ))}
                    </span>
                  </td>
                ),
              },
              {
                key: "objectives",
                label: "Đối tượng áp dụng",
                render: (value) => (
                  <td>
                    <span className="d-flex gap-1 flex-wrap">
                      {value.objectives?.split(",").map((item, index) => (
                        <Badge
                          bg="outline-success"
                          className="round-pill"
                          key={index}
                        >
                          {item}
                        </Badge>
                      ))}
                    </span>
                  </td>
                ),
              },
              {
                key: "time_active",
                label: "Thời gian kích hoạt",
                render: (value) => <td>{value.time_active}</td>,
              },
              {
                key: "time_deactive",
                label: "Thời gian tạm dừng",
                render: (value) => <td>{value.time_deactive}</td>,
              },

              {
                key: "",
                label: "Chức năng",
                render: (value) => (
                  <td>
                    <span className="d-flex justify-content-center align-item-center">
                      <button
                        className="btn btn-icon btn-sm btn-primary-ghost"
                        onClick={() => navigate(`ce/${false}/${value.id}`)}
                      >
                        <i className="ti ti-edit"></i>
                      </button>
                    </span>
                  </td>
                ),
              },
            ]}
            data={Array.from({ length: 20 }).map(() => ({
              agents: "qwe,qwe,qưe,123,123,12,31,23,123,12,3,12",
              id: Math.floor(Math.random() * 10000),
              locations: "1312,ádad",
              name: "!@#!@",
              objectives: "!@#,12e12",
              price: 123123,
              products: "!@#,123123",
              status: 1,
              time_active: "123123",
              time_active_number: 123123,
              time_create: "123123",
              time_create_number: 123123,
              time_deactive: "1231231",
              time_deactive_number: 123132,
              time_end: "1231232",
              time_end_number: 213123123,
              time_start: "13123123",
              time_start_number: 213123123,
              uuid: 123123123,
              time_deactive_num: 123213,
            }))}
            filters={[
              {
                key: "status",
                label: "Tất cả",
                value: "ALL",
              },
              {
                key: "status",
                label: "Đã xác thực",
                value: 1,
              },
              {
                key: "status",
                label: "Chờ xác thực",
                value: 0,
              },
            ]}
          />
        </Card>
      </Col>
    </Fragment>
  );
}

export default TopupProgram;
