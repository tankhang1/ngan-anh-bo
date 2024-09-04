import React from "react";
import { Col, Row } from "react-bootstrap";
import AppTable from "../../../../components/common/table/table";
import { TProductDashboardTable } from "../../../../assets/types";
import AppId from "../../../../components/common/app-id";
import {
  useGetBinsQuery,
  useGetPacketsQuery,
} from "../../../../redux/api/manage/manage.api";
import { format } from "date-fns";

function ProductTable() {
  // type use
  const { data: bins, isLoading: isLoadingBin } = useGetBinsQuery(
    {
      st: +(format(new Date(), "yyyyMMdd") + "0000"),
      ed: +(format(new Date(), "yyyyMMdd") + "2399"),
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
      ed: +(format(new Date(), "yyyyMMdd") + "2399"),
      nu: 0,
      sz: 9999,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  return (
    <Row>
      <Col xl={6}>
        <AppTable
          title="SMS"
          isLoading={isLoadingBin || isLoadingPacket}
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
              key: "code",
              label: "Mã iQR",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.code}</span>
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
          data={[...(bins?.sms ?? []), ...(packets?.sms ?? [])]}
        />
      </Col>
      <Col xl={6}>
        <AppTable
          title="QrCode / Zalo"
          isLoading={isLoadingBin || isLoadingPacket}
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
              key: "code",
              label: "Mã iQR",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.code}</span>
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
