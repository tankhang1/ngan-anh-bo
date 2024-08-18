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

import { useFormik } from "formik";

function SearchProductCode() {
  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState("BIN");

  const onSearch = () => {};
  return (
    <Fragment>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body>
            <div className="contact-header">
              <div className="d-flex flex-column gap-2">
                <div className="h6 fw-semibold mb-0">
                  Nhập mã thùng hoặc mã gói
                </div>
                <InputGroup className="d-flex">
                  <Form.Control
                    type="text"
                    className="bg-light"
                    placeholder="Vui lòng nhập mã thùng hoặc mã gói tại đây"
                    aria-describedby="search-contact-member"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSearch();
                    }}
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
                <div className="flex gap-1">
                  <h4 className="h6 fw-semibold">Loại mã :</h4>
                  <Form.Group>
                    <Form.Check
                      type="radio"
                      label="Mã thùng"
                      value={"BIN"}
                      className="form-check-md"
                      checked={type === "BIN"}
                      onClick={(e) => setType(e.currentTarget.value)}
                    />
                    <Form.Check
                      type="radio"
                      label="Mã gói"
                      value={"PACKET"}
                      checked={type === "PACKET"}
                      className="form-check-md"
                      onClick={(e) => setType(e.currentTarget.value)}
                    />
                  </Form.Group>
                </div>
                <button
                  className="btn btn-primary mx-auto text-nowrap px-5"
                  style={{ width: "auto" }}
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Row>
        <Col md={6}>
          <Stack>
            <Card className="custom-card p-3">
              <Card.Header>
                <h5>Thông tin sản phẩm</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                        borderRadius: 10,
                      }}
                      //   src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
                      src="https://fgkawrverpi1qyawfgb.yis.vn/NACK54T.jpg"
                    />
                  </Col>
                  <Col md={6}>
                    <Stack gap={1}>
                      <span className="text-black fs-17 fw-smibold">
                        &#x2022; Mã sản phẩm :{" "}
                        <span className="fw-normal">WWWWW</span>
                      </span>
                      <span className="text-black fs-17 fw-smibold">
                        &#x2022; Tên sản phẩm :{" "}
                        <span className="fw-normal">Sản phẩm A</span>
                      </span>
                      <span className="text-black fs-17 fw-smibold">
                        &#x2022; Nhóm sản phẩm :{" "}
                        <span className="fw-normal">Nhóm cây trồng</span>
                      </span>
                      <span className="text-black fs-17 fw-smibold">
                        &#x2022; Mã nhắn tin :{" "}
                        <span className="fw-normal">RSSAA</span>
                      </span>
                      <span className="text-black fs-17 fw-smibold">
                        &#x2022; Mã QR :{" "}
                        <span className="fw-normal">ARDDD</span>
                      </span>
                      <span className="text-black fs-17 fw-smibold">
                        &#x2022; Ngày sản xuất :{" "}
                        <span className="fw-normal">01/08/2024</span>
                      </span>
                      <span className="text-black fs-17 fw-smibold">
                        &#x2022; Ngày hết hạn :{" "}
                        <span className="fw-normal">15/08/2024</span>
                      </span>
                      <span className="text-black fs-17 fw-smibold">
                        &#x2022; Trạng thái :{" "}
                        <span className="fw-normal">
                          <Badge bg="danger">Đã sử dụng</Badge>
                        </span>
                      </span>
                    </Stack>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="custom-card p-3">
              <Card.Header>
                <h5>Thông tin xuất kho</h5>
              </Card.Header>
              <Card.Body>
                <Stack gap={1}>
                  <span className="text-black fs-17 fw-smibold">
                    - Mã thùng : <span className="fw-normal">WWWWW</span>
                  </span>
                  <span className="text-black fs-17 fw-smibold">
                    - Lệnh sản phẩm :{" "}
                    <span className="fw-normal">AAAAAAAAA</span>
                  </span>
                  <span className="text-black fs-17 fw-smibold">
                    - Lô sản xuất :{" "}
                    <span className="fw-normal">Nhóm cây trồng</span>
                  </span>
                  <span className="text-black fs-17 fw-smibold">
                    - Ngày xuất kho : <span className="fw-normal">RSSAA</span>
                  </span>
                  <span className="text-black fs-17 fw-smibold">
                    - Đại lý cấp 1 : <span className="fw-normal">ARDDD</span>
                  </span>
                </Stack>
              </Card.Body>
            </Card>
          </Stack>
        </Col>
        <Col md={6}>
          <Card className="custom-card p-3">
            <Card.Header>
              <h5>Thông tin khách hàng</h5>
            </Card.Header>
            <Card.Body>
              <Stack gap={1}>
                <span className="text-black fs-17 fw-smibold">
                  - Đối tượng khách hàng :{" "}
                  <span className="fw-normal">Đại lý cấp 2</span>
                </span>
                <span className="text-black fs-17 fw-smibold">
                  - Mã khách hàng : <span className="fw-normal">WWWWW</span>
                </span>
                <span className="text-black fs-17 fw-smibold">
                  - Tên khách hàng :{" "}
                  <span className="fw-normal">AAAAAAAAA</span>
                </span>
                <span className="text-black fs-17 fw-smibold">
                  - Số điện thoại :{" "}
                  <span className="fw-normal">0566699955</span>
                </span>
                <span className="text-black fs-17 fw-smibold">
                  - Tỉnh : <span className="fw-normal">Lai châu</span>
                </span>
                <span className="text-black fs-17 fw-smibold">
                  - Vùng : <span className="fw-normal">Đông Nam Bộ</span>
                </span>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

export default SearchProductCode;
