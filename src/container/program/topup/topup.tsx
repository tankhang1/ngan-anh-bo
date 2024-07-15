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
import { useGetListProgramTopupByTimeQuery } from "../../../redux/api/program/program.api";
import { format } from "date-fns";

const TOPUP_FILTERS = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Tên chương trình",
  },
];
function TopupProgram() {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(TOPUP_FILTERS[0].key);
  const deferSearchValue = useDeferredValue(search);
  const navigate = useNavigate();

  const { data: programTopups } = useGetListProgramTopupByTimeQuery(null, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
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
                      {TOPUP_FILTERS.map((item, index) => (
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
                      <Tooltip className="tooltip">
                        Thêm mới chương trình{" "}
                      </Tooltip>
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
                        {tmp?.label}
                      </Badge>
                    </td>
                  );
                },
              },
              {
                key: "products",
                label: "Sản phẩm áp dụng",
                render: (value) => (
                  <td>
                    <span className="d-flex gap-1 flex-wrap">
                      {value.products?.split(",").map((item, index) => (
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
                label: "Thời gian bắt đầu",
                render: (value) => (
                  <td>{format(new Date(value.time_start), "dd/MM/yyyy")}</td>
                ),
              },
              {
                key: "time_end",
                label: "Thời gian kết thúc",
                render: (value) => (
                  <td>{format(new Date(value.time_end), "dd/MM/yyyy")}</td>
                ),
              },

              {
                key: "",
                label: "Chức năng",
                render: (value) => (
                  <td>
                    <span className="d-flex justify-content-center align-item-center">
                      <button
                        className="btn btn-icon btn-sm btn-primary-ghost"
                        onClick={() => navigate(`ce/${false}/${value.uuid}`)}
                      >
                        <i className="ti ti-edit"></i>
                      </button>
                    </span>
                  </td>
                ),
              },
            ]}
            data={programTopups || []}
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

export default TopupProgram;
