import React, { useMemo, useState } from "react";
import { Card, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Basicolumn } from "../../charts/apexcharts/columnchart/columnchartdata";
import {
  useGetListBrandnamesQuery,
  useGetTopupsQuery,
} from "../../../redux/api/manage/manage.api";
import { format, isBefore } from "date-fns";
import { useMediaQuery } from "@mui/material";
import lodash from "lodash";
import { getDaysArray } from "../../dashboards/ecommerce/components/AgentReport";
import { useGetListProgramPointQuery } from "../../../redux/api/program/program.api";
import { exportMultipleSheet } from "../../../hooks";
function BrandnameReport() {
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

  const { data: brandnames } = useGetListBrandnamesQuery(
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
    const brandname = lodash.groupBy(
      brandnames?.map((item) => ({
        ...item,
        time: format(new Date(item?.time), "ddy/MM/yyyy"),
      })),
      "time"
    );
    const data = listDays.map((item) => ({
      date: item,
      brandname: brandname?.[item]?.length ?? 0,
    }));
    return data;
  }, [brandnames, listDays]);
  return (
    <Card className="custom-card">
      <Card.Header>
        <Card.Title>Brandname</Card.Title>
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
              if (brandnames && brandnames.length > 0) {
                exportMultipleSheet([
                  {
                    sheetName: "Brandname",
                    data: brandnames ?? [],
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
              name: "Topup",
              data: mapProgram.map((item) => item.brandname),
            },
          ]}
          categories={listDays}
          colors={["#d12866", "#fd9300"]}
        />
      </Card.Body>
    </Card>
  );
}

export default BrandnameReport;
