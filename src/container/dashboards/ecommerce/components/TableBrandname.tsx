import React from "react";
import AppTable from "../../../../components/common/table/table";
import { TBrandname } from "../../../../assets/types";
import AppId from "../../../../components/common/app-id";
import { format } from "date-fns";
import { useGetListBrandnamesQuery } from "../../../../redux/api/manage/manage.api";

function TableBrandname() {
  const { data: brandnames, isLoading: isLoadingBrandname } =
    useGetListBrandnamesQuery(
      {
        st: +(format(new Date(), "yyyyMMdd") + "0000"),
        ed: +(format(new Date(), "yyyyMMdd") + "2399"),
        sz: 99999,
        nu: 0,
      },
      {
        skipPollingIfUnfocused: true,
        pollingInterval: 300000,
        refetchOnMountOrArgChange: true,
      }
    );
  return (
    <AppTable
      title="Danh sách brandname hôm nay"
      headers={[
        {
          key: "transactionid",
          label: "Mã giao dịch",
          render: (value: TBrandname) => (
            <td>
              <AppId id={value.transactionid} />
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
          key: "time",
          label: "Thời gian",
          render: (value) => (
            <td>{value?.time ? format(value.time, "dd/MM/yyyy hh:mm") : ""}</td>
          ),
        },
        {
          key: "content",
          label: "Nội dung",
          render: (value) => <td>{value.content}</td>,
        },
      ]}
      data={(brandnames || []) as any}
      isLoading={isLoadingBrandname}
    />
  );
}

export default TableBrandname;
