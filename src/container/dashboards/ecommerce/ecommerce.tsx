import React, { FC, Fragment, useState } from "react";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { Salesdonut } from "../ecommerce/ecommercedata";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

//IMAGES
import { Basicolumn } from "../../charts/apexcharts/columnchart/columnchartdata";
import { Basicline } from "../../charts/apexcharts/linechart/linechartdata";
import AppTable from "../../../components/common/table/table";
import {
  TAgentDashboardTable,
  TProductDashboardTable,
  TTopup,
  TTopupDashboardTable,
} from "../../../assets/types";
import AppId from "../../../components/common/app-id";

interface EcommerceProps {}

const Ecommerce: FC<EcommerceProps> = () => {
  const [_content, setContent] = useState("");

  return (
    <Fragment>
      <Row>
        <Col xxl={12}>
          <Card className="custom-card">
            <Card.Body className="p-0">
              <div className="row row-cols-sm-2 row-cols-xxl-4 g-0 ecommerce-cards">
                <div className="col d-flex p-4 tx-white pos-relative">
                  <Link
                    aria-label="anchor"
                    to="#"
                    className="masked-link"
                  ></Link>
                  <div className="me-2 my-auto">
                    <div className="avatar avatar-lg bg-secondary-transparent radius-5">
                      <i className="ti ti-circle-check fs-20"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="mb-0 text-muted">Đại lý đã xác thực</p>
                    <div className="">
                      <span className="text-xl fw-semibold">45,280</span>
                      <span className="ms-2 fs-13 text-secondary">
                        <i className="fe fe-arrow-up-right me-1 d-inline-block fs-12"></i>
                        1.31%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col d-flex p-4 tx-white pos-relative">
                  <Link
                    aria-label="anchor"
                    to="#"
                    className="masked-link"
                  ></Link>
                  <div className="me-2 my-auto">
                    <div className="avatar avatar-lg bg-secondary-transparent radius-5">
                      <i className="ti ti-circle-dotted fs-20"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="mb-0 text-muted">Đại lí chờ xác thực</p>
                    <div className="">
                      <span className="text-xl fw-semibold">12,088</span>
                      <span className="ms-2 fs-13 text-secondary">
                        <i className="fe fe-arrow-up-right me-1 d-inline-block fs-12"></i>
                        12.05%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col d-flex p-4 tx-white pos-relative">
                  <Link
                    aria-label="anchor"
                    to="#"
                    className="masked-link"
                  ></Link>
                  <div className="me-2 my-auto">
                    <div className="avatar avatar-lg bg-info-transparent radius-5">
                      <i className="ti ti-shovel fs-20"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="mb-0 text-muted">Nông dân đã xác thực</p>
                    <div className="">
                      <span className="text-xl fw-semibold">10,500</span>
                      <span className="ms-2 fs-13 text-info">
                        <i className="fe fe-arrow-down-right fs-12 me-1 d-inlineblock"></i>
                        1.14%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col d-flex p-4 tx-white pos-relative">
                  <Link
                    aria-label="anchor"
                    to="#"
                    className="masked-link"
                  ></Link>
                  <div className="me-2 my-auto">
                    <div className="avatar avatar-lg bg-info-transparent radius-5">
                      <i className="ti ti-shovel fs-20"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="mb-0 text-muted">Đại lí chờ xác thực</p>
                    <div className="">
                      <span className="text-xl fw-semibold">69,270</span>
                      <span className="ms-2 fs-13 text-info">
                        <i className="fe fe-arrow-up-right me-1 d-inline-block fs-12 "></i>
                        2.58%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col d-flex p-4 tx-white pos-relative">
                  <Link
                    aria-label="anchor"
                    to="#"
                    className="masked-link"
                  ></Link>
                  <div className="me-2 my-auto">
                    <div className="avatar avatar-lg bg-warning-transparent radius-5">
                      <i className="ti ti-qrcode fs-20"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="mb-0 text-muted">QrCode</p>
                    <div className="d-flex flex-wrap align-items-baseline">
                      <span className="text-xl fw-semibold">21,520</span>
                      <span className="ms-2 fs-13 text-warning">
                        <i className="fe fe-arrow-down-right fs-12 me-1 d-inlineblock"></i>
                        14.69%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col d-flex p-4 tx-white pos-relative">
                  <Link
                    aria-label="anchor"
                    to="#"
                    className="masked-link"
                  ></Link>
                  <div className="me-2 my-auto">
                    <div className="avatar avatar-lg bg-success-transparent radius-5">
                      <i className="ti ti-message fs-20"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="mb-0 text-muted">SMS</p>
                    <div className="d-flex flex-wrap align-items-baseline">
                      <span className="text-xl fw-semibold">21,520</span>
                      <span className="ms-2 fs-13 text-success">
                        <i className="fe fe-arrow-down-right fs-12 me-1 d-inlineblock"></i>
                        14.69%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col d-flex p-4 tx-white pos-relative">
                  <Link
                    aria-label="anchor"
                    to="#"
                    className="masked-link"
                  ></Link>
                  <div className="me-2 my-auto">
                    <div className="avatar avatar-lg bg-dark-transparent radius-5">
                      <i className="ti ti-brand-medium fs-20"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="mb-0 text-muted">Brandname</p>
                    <div className="d-flex flex-wrap align-items-baseline">
                      <span className="text-xl fw-semibold">21,520</span>
                      <span className="ms-2 fs-13 text-success">
                        <i className="fe fe-arrow-down-right fs-12 me-1 d-inlineblock"></i>
                        14.69%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col d-flex p-4 tx-white pos-relative">
                  <Link
                    aria-label="anchor"
                    to="#"
                    className="masked-link"
                  ></Link>
                  <div className="me-2 my-auto">
                    <div className="avatar avatar-lg bg-purple-transparent radius-5">
                      <i className="ti ti-brand-medium fs-20"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="mb-0 text-muted">Topup</p>
                    <div className="d-flex flex-wrap align-items-baseline">
                      <span className="text-xl fw-semibold">21,520</span>
                      <span className="ms-2 fs-13 text-success">
                        <i className="fe fe-arrow-down-right fs-12 me-1 d-inlineblock"></i>
                        14.69%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xxl={6} xl={12}>
          <Row>
            <Col xl={12}>
              <Card className="custom-card">
                <Card.Header className="justify-content-between">
                  <Card.Title>Đại lí</Card.Title>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant=""
                      aria-label="anchor"
                      href="#"
                      className="btn btn-outline-light btn-icons btn-sm text-muted no-caret"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fe fe-more-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu role="menu">
                      <Dropdown.Item href="#">Hôm nay</Dropdown.Item>
                      <Dropdown.Item href="#">Tuần này</Dropdown.Item>
                      <Dropdown.Item href="#">Tuần trước</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>
                <Card.Body>
                  <div id="projectstatistics">
                    <Basicolumn
                      series={[
                        {
                          name: "Đã lí đã xác thực",
                          data: [44, 55, 57, 90, 61, 58, 63, 60, 66],
                        },
                        {
                          name: "Đại lí chờ xác thực",
                          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
                        },
                      ]}
                      categories={[
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                      ]}
                      colors={["#fe6601", "#fcd1d1"]}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={12} xl={12} lg={6} md={6} className="">
              <Card className="custom-card overflow-hidden">
                <Card.Header className="justify-content-between">
                  <Card.Title className="">Dịch vụ gia tăng</Card.Title>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant=""
                      aria-label="anchor"
                      href="#"
                      className="btn btn-outline-light btn-icons btn-sm text-muted no-caret"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fe fe-more-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu role="menu">
                      <Dropdown.Item href="#">Hôm nay</Dropdown.Item>
                      <Dropdown.Item href="#">Tuần này</Dropdown.Item>
                      <Dropdown.Item href="#">Tuần trước</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>

                <Card.Body className="p-0">
                  <Basicline
                    categories={[
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                    ]}
                    series={[
                      {
                        name: "QrCode",
                        data: Array.from({ length: 7 }).map(() =>
                          Math.floor(Math.random() * 1000)
                        ),
                      },
                      {
                        name: "SMS",
                        data: Array.from({ length: 7 }).map(() =>
                          Math.floor(Math.random() * 1000)
                        ),
                      },
                      {
                        name: "Brandname",
                        data: Array.from({ length: 7 }).map(() =>
                          Math.floor(Math.random() * 1000)
                        ),
                      },
                      {
                        name: "Topup",
                        data: Array.from({ length: 7 }).map(() =>
                          Math.floor(Math.random() * 1000)
                        ),
                      },
                    ]}
                    colors={["#fffc35", "#fba01e", "#4682ff", "#e6bfff"]}
                    title=""
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xxl={6} xl={12}>
          <Row>
            <Col xl={12}>
              <Card className="custom-card">
                <Card.Header className="justify-content-between">
                  <Card.Title>Nông dân</Card.Title>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant=""
                      aria-label="anchor"
                      href="#"
                      className="btn btn-outline-light btn-icons btn-sm text-muted no-caret"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fe fe-more-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu role="menu">
                      <Dropdown.Item href="#">Hôm nay</Dropdown.Item>
                      <Dropdown.Item href="#">Tuần này</Dropdown.Item>
                      <Dropdown.Item href="#">Tuần trước</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>
                <Card.Body>
                  <div id="projectstatistics">
                    <Basicolumn
                      series={[
                        {
                          name: "Nông dân đã xác thực",
                          data: [44, 55, 57, 90, 61, 58, 63, 60, 66],
                        },
                        {
                          name: "Nông dân chờ xác thực",
                          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
                        },
                      ]}
                      categories={[
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                      ]}
                      colors={["#76cff5", "#27c86b"]}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={12} xl={12} lg={6} md={6} className="">
              <Card className="custom-card overflow-hidden">
                <Card.Header className="justify-content-between">
                  <Card.Title className="">Số liệu dịch vụ gia tăng</Card.Title>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant=""
                      aria-label="anchor"
                      href="#"
                      className="btn btn-outline-light btn-icons btn-sm text-muted no-caret"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fe fe-more-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu role="menu">
                      <Dropdown.Item href="#">Hôm nay</Dropdown.Item>
                      <Dropdown.Item href="#">Tuần này</Dropdown.Item>
                      <Dropdown.Item href="#">Tuần trước</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>
                <Card.Body>
                  <Salesdonut
                    series={[55, 34, 51, 20]}
                    categories={["QrCode", "SMS", "Brandname", "Topup"]}
                    colors={["#fffc35", "#fba01e", "#4682ff", "#e6bfff"]}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      {/*Agent */}
      <Col xl={12}>
        <AppTable
          title="Thông tin đại lý"
          headers={[
            {
              key: "id",
              label: "ID",
              render: (value: TAgentDashboardTable) => (
                <td>
                  <AppId id={value.id} />
                </td>
              ),
            },
            {
              key: "name",
              label: "Tên",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.name}</span>
                </td>
              ),
            },
            {
              key: "phone",
              label: "Số điện thoại",
              render: (value) => <td>{value.phone}</td>,
            },
            {
              key: "province",
              label: "Địa chỉ",
              render: (value) => <td>{value.province}</td>,
            },
            {
              key: "time_verify",
              label: "Địa chỉ",
              render: (value) => <td>{value.time_verify}</td>,
            },
            {
              key: "status",
              label: "Trạng thái",
              render: (value) => (
                <td>
                  {value.status === 1 ? (
                    <span className="bg-secondary bg-opacity-100 text-white badge ">
                      Đã xác thực
                    </span>
                  ) : (
                    <span className="bg-warning bg-opacity-100 text-white badge ">
                      Chờ xác thực
                    </span>
                  )}
                </td>
              ),
            },
          ]}
          data={Array.from({ length: 20 }).map(() => ({
            id: Math.floor(Math.random() * 1000000),
            name: "Đoàn Tấn Khang",
            phone: "0356994432",
            province: "69 NVL",
            time_verify: "15/5/2023",
            status: 1,
          }))}
          filters={[
            {
              key: "status",
              label: "Tất cả",
              value: "ALL",
            },
            {
              key: "status",
              label: "Đã xác thực",
              value: 1,
            },
            {
              key: "status",
              label: "Chờ xác thực",
              value: 0,
            },
          ]}
        />
      </Col>
      {/*Farmer */}
      <Col xl={12}>
        <AppTable
          title="Thông tin nông dân"
          headers={[
            {
              key: "id",
              label: "ID",
              render: (value: TAgentDashboardTable) => (
                <td>
                  <AppId id={value.id} />
                </td>
              ),
            },
            {
              key: "name",
              label: "Tên",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.name}</span>
                </td>
              ),
            },
            {
              key: "phone",
              label: "Số điện thoại",
              render: (value) => <td>{value.phone}</td>,
            },
            {
              key: "province",
              label: "Địa chỉ",
              render: (value) => <td>{value.province}</td>,
            },
            {
              key: "time_verify",
              label: "Địa chỉ",
              render: (value) => <td>{value.time_verify}</td>,
            },
            {
              key: "status",
              label: "Trạng thái",
              render: (value) => (
                <td>
                  {value.status === 1 ? (
                    <span className="bg-secondary bg-opacity-100 text-white badge ">
                      Đã xác thực
                    </span>
                  ) : (
                    <span className="bg-warning bg-opacity-100 text-white badge ">
                      Chờ xác thực
                    </span>
                  )}
                </td>
              ),
            },
          ]}
          data={Array.from({ length: 20 }).map(() => ({
            id: Math.floor(Math.random() * 1000000),
            name: "Đoàn Tấn Khang",
            phone: "0356994432",
            province: "69 NVL",
            time_verify: "15/5/2023",
            status: 1,
          }))}
          filters={[
            {
              key: "status",
              label: "Tất cả",
              value: "ALL",
            },
            {
              key: "status",
              label: "Đã xác thực",
              value: 1,
            },
            {
              key: "status",
              label: "Chờ xác thực",
              value: 0,
            },
          ]}
        />
      </Col>
      {/*SMS & QrCode*/}
      <Row>
        <Col xl={6}>
          <AppTable
            title="SMS"
            headers={[
              {
                key: "id",
                label: "ID",
                render: (value: TProductDashboardTable) => (
                  <td>
                    <AppId id={value.id} />
                  </td>
                ),
              },
              {
                key: "seri",
                label: "Số Seri",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.seri}</span>
                  </td>
                ),
              },
              {
                key: "bin_seri",
                label: "Số seri thùng",
                render: (value) => <td>{value.bin_seri}</td>,
              },
              {
                key: "product_code",
                label: "Mã sản phẩm",
                render: (value) => <td>{value.product_code}</td>,
              },
              {
                key: "time_use",
                label: "Ngày sử dụng",
                render: (value) => <td>{value.time_use}</td>,
              },
            ]}
            data={Array.from({ length: 20 }).map(() => ({
              id: Math.floor(Math.random() * 10000),
              bin_seri: "13213",
              product_code: "13213r31",
              seri: "55333",
              time_use: "12323123",
            }))}
            filters={[
              {
                key: "id",
                label: "Tất cả",
                value: "ALL",
              },
            ]}
          />
        </Col>
        <Col xl={6}>
          <AppTable
            title="QrCode"
            headers={[
              {
                key: "id",
                label: "ID",
                render: (value: TProductDashboardTable) => (
                  <td>
                    <AppId id={value.id} />
                  </td>
                ),
              },
              {
                key: "seri",
                label: "Số Seri",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.seri}</span>
                  </td>
                ),
              },
              {
                key: "bin_seri",
                label: "Số seri thùng",
                render: (value) => <td>{value.bin_seri}</td>,
              },
              {
                key: "product_code",
                label: "Mã sản phẩm",
                render: (value) => <td>{value.product_code}</td>,
              },
              {
                key: "time_use",
                label: "Ngày sử dụng",
                render: (value) => <td>{value.time_use}</td>,
              },
            ]}
            data={Array.from({ length: 20 }).map(() => ({
              id: Math.floor(Math.random() * 10000),
              bin_seri: "13213",
              product_code: "13213r31",
              seri: "55333",
              time_use: "12323123",
            }))}
            filters={[
              {
                key: "id",
                label: "Tất cả",
                value: "ALL",
              },
            ]}
          />
        </Col>
      </Row>
      {/*Topup */}
      <Col xl={12}>
        <AppTable
          title="Topup"
          headers={[
            {
              key: "id",
              label: "ID",
              render: (value: TTopupDashboardTable) => (
                <td>
                  <AppId id={value.id} />
                </td>
              ),
            },
            {
              key: "phone",
              label: "Số điện thoại",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.phone}</span>
                </td>
              ),
            },
            {
              key: "code",
              label: "Mã code",
              render: (value) => <td>{value.code}</td>,
            },
            {
              key: "price",
              label: "Giá trị",
              render: (value) => <td>{value.price}</td>,
            },
            {
              key: "time",
              label: "Địa chỉ",
              render: (value) => <td>{value.time}</td>,
            },
          ]}
          data={Array.from({ length: 20 }).map(() => ({
            id: Math.floor(Math.random() * 1000000),
            phone: "12312312",
            code: "12312312",
            price: 12312123,
            time: "12312312",
          }))}
          filters={[
            {
              key: "status",
              label: "Tất cả",
              value: "ALL",
            },
            {
              key: "status",
              label: "Đã xác thực",
              value: 1,
            },
            {
              key: "status",
              label: "Chờ xác thực",
              value: 0,
            },
          ]}
        />
      </Col>
    </Fragment>
  );
};

export default Ecommerce;
