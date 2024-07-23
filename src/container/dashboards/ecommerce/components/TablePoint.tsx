import React from "react";
import AppTable from "../../../../components/common/table/table";
import { TPointTableDashboard } from "../../../../assets/types";
import AppId from "../../../../components/common/app-id";
import { format } from "date-fns";
import { useGetReportProgramPointByTimeQuery } from "../../../../redux/api/report/report.api";
import { fNumber } from "../../../../hooks";

function TablePoint() {
  const { data: points, isLoading: isLoadingPoint } =
    useGetReportProgramPointByTimeQuery(
      {
        st: +(format(new Date(), "yyyyMMdd") + "0000"),
        ed: +(format(new Date(), "yyyyMMdd") + "2399"),
        sz: 99999,
      },
      {
        skipPollingIfUnfocused: true,
        pollingInterval: 300000,
        refetchOnMountOrArgChange: true,
      }
    );
  return (
    <AppTable
      title="Tích điểm"
      headers={[
        {
          key: "program_uuid",
          label: "Mã chương trình",
          render: (value: TPointTableDashboard) => (
            <td>
              <AppId id={value.program_uuid} />
            </td>
          ),
        },
        {
          key: "program_name",
          label: "Tên chương trình",
          render: (value: TPointTableDashboard) => (
            <td>
              <span className="fw-semibold"> {value.program_name}</span>
            </td>
          ),
        },
        {
          key: "customer_name",
          label: "Tên khách hàng",
          render: (value) => (
            <td>
              <span className="fw-semibold">{value.customer_name}</span>
            </td>
          ),
        },
        {
          key: "province",
          label: "Tỉnh thành",
          render: (value) => (
            <td>
              <span className="fw-semibold">{value.province}</span>
            </td>
          ),
        },
        {
          key: "code",
          label: "Mã code",
          render: (value) => <td>{value.code}</td>,
        },
        {
          key: "product_code",
          label: "Mã sản phẩm",
          render: (value) => <td>{value.product_code}</td>,
        },
        {
          key: "product_name",
          label: "Tên sản phẩm",
          render: (value) => <td>{value.product_name}</td>,
        },
        {
          key: "c1_price_vnd",
          label: "Giá tiền 1",
          render: (value) => <td>{fNumber(value.c1_price_vnd ?? 0)}</td>,
        },
        {
          key: "c2_price_vnd",
          label: "Giá tiền 2",
          render: (value) => <td>{fNumber(value.c2_price_vnd ?? 0)}</td>,
        },
        {
          key: "time_earn",
          label: "Thời gian tích điểm",
          render: (value) => <td>{value.time_earn}</td>,
        },
      ]}
      data={(points || []) as any}
      filters={[]}
      isLoading={isLoadingPoint}
    />
  );
}

export default TablePoint;
