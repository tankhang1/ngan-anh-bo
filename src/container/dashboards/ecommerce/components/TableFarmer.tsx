import React from "react";
import AppTable from "../../../../components/common/table/table";
import {
  TAgent,
  TAgentDashboardTable,
  TGetListAgentsRes,
} from "../../../../assets/types";
import AppId from "../../../../components/common/app-id";
import {
  useGetListAgentsQuery,
  useGetListFarmersQuery,
} from "../../../../redux/api/manage/manage.api";
import { format } from "date-fns";

function TableFarmer() {
  const { data: farmers, isLoading: isLoadingFarmer } = useGetListFarmersQuery(
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
    <AppTable
      title="Thông tin nông dân"
      headers={[
        {
          key: "id",
          label: "ID",
          render: (value: TAgent) => (
            <td>
              <AppId id={value.id} />
            </td>
          ),
        },
        {
          key: "name",
          label: "Tên",
          render: (value) => (
            <td>
              <span className="fw-semibold">{value.name}</span>
            </td>
          ),
        },
        {
          key: "phone",
          label: "Số điện thoại",
          render: (value) => <td>{value.phone}</td>,
        },
        {
          key: "province",
          label: "Địa chỉ",
          render: (value) => <td>{value.province}</td>,
        },
        {
          key: "time_verify",
          label: "Thời gian xác thực",
          render: (value) => (
            <td>{format(new Date(value?.time_verify ?? ""), "dd/MM/yyyy")}</td>
          ),
        },
        {
          key: "status",
          label: "Trạng thái",
          render: (value) => (
            <td>
              {value.status === 1 ? (
                <span className="bg-secondary bg-opacity-100 text-white badge ">
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
      data={
        ([
          ...(farmers?.listValidateFarmers ?? []),
          ...(farmers?.listUnValidateFarmers ?? []),
        ] || []) as any
      }
      isLoading={isLoadingFarmer}
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

export default TableFarmer;
