import React, {
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  Card,
  Col,
  Row,
  Stack,
  Form,
  Badge,
  FormCheck,
  Modal,
} from "react-bootstrap";
import { Formik } from "formik";
import { TPointCreateForm } from "../../../../assets/types";
import Select from "react-select";
import { BASE_PORT, OBJECTIVES_SELECT, PROVINCES } from "../../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useGetListProductsQuery } from "../../../../redux/api/info/info.api";
import {
  useCreatePointProgramMutation,
  useGetNewUUIDQuery,
  useUpdatePointProgramMutation,
} from "../../../../redux/api/other/other.api";
import {
  useGetListAgencyC1Query,
  useGetListGroupRetailerQuery,
} from "../../../../redux/api/manage/manage.api";
import { useGetListProgramPointStatusQuery } from "../../../../redux/api/program/program.api";
import { format } from "date-fns";
import { ToastContext } from "../../../../components/AppToast";
import pointProgramSchema from "../../../../schema/pointProgram.schema";
import AppWarning from "../../../../components/AppWarning";
import { Checkbox } from "@mui/material";
import AppTable from "../../../../components/common/table/table";

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
function PointCreateEdit() {
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const { isCreate, id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [type, setType] = useState<"RETAILER" | "FARMER">("RETAILER");
  const { data: products, isLoading: isLoadingProducts } =
    useGetListProductsQuery(null);
  const { data: newUUID } = useGetNewUUIDQuery(null, {
    skip: isCreate !== "true",
    refetchOnMountOrArgChange: true,
  });
  const { data: listAgencyC1, isLoading: isLoadingAgency } =
    useGetListAgencyC1Query();
  console.log(listAgencyC1);
  const { data: pointProgram } = useGetListProgramPointStatusQuery(
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

  const { data: retailerGroup } = useGetListGroupRetailerQuery();

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
    [products, pointProgram]
  );

  const mapProvince = useCallback(
    (listProvince?: string) => {
      if (!listProvince) return [];

      let checkListProvince =
        listProvince[0] !== "," ? "," + listProvince : listProvince;
      checkListProvince =
        checkListProvince[checkListProvince.length - 1] !== ","
          ? checkListProvince + "," + listProvince
          : checkListProvince;
      return PROVINCES.filter((province) =>
        checkListProvince.includes("," + province.value + ",")
      );
    },
    [PROVINCES, pointProgram]
  );
  const mapAgent = useCallback(
    (listAgent?: string) => {
      if (!listAgent) return [];
      if (listAgent === "all") return [{ value: "all", label: "Chọn tất cả" }];
      let checkListAgent = listAgent[0] !== "," ? "," + listAgent : listAgent;
      checkListAgent =
        checkListAgent[checkListAgent.length - 1] !== ","
          ? checkListAgent + "," + listAgent
          : checkListAgent;
      return listAgencyC1?.filter((agent) =>
        checkListAgent.includes("," + agent.value + ",")
      );
    },
    [listAgencyC1, pointProgram]
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
    [pointProgram]
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
    [pointProgram]
  );
  const [updatePointProgram, { isLoading: isLoadingUpdate }] =
    useUpdatePointProgramMutation();
  const [createPointProgram, { isLoading: isLoadingCreate }] =
    useCreatePointProgramMutation();
  //@ts-ignore
  const handleCreatePointProgram = async (values: TPointCreateForm) => {
    if (isCreate === "true") {
      await createPointProgram({
        ...values,
        products:
          typeof values.products !== "string"
            ? values.products.length === 1 &&
              values.products[0]?.value === "all"
              ? "all"
              : values.products.map((item) => item.value).join(",")
            : "",
        agents:
          typeof values.agents !== "string"
            ? values.agents.length === 1 && values.agents[0]?.value === "all"
              ? "all"
              : values.agents.map((item) => item.value).join(",")
            : "",
        // objectives:
        //   typeof values.objectives !== "string"
        //     ? values.objectives.length === 1 &&
        //       values.objectives[0]?.value === "all"
        //       ? OBJECTIVES_SELECT?.map((item) => item.value).join(",")
        //       : values.objectives.map((item) => item.value).join(",")
        //     : "",
        objectives:
          type === "RETAILER"
            ? "RETAILER1,RETAILER2,ANONYMOUS"
            : "FARMER,ANONYMOUS",
        // locations:
        //   typeof values.locations !== "string"
        //     ? values.locations.length === 1 &&
        //       values.locations[0]?.value === "all"
        //       ? PROVINCES?.map((item) => item.value).join(",")
        //       : values.locations.map((item) => item.value).join(",")
        //     : "",
        locations: "all",
        goods_type:
          typeof values.goods_type !== "string"
            ? values.goods_type.length === 1 &&
              values.goods_type[0]?.value === "all"
              ? TypeBinExport?.map((item) => item.value).join(",")
              : values.goods_type.map((item) => item.value).join(",")
            : "",
        point_coefficient: +(values?.point_coefficient ?? 0),
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
            return;
          }
          if (value.status === -4) {
            toast.showToast(
              "Thêm mới thất bại, ngày bắt đầu chương trình phải sau 1 ngày"
            );
            return;
          }
          toast.showToast("Thêm mới chương trình bị lỗi");
        })
        .catch(() => {
          toast.showToast("Thêm mới thất bại");
        });
    } else {
      if (isEdit === true) {
        await updatePointProgram({
          ...values,
          products:
            typeof values.products !== "string"
              ? values.products.length === 1 &&
                values.products[0]?.value === "all"
                ? "all"
                : values.products.map((item) => item.value).join(",")
              : "",
          agents:
            typeof values.agents !== "string"
              ? values.agents.length === 1 && values.agents[0]?.value === "all"
                ? "all"
                : values.agents.map((item) => item.value).join(",")
              : "",
          // objectives:
          //   typeof values.objectives !== "string"
          //     ? values.objectives.length === 1 &&
          //       values.objectives[0]?.value === "all"
          //       ? OBJECTIVES_SELECT?.map((item) => item.value).join(",")
          //       : values.objectives.map((item) => item.value).join(",")
          //     : "",
          objectives:
            type === "RETAILER"
              ? "RETAILER1,RETAILER2,ANONYMOUS"
              : "FARMER,ANONYMOUS",
          // locations:
          //   typeof values.locations !== "string"
          //     ? values.locations.length === 1 &&
          //       values.locations[0]?.value === "all"
          //       ? PROVINCES?.map((item) => item.value).join(",")
          //       : values.locations.map((item) => item.value).join(",")
          //     : "",
          locations: "all",
          goods_type:
            typeof values.goods_type !== "string"
              ? values.goods_type.length === 1 &&
                values.goods_type[0]?.value === "all"
                ? TypeBinExport?.map((item) => item.value).join(",")
                : values.goods_type.map((item) => item.value).join(",")
              : "",
          point_coefficient: +(values?.point_coefficient ?? 0),
          time_start:
            values.time_start &&
            format(new Date(values.time_start), "yyyy-MM-dd HH:mm"),
          time_start_number:
            values.time_start &&
            +format(new Date(values.time_start), "yyyyMMddHHmm"),
          time_end_number:
            values.time_end &&
            +format(new Date(values.time_end), "yyyyMMddHHmm"),

          time_end:
            values.time_end &&
            format(new Date(values.time_end), "yyyy-MM-dd HH:mm"),
          status: +values.status,
          uuid: pointProgram?.uuid,
        })
          .unwrap()
          .then((value) => {
            setIsEdit(!isEdit);

            if (value.status === 0) {
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

  const isDisableAccess = (type: string) => {
    if (isCreate === "true") return false;
    if (!isEdit) return true;
    if (pointProgram?.status === 2) return true;
    if (pointProgram?.status === 1 && type !== "status") return true;

    switch (type) {
      case "name":
        return true;
      case "time_start":
        return true;
      case "time_end":
        return false;
      case "products":
        return false;
      case "agent_or_group_agent":
        return false;
      case "retailer_group":
        return false;
      case "agents":
        return false;
      case "status":
        return false;
      default:
        return false;
    }
  };
  const MapBadge = () => {
    if (isCreate === "true") return null;
    if (pointProgram?.status === 0)
      return (
        <Badge bg="warning-gradient" className="badge">
          Chờ kích hoạt
        </Badge>
      );
    if (pointProgram?.status === 1)
      return (
        <Badge bg="success" className="badge">
          Đang chạy{" "}
        </Badge>
      );
    if (pointProgram?.status === 2)
      return (
        <Badge bg="info" className="badge">
          Kết thúc
        </Badge>
      );
    if (pointProgram?.status === 3)
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
          name: pointProgram?.name ?? "",
          products: mapCodeProduct(pointProgram?.products) as any,
          agents: mapAgent(pointProgram?.agents) as any,
          point_coefficient: pointProgram?.point_coefficient ?? 1,
          objectives: mapObjective(pointProgram?.objectives) as any,
          time_end: pointProgram?.time_end
            ? format(new Date(pointProgram.time_end), "yyyy-MM-dd")
            : ("" as any),
          time_start: pointProgram?.time_start
            ? format(new Date(pointProgram.time_start), "yyyy-MM-dd")
            : ("" as any),
          // locations: (mapProvince(pointProgram?.locations) ?? "") as any,
          locations: "all",
          status: pointProgram?.status ?? 0,
          uuid:
            (isCreate === "true"
              ? newUUID?.toString()
              : pointProgram?.uuid.toString()) ?? ("" as any),
          agent_or_group_agent: pointProgram?.agent_or_group_agent || 0,
          goods_type: mapGoodsType(pointProgram?.goods_type) ?? "",
          retailer_group: pointProgram?.retailer_group || "",
        }}
        enableReinitialize
        onSubmit={handleCreatePointProgram}
        validationSchema={pointProgramSchema}
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
                    ? "Thông tin chương trình tích điểm"
                    : "Chỉnh sửa chương trình tích điểm"}
                </Card.Title>
                {MapBadge()}
              </div>

              <div className="gap-2 d-flex">
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
                          <i className="ri-loader-2-fill fs-19"></i>
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
                          <i className="ri-loader-2-fill fs-19"></i>
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
                {!isEdit && (
                  <Form.Label className="text-black">
                    Loại chương trình <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                )}
                {!isEdit && (
                  <div className="d-flex gap-2 mb-2">
                    <button
                      onClick={() => setType("RETAILER")}
                      className={`btn ${
                        type === "RETAILER"
                          ? "btn-primary"
                          : "btn-primary-light"
                      }`}
                    >
                      Chương trình đại lý
                    </button>
                    <button
                      onClick={() => setType("FARMER")}
                      className={`btn ${
                        type === "FARMER" ? "btn-primary" : "btn-primary-light"
                      }`}
                    >
                      Chương trình nông dân
                    </button>
                  </div>
                )}
                {!isEdit && (
                  <p className=" text-xs text-gray">
                    {type === "RETAILER"
                      ? "*Đối tượng tham gia: Đại lý cấp 1, Đại lý cấp 2, Chưa xác thực"
                      : "*Đối tượng tham gia: Nông dân, Chưa xác thực"}
                  </p>
                )}
                <Form.Group>
                  <Form.Label className="text-black">
                    Tên chương trình <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Tên chương trình"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="input-placeholder"
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
                      placeholder="Ngày bắt đầu"
                      name="time_start"
                      value={values.time_start}
                      className="input-placeholder"
                      lang="vi"
                      onChange={handleChange}
                      isInvalid={touched.time_start && !!errors.time_start}
                      disabled={isDisableAccess("time_start")}
                      min={
                        new Date(new Date().setDate(new Date().getDate() + 2))
                          .toISOString()
                          .split("T")[0]
                      }
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
                      placeholder="Ngày kết thúc"
                      name="time_end"
                      className="input-placeholder"
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
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <FormCheck
                      className="form-check-md"
                      label="Chọn tất cả thùng"
                    />
                    <FormCheck
                      className="form-check-md"
                      label="Chọn tất cả gói"
                    />
                  </div>
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
                    className="basic-multi-select custom-multi mb-3 input-placeholder"
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
                {/* <Form.Group>
                    <Form.Label className="text-black">
                      Chọn tỉnh thành <span style={{ color: "red" }}>*</span>
                    </Form.Label>

                    <Select
                      isMulti
                      name="colors"
                      options={
                        values.locations?.[0]?.value === "all"
                          ? []
                          : values.locations?.length > 0
                          ? ([...PROVINCES] as any)
                          : ([
                              { value: "all", label: "Chọn tất cả" },
                              ...PROVINCES,
                            ] as any)
                      }
                      className=" basic-multi-select custom-multi mb-3"
                      id="choices-multiple-default"
                      menuPlacement="auto"
                      classNamePrefix="Select2"
                      isSearchable
                      isClearable
                      placeholder="Chọn tỉnh thành"
                      defaultValue={[PROVINCES[0] as any]}
                      value={values.locations}
                      onChange={(value) => setFieldValue("locations", value)}
                    />
                    {errors.locations && touched.locations && (
                      <p style={{ color: "red", fontSize: 12 }}>
                        {errors.locations.toString()}
                      </p>
                    )}
                  </Form.Group> */}
                {/* <Form.Group controlId="objectives_validate">
                  <Form.Label className="text-black">
                    Chọn đối tượng tham gia{" "}
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Select
                    isMulti
                    name="colors"
                    options={
                      values.objectives?.[0] === "all"
                        ? []
                        : values.objectives?.length > 0
                        ? ([...(OBJECTIVES_SELECT || [])] as any)
                        : ([
                            { value: "all", label: "Chọn tất cả" },
                            ...(OBJECTIVES_SELECT || []),
                          ] as any)
                    }
                    className="basic-multi-select custom-multi mb-3 input-placeholder"
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
                </Form.Group> */}
                {errors.objectives && touched.objectives && (
                  <p style={{ color: "red", fontSize: 12 }}>
                    {errors.objectives.toString()}
                  </p>
                )}

                <Form.Group>
                  <Form.Label className="text-black">
                    Chọn theo nhóm đại lý{" "}
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Check
                    type="switch"
                    className="form-check-lg form-switch input-placeholder"
                    checked={values.agent_or_group_agent === 1 ? true : false}
                    onChange={(value) => {
                      setFieldValue(
                        "agent_or_group_agent",
                        value.target.checked ? 1 : 0
                      );
                    }}
                    required
                    name="agent_or_group_agent"
                    disabled={isDisableAccess("agent_or_group_agent")}
                  />
                  {errors.agent_or_group_agent &&
                    touched.agent_or_group_agent && (
                      <p style={{ color: "red", fontSize: 12 }}>
                        {errors.agent_or_group_agent.toString()}
                      </p>
                    )}
                </Form.Group>
                {values.agent_or_group_agent ? (
                  <Form.Group>
                    <Form.Label className="text-black">
                      Nhóm đại lý <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Select
                      className="form-select input-placeholder"
                      name="retailer_group"
                      defaultValue={values.retailer_group}
                      onChange={handleChange}
                      isInvalid={
                        touched.retailer_group && !!errors.retailer_group
                      }
                      required
                      disabled={isDisableAccess("retailer_group")}
                    >
                      <option value={""}>-- Chọn nhóm đại lý --</option>
                      {retailerGroup?.map((item, index) => (
                        <option value={item.code} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.retailer_group && touched.retailer_group && (
                      <p style={{ color: "red", fontSize: 12 }}>
                        {errors.retailer_group.toString()}
                      </p>
                    )}
                  </Form.Group>
                ) : (
                  <Form.Group controlId="agents_validate">
                    <Form.Label className="text-black">
                      Chọn đại lý cấp 1 <span style={{ color: "red" }}>*</span>
                    </Form.Label>

                    <Select
                      isMulti
                      name="colors"
                      options={
                        values?.agents?.[0]?.value === "all"
                          ? []
                          : values?.agents?.length > 0
                          ? ([...(listAgencyC1 || [])] as any)
                          : ([
                              { value: "all", label: "Chọn tất cả" },
                              ...(listAgencyC1 || []),
                            ] as any)
                      }
                      className=" basic-multi-select custom-multi mb-3 input-placeholder"
                      id="choices-multiple-default"
                      menuPlacement="auto"
                      classNamePrefix="Select2"
                      isSearchable
                      placeholder="Chọn đại lý"
                      defaultValue={[listAgencyC1?.[0] as any]}
                      value={values.agents}
                      isLoading={isLoadingAgency}
                      isClearable
                      onChange={(value) => setFieldValue("agents", value)}
                      isDisabled={isDisableAccess("agents")}
                    />
                    {errors.agents && touched.agents && (
                      <p style={{ color: "red", fontSize: 12 }}>
                        {errors.agents.toString()}
                      </p>
                    )}
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.Label className="text-nowrap text-black">
                    Loại hàng hóa: <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Select
                    isMulti
                    name="goods_type"
                    options={[...(TypeBinExport || [])]}
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
            {/* <Modal show={true} size="lg">
              <Modal.Header closeButton>
                <Modal.Title as={"h5"}>
                  Chọn sản phẩm ({values.products?.length} SP){" "}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex gap-2">
                  <AppTable
                    title="Danh sách sản phẩm"
                    headers={[
                      {
                        key: "description",
                        label: "Tên sản phẩm",
                        render: (value) => <td>{value.description}</td>,
                      },

                      {
                        key: "image_url",
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
                        key: "check",
                        label: "Chọn sản phẩm",
                        render: (value) => (
                          <td>
                            <Checkbox />
                          </td>
                        ),
                      },
                      {
                        key: "name_display_root",
                        label: "Mã sản phẩm",
                        render: (value) => <td>{value.name_display_root}</td>,
                      },
                      {
                        key: "pack_configuration",
                        label: "Quy cách đóng gói",
                        render: (value) => <td>{value.pack_configuration}</td>,
                      },
                    ]}
                    data={products || []}
                  />
                </div>
              </Modal.Body>
            </Modal> */}
          </Card>
        )}
      </Formik>
    </Fragment>
  );
}

export default PointCreateEdit;
