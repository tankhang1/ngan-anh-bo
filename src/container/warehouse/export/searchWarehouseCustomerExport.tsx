import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup } from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { useGetExportByDocumentQuery } from "../../../redux/api/warehouse/warehouse.api";

function SearchWarehouseCustomerExport() {
  const [searchValue, setSearchValue] = useState("");
  const [isPermitSearch, setIsPermitSearch] = useState(false);

  const onSearch = () => {
    if (!searchValue) return;
    setIsPermitSearch(true);
  };

  const { data: exports, isLoading: loadingExport } =
    useGetExportByDocumentQuery(
      {
        code: searchValue,
      },
      {
        skip: !isPermitSearch,
      }
    );
  useEffect(() => {
    setIsPermitSearch(false);
  }, [exports]);
  return (
    <Fragment>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body>
            <div className="contact-header">
              <div className="d-flex flex-column gap-2">
                <div className="h6 fw-semibold mb-0">
                  Nhập mã phiếu xuất kho
                </div>
                <InputGroup className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    className="bg-light"
                    placeholder="Vui nhập mã phiếu xuất kho"
                    aria-describedby="search-contact-member"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSearch();
                    }}
                  />
                  <Button
                    className="btn btn-danger rounded-2"
                    onClick={() => {
                      setIsPermitSearch(false);
                      setSearchValue("");
                    }}
                  >
                    <i className="ti ti-x"></i>
                  </Button>
                  <Button
                    variant=""
                    aria-label="button"
                    className="btn btn-primary rounded-2"
                    type="button"
                    onClick={onSearch}
                  >
                    <i className="ri-search-line"></i>
                  </Button>
                </InputGroup>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      {exports?.length !== 0 ? (
        <Col xl={12}>
          <Card className="custom-card">
            <AppTable
              isHeader={false}
              title="Thông tin nhập kho"
              isLoading={loadingExport}
              maxPage={exports?.length}
              headers={[
                {
                  key: "document_code",
                  label: "Mã phiếu",
                  render: ({ document_code }) => <td>{document_code}</td>,
                },
                {
                  key: "agent_code",
                  label: "Mã đại lý",
                  render: ({ agent_code }) => <td>{agent_code}</td>,
                },
                {
                  key: "agent_name",
                  label: "Tên đại lý",
                  render: ({ agent_name }) => <td>{agent_name}</td>,
                },
                {
                  key: "batch_number",
                  label: "Mã lô",
                  render: ({ batch_number }) => <td>{batch_number}</td>,
                },
                {
                  key: "seri",
                  label: "Mã thùng",
                  render: ({ seri }) => <td>{seri}</td>,
                },
                {
                  key: "sku",
                  label: "Mã sản phẩm",
                  render: ({ sku }) => <td>{sku}</td>,
                },
                {
                  key: "staff_export_code",
                  label: "Mã nhân viên xuất kho",
                  render: ({ staff_export_code }) => (
                    <td>{staff_export_code}</td>
                  ),
                },
                {
                  key: "staff_export_name",
                  label: "Tên nhân viên xuất kho",
                  render: ({ staff_export_name }) => (
                    <td>{staff_export_name}</td>
                  ),
                },
                {
                  key: "receiver",
                  label: "Người nhận",
                  render: ({ receiver }) => <td>{receiver}</td>,
                },
                {
                  key: "work_center_export_code",
                  label: "Mã kho",
                  render: ({ work_center_export_code }) => (
                    <td>{work_center_export_code}</td>
                  ),
                },
                {
                  key: "time",
                  label: "Thời gian xuất kho",
                  render: ({ time }) => <td>{time}</td>,
                },
              ]}
              data={exports || []}
              searchByExternal="document_code"
              externalSearch=""
            />
          </Card>
        </Col>
      ) : (
        <p className="mx-auto text-black">Không có dữ liệu</p>
      )}
    </Fragment>
  );
}

export default SearchWarehouseCustomerExport;
