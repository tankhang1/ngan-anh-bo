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
import AppTable from "../../components/common/table/table";
import { GroupCode, TEmployee } from "../../assets/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetListEmployeeQuery } from "../../redux/api/manage/manage.api";
import { format } from "date-fns";
import { exportExcelFile } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AppConfirm from "../../components/AppConfirm";
import AppHistory from "../../components/AppHistory";
import { useLogCustomerQuery } from "../../redux/api/log/log.api";
import { useCheckTokenExpiredMutation } from "../../redux/api/other/other.api";

function Employee() {
  const { permission, token } = useSelector((state: RootState) => state.auth);
  const [search, setSearch] = useState("");
  const deferSearchValue = useDeferredValue(search);
  const [openedHistory, setOpenHistory] = useState(false);
  const { data: logEmployee } = useLogCustomerQuery(
    {
      group: GroupCode.EMPLOYEES,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !openedHistory,
    }
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [checkToken] = useCheckTokenExpiredMutation();
  const { data: employees, isLoading: isLoadingEmployee } =
    useGetListEmployeeQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  const handleExportExcel = () => {
    if (employees) exportExcelFile(employees, "Danh sách nhân viên");
  };
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
                  </Dropdown> */}

                  {permission.createEmployee ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip className="tooltip">Thêm mới</Tooltip>}
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
                  ) : null}
                  {permission.exportEmployee ? (
                    <AppConfirm onAccept={handleExportExcel}>
                      <Button
                        variant=""
                        aria-label="button"
                        type="button"
                        className="btn btn-icon btn-success-light ms-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Add Contact"
                      >
                        <i className="ti ti-database-export"></i>
                      </Button>
                    </AppConfirm>
                  ) : null}
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip className="tooltip">Lịch sử thay đổi</Tooltip>
                    }
                  >
                    <Button
                      variant=""
                      aria-label="button"
                      type="button"
                      className="btn btn-icon btn-success-light ms-2"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      onClick={() => setOpenHistory(true)}
                    >
                      <i className="ti ti-history"></i>
                    </Button>
                  </OverlayTrigger>
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
          isLoading={isLoadingEmployee}
          headers={[
            {
              key: "code",
              label: "Mã nhân viên",
              render: (value: TEmployee) => <td>{value.code}</td>,
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

            // {
            //   key: "birthday",
            //   label: "Ngày sinh",
            //   render: (value) => (
            //     <td>
            //       <span className="fw-semibold">
            //         {value?.birthday
            //           ? format(fDate(value.birthday), "dd/MM/yyyy")
            //           : ""}
            //       </span>
            //     </td>
            //   ),
            // },

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
              key: "phone",
              label: "Số điện thoại",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.phone}</span>
                </td>
              ),
            },
            // {
            //   key: "citizen_number",
            //   label: "CCCD",
            //   render: (value) => <td>{value.citizen_number}</td>,
            // },
            {
              key: "email",
              label: "Email",
              render: (value) => <td>{value.email}</td>,
            },
            {
              key: "province_name",
              label: "Tỉnh thành",
              render: (value) => <td>{value.province_name}</td>,
            },
            {
              key: "areas",
              label: "Vùng kinh doanh",
              render: (value) => <td>{value.areas as string}</td>,
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
            {
              key: "time_created",
              label: "Thời gian tạo",
              render: (value) => (
                <td>
                  {value.time_created
                    ? format(value.time_created, "dd/MM/yyyy HH:mm:ss")
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
            {
              key: "note",
              label: "Ghi chú",
              render: (value) => <td>{value.note}</td>,
            },
          ]}
          data={employees || []}
        />
      </Card>
      <AppHistory
        data={logEmployee || []}
        opened={openedHistory}
        onClose={setOpenHistory}
      />
    </Fragment>
  );
}

export default Employee;
