import React from "react";
import AppTable from "../../../../components/common/table/table";
import { TProgramTopupDetail } from "../../../../assets/types";
import AppId from "../../../../components/common/app-id";
import { fNumber } from "../../../../hooks";
import { useGetReportProgramTopupDetailTodayQuery } from "../../../../redux/api/report/report.api";

function TableTopup() {
  const { data: topups, isLoading: isLoadingTopup } =
    useGetReportProgramTopupDetailTodayQuery(undefined, {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    });
  return (
    <AppTable
      title="Danh sách topup hôm nay"
      headers={[
        {
          key: "program_name",
          label: "Tên chương trình",
          render: (value: TProgramTopupDetail) => (
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
          key: "area",
          label: "Khu vực",
          render: (value) => (
            <td>
              <span className="fw-semibold">{value.area}</span>
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
          key: "price",
          label: "Số tiền",
          render: (value) => <td>{fNumber(value.price ?? 0)}</td>,
        },
        {
          key: "time_topup",
          label: "Thời gian tích điểm",
          render: (value) => <td>{value.time_topup}</td>,
        },
      ]}
      data={(topups || []) as any}
      filters={[]}
      isLoading={isLoadingTopup}
    />
  );
}

export default TableTopup;
