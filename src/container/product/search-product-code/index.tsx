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

import {
  useGetBinPackageByCodeQuery,
  useGetCustomerByCodeQuery,
  useGetProductBySkuQuery,
  useGetWarehouseExportBinQuery,
} from "../../../redux/api/info/info.api";
import { BASE_PORT } from "../../../constants";
import { fDate } from "../../../hooks";
import Loading from "../../../assets/images/apps/loading.gif";
function SearchProductCode() {
  const [searchValue, setSearchValue] = useState("");
  const [isPermitSearch, setIsPermitSearch] = useState(false);
  const { data: binPackage, isFetching: isFetchingBinPackage } =
    useGetBinPackageByCodeQuery(
      {
        val: searchValue.trim(),
      },
      {
        skip: !isPermitSearch || !searchValue,
      }
    );
  const { data: product } = useGetProductBySkuQuery(
    {
      sku: binPackage?.product_code || "",
    },
    {
      skip: !binPackage?.product_code,
    }
  );
  const { data: warehouseExport } = useGetWarehouseExportBinQuery(
    binPackage?.seri || "",
    {
      skip: !binPackage?.seri,
    }
  );
  const { data: customer } = useGetCustomerByCodeQuery(
    {
      c: binPackage?.customer_code || "",
    },
    {
      skip: !binPackage?.customer_code,
    }
  );
  const onSearch = () => {
    setIsPermitSearch(true);
  };

  return (
    <Fragment>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body>
            <div className="contact-header">
              <div className="d-flex flex-column gap-2">
                <div className="h6 fw-semibold mb-0">Nhập mã iQR</div>
                <InputGroup className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    className="bg-light"
                    placeholder="Vui lòng nhập mã iQR"
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
          <Stack>
            <Card className="custom-card p-3">
              <Card.Header>
                <h5>Thông tin sản phẩm</h5>
              </Card.Header>
              <Card.Body>
                {isFetchingBinPackage ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <img src={Loading} className="w-25" />
                  </div>
                ) : !binPackage ? (
                  <div className="d-flex justify-content-center align-items-center">
                    Chưa có thông tin
                  </div>
                ) : (
                  <Row>
                    <Col md={6}>
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "fill",
                          borderRadius: 10,
                        }}
                        src={
                          product?.code
                            ? `${BASE_PORT}/${product?.code}.jpg`
                            : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <Stack gap={1}>
                        <span className="text-black fs-17 fw-smibold">
                          &#x2022; Mã sản phẩm :{" "}
                          <span className="fw-normal">{product?.code}</span>
                        </span>
                        <span className="text-black fs-17 fw-smibold">
                          &#x2022; Tên sản phẩm :{" "}
                          <span className="fw-normal">
                            {product?.product_name_detail}
                          </span>
                        </span>
                        <span className="text-black fs-17 fw-smibold">
                          &#x2022; Nhóm sản phẩm :{" "}
                          <span className="fw-normal">
                            {product?.category_name}
                          </span>
                        </span>
                        <span className="text-black fs-17 fw-smibold">
                          &#x2022; Mã nhắn tin / QR :{" "}
                          <span className="fw-normal">{searchValue}</span>
                        </span>

                        <span className="text-black fs-17 fw-smibold">
                          &#x2022; Ngày sản xuất :{" "}
                          <span className="fw-normal">
                            {binPackage?.manufacture_date
                              ? fDate(binPackage.manufacture_date)
                              : ""}
                          </span>
                        </span>
                        <span className="text-black fs-17 fw-smibold">
                          &#x2022; Ngày hết hạn :{" "}
                          <span className="fw-normal">
                            {binPackage?.expiration_date
                              ? fDate(binPackage.expiration_date)
                              : ""}
                          </span>
                        </span>
                        <span className="text-black fs-17 fw-smibold">
                          &#x2022; Trạng thái :{" "}
                          <span className="fw-normal">
                            {binPackage?.status === 1 ? (
                              <Badge bg="danger">Đã sử dụng</Badge>
                            ) : binPackage?.status === 2 ? (
                              <Badge bg="warning">Sản phẩm được thu hồi</Badge>
                            ) : (
                              <Badge bg="success">Chưa sử dụng</Badge>
                            )}
                          </span>
                        </span>
                      </Stack>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>

            <Card className="custom-card p-3">
              <Card.Header>
                <h5>Thông tin xuất kho</h5>
              </Card.Header>
              <Card.Body>
                {isFetchingBinPackage ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <img src={Loading} className="w-25" />
                  </div>
                ) : !binPackage ? (
                  <div className="d-flex justify-content-center align-items-center">
                    Chưa có thông tin
                  </div>
                ) : (
                  <Stack gap={1}>
                    <span className="text-black fs-17 fw-smibold">
                      - Mã thùng :{" "}
                      <span className="fw-normal">{binPackage?.seri}</span>
                    </span>

                    <span className="text-black fs-17 fw-smibold">
                      - Lô sản xuất :{" "}
                      <span className="fw-normal">
                        {binPackage?.batch_number}
                      </span>
                    </span>
                    {/*Table code export bin lấy được agent code , batchnumber , mã lô, thời gian xuất kho, loại hàng hóa, địa chỉ giao, người nhận hàng, nhân viên giao hàng, loại hàng hóa phần xuất kho --> từ seri thùng lấy ra */}
                    <span className="text-black fs-17 fw-smibold">
                      - Ngày xuất kho :{" "}
                      <span className="fw-normal">{warehouseExport?.time}</span>
                    </span>
                    <span className="text-black fs-17 fw-smibold">
                      - Đại lý cấp 1 :{" "}
                      <span className="fw-normal">
                        {warehouseExport?.agent_name}
                      </span>
                    </span>
                  </Stack>
                )}
              </Card.Body>
            </Card>
          </Stack>
        </Col>
        <Col md={6}>
          <Stack>
            <Card className="custom-card p-3">
              <Card.Header>
                <h5>Thông tin khách hàng đăng ký</h5>
              </Card.Header>
              <Card.Body>
                {isFetchingBinPackage ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <img src={Loading} className="w-25" />
                  </div>
                ) : binPackage ? (
                  <Stack gap={1}>
                    <span className="text-black fs-17 fw-smibold">
                      - Tên khách hàng :{" "}
                      <span className="fw-normal">
                        {binPackage?.register_name}
                      </span>
                    </span>
                    <span className="text-black fs-17 fw-smibold">
                      - Số điện thoại :{" "}
                      <span className="fw-normal">
                        {binPackage?.register_phone}
                      </span>
                    </span>
                    <span className="text-black fs-17 fw-smibold">
                      - Tỉnh :{" "}
                      <span className="fw-normal">
                        {binPackage?.register_province_name}
                      </span>
                    </span>
                    <span className="text-black fs-17 fw-smibold">
                      - Khu vực :{" "}
                      <span className="fw-normal">
                        {binPackage?.register_area}
                      </span>
                    </span>
                  </Stack>
                ) : (
                  <div className="d-flex justify-content-center align-items-center">
                    Chưa có thông tin
                  </div>
                )}
              </Card.Body>
            </Card>
            <Card className="custom-card p-3">
              <Card.Header>
                <h5>Thông tin khách hàng đã xác thực</h5>
              </Card.Header>
              <Card.Body>
                {isFetchingBinPackage ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <img src={Loading} className="w-25" />
                  </div>
                ) : !binPackage ? (
                  <div className="d-flex justify-content-center align-items-center">
                    Chưa có thông tin
                  </div>
                ) : (
                  <Stack gap={1}>
                    <span className="text-black fs-17 fw-smibold">
                      - Đối tượng khách hàng :{" "}
                      <span className="fw-normal">
                        {customer?.customer_type}
                      </span>
                    </span>
                    <span className="text-black fs-17 fw-smibold">
                      - Mã khách hàng :{" "}
                      <span className="fw-normal">
                        {customer?.customer_code}
                      </span>
                    </span>
                    <span className="text-black fs-17 fw-smibold">
                      - Tên khách hàng :{" "}
                      <span className="fw-normal">
                        {customer?.customer_name}
                      </span>
                    </span>
                    <span className="text-black fs-17 fw-smibold">
                      - Số điện thoại :{" "}
                      <span className="fw-normal">{customer?.phone}</span>
                    </span>
                    <span className="text-black fs-17 fw-smibold">
                      - Tỉnh :{" "}
                      <span className="fw-normal">
                        {customer?.customer_province_name}
                      </span>
                    </span>
                    <span className="text-black fs-17 fw-smibold">
                      - Vùng :{" "}
                      <span className="fw-normal">
                        {customer?.customer_area}
                      </span>
                    </span>
                  </Stack>
                )}
              </Card.Body>
            </Card>
          </Stack>
        </Col>
      </Row>
    </Fragment>
  );
}

export default SearchProductCode;