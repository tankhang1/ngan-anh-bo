import React, { useMemo, useState } from "react";
import { Card, Col, InputGroup, Row, Stack } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import * as Chartjscharts from "../../charts/chartjschart/chartjsdata";
import { Basicolumn } from "../../charts/apexcharts/columnchart/columnchartdata";
import { useMediaQuery } from "@mui/material";
import { format, isBefore } from "date-fns";
import {
  useGetBinsQuery,
  useGetPacketsQuery,
  useGetReportDashboardDayByDayQuery,
} from "../../../redux/api/manage/manage.api";
import lodash from "lodash";
import { getDaysArray } from "../../dashboards/ecommerce/components/AgentReport";
import { exportMultipleSheet, fDate } from "../../../hooks";
import AppTable from "../../../components/common/table/table";
import AppId from "../../../components/common/app-id";
import { TProductDashboardTable } from "../../../assets/types";
function SMSReport() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [rangDate, setRangeDate] = useState<{ st: number; ed: number }>({
    st: +format(new Date(), "yyyyMMdd"),
    ed: +format(new Date(), "yyyyMMdd"),
  });
  const [newRangeDate, setNewRangeDate] = useState<{ st: Date; ed: Date }>({
    st: new Date(),
    ed: new Date(),
  });
  const [listDays, setListDays] = useState([format(new Date(), "dd-MM-yyyy")]);

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
  const { data: bins, isLoading: isLoadingBin } = useGetBinsQuery(
    {
      st: +(rangDate.st.toString() + "0000"),
      ed: +(rangDate.ed.toString() + "2399"),
      nu: 0,
      sz: 9999,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: packets, isLoading: isLoadingPacket } = useGetPacketsQuery(
    {
      st: +(rangDate.st.toString() + "0000"),
      ed: +(rangDate.ed.toString() + "2399"),
      nu: 0,
      sz: 9999,
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
          date: fDate(date.day, "dd-MM-YYYY"),
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
  return (
    <Stack>
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>SMS</Card.Title>
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
                  st: +format(newRangeDate.st, "yyyyMMdd"),
                  ed: +format(newRangeDate.ed, "yyyyMMdd"),
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
              onClick={() => {}}
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
                name: "SMS",
                data: mapReport.map((item) => item.sms),
              },
            ]}
            categories={listDays}
            colors={["#d12866", "#fe6601"]}
          />
        </Card.Body>
      </Card>

      <AppTable
        title="SMS"
        isLoading={isLoadingBin || isLoadingPacket}
        headers={[
          {
            key: "id",
            label: "ID",
            render: (value: TProductDashboardTable) => (
              <td>
                <AppId id={value.id} />
              </td>
            ),
          },
          {
            key: "code",
            label: "Mã iQR",
            render: (value) => (
              <td>
                <span className="fw-semibold">{value.code}</span>
              </td>
            ),
          },
          {
            key: "bin_seri",
            label: "Số seri thùng",
            render: (value) => <td>{value.bin_seri}</td>,
          },
          {
            key: "product_code",
            label: "Mã sản phẩm",
            render: (value) => <td>{value.product_code}</td>,
          },
          {
            key: "time_use",
            label: "Ngày sử dụng",
            render: (value) => <td>{value.time_use}</td>,
          },
        ]}
        data={[...(bins?.sms ?? []), ...(packets?.sms ?? [])]}
      />
    </Stack>
  );
}

export default SMSReport;