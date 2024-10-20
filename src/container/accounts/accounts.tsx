import React, { Fragment, useContext, useDeferredValue, useState } from "react";
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
  useGetRolePermissionListQuery,
} from "../../redux/api/manage/manage.api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import accountSchema from "../../schema/accounts.schema";
import AppWarning from "../../components/AppWarning";
import AppSelect from "../../components/AppSelect";

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
const MapAccountLabel = new Map([
  ["[ROLE_MARKETING]", "Marketing"],
  ["[ROLE_AGENT]", "Hỗ trợ tổng đài"],
  ["[ROLE_WAREHOUSE]", "Sản xuất và kho"],
  ["[ROLE_FINANCE]", "Kế toán"],
  ["[ROLE_DIRECTOR]", "Ban giám đốc"],
]);
function Accounts() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const toast = useContext(ToastContext);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(ACCOUNT_FILTERS[0].key);
  const deferSearchValue = useDeferredValue(search);
  const [openAddNewAccount, setOpenAddNewAccount] = useState(false);
  const [openUpdateAccount, setOpenUpdateAccount] = useState(false);
  const [accountInfo, setAccountInfo] = useState<TAccount>();
  const [username, setUsername] = useState<string | null>(null);
  const [showPW1, setShowPW1] = useState(false);
  const [showPW2, setShowPW2] = useState(false);
  const { data: accounts, isLoading: isLoadingAccount } =
    useGetAllAccountQuery();
  const [deleteAccount, { isLoading: isLoadingDelete }] =
    useDeleteAccountMutation();
  const [signUp, { isLoading: isLoadingSignUp }] = useSignUpAccountMutation();
  const { data: employees } = useGetListEmployeeQuery();
  const { data: roles } = useGetAccountRoleListQuery();
  const { data: rolesPermission } = useGetRolePermissionListQuery();

  const filterPermission = (role?: string) => {
    if (!roles) return [];
    const permissions = rolesPermission?.filter(
      (item) => item.role_code === role
    );
    return permissions ?? [];
  };
  const onDeleteAccount = async () => {
    if (username !== null) {
      await deleteAccount(username)
        .unwrap()
        .then((value) => {
          if (value.status === 0) {
            toast.showToast(`Xóa tài khoản ${username} thành công`);
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
      roles: [values.roles as string],
      roles_permission: filterPermission(values.roles as string),
    })
      .unwrap()
      .then((value) => {
        if (value.status === 0) {
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
                      {ACCOUNT_FILTERS.map((item, index) => (
                        <Dropdown.Item
                          active={item.key === searchBy}
                          key={index}
                          onClick={() => {
                            setSearch("");
                            setSearchBy(item.key);
                          }}
                        >
                          {item.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  {permission.createAccount ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip className="tooltip">
                          Thêm mới tài khoản
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
                        onClick={() => setOpenAddNewAccount(true)}
                      >
                        <i className="ri-add-line"></i>
                      </Button>
                    </OverlayTrigger>
                  ) : null}
                  {permission.exportAccount ? (
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
            title="Thông tin tài khoản"
            isLoading={isLoadingAccount}
            maxPage={accounts?.length}
            headers={[
              {
                key: "role_list",
                label: "Vai trò",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">
                      {
                        (value.role_list
                          ? MapAccountLabel.get(value.role_list as any)
                          : "") as any
                      }
                    </span>
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
                key: "created",
                label: "Thời gian tạo",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">
                      {value?.created
                        ? format(value.created, "dd/MM/yyyy HH:mm:ss")
                        : ""}
                    </span>
                  </td>
                ),
              },

              permission.deleteAccount
                ? {
                    key: "",
                    label: "Chức năng",
                    render: (value) => (
                      <td className="d-flex gap-2 justify-content-center align-item-center">
                        <button
                          className="btn btn-icon btn-sm btn-primary-ghost"
                          onClick={() => {
                            setOpenUpdateAccount(true);
                            setAccountInfo(value);
                          }}
                        >
                          <i className="ti ti-edit"></i>
                        </button>
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
                  }
                : undefined,
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
          <Button
            variant="primary"
            className={`btn justify-content-center align-items-center ${
              isLoadingDelete && "btn-loader "
            }`}
            onClick={onDeleteAccount}
          >
            <span>Xác nhận</span>
            {isLoadingDelete && (
              <span className="loading">
                <i className="ri-loader-2-fill fs-19"></i>
              </span>
            )}
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
              password_recheck: "",
              staff_code: "",
              roles: "",
            }}
            validationSchema={accountSchema}
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
              <div>
                <Modal.Body>
                  <Stack className="d-flex gap-1">
                    <Form.Group controlId="username_validate">
                      <Form.Label className="text-black form-required">
                        Tên đăng nhập <span style={{ color: "red" }}>*</span>
                      </Form.Label>
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
                      <Form.Label className="text-black">
                        Mật khẩu <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          required
                          type={showPW1 ? "text" : "password"}
                          placeholder="Mật khẩu"
                          name="password"
                          defaultValue={values.password}
                          onChange={handleChange}
                          isInvalid={touched.password && !!errors.password}
                        ></Form.Control>
                        <Button
                          variant=""
                          className="btn btn-light bg-transparent"
                          type="button"
                          onClick={() => setShowPW1(!showPW1)}
                          id="button-addon2"
                        >
                          <i
                            className={`${
                              showPW1 ? "ri-eye-line" : "ri-eye-off-line"
                            } align-middle`}
                          ></i>
                        </Button>
                      </InputGroup>
                      {touched.password && !!errors.password && (
                        <p
                          style={{
                            color: "red",
                            fontSize: 12,
                            marginTop: 4,
                            fontWeight: 350,
                          }}
                        >
                          {errors.password}
                        </p>
                      )}
                    </Form.Group>
                    <Form.Group controlId="password_validate">
                      <Form.Label className="text-black">
                        Nhập lại mật khẩu{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          required
                          type={showPW2 ? "text" : "password"}
                          placeholder="Mật khẩu"
                          name="password_recheck"
                          defaultValue={values.password_recheck}
                          onChange={handleChange}
                          isInvalid={
                            touched.password_recheck &&
                            !!errors.password_recheck
                          }
                        />
                        <Button
                          variant=""
                          className="btn btn-light bg-transparent"
                          type="button"
                          onClick={() => setShowPW2(!showPW2)}
                          id="button-addon2"
                        >
                          <i
                            className={`${
                              showPW2 ? "ri-eye-line" : "ri-eye-off-line"
                            } align-middle`}
                          ></i>
                        </Button>
                      </InputGroup>
                      {touched.password_recheck &&
                        !!errors.password_recheck && (
                          <p
                            style={{
                              color: "red",
                              fontSize: 12,
                              marginTop: 4,
                              fontWeight: 350,
                            }}
                          >
                            {errors.password_recheck}
                          </p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="staff_code_validate">
                      <Form.Label className="text-black form-required">
                        Tên nhân viên <span style={{ color: "red" }}>*</span>
                      </Form.Label>

                      <AppSelect
                        onChange={(value) => setFieldValue("staff_code", value)}
                        data={
                          employees?.map((item) => ({
                            label: `${item.name} - ${item.code}`,
                            value: item.code ?? "",
                          })) ?? []
                        }
                        placeholder="Chọn nhân viên"
                        isInValid={!!errors.staff_code && touched.staff_code}
                        errorText={errors.staff_code}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="text-black">
                        Vai trò <span style={{ color: "red" }}>*</span>
                      </Form.Label>

                      <AppSelect
                        onChange={(value) => setFieldValue("roles", value)}
                        data={
                          roles?.map((item) => ({
                            label: item.name ?? "",
                            value: item.code ?? "",
                          })) ?? []
                        }
                        placeholder="Chọn vai trò"
                        isInValid={!!errors.roles && touched.roles}
                        errorText={errors.roles}
                      />
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

                  <AppWarning onAccept={() => handleSubmit()}>
                    <Button
                      variant="primary"
                      className={`btn justify-content-center align-items-center ${
                        isLoadingSignUp && "btn-loader "
                      }`}
                    >
                      <span>Xác nhận</span>
                      {isLoadingSignUp && (
                        <span className="loading">
                          <i className="ri-loader-2-fill fs-19"></i>
                        </span>
                      )}
                    </Button>
                  </AppWarning>
                </Modal.Footer>
              </div>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <Modal
        show={openUpdateAccount}
        onHide={() => setOpenUpdateAccount(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6">Cập nhật tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              username: accountInfo?.username,
              password: "",
              password_recheck: "",
              staff_code: accountInfo?.staff_code,
              roles:
                (accountInfo?.role_list?.slice(1, -1)?.toString() as string) ??
                "",
            }}
            validationSchema={accountSchema}
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
              <div>
                <Modal.Body>
                  <Stack className="d-flex gap-1">
                    <Form.Group controlId="username_validate">
                      <Form.Label className="text-black form-required">
                        Tên đăng nhập <span style={{ color: "red" }}>*</span>
                      </Form.Label>
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
                      <Form.Label className="text-black">
                        Mật khẩu <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          required
                          type={showPW1 ? "text" : "password"}
                          placeholder="Mật khẩu"
                          name="password"
                          onChange={handleChange}
                          isInvalid={touched.password && !!errors.password}
                        ></Form.Control>
                        <Button
                          variant=""
                          className="btn btn-light bg-transparent"
                          type="button"
                          onClick={() => setShowPW1(!showPW1)}
                          id="button-addon2"
                        >
                          <i
                            className={`${
                              showPW1 ? "ri-eye-line" : "ri-eye-off-line"
                            } align-middle`}
                          ></i>
                        </Button>
                      </InputGroup>
                      {touched.password && !!errors.password && (
                        <p
                          style={{
                            color: "red",
                            fontSize: 12,
                            marginTop: 4,
                            fontWeight: 350,
                          }}
                        >
                          {errors.password}
                        </p>
                      )}
                    </Form.Group>
                    <Form.Group controlId="password_validate">
                      <Form.Label className="text-black">
                        Nhập lại mật khẩu{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          required
                          type={showPW2 ? "text" : "password"}
                          placeholder="Mật khẩu"
                          name="password_recheck"
                          onChange={handleChange}
                          isInvalid={
                            touched.password_recheck &&
                            !!errors.password_recheck
                          }
                        />
                        <Button
                          variant=""
                          className="btn btn-light bg-transparent"
                          type="button"
                          onClick={() => setShowPW2(!showPW2)}
                          id="button-addon2"
                        >
                          <i
                            className={`${
                              showPW2 ? "ri-eye-line" : "ri-eye-off-line"
                            } align-middle`}
                          ></i>
                        </Button>
                      </InputGroup>
                      {touched.password_recheck &&
                        !!errors.password_recheck && (
                          <p
                            style={{
                              color: "red",
                              fontSize: 12,
                              marginTop: 4,
                              fontWeight: 350,
                            }}
                          >
                            {errors.password_recheck}
                          </p>
                        )}
                    </Form.Group>
                    <Form.Group controlId="staff_code_validate">
                      <Form.Label className="text-black form-required">
                        Tên nhân viên <span style={{ color: "red" }}>*</span>
                      </Form.Label>

                      <AppSelect
                        onChange={(value) => setFieldValue("staff_code", value)}
                        value={values.staff_code}
                        data={
                          employees?.map((item) => ({
                            label: `${item.name} - ${item.code}`,
                            value: item.code ?? "",
                          })) ?? []
                        }
                        placeholder="Chọn nhân viên"
                        isInValid={!!errors.staff_code && touched.staff_code}
                        errorText={errors.staff_code}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="text-black">
                        Vai trò <span style={{ color: "red" }}>*</span>
                      </Form.Label>

                      <AppSelect
                        onChange={(value) => setFieldValue("roles", value)}
                        value={values.roles}
                        data={
                          roles?.map((item) => ({
                            label: item.name ?? "",
                            value: item.code ?? "",
                          })) ?? []
                        }
                        placeholder="Chọn vai trò"
                        isInValid={!!errors.roles && touched.roles}
                        errorText={errors.roles}
                      />
                    </Form.Group>
                  </Stack>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setOpenUpdateAccount(false);
                      setAccountInfo(undefined);
                    }}
                  >
                    Đóng
                  </Button>

                  <AppWarning onAccept={() => handleSubmit()}>
                    <Button
                      variant="primary"
                      className={`btn justify-content-center align-items-center ${
                        isLoadingSignUp && "btn-loader "
                      }`}
                    >
                      <span>Xác nhận</span>
                      {isLoadingSignUp && (
                        <span className="loading">
                          <i className="ri-loader-2-fill fs-19"></i>
                        </span>
                      )}
                    </Button>
                  </AppWarning>
                </Modal.Footer>
              </div>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default Accounts;
