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
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
  Form,
} from "react-bootstrap";
import { Formik } from "formik";
import { TPointCreateForm } from "../../../../assets/types";
import Select from "react-select";
import { OBJECTIVES_SELECT, PROVINCES } from "../../../../constants";
import { useParams } from "react-router-dom";
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
import { useGetListAgencyC1Query } from "../../../../redux/api/manage/manage.api";
import {
  useGetListProgramPointByTimeQuery,
  useGetListProgramPointStatusQuery,
} from "../../../../redux/api/program/program.api";
import { format } from "date-fns";
import { ToastContext } from "../../../../components/AppToast";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType
);

function PointCreateEdit() {
  const toast = useContext(ToastContext);

  const { isCreate, id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const { data: products, isLoading: isLoadingProducts } =
    useGetListProductsQuery(null);
  const { data: newUUID } = useGetNewUUIDQuery(null, {
    refetchOnFocus: true,
    skip: isCreate !== "true",
  });
  const { data: listAgencyC1, isLoading: isLoadingAgency } =
    useGetListAgencyC1Query();
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

  // const schema = yup.object().shape({
  //   customer_code: yup.string().required().default(""),
  //   customer_name: yup.string().required().default(""),
  //   customer_province: yup.string().required().default(""),
  //   customer_type: yup.string().required("Trường bắt buộc"),
  //   info_primary: yup.number().required(),
  //   sign_board: yup.string().required(),
  //   customer_address: yup.string().required(),
  //   customer_district: yup.string().required(),
  // });

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
          label: `${product1.name_display}-${product1.code}`,
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

  const [updatePointProgram] = useUpdatePointProgramMutation();
  const [createPointProgram] = useCreatePointProgramMutation();

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
        objectives:
          typeof values.objectives !== "string"
            ? values.objectives.length === 1 &&
              values.objectives[0]?.value === "all"
              ? OBJECTIVES_SELECT?.map((item) => item.value).join(",")
              : values.objectives.map((item) => item.value).join(",")
            : "",
        locations:
          typeof values.locations !== "string"
            ? values.locations.length === 1 &&
              values.locations[0]?.value === "all"
              ? PROVINCES?.map((item) => item.value).join(",")
              : values.locations.map((item) => item.value).join(",")
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
            toast.showToast("Thêm mới chương trình thành công");
            return;
          }
          if (value.status === -4) {
            toast.showToast("Ngày bắt đầu sau 1 ngày");
            return;
          }
          toast.showToast("Thêm mới chương trình bị lỗi");
        })
        .catch(() => {
          toast.showToast("Thêm mới thất bại");
        });
    } else {
      setIsEdit(!isEdit);
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
          objectives:
            typeof values.objectives !== "string"
              ? values.objectives.length === 1 &&
                values.objectives[0]?.value === "all"
                ? OBJECTIVES_SELECT?.map((item) => item.value).join(",")
                : values.objectives.map((item) => item.value).join(",")
              : "",
          locations:
            typeof values.locations !== "string"
              ? values.locations.length === 1 &&
                values.locations[0]?.value === "all"
                ? PROVINCES?.map((item) => item.value).join(",")
                : values.locations.map((item) => item.value).join(",")
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
            if (value.status === 0) {
              toast.showToast("Cập nhật chương trình thành công");
              return;
            }
            if (value.status === -4) {
              toast.showToast("Ngày bắt đầu sau 1 ngày");
              return;
            }
            toast.showToast(value.message);
          })
          .catch(() => {
            toast.showToast("Cập nhật  thất bại");
          });
      }
    }
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
          locations: (mapProvince(pointProgram?.locations) ?? "") as any,
          status: pointProgram?.status ?? 0,
          uuid:
            (isCreate === "true"
              ? newUUID?.toString()
              : pointProgram?.uuid.toString()) ?? ("" as any),
        }}
        enableReinitialize
        onSubmit={handleCreatePointProgram}
        //validationSchema={schema}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Card className="custom-card">
              <Card.Header className="justify-content-between">
                <Card.Title>
                  {!isEdit
                    ? "Thông tin chương trình tích điểm"
                    : "Chỉnh sửa chương trình tích điểm"}
                </Card.Title>
                <div>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip className="tooltip">
                        {!isEdit ? "Chỉnh sửa" : "Lưu"}
                      </Tooltip>
                    }
                  >
                    {isCreate === "true" ? (
                      <button
                        className="btn  btn-purple-light ms-2"
                        type="submit"
                        onClick={() => {}}
                      >
                        Thêm mới
                      </button>
                    ) : (
                      <button
                        className="btn btn-purple-light"
                        type="submit"
                        onClick={() => {}}
                      >
                        {!isEdit ? "Chỉnh sửa" : "Lưu"}
                      </button>
                    )}
                  </OverlayTrigger>
                </div>
              </Card.Header>
              <Card.Body>
                <Stack className="d-flex gap-1">
                  <Form.Group controlId="uuid_validate">
                    <Form.Label className="text-black">
                      Mã chương trình
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
                  </Form.Group>
                  <Form.Group controlId="name_validate">
                    <Form.Label className="text-black">
                      Tên chương trình
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      id="name_validate"
                      placeholder="Tên chương trình"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={touched.name && !!errors.name}
                      disabled={isCreate !== "true"}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row>
                    <Form.Group as={Col} md={6} controlId="time_start_validate">
                      <Form.Label className="text-black">
                        Ngày bắt đầu
                      </Form.Label>
                      <Form.Control
                        required
                        type="date"
                        id="time_start_validate"
                        placeholder="Ngày bắt đầu"
                        name="time_start"
                        value={values.time_start}
                        lang="vi"
                        onChange={handleChange}
                        isInvalid={touched.time_start && !!errors.time_start}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.time_start?.toString()}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId="time_end_validate"
                      className="mb-2"
                      as={Col}
                      md={6}
                    >
                      <Form.Label className="text-black">
                        Ngày kết thúc
                      </Form.Label>
                      <Form.Control
                        required
                        type="date"
                        id="time_end_validate"
                        placeholder="Ngày kết thúc"
                        name="time_end"
                        value={values.time_end}
                        onChange={handleChange}
                        isInvalid={touched.time_end && !!errors.time_end}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.time_end?.toString()}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Form.Group controlId="customer_province_validate">
                    <Form.Label className="text-black">
                      Chọn sản phẩm
                    </Form.Label>

                    <Select
                      isMulti
                      name="colors"
                      options={
                        [
                          { value: "all", label: "Chọn tất cả" },
                          ...(mapProduct ?? []),
                        ] as any
                      }
                      className="default basic-multi-select custom-multi mb-3"
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
                    />
                  </Form.Group>
                  <Form.Group controlId="locations_validate">
                    <Form.Label className="text-black">
                      Chọn tỉnh thành
                    </Form.Label>

                    <Select
                      isMulti
                      name="colors"
                      options={
                        [
                          { value: "all", label: "Chọn tất cả" },
                          ...PROVINCES,
                        ] as any
                      }
                      className="default basic-multi-select custom-multi mb-3"
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
                  </Form.Group>
                  <Form.Group controlId="objectives_validate">
                    <Form.Label className="text-black">
                      Chọn đối tượng tham gia
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
                      className="default basic-multi-select custom-multi mb-3"
                      id="choices-multiple-default"
                      menuPlacement="auto"
                      classNamePrefix="Select2"
                      isSearchable
                      placeholder="Chọn đối tượng tham gia"
                      defaultValue={[OBJECTIVES_SELECT?.[0] as any]}
                      value={values.objectives}
                      isClearable
                      onChange={(value) => setFieldValue("objectives", value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="agents_validate">
                    <Form.Label className="text-black">
                      Chọn đại lý cấp 1
                    </Form.Label>

                    <Select
                      isMulti
                      name="colors"
                      options={
                        [
                          { value: "all", label: "Chọn tất cả" },
                          ...(listAgencyC1 || []),
                        ] as any
                      }
                      className="default basic-multi-select custom-multi mb-3"
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
                    />
                  </Form.Group>
                  {/* <Form.Group controlId="point_validate">
                    <Form.Label className='text-black'>Nhập số điểm</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      min={0}
                      placeholder="Nhập số điểm"
                      name="point"
                      value={values.point}
                      onChange={handleChange}
                      isInvalid={touched.point && !!errors.point}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.point}
                    </Form.Control.Feedback>
                  </Form.Group> */}
                  <Form.Group controlId="status_validate">
                    <Form.Label className="text-black">Trạng thái</Form.Label>
                    <Form.Select
                      className="form-select"
                      name="status"
                      onChange={handleChange}
                      value={values.status}
                      isInvalid={touched.status && !!errors.status}
                      required
                    >
                      <option value={0} label="Chờ kích hoạt" />
                      <option value={1} label="Đang chạy" />
                      <option value={2} label="Hết thời hạn" />
                      <option value={3} label="Tạm dừng" />
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Stack>
              </Card.Body>
            </Card>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}

export default PointCreateEdit;
