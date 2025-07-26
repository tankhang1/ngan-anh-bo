import React, { useContext, useEffect, useMemo, useState } from "react";
import { Card, InputGroup, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Dashed } from "../../charts/apexcharts/linechart/linechartdata";
import { format, isBefore, subDays } from "date-fns";
import {
  useGetCounterCustomerQuery,
  useGetListCustomerQuery,
  useGetListGroupObjectiveQuery,
  useGetReportDashboardDayByDayQuery,
} from "../../../redux/api/manage/manage.api";
import { getDaysArray } from "../../dashboards/ecommerce/components/AgentReport";
import AppTable from "../../../components/common/table/table";
import { TCustomerRes } from "../../../assets/types";
import { useMediaQuery } from "@mui/material";
import { fDate } from "../../../hooks";
import { useExportCustomerDataMutation } from "../../../redux/api/excel/excel.api";
import { MapCustomerType } from "../../../constants";
import AppSelect from "../../../components/AppSelect";
import { ToastContext } from "../../../components/AppToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import AppConfirm from "../../../components/AppConfirm";

function CustomerReport() {
  const toast = useContext(ToastContext);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isSmallestScreen = useMediaQuery("(max-width:425px)");
  const { username } = useSelector((state: RootState) => state.auth);
  const { data: groupObjectives } = useGetListGroupObjectiveQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const [rangDate, setRangeDate] = useState<{
    st: number;
    ed: number;
    t: string;
    k: string;
  }>({
    st: +format(subDays(new Date(), 10), "yyyyMMdd"),
    ed: +format(new Date(), "yyyyMMdd"),
    t: "ALL",
    k: "",
  });
  const [newRangeDate, setNewRangeDate] = useState<{
    st: Date;
    ed: Date;
  }>({
    st: subDays(new Date(), 19),
    ed: new Date(),
  });
  const [listDays, setListDays] = useState(
    getDaysArray(new Date(newRangeDate.st), new Date(newRangeDate.ed)).map(
      (item) => format(item, "yyyy-MM-dd")
    )
  );
  const [exportExcel] = useExportCustomerDataMutation();
  const [page, setPage] = useState(1);
  const { data: counterCustomer } = useGetCounterCustomerQuery(
    {
      st: +(rangDate.st + "0000"),
      ed: +(rangDate.ed + "2359"),
      s: 1,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: customers, isLoading: isLoadingCustomer } =
    useGetListCustomerQuery(
      {
        st: +(rangDate.st + "0000"),
        ed: +(rangDate.ed + "2359"),
        nu: page - 1,
        sz: 10,
        s: 1,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const { data: reportDayByDay } = useGetReportDashboardDayByDayQuery(
    {
      ...rangDate,
      nu: 0,
      sz: 99999,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const mapReport = useMemo(() => {
    const data =
      reportDayByDay?.map((date) => {
        return {
          date: fDate(date.day, "yyyy-MM-dd"),
          topup: date.topup,
          brandname: date.brandname,
          agent: date.agent,
          agent_none: date.agent_none,
          farmer: date.farmer,
          farmer_none: date.farmer_none,
          qrcode: date.qrcode,
          sms: date.sms,
        };
      }) || [];
    return data;
  }, [reportDayByDay, listDays]);

  const handleExportExcel = async () => {
    if (customers) {
      await exportExcel({
        ...newRangeDate,
        st: +(format(newRangeDate.st, "yyyyMMdd") + "0000"),
        ed: +(format(newRangeDate.ed, "yyyyMMdd") + "2359"),
        u: username,
        type: "ADMIN",
      })
        .unwrap()
        .then(() => {
          toast.showToast(
            "Xuất dữ liệu thành công, vui lòng kiểm tra mục danh sách yêu cầu"
          );
        });
    }
  };

  useEffect(() => {
    if (groupObjectives) {
      setRangeDate({ ...rangDate, t: "ALL" });
    }
  }, [groupObjectives]);

  return (
    <Stack>
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>Khách hàng</Card.Title>
          <div
            className={`d-flex ${
              isSmallestScreen ? "flex-column" : "flex-rows"
            } align-items-center gap-2`}
          >
            <div className="form-group">
              <InputGroup className="">
                <InputGroup.Text className="input-group-text text-muted">
                  <i className="ri-calendar-line"></i>
                </InputGroup.Text>
                <DatePicker
                  onChange={(date) => {
                    date !== null &&
                      isBefore(date, newRangeDate.ed) &&
                      setNewRangeDate({ ...newRangeDate, st: date });
                  }}
                  value={format(newRangeDate.st, "dd-MM-yyyy")}
                  placeholderText="Chọn ngày bắt đầu (DD/MM/YYYY)"
                  isClearable
                  maxDate={new Date()}
                />
              </InputGroup>
            </div>
            <div className="form-group">
              <InputGroup className="">
                <InputGroup.Text className="input-group-text text-muted">
                  <i className="ri-calendar-line"></i>
                </InputGroup.Text>
                <DatePicker
                  onChange={(date) => {
                    date !== null &&
                      isBefore(newRangeDate.st, date) &&
                      setNewRangeDate({ ...newRangeDate, ed: date });
                  }}
                  value={format(newRangeDate.ed, "dd-MM-yyyy")}
                  placeholderText="Chọn ngày kết thúc(DD/MM/YYYY)"
                  isClearable
                  maxDate={new Date()}
                />
              </InputGroup>
            </div>

            <button
              className={`btn ${
                isSmallestScreen
                  ? "w-100 d-flex justify-content-center items-center"
                  : "btn-icon"
              } bg-danger text-white`}
              onClick={() => {
                setRangeDate({
                  ...rangDate,
                  st: +format(newRangeDate.st, "yyyyMMdd"),
                  ed: +format(newRangeDate.ed, "yyyyMMdd"),
                });
                setListDays(
                  getDaysArray(
                    new Date(newRangeDate.st),
                    new Date(newRangeDate.ed)
                  ).map((item) => format(item, "yyyy-MM-dd"))
                );
              }}
            >
              {isSmallestScreen ? (
                <div className="d-flex align-items-center gap-1">
                  <i className="ti ti-filter"></i>
                  Lọc
                </div>
              ) : (
                <i className="ti ti-filter" style={{ color: "white" }}></i>
              )}
            </button>
          </div>
        </Card.Header>
        <Card.Body>
          <div id="dashed-chart">
            <Dashed
              title="Số lượt đăng kí"
              series={[
                {
                  name: "Đại lý cấp 2 xác thực",
                  data: mapReport.map((item) => item.agent),
                },
                {
                  name: "Đại lý cấp 2 chờ xác thực",
                  data: mapReport.map((item) => item.agent),
                },
                {
                  name: "Nông dân đã xác thực",
                  data: mapReport.map((item) => item.farmer),
                },
                {
                  name: "Nông dân chờ xác thực",
                  data: mapReport.map((item) => item.farmer_none),
                },
              ]}
              categories={listDays}
              colors={["#fe6601", "#fcd1d1", "#3498db", "#2ecc71"]}
            />
          </div>
        </Card.Body>
      </Card>
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>Danh sách khách hàng</Card.Title>

          <div className="d-flex align-items-center gap-2">
            <AppSelect
              data={[
                {
                  label: "Tất cả",
                  value: "ALL",
                },
                ...(groupObjectives?.map((item) => ({
                  label: item.name,
                  value: item.symbol,
                })) ?? []),
              ]}
              placeholder="Chọn đối tượng khách hàng"
              value={rangDate.t}
              onChange={(e) => setRangeDate({ ...rangDate, t: e })}
            />
            {username === "suadmin" && (
              <AppConfirm onAccept={handleExportExcel}>
                <button
                  className={`btn btn-bd-primary ${
                    isSmallScreen ? "btn-icon" : ""
                  }`}
                >
                  {isSmallScreen ? (
                    <i className="ti ti-database-export "></i>
                  ) : (
                    <div className="d-flex align-items-center gap-1">
                      <i className="ti ti-database-export "></i>
                      Xuất Excel
                    </div>
                  )}
                </button>
              </AppConfirm>
            )}
          </div>
        </Card.Header>
        <Card.Body>
          <AppTable
            isHeader={false}
            title="Thông tin đại lý"
            isLoading={isLoadingCustomer}
            setExternalPage={setPage}
            maxPage={counterCustomer}
            headers={[
              {
                key: "customer_code",
                label: "Mã khách hàng",
                render: (value: TCustomerRes) => <td>{value.customer_code}</td>,
              },
              {
                key: "name",
                label: "Tên đăng kí",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.name}</span>
                  </td>
                ),
              },
              {
                key: "name",
                label: "Họ và tên",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.customer_name}</span>
                  </td>
                ),
              },
              {
                key: "sign_board",
                label: "Tên cửa hàng",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.sign_board}</span>
                  </td>
                ),
              },
              {
                key: "province",
                label: "Tỉnh thành",
                render: (value) => <td>{value.customer_province_name}</td>,
              },
              {
                key: "phone",
                label: "Số điện thoại",
                render: (value) => <td>{value.phone}</td>,
              },
              {
                key: "customer_type",
                label: "Nhóm khách hàng",
                render: (value) => (
                  <td>
                    {value?.customer_type
                      ? MapCustomerType.get(value.customer_type)
                      : ""}
                  </td>
                ),
              },

              {
                key: "time",
                label: "Thời gian đăng kí",
                render: (value) => <td>{value.time}</td>,
              },
              {
                key: "time_verify",
                label: "Thời gian xác thực",
                render: (value) => (
                  <td>
                    {value?.time_verify
                      ? format(new Date(value.time_verify), "dd/MM/yyyy HH:mm")
                      : ""}
                  </td>
                ),
              },
              {
                key: "source_channel_used",
                label: "Nguồn đăng kí",
                render: (value) => <td>{value.source_channel_used}</td>,
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
            data={customers || []}
            externalSearch=""
          />
        </Card.Body>
      </Card>
    </Stack>
  );
}

export default CustomerReport;
