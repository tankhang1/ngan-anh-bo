import React, { useContext, useMemo, useState } from "react";
import { Card, InputGroup, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Basicolumn } from "../../charts/apexcharts/columnchart/columnchartdata";
import { useGetTopupsQuery } from "../../../redux/api/manage/manage.api";
import { format, isBefore, subDays } from "date-fns";
import { useMediaQuery } from "@mui/material";
import lodash from "lodash";
import { getDaysArray } from "../../dashboards/ecommerce/components/AgentReport";
import { fNumber } from "../../../hooks";
import { useGetReportProgramPointDetailByTimeQuery } from "../../../redux/api/report/report.api";
import AppTable from "../../../components/common/table/table";
import { TProgramPointDetail } from "../../../assets/types";
import { useExportProgramPointDetailMutation } from "../../../redux/api/excel/excel.api";
import { ToastContext } from "../../../components/AppToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import AppConfirm from "../../../components/AppConfirm";
function TopupReport() {
  const toast = useContext(ToastContext);
  const { username } = useSelector((state: RootState) => state.auth);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [rangDate, setRangeDate] = useState<{ st: number; ed: number }>({
    st: +(format(subDays(new Date(), 10), "yyyyMMdd") + "0000"),
    ed: +(format(new Date(), "yyyyMMdd") + "2359"),
  });
  const [exportExcel] = useExportProgramPointDetailMutation();
  const [newRangeDate, setNewRangeDate] = useState<{ st: Date; ed: Date }>({
    st: subDays(new Date(), 10),
    ed: new Date(),
  });
  const [listDays, setListDays] = useState(
    getDaysArray(new Date(newRangeDate.st), new Date(newRangeDate.ed)).map(
      (item) => format(item, "yyyy-MM-dd")
    )
  );

  const { data: points, isLoading } = useGetReportProgramPointDetailByTimeQuery(
    {
      ...rangDate,
      nu: 0,
      sz: 1000000,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const handleExportExcel = async () => {
    await exportExcel({
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
  const mapProgram = useMemo(() => {
    const point = lodash.groupBy(
      points?.map((item) => ({
        ...item,
        time_earn: format(new Date(item?.time_earn), "yyyy-MM-dd"),
      })),
      "time_earn"
    );
    const data = listDays.map((item) => ({
      date: item,
      point: point?.[item]?.length ?? 0,
    }));
    return data;
  }, [points, listDays]);
  return (
    <Stack>
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>Chương trình tích điểm</Card.Title>
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
                  ed: +(format(newRangeDate.ed, "yyyyMMdd") + "2399"),
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
          </div>
        </Card.Header>
        <Card.Body>
          <Basicolumn
            series={[
              {
                name: "Chương trình điểm",
                data: mapProgram.map((item) => item.point),
              },
            ]}
            categories={listDays}
            colors={["#d12866", "#fd9300"]}
          />
        </Card.Body>
      </Card>
      <Card className="custom-card">
        <AppTable
          title="Danh sách khách hàng tham gia"
          headers={[
            {
              key: "program_name",
              label: "Tên chương trình",
              render: (value: TProgramPointDetail) => (
                <td>
                  <span className="fw-semibold"> {value.program_name}</span>
                </td>
              ),
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
              key: "phone",
              label: "Số điện thoại",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.phone}</span>
                </td>
              ),
            },
            {
              key: "province_name",
              label: "Tỉnh thành",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.province_name}</span>
                </td>
              ),
            },
            {
              key: "code",
              label: "Mã code",
              render: (value) => <td>{value.code}</td>,
            },
            {
              key: "product_name",
              label: "Tên sản phẩm",
              render: (value) => <td>{value.product_name}</td>,
            },
            {
              key: "point",
              label: "Số điểm",
              render: (value) => <td>{fNumber(value.point ?? 0)}</td>,
            },
            {
              key: "time_earn",
              label: "Thời gian tích điểm",
              render: (value) => (
                <td>
                  {value.time_earn
                    ? format(value.time_earn, "dd/MM/yyyy HH:mm:ss")
                    : ""}
                </td>
              ),
            },
          ]}
          data={(points || []) as any}
          isLoading={isLoading}
        />
      </Card>
    </Stack>
  );
}

export default TopupReport;
