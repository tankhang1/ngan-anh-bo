import React from "react";
import AppTable from "../../../../components/common/table/table";
import { TProgramPointDetail } from "../../../../assets/types";
import AppId from "../../../../components/common/app-id";
import { useGetReportProgramPointDetailTodayQuery } from "../../../../redux/api/report/report.api";
import { fNumber } from "../../../../hooks";

function TablePoint() {
  const { data: points, isLoading: isLoadingPoint } =
    useGetReportProgramPointDetailTodayQuery(undefined, {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    });

  return (
    <AppTable
      title="Danh sách tích điểm hôm nay"
      headers={[
        {
          key: "program_name",
          label: "Tên chương trình",
          render: (value: TProgramPointDetail) => (
            <td>
              <span className="fw-semibold"> {value.program_name}</span>
            </td>
          ),
        },
        {
          key: "agent_name",
          label: "Tên đại lý",
          render: (value) => (
            <td>
              <span className="fw-semibold">{value.agent_name}</span>
            </td>
          ),
        },
        {
          key: "customer_uuid",
          label: "Mã khách hàng",
          render: (value) => (
            <td>
              <AppId id={value.customer_uuid} />
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
          key: "phone",
          label: "Số điện thoại",
          render: (value) => (
            <td>
              <span className="fw-semibold">{value.phone}</span>
            </td>
          ),
        },
        {
          key: "province_name",
          label: "Tỉnh thành",
          render: (value) => (
            <td>
              <span className="fw-semibold">{value.province_name}</span>
            </td>
          ),
        },
        {
          key: "code",
          label: "Mã code",
          render: (value) => <td>{value.code}</td>,
        },
        {
          key: "product_name",
          label: "Tên sản phẩm",
          render: (value) => <td>{value.product_name}</td>,
        },
        {
          key: "point",
          label: "Số điểm",
          render: (value) => <td>{fNumber(value.point ?? 0)}</td>,
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
