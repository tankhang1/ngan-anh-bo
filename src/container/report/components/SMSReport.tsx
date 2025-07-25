import React, { useContext, useMemo, useState } from "react";
import { Badge, Card, InputGroup, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Basicolumn } from "../../charts/apexcharts/columnchart/columnchartdata";
import { useMediaQuery } from "@mui/material";
import { format, isBefore, subDays } from "date-fns";
import {
  useGetListSMSGatewayDayByDayQuery,
  useGetReportDashboardDayByDayQuery,
} from "../../../redux/api/manage/manage.api";
import { getDaysArray } from "../../dashboards/ecommerce/components/AgentReport";
import { fDate } from "../../../hooks";
import AppTable from "../../../components/common/table/table";
import AppId from "../../../components/common/app-id";
import { TSMSGateway } from "../../../assets/types";
import { useExportSMSMutation } from "../../../redux/api/excel/excel.api";
import { ToastContext } from "../../../components/AppToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import AppConfirm from "../../../components/AppConfirm";
function SMSReport() {
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
  const [exportExcel] = useExportSMSMutation();

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
  const { data: listSMS, isLoading: isLoadingSMS } =
    useGetListSMSGatewayDayByDayQuery(
      {
        st: +(rangDate.st + "0000"),
        ed: +(rangDate.ed + "2359"),
        nu: 0,
        sz: 9999,
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
        isLoading={isLoadingSMS}
        headers={[
          {
            key: "id",
            label: "ID",
            render: (value: TSMSGateway) => (
              <td>
                <AppId id={value.id ?? ""} />
              </td>
            ),
          },
          {
            key: "info",
            label: "Nội dung tin nhắn",
            render: (value) => (
              <td>
                <span className="fw-semibold">{value.info}</span>
              </td>
            ),
          },
          {
            key: "code",
            label: "Mã iQR",
            render: (value: TSMSGateway) => <td>{value.code}</td>,
          },
          {
            key: "product_name",
            label: "Tên sản phẩm",
            render: (value) => (
              <td>
                <span className="fw-semibold">{value.product_name}</span>
              </td>
            ),
          },
          {
            key: "name",
            label: "Họ và tên khách hàng",
            render: (value) => (
              <td>
                <span className="fw-semibold">{value.customer_name}</span>
              </td>
            ),
          },
          {
            key: "customer_code",
            label: "Trạng thái",
            render: (value) => (
              <td>
                {!!value.customer_code ? (
                  <Badge bg="success">Đã xác thực</Badge>
                ) : (
                  <Badge bg="warning">Chờ xác thực </Badge>
                )}
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
            key: "customer_province_name",
            label: "Tỉnh thành",
            render: (value) => (
              <td>
                <span className="fw-semibold">
                  {value.customer_province_name}
                </span>
              </td>
            ),
          },
          // {
          //   key: "customer_district_name",
          //   label: "Quận huyện",
          //   render: (value) => (
          //     <td>
          //       <span className="fw-semibold">
          //         {value.customer_district_name}
          //       </span>
          //     </td>
          //   ),
          // },
          {
            key: "customer_area",
            label: "Khu vực",
            render: (value) => (
              <td>
                <span className="fw-semibold">{value.customer_area}</span>
              </td>
            ),
          },

          {
            key: "time",
            label: "Thời gian nhắn tin",
            render: (value) => (
              <td>
                <span className="fw-semibold">
                  {value.time ? format(value.time, "dd/MM/yyyy HH:mm:ss") : ""}
                </span>
              </td>
            ),
          },
        ]}
        data={listSMS || []}
      />
    </Stack>
  );
}

export default SMSReport;
