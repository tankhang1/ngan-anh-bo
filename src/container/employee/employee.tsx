import React, {
  Fragment,
  useCallback,
  useDeferredValue,
  useEffect,
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
import AppTable from "../../components/common/table/table";
import { TCustomerRes, TEmployee } from "../../assets/types";
import AppId from "../../components/common/app-id";
import { useNavigate } from "react-router-dom";
import {
  useGetCounterCustomerQuery,
  useGetListCustomerQuery,
  useGetListEmployeeQuery,
  useGetListGroupObjectiveQuery,
} from "../../redux/api/manage/manage.api";
import { PROVINCES } from "../../constants";
import { format } from "date-fns";
import { exportExcelFile, fDate } from "../../hooks";

const EMPLOYEE_FILTERS = [
  {
    key: "name",
    label: "Tên nhân viên",
  },
  {
    key: "phone",
    label: "Số điện thoại",
  },
];

const CUSTOMER_TYPE = [
  {
    key: "RETAILER",
    label: "Đại lý cấp 1",
  },
  {
    key: "RETAILER2",
    label: "Đại lý cấp 2",
  },
  {
    key: "DISTRIBUTOR",
    label: "Nhà phân phối",
  },
  {
    key: "CTV",
    label: "Cộng tác viên",
  },
  {
    key: "FARMER",
    label: "Nông dân",
  },
  {
    key: "Other",
    label: "Không hợp tác",
  },
];
function Employee() {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(EMPLOYEE_FILTERS[0].key);
  const deferSearchValue = useDeferredValue(search);
  const navigate = useNavigate();
  const { data: employees, isLoading: isLoadingEmployee } =
    useGetListEmployeeQuery();

  const handleExportExcel = () => {
    if (employees) exportExcelFile(employees, "Danh sách nhân viên");
  };
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
                      {EMPLOYEE_FILTERS.map((item, index) => (
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
                      onClick={handleExportExcel}
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
            isLoading={isLoadingEmployee}
            headers={[
              {
                key: "id",
                label: "ID",
                render: (value: TEmployee) => (
                  <td>
                    <AppId id={value.id ?? ""} />
                  </td>
                ),
              },
              {
                key: "avatar",
                label: "Hình ảnh",
                render: (value) => (
                  <td>
                    <img
                      src={
                        value.avatar ||
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
                      }
                      className="img object-fit-cover"
                      style={{
                        height: 60,
                        width: "auto",
                      }}
                    />
                  </td>
                ),
              },
              {
                key: "name",
                label: "Tên nhân viên",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.name}</span>
                  </td>
                ),
              },

              {
                key: "birthday",
                label: "Ngày sinh",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">
                      {value?.birthday
                        ? format(fDate(value.birthday), "dd/MM/yyyy")
                        : ""}
                    </span>
                  </td>
                ),
              },
              {
                key: "phone",
                label: "Số điện thoại",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.phone}</span>
                  </td>
                ),
              },
              {
                key: "gender",
                label: "Giới tính",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">
                      {value.gender ? "Nam" : "Nữ"}
                    </span>
                  </td>
                ),
              },
              {
                key: "citizen_number",
                label: "CCCD",
                render: (value) => <td>{value.citizen_number}</td>,
              },
              {
                key: "email",
                label: "Email",
                render: (value) => <td>{value.email}</td>,
              },
              {
                key: "province_name",
                label: "Tỉnh",
                render: (value) => <td>{value.province_name}</td>,
              },
              {
                key: "area",
                label: "Khu vực",
                render: (value) => <td>{value.area}</td>,
              },
              {
                key: "note",
                label: "Ghi chú",
                render: (value) => <td>{value.note}</td>,
              },

              {
                key: "",
                label: "Chức năng",
                render: (value) => (
                  <td>
                    <button
                      className="btn btn-icon btn-sm btn-primary-ghost"
                      onClick={() => navigate(`ce/${false}/${value.uuid}`)}
                    >
                      <i className="ti ti-edit"></i>
                    </button>
                  </td>
                ),
              },
            ]}
            data={employees || []}
            filters={[
              {
                key: "id",
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

export default Employee;
