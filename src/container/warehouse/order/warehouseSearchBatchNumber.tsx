import React, { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { useGetExportBinsByBatchQuery } from "../../../redux/api/warehouse/warehouse.api";
import { IconSearch, IconX } from "@tabler/icons-react";

const WarehouseSearchBatchNumber = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isPermitSearch, setIsPermitSearch] = useState(false);
  const isFetchingBinPackage = false;
  const { data: bins, isFetching: isFetchingBin } =
    useGetExportBinsByBatchQuery(
      {
        bn: searchValue,
      },
      {
        skip: !isPermitSearch,
      }
    );

  const onSearch = () => {
    if (!searchValue) return;
    setIsPermitSearch(true);
  };
  useEffect(() => {
    setIsPermitSearch(false);
  }, [bins]);
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
                    placeholder="Vui lòng nhập mã lô"
                    aria-describedby="search-contact-member"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSearch();
                    }}
                    onBeforeInputCapture={() => {
                      setIsPermitSearch(false);
                    }}
                  />
                  <Button
                    className="btn btn-danger rounded-2"
                    onClick={() => {
                      setIsPermitSearch(false);
                      setSearchValue("");
                    }}
                  >
                    <IconX size={16} />
                  </Button>
                  <Button
                    variant=""
                    aria-label="button"
                    className="btn btn-primary rounded-2"
                    type="button"
                    onClick={onSearch}
                  >
                    <IconSearch size={16} />
                  </Button>
                </InputGroup>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Stack gap={4}>
        {/* <Row>
          <Col md={6}>
            <Card className="custom-card p-3 h-100">
              <Card.Header>
                <h5>Thông tin lô</h5>
              </Card.Header>
              <Card.Body>
                <Stack gap={1}>
                  <span className="text-black fs-17 fw-smibold">
                    &#x2022; Mã sản phẩm :{" "}
                    <span className="fw-normal">NAXXXXXX</span>
                  </span>
                  <span className="text-black fs-17 fw-smibold">
                    &#x2022; Tên sản phẩm :{" "}
                    <span className="fw-normal">XXXXXXX</span>
                  </span>
                  <span className="text-black fs-17 fw-smibold">
                    &#x2022; Nhóm sản phẩm :{" "}
                    <span className="fw-normal">XXXXXXX</span>
                  </span>

                  <span className="text-black fs-17 fw-smibold">
                    &#x2022; Ngày sản xuất :{" "}
                    <span className="fw-normal">XXXXX</span>
                  </span>
                  <span className="text-black fs-17 fw-smibold">
                    &#x2022; Ngày hết hạn :{" "}
                    <span className="fw-normal">XXXXX</span>
                  </span>
                  <span className="text-black fs-17 fw-smibold">
                    &#x2022; Thông tin lệnh sản xuất :{" "}
                    <span className="fw-normal">XXXXX</span>
                  </span>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="custom-card p-3 h-100">
              <Card.Header>
                <h5>Thông tin lô nguyên liệu</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Stack gap={1}>
                    <span className="text-black fs-17 fw-smibold">
                      &#x2022; Mã lô :{" "}
                      <span className="fw-normal">{searchValue}</span>
                    </span>
                    <span className="text-black fs-17 fw-smibold">
                      &#x2022; Tên lô nguyên liệu:{" "}
                      <span className="fw-normal">NAXXXXXX</span>
                    </span>

                    <span className="text-black fs-17 fw-smibold">
                      &#x2022; Ngày sản xuất :{" "}
                      <span className="fw-normal">XXXXX</span>
                    </span>
                    <span className="text-black fs-17 fw-smibold">
                      &#x2022; Ngày hết hạn :{" "}
                      <span className="fw-normal">XXXXX</span>
                    </span>
                    <span className="text-black fs-17 fw-smibold">
                      &#x2022; Nguồn gốc :{" "}
                      <span className="fw-normal">XXXXX</span>
                    </span>
                  </Stack>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
        <Col>
          <Card className="custom-card p-3">
            <Card.Body>
              <AppTable
                isHeader={true}
                title="Danh sách thùng"
                headers={[
                  {
                    key: "id",
                    label: "Id",
                    render: ({ id }) => <td>{id}</td>,
                  },
                  {
                    key: "shipment_code",
                    label: "Lệnh sản xuất",
                    render: ({ agent_code }) => <td>{agent_code}</td>,
                  },
                  {
                    key: "document_code",
                    label: "Mã phiếu",
                    render: ({ document_code }) => <td>{document_code}</td>,
                  },
                  {
                    key: "batch_number",
                    label: "Lô sản suất/ Batch",
                    render: ({ agent_name }) => <td>{agent_name}</td>,
                  },
                  {
                    key: "code",
                    label: "Mã thùng",
                    render: ({ code }) => <td>{code}</td>,
                  },
                  {
                    key: "shipment_code",
                    label: "Tên sản phẩm",
                    render: ({ agent_code }) => <td>{agent_code}</td>,
                  },
                  {
                    key: "goods_type",
                    label: "Loại hàng hóa",
                    render: ({ goods_type }) => <td>{goods_type}</td>,
                  },
                  {
                    key: "staff_export_code",
                    label: "Số lượng code gói",
                    render: ({ staff_export_code }) => (
                      <td>{staff_export_code}</td>
                    ),
                  },
                  {
                    key: "staff_export_name",
                    label: "Trạng thái",
                    render: ({ staff_export_name }) => (
                      <td>{staff_export_name}</td>
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
                    key: "time",
                    label: "Thời gian xuất kho",
                    render: ({ time }) => <td>{time}</td>,
                  },
                  {
                    key: "work_center_export_code",
                    label: "Mã kho",
                    render: ({ work_center_export_code }) => (
                      <td>{work_center_export_code}</td>
                    ),
                  },
                ]}
                data={bins || []}
                isLoading={isFetchingBin}
              />
            </Card.Body>
          </Card>
        </Col>
      </Stack>
    </Fragment>
  );
};

export default WarehouseSearchBatchNumber;
