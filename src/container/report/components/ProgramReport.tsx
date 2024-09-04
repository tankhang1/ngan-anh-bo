import React, { useMemo, useState } from "react";
import { Card, InputGroup, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Basicolumn } from "../../charts/apexcharts/columnchart/columnchartdata";
import { useGetTopupsQuery } from "../../../redux/api/manage/manage.api";
import { format, isBefore } from "date-fns";
import { useMediaQuery } from "@mui/material";
import lodash from "lodash";
import { getDaysArray } from "../../dashboards/ecommerce/components/AgentReport";
import { exportMultipleSheet, fNumber } from "../../../hooks";
import { useGetReportProgramPointDetailByTimeQuery } from "../../../redux/api/report/report.api";
import AppTable from "../../../components/common/table/table";
import { TProgramPointDetail } from "../../../assets/types";
import AppId from "../../../components/common/app-id";
function TopupReport() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [rangDate, setRangeDate] = useState<{ st: number; ed: number }>({
    st: +(format(new Date(), "yyyyMMdd") + "0000"),
    ed: +(format(new Date(), "yyyyMMdd") + "2399"),
  });
  const [newRangeDate, setNewRangeDate] = useState<{ st: Date; ed: Date }>({
    st: new Date(),
    ed: new Date(),
  });
  const [listDays, setListDays] = useState([format(new Date(), "dd-MM-yyyy")]);

  const { data: points, isLoading } = useGetReportProgramPointDetailByTimeQuery(
    {
      ...rangDate,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );

  const mapProgram = useMemo(() => {
    const point = lodash.groupBy(
      points?.map((item) => ({
        ...item,
        time_earn: format(new Date(item?.time_earn), "dd-MM-yyyy"),
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
                  ).map((item) => format(item, "dd-MM-yyyy"))
                );
              }}
            >
              <i className="ti ti-filter" style={{ color: "white" }}></i>
            </button>
            <button
              className={`btn btn-bd-primary ${
                isSmallScreen ? "btn-icon" : ""
              }`}
              onClick={() => {
                if (points && points.length > 0) {
                  exportMultipleSheet([
                    {
                      sheetName: "Chương trình điểm",
                      data: points ?? [],
                    },
                  ]);
                }
              }}
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
            {
              key: "agent_name",
              label: "Tên đại lý",
              render: (value) => (
                <td>
                  <span className="fw-semibold">{value.agent_name}</span>
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
              render: (value) => <td>{value.time_earn}</td>,
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
