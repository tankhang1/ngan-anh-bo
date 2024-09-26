import React from "react";
import AppTable from "../../../../components/common/table/table";
import { TAgent, TCustomerRes } from "../../../../assets/types";
import AppId from "../../../../components/common/app-id";
import { useGetListCustomerQuery } from "../../../../redux/api/manage/manage.api";
import { format } from "date-fns";

function TableAgent() {
  const { data: agentRegisters, isLoading: isLoadingAgentRegister } =
    useGetListCustomerQuery(
      {
        st: +(format(new Date(), "yyyyMMdd") + "0000"),
        ed: +(format(new Date(), "yyyyMMdd") + "2359"),
        s: 1,
      },
      {
        skipPollingIfUnfocused: true,
        pollingInterval: 300000,
        refetchOnMountOrArgChange: true,
      }
    );

  return (
    <AppTable
      title="Danh sách đại lý đã xác thực hôm nay"
      headers={[
        {
          key: "customer_name",
          label: "Mã khách hàng",
          render: (value: TCustomerRes) => (
            <td>
              <span className="fw-semibold">{value.customer_code}</span>
            </td>
          ),
        },
        {
          key: "customer_name",
          label: "Tên",
          render: (value) => (
            <td>
              <span className="fw-semibold">{value.customer_name}</span>
            </td>
          ),
        },
        {
          key: "phone",
          label: "Số điện thoại",
          render: (value) => <td>{value.phone}</td>,
        },
        {
          key: "customer_province_name",
          label: "Tỉnh thành",
          render: (value) => <td>{value.customer_province_name}</td>,
        },
        {
          key: "customer_area",
          label: "Khu vực",
          render: (value) => <td>{value.customer_area}</td>,
        },
        {
          key: "time_verify",
          label: "Thời gian xác thực",
          render: (value) => (
            <td>
              {value?.time_verify
                ? format(new Date(value?.time_verify), "dd/MM/yyyy hh:mm:ss")
                : ""}
            </td>
          ),
        },
        {
          key: "status",
          label: "Trạng thái",
          render: (value) => (
            <td>
              {value.status === 1 ? (
                <span className="bg-success bg-opacity-100 text-white badge ">
                  Đã xác thực
                </span>
              ) : (
                <span className="bg-warning bg-opacity-100 text-white badge ">
                  Chờ xác thực
                </span>
              )}
            </td>
          ),
        },
      ]}
      data={agentRegisters || ([] as any)}
      isLoading={isLoadingAgentRegister}
      filters={[
        {
          key: "status",
          label: "Tất cả",
          value: "ALL",
        },
      ]}
    />
  );
}

export default TableAgent;
