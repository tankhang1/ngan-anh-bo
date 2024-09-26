import React from "react";
import AppTable from "../../../../components/common/table/table";
import { TBrandname } from "../../../../assets/types";
import AppId from "../../../../components/common/app-id";
import { format } from "date-fns";
import {
  useGetListBrandnamesQuery,
  useGetListBrandnameTodayQuery,
} from "../../../../redux/api/manage/manage.api";

function TableBrandname() {
  const { data: brandnames, isLoading: isLoadingBrandname } =
    useGetListBrandnameTodayQuery(undefined, {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    });
  return (
    <AppTable
      title="Danh sách brandname hôm nay"
      headers={[
        {
          key: "phone",
          label: "Số điện thoại",
          render: (value: TBrandname) => (
            <td>
              <span className="fw-semibold">{value.phone}</span>
            </td>
          ),
        },
        {
          key: "time",
          label: "Thời gian",
          render: (value) => (
            <td>
              {value?.time ? format(value.time, "dd/MM/yyyy hh:mm:ss") : ""}
            </td>
          ),
        },
        {
          key: "content",
          label: "Nội dung",
          render: (value) => <td>{value.content}</td>,
        },
        {
          key: "transactionid",
          label: "Mã giao dịch",
          render: (value) => <td>{value.transactionid}</td>,
        },
      ]}
      data={(brandnames || []) as any}
      isLoading={isLoadingBrandname}
    />
  );
}

export default TableBrandname;
