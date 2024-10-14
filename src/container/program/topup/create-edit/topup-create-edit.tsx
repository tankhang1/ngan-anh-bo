import React, {
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  Badge,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap";
import * as formik from "formik";
import { TTopupCreateForm } from "../../../../assets/types";
import Select from "react-select";
import { OBJECTIVES_SELECT } from "../../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useGetListProductsQuery } from "../../../../redux/api/info/info.api";
import {
  useCreateTopupProgramMutation,
  useGetNewUUIDQuery,
  useUpdateTopupProgramMutation,
} from "../../../../redux/api/other/other.api";
import { useGetListProgramTopupStatusQuery } from "../../../../redux/api/program/program.api";
import { format } from "date-fns";
import { ToastContext } from "../../../../components/AppToast";
import topupProgramSchema from "../../../../schema/topupProgram.schema";
import AppWarning from "../../../../components/AppWarning";
import { IconLoader } from "@tabler/icons-react";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType
);
type TSearchItem = {
  label: string;
  value: string;
};
const TypeBinExport: TSearchItem[] = [
  {
    label: "Hàng hóa",
    value: "SALE",
  },
  {
    label: "Khuyến mãi",
    value: "MARKETING",
  },
  {
    label: "Hàng mượn",
    value: "BORROW",
  },
  {
    label: "Hàng quảng bá",
    value: "PROMOTION",
  },
];
function TopupCreateEdit() {
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const { isCreate, id } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const { data: products, isLoading: isLoadingProducts } =
    useGetListProductsQuery(null);
  const { data: newUUID } = useGetNewUUIDQuery(null, {
    skip: isCreate !== "true",
    refetchOnMountOrArgChange: true,
  });
  const { data: topupProgram } = useGetListProgramTopupStatusQuery(
    {
      status: +(id?.split("_")[1] ?? 0),
      nu: +(id?.split("_")[2] ?? 0),
      sz: 10,
    },
    {
      selectFromResult: ({ data }) => ({
        data: data?.find((item) => item.uuid === (id?.split("_")[0] ?? 0)),
      }),
      skip: isCreate === "true",
    }
  );
  const { Formik } = formik;

  const mapProduct = useMemo(
    () =>
      products?.map((item) => ({
        label: `${item.description}-${item.code}`,
        value: item.code,
      })),
    [products]
  );

  const mapCodeProduct = useCallback(
    (listProduct?: string) => {
      if (!listProduct) return [];
      if (listProduct === "all")
        return [{ value: "all", label: "Chọn tất cả" }];
      let checkListProduct =
        listProduct[0] !== "," ? "," + listProduct : listProduct;
      checkListProduct =
        checkListProduct[checkListProduct.length - 1] !== ","
          ? checkListProduct + "," + listProduct
          : checkListProduct;
      return products
        ?.map((product1) => ({
          value: product1.code,
          label: `${product1.description}-${product1.code}`,
        }))
        .filter((product2) =>
          checkListProduct.includes("," + product2.value + ",")
        );
    },
    [products, topupProgram]
  );

  const mapObjective = useCallback(
    (listObjective?: string) => {
      if (!listObjective) return [];
      let checkListObjective =
        listObjective[0] !== "," ? "," + listObjective : listObjective;
      checkListObjective =
        checkListObjective[checkListObjective.length - 1] !== ","
          ? checkListObjective + "," + listObjective
          : checkListObjective;
      return OBJECTIVES_SELECT?.filter((objective) =>
        checkListObjective.includes("," + objective.value + ",")
      );
    },
    [topupProgram]
  );
  const mapGoodsType = useCallback(
    (goods_type?: string) => {
      if (!goods_type) return [];
      let checkListGoodsType =
        goods_type[0] !== "," ? "," + goods_type : goods_type;
      checkListGoodsType =
        checkListGoodsType[checkListGoodsType.length - 1] !== ","
          ? checkListGoodsType + "," + goods_type
          : checkListGoodsType;
      return TypeBinExport?.filter((objective) =>
        checkListGoodsType.includes("," + objective.value + ",")
      );
    },
    [topupProgram]
  );
  const isDisableAccess = (type: string) => {
    if (isCreate === "true") return false;
    if (!isEdit) return true;
    if (topupProgram?.status === 2) return true;
    if (topupProgram?.status === 1 && type !== "status") return true;
    switch (type) {
      case "name":
        return true;
      case "time_start":
        return true;
      case "time_end":
        return false;
      case "products":
        return false;
      case "objectives":
        return false;
      case "price":
        return false;
      case "status":
        return false;
      default:
        return false;
    }
  };
  const [updateTopupProgram, { isLoading: isLoadingUpdate }] =
    useUpdateTopupProgramMutation();
  const [createTopupProgram, { isLoading: isLoadingCreate }] =
    useCreateTopupProgramMutation();

  const handleCreatePointProgram = async (values: TTopupCreateForm) => {
    if (isCreate === "true") {
      await createTopupProgram({
        ...values,
        products:
          typeof values.products !== "string"
            ? values.products.length === 1 &&
              values.products[0]?.value === "all"
              ? "all"
              : values.products.map((item) => item.value).join(",")
            : "",

        objectives:
          typeof values.objectives !== "string"
            ? values.objectives.length === 1 &&
              values.objectives[0]?.value === "all"
              ? OBJECTIVES_SELECT?.map((item) => item.value).join(",")
              : values.objectives.map((item) => item.value).join(",")
            : "",
        price: +(values?.price ?? 0),
        goods_type:
          typeof values.goods_type !== "string"
            ? values.goods_type.length === 1 &&
              values.goods_type[0]?.value === "all"
              ? TypeBinExport?.map((item) => item.value).join(",")
              : values.goods_type.map((item) => item.value).join(",")
            : "",
        time_start:
          values.time_start &&
          format(new Date(values.time_start), "yyyy-MM-dd HH:mm"),
        time_start_number:
          values.time_start &&
          +format(new Date(values.time_start), "yyyyMMddHHmm"),
        time_end_number:
          values.time_end && +format(new Date(values.time_end), "yyyyMMddHHmm"),

        time_end:
          values.time_end &&
          format(new Date(values.time_end), "yyyy-MM-dd HH:mm"),
        status: +values.status,
      })
        .unwrap()
        .then((value) => {
          if (value.status === 0) {
            navigate(-1);
            toast.showToast("Thêm mới chương trình thành công");
          } else if (value.status === -4)
            toast.showToast("Thêm mới thất bại, ngày bắt đầu phải sau 1 ngày");
          else toast.showToast(value.message);
        })
        .catch(() => {
          toast.showToast("Thêm mới thất bại");
        });
    } else {
      if (isEdit === true) {
        await updateTopupProgram({
          ...values,
          products:
            typeof values.products !== "string"
              ? values.products.length === 1 &&
                values.products[0]?.value === "all"
                ? "all"
                : values.products.map((item) => item.value).join(",")
              : "",

          objectives:
            typeof values.objectives !== "string"
              ? values.objectives.length === 1 &&
                values.objectives[0]?.value === "all"
                ? OBJECTIVES_SELECT?.map((item) => item.value).join(",")
                : values.objectives.map((item) => item.value).join(",")
              : "",
          price: +(values?.price ?? 0),
          time_start:
            values.time_start &&
            format(new Date(values.time_start), "yyyy-MM-dd HH:mm"),
          time_start_number:
            values.time_start &&
            +format(new Date(values.time_start), "yyyyMMddHHmm"),
          time_end_number:
            values.time_end &&
            +format(new Date(values.time_end), "yyyyMMddHHmm"),
          goods_type:
            typeof values.goods_type !== "string"
              ? values.goods_type.length === 1 &&
                values.goods_type[0]?.value === "all"
                ? TypeBinExport?.map((item) => item.value).join(",")
                : values.goods_type.map((item) => item.value).join(",")
              : "",
          time_end:
            values.time_end &&
            format(new Date(values.time_end), "yyyy-MM-dd HH:mm"),
          status: +values.status,
          uuid: topupProgram?.uuid,
        })
          .unwrap()
          .then((value) => {
            setIsEdit(!isEdit);
            if (value.status === 0) {
              navigate(-1);
              toast.showToast("Cập nhật chương trình thành công");
              return;
            }
            if (value.status === -4) {
              toast.showToast("Ngày bắt đầu sau 1 ngày");
              return;
            }
            if (value.status === -6) {
              toast.showToast("Chương trình đang chạy");
              return;
            }
            toast.showToast(value.message);
          })
          .catch(() => {
            setIsEdit(!isEdit);
            toast.showToast("Cập nhật thất bại");
          });
      }
    }
  };
  const MapBadge = () => {
    if (isCreate === "true") return null;
    if (topupProgram?.status === 0)
      return (
        <Badge bg="warning-gradient" className="badge">
          Chờ kích hoạt
        </Badge>
      );
    if (topupProgram?.status === 1)
      return (
        <Badge bg="success" className="badge">
          Đang chạy
        </Badge>
      );
    if (topupProgram?.status === 2)
      return (
        <Badge bg="info" className="badge">
          Kết thúc
        </Badge>
      );
    if (topupProgram?.status === 3)
      return (
        <Badge bg="danger" className="badge">
          Tạm dừng
        </Badge>
      );
  };
  return (
    <Fragment>
      <Formik
        initialValues={{
          name: topupProgram?.name ?? "",
          products: mapCodeProduct(topupProgram?.products),
          price: topupProgram?.price ?? "",
          objectives: mapObjective(topupProgram?.objectives) ?? "",
          time_end: topupProgram?.time_end
            ? format(new Date(topupProgram.time_end), "yyyy-MM-dd")
            : ("" as any),
          time_start: topupProgram?.time_start
            ? format(new Date(topupProgram.time_start), "yyyy-MM-dd")
            : ("" as any),
          status: topupProgram?.status ?? 0,
          goods_type: mapGoodsType(topupProgram?.goods_type) ?? "",
          uuid:
            isCreate === "true"
              ? newUUID?.toString()
              : topupProgram?.uuid.toString(),
        }}
        enableReinitialize
        onSubmit={handleCreatePointProgram}
        validationSchema={topupProgramSchema}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <Card className="custom-card">
            <Card.Header className="justify-content-between">
              <div className="d-flex gap-2">
                <Card.Title>
                  {!isEdit
                    ? "Thông tin chương trình topup"
                    : "Chỉnh sửa chương trình topup"}
                </Card.Title>
                {MapBadge()}
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-danger-light"
                  type={"button"}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Trở lại
                </button>
                {isCreate === "true" ? (
                  <AppWarning onAccept={() => handleSubmit()}>
                    <button
                      className={`btn  btn-purple-light ms-2 justify-content-center align-items-center ${
                        isLoadingCreate && "btn-loader"
                      }`}
                    >
                      <span>Thêm mới</span>
                      {isLoadingCreate && (
                        <span className="loading">
                          <IconLoader size={19} />
                        </span>
                      )}
                    </button>
                  </AppWarning>
                ) : isEdit ? (
                  <AppWarning onAccept={() => handleSubmit()}>
                    <button
                      className={`btn btn-purple-light justify-content-center align-items-center ${
                        isLoadingUpdate && "btn-loader"
                      }`}
                    >
                      <span>Lưu</span>
                      {isLoadingUpdate && (
                        <span className="loading">
                          <IconLoader size={19} />
                        </span>
                      )}
                    </button>
                  </AppWarning>
                ) : (
                  <button
                    className={`btn btn-purple-light justify-content-center align-items-center`}
                    onClick={() => setIsEdit(true)}
                  >
                    <span>Chỉnh sửa</span>
                  </button>
                )}
              </div>
            </Card.Header>
            <Card.Body>
              <Stack className="d-flex gap-1">
                <p style={{ color: "red" }}>
                  * Chỉ chương trình được tạm dừng hoặc chờ kích hoạt mới được
                  chỉnh sửa thông tin
                </p>
                <Form.Group>
                  <Form.Label className="text-black">
                    Mã chương trình <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="uuid_validate"
                    placeholder="Mã chương trình"
                    name="uuid"
                    value={isCreate === "true" ? newUUID : values.uuid}
                    onChange={handleChange}
                    isInvalid={touched.uuid && !!errors.uuid}
                    disabled
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.uuid}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-black">
                    Tên chương trình <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="name_validate"
                    placeholder="Tên chương trình"
                    className="input-placeholder"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={touched.name && !!errors.name}
                    disabled={isDisableAccess("name")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label className="text-black">
                      Ngày bắt đầu <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="date"
                      onKeyDown={(e) => e.preventDefault()}
                      id="time_start_validate"
                      placeholder="Ngày bắt đầu"
                      className="input-placeholder"
                      name="time_start"
                      value={values.time_start}
                      min={
                        new Date(new Date().setDate(new Date().getDate() + 2))
                          .toISOString()
                          .split("T")[0]
                      }
                      lang="vi"
                      onChange={handleChange}
                      isInvalid={touched.time_start && !!errors.time_start}
                      disabled={isDisableAccess("time_start")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.time_start?.toString()}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2" as={Col} md={6}>
                    <Form.Label className="text-black">
                      Ngày kết thúc <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="date"
                      onKeyDown={(e) => e.preventDefault()}
                      id="time_end_validate"
                      placeholder="Ngày kết thúc"
                      className="input-placeholder"
                      name="time_end"
                      value={values.time_end}
                      onChange={handleChange}
                      isInvalid={touched.time_end && !!errors.time_end}
                      min={
                        isCreate === "true"
                          ? new Date(
                              new Date().setDate(new Date().getDate() + 2)
                            )
                              .toISOString()
                              .split("T")[0]
                          : values.time_end
                      }
                      disabled={isDisableAccess("time_end")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.time_end?.toString()}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group>
                  <Form.Label className="text-black">
                    Chọn sản phẩm <span style={{ color: "red" }}>*</span>
                  </Form.Label>

                  <Select
                    isMulti
                    name="colors"
                    options={
                      values?.products?.[0]?.value === "all"
                        ? []
                        : values?.products?.length > 0
                        ? ([...(mapProduct ?? [])] as any)
                        : ([
                            { value: "all", label: "Chọn tất cả" },
                            ...(mapProduct ?? []),
                          ] as any)
                    }
                    className=" basic-multi-select custom-multi mb-3 input-placeholder"
                    id="choices-multiple-default"
                    menuPlacement="auto"
                    classNamePrefix="Select2"
                    defaultValue={[mapProduct?.[0] as any]}
                    placeholder="Chọn sản phẩm"
                    isSearchable
                    isClearable
                    isLoading={isLoadingProducts}
                    value={values.products}
                    onChange={(value) => setFieldValue("products", value)}
                    isDisabled={isDisableAccess("products")}
                  />
                  {errors.products && touched.products && (
                    <p style={{ color: "red", fontSize: 12 }}>
                      {errors.products.toString()}
                    </p>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-black">
                    Chọn đối tượng tham gia{" "}
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Select
                    isMulti
                    name="colors"
                    options={
                      [
                        { value: "all", label: "Chọn tất cả" },
                        ...(OBJECTIVES_SELECT || []),
                      ] as any
                    }
                    className=" basic-multi-select custom-multi mb-3 input-placeholder"
                    id="choices-multiple-default"
                    menuPlacement="auto"
                    classNamePrefix="Select2"
                    isSearchable
                    placeholder="Chọn đối tượng tham gia"
                    value={values.objectives}
                    isClearable
                    onChange={(value) => setFieldValue("objectives", value)}
                    isDisabled={isDisableAccess("objectives")}
                  />
                  {errors.objectives && touched.objectives && (
                    <p style={{ color: "red", fontSize: 12 }}>
                      {errors.objectives.toString()}
                    </p>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-black">
                    Nhập số tiền thưởng <span style={{ color: "red" }}>*</span>
                  </Form.Label>

                  <Form.Select
                    className="form-select input-placeholder"
                    name="price"
                    onChange={handleChange}
                    value={values.price}
                    isInvalid={touched.price && !!errors.price}
                    required
                    disabled={isDisableAccess("price")}
                  >
                    <option value={""} label="--Chọn giá trị--"></option>
                    <option value={10} label="10.000đ" />
                    <option value={20} label="20.000đ" />
                    <option value={30} label="30.000đ" />
                    <option value={50} label="50.000đ" />
                    <option value={100} label="100.000đ" />
                    <option value={200} label="200.000đ" />
                    <option value={300} label="300.000đ" />
                    <option value={500} label="500.000đ" />
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="text-nowrap text-black">
                    Loại hàng hóa: <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Select
                    isMulti
                    name="goods_type"
                    options={[...(TypeBinExport || [])] as any}
                    className="basic-multi-select custom-multi mb-3 input-placeholder"
                    id="choices-multiple-default"
                    menuPlacement="auto"
                    classNamePrefix="Select2"
                    isSearchable
                    placeholder="Chọn loại hàng hóa"
                    defaultValue={[TypeBinExport?.[0] as any]}
                    value={values.goods_type}
                    isClearable
                    onChange={(value) => setFieldValue("goods_type", value)}
                    isDisabled={isDisableAccess("goods_type")}
                  />

                  {errors.goods_type && touched.goods_type && (
                    <p style={{ color: "red", fontSize: 12 }}>
                      {errors.goods_type.toString()}
                    </p>
                  )}
                </Form.Group>
                <Form.Group controlId="status_validate">
                  <Form.Label className="text-black">
                    Tạm dừng chương trình
                  </Form.Label>
                  <Form.Check
                    type="switch"
                    className="form-check-lg form-switch input-placeholder"
                    checked={values.status === 3 ? true : false}
                    onChange={(value) => {
                      setFieldValue("status", value.target.checked ? 3 : 1);
                    }}
                    required
                    name="status"
                    disabled={isDisableAccess("status")}
                  />
                  {errors.status && touched.status && (
                    <p style={{ color: "red", fontSize: 12 }}>
                      {errors.status.toString()}
                    </p>
                  )}
                </Form.Group>
              </Stack>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
}

export default TopupCreateEdit;
