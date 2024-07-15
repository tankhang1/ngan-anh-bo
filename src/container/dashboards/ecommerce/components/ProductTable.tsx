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
  const { data: bins } = useGetBinsQuery(
    {
      st: +(format(new Date(), "yyyyMMdd") + "0000"),
      ed: +(format(new Date(), "yyyyMMdd") + "2399"),
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
    }
  );
  const { data: packets } = useGetPacketsQuery(
    {
      st: +(format(new Date(), "yyyyMMdd") + "0000"),
      ed: +(format(new Date(), "yyyyMMdd") + "2399"),
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
    }
  );
  return (
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
          data={[...(bins?.sms ?? []), ...(packets?.sms ?? [])]}
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
          data={[...(bins?.qrCode ?? []), ...(packets?.qrCode ?? [])]}
        />
      </Col>
    </Row>
  );
}

export default ProductTable;
