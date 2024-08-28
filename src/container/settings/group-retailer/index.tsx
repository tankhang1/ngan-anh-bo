import React, { Fragment, useContext, useDeferredValue, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { TGroupRetailer } from "../../../assets/types";
import AppId from "../../../components/common/app-id";

import { Formik } from "formik";
import { useGetListGroupRetailerQuery } from "../../../redux/api/manage/manage.api";
import { ToastContext } from "../../../components/AppToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useCreateGroupRetailerMutation } from "../../../redux/api/setting/setting.api";

function SettingGroupRetailer() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const toast = useContext(ToastContext);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("code");
  const deferSearchValue = useDeferredValue(search);
  const [openAddPopup, setOpenAddPopup] = useState<TGroupRetailer | null>(null);

  const {
    data: groups,
    isLoading: isLoadingGroup,
    refetch,
  } = useGetListGroupRetailerQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [createGroupRetailer, { isLoading: isLoadingCreate }] =
    useCreateGroupRetailerMutation();
  const onCreateUpdateGroup = async (values: TGroupRetailer) => {
    console.log(values);
    setOpenAddPopup(null);
    await createGroupRetailer(values).then((res) => {
      console.log(res);
      if (res?.data?.status === -2) {
        toast.showToast("Nhóm đại lý đã tồn tại");
        return;
      }
      if (res.data?.status === 0) {
        refetch();
        toast.showToast("Tạo nhóm đại lý thành công");
        return;
      }
      toast.showToast("Tạo nhóm đại lý thất bại");
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

                  {permission.createRetailerGroup && (
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
                        onClick={() =>
                          setOpenAddPopup({ name: "", code: "", note: "" })
                        }
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
            title="Thông tin nhóm đại lý"
            isLoading={isLoadingGroup}
            maxPage={groups?.length}
            headers={[
              {
                key: "id",
                label: "ID",
                render: (value: TGroupRetailer) => (
                  <td>
                    <AppId id={value.id ?? ""} />
                  </td>
                ),
              },
              {
                key: "code",
                label: "Mã",
                render: (value: TGroupRetailer) => <td>{value.code}</td>,
              },
              {
                key: "name",
                label: "Tên nhóm đại lý",
                render: (value: TGroupRetailer) => <td>{value.name}</td>,
              },
              {
                key: "note",
                label: "Ghi chú",
                render: (value: TGroupRetailer) => <td>{value.note}</td>,
              },
            ]}
            data={groups || []}
            searchByExternal={searchBy}
          />
        </Card>
      </Col>
      <Modal
        show={openAddPopup !== null}
        onHide={() => setOpenAddPopup(null)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6">Thêm mới nhóm đại lý</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            name: openAddPopup?.name ?? "",
            code: openAddPopup?.code ?? "",
            note: openAddPopup?.note ?? "",
          }}
          onSubmit={onCreateUpdateGroup}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <Stack className="d-flex gap-1">
                  <Form.Group>
                    <Form.Label className="text-black">
                      Mã nhóm đại lý <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Mã nhóm đại lý"
                      name="code"
                      defaultValue={values.code}
                      onChange={handleChange}
                      isInvalid={touched.code && !!errors.code}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.code}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text-black">
                      Tên nhóm đại lý <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Tên nhóm đại lý"
                      name="name"
                      defaultValue={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="text-black">Ghi chú</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      defaultValue={values.note}
                      placeholder="Ghi chú"
                      name="note"
                      onChange={handleChange}
                      isInvalid={touched.note && !!errors.note}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.note}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Stack>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setOpenAddPopup(null)}
                >
                  Đóng
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className={`btn justify-content-center align-items-center ${
                    isLoadingCreate && "btn-loader "
                  }`}
                >
                  <span>Xác nhận</span>
                  {isLoadingCreate && (
                    <span className="loading">
                      <i className="ri-loader-2-fill fs-19"></i>
                    </span>
                  )}
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
}

export default SettingGroupRetailer;
