import React from "react";
import AppTable from "../../../../components/common/table/table";
import { TTopup } from "../../../../assets/types";
import AppId from "../../../../components/common/app-id";
import { useGetListProgramTopupQuery } from "../../../../redux/api/program/program.api";
import { format } from "date-fns";

function TableTopup() {
  const { data: topups, isLoading: isLoadingTopup } =
    useGetListProgramTopupQuery(
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
      title="Topup"
      headers={[
        {
          key: "id",
          label: "ID",
          render: (value: TTopup) => (
            <td>
              <AppId id={value.id} />
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
          key: "price",
          label: "Giá trị",
          render: (value) => <td>{value.price}</td>,
        },
        {
          key: "time",
          label: "Địa chỉ",
          render: (value) => <td>{value.time}</td>,
        },
      ]}
      data={(topups || []) as any}
      filters={[]}
      isLoading={isLoadingTopup}
    />
  );
}

export default TableTopup;
