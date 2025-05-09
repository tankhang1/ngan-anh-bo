import React, { useContext, useMemo, useState } from "react";
import { Button, Card, InputGroup, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Basicolumn } from "../../charts/apexcharts/columnchart/columnchartdata";
import { format, isBefore, subDays } from "date-fns";
import { useMediaQuery } from "@mui/material";
import lodash from "lodash";
import { getDaysArray } from "../../dashboards/ecommerce/components/AgentReport";
import {
  useGetReportProgramChanceFarmerReportQuery,
  useGetReportProgramChanceRetailerReportQuery,
} from "../../../redux/api/report/report.api";
import AppTable from "../../../components/common/table/table";
import {
  useExportProgramChanceFarmerMutation,
  useExportProgramChanceRetailerMutation,
} from "../../../redux/api/excel/excel.api";
import { ToastContext } from "../../../components/AppToast";
import AppConfirm from "../../../components/AppConfirm";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
function ChanceReport() {
  const toast = useContext(ToastContext);
  const { username } = useSelector((state: RootState) => state.auth);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [rangDate, setRangeDate] = useState<{ st: number; ed: number }>({
    st: +(format(subDays(new Date(), 10), "yyyyMMdd") + "0000"),
    ed: +(format(new Date(), "yyyyMMdd") + "2359"),
  });
  const [newRangeDate, setNewRangeDate] = useState<{ st: Date; ed: Date }>({
    st: subDays(new Date(), 10),
    ed: new Date(),
  });
  const [listDays, setListDays] = useState(
    getDaysArray(new Date(newRangeDate.st), new Date(newRangeDate.ed)).map(
      (item) => format(item, "yyyy-MM-dd")
    )
  );
  const [exportRetailerExcel] = useExportProgramChanceRetailerMutation();
  const [exportFarmerExcel] = useExportProgramChanceFarmerMutation();
  const {
    data: programChanceFarmers,
    isLoading: isLoadingProgramChanceFarmer,
  } = useGetReportProgramChanceFarmerReportQuery(
    {
      ...rangDate,
      nu: 0,
      sz: 999999,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const {
    data: programChanceRetailers,
    isLoading: isLoadingProgramChanceRetailer,
  } = useGetReportProgramChanceRetailerReportQuery(
    {
      ...rangDate,
      nu: 0,
      sz: 999999,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const mapProgramFarmer = useMemo(() => {
    const timeLucky = lodash.groupBy(
      programChanceFarmers?.map((item) => ({
        ...item,
        time_lucky: format(new Date(item?.time_lucky), "yyyy-MM-dd"),
      })),
      "time_lucky"
    );
    const data = listDays.map((item) => ({
      date: item,
      time_lucky: timeLucky?.[item]?.length ?? 0,
    }));
    return data;
  }, [programChanceFarmers, listDays]);
  const mapProgramRetailer = useMemo(() => {
    const timeLucky = lodash.groupBy(
      programChanceRetailers?.map((item) => ({
        ...item,
        time_lucky: format(new Date(item?.time_lucky), "yyyy-MM-dd"),
      })),
      "time_lucky"
    );
    const data = listDays.map((item) => ({
      date: item,
      time_lucky: timeLucky?.[item]?.length ?? 0,
    }));
    return data;
  }, [programChanceRetailers, listDays]);
  const handleExportFarmerExcel = async () => {
    await exportFarmerExcel({
      ...newRangeDate,
      st: +(format(newRangeDate.st, "yyyyMMdd") + "0000"),
      ed: +(format(newRangeDate.ed, "yyyyMMdd") + "2359"),
      u: username,
    })
      .unwrap()
      .then(() => {
        toast.showToast(
          "Xuất dữ liệu thành công, vui lòng kiểm tra mục danh sách yêu cầu"
        );
      });
  };
  const handleExportRetailerExcel = async () => {
    await exportRetailerExcel({
      ...newRangeDate,
      st: +(format(newRangeDate.st, "yyyyMMdd") + "0000"),
      ed: +(format(newRangeDate.ed, "yyyyMMdd") + "2359"),
      u: username,
    })
      .unwrap()
      .then(() => {
        toast.showToast(
          "Xuất dữ liệu thành công, vui lòng kiểm tra mục danh sách yêu cầu"
        );
      });
  };
  return (
    <Stack>
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>Chương trình may mắn</Card.Title>
          <div className="d-flex   align-items-center gap-2">
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
              className="btn btn-icon bg-danger"
              onClick={() => {
                console.log("rang date", newRangeDate);
                setRangeDate({
                  st: +(format(newRangeDate.st, "yyyyMMdd") + "0000"),
                  ed: +(format(newRangeDate.ed, "yyyyMMdd") + "2359"),
                });
                setListDays(
                  getDaysArray(
                    new Date(newRangeDate.st),
                    new Date(newRangeDate.ed)
                  ).map((item) => format(item, "yyyy-MM-dd"))
                );
              }}
            >
              <i className="ti ti-filter" style={{ color: "white" }}></i>
            </button>
          </div>
        </Card.Header>
        <Card.Body>
          <Basicolumn
            series={[
              {
                name: "Nông dân",
                data: mapProgramFarmer.map((item) => item.time_lucky),
              },
              {
                name: "Đại lý",
                data: mapProgramRetailer.map((item) => item.time_lucky),
              },
            ]}
            categories={listDays}
            colors={["#d12866", "#fd9300"]}
          />
        </Card.Body>
      </Card>
      <AppTable
        title="Danh sách trúng thưởng nông dân"
        headerRightSection={
          <AppConfirm onAccept={handleExportFarmerExcel}>
            <Button
              size="sm"
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
            </Button>
          </AppConfirm>
        }
        headers={[
          {
            key: "program_name",
            label: "Tên chương trình",
            render: (value) => (
              <td>
                <span className="fw-semibold">{value.program_name}</span>
              </td>
            ),
          },
          {
            key: "code",
            label: "Mã iQr",
            render: (value) => (
              <td>
                <span className="fw-semibold">{value.code}</span>
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
            key: "province_name",
            label: "Tỉnh thành",
            render: (value) => (
              <td>
                <span className="fw-semibold">
                  {value.province_name ?? "-"}
                </span>
              </td>
            ),
          },
          {
            key: "area",
            label: "Khu vực",
            render: (value) => (
              <td>
                <span className="fw-semibold">{value.area ?? "-"}</span>
              </td>
            ),
          },
          {
            key: "gift_name",
            label: "Phần thưởng",
            render: (value) => <td>{value.gift_name}</td>,
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
            key: "time_lucky",
            label: "Thời gian trúng thưởng",
            render: (value) => <td>{value.time_lucky}</td>,
          },
        ]}
        data={(programChanceFarmers || []) as any}
        filters={[]}
        isLoading={isLoadingProgramChanceFarmer}
      />
      <AppTable
        title="Danh sách trúng thưởng đại lý"
        headerRightSection={
          <AppConfirm onAccept={handleExportRetailerExcel}>
            <Button
              size="sm"
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
            </Button>
          </AppConfirm>
        }
        headers={[
          {
            key: "program_name",
            label: "Tên chương trình",
            render: (value) => (
              <td>
                <span className="fw-semibold">{value.program_name}</span>
              </td>
            ),
          },
          {
            key: "code",
            label: "Mã iQr",
            render: (value) => (
              <td>
                <span className="fw-semibold">{value.code}</span>
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
            key: "province_name",
            label: "Tỉnh thành",
            render: (value) => (
              <td>
                <span className="fw-semibold">
                  {value.province_name ?? "-"}
                </span>
              </td>
            ),
          },
          {
            key: "area",
            label: "Khu vực",
            render: (value) => (
              <td>
                <span className="fw-semibold">{value.area ?? "-"}</span>
              </td>
            ),
          },

          {
            key: "gift_name",
            label: "Phần thưởng",
            render: (value) => <td>{value.gift_name}</td>,
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
            key: "time_lucky",
            label: "Thời gian trúng thưởng",
            render: (value) => <td>{value.time_lucky}</td>,
          },
        ]}
        data={(programChanceRetailers || []) as any}
        filters={[]}
        isLoading={isLoadingProgramChanceRetailer}
      />
    </Stack>
  );
}

export default ChanceReport;
