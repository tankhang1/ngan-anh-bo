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
import { TBrand } from "../../../assets/types";

import { Formik } from "formik";
import { useGetListBrandQuery } from "../../../redux/api/manage/manage.api";
import { ToastContext } from "../../../components/AppToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import AppWarning from "../../../components/AppWarning";
import { useCreateBrandMutation } from "../../../redux/api/setting/setting.api";
import { IconLoader, IconPlus, IconSearch } from "@tabler/icons-react";

function SettingBrandPage() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const toast = useContext(ToastContext);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const deferSearchValue = useDeferredValue(search);
  const [openAddPopup, setOpenAddPopup] = useState<Omit<TBrand, "id"> | null>(
    null
  );

  const {
    data: brands,
    isLoading: isLoadingBrand,
    refetch,
  } = useGetListBrandQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log(brands);
  const [createBrand, { isLoading: isLoadingCreate }] =
    useCreateBrandMutation();
  const onCreateBrand = async (values: Omit<TBrand, "id">) => {
    setOpenAddPopup(null);
    await createBrand(values).then((res) => {
      if (res?.data?.status === -2) {
        toast.showToast("Nhãn hàng đã tồn tại");
        return;
      }
      if (res.data?.status === 0) {
        refetch();
        toast.showToast("Tạo nhãn hàng thành công");
        return;
      }
      toast.showToast("Tạo nhãn hàng thất bại");
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
                      placeholder="Tên nhãn hàng"
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

                  {permission.createBrand && (
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
                        onClick={() => setOpenAddPopup({ name: "", code: "" })}
                      >
                        <IconPlus size={16} />
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
            isLoading={isLoadingBrand}
            headers={[
              {
                key: "code",
                label: "Mã nhãn hàng",
                render: (value) => <td>{value.code}</td>,
              },
              {
                key: "name",
                label: "Tên nhãn hàng",
                render: (value) => <td>{value.name}</td>,
              },
            ]}
            data={brands || []}
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
          onSubmit={onCreateBrand}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <div>
              <Modal.Body>
                <Stack className="d-flex gap-1">
                  <Form.Group controlId="symbol_validate">
                    <Form.Label className="text-black">
                      Mã nhãn hàng <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Mã nhãn hàng"
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
                      Tên nhãn hàng <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Tên nhãn hàng"
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
                        <IconLoader size={19} />
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

export default SettingBrandPage;
