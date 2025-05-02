import React from "react";
import { Badge, Col, Row } from "react-bootstrap";
import AppTable from "../../../../components/common/table/table";
import { TProductDashboardTable, TSMSGateway } from "../../../../assets/types";
import AppId from "../../../../components/common/app-id";
import {
  useGetBinsQuery,
  useGetListSMSGatewayQuery,
  useGetPacketsQuery,
} from "../../../../redux/api/manage/manage.api";
import { format } from "date-fns";

function ProductTable() {
  // type use
  const { data: bins, isLoading: isLoadingBin } = useGetBinsQuery(
    {
      st: +(format(new Date(), "yyyyMMdd") + "0000"),
      ed: +(format(new Date(), "yyyyMMdd") + "2359"),
      nu: 0,
      sz: 9999,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: packets, isLoading: isLoadingPacket } = useGetPacketsQuery(
    {
      st: +(format(new Date(), "yyyyMMdd") + "0000"),
      ed: +(format(new Date(), "yyyyMMdd") + "2359"),
      nu: 0,
      sz: 9999,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: listSMSGateway, isLoading: isLoadingSMSGateway } =
    useGetListSMSGatewayQuery();
  return (
    <Row>
      <Col xl={6}>
        <AppTable
          title="SMS Gateway"
          isLoading={isLoadingSMSGateway}
          headers={[
            {
              key: "code",
              label: "Mã iQR",
              render: (value: TSMSGateway) => <td>{value.code}</td>,
            },
            {
              key: "id",
              label: "ID",
              render: (value: TSMSGateway) => (
                <td>
                  <AppId id={value.id ?? ""} />
                </td>
              ),
            },
            {
              key: "info",
              label: "Nội dung tin nhắn",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.info}</span>
                </td>
              ),
            },
            {
              key: "response",
              label: "Thông tin phản hồi",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.response}</span>
                </td>
              ),
            },

            {
              key: "product_name",
              label: "Tên sản phẩm",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.product_name}</span>
                </td>
              ),
            },
            {
              key: "customer_code",
              label: "Mã khách hàng",
              render: (value) => (
                <td>
                  <span className="fw-semibold">
                    {value?.customer_code || ""}
                  </span>
                </td>
              ),
            },
            {
              key: "name",
              label: "Họ và tên khách hàng",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.customer_name}</span>
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
              key: "smsc",
              label: "Nhà mạng",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.smsc}</span>
                </td>
              ),
            },
            {
              key: "customer_province_name",
              label: "Tỉnh thành",
              render: (value) => (
                <td>
                  <span className="fw-semibold">
                    {value.customer_province_name}
                  </span>
                </td>
              ),
            },
            {
              key: "customer_district_name",
              label: "Quận huyện",
              render: (value) => (
                <td>
                  <span className="fw-semibold">
                    {value.customer_district_name}
                  </span>
                </td>
              ),
            },
            {
              key: "customer_area",
              label: "Khu vực",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.customer_area}</span>
                </td>
              ),
            },

            {
              key: "time",
              label: "Thời gian nhắn tin",
              render: (value) => (
                <td>
                  <span className="fw-semibold">
                    {value.time
                      ? format(new Date(value.time), "dd/MM/yyyy HH:mm:ss")
                      : ""}
                  </span>
                </td>
              ),
            },
          ]}
          // data={[...(bins?.sms ?? []), ...(packets?.sms ?? [])]}
          data={listSMSGateway ?? []}
        />
      </Col>
      <Col xl={6}>
        <AppTable
          title="QrCode / Zalo"
          isLoading={isLoadingBin || isLoadingPacket}
          headers={[
            {
              key: "seri",
              label: "Số seri",
              render: (value) => <td>{value.seri}</td>,
            },
            {
              key: "code",
              label: "Mã iQR",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.code}</span>
                </td>
              ),
            },

            {
              key: "product_code",
              label: "Mã sản phẩm",
              render: (value) => <td>{value.product_code}</td>,
            },
            {
              key: "time_use",
              label: "Ngày sử dụng",
              render: (value) => (
                <td>
                  {value.time_use
                    ? format(new Date(value.time_use), "dd/MM/yyyy HH:mm:ss")
                    : ""}
                </td>
              ),
            },
          ]}
          data={[
            ...(bins?.qrCode ?? []),
            ...(packets?.qrCode ?? []),
            ...(packets?.zalo ?? []),
            ...(bins?.zalo ?? []),
          ]}
        />
      </Col>
    </Row>
  );
}

export default ProductTable;
