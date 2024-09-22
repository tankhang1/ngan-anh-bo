import React, { Fragment, useState } from "react";
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
import { BASE_PORT } from "../../../constants";
import AppTable from "../../../components/common/table/table";

const WarehouseSearchBatchNumber = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isPermitSearch, setIsPermitSearch] = useState(false);
  const isFetchingBinPackage = false;
  const onSearch = () => {};
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
      <Row>
        <Col md={6}>
          <Card className="custom-card p-3">
            <Card.Header>
              <h5>Thông tin lô</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <img
                    style={{
                      width: "100%",
                      maxHeight: 300,
                      objectFit: "fill",
                      borderRadius: 10,
                    }}
                    src={
                      //   product?.code
                      //     ? `${BASE_PORT}/${product?.code}.jpg`
                      //     : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
                    }
                  />
                </Col>
                <Col md={6}>
                  <Stack gap={1}>
                    <span className="text-black fs-17 fw-smibold">
                      &#x2022; Mã iQr :{" "}
                      <span className="fw-normal">{searchValue}</span>
                    </span>
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
                </Col>
              </Row>
              {/* )} */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="custom-card p-3">
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
                </Stack>
              </Row>
            </Card.Body>
          </Card>
        </Col>
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
                  key: "Lô sản xuất /Batch",
                  label: "Tên đại lý",
                  render: ({ agent_name }) => <td>{agent_name}</td>,
                },

                {
                  key: "goods_type",
                  label: "Số thùng",
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
              ]}
              data={[]}
            />
          </Card.Body>
        </Card>
      </Row>
    </Fragment>
  );
};

export default WarehouseSearchBatchNumber;
