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
import { TGroupCustomer } from "../../../assets/types";
import AppId from "../../../components/common/app-id";

import { Formik } from "formik";
import { useGetListGroupObjectiveQuery } from "../../../redux/api/manage/manage.api";
import { useCreateUpdateGroupObjectiveMutation } from "../../../redux/api/other/other.api";
import { ToastContext } from "../../../components/AppToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

function SettingGroupCustomer() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const toast = useContext(ToastContext);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("symbol");
  const deferSearchValue = useDeferredValue(search);
  const [openAddPopup, setOpenAddPopup] = useState<TGroupCustomer | null>(null);

  const {
    data: groups,
    isLoading: isLoadingGroup,
    refetch,
  } = useGetListGroupObjectiveQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const [createUpdateGroup] = useCreateUpdateGroupObjectiveMutation();
  const onCreateUpdateGroup = async (values: TGroupCustomer) => {
    setOpenAddPopup(null);
    await createUpdateGroup(values).then((res) => {
      if (res?.data?.status === -2) {
        toast.showToast("Nhóm khách hàng đã tồn tại");
        return;
      }
      if (res.data?.status === 0) {
        refetch();
        toast.showToast("Tạo nhóm khách hàng thành công");
        return;
      }
      toast.showToast("Tạo nhóm khách hàng thất bại");
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

                  {permission.createSettingGroupCustomer && (
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
                          setOpenAddPopup({ name: "", prefix: "", symbol: "" })
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
            title="Thông tin chương trình tích điểm"
            isLoading={isLoadingGroup}
            headers={[
              {
                key: "id",
                label: "ID",
                render: (value: TGroupCustomer) => (
                  <td>
                    <AppId id={value.id ?? ""} />
                  </td>
                ),
              },
              {
                key: "symbol",
                label: "Mã",
                render: (value: TGroupCustomer) => <td>{value.symbol}</td>,
              },
              {
                key: "prefix",
                label: "Tên tiền tố",
                render: (value: TGroupCustomer) => (
                  <td>{value.prefix?.toUpperCase()}</td>
                ),
              },
              {
                key: "name",
                label: "Tên nhóm khách hàng",
                render: (value: TGroupCustomer) => <td>{value.name}</td>,
              },

              permission.editSettingGroupCustomer
                ? {
                    key: "",
                    label: "Chức năng",
                    render: (value) => {
                      console.log(value);
                      return (
                        <td>
                          <span className="d-flex justify-content-center align-item-center">
                            <button
                              className="btn btn-icon btn-sm btn-primary-ghost"
                              onClick={() => {
                                setOpenAddPopup(value);
                              }}
                            >
                              <i className="ti ti-edit"></i>
                            </button>
                          </span>
                        </td>
                      );
                    },
                  }
                : undefined,
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
          <Modal.Title as="h6">Thêm mới nhóm khách hàng</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            name: openAddPopup?.name ?? "",
            prefix: openAddPopup?.prefix ?? "",
            symbol: openAddPopup?.symbol ?? "",
          }}
          onSubmit={onCreateUpdateGroup}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <Stack className="d-flex gap-1">
                  <Form.Group controlId="symbol_validate">
                    <Form.Label className="text-black">
                      Mã nhóm khách hàng
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      id="symbol_validate"
                      placeholder="Mã nhóm khách hàng"
                      name="symbol"
                      defaultValue={values.symbol}
                      onChange={handleChange}
                      isInvalid={touched.symbol && !!errors.symbol}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.symbol}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="prefix_validate">
                    <Form.Label className="text-black">Tiền tố</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      id="prefix_validate"
                      placeholder="Tiền tố"
                      name="prefix"
                      defaultValue={values.prefix}
                      onChange={handleChange}
                      isInvalid={touched.prefix && !!errors.prefix}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.prefix}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="name_validate">
                    <Form.Label className="text-black">
                      Tên nhóm khách hàng
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      id="name_validate"
                      defaultValue={values.name}
                      placeholder="Tên nhóm khách hàng"
                      name="name"
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
                <Button variant="primary" type="submit">
                  Xác nhận
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
}

export default SettingGroupCustomer;
