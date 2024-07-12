import React, { Fragment, useDeferredValue, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Image,
  InputGroup,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import AppTable from "../../components/common/table/table";
import { useNavigate } from "react-router-dom";
import { TAgentDashboardTable, TProduct } from "../../assets/types";
import AppId from "../../components/common/app-id";
import { BASE_URL, MAP_PRODUCT_TYPE } from "../../constants";

const PRODUCT_FILTERS = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Tên",
  },
  {
    key: "phone",
    label: "Số điện thoại",
  },
  {
    key: "province",
    label: "Địa chỉ",
  },
  {
    key: "time_verify",
    label: "Địa chỉ",
  },
];
function ProductPage() {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(PRODUCT_FILTERS[0].key);
  const deferSearchValue = useDeferredValue(search);
  const navigate = useNavigate();
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
                      placeholder="Tìm kiếm thông tin"
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
                  <Dropdown className="ms-2">
                    <Dropdown.Toggle
                      variant=""
                      aria-label="button"
                      className="btn btn-icon btn-primary-light btn-wave no-caret"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti ti-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu as="ul" className="dropdown-menu-start">
                      {PRODUCT_FILTERS.map((item, index) => (
                        <Dropdown.Item
                          active={item.key === searchBy}
                          key={index}
                          onClick={() => setSearchBy(item.key)}
                        >
                          {item.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip className="tooltip">Thêm mới đại lí </Tooltip>
                    }
                  >
                    <Button
                      variant=""
                      aria-label="button"
                      type="button"
                      className="btn btn-icon btn-secondary-light ms-2"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add Contact"
                      onClick={() => navigate(`ce/${true}/-1`)}
                    >
                      <i className="ri-add-line"></i>
                    </Button>
                  </OverlayTrigger>
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
            title="Thông tin đại lý"
            headers={[
              {
                key: "image_url",
                label: "Hình ảnh",
                render: (value) => (
                  <td>
                    <Image
                      src={
                        // `${BASE_URL}/${value.code}.jpeg` ??
                        "https://i.pinimg.com/736x/22/44/f7/2244f7d3dfed263f15d92da05a6d24d9.jpg"
                      }
                      className="img"
                      style={{ width: 70, height: 70 }}
                    />
                  </td>
                ),
              },
              {
                key: "brand_name",
                label: "Tên thương hiệu",
                render: (value: TProduct) => <td>{value.brand_name}</td>,
              },
              {
                key: "category_name",
                label: "Tên nhóm sản phẩm",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.category_name}</span>
                  </td>
                ),
              },
              {
                key: "name_display_label",
                label: "Tên sản phẩm (thu gọn)",
                render: (value) => <td>{value.name_display_label}</td>,
              },
              {
                key: "product_name_detail",
                label: "Tên sản phẩm",
                render: (value) => <td>{value.product_name_detail}</td>,
              },

              {
                key: "type",
                label: "Trạng thái",
                render: (value) => <td>{MAP_PRODUCT_TYPE.get(+value.type)}</td>,
              },
              {
                key: "unit",
                label: "Đơn vị",
                render: (value) => <td>{value.unit}</td>,
              },
              {
                key: "net_weight",
                label: "Trọng lượng",
                render: (value) => <td>{value.net_weight}</td>,
              },
              {
                key: "pack_configuration",
                label: "Quy cách đóng gói",
                render: (value) => <td>{value.pack_configuration}</td>,
              },
              {
                key: "",
                label: "Chức năng",
                render: (value) => (
                  <td>
                    <button
                      className="btn btn-icon btn-sm btn-primary-ghost"
                      onClick={() => navigate(`ce/${false}/${value.id}`)}
                    >
                      <i className="ti ti-edit"></i>
                    </button>
                  </td>
                ),
              },
            ]}
            data={Array.from({ length: 20 }).map(() => ({
              id: Math.floor(Math.random() * 1000000),
              bin_pallet: Math.floor(Math.random() * 1000000),
              brand_code: Math.floor(Math.random() * 1000000),
              brand_name: "123",
              category_code: Math.floor(Math.random() * 1000000),
              category_name: "123sdas",
              certificate_of_origin: "123123",
              code: Math.floor(Math.random() * 1000000),
              code_bin: Math.floor(Math.random() * 1000000),
              code_box: Math.floor(Math.random() * 1000000),
              description: "13",
              detail_url:
                "https://i.pinimg.com/736x/22/44/f7/2244f7d3dfed263f15d92da05a6d24d9.jpg",
              device_code: Math.floor(Math.random() * 1000000),
              ingredient: "",
              ingredient_id: "",
              mop: 1,
              name_display: "Kjang",
              name_display_label: "123dasdaw",
              name_display_root: "!23sxa",
              net_weight: 112,
              pack_configuration: "S12312",
              product_name_detail: "!@#!@3",
              qr_mapping: 1,
              qr_printing: 0,
              short_info: "!@3",
              sku_bin: Math.floor(Math.random() * 1000000),
              sku_box: Math.floor(Math.random() * 1000000),
              type: 1,
              unit: 1,
              uuid: Math.floor(Math.random() * 1000000),
              version: 1,
            }))}
            filters={[
              {
                key: "id",
                label: "Tất cả",
                value: "ALL",
              },
            ]}
          />
        </Card>
      </Col>
    </Fragment>
  );
}

export default ProductPage;
