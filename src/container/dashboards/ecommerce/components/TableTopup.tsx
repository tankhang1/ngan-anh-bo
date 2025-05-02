import React from "react";
import AppTable from "../../../../components/common/table/table";
import { TProgramTopupDetail } from "../../../../assets/types";
import { fNumber } from "../../../../hooks";
import { useGetReportProgramTopupDetailTodayQuery } from "../../../../redux/api/report/report.api";
import { format } from "date-fns";

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
          key: "code",
          label: "Mã code",
          render: (value: TProgramTopupDetail) => <td>{value.code}</td>,
        },
        {
          key: "product_name",
          label: "Tên sản phẩm",
          render: (value) => <td>{value.product_name}</td>,
        },
        {
          key: "price",
          label: "Số tiền",
          render: (value) => <td>{fNumber(value.price * 1000)}</td>,
        },
        {
          key: "time_topup",
          label: "Thời gian topup",
          render: (value) => (
            <td>
              {value.time_topup
                ? format(new Date(value.time_topup), "dd/MM/yyyy HH:mm:ss")
                : ""}
            </td>
          ),
        },
        {
          key: "program_name",
          label: "Tên chương trình",
          render: (value) => (
            <td>
              <span className="fw-semibold"> {value.program_name}</span>
            </td>
          ),
        },
        // {
        //   key: "agent_name",
        //   label: "Tên đại lý",
        //   render: (value) => (
        //     <td>
        //       <span className="fw-semibold">{value.agent_name}</span>
        //     </td>
        //   ),
        // },
        {
          key: "customer_code",
          label: "Mã khách hàng",
          render: (value) => (
            <td>
              <span className="fw-semibold">{value.customer_code}</span>
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
          key: "area",
          label: "Khu vực",
          render: (value) => (
            <td>
              <span className="fw-semibold">{value.area}</span>
            </td>
          ),
        },
      ]}
      data={(topups || []) as any}
      filters={[]}
      isLoading={isLoadingTopup}
    />
  );
}

export default TableTopup;
