import React, { Fragment, useContext, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Image,
  Modal,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { TPresent, TPresentType, TProgramChance } from "../../../assets/types";
import AppHistory from "../../../components/AppHistory";
import {
  useCreateProgramPresentFarmerMutation,
  useCreateProgramPresentRetailerMutation,
  useGetListProgramPresentFarmerQuery,
  useGetListProgramPresentRetailerQuery,
  useGetProgramFarmerQuery,
  useGetProgramRetailerQuery,
  useUpdateProgramFarmerMutation,
  useUpdateProgramPresentFarmerMutation,
  useUpdateProgramPresentRetailerMutation,
  useUpdateProgramRetailerMutation,
} from "../../../redux/api/program-chance/program-chance.api";
import AppTable from "../../../components/common/table/table";
import {
  useGetListProvinceQuery,
  useUploadProgramFileMutation,
} from "../../../redux/api/media/media.api";
import { useGetListProductsQuery } from "../../../redux/api/info/info.api";
import { Divider } from "@mui/material";
import Chip from "@mui/material/Chip";
import { BASE_PORT } from "../../../constants";
import Select from "react-select";
import Editor from "../../forms/formeditors/formeditordata";
import { Formik } from "formik";
import { format } from "date-fns";
import { ToastContext } from "../../../components/AppToast";
import { fDate } from "../../../hooks";

const TypeBinExport = new Map([
  ["SALE", "Hàng hóa"],
  ["MARKETING", "Hàng quảng bá"],
  ["BORROW", "Hàng mượn"],
  ["PROMOTION", "Hàng khuyến mãi"],
]);
function ChanceProgram() {
  const toast = useContext(ToastContext);
  const [openedHistory, setOpenHistory] = useState(false);
  const [activeTab, setActiveTab] = useState<TPresentType>("FARMER");
  const [openProgramInfoForm, setOpenProgramInfoForm] = useState(false);
  const [openProgramPresentForm, setOpenProgramPresentForm] = useState(false);
  const [openPolicyForm, setOpenPolicyForm] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [uploadImage, { isLoading: isLoadingUploadFile }] =
    useUploadProgramFileMutation();
  const [present, setPresent] = useState<TPresent>();
  const { data: programFarmer } = useGetProgramFarmerQuery(undefined, {
    skip: activeTab === "RETAILER",
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const { data: programRetailer } = useGetProgramRetailerQuery(undefined, {
    skip: activeTab === "FARMER",
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const { data: listPresentFarmer } = useGetListProgramPresentFarmerQuery(
    undefined,
    {
      skip: activeTab === "RETAILER",
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  const { data: listPresentRetailer } = useGetListProgramPresentRetailerQuery(
    undefined,
    {
      skip: activeTab === "FARMER",
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  const [updateProgramFarmer, { isLoading: isLoadingUpdateProgramFarmer }] =
    useUpdateProgramFarmerMutation();
  const [updateProgramRetailer, { isLoading: isLoadingUpdateProgramRetailer }] =
    useUpdateProgramRetailerMutation();
  const [
    createProgramPresentFarmer,
    { isLoading: isLoadingCreateProgramPresentFarmer },
  ] = useCreateProgramPresentFarmerMutation();
  const [
    createProgramPresentRetailer,
    { isLoading: isLoadingCreateProgramPresentRetailer },
  ] = useCreateProgramPresentRetailerMutation();
  const [
    updateProgramPresentRetailer,
    { isLoading: isLoadingUpdateProgramPresentRetailer },
  ] = useUpdateProgramPresentRetailerMutation();
  const [
    updateProgramPresentFarmer,
    { isLoading: isLoadingUpdateProgramPresentFarmer },
  ] = useUpdateProgramPresentFarmerMutation();
  const { data: listProvince } = useGetListProvinceQuery();
  const { data: listProducts } = useGetListProductsQuery();
  const programInfo = useMemo(
    () => (activeTab === "FARMER" ? programFarmer : programRetailer),
    [programFarmer, programRetailer, activeTab, isLoadingUpdateProgramFarmer]
  );
  const presents = useMemo(
    () => (activeTab === "FARMER" ? listPresentFarmer : listPresentRetailer),
    [listPresentFarmer, listPresentRetailer, activeTab]
  );
  const getListProvinceLabel = (value: string) => {
    const listCodes = value.split(",");
    const listLabel: string[] = [];
    listCodes.forEach((code) => {
      const province =
        listProvince?.find((province) => province.code === code)?.name || "";
      listLabel.push(province);
    });
    return listLabel.join(", ");
  };
  const getListProductLabel = (value: string) => {
    const listCodes = value.split(",");
    const listLabel: {
      category_name: string;
      code: string;
      description: string;
      brand_name: string;
    }[] = [];
    listCodes.forEach((code) => {
      const product = listProducts?.find((product) => product.code === code);
      if (product)
        listLabel.push({
          code: product.code,
          description: product.description,
          brand_name: product.brand_name,
          category_name: product.category_name,
        });
    });
    return listLabel;
  };
  const onHandleProgramInfoSubmit = async (values: TProgramChance) => {
    console.log("submit", values);
    if (activeTab === "FARMER") {
      await updateProgramFarmer(values)
        .unwrap()
        .then((value) => {
          if (value.status === 0) {
            toast.showToast("Cập nhật thông tin chương trình thành công");
          } else {
            toast.showToast(value.message);
          }
          setOpenProgramInfoForm(false);
          setOpenPolicyForm(false);

          return;
        })
        .catch(() => {
          toast.showToast("Cập nhật thông tin chương trình thất bại");
          return;
        });
    } else {
      await updateProgramRetailer(values)
        .unwrap()
        .then((value) => {
          if (value.status === 0) {
            toast.showToast("Cập nhật thông tin chương trình thành công");
          } else {
            toast.showToast(value.message);
          }
          setOpenProgramInfoForm(false);
          setOpenPolicyForm(false);

          return;
        })
        .catch(() => {
          toast.showToast("Cập nhật thông tin chương trình thất bại");
          return;
        });
    }
  };
  const onHandleUploadProgramImageSubmit = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);
    console.log(formData);
    try {
      await uploadImage({
        id: activeTab,
        body: formData,
      });

      onHandleProgramInfoSubmit({
        ...programInfo,
        image: `${BASE_PORT}/program-image/${activeTab}.jpg`,
      } as any);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  const onHandleUploadProgramPrensentImageSubmit = async (
    file: File,
    gift: string
  ) => {
    const formData = new FormData();
    formData.append("files", file);
    console.log(formData);
    try {
      await uploadImage({
        id: gift,
        body: formData,
      });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  const removeVietnameseTones = (str: string) => {
    return str
      .normalize("NFD") // Tách dấu khỏi ký tự
      .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
      .replace(/đ/g, "d") // Chuyển đ → d
      .replace(/Đ/g, "d") // Chuyển Đ → d
      .toLowerCase() // Viết thường
      .replace(/\s+/g, ""); // Xóa dấu cách
  };
  const onHandlePresent = async (values: TPresent) => {
    if (activeTab === "FARMER") {
      if (!present) {
        await createProgramPresentFarmer(values)
          .unwrap()
          .then((value) => {
            if (value.status === 0) {
              toast.showToast("Tạo mới quà tặng thành công");
            } else {
              toast.showToast(value.message);
            }
            setOpenProgramPresentForm(false);
          })
          .catch(() => {
            toast.showToast("Tạo mới quà tặng thất bại");
          })
          .finally(() => {
            setPresent(undefined);
          });
      } else {
        await updateProgramPresentFarmer(values)
          .unwrap()
          .then((value) => {
            setOpenProgramPresentForm(false);
            if (value.status === 0) {
              toast.showToast("Cập nhật quà tặng thành công");
            } else {
              toast.showToast(value.message);
            }
          })
          .catch(() => {
            toast.showToast("Cập nhật quà tặng thất bại");
          })
          .finally(() => {
            setPresent(undefined);
          });
      }
    } else {
      if (!present) {
        await createProgramPresentRetailer(values)
          .unwrap()
          .then((value) => {
            if (value.status === 0) {
              toast.showToast("Tạo mới quà tặng thành công");
            } else {
              toast.showToast(value.message);
            }
            setOpenProgramPresentForm(false);
          })
          .catch(() => {
            toast.showToast("Tạo mới quà tặng thất bại");
          })
          .finally(() => {
            setPresent(undefined);
          });
      } else {
        await updateProgramPresentRetailer(values)
          .unwrap()
          .then((value) => {
            setOpenProgramPresentForm(false);
            if (value.status === 0) {
              toast.showToast("Cập nhật quà tặng thành công");
            } else {
              toast.showToast(value.message);
            }
          })
          .catch(() => {
            toast.showToast("Cập nhật quà tặng thất bại");
          })
          .finally(() => {
            setPresent(undefined);
          });
      }
    }
  };
  return (
    <Fragment>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body>
            <div className="contact-header">
              <div className="d-sm-flex d-block align-items-center justify-content-between">
                <div className="h5 fw-semibold mb-0">Chọn đối tượng</div>
                <div className="d-flex w-sm-100 mt-sm-0 mt-2 align-items-center">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {activeTab === "RETAILER" ? "Đại lý" : "Nông dân"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setActiveTab("RETAILER")}>
                        Đại lý
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setActiveTab("FARMER")}>
                        Nông dân
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
        <Card.Body
          style={{
            display: "grid",
            gridTemplateColumns: "40% 59%",
            gap: "1rem",
          }}
        >
          <div>
            <div className=" position-relative">
              <Image
                src={programInfo?.image || "https://placehold.jp/400x200.png"}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  width: "100%",
                  backgroundColor: "#f3f4f6",
                }}
              ></Image>
              <Button
                className={`btn btn-icon position-absolute ${
                  isLoadingUploadFile && "btn-loader"
                }`}
                style={{ top: 10, right: 10 }}
                size="sm"
                onClick={() => document.getElementById("fileInput")?.click()}
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
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    onHandleUploadProgramImageSubmit(file);
                  }
                }}
              />
            </div>

            <Stack
              gap={2}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "1rem",
                marginTop: "1rem",
              }}
            >
              <Stack direction="horizontal" className="justify-content-between">
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Thông tin chương trình
                </h3>
                <Button size="sm" onClick={() => setOpenProgramInfoForm(true)}>
                  Chỉnh sửa
                </Button>
              </Stack>
              <Divider />
              <Stack direction="vertical" gap={2}>
                <h3
                  style={{
                    fontSize: "1.115rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Tên chương trình:{" "}
                  <span style={{ fontSize: "1rem", fontWeight: "normal" }}>
                    {programInfo?.name || ""}
                  </span>
                </h3>
                <h3
                  style={{
                    fontSize: "1.115rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Loại:{" "}
                  <span style={{ fontSize: "1rem", fontWeight: "normal" }}>
                    May rủi
                  </span>
                </h3>
                <h3
                  style={{
                    fontSize: "1.115rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Loại hàng hoá:{" "}
                  <span style={{ fontSize: "1rem", fontWeight: "normal" }}>
                    {programInfo?.goods_type
                      ?.split(",")
                      .map((item) => TypeBinExport.get(item))
                      .join(", ")}
                  </span>
                </h3>
                <h3
                  style={{
                    fontSize: "1.115rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Thời gian bắt đầu:{" "}
                  <span style={{ fontSize: "1rem", fontWeight: "normal" }}>
                    {programInfo?.time_start}
                  </span>
                </h3>
                <h3
                  style={{
                    fontSize: "1.115rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Thời gian kết thúc:{" "}
                  <span style={{ fontSize: "1rem", fontWeight: "normal" }}>
                    {programInfo?.time_end}
                  </span>
                </h3>
                <h3
                  style={{
                    fontSize: "1.115rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Leaf chương trình:{" "}
                  <a
                    style={{
                      fontSize: "1rem",
                      fontWeight: "normal",
                      color: "blue",
                      textDecorationLine: "underline",
                    }}
                    href="/"
                  >
                    Link
                  </a>
                </h3>
                {/* <h3
                  style={{
                    fontSize: "1.115rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Hướng dẫn tham gia chương trình:{" "}
                  <a
                    style={{
                      fontSize: "1rem",
                      fontWeight: "normal",
                      color: "blue",
                      textDecorationLine: "underline",
                    }}
                    href="/"
                  >
                    Link
                  </a>
                </h3> */}
                <h3
                  style={{
                    fontSize: "1.115rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Trạng thái:{" "}
                  {programInfo?.status === 1 ? (
                    <Badge bg="success">Đang hoạt động</Badge>
                  ) : programInfo?.status === 2 ? (
                    <Badge bg="warning">Hết hạn</Badge>
                  ) : (
                    <Badge bg="danger">Tạm dừng</Badge>
                  )}
                </h3>
              </Stack>
            </Stack>
            <Stack
              gap={2}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "1rem",
                marginTop: "1rem",
              }}
            >
              <Stack direction="horizontal" className="justify-content-between">
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  Điều kiện tham gia
                </h3>
                <Button size="sm" onClick={() => setOpenPolicyForm(true)}>
                  Chỉnh sửa
                </Button>
              </Stack>
              <Divider />
              <div
                style={{
                  listStyleType: "disc",
                  paddingLeft: "1.5rem",
                  marginTop: "0.5rem",
                  color: "#374151",
                  fontSize: "1rem",
                }}
                dangerouslySetInnerHTML={{ __html: programInfo?.note || "" }}
              ></div>
            </Stack>
          </div>

          <div style={{ width: "auto" }}>
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
            >
              <AppTable
                isHeader={true}
                title="Cơ cấu giải"
                headerRightSection={
                  <Button
                    size="sm"
                    onClick={() => {
                      setPresent(undefined);
                      setOpenProgramPresentForm(true);
                    }}
                  >
                    Thêm mới
                  </Button>
                }
                headers={[
                  {
                    key: "image_gift",
                    label: "Hình ảnh",
                    render: (value) => (
                      <td>
                        <Image src={value.image_gift} width={100} height={50} />
                      </td>
                    ),
                  },
                  {
                    key: "gift",
                    label: "Mã quà",
                    render: (value) => (
                      <td>
                        <span className="fw-semibold">{value.gift}</span>
                      </td>
                    ),
                  },
                  {
                    key: "gift_name",
                    label: "Tên quà",
                    render: (value) => (
                      <td>
                        <span className="fw-semibold">{value.gift_name}</span>
                      </td>
                    ),
                  },
                  {
                    key: "",
                    label: "Chức năng",
                    render: (value) => (
                      <td style={{ width: 20 }}>
                        <Dropdown className="ms-2">
                          <Dropdown.Toggle
                            variant=""
                            aria-label="button"
                            className="btn btn-icon no-caret"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="ti ti-dots-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            as="ul"
                            className="dropdown-menu-start"
                          >
                            <Dropdown.Item
                              onClick={() => {
                                setPresent(value);
                                setOpenProgramPresentForm(true);
                              }}
                            >
                              Cập nhật
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    ),
                  },
                  {
                    key: "percent",
                    label: "Tỉ lệ trúng",
                    render: (value) => (
                      <td>
                        <span className="fw-semibold">{value.percent}</span>
                      </td>
                    ),
                  },
                  {
                    key: "limit",
                    label: "Số lượng",
                    render: (value) => (
                      <td>
                        <span className="fw-semibold">{value.limits}</span>
                      </td>
                    ),
                  },
                  {
                    key: "province_code",
                    label: "Tỉnh áp dụng",
                    render: (value) => (
                      <td>
                        <div style={{ width: 100, overflowX: "scroll" }}>
                          {getListProvinceLabel(value.province_code)}
                        </div>
                      </td>
                    ),
                  },
                  {
                    key: "product_code",
                    label: "Sản phẩm áp dụng",
                    render: (value) => (
                      <td>
                        <div style={{ width: 100, overflowX: "scroll" }}>
                          {getListProductLabel(value.product_code)?.map(
                            (item) => item.description
                          )}
                        </div>
                      </td>
                    ),
                  },
                ]}
                data={presents || []}
              />
            </div>

            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <AppTable
                isHeader={true}
                title="Danh sách sản phẩm"
                headerRightSection={
                  <Button size="sm" onClick={() => setOpenProducts(true)}>
                    Thêm mới
                  </Button>
                }
                headers={[
                  {
                    key: "image_gift",
                    label: "Hình ảnh",
                    render: (value) => (
                      <td>
                        <img
                          src={
                            `${BASE_PORT}/${value.code}.jpg` ||
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
                          }
                          className="img object-fit-cover"
                          style={{
                            height: 100,
                            width: "auto",
                          }}
                        />
                      </td>
                    ),
                  },
                  {
                    key: "description",
                    label: "Tên sản phẩm",
                    render: (value) => <td>{value.description}</td>,
                  },
                  {
                    key: "",
                    label: "Chức năng",
                    render: (value) => (
                      <td style={{ width: 20 }}>
                        <Dropdown className="ms-2">
                          <Dropdown.Toggle
                            variant=""
                            aria-label="button"
                            className="btn btn-icon no-caret"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="ti ti-dots-vertical"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            as="ul"
                            className="dropdown-menu-start"
                          >
                            <Dropdown.Item
                              onClick={() => {
                                onHandleProgramInfoSubmit({
                                  ...programInfo,
                                  products:
                                    programInfo?.products
                                      ?.split(",")
                                      ?.filter((item) => item !== value.code)
                                      ?.join(",") || "",
                                } as any);
                              }}
                            >
                              Xoá
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    ),
                  },
                  {
                    key: "brand_name",
                    label: "Tên thương hiệu",
                    render: (value) => <td>{value?.brand_name}</td>,
                  },
                  {
                    key: "category_name",
                    label: "Nhóm sản phẩm",
                    render: (value) => (
                      <td>
                        <span className="fw-semibold">
                          {value.category_name}
                        </span>
                      </td>
                    ),
                  },
                ]}
                data={getListProductLabel(programInfo?.products || "") || []}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
      <AppHistory data={[]} opened={openedHistory} onClose={setOpenHistory} />
      <Modal
        show={openProgramInfoForm}
        onHide={() => setOpenProgramInfoForm(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6">Thông tin chương trình</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              uuid: activeTab,
              name: programInfo?.name || "",
              time_end: programInfo?.time_end || "",
              time_start: programInfo?.time_start || "",
              time_start_number: programInfo?.time_start_number || 0,
              time_end_number: programInfo?.time_end_number || 0,
              products: programInfo?.products || "",
              goods_type: programInfo?.goods_type || "",
              image: programInfo?.image || "",
              leaflet: programInfo?.leaflet || "",
              note: programInfo?.note || "",
              status: programInfo?.status || 1,
              id: programInfo?.id || 0,
            }}
            enableReinitialize
            onSubmit={onHandleProgramInfoSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              touched,
              errors,
            }) => (
              <Stack gap={1}>
                <Form.Group controlId="note_validate">
                  <Form.Label className="text-black">
                    Tên chương trình
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="VD: Chương trình may mắn"
                    name="name"
                    onChange={handleChange}
                    defaultValue={values.name}
                    isInvalid={touched.name && !!errors.name}
                    className="input-placeholder"
                  />

                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="note_validate">
                  <Form.Label className="text-black">Loại hàng hoá</Form.Label>
                  <Select
                    isMulti
                    name="goods_type"
                    options={[
                      { value: "SALE", label: "Hàng hóa" },
                      { value: "MARKETING", label: "Hàng quảng bá" },
                      { value: "BORROW", label: "Hàng mượn" },
                      { value: "PROMOTION", label: "Hàng khuyến mãi" },
                    ]}
                    className="basic-multi-select custom-multi input-placeholder"
                    id="choices-multiple-default"
                    menuPlacement="auto"
                    classNamePrefix="Select2"
                    isSearchable
                    placeholder="Chọn loại hàng hóa"
                    isClearable
                    onChange={(value) =>
                      setFieldValue(
                        "goods_type",
                        value.map((item) => item.value).join(",")
                      )
                    }
                    value={values.goods_type.split(",").map((item) => ({
                      label: TypeBinExport.get(item),
                      value: item,
                    }))}
                  />

                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="note_validate">
                  <Form.Label className="text-black">Ngày bắt đầu</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    onKeyDown={(e) => e.preventDefault()}
                    placeholder="Ngày bắt đầu"
                    name="time_start"
                    className="input-placeholder"
                    lang="vi"
                    onChange={(e) => {
                      setFieldValue("time_start", `${e.target.value} 00:00`);
                      setFieldValue(
                        "time_start_number",
                        `${format(e.target.value, "yyyyMMdd")}0000`
                      );
                    }}
                    value={
                      values.time_start &&
                      format(values.time_start, "yyyy-MM-dd")
                    }
                    min={
                      new Date(new Date().setDate(new Date().getDate() + 2))
                        .toISOString()
                        .split("T")[0]
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="note_validate">
                  <Form.Label className="text-black">Ngày kết thúc</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    onKeyDown={(e) => e.preventDefault()}
                    placeholder="Ngày kết thúc"
                    name="time_end"
                    className="input-placeholder"
                    lang="vi"
                    onChange={(e) => {
                      setFieldValue("time_end", `${e.target.value} 00:00`);
                      setFieldValue(
                        "time_end_number",
                        `${format(e.target.value, "yyyyMMdd")}0000`
                      );
                    }}
                    value={
                      values.time_end && format(values.time_end, "yyyy-MM-dd")
                    }
                    min={
                      values.time_start &&
                      new Date(values.time_start).toISOString().split("T")[0]
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="note_validate">
                  <Form.Label className="text-black">
                    Leaf chương trình
                  </Form.Label>

                  <Form.Control
                    required
                    type="text"
                    placeholder="VD: https://"
                    name="leaflet"
                    onChange={handleChange}
                    defaultValue={values.leaflet}
                    isInvalid={touched.leaflet && !!errors.leaflet}
                    className="input-placeholder"
                  />

                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="status_validate">
                  <Form.Label className="text-black">
                    Kích hoạt chương trình
                  </Form.Label>
                  <Form.Check
                    type="switch"
                    className="form-check-lg form-switch input-placeholder"
                    required
                    name="status"
                    defaultChecked={values.status === 1 ? true : false}
                    onChange={(e) =>
                      setFieldValue("status", e.target.checked ? 1 : 3)
                    }
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    className={`btn justify-content-center align-items-center ${
                      (isLoadingUpdateProgramFarmer ||
                        isLoadingUpdateProgramRetailer) &&
                      "btn-loader "
                    }
                        `}
                    onClick={() => handleSubmit()}
                  >
                    <span>Lưu</span>
                    {(isLoadingUpdateProgramFarmer ||
                      isLoadingUpdateProgramRetailer) && (
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
      <Modal
        show={openPolicyForm}
        onHide={() => setOpenPolicyForm(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6">Điều kiện tham gia chương trình</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={{
              uuid: activeTab,
              name: programInfo?.name || "",
              time_end: programInfo?.time_end || "",
              time_start: programInfo?.time_start || "",
              time_start_number: programInfo?.time_start_number || 0,
              time_end_number: programInfo?.time_end_number || 0,
              products: programInfo?.products || "",
              goods_type: programInfo?.goods_type || "",
              image: programInfo?.image || "",
              leaflet: programInfo?.leaflet || "",
              note: programInfo?.note || "",
              status: programInfo?.status || 1,
              id: programInfo?.id || 0,
            }}
            enableReinitialize
            onSubmit={onHandleProgramInfoSubmit}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Stack>
                <Editor
                  placeholder="Cho nhóm khách hàng: Nông dân"
                  value={values.note}
                  handOnChange={(value) => setFieldValue("note", value)}
                />
                <Modal.Footer>
                  <Button
                    variant="primary"
                    className={`btn justify-content-center align-items-center ${
                      isLoadingUpdateProgramFarmer && "btn-loader "
                    }
                        `}
                    onClick={() => handleSubmit()}
                  >
                    <span>Lưu</span>
                    {isLoadingUpdateProgramFarmer && (
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
          <Formik
            initialValues={{
              gift: present?.gift || "",
              gift_name: present?.gift_name || "",
              time_end: present?.time_end || 0,
              time_start: present?.time_start || 0,
              province_code: present?.province_code || "",
              limits: present?.limits || 0,
              percent: present?.percent || 0,
              product_code: present?.product_code || "",
              image_gift: present?.image_gift || "",
              type: activeTab,
              id: present?.id || 0,
              limit_per_customer: present?.limit_per_customer || 0,
              giftType:
                present?.gift.startsWith("topup-10-") ||
                present?.gift.startsWith("topup-20-") ||
                present?.gift.startsWith("topup-50-") ||
                present?.gift.startsWith("topup-100-") ||
                present?.gift.startsWith("topup-200-") ||
                present?.gift.startsWith("topup-500-")
                  ? present?.gift.startsWith("topup-10-")
                    ? "topup-10-"
                    : present?.gift.startsWith("topup-20-")
                    ? "topup-20-"
                    : present?.gift.startsWith("topup-50-")
                    ? "topup-50-"
                    : present?.gift.startsWith("topup-100-")
                    ? "topup-100-"
                    : present?.gift.startsWith("topup-200-")
                    ? "topup-200-"
                    : present?.gift.startsWith("topup-500-")
                    ? "topup-500-"
                    : "other"
                  : "other",
            }}
            enableReinitialize
            onSubmit={onHandlePresent}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              touched,
              errors,
            }) => (
              <Stack gap={1}>
                <Form.Group controlId="note_validate">
                  <Form.Label className="text-black">
                    Mã quà<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="VD: xemayairblack"
                    name="gift"
                    onChange={(event) => {
                      if (
                        values.giftType !== "other" &&
                        event.target.value.startsWith(values.giftType)
                      ) {
                        setFieldValue(
                          "gift",
                          removeVietnameseTones(event.target.value)
                        );
                      }
                      if (values.giftType === "other") {
                        setFieldValue(
                          "gift",
                          removeVietnameseTones(event.target.value)
                        );
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

                <Form.Group controlId="note_validate">
                  <Form.Label className="text-black">
                    Tên quà<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Stack
                    direction="horizontal"
                    gap={1}
                    className="mb-2 pb-1 overflow-x-auto"
                  >
                    <Chip
                      label="Khác"
                      variant={
                        values.giftType === "other" ? "filled" : "outlined"
                      }
                      onClick={() => {
                        setFieldValue("giftType", "other");
                        setFieldValue("gift_name", "");
                        setFieldValue("gift", "");
                      }}
                      color={
                        values.giftType === "other" ? "secondary" : "default"
                      }
                    />
                    <Chip
                      label="Topup 10K"
                      variant={
                        values.giftType === "topup-10-" ? "filled" : "outlined"
                      }
                      onClick={() => {
                        setFieldValue("giftType", "topup-10-");
                        setFieldValue("gift_name", "Topup 10K");
                        setFieldValue("gift", "topup-10-");
                      }}
                      color={
                        values.giftType === "topup-10-"
                          ? "secondary"
                          : "default"
                      }
                    />
                    <Chip
                      label="Topup 20K"
                      variant={
                        values.giftType === "topup-20-" ? "filled" : "outlined"
                      }
                      onClick={() => {
                        setFieldValue("giftType", "topup-20-");
                        setFieldValue("gift_name", "Topup 20K");
                        setFieldValue("gift", "topup-20-");
                      }}
                      color={
                        values.giftType === "topup-20-"
                          ? "secondary"
                          : "default"
                      }
                    />
                    <Chip
                      label="Topup 50K"
                      variant={
                        values.giftType === "topup-50-" ? "filled" : "outlined"
                      }
                      onClick={() => {
                        setFieldValue("giftType", "topup-50-");
                        setFieldValue("gift_name", "Topup 50K");
                        setFieldValue("gift", "topup-50-");
                      }}
                      color={
                        values.giftType === "topup-50-"
                          ? "secondary"
                          : "default"
                      }
                    />
                    <Chip
                      label="Topup 100K"
                      variant={
                        values.giftType === "topup-100-" ? "filled" : "outlined"
                      }
                      onClick={() => {
                        setFieldValue("giftType", "topup-100-");
                        setFieldValue("gift_name", "Topup 100K");
                        setFieldValue("gift", "topup-100-");
                      }}
                      color={
                        values.giftType === "topup-100-"
                          ? "secondary"
                          : "default"
                      }
                    />
                    <Chip
                      label="Topup 200K"
                      variant={
                        values.giftType === "topup-200-" ? "filled" : "outlined"
                      }
                      onClick={() => {
                        setFieldValue("giftType", "topup-200-");
                        setFieldValue("gift_name", "Topup 200K");
                        setFieldValue("gift", "topup-200-");
                      }}
                      color={
                        values.giftType === "topup-200-"
                          ? "secondary"
                          : "default"
                      }
                    />
                    <Chip
                      label="Topup 500K"
                      variant={
                        values.giftType === "topup-500-" ? "filled" : "outlined"
                      }
                      onClick={() => {
                        setFieldValue("giftType", "topup-500-");
                        setFieldValue("gift_name", "Topup 500K");
                        setFieldValue("gift", "topup-500-");
                      }}
                      color={
                        values.giftType === "topup-500-"
                          ? "secondary"
                          : "default"
                      }
                    />
                  </Stack>
                  <Form.Control
                    required
                    type="text"
                    placeholder="VD: Xe máy Airblack"
                    name="gift_name"
                    onChange={(e) => {
                      setFieldValue("gift_name", e.target.value);
                      if (
                        values?.giftType !== "topup-10-" &&
                        values?.giftType !== "topup-20-" &&
                        values?.giftType !== "topup-50-" &&
                        values?.giftType !== "topup-100-" &&
                        values?.giftType !== "topup-200-" &&
                        values?.giftType !== "topup-500-"
                      ) {
                        setFieldValue(
                          "gift",
                          removeVietnameseTones(e.target.value)
                        );
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
                <Form.Group controlId="note_validate">
                  <Form.Label className="text-black">
                    Hình ảnh <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div className=" position-relative">
                    <Image
                      src={
                        values.image_gift || "https://placehold.jp/400x200.png"
                      }
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.5rem",
                        width: "100%",
                        height: 250,
                        backgroundColor: "#f3f4f6",
                      }}
                    ></Image>
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
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const imageLink =
                            await onHandleUploadProgramPrensentImageSubmit(
                              file,
                              values.gift
                            );
                          console.log("image_gift", imageLink);
                          setFieldValue(
                            "image_gift",
                            `${BASE_PORT}/program-image/${values.gift}.jpg`
                          );
                        }
                      }}
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="note_validate">
                  <Form.Label className="text-black">Ngày bắt đầu</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    onKeyDown={(e) => e.preventDefault()}
                    placeholder="Ngày bắt đầu"
                    name="time_start"
                    className="input-placeholder"
                    lang="vi"
                    onChange={(e) => {
                      setFieldValue(
                        "time_start",
                        format(e.target.value, "yyyyMMdd")
                      );
                    }}
                    value={fDate(values.time_start || 0)}
                    min={
                      new Date(new Date().setDate(new Date().getDate() + 2))
                        .toISOString()
                        .split("T")[0]
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="note_validate">
                  <Form.Label className="text-black">Ngày kết thúc</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    onKeyDown={(e) => e.preventDefault()}
                    placeholder="Ngày kết thúc"
                    name="time_end"
                    className="input-placeholder"
                    lang="vi"
                    onChange={(e) => {
                      setFieldValue(
                        "time_end",
                        format(e.target.value, "yyyyMMdd")
                      );
                    }}
                    value={fDate(values.time_end)}
                    min={
                      new Date(
                        values?.time_start
                          ? fDate(values?.time_start)
                          : new Date()
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="note_validate">
                  <Form.Label className="text-black">
                    Tỉ lệ trúng <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="VD: 10"
                    name="percent"
                    onChange={handleChange}
                    value={values.percent}
                    min={0}
                    max={100}
                    isInvalid={touched.percent && !!errors.percent}
                    className="input-placeholder"
                  />

                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="note_validate">
                  <Form.Label className="text-black">
                    Số lượng <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="VD: 5"
                    name="limits"
                    min={0}
                    onChange={handleChange}
                    value={values.limits}
                    isInvalid={touched.limits && !!errors.limits}
                    className="input-placeholder"
                  />

                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="text-black">
                    Tỉnh thành <span style={{ color: "red" }}>*</span>
                  </Form.Label>

                  <Select
                    isMulti
                    name="province_code"
                    options={listProvince?.map((item) => ({
                      label: item.name,
                      value: item.code,
                    }))}
                    className="basic-multi-select custom-multi input-placeholder"
                    id="choices-multiple-default"
                    menuPlacement="auto"
                    classNamePrefix="Select2"
                    isSearchable
                    placeholder="Chọn tỉnh áp dụng"
                    isClearable
                    onChange={(values) =>
                      setFieldValue(
                        "province_code",
                        values.map((item) => item.value).join(",")
                      )
                    }
                    value={listProvince
                      ?.filter((item) =>
                        values.province_code.includes(item.code)
                      )
                      .map((item) => ({
                        label: item.name,
                        value: item.code,
                      }))}
                  />
                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="text-black">
                    Sản phẩm áp dụng <span style={{ color: "red" }}>*</span>
                  </Form.Label>

                  <Select
                    isMulti
                    name="product_code"
                    options={listProducts?.map((item) => ({
                      label: item.description,
                      value: item.code,
                    }))}
                    className="basic-multi-select custom-multi input-placeholder"
                    id="choices-multiple-default"
                    menuPlacement="auto"
                    classNamePrefix="Select2"
                    isSearchable
                    placeholder="Chọn sản phẩm áp dụng"
                    isClearable
                    onChange={(values) =>
                      setFieldValue(
                        "product_code",
                        values.map((item) => item.value).join(",")
                      )
                    }
                    value={listProducts
                      ?.filter(
                        (item) =>
                          values.product_code?.split(",").includes(item.code) // Ensure proper comparison
                      )
                      .map((item) => ({
                        label: item.description,
                        value: item.code,
                      }))}
                  />
                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="status_validate">
                  <Form.Label className="text-black">Giải đặc biệt</Form.Label>
                  <Form.Check
                    type="switch"
                    className="form-check-lg form-switch input-placeholder"
                    required
                    name="limit_per_customer"
                    checked={values.limit_per_customer === 1 ? true : false}
                    onChange={(e) =>
                      setFieldValue(
                        "limit_per_customer",
                        e.target.checked ? 1 : 0
                      )
                    }
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    className={`btn justify-content-center align-items-center ${
                      (isLoadingCreateProgramPresentFarmer ||
                        isLoadingCreateProgramPresentRetailer ||
                        isLoadingUpdateProgramPresentRetailer ||
                        isLoadingUpdateProgramPresentFarmer) &&
                      "btn-loader "
                    }
                        `}
                    onClick={() => handleSubmit()}
                  >
                    <span>Lưu</span>
                    {(isLoadingCreateProgramPresentFarmer ||
                      isLoadingCreateProgramPresentRetailer ||
                      isLoadingUpdateProgramPresentRetailer ||
                      isLoadingUpdateProgramPresentFarmer) && (
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
      <Modal
        show={openProducts}
        onHide={() => setOpenProducts(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6">Danh sách sản phẩm áp dụng</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-y-scroll" style={{ height: 400 }}>
          <Formik
            initialValues={{
              uuid: activeTab,
              name: programInfo?.name || "",
              time_end: programInfo?.time_end || "",
              time_start: programInfo?.time_start || "",
              time_start_number: programInfo?.time_start_number || 0,
              time_end_number: programInfo?.time_end_number || 0,
              products: programInfo?.products || "",
              goods_type: programInfo?.goods_type || "",
              image: programInfo?.image || "",
              leaflet: programInfo?.leaflet || "",
              note: programInfo?.note || "",
              status: programInfo?.status || 1,
              id: programInfo?.id || 0,
            }}
            enableReinitialize
            onSubmit={onHandleProgramInfoSubmit}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Stack gap={1}>
                <Form.Group className="mb-2">
                  <Form.Label className="text-black">
                    Sản phẩm áp dụng <span style={{ color: "red" }}>*</span>
                  </Form.Label>

                  <Select
                    isMulti
                    name="goods_type"
                    options={listProducts?.map((item) => ({
                      label: item.description,
                      value: item.code,
                    }))}
                    className="basic-multi-select custom-multi input-placeholder"
                    id="choices-multiple-default"
                    menuPlacement="auto"
                    classNamePrefix="Select2"
                    isSearchable
                    placeholder="Chọn loại hàng hóa"
                    isClearable
                    onChange={(value) =>
                      setFieldValue(
                        "products",
                        value.map((item) => item.value).join(",")
                      )
                    }
                    value={listProducts
                      ?.filter(
                        (item) =>
                          values.products?.split(",").includes(item.code) // Ensure proper comparison
                      )
                      .map((item) => ({
                        label: item.description,
                        value: item.code,
                      }))}
                  />
                  <Form.Control.Feedback type="invalid">
                    Thông tin bắt buộc
                  </Form.Control.Feedback>
                </Form.Group>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    className={`btn justify-content-center align-items-center ${
                      (isLoadingUpdateProgramFarmer ||
                        isLoadingUpdateProgramRetailer) &&
                      "btn-loader "
                    }
                        `}
                    onClick={() => handleSubmit()}
                  >
                    <span>Lưu</span>
                    {(isLoadingUpdateProgramFarmer ||
                      isLoadingUpdateProgramRetailer) && (
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

export default ChanceProgram;
