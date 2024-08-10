import React, {
  Fragment,
  useCallback,
  useContext,
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
  Modal,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import AppTable from "../../components/common/table/table";
import { TAccount } from "../../assets/types";
import AppId from "../../components/common/app-id";
import { useNavigate } from "react-router-dom";

import {
  useDeleteAccountMutation,
  useGetAccountRoleListQuery,
  useGetAllAccountQuery,
  useSignUpAccountMutation,
} from "../../redux/api/account/account.api";
import { format } from "date-fns";
import { ToastContext } from "../../components/AppToast";
import { Formik } from "formik";
import {
  useGetListEmployeeQuery,
  useGetListEmployeeRoleQuery,
} from "../../redux/api/manage/manage.api";
import Select from "react-select";

const ACCOUNT_FILTERS = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Tên nhân viên",
  },
  {
    key: "phone",
    label: "Số điện thoại",
  },
];

function Accounts() {
  const toast = useContext(ToastContext);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(ACCOUNT_FILTERS[0].key);
  const deferSearchValue = useDeferredValue(search);
  const [openAddNewAccount, setOpenAddNewAccount] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    data: accounts,
    isLoading: isLoadingAccount,
    refetch: refetchAccount,
  } = useGetAllAccountQuery();
  const [deleteAccount] = useDeleteAccountMutation();
  const [signUp] = useSignUpAccountMutation();
  const { data: employees } = useGetListEmployeeQuery();
  const { data: roles } = useGetAccountRoleListQuery();

  const onDeleteAccount = async () => {
    if (username !== null) {
      await deleteAccount(username)
        .unwrap()
        .then((value) => {
          if (value.status === 0) {
            toast.showToast(`Xóa tài khoản ${username} thành công`);
            refetchAccount();
          } else {
            toast.showToast(`Xóa tài khoản ${username} thất bại`);
          }
          setUsername(null);
        })
        .catch(() => {
          toast.showToast(`Xóa tài khoản ${username} thất bại`);
          setUsername(null);
        });
    }
  };

  const onSignUpAccount = async (values: TAccount) => {
    setOpenAddNewAccount(false);
    await signUp({
      username: values.username,
      password: values.password,
      staff_code: values.staff_code,
      roles: (values.roles as { label: string; value: string }[]).map(
        (item) => item.value
      ),
    })
      .unwrap()
      .then((value) => {
        if (value.status === 0) {
          refetchAccount();
          toast.showToast("Đăng ký tài khoản thành công");
        } else toast.showToast("Đăng ký tài khoản thất bại");
      })
      .catch(() => {
        toast.showToast("Đăng ký tài khoản thất bại");
      });
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
                      {ACCOUNT_FILTERS.map((item, index) => (
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
                      <Tooltip className="tooltip">Thêm mới tài khoản</Tooltip>
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
                      onClick={() => setOpenAddNewAccount(true)}
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
            title="Thông tin tài khoản"
            isLoading={isLoadingAccount}
            headers={[
              {
                key: "id",
                label: "ID",
                render: (value: TAccount) => (
                  <td>
                    <AppId id={value.id ?? ""} />
                  </td>
                ),
              },
              {
                key: "staff_code",
                label: "Mã nhân viên",
                render: (value: TAccount) => <td>{value.staff_code}</td>,
              },
              {
                key: "name",
                label: "Tên nhân sự",
                render: (value: TAccount) => <td>{value.name}</td>,
              },
              {
                key: "username",
                label: "Tên tài khoản",
                render: (value: TAccount) => <td>{value.username}</td>,
              },
              {
                key: "email",
                label: "Email",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.email}</span>
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
                key: "role_list",
                label: "Vai trò",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">
                      {value.role_list as any}
                    </span>
                  </td>
                ),
              },
              {
                key: "created",
                label: "Thời gian tạo",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">
                      {value?.created
                        ? format(value.created, "dd/MM/yyyy hh:mm:ss")
                        : ""}
                    </span>
                  </td>
                ),
              },
              {
                key: "modified",
                label: "Thời gian điều chỉnh",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">
                      {value?.modified
                        ? format(value.modified, "dd/MM/yyyy hh:mm:ss")
                        : ""}
                    </span>
                  </td>
                ),
              },
              {
                key: "",
                label: "Chức năng",
                render: (value) => (
                  <td className="d-flex justify-content-center align-item-center">
                    <button
                      className="btn btn-icon btn-sm btn-danger-ghost"
                      onClick={() => {
                        setUsername(value.username || null);
                      }}
                    >
                      <i className="ti ti-trash"></i>
                    </button>
                  </td>
                ),
              },
            ]}
            data={accounts || []}
            searchByExternal={searchBy}
          />
        </Card>
      </Col>
      <Modal
        show={username !== null}
        onHide={() => setUsername(null)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6">Cảnh báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa tài khoản này không</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUsername(null)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={onDeleteAccount}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={openAddNewAccount}
        onHide={() => setOpenAddNewAccount(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6">Thêm mới tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              username: "",
              password: "",
              staff_code: employees?.[0].code,
              roles: "",
            }}
            onSubmit={onSignUpAccount}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              touched,
              errors,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                  <Stack className="d-flex gap-1">
                    <Form.Group controlId="username_validate">
                      <Form.Label>Tên đăng nhập</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Tên đăng nhập"
                        name="username"
                        defaultValue={values.username}
                        onChange={handleChange}
                        isInvalid={touched.username && !!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password_validate">
                      <Form.Label>Mật khẩu</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Mật khẩu"
                        name="password"
                        defaultValue={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="staff_code_validate">
                      <Form.Label>Tên nhân viên</Form.Label>
                      <Form.Select
                        className="form-select"
                        name="staff_code"
                        value={values.staff_code}
                        onChange={(e) =>
                          setFieldValue("staff_code", e.target.value)
                        }
                        isInvalid={touched.staff_code && !!errors.staff_code}
                        required
                      >
                        {employees?.map((item) => (
                          <option value={item.code}>{item.name}</option>
                        ))}
                      </Form.Select>

                      <Form.Control.Feedback type="invalid">
                        {errors.staff_code}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="roles_validate">
                      <Form.Label>Vai trò</Form.Label>
                      <Select
                        //@ts-ignore
                        options={roles?.map((item) => ({
                          label: item.name,
                          value: item.code,
                        }))}
                        className="default basic-multi-select custom-multi mb-3"
                        id="choices-multiple-default"
                        menuPlacement="auto"
                        classNamePrefix="Select2"
                        isSearchable
                        isClearable
                        isMulti
                        placeholder="Chọn vai trò"
                        value={values.roles}
                        onChange={(value) => {
                          setFieldValue("roles", value);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.staff_code}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Stack>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setOpenAddNewAccount(false)}
                  >
                    Đóng
                  </Button>
                  <Button variant="primary" type="submit">
                    Xác nhận
                  </Button>
                </Modal.Footer>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default Accounts;
