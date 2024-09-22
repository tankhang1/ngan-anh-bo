import React, { Fragment, useContext, useDeferredValue, useState } from "react";
import { Button, Card, Col, Form, InputGroup } from "react-bootstrap";
import AppTable from "../../../../components/common/table/table";

import { ToastContext } from "../../../../components/AppToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useGetListIngredientAllQuery } from "../../../../redux/api/warehouse/warehouse.api";
import { useNavigate } from "react-router-dom";

function ManageMaterial() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const toast = useContext(ToastContext);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("code");
  const deferSearchValue = useDeferredValue(search);
  const navigate = useNavigate();
  const { data: ingredients, isLoading: isLoadingIngredient } =
    useGetListIngredientAllQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

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
                      placeholder="Mã vật tư"
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
            title="Thông tin nguyên vật liệu"
            isLoading={isLoadingIngredient}
            headers={[
              {
                key: "code",
                label: "Mã vật tư",
                render: (value) => <td>{value.code}</td>,
              },
              {
                key: "description",
                label: "Mô tả vật tư",
                render: (value) => <td>{value.description}</td>,
              },
              {
                key: "ingredient",
                label: "Thành phần",
                render: (value) => <td>{value.ingredient}</td>,
              },
              {
                key: "product_type",
                label: "Hàm lượng công thức",
                render: (value) => <td>{value.product_type}</td>,
              },
              {
                key: "packing",
                label: "Quy cách đóng gói",
                render: (value) => <td>{value.packing}</td>,
              },
              {
                key: "weight",
                label: "Trọng lượng",
                render: (value) => <td>{value.weight}</td>,
              },
              {
                key: "certificate_of_origin",
                label: "Nguồn gốc",
                render: (value) => <td>{value.certificate_of_origin}</td>,
              },
              {
                key: "",
                label: "Chức năng",
                render: (value) => (
                  <td>
                    <span className="d-flex justify-content-center align-item-center">
                      <button
                        className="btn btn-icon btn-sm btn-primary-ghost"
                        onClick={() => {
                          navigate(
                            `/warehouse/report-material/update/${value.code}`
                          );
                        }}
                      >
                        <i className="ti ti-edit"></i>
                      </button>
                    </span>
                  </td>
                ),
              },
            ]}
            data={ingredients || []}
            searchByExternal={searchBy}
          />
        </Card>
      </Col>
    </Fragment>
  );
}

export default ManageMaterial;
