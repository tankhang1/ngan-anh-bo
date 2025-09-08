import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Image,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import { Formik } from "formik";
import Chip from "@mui/material/Chip";
import { ToastContext } from "../../../components/AppToast";
import AppTable from "../../../components/common/table/table";
import {
  useCreateLuckyPresentLandingMutation,
  useDeleteLuckyPresentLandingMutation,
  useGetLuckyPresentLandingQuery,
  useUpdateLuckyPresentLandingMutation,
} from "../../../redux/api/program-chance/program-chance.api";
import { useUploadLandingProgramFileMutation } from "../../../redux/api/media/media.api";
import { BASE_PORT } from "../../../constants";
import { fDate } from "../../../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useCheckTokenExpiredMutation } from "../../../redux/api/other/other.api";
import { TPresentLanding, TUserLuckyPresent } from "../../../assets/types";
import { format } from "date-fns";
import { useGetListUserLuckyPresentQuery } from "../../../redux/api/program/program.api";

// ---------- Utilities ----------
const removeVietnameseTones = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .replace(/\s+/g, "");

function LandingProgram() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((s: RootState) => s.auth);
  const toast = useContext(ToastContext);

  const [openProgramPresentForm, setOpenProgramPresentForm] = useState(false);

  // API hooks
  const { data: listPresent } = useGetLuckyPresentLandingQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const { data: listUserLuckyPresent } = useGetListUserLuckyPresentQuery(
    undefined,
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const [uploadImage, { isLoading: isLoadingUploadFile }] =
    useUploadLandingProgramFileMutation();

  const [createLanding, { isLoading: isLoadingCreateLanding }] =
    useCreateLuckyPresentLandingMutation();
  const [updateLanding, { isLoading: isLoadingUpdateLanding }] =
    useUpdateLuckyPresentLandingMutation();
  const [removeLanding] = useDeleteLuckyPresentLandingMutation();

  const [checkToken] = useCheckTokenExpiredMutation();

  // Editing record (optional)
  const [editing, setEditing] = useState<TPresentLanding | undefined>(
    undefined
  );

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

  // Upload helper — returns public URL
  const onHandleUploadProgramPrensentImageSubmit = async (
    file: File,
    gift: string
  ): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("files", file);
      await uploadImage({ id: gift, body: formData }).unwrap();
      return `${BASE_PORT}/program-image/${gift}.jpg`;
    } catch (e) {
      console.error(e);
      toast?.showToast?.("Upload hình ảnh thất bại");
      return "";
    }
  };

  // Submit handler (create/update by presence of id)
  const onHandlePresent = async (values: TPresentLanding) => {
    try {
      if (values.id) {
        await updateLanding(values).unwrap();
        toast?.showToast?.("Cập nhật thành công");
      } else {
        await createLanding(values).unwrap();
        toast?.showToast?.("Tạo mới thành công");
      }
      setOpenProgramPresentForm(false);
    } catch (e: any) {
      console.error(e);
      toast?.showToast?.("Thao tác thất bại");
    }
  };

  return (
    <Fragment>
      <Card className="custom-card">
        <Card.Body>
          <Row className="g-4">
            {/* Danh sách người chơi */}
            <Col lg={6} md={12}>
              <AppTable
                isHeader={true}
                title="Danh sách người chơi"
                headers={[
                  {
                    key: "id",
                    label: "Mã người chơi",
                    render: (row: TUserLuckyPresent) => (
                      <td>
                        <span className="fw-semibold">{row.id}</span>
                      </td>
                    ),
                  },
                  {
                    key: "phone",
                    label: "Số điện thoại",
                    render: (row: TUserLuckyPresent) => <td>{row.phone}</td>,
                  },
                  {
                    key: "name",
                    label: "Tên người chơi",
                    render: (row: TUserLuckyPresent) => <td>{row.name}</td>,
                  },
                  {
                    key: "award_name",
                    label: "Giải thưởng",
                    render: (row: TUserLuckyPresent) => (
                      <td>{row.award_name}</td>
                    ),
                  },
                  {
                    key: "status",
                    label: "Trạng thái",
                    render: (row: TUserLuckyPresent) => (
                      <td>
                        {row.status === 0 && (
                          <span className="badge bg-success">Đã tham gia</span>
                        )}
                        {row.status === -1 && (
                          <span className="badge bg-secondary">
                            Đã xác nhận
                          </span>
                        )}
                      </td>
                    ),
                  },
                ]}
                data={
                  listUserLuckyPresent?.filter((item) => item.status !== -1) ||
                  []
                }
              />
            </Col>

            {/* Cơ cấu giải */}
            <Col lg={6} md={12}>
              <AppTable
                title="Cơ cấu giải"
                isHeader={true}
                headerRightSection={
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditing(undefined);
                      setOpenProgramPresentForm(true);
                    }}
                  >
                    + Thêm mới
                  </Button>
                }
                headers={[
                  {
                    key: "image_gift",
                    label: "Hình ảnh",
                    render: (row: TPresentLanding) => (
                      <td>
                        <Image
                          src={
                            row.image_gift ||
                            "https://www.laminationsonline.com/wp-content/uploads/2019/03/placeholder-400x300.png"
                          }
                          width={80}
                          height={50}
                          className="object-contain rounded"
                        />
                      </td>
                    ),
                  },
                  {
                    key: "gift_name",
                    label: "Tên quà",
                    render: (row: TPresentLanding) => <td>{row.gift_name}</td>,
                  },
                  {
                    key: "percent",
                    label: "Tỉ lệ (%)",
                    render: (row: TPresentLanding) => <td>{row.percent}</td>,
                  },
                  {
                    key: "limits",
                    label: "Số lượng",
                    render: (row: TPresentLanding) => <td>{row.limits}</td>,
                  },
                  {
                    key: "actions",
                    label: "Chức năng",
                    render: (row: TPresentLanding) => (
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="light"
                            className="btn btn-sm"
                          >
                            <i className="ti ti-dots-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => {
                                setEditing(row);
                                setOpenProgramPresentForm(true);
                              }}
                            >
                              Cập nhật
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-danger"
                              onClick={async () => {
                                try {
                                  await removeLanding({
                                    gift: row.gift,
                                  }).unwrap();
                                  toast.showToast("Đã xoá");
                                } catch {
                                  toast.showToast("Xoá thất bại");
                                }
                              }}
                            >
                              Xoá
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    ),
                  },
                ]}
                data={listPresent || []}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal
        show={openProgramPresentForm}
        onHide={() => setOpenProgramPresentForm(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6">Cơ cấu giải thưởng</Modal.Title>
        </Modal.Header>

        <Modal.Body className="overflow-y-scroll" style={{ maxHeight: 600 }}>
          <Formik<TPresentLanding>
            initialValues={{
              id: editing?.id || 0,
              gift: editing?.gift || "",
              gift_name: editing?.gift_name || "",
              time_start: editing?.time_start || 0,
              time_end: editing?.time_end || 0,
              percent: editing?.percent ?? 0,
              limits: editing?.limits ?? 0,
              image_gift: editing?.image_gift || "",
              giftType:
                editing?.gift?.startsWith("topup-10-") ||
                editing?.gift?.startsWith("topup-20-") ||
                editing?.gift?.startsWith("topup-50-") ||
                editing?.gift?.startsWith("topup-100-") ||
                editing?.gift?.startsWith("topup-200-") ||
                editing?.gift?.startsWith("topup-500-")
                  ? (editing?.gift.match(
                      /^topup-(10|20|50|100|200|500)-/
                    )?.[0] as any)
                  : "other",
            }}
            enableReinitialize
            onSubmit={onHandlePresent}
          >
            {({ handleSubmit, setFieldValue, values, touched, errors }) => (
              <Stack gap={2}>
                <Form.Group>
                  <Form.Label className="text-black">
                    Mã quà<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="VD: xemayairblack"
                    name="gift"
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (values.giftType !== "other") {
                        if (raw.startsWith(values.giftType!)) {
                          setFieldValue("gift", removeVietnameseTones(raw));
                        }
                      } else {
                        setFieldValue("gift", removeVietnameseTones(raw));
                      }
                    }}
                    value={values.gift}
                    isInvalid={touched.gift && !!errors.gift}
                    className="input-placeholder"
                  />
                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-black">
                    Tên quà<span style={{ color: "red" }}>*</span>
                  </Form.Label>

                  <div className="mb-2 pb-1 overflow-x-auto d-flex gap-2">
                    {[
                      { label: "Khác", value: "other" },
                      { label: "Topup 10K", value: "topup-10-" },
                      { label: "Topup 20K", value: "topup-20-" },
                      { label: "Topup 50K", value: "topup-50-" },
                      { label: "Topup 100K", value: "topup-100-" },
                      { label: "Topup 200K", value: "topup-200-" },
                      { label: "Topup 500K", value: "topup-500-" },
                    ].map((opt) => (
                      <Chip
                        key={opt.value}
                        label={opt.label}
                        variant={
                          values.giftType === opt.value ? "filled" : "outlined"
                        }
                        color={
                          values.giftType === opt.value
                            ? "secondary"
                            : "default"
                        }
                        onClick={() => {
                          setFieldValue("giftType", opt.value);
                          if (opt.value === "other") {
                            setFieldValue("gift_name", "");
                            setFieldValue("gift", "");
                          } else {
                            setFieldValue("gift_name", opt.label);
                            setFieldValue("gift", opt.value);
                          }
                        }}
                      />
                    ))}
                  </div>

                  <Form.Control
                    required
                    type="text"
                    placeholder="VD: Xe máy Airblade"
                    name="gift_name"
                    onChange={(e) => {
                      const name = e.target.value;
                      setFieldValue("gift_name", name);
                      if (values.giftType === "other") {
                        setFieldValue("gift", removeVietnameseTones(name));
                      }
                    }}
                    value={values.gift_name}
                    isInvalid={touched.gift_name && !!errors.gift_name}
                    className="input-placeholder"
                  />
                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-black">
                    Hình ảnh <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div className="position-relative">
                    <Image
                      src={
                        values.image_gift ||
                        "https://www.laminationsonline.com/wp-content/uploads/2019/03/placeholder-400x300.png"
                      }
                      style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.5rem",
                        width: "100%",
                        height: 300,
                        objectFit: "cover",
                        backgroundColor: "#f3f4f6",
                      }}
                    />
                    <Button
                      className={`btn btn-icon position-absolute ${
                        isLoadingUploadFile && "btn-loader"
                      }`}
                      style={{ top: 10, right: 10 }}
                      size="sm"
                      onClick={() =>
                        document.getElementById("fileInput1")?.click()
                      }
                    >
                      {isLoadingUploadFile ? (
                        <span className="loading">
                          <i className="ri-loader-2-fill fs-19"></i>
                        </span>
                      ) : (
                        <i className="ti ti-edit"></i>
                      )}
                    </Button>
                    <input
                      id="fileInput1"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const url =
                          await onHandleUploadProgramPrensentImageSubmit(
                            file,
                            values.gift || "gift"
                          );
                        if (url) setFieldValue("image_gift", url);
                      }}
                    />
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-black">Ngày bắt đầu</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    onKeyDown={(e) => e.preventDefault()}
                    placeholder="Ngày bắt đầu"
                    name="time_start"
                    className="input-placeholder"
                    lang="vi"
                    onChange={(e) =>
                      setFieldValue(
                        "time_start",
                        Number(format(e.target.value, "yyyyMMdd"))
                      )
                    }
                    value={fDate(values.time_start || 0)}
                    min={
                      new Date(new Date().setDate(new Date().getDate() + 2))
                        .toISOString()
                        .split("T")[0]
                    }
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-black">Ngày kết thúc</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    onKeyDown={(e) => e.preventDefault()}
                    placeholder="Ngày kết thúc"
                    name="time_end"
                    className="input-placeholder"
                    lang="vi"
                    onChange={(e) =>
                      setFieldValue(
                        "time_end",
                        Number(format(e.target.value, "yyyyMMdd"))
                      )
                    }
                    value={fDate(values.time_end || 0)}
                    min={
                      new Date(
                        values?.time_start
                          ? fDate(values.time_start)
                          : new Date()
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-black">
                    Tỉ lệ trúng <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="VD: 10"
                    name="percent"
                    onChange={(e) =>
                      setFieldValue("percent", Number(e.target.value))
                    }
                    value={values.percent}
                    min={0}
                    max={100}
                    className="input-placeholder"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-black">
                    Số lượng <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="VD: 5"
                    name="limits"
                    min={0}
                    onChange={(e) =>
                      setFieldValue("limits", Number(e.target.value))
                    }
                    value={values.limits}
                    className="input-placeholder"
                  />
                </Form.Group>

                <Modal.Footer>
                  <Button
                    variant="primary"
                    className={`btn justify-content-center align-items-center ${
                      (isLoadingCreateLanding || isLoadingUpdateLanding) &&
                      "btn-loader"
                    }`}
                    onClick={() => handleSubmit()}
                  >
                    <span>Lưu</span>
                    {(isLoadingCreateLanding || isLoadingUpdateLanding) && (
                      <span className="loading">
                        <i className="ri-loader-2-fill fs-19"></i>
                      </span>
                    )}
                  </Button>
                </Modal.Footer>
              </Stack>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default LandingProgram;
