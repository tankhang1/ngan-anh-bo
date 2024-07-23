import React, { useMemo, useState } from "react";
import { Card, Col, InputGroup, Row, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Dashed } from "../../charts/apexcharts/linechart/linechartdata";
import { format, isBefore } from "date-fns";
import {
  useGetListAgentsQuery,
  useGetListFarmersQuery,
} from "../../../redux/api/manage/manage.api";
import lodash from "lodash";
import { getDaysArray } from "../../dashboards/ecommerce/components/AgentReport";
import AppTable from "../../../components/common/table/table";
import { TAgent } from "../../../assets/types";
import AppId from "../../../components/common/app-id";
import { useMediaQuery } from "@mui/material";
import { exportMultipleSheet } from "../../../hooks";

function FarmerReport() {
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

  const { data: farmers } = useGetListFarmersQuery(
    {
      ...rangDate,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const mapAgent = useMemo(() => {
    const checkedFarmer = lodash.groupBy(
      farmers?.listValidateFarmers.map((item) => ({
        ...item,
        time: format(item.time, "dd-MM-yyyy"),
      }))
    );
    const unCheckedFarmer = lodash.groupBy(
      farmers?.listUnValidateFarmers.map((item) => ({
        ...item,
        time: format(item.time, "dd-MM-yyyy"),
      }))
    );
    const data = listDays.map((date) => ({
      date: date,
      farmerChecked: checkedFarmer?.[date]?.length ?? 0,
      farmerUnchecked: unCheckedFarmer?.[date]?.length ?? 0,
    }));
    return data;
  }, [farmers, listDays]);
  return (
    <Stack>
      <Col xxl={12}>
        <Card className="custom-card">
          <Card.Header>
            <Card.Title>Nông dân</Card.Title>
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
                  if (
                    farmers &&
                    (farmers.listUnValidateFarmers.length > 0 ||
                      farmers.listValidateFarmers.length > 0)
                  ) {
                    exportMultipleSheet([
                      {
                        sheetName: "Nông dân chờ xác thực",
                        data: farmers?.listUnValidateFarmers ?? [],
                      },
                      {
                        sheetName: "Nông dân xác thực",
                        data: farmers?.listValidateFarmers ?? [],
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
            <div id="dashed-chart">
              <Dashed
                title="Số lượt đăng kí"
                series={[
                  {
                    name: "Nông dân đã xác thực",
                    data: mapAgent.map((item) => item.farmerChecked),
                  },
                  {
                    name: "Nông dân chờ xác thực",
                    data: mapAgent.map((item) => item.farmerUnchecked),
                  },
                ]}
                categories={listDays}
                colors={["#fe6601", "#fcd1d1"]}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xxl={12}>
        <Card className="custom-card" style={{ height: 475 }}>
          <AppTable
            title="Thông tin nông dân"
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
                key: "province",
                label: "Địa chỉ",
                render: (value) => <td>{value.province}</td>,
              },
              {
                key: "time_verify",
                label: "Thời gian xác thực",
                render: (value) => (
                  <td>
                    {value?.time_verify
                      ? format(new Date(value.time_verify), "dd/MM/yyyy")
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
            data={
              ([
                ...(farmers?.listUnValidateFarmers || []),
                ...(farmers?.listValidateFarmers || []),
              ] || []) as any
            }
            filters={[
              {
                key: "status",
                label: "Tất cả",
                value: "ALL",
              },
            ]}
          />
        </Card>
      </Col>
    </Stack>
  );
}

export default FarmerReport;
