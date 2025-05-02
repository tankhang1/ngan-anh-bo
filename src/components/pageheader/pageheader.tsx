import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

const MapLabel = new Map([
  ["dashboards", "Thống kê 7 ngày qua"],
  ["ecommerce", "Dashboard"],
  ["agent", "Đại lý"],
  ["farmer", "Nông dân"],
  ["ce", "Chỉnh sửa thông tin"],
  ["product", "Thông tin sản phẩm"],
  ["point", "Quản lý chương trình tích điểm"],
  ["topup", "Quản lý chương trình topup"],
  ["chance", "Quản lý chương trình may mắn"],
  ["report", "Báo cáo"],
  ["iQr", "iQr"],
  ["program-point", "Báo cáo chương trình tích điểm"],
  ["program-topup", "Báo cáo chương trình topup"],
  ["area", "Quản lý vùng"],
  ["group-customer", "Quản lý nhóm khách hàng"],
  ["validate", "Khách hàng đã xác thực"],
  ["unvalidate", "Khách hàng chờ xác thực"],
  ["employee", "Quản lý nhân viên"],
  ["role", "Quản lý cấp bậc"],
  ["department", "Quản lý bộ phận"],
  ["accounts", "Quản lý tài khoản"],
  ["group-retailer", "Quản lý nhóm đại lý"],
  ["search-product-code", "Tra cứu mã sản phẩm"],
  ["export", "Thông tin xuất kho"],
  ["import", "Thông tin nhập kho"],
  ["search-warehouse-export", "Tra cứu phiếu xuất kho"],
  ["search-warehouse-import", "Tra cứu phiếu nhập kho"],
  ["sms", "Báo cáo SMS Gateway"],
  ["brandname", "Báo cáo SMS Brandname"],
  ["customer", "Báo cáo khách hàng"],
  ["search-customer-today", "Khách hàng tham gia trong ngày"],
  ["search-topup-today", "Topup tham gia trong ngày"],
  ["search-topup-week", "Topup tham gia trong tuần"],
  ["search-customer-unvalidate-today", "Khách hàng chờ xác thực"],
  ["search-customer-validate-today", "Khách hàng xác thực"],
  ["search-customer-unvalidate-week", "Khách hàng chờ xác thực"],
  ["search-customer-validate-week", "Khách hàng xác thực"],
  ["info", "Danh sách sản phẩm liên quan tới marketing"],
  ["warehouse", "Danh sách sản phẩm liên quan tới sản xuất"],
  ["create", "Thêm mới sản phẩm"],
  ["edit", "Chỉnh sửa sản phẩm"],
  ["search-customer", "Tìm kiếm khách hàng"],
  ["brand", "Quản lý nhãn hàng"],
  ["indication", "Quản lý nhóm thuốc"],
  ["formulation", "Quản lý dạng thuốc"],
  ["search-customer", "Tra cứu thông tin khách hàng"],
  ["search-product", "Tra cứu thông tin sản phẩm"],
  ["sms-gateway", "SMS Gateway"],
  ["sms-gateway-week", "SMS Gateway"],
  ["brandname", "SMS Brandname"],
  ["brandname-week", "SMS Brandname"],
  ["iqr-today", "iQr hôm nay"],
  ["iqr-week", "iQr trong tuần"],
  ["material-create", "Thêm mới mã vật tư"],
  ["material-fill", "Nhập nguyên vật liệu"],
  ["report-material", "Danh sách vật tư"],
  ["report-material-packing", "Danh sách nguyên vật liệu"],
  ["retailer1", "Danh sách mã xuất kho"],
  ["verify-customer", "Thông tin khách hàng"],
  ["create-manufactor-order", "Tạo lệnh sản xuất"],
  ["batch-number", "Thông tin lô hàng/ Batch Number"],
  ["device", "Quản lý thiết bị"],
  ["list-order", "Danh sách lệnh"],
  ["inventory", "Danh sách tồn kho"],
  ["log", "Lịch sử thay đổi"],
  ["chance-today", "Chương may mắn trúng thưởng trong ngày"],
  ["chance-week", "Chương may mắn trúng thưởng trong tuần"],
]);
const Pageheader = () => {
  const { pathname } = useLocation();
  const commonPath = "/velvet-ts/preview/";
  const trimmedPathname = pathname.startsWith(commonPath)
    ? pathname.slice(commonPath.length)
    : pathname;
  const locationArray = trimmedPathname.split("/").filter(Boolean);
  const componentNames = locationArray.map((item) => {
    if (trimmedPathname.includes("operator/topup/list"))
      if (trimmedPathname.includes("verify-customer"))
        return MapLabel.get("verify-customer");
    if (trimmedPathname.includes("device")) return MapLabel.get("device");
    if (trimmedPathname.includes("search-chance-today"))
      return MapLabel.get("chance-today");
    if (trimmedPathname.includes("search-chance-week"))
      return MapLabel.get("chance-week");
    if (trimmedPathname.includes("chance")) return MapLabel.get("chance");
    if (trimmedPathname.includes("ce")) return MapLabel.get("ce");
    if (trimmedPathname.includes("search-chance-today"))
      return MapLabel.get("chance-today");

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
