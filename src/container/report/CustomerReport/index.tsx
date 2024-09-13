import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Form, InputGroup, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Dashed } from "../../charts/apexcharts/linechart/linechartdata";
import { format, isBefore } from "date-fns";
import {
  useGetListCustomerQuery,
  useGetListGroupObjectiveQuery,
  useGetReportDashboardDayByDayQuery,
} from "../../../redux/api/manage/manage.api";
import { getDaysArray } from "../../dashboards/ecommerce/components/AgentReport";
import AppTable from "../../../components/common/table/table";
import { TAgent } from "../../../assets/types";
import AppId from "../../../components/common/app-id";
import { useMediaQuery } from "@mui/material";
import { downloadLink, exportMultipleSheet, fDate } from "../../../hooks";
import Select from "react-select";
import { useExportCustomerDataMutation } from "../../../redux/api/excel/excel.api";

function CustomerReport() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isSmallestScreen = useMediaQuery("(max-width:425px)");

  const { data: groupObjectives } = useGetListGroupObjectiveQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const [customerType, setCustomerType] = useState<string>(
    groupObjectives?.[0].symbol || ""
  );
  const [isValidate, setIsValidate] = useState(false);
  const [rangDate, setRangeDate] = useState<{ st: number; ed: number }>({
    st: +format(new Date(), "yyyyMMdd"),
    ed: +format(new Date(), "yyyyMMdd"),
  });
  const [newRangeDate, setNewRangeDate] = useState<{ st: Date; ed: Date }>({
    st: new Date(),
    ed: new Date(),
  });
  const [listDays, setListDays] = useState([format(new Date(), "dd-MM-yyyy")]);
  const [exportExcel] = useExportCustomerDataMutation();
  const { data: customer, isFetching } = useGetListCustomerQuery(
    {
      st: +(rangDate.st.toString() + "0000"),
      ed: +(rangDate.ed.toString() + "2399"),
      t: customerType,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
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
          date: fDate(date.day, "dd-MM-yyyy"),
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
    if (customer) {
      await exportExcel({ ...rangDate })
        .unwrap()
        .then(async (url) => {
          if (url) await downloadLink(url);
        });
    }
  };

  useEffect(() => {
    if (groupObjectives) {
      setCustomerType(groupObjectives?.[0].symbol);
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
            <Select
              isSearchable
              name="colors"
              placeholder="Chọn đối tượng"
              options={groupObjectives?.map((item) => ({
                label: item.name,
                value: item.symbol,
              }))}
              className={`default basic-multi-select ${
                isSmallestScreen ? "w-100" : "form-group"
              }`}
              id="choices-multiple-default"
              menuPlacement="auto"
              classNamePrefix="Select2"
              onChange={(e) => e && setCustomerType(e?.value)}
            />
            <Form.Check
              className="form-check-md d-flex align-items-center"
              type="checkbox"
              checked={isValidate}
              id="checkebox-lg"
              label="Đã xác thực?"
              onClick={() => setIsValidate(!isValidate)}
            />
            <button
              className={`btn ${
                isSmallestScreen
                  ? "w-100 d-flex justify-content-center items-center"
                  : "btn-icon"
              } bg-danger text-white`}
              onClick={() => {
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
          <Card.Title>Khách hàng</Card.Title>

          <div className="d-flex align-items-center gap-2">
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
                      ? format(new Date(value.time), "dd/MM/yyyy")
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
            data={(customer || []) as any}
            isLoading={isFetching}
            isHeader={false}
            filters={[
              {
                key: "status",
                label: "Tất cả",
                value: "ALL",
              },
            ]}
          />
        </Card.Body>
      </Card>
    </Stack>
  );
}

export default CustomerReport;
