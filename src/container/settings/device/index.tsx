import React, { Fragment, useContext, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Modal,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { GroupCode, TWarehouseDevice } from "../../../assets/types";
import { format } from "date-fns";
import { Formik } from "formik";
import AppWarning from "../../../components/AppWarning";
import {
  useActiveDeviceKeyMutation,
  useCreateDeviceKeyMutation,
  useGetListWarehouseDevicesQuery,
  useRemoveDeviceKeyMutation,
} from "../../../redux/api/setting/setting.api";
import { ToastContext } from "../../../components/AppToast";
import { useGetListWorkCentersQuery } from "../../../redux/api/media/media.api";
import AppSelect from "../../../components/AppSelect";
import AppHistory from "../../../components/AppHistory";
import { useLogWarehouseQuery } from "../../../redux/api/log/log.api";
const statusMap = new Map([
  [-1, { label: "Mới tạo mã", color: "warning" }],
  [0, { label: "Đang chờ xác thực", color: "warning" }],
  [1, { label: "Hoạt động", color: "success" }],
  [2, { label: "Tạm dừng hoạt động", color: "danger" }],
]);
const DevicePage = () => {
  const toast = useContext(ToastContext);
  const [openAddKey, setOpenAddKey] = useState(false);
  const { data: listDevices, isLoading } = useGetListWarehouseDevicesQuery();
  const [activeDeviceKey] = useActiveDeviceKeyMutation();
  const [removeDeviceKey] = useRemoveDeviceKeyMutation();
  const [openedHistory, setOpenHistory] = useState(false);
  const { data: logWarehouseDevice } = useLogWarehouseQuery(
    {
      group: GroupCode.WAREHOUSE_DEVICES,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [createDeviceKey, { isLoading: isCreateDeviceKey }] =
    useCreateDeviceKeyMutation();
  const { data: listWorkCenters } = useGetListWorkCentersQuery();
  const onCreateNewKey = async (value: { work_center_code: string }) => {
    await createDeviceKey({
      work_center_code: value.work_center_code,
    })
      .unwrap()
      .then((res) => {
        setOpenAddKey(false);
        if (res.status === 0) toast.showToast("Tạo mã key thành công");
        else toast.showToast("Tạo mã key thất bại");
      })
      .catch(() => {
        setOpenAddKey(false);

        toast.showToast("Tạo mã key thất bại");
      });
  };
  const onActiveDeviceKey = async (value: Partial<TWarehouseDevice>) => {
    if (value.device_id && value.work_center_code && value.key)
      await activeDeviceKey({
        device_id: value.device_id,
        work_center_code: value.work_center_code,
        key: value.key,
      })
        .unwrap()
        .then((res) => {
          if (res.status === 0)
            toast.showToast("Kích hoạt thiết bị thành công");
          else toast.showToast("Kích hoạt thiết bị thất bại");
        })
        .catch(() => {
          toast.showToast("Kích hoạt thiết bị thất bại");
        });
    else toast.showToast("Thiết bị chưa kích hoạt");
  };
  const onRemoveDeviceKey = async (value: Partial<TWarehouseDevice>) => {
    if (value.device_id && value.work_center_code && value.key)
      await removeDeviceKey({
        device_id: value.device_id,
        work_center_code: value.work_center_code,
        key: value.key,
      })
        .unwrap()
        .then((res) => {
          if (res.status === 0)
            toast.showToast("Kích hoạt thiết bị thành công");
          else toast.showToast("Kích hoạt thiết bị thất bại");
        })
        .catch(() => {
          toast.showToast("Kích hoạt thiết bị thất bại");
        });
    else toast.showToast("Thiết bị chưa kích hoạt");
  };
  return (
    <Fragment>
      <Card className="custom-card">
        <Card.Body>
          <div className="contact-header">
            <div className="d-sm-flex d-block align-items-center justify-content-between">
              <div className="h5 fw-semibold mb-0">Tìm kiếm thông tin</div>
              <div className="d-flex w-sm-100 mt-sm-0 mt-2 align-items-center gap-2">
                <InputGroup>
                  <Form.Control
                    type="text"
                    className="bg-light"
                    placeholder="Tên thiết bị"
                    aria-describedby="search-contact-member"
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
                <Button
                  variant=""
                  aria-label="button"
                  type="button"
                  className="btn btn-icon btn-success-light ms-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Add Contact"
                  onClick={() => {
                    setOpenAddKey(true);
                  }}
                >
                  <i className="ri-add-line"></i>
                </Button>
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
      <Card className="custom-card">
        <AppTable
          isHeader={false}
          externalSearch={""}
          title="Thông tin tài khoản"
          isLoading={isLoading}
          headers={[
            {
              key: "work_center_code",
              label: "Nhà kho",
              render: (value: TWarehouseDevice) => (
                <td>{value.work_center_code}</td>
              ),
            },
            {
              key: "key",
              label: "Mã kích hoạt",
              render: (value: TWarehouseDevice) => <td>{value.key}</td>,
            },
            {
              key: "status",
              label: "Trạng thái",
              render: (value: TWarehouseDevice) => (
                <td>
                  <Badge bg={statusMap.get(value.status)?.color}>
                    {statusMap.get(value.status)?.label}
                  </Badge>
                </td>
              ),
            },
            {
              key: "domain",
              label: "Tên miền",
              render: (value: TWarehouseDevice) => <td>{value.domain}</td>,
            },
            {
              key: "device_name",
              label: "Tên thiết bị",
              render: (value: TWarehouseDevice) => <td>{value.device_name}</td>,
            },
            {
              key: "time_authen",
              label: "Thời gian xác thực",
              render: (value: TWarehouseDevice) => (
                <td>
                  {value?.time_authen
                    ? format(new Date(value.time_authen), "dd/MM/yyyy HH:mm:ss")
                    : ""}
                </td>
              ),
            },
            {
              key: "time_created",
              label: "Thời gian tạo",
              render: (value: TWarehouseDevice) => (
                <td>
                  {value?.time_created
                    ? format(
                        new Date(value.time_created),
                        "dd/MM/yyyy HH:mm:ss"
                      )
                    : ""}
                </td>
              ),
            },
            {
              key: "time_updated",
              label: "Thời gian cập nhật",
              render: (value: TWarehouseDevice) => (
                <td>
                  {value?.time_updated
                    ? format(
                        new Date(value.time_updated),
                        "dd/MM/yyyy HH:mm:ss"
                      )
                    : ""}
                </td>
              ),
            },
            {
              key: "",
              label: "Chức năng",
              render: (value) => (
                <td className="d-flex justify-content-center align-item-center">
                  {value.status === 1 ? (
                    <AppWarning onAccept={() => onRemoveDeviceKey(value)}>
                      <button className="btn btn-icon btn-sm btn-danger-ghost">
                        <i className="ti ti-trash"></i>
                      </button>
                    </AppWarning>
                  ) : (
                    value.status !== -1 && (
                      <AppWarning onAccept={() => onActiveDeviceKey(value)}>
                        <button className="btn btn-icon btn-sm btn-success">
                          <i className="ti ti-check"></i>
                        </button>
                      </AppWarning>
                    )
                  )}
                </td>
              ),
            },
          ]}
          data={listDevices || []}
        />
      </Card>
      <AppHistory
        data={logWarehouseDevice}
        opened={openedHistory}
        onClose={setOpenHistory}
      />
      <Modal
        show={openAddKey}
        onHide={() => setOpenAddKey(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6">Thêm mới mã xác thực</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              work_center_code: "",
            }}
            onSubmit={onCreateNewKey}
          >
            {({ handleSubmit, setFieldValue, touched, errors }) => (
              <div>
                <Modal.Body>
                  <Stack className="d-flex gap-1">
                    <Form.Group controlId="username_validate">
                      <Form.Label className="text-black form-required">
                        Mã nhà kho <span style={{ color: "red" }}>*</span>
                      </Form.Label>

                      <AppSelect
                        onChange={(value) =>
                          setFieldValue("work_center_code", value)
                        }
                        data={listWorkCenters || []}
                        placeholder="Chọn nhà kho"
                        isInValid={
                          !!errors.work_center_code && touched.work_center_code
                        }
                        errorText={errors.work_center_code}
                      />
                    </Form.Group>
                  </Stack>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setOpenAddKey(false)}
                  >
                    Đóng
                  </Button>

                  <AppWarning onAccept={() => handleSubmit()}>
                    <Button
                      variant="primary"
                      className={`btn justify-content-center align-items-center ${
                        isCreateDeviceKey && "btn-loader "
                      }
                        `}
                    >
                      <span>Xác nhận</span>
                      {isCreateDeviceKey && (
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
};

export default DevicePage;
