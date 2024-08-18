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
  Tooltip,
} from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { TEmployeeDepartment, TEmployeeRole } from "../../../assets/types";
import AppId from "../../../components/common/app-id";
import { useGetListEmployeeDepartmentQuery } from "../../../redux/api/manage/manage.api";
import { Formik } from "formik";
import {
  useCreateEmployeeDepartmentMutation,
  useUpdateEmployeeDepartmentMutation,
} from "../../../redux/api/other/other.api";
import { ToastContext } from "../../../components/AppToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const EMPLOYEE_ROLE_FILTERS = [
  {
    key: "name",
    label: "Tên bộ phận",
  },
];

function EmployeeDepartment() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(EMPLOYEE_ROLE_FILTERS[0].key);
  const [modalInfo, setModalInfo] = useState<TEmployeeDepartment | null>(null);
  const [openCEModal, setOpenCEModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const deferSearchValue = useDeferredValue(search);
  const [updateDepartment] = useUpdateEmployeeDepartmentMutation();
  const [createDepartment] = useCreateEmployeeDepartmentMutation();
  const toast = useContext(ToastContext);

  const {
    data: departments,
    isLoading: isLoadingDepartment,
    refetch: refetchDepartment,
  } = useGetListEmployeeDepartmentQuery();

  const onModalClose = () => {
    setOpenCEModal(false);
  };
  const handleSubmitRole = async (department: TEmployeeDepartment) => {
    if (!department.name || !department.code) {
      toast.showToast("Vui lòng điền tên vai trò");
      return;
    }
    if (isCreate) {
      await createDepartment({
        code: department.code,
        name: department.name,
        note: department.note || "",
      })
        .unwrap()
        .then((value) => {
          if (value?.status === -2) {
            toast.showToast("Phòng ban đã tồn tại");
            return;
          }
          if (value?.status === 0) {
            refetchDepartment();
            toast.showToast("Thêm phòng ban thành công");
            return;
          }
          toast.showToast("Thêm mới bại");
        })
        .catch((e) => {
          console.log("Faile", e);
        });
    } else {
      await updateDepartment({
        id: department.id,
        code: department.code,
        name: department.name,
        note: department.note || "",
      })
        .unwrap()
        .then((value) => {
          if (value?.status === -2) {
            toast.showToast("Phòng ban đã tồn tại");
            return;
          }
          if (value?.status === 0) {
            refetchDepartment();
            toast.showToast("Cập nhật phòng ban thành công");
            return;
          }
          toast.showToast("Cập nhật thất bại");
        })
        .catch((e) => {
          console.log("Faile", e);
        });
    }
    setOpenCEModal(false);
    setModalInfo(null);
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
                      {EMPLOYEE_ROLE_FILTERS.map((item, index) => (
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

                  {permission.createDepartment && (
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
                        onClick={() => {
                          setModalInfo(null);
                          setOpenCEModal(true);
                          setIsCreate(true);
                        }}
                      >
                        <i className="ri-add-line"></i>
                      </Button>
                    </OverlayTrigger>
                  )}
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
            title="Vai trof"
            isLoading={isLoadingDepartment}
            headers={[
              {
                key: "id",
                label: "ID",
                render: (value: TEmployeeDepartment) => (
                  <td>
                    <AppId id={value.id ?? ""} />
                  </td>
                ),
              },
              {
                key: "code",
                label: "Mã phòng ban",
                render: (value: TEmployeeDepartment) => (
                  <td>
                    <span className="fw-semibold">{value.code}</span>
                  </td>
                ),
              },
              {
                key: "name",
                label: "Tên phòng ban",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.name}</span>
                  </td>
                ),
              },

              {
                key: "note",
                label: "Chú thích",
                render: (value) => <td>{value.note}</td>,
              },
              permission.editDepartment
                ? {
                    key: "",
                    label: "Chức năng",
                    render: (value) => (
                      <td>
                        <button
                          className="btn btn-icon btn-sm btn-primary-ghost"
                          onClick={() => {
                            setOpenCEModal(true);
                            setModalInfo(value);
                            setIsCreate(false);
                          }}
                        >
                          <i className="ti ti-edit"></i>
                        </button>
                      </td>
                    ),
                  }
                : undefined,
            ]}
            data={departments || []}
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
      <Modal show={openCEModal} onHide={onModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isCreate ? "Thêm mới vai trò" : "Chỉnh sửa vai trò"}
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            id: modalInfo?.id || -1,
            code: modalInfo?.code || "",
            name: modalInfo?.name || "",
            note: modalInfo?.note || "",
          }}
          enableReinitialize
          onSubmit={handleSubmitRole}
          // validationSchema={schema.nullable()}
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
                {modalInfo?.id && (
                  <Form.Group controlId="id_validate">
                    <Form.Label className="text-black">Mã vai trò</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Mã nhân viên"
                      name="id"
                      defaultValue={values.id}
                      onChange={handleChange}
                      isInvalid={touched.id && !!errors.id}
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.id}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
                <Form.Group controlId="name_validate">
                  <Form.Label className="text-black">Mã phòng ban</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Mã phòng ban"
                    name="code"
                    defaultValue={values.code}
                    onChange={handleChange}
                    isInvalid={touched.code && !!errors.code}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.code}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="name_validate">
                  <Form.Label className="text-black">Tên phòng ban</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Tên phòng ban"
                    name="name"
                    defaultValue={values.name}
                    onChange={handleChange}
                    isInvalid={touched.name && !!errors.name}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="note_validate">
                  <Form.Label className="text-black">Chú thích</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Chú thích"
                    name="note"
                    defaultValue={values.note}
                    onChange={handleChange}
                    isInvalid={touched.note && !!errors.note}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.note}
                  </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={onModalClose}>
                  Hủy
                </Button>
                <Button
                  variant="primary"
                  type={"submit"}
                  onClick={onModalClose}
                >
                  Lưu
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
}

export default EmployeeDepartment;
