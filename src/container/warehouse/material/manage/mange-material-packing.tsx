import React, { Fragment, useContext, useDeferredValue, useState } from "react";
import { Button, Card, Col, Form, InputGroup } from "react-bootstrap";
import AppTable from "../../../../components/common/table/table";

import { ToastContext } from "../../../../components/AppToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useGetListIngredientPackingQuery } from "../../../../redux/api/warehouse/warehouse.api";
import { fDate } from "../../../../hooks";
import { format } from "date-fns";

function ManageMaterialPacking() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const toast = useContext(ToastContext);
  const [search, setSearch] = useState("");
  const deferSearchValue = useDeferredValue(search);

  const { data: ingredients, isLoading: isLoadingIngredient } =
    useGetListIngredientPackingQuery(undefined, {
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
                      placeholder="Nhập thông tin"
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
                key: "shipment_code",
                label: "Mã vận đơn",
                render: (value) => <td>{value.shipment_code}</td>,
              },
              {
                key: "import_date",
                label: "Ngày nhập kho",
                render: (value) => (
                  <td>
                    {format(
                      new Date(fDate(value.import_date)),
                      "dd/MM/yyyy HH:mm:ss"
                    )}
                  </td>
                ),
              },
              {
                key: "manufacture_date",
                label: "Ngày sản xuất",
                render: (value) => (
                  <td>
                    {format(
                      new Date(fDate(value.manufacture_date)),
                      "dd/MM/yyyy HH:mm:ss"
                    )}
                  </td>
                ),
              },
              {
                key: "expiration_date",
                label: "Ngày hết hạn",
                render: (value) => (
                  <td>
                    {format(
                      new Date(fDate(value.expiration_date)),
                      "dd/MM/yyyy HH:mm:ss"
                    )}
                  </td>
                ),
              },
              {
                key: "ingredient_code",
                label: "Mã vật tư",
                render: (value) => <td>{value.ingredient_code}</td>,
              },
              {
                key: "ingredient_name",
                label: "Tên vật tư",
                render: (value) => <td>{value.ingredient_name}</td>,
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
                key: "unit",
                label: "Đơn vị tính",
                render: (value) => <td>{value.unit}</td>,
              },
              {
                key: "orgin",
                label: "Nguồn gốc",
                render: (value) => <td>{value.orgin}</td>,
              },
            ]}
            data={ingredients || []}
          />
        </Card>
      </Col>
    </Fragment>
  );
}

export default ManageMaterialPacking;
