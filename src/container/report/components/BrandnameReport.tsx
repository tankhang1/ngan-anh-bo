import React, { useMemo, useState } from "react";
import { Card, InputGroup, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Basicolumn } from "../../charts/apexcharts/columnchart/columnchartdata";
import {
  useGetListBrandnamesQuery,
  useGetListBrandnameTodayQuery,
} from "../../../redux/api/manage/manage.api";
import { format, isBefore, subDays } from "date-fns";
import { useMediaQuery } from "@mui/material";
import lodash from "lodash";
import { getDaysArray } from "../../dashboards/ecommerce/components/AgentReport";
import AppTable from "../../../components/common/table/table";
import { TBrandname } from "../../../assets/types";
import { useExportBrandnameMutation } from "../../../redux/api/excel/excel.api";
function BrandnameReport() {
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
  const [exportExcel] = useExportBrandnameMutation();

  const { data: brandnames, isLoading: isLoadingBrandname } =
    useGetListBrandnamesQuery(
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
        time: format(new Date(item?.time), "yyyy-MM-dd"),
      })),
      "time"
    );
    const data = listDays.map((item) => ({
      date: item,
      brandname: brandname?.[item]?.length ?? 0,
    }));
    return data;
  }, [brandnames, listDays]);
  const handleExportExcel = async () => {
    await exportExcel({
      ...rangDate,
    })
      .unwrap()
      .then(async (url) => {
        if (url) window.open(url.data, "_blank");
      });
  };
  return (
    <Stack>
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>Brandname</Card.Title>
          <div className="d-flex align-items-center gap-2">
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
          <Basicolumn
            series={[
              {
                name: "Brandname",
                data: mapProgram.map((item) => item.brandname),
              },
            ]}
            categories={listDays}
            colors={["#d12866", "#fd9300"]}
          />
        </Card.Body>
      </Card>
      <AppTable
        title="Danh sách brandname"
        headers={[
          {
            key: "phone",
            label: "Số điện thoại",
            render: (value: TBrandname) => (
              <td>
                <span className="fw-semibold">{value.phone}</span>
              </td>
            ),
          },
          {
            key: "time",
            label: "Thời gian",
            render: (value) => (
              <td>
                {value?.time ? format(value.time, "dd/MM/yyyy HH:mm:ss") : ""}
              </td>
            ),
          },
          {
            key: "content",
            label: "Nội dung",
            render: (value) => <td>{value.content}</td>,
          },
          {
            key: "transactionid",
            label: "Mã giao dịch",
            render: (value) => <td>{value.transactionid}</td>,
          },
        ]}
        data={(brandnames || []) as any}
        isLoading={isLoadingBrandname}
      />
    </Stack>
  );
}

export default BrandnameReport;
