import React, { useContext, useMemo, useState } from "react";
import { Card, Col, InputGroup, Row, Stack } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import * as Chartjscharts from "../../charts/chartjschart/chartjsdata";
import { Basicolumn } from "../../charts/apexcharts/columnchart/columnchartdata";
import { useMediaQuery } from "@mui/material";
import { format, isBefore, subDays } from "date-fns";
import {
  useGetBinsQuery,
  useGetPacketsQuery,
  useGetReportDashboardDayByDayQuery,
} from "../../../redux/api/manage/manage.api";
import { getDaysArray } from "../../dashboards/ecommerce/components/AgentReport";
import { fDate } from "../../../hooks";
import AppTable from "../../../components/common/table/table";
import AppId from "../../../components/common/app-id";
import { TProductDashboardTable } from "../../../assets/types";
import {
  useExportBinMutation,
  useExportPackageMutation,
} from "../../../redux/api/excel/excel.api";
import { ToastContext } from "../../../components/AppToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
function SMS_QR_Report() {
  const toast = useContext(ToastContext);
  const { username } = useSelector((state: RootState) => state.auth);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [rangDate, setRangeDate] = useState<{ st: number; ed: number }>({
    st: +format(subDays(new Date(), 10), "yyyyMMdd"),
    ed: +format(new Date(), "yyyyMMdd"),
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
  const [exportBinExcel] = useExportBinMutation();
  const [exportPackageExcel] = useExportPackageMutation();
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
      st: +(rangDate.st + "0000"),
      ed: +(rangDate.ed + "2359"),
      sz: 100000,
      nu: 0,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: packets, isLoading: isLoadingPacket } = useGetPacketsQuery(
    {
      st: +(rangDate.st + "0000"),
      ed: +(rangDate.ed + "2359"),
      sz: 100000,
      nu: 0,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const handleExportExcel = async () => {
    await exportBinExcel({
      ...rangDate,
      st: +(rangDate.st + "0000"),
      ed: +(rangDate.ed + "2359"),
      u: username,
    })
      .unwrap()
      .then(() => {
        toast.showToast(
          "Xuất dữ liệu thành công, vui lòng kiểm tra mục danh sách yêu cầu"
        );
      });
    await exportPackageExcel({
      ...rangDate,
      st: +(rangDate.st + "0000"),
      ed: +(rangDate.ed + "2359"),
      u: username,
    })
      .unwrap()
      .then(() => {
        toast.showToast(
          "Xuất dữ liệu thành công, vui lòng kiểm tra mục danh sách yêu cầu"
        );
      });
  };
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
  return (
    <Stack>
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>QR Code, Zalo, và SMS</Card.Title>
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
                setRangeDate({
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
              <i className="ti ti-filter" style={{ color: "white" }}></i>
            </button>
            <button
              className={`btn btn-bd-primary ${
                isSmallScreen ? "btn-icon" : ""
              }`}
              onClick={handleExportExcel}
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
          <Stack className="d-flex gap-2">
            <Row>
              <Col md={8}>
                <Basicolumn
                  series={[
                    {
                      name: "QrCode / Zalo",
                      data: mapReport.map((item) => item.qrcode),
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
              <Col md={4}>
                <Doughnut
                  options={Chartjscharts.Option4}
                  data={{
                    //@ts-ignore
                    type: "donut",
                    labels: ["QR Code / Zalo", "SMS"],
                    datasets: [
                      {
                        data: [
                          mapReport?.reduce((pre, cur) => pre + cur.qrcode, 0),
                          mapReport?.reduce((pre, cur) => pre + cur.sms, 0),
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
          </Stack>
        </Card.Body>
      </Card>
      <Row>
        <Col xl={6}>
          <AppTable
            title="SMS Gateway"
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
                render: (value) => (
                  <td>
                    {value.time_use
                      ? format(value.time_use, "dd/MM/yyyy HH:mm:ss")
                      : ""}
                  </td>
                ),
              },
            ]}
            data={[...(bins?.sms ?? []), ...(packets?.sms ?? [])]}
          />
        </Col>
        <Col xl={6}>
          <AppTable
            title="QrCode / Zalo"
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
                render: (value) => (
                  <td>
                    {value.time_use
                      ? format(value.time_use, "dd/MM/yyyy HH:mm:ss")
                      : ""}
                  </td>
                ),
              },
            ]}
            data={[
              ...(bins?.qrCode ?? []),
              ...(packets?.qrCode ?? []),
              ...(bins?.zalo ?? []),
              ...(packets?.zalo ?? []),
            ]}
          />
        </Col>
      </Row>
    </Stack>
  );
}

export default SMS_QR_Report;
