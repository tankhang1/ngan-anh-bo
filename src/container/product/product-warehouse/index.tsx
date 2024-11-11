import React, { Fragment, useDeferredValue, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { useNavigate } from "react-router-dom";
import { GroupCode, TProduct } from "../../../assets/types";

import { BASE_PORT } from "../../../constants";
import { useGetListProductsQuery } from "../../../redux/api/info/info.api";
import { exportExcelFile, fNumber } from "../../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { format } from "date-fns";
import AppConfirm from "../../../components/AppConfirm";
import AppHistory from "../../../components/AppHistory";
import { useLogProductQuery } from "../../../redux/api/log/log.api";

const PRODUCT_TYPE = [
  {
    key: -1,
    label: "Tất cả",
  },
  {
    key: 0,
    label: "Gói",
  },
  {
    key: 1,
    label: "Túi",
  },
  {
    key: 2,
    label: "Chai",
  },
  {
    key: 3,
    label: "Hộp",
  },
  {
    key: 4,
    label: "Thùng",
  },
];
function ProductWarehousePage() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const [search, setSearch] = useState("");
  const [changeType, setChangeType] = useState<number>(-1); // true: thùng, false: gói
  const [openedHistory, setOpenHistory] = useState(false);
  const deferSearchValue = useDeferredValue(search);

  const navigate = useNavigate();
  const { data: logProductWarehouse } = useLogProductQuery(
    {
      group: GroupCode.PRODUCTS_PRODUCTION,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: products, isLoading: isLoadingProduct } =
    useGetListProductsQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  const filterProducts = useMemo(
    () =>
      (changeType === -1
        ? products
        : products?.filter((item) => item.type === changeType)) ?? [],
    [products, changeType]
  );

  const handleExportExcel = () => {
    exportExcelFile(filterProducts, "Thông tin sản phẩm");
  };
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
                      value={search}
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
                  {/* <Dropdown className="ms-2">
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
                          onClick={() => {
                            setSearch("");
                            setSearchBy(item.key);
                          }}
                        >
                          {item.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown> */}
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip className="tooltip">Đổi loại sản phẩm</Tooltip>
                    }
                  >
                    <Dropdown className="ms-2">
                      <Dropdown.Toggle
                        variant=""
                        aria-label="button"
                        className="btn btn-icon btn-info-light btn-wave no-caret"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="ti ti-exchange"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu as="ul" className="dropdown-menu-start">
                        {PRODUCT_TYPE.map((item, index) => (
                          <Dropdown.Item
                            active={item.key === changeType}
                            key={index}
                            onClick={() => {
                              setSearch("");
                              setChangeType(item.key);
                            }}
                          >
                            {item.label}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </OverlayTrigger>
                  {/* {permission.createProductWarehouse ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip className="tooltip">Thêm mới</Tooltip>}
                    >
                      <Button
                        variant=""
                        aria-label="button"
                        type="button"
                        className="btn btn-icon btn-secondary-light ms-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Add Contact"
                        onClick={() => navigate(`create`)}
                      >
                        <i className="ri-add-line"></i>
                      </Button>
                    </OverlayTrigger>
                  ) : null} */}
                  {permission.createProductProductionInfo ? (
                    <AppConfirm onAccept={handleExportExcel}>
                      <Button
                        variant=""
                        aria-label="button"
                        type="button"
                        className="btn btn-icon btn-success-light ms-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Add Contact"
                      >
                        <i className="ti ti-database-export"></i>
                      </Button>
                    </AppConfirm>
                  ) : null}
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip className="tooltip">Lịch sử thay đổi</Tooltip>
                    }
                  >
                    <Button
                      variant=""
                      aria-label="button"
                      type="button"
                      className="btn btn-icon btn-success-light ms-2"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      onClick={() => setOpenHistory(true)}
                    >
                      <i className="ti ti-history"></i>
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Card className="custom-card">
        <AppTable
          isHeader={false}
          externalSearch={deferSearchValue}
          title="Thông tin sản phẩm"
          isLoading={isLoadingProduct}
          isChange={changeType}
          maxPage={filterProducts.length}
          headers={[
            {
              key: "image_url",
              label: "Hình ảnh",
              render: (value) => (
                <td>
                  <img
                    src={
                      `${BASE_PORT}/${value.code}.jpg` ||
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
                    }
                    className="img object-fit-cover"
                    style={{
                      height: 100,
                      width: "auto",
                    }}
                  />
                </td>
              ),
            },
            {
              key: "name_display_root",
              label: "Mã sản phẩm",
              render: (value) => <td>{value.name_display_root}</td>,
            },

            {
              key: "description",
              label: "Tên sản phẩm",
              render: (value) => <td>{value.description}</td>,
            },

            {
              key: "brand_name",
              label: "Tên thương hiệu",
              render: (value: TProduct) => <td>{value?.brand_name}</td>,
            },
            {
              key: "category_name",
              label: "Nhóm sản phẩm",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.category_name}</span>
                </td>
              ),
            },
            {
              key: "point",
              label: "Số điểm",
              render: (value) => (
                <td>
                  <span className="fw-semibold">
                    {fNumber(value.point ?? 0)}
                  </span>
                </td>
              ),
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
                    onClick={() => navigate(`edit/${value.code}`)}
                  >
                    <i className="ti ti-edit"></i>
                  </button>
                </td>
              ),
            },
            {
              key: "time_created",
              label: "Thời gian tạo",
              render: (value) => (
                <td>
                  {value.time_created
                    ? format(value.time_created, "dd/MM/yyyy HH:mm:ss")
                    : ""}
                </td>
              ),
            },
            {
              key: "time_updated",
              label: "Thời gian cập nhật",
              render: (value) => (
                <td>
                  {value.time_updated
                    ? format(value.time_updated, "dd/MM/yyyy HH:mm:ss")
                    : ""}
                </td>
              ),
            },
          ]}
          data={filterProducts || []}
        />
      </Card>
      <AppHistory
        data={logProductWarehouse || []}
        opened={openedHistory}
        onClose={setOpenHistory}
      />
    </Fragment>
  );
}

export default ProductWarehousePage;
