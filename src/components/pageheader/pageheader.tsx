import React, { Fragment } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const MapLabel = new Map([
  ["dashboards", "Thống kê 7 ngày qua"],
  ["ecommerce", "Dashboard"],
  ["agent", "Đại lý"],
  ["farmer", "Nông dân"],
  ["ce", "Chỉnh sửa thông tin"],
  ["product", "Thông tin sản phẩm"],
  ["point", "Chương trình tích điểm"],
  ["topup", "Chương trình topup"],
  ["report", "Báo cáo"],
  ["iQr", "iQr"],
  ["program-point", "Chương trình tích điểm"],
  ["area", "Quản lý vùng"],
  ["group-customer", "Quản lý nhóm khách hàng"],
  ["validate", "Đã xác thực"],
  ["unvalidate", "Chờ xác thực"],
  ["employee", "Quản lý nhân viên"],
  ["role", "Quản lý vai trò"],
  ["department", "Quản lý bộ phận"],
  ["accounts", "Quản lý tài khoản"],
  ["group-retailer", "Quản lý nhóm đại lý"],
  ["search-product-code", "Tra cứu mã sản phẩm"],
  ["export", "Thông tin xuất kho"],
  ["import", "Thông tin nhập kho"],
  ["search-warehouse-export", "Tìm kiếm thông tin xuất kho"],
  ["search-warehouse-import", "Tìm kiếm thông tin nhập kho"],
  ["sms", "SMS"],
  ["customer", "Báo cáo khách hàng"],
  ["search-customer-today", "Khách hàng tham gia trong ngày"],
  ["search-topup-today", "Topup tham gia trong ngày"],
  ["search-customer-unvalidate-today", "Danh sách khách hàng chưa xác thực"],
  ["search-customer-validate-today", "Danh sách khách hàng xác thực"],
  ["info", "Danh sách sản phẩm liên quan tới marketing"],
  ["warehouse", "Danh sách sản phẩm liên quan tới sản xuất"],
  ["create", "Thêm mới sản phẩm"],
  ["edit", "Chỉnh sửa sản phẩm"],
]);
const Pageheader = () => {
  const { pathname } = useLocation();
  const commonPath = "/velvet-ts/preview/";
  const trimmedPathname = pathname.startsWith(commonPath)
    ? pathname.slice(commonPath.length)
    : pathname;
  const locationArray = trimmedPathname.split("/").filter(Boolean);
  const componentNames = locationArray.map((item) => {
    if (trimmedPathname.includes("ce")) return MapLabel.get("ce");
    return MapLabel.get(item) ?? item.charAt(0).toUpperCase() + item.slice(1);
  });
  return (
    <Fragment>
      <div className="d-sm-flex d-block align-items-center justify-content-between page-header-breadcrumb">
        <h4 className="fw-medium mb-0">
          {componentNames[componentNames.length - 1]}
        </h4>
        {/* <div className="ms-sm-1 ms-0">
          <nav>
            <Breadcrumb className="breadcrumb mb-0">
              {componentNames.map((item, index) => (
                <Breadcrumb.Item
                  key={index}
                  active={index === componentNames.length - 1}
                  className={`${index === componentNames.length - 1 ? "" : ""}`}
                  href="#"
                >
                  {index === 0 ? item : item.toLowerCase()}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </nav>
        </div> */}
      </div>
    </Fragment>
  );
};

export default Pageheader;
