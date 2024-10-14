import React, { Fragment, useDeferredValue, useEffect, useState } from "react";
import {
  Badge,
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
import { TProgramPoint } from "../../../assets/types";
import AppId from "../../../components/common/app-id";
import { useNavigate } from "react-router-dom";
import { MAP_PROGRAM_STATUS } from "../../../constants";
import {
  useGetCounterProgramPointByStatusQuery,
  useGetListProgramPointStatusQuery,
} from "../../../redux/api/program/program.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { format } from "date-fns";
import {
  IconDotsVertical,
  IconEdit,
  IconExchange,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";

const POINT_FILTERS = [
  {
    key: "name",
    label: "Tên chương trình",
  },
];
const STATUS_FILTERS = [
  {
    key: 0,
    label: "Chờ kích hoạt",
  },
  {
    key: 1,
    label: "Đang chạy",
  },
  {
    key: 2,
    label: "Hết thời hạn",
  },
  {
    key: 3,
    label: "Tạm dừng",
  },
];
function PointProgram() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(POINT_FILTERS[0].key);
  const deferSearchValue = useDeferredValue(search);
  const [status, setStatus] = useState(-1);
  const navigate = useNavigate();
  const [listPoints, setListPoints] = useState<TProgramPoint[]>([]);
  const [page, setPage] = useState(1);

  const { data: counterProgramPoint } = useGetCounterProgramPointByStatusQuery(
    {
      status: status,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: programPoints, isLoading: isLoadingProgramPoint } =
    useGetListProgramPointStatusQuery(
      {
        status: status,
        nu: page - 1,
        sz: 10,
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
                    />
                    <Button
                      variant=""
                      aria-label="button"
                      className="btn btn-primary"
                      type="button"
                      id="search-contact-member"
                    >
                      <IconSearch size={16} />
                    </Button>
                  </InputGroup>
                  <Dropdown className="ms-2">
                    <Dropdown.Toggle
                      variant=""
                      aria-label="button"
                      className="btn btn-icon p-0 btn-primary-light btn-wave no-caret"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <IconDotsVertical size={16} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu as="ul" className="dropdown-menu-start">
                      {POINT_FILTERS.map((item, index) => (
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
                      className="btn btn-icon p-0 btn-info-light btn-wave no-caret"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <IconExchange size={16} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu as="ul" className="dropdown-menu-start">
                      {STATUS_FILTERS.map((item, index) => (
                        <Dropdown.Item
                          active={item.key === status}
                          key={index}
                          onClick={() => {
                            if (status !== item.key) {
                              setStatus(item.key);
                              setListPoints([]);
                            }
                          }}
                        >
                          {item.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  {permission.createProgramPoint ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip className="tooltip">Thêm mới</Tooltip>}
                    >
                      <Button
                        variant=""
                        aria-label="button"
                        type="button"
                        className="btn btn-icon p-0 btn-secondary-light ms-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Add Contact"
                        onClick={() => navigate(`ce/${true}/-1`)}
                      >
                        <IconPlus size={16} />
                      </Button>
                    </OverlayTrigger>
                  ) : null}
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
            isLoading={isLoadingProgramPoint}
            setExternalPage={setPage}
            maxPage={counterProgramPoint}
            isChange={status}
            headers={[
              {
                key: "id",
                label: "ID",
                render: (value: TProgramPoint) => (
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
                key: "point_coefficient",
                label: "Hệ số điểm CT",
                render: (value) => <td>{value.point_coefficient}</td>,
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
                render: (value) => {
                  const products = value.products?.split(",");
                  return (
                    <td>
                      <span className="d-flex gap-1 flex-wrap">
                        {products.length > 5
                          ? products.slice(0, 5).map((item, index) => (
                              <Badge
                                bg="outline-success"
                                className="round-pill"
                                key={index}
                              >
                                {item}
                              </Badge>
                            ))
                          : products.map((item, index) => (
                              <Badge
                                bg="outline-success"
                                className="round-pill"
                                key={index}
                              >
                                {item}
                              </Badge>
                            ))}
                        {products.length > 5 && (
                          <Badge
                            bg="outline-success"
                            className="round-pill"
                            key={"..."}
                          >
                            ...
                          </Badge>
                        )}
                      </span>
                    </td>
                  );
                },
              },
              {
                key: "agents",
                label: "Đại lý áp dụng",
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
              // {
              //   key: "locations",
              //   label: "Tỉnh áp dụng",
              //   render: (value) => {
              //     const locations = value.locations?.split(",");
              //     return (
              //       <td>
              //         <span className="d-flex gap-1 flex-wrap">
              //           {locations.length > 5
              //             ? value.locations
              //                 ?.split(",")
              //                 .slice(0, 5)
              //                 .map((item, index) => (
              //                   <Badge
              //                     bg="secondary-transparent"
              //                     className="round-pill"
              //                     key={index}
              //                   >
              //                     {item}
              //                   </Badge>
              //                 ))
              //             : locations.map((item, index) => (
              //                 <Badge
              //                   bg="secondary-transparent"
              //                   className="round-pill"
              //                   key={index}
              //                 >
              //                   {item}
              //                 </Badge>
              //               ))}
              //           {locations.length > 5 && (
              //             <Badge
              //               bg="secondary-transparent"
              //               className="round-pill"
              //               key={"..."}
              //             >
              //               ...
              //             </Badge>
              //           )}
              //         </span>
              //       </td>
              //     );
              //   },
              // },
              {
                key: "objectives",
                label: "Nhóm khách hàng",
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
                key: "retailer_group",
                label: "Nhóm đại lý",
                render: (value) => <td>{value.retailer_group}</td>,
              },
              permission.editProgramPoint
                ? {
                    key: "",
                    label: "Chức năng",
                    render: (value) => (
                      <td>
                        <span className="d-flex justify-content-center align-item-center">
                          <button
                            className="btn btn-icon p-0 btn-sm btn-primary-ghost"
                            onClick={() =>
                              navigate(
                                `ce/${false}/${value.uuid}_${status}_${
                                  page - 1
                                }`
                              )
                            }
                            disabled={value.status === 2}
                          >
                            <IconEdit size={14} />
                          </button>
                        </span>
                      </td>
                    ),
                  }
                : undefined,
              {
                key: "time_create",
                label: "Thời gian tạo",
                render: (value) => (
                  <td>
                    {" "}
                    {value.time_create
                      ? format(value.time_create, "dd/MM/yyyy HH:mm:ss")
                      : ""}
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
            data={programPoints || []}
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

export default PointProgram;
