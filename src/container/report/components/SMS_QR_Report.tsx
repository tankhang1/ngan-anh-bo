import React, { useMemo, useState } from "react";
import { Card, Col, InputGroup, Row } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import * as Chartjscharts from "../../charts/chartjschart/chartjsdata";
import { Basicolumn } from "../../charts/apexcharts/columnchart/columnchartdata";
import { useMediaQuery } from "@mui/material";
import { format, isBefore } from "date-fns";
import {
  useGetBinsQuery,
  useGetListFarmersQuery,
  useGetPacketsQuery,
} from "../../../redux/api/manage/manage.api";
import lodash from "lodash";
import { getDaysArray } from "../../dashboards/ecommerce/components/AgentReport";
import { exportMultipleSheet } from "../../../hooks";
function SMS_QR_Report() {
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

  const { data: bins } = useGetBinsQuery(
    {
      ...rangDate,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
    }
  );
  const { data: packets } = useGetPacketsQuery(
    {
      ...rangDate,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
    }
  );

  const mapReport = useMemo(() => {
    const qrCode = lodash.groupBy(
      [...(bins?.qrCode ?? []), ...(packets?.qrCode ?? [])].map((item) => ({
        ...item,
        time_use: format(new Date(item.time_use), "DD/MM/YYYY"),
      })),
      "time_use"
    );
    const sms = lodash.groupBy(
      [...(bins?.sms ?? []), ...(packets?.sms ?? [])].map((item) => ({
        ...item,
        time_use: format(new Date(item.time_use), "DD/MM/YYYY"),
      })),
      "time_use"
    );
    const data = listDays.map((date) => ({
      date: date,
      qrCode: qrCode?.[date]?.length ?? 0,
      sms: sms?.[date]?.length ?? 0,
    }));
    return data;
  }, [bins, packets, listDays]);
  return (
    <Card className="custom-card">
      <Card.Header>
        <Card.Title>QR Code và SMS</Card.Title>
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
            className={`btn btn-bd-primary ${isSmallScreen ? "btn-icon" : ""}`}
            onClick={() => {
              if (
                bins?.sms.length === 0 &&
                bins.qrCode.length === 0 &&
                packets?.sms.length === 0 &&
                packets?.qrCode.length === 0
              ) {
                return;
              } else {
                if (bins && packets)
                  exportMultipleSheet(
                    [
                      {
                        sheetName: "SMS",
                        data: [...bins.sms, ...packets.sms],
                      },
                      {
                        sheetName: "QR Code",
                        data: [...bins.qrCode, ...packets.qrCode],
                      },
                    ],
                    "Dữ liệu sản phẩm " + format(new Date(), "DD/MM/YYYY")
                  );
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
        <Row className="d-flex align-items-end">
          <Col xxl={8}>
            <Basicolumn
              series={[
                {
                  name: "QrCode",
                  data: mapReport.map((item) => item.qrCode),
                },
                {
                  name: "SMS",
                  data: mapReport.map((item) => item.sms),
                },
              ]}
              categories={listDays}
              colors={["#d12866", "#fe6601"]}
            />
          </Col>
          <Col xxl={4}>
            <Doughnut
              options={Chartjscharts.Option4}
              data={{
                type: "donut" as any,
                labels: ["QR Code", "SMS"],
                datasets: [
                  {
                    data: [
                      (bins?.qrCode.length ?? 0) +
                        (packets?.qrCode.length ?? 0),
                      (bins?.sms.length ?? 0) + (packets?.sms.length ?? 0),
                    ],
                    backgroundColor: ["#d12866", "#fe6601"],
                    hoverOffset: 4,
                  },
                ],
              }}
              height={"300px"}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default SMS_QR_Report;
