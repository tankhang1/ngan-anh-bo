import React from "react";
import AppTable from "../../../../components/common/table/table";
import { TAgent } from "../../../../assets/types";
import AppId from "../../../../components/common/app-id";
import { useGetListCustomerQuery } from "../../../../redux/api/manage/manage.api";
import { format } from "date-fns";

function TableFarmer() {
  const { data: customerUnRegister, isLoading: isLoadingCustomerUnRegister } =
    useGetListCustomerQuery(
      {
        st: +(format(new Date(), "yyyyMMdd") + "0000"),
        ed: +(format(new Date(), "yyyyMMdd") + "2359"),
        t: "ANONYMOUS",
      },
      {
        skipPollingIfUnfocused: true,
        pollingInterval: 300000,
        refetchOnMountOrArgChange: true,
      }
    );

  return (
    <AppTable
      title="Thông tin khách hàng chưa xác thực hôm nay"
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
          key: "province_name",
          label: "Địa chỉ",
          render: (value) => <td>{value.province_name}</td>,
        },
        {
          key: "time",
          label: "Thời gian đăng ký",
          render: (value) => (
            <td>
              {value?.time
                ? format(new Date(value.time), "dd/MM/yyyy hh:mm:ss")
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
      data={(customerUnRegister || []) as any}
      isLoading={isLoadingCustomerUnRegister}
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
