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
import { TIndication } from "../../../assets/types";

import { Formik } from "formik";
import { useGetListIndicationQuery } from "../../../redux/api/manage/manage.api";
import { ToastContext } from "../../../components/AppToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import AppWarning from "../../../components/AppWarning";
import { useCreateIndicationMutation } from "../../../redux/api/setting/setting.api";

function SettingIndicationPage() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const toast = useContext(ToastContext);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const deferSearchValue = useDeferredValue(search);
  const [openAddPopup, setOpenAddPopup] = useState<Omit<
    TIndication,
    "id"
  > | null>(null);

  const {
    data: indications,
    isLoading: isLoadingIndication,
    refetch,
  } = useGetListIndicationQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [createIndication, { isLoading: isLoadingCreate }] =
    useCreateIndicationMutation();
  const onCreateIndication = async (values: Omit<TIndication, "id">) => {
    setOpenAddPopup(null);
    await createIndication(values).then((res) => {
      if (res?.data?.status === -2) {
        toast.showToast("Nhóm thuốc đã tồn tại");
        return;
      }
      if (res.data?.status === 0) {
        refetch();
        toast.showToast("Tạo nhóm thuốc thành công");
        return;
      }
      toast.showToast("Tạo nhóm thuốc thất bại");
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
                      placeholder="Nhập nhóm thuốc"
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

                  {permission.createIndication && (
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
                        onClick={() => setOpenAddPopup({ name: "", code: "" })}
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
            title="Thông tin chương trình tích điểm"
            isLoading={isLoadingIndication}
            headers={[
              {
                key: "code",
                label: "Mã nhóm thuốc",
                render: (value) => <td>{value.code}</td>,
              },
              {
                key: "name",
                label: "Tên nhóm thuốc",
                render: (value) => <td>{value.name}</td>,
              },
            ]}
            data={indications || []}
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
          <Modal.Title as="h6">Thêm mới nhóm khách hàng</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            code: openAddPopup?.code ?? "",
            name: openAddPopup?.name ?? "",
          }}
          onSubmit={onCreateIndication}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <div>
              <Modal.Body>
                <Stack className="d-flex gap-1">
                  <Form.Group controlId="symbol_validate">
                    <Form.Label className="text-black">
                      Mã nhóm thuốc <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Mã nhóm thuốc"
                      name="code"
                      defaultValue={values.code}
                      onChange={handleChange}
                      isInvalid={touched.code && !!errors.code}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.code}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="symbol_validate">
                    <Form.Label className="text-black">
                      Tên nhóm thuốc <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Tên nhóm thuốc"
                      name="name"
                      defaultValue={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
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
                <AppWarning onAccept={() => handleSubmit()}>
                  <Button
                    variant="primary"
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
                </AppWarning>
              </Modal.Footer>
            </div>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
}

export default SettingIndicationPage;
