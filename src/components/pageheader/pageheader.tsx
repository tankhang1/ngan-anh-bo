import React, { Fragment } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const MapLabel = new Map([
  ["dashboards", "Thống kê theo ngày"],
  ["ecommerce", "Dashboard"],
  ["agent", "Đại lí"],
  ["farmer", "Nông dân"],
  ["ce", "Chỉnh sửa thông tin"],
  ["product", "Thông tin sản phẩm"],
  ["point", "Chương trình tích điểm"],
  ["topup", "Chương trình topup"],
  ["report", "Báo cáo"],
  ["iQr", "iQr"],
  ["program", "Chương trình"],
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
