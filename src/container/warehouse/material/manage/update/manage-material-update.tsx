import React, { Fragment, useContext, useEffect } from "react";
import { Card, Col, Form, Stack } from "react-bootstrap";
import AppWarning from "../../../../../components/AppWarning";
import { useUpdateIngredientByCodeMutation } from "../../../../../redux/api/product/product.api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as formik from "formik";
import { TIngredient } from "../../../../../assets/types";
import {
  useGetListBrandQuery,
  useGetListFormulationQuery,
  useGetListIndicationQuery,
  useGetListMaterialQuery,
} from "../../../../../redux/api/manage/manage.api";
import { COUNTRIES } from "../../../../../constants";
import { ToastContext } from "../../../../../components/AppToast";
import createIngredientSchema from "../../../../../schema/createIngredient.schema";
import { useGetIngredientByCodeQuery } from "../../../../../redux/api/warehouse/warehouse.api";
import Loading from "../../../../../assets/images/apps/loading.gif";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { useCheckTokenExpiredMutation } from "../../../../../redux/api/other/other.api";
const ManageMaterialUpdate = () => {
  const { code } = useParams();
  const { token } = useSelector((state: RootState) => state.auth);
  const [updateIngredient, { isLoading: isLoadingUpdate }] =
    useUpdateIngredientByCodeMutation();
  const { data: ingredient, isLoading: isLoadingIngredient } =
    useGetIngredientByCodeQuery(
      {
        code: code!,
      },
      {
        skip: !code ? true : false,
        refetchOnMountOrArgChange: true,
      }
    );
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useContext(ToastContext);
  const { Formik } = formik;
  const { data: listFormulation } = useGetListFormulationQuery();
  const { data: listBrand } = useGetListBrandQuery();
  const { data: listIndication } = useGetListIndicationQuery();
  const { data: listMaterial } = useGetListMaterialQuery();
  const [checkToken] = useCheckTokenExpiredMutation();

  const onHandleCreateIngredient = async (
    values: Omit<
      TIngredient,
      "id" | "code_old" | "product_line" | "product_line_name" | "brand_name"
    >
  ) => {
    await updateIngredient({
      ...values,
    })
      .unwrap()
      .then((result) => {
        if (result.status === 0) {
          toast.showToast("Cập nhật nguyên liệu thành công");
        } else toast.showToast("Cập nhật nguyên liệu thất bại");
      });
  };
  console.log(ingredient);
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
  return (
    <Fragment>
      {isLoadingIngredient ? (
        <div className="d-flex w-100 align-items-center justify-content-center">
          <img src={Loading} className="w-25" />
        </div>
      ) : (
        <Formik
          initialValues={{
            code: ingredient?.code ?? "",
            description: ingredient?.description ?? "",
            packing: ingredient?.packing ?? "",
            product_type: ingredient?.product_type ?? "",
            formulation: ingredient?.formulation ?? "", // formulation code
            weight: ingredient?.weight ?? 0,
            product_indication: ingredient?.product_indication ?? "", // indication code
            brand_code: ingredient?.brand_code ?? "", //brand code
            ingredient: ingredient?.ingredient ?? "",
            certificate_of_origin: ingredient?.certificate_of_origin ?? "",
            material: ingredient?.material ?? "", // material code
          }}
          onSubmit={onHandleCreateIngredient}
          enableReinitialize
          validationSchema={createIngredientSchema}
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
                <Card.Title>Thông tin mã vật tư</Card.Title>
                <div className="d-flex flex-row align-items-center gap-2">
                  <button
                    className="btn btn-danger-light"
                    type={"button"}
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Trở lại
                  </button>

                  <AppWarning onAccept={() => handleSubmit()}>
                    <button
                      className={`btn btn-purple-light justify-content-center align-items-center ${
                        isLoadingUpdate && "btn-loader "
                      }`}
                    >
                      <span>Cập nhật</span>
                      {isLoadingUpdate && (
                        <span className="loading">
                          <i className="ri-loader-2-fill fs-19"></i>
                        </span>
                      )}
                    </button>
                  </AppWarning>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-md-row flex-column gap-3">
                  <Stack gap={2} as={Col} md={6}>
                    <Form.Group>
                      <Form.Label className="text-black">
                        Loại vật tư <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Select
                        className="form-select input-placeholder"
                        name="material"
                        defaultValue={values.material}
                        onChange={(e) =>
                          setFieldValue("material", e.target.value)
                        }
                        isInvalid={touched.material && !!errors.material}
                        required
                      >
                        <option value={""}>Chọn loại vật tư</option>
                        {listMaterial?.map((material) => (
                          <option value={material.code} key={material.code}>
                            {material.name} ({material.code})
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.material}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="text-black">
                        Công thức <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Tên vật tư"
                        name="ingredient"
                        defaultValue={values.ingredient as string}
                        onChange={handleChange}
                        isInvalid={touched.ingredient && !!errors.ingredient}
                        className="input-placeholder"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.ingredient}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="text-black">
                        Tên vật tư <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="textarea"
                        placeholder="Mô tả vật tư"
                        name="description"
                        defaultValue={values.description as string}
                        onChange={handleChange}
                        isInvalid={touched.description && !!errors.description}
                        className="input-placeholder"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="text-black">
                        Tên thương hiệu <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Select
                        className="form-select input-placeholder"
                        name="brand_code"
                        defaultValue={values.brand_code}
                        onChange={(e) =>
                          setFieldValue("brand_code", e.target.value)
                        }
                        isInvalid={touched.brand_code && !!errors.brand_code}
                        required
                      >
                        <option value={""}>Chọn tên thương hiệu</option>
                        {listBrand?.map((brand) => (
                          <option value={brand.code} key={brand.code}>
                            {brand.name} ({brand.code})
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.brand_code}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="text-black">
                        Nhóm thuốc <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Select
                        className="form-select input-placeholder"
                        name="product_indication"
                        defaultValue={values.product_indication}
                        onChange={(e) =>
                          setFieldValue("product_indication", e.target.value)
                        }
                        isInvalid={
                          touched.product_indication &&
                          !!errors.product_indication
                        }
                        required
                      >
                        <option value={""}>Chọn nhóm thuốc </option>
                        {listIndication?.map((indication) => (
                          <option value={indication.code} key={indication.code}>
                            {indication.name} ({indication.code})
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.formulation}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="text-black">
                        Dạng thuốc <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Select
                        className="form-select input-placeholder"
                        name="formulation"
                        defaultValue={values.formulation}
                        onChange={(e) =>
                          setFieldValue("formulation", e.target.value)
                        }
                        isInvalid={touched.formulation && !!errors.formulation}
                        required
                      >
                        <option value={""}>Chọn dạng thuốc</option>
                        {listFormulation?.map((formulation) => (
                          <option
                            value={formulation.code}
                            key={formulation.code}
                          >
                            {formulation.name} ({formulation.code})
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.formulation}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="text-black">
                        Hàm lượng công thức{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        name="product_type"
                        defaultValue={values.product_type}
                        onChange={handleChange}
                        isInvalid={
                          touched.product_type && !!errors.product_type
                        }
                        placeholder="Hàm lượng công thức ( VD: 21-21-21+TE )"
                        className="input-placeholder"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.product_type}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Stack>
                  <Stack gap={2} as={Col} md={6}>
                    <Form.Group>
                      <Form.Label className="text-black">
                        Quy cách đóng gói
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Select
                        required
                        className="form-select input-placeholder"
                        name="packing"
                        defaultValue={values.packing}
                        onChange={handleChange}
                        isInvalid={touched.packing && !!errors.packing}
                      >
                        <option value="">-- Chọn quy cách đóng gói --</option>
                        <option value="Bao">Bao</option>
                        <option value="Can">Can</option>
                        <option value="Drum">Drum</option>
                        <option value="Phi">Phi</option>
                        <option value="Phuy">Phuy</option>
                        <option value="Thùng">Thùng</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.packing}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="text-black">
                        Khối lượng (kg/lt)
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        min={0}
                        name="weight"
                        defaultValue={values.weight}
                        onChange={handleChange}
                        isInvalid={touched.weight && !!errors.weight}
                        placeholder="Khối lượng"
                        className="input-placeholder"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.weight}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="text-black">
                        Chọn xuất xứ <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Select
                        className="form-select input-placeholder"
                        name="certificate_of_origin"
                        defaultValue={values.certificate_of_origin}
                        onChange={(e) =>
                          setFieldValue("certificate_of_origin", e.target.value)
                        }
                        isInvalid={
                          touched.certificate_of_origin &&
                          !!errors.certificate_of_origin
                        }
                        required
                      >
                        <option value={""}>Chọn xuất xứ</option>
                        <option value={"NONE"}>Không rõ xuất xứ</option>
                        {COUNTRIES.map((item, index) => (
                          <option value={item.value} key={index}>
                            {item.label}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.certificate_of_origin}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Stack>
                </div>
              </Card.Body>
            </Card>
          )}
        </Formik>
      )}
    </Fragment>
  );
};

export default ManageMaterialUpdate;
