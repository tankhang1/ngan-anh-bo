import React from "react";
import AppTable from "../../../../components/common/table/table";
import { TTopupTableDashboard } from "../../../../assets/types";
import AppId from "../../../../components/common/app-id";
import { format } from "date-fns";
import { fNumber } from "../../../../hooks";
import { useGetReportProgramTopupByTimeQuery } from "../../../../redux/api/report/report.api";

function TableTopup() {
  const { data: topups, isLoading: isLoadingTopup } =
    useGetReportProgramTopupByTimeQuery(
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
      title="Danh sách topup hôm nay"
      headers={[
        {
          key: "program_uuid",
          label: "Mã chương trình",
          render: (value: TTopupTableDashboard) => (
            <td>
              <AppId id={value.program_uuid} />
            </td>
          ),
        },
        {
          key: "program_name",
          label: "Tên chương trình",
          render: (value: TTopupTableDashboard) => (
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
          key: "phone",
          label: "Số điện thoại",
          render: (value) => (
            <td>
              <span className="fw-semibold">{value.phone}</span>
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
          key: "price",
          label: "Số tiền",
          render: (value) => <td>{fNumber(value.price ?? 0)}</td>,
        },

        {
          key: "time_topup",
          label: "Thời gian",
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
