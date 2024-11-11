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
import { GroupCode, TFormulation } from "../../../assets/types";

import { Formik } from "formik";
import { useGetListFormulationQuery } from "../../../redux/api/manage/manage.api";
import { ToastContext } from "../../../components/AppToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import AppWarning from "../../../components/AppWarning";
import {
  useCreateBrandMutation,
  useCreateFormulationMutation,
} from "../../../redux/api/setting/setting.api";
import AppHistory from "../../../components/AppHistory";
import { useLogProductQuery } from "../../../redux/api/log/log.api";

function SettingFormulationPage() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const toast = useContext(ToastContext);
  const [search, setSearch] = useState("");
  const [openedHistory, setOpenHistory] = useState(false);
  const deferSearchValue = useDeferredValue(search);
  const [openAddPopup, setOpenAddPopup] = useState<Omit<
    TFormulation,
    "id"
  > | null>(null);
  const { data: logProductFormulation } = useLogProductQuery(
    {
      group: GroupCode.PRODUCTS_FORMULATION,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !openedHistory,
    }
  );
  const {
    data: formulations,
    isLoading: isLoadingFormulation,
    refetch,
  } = useGetListFormulationQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [createFormulation, { isLoading: isLoadingCreate }] =
    useCreateFormulationMutation();
  const onCreateFormulation = async (values: Omit<TFormulation, "id">) => {
    setOpenAddPopup(null);
    await createFormulation(values).then((res) => {
      if (res?.data?.status === -2) {
        toast.showToast("Dạng thuốc đã tồn tại");
        return;
      }
      if (res.data?.status === 0) {
        refetch();
        toast.showToast("Tạo dạng thuốc thành công");
        return;
      }
      toast.showToast("Tạo dạng thuốc thất bại");
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
                      placeholder="Nhập thông tin"
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

                  {permission.createFormulation && (
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
          title="Thông tin chương trình tích điểm"
          isLoading={isLoadingFormulation}
          headers={[
            {
              key: "code",
              label: "Mã dạng thuốc",
              render: (value) => <td>{value.code}</td>,
            },
            {
              key: "name",
              label: "Tên dạng thuốc",
              render: (value) => <td>{value.name}</td>,
            },
          ]}
          data={formulations || []}
        />
      </Card>
      <AppHistory
        data={logProductFormulation || []}
        opened={openedHistory}
        onClose={setOpenHistory}
      />
      <Modal
        show={openAddPopup !== null}
        onHide={() => setOpenAddPopup(null)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6">Thêm mới dạng khách hàng</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            code: openAddPopup?.code ?? "",
            name: openAddPopup?.name ?? "",
          }}
          onSubmit={onCreateFormulation}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <div>
              <Modal.Body>
                <Stack className="d-flex gap-1">
                  <Form.Group controlId="symbol_validate">
                    <Form.Label className="text-black">
                      Mã dạng thuốc <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Mã dạng thuốc"
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
                      Tên dạng thuốc <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Tên dạng thuốc"
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

export default SettingFormulationPage;
