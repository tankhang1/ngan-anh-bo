import React, { Fragment, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Modal } from "react-bootstrap";
import AppTable from "../../components/common/table/table";
import { BaseQuery } from "../../assets/types";
import { fDate } from "../../hooks";
import { useExportWarehouseExportDetailMutation } from "../../redux/api/excel/excel.api";
import {
  useGetInventoryBatchNumberQuery,
  useGetListInventoryBatchNumberQuery,
} from "../../redux/api/mobile/mobi.api";
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
type TExportForm = {
  document_code: string;
  type: string;
  start_date: string;
  end_date: string;
};
const WarehouseInventory = () => {
  const [openDetail, setOpenDetail] = useState(false);
  const [search, setSearch] = useState("");
  const { data: listInventory, isLoading: isLoadingListInventory } =
    useGetListInventoryBatchNumberQuery();

  const { data: inventory, isLoading: isLoadingInventory } =
    useGetInventoryBatchNumberQuery(
      {
        batchNumner: search!,
      },
      {
        skip: search ? false : true,
      }
    );

  return (
    <Fragment>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body>
            <div className="contact-header">
              <div className="d-flex flex-column gap-2">
                <div className="h6 fw-semibold mb-0">Nhập mã lô</div>
                <InputGroup className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    className="bg-light"
                    placeholder="Vui nhập mã lô"
                    aria-describedby="search-contact-member"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />

                  <Button
                    variant=""
                    aria-label="button"
                    className="btn btn-primary rounded-2"
                    type="button"
                  >
                    <i className="ri-search-line"></i>
                  </Button>
                </InputGroup>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={12}>
        <Card className="custom-card">
          <AppTable
            isHeader={false}
            title="Thông tin tồn kho"
            isLoading={isLoadingListInventory}
            headers={[
              {
                key: "batch_number",
                label: "Mã lệnh sản xuất",
                render: ({ procedure_order_code }) => (
                  <td>{procedure_order_code}</td>
                ),
              },
              {
                key: "batch_number",
                label: "Mã lô",
                render: ({ batch_number }) => <td>{batch_number}</td>,
              },
              {
                key: "product_name",
                label: "Tên lệnh sản phẩm",
                render: ({ product_name }) => <td>{product_name}</td>,
              },
              {
                key: "",
                label: "Chức năng",
                render: (value) => (
                  <td>
                    <button
                      className="btn btn-icon btn-sm btn-primary-ghost"
                      onClick={() => {
                        setOpenDetail(true);
                        setSearch(value.batch_number);
                      }}
                    >
                      <i className="ti ti-edit"></i>
                    </button>
                  </td>
                ),
              },
            ]}
            data={listInventory || []}
            externalSearch={search}
            searchByExternal="batch_number"
          />
        </Card>
      </Col>
      <Modal
        show={openDetail}
        onHide={() => {
          setSearch("");
          setOpenDetail(false);
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Danh sách chi tiết ( Lô: {inventory?.[0]?.batch_number} )
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppTable
            title=""
            isLoading={isLoadingInventory}
            headers={[
              {
                key: "seri",
                label: "Mã thùng",
                render: ({ seri }) => <td>{seri}</td>,
              },
              {
                key: "manufacture_date",
                label: "Ngày sản xuất",
                render: ({ manufacture_date }) => (
                  <td>{fDate(manufacture_date, "dd/MM/yyyy HH:mm:ss")}</td>
                ),
              },
              {
                key: "expiration_date",
                label: "Hạn sử dụng",
                render: ({ expiration_date }) => (
                  <td>{fDate(expiration_date, "dd/MM/yyyy HH:mm:ss")}</td>
                ),
              },
              {
                key: "expect_packing_date",
                label: "Ngày đóng gói dự kiến",
                render: ({ expect_packing_date }) => (
                  <td>{fDate(expect_packing_date, "dd/MM/yyyy HH:mm:ss")}</td>
                ),
              },
              {
                key: "time",
                label: "Thời gian đóng gói",
                render: ({ time }) => <td>{time}</td>,
              },
            ]}
            data={inventory || []}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default WarehouseInventory;
