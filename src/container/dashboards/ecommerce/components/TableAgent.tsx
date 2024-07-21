import React from "react";
import AppTable from "../../../../components/common/table/table";
import { TAgent } from "../../../../assets/types";
import AppId from "../../../../components/common/app-id";
import { useGetListAgentsQuery } from "../../../../redux/api/manage/manage.api";
import { format } from "date-fns";

function TableAgent() {
  const { data: agents, isLoading: isLoadingAgent } = useGetListAgentsQuery(
    {
      st: +(format(new Date(), "yyyyMMdd") + "0000"),
      ed: +(format(new Date(), "yyyyMMdd") + "2399"),
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <AppTable
      title="Thông tin đại lý"
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
            <td>
              {value?.time_verify
                ? format(new Date(value?.time_verify), "dd/MM/yyyy")
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
          ...(agents?.listUnValidateAgents || []),
          ...(agents?.listUnValidateAgents || []),
        ] || []) as any
      }
      isLoading={isLoadingAgent}
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
