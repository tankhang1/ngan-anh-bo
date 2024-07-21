import React, { useMemo, useState } from "react";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { Basicolumn } from "../../../charts/apexcharts/columnchart/columnchartdata";
import {
  useGetBinsQuery,
  useGetListAgentsQuery,
  useGetListBrandnamesQuery,
  useGetListFarmersQuery,
  useGetPacketsQuery,
  useGetTopupsQuery,
} from "../../../../redux/api/manage/manage.api";
import { endOfWeek, format, startOfWeek, subDays, subWeeks } from "date-fns";
import lodash from "lodash";
import { getDaysArray } from "./AgentReport";
import { Basicline } from "../../../charts/apexcharts/linechart/linechartdata";
function ServiceReport() {
  const [rangDate, setRangeDate] = useState<{ st: number; ed: number }>({
    st: +(format(new Date(), "yyyyMMdd") + "0000"),
    ed: +(format(new Date(), "yyyyMMdd") + "2399"),
  });
  const [dropdownOption, setDropdownOption] = useState<
    "today" | "week" | "lastWeek"
  >("today");
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
  const { data: topups } = useGetTopupsQuery(
    {
      ...rangDate,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: bins } = useGetBinsQuery(
    {
      ...rangDate,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: packets } = useGetPacketsQuery(
    {
      ...rangDate,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const handleDropdownMenu = (date: "today" | "week" | "lastWeek") => {
    if (date === "today") {
      setRangeDate({
        st: +(format(new Date(), "yyyyMMdd") + "0000"),
        ed: +(format(new Date(), "yyyyMMdd") + "2399"),
      });
      setListDays([format(new Date(), "dd-MM-yyyy")]);
    }
    if (date === "week") {
      setRangeDate({
        st: +(
          format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyyMMdd") +
          "0000"
        ),
        ed: +(format(new Date(), "yyyyMMdd") + "0000"),
      });
      setListDays(
        getDaysArray(
          startOfWeek(new Date(), { weekStartsOn: 1 }),
          new Date()
        ).map((item) => format(new Date(item), "dd-MM-yyyy"))
      );
    }
    if (date === "lastWeek") {
      setRangeDate({
        st: +(
          format(startOfWeek(subWeeks(new Date(), 1)), "yyyyMMdd") + "0000"
        ),
        ed: +(format(endOfWeek(subWeeks(new Date(), 1)), "yyyyMMdd") + "0000"),
      });
      setListDays(
        getDaysArray(
          startOfWeek(subWeeks(new Date(), 1)),
          endOfWeek(subWeeks(new Date(), 1))
        ).map((item) => format(new Date(item), "dd-MM-yyyy"))
      );
    }
    setDropdownOption(date);
  };

  const mapService = useMemo(() => {
    const qrCode = lodash.groupBy(
      [...(bins?.qrCode ?? []), ...(packets?.qrCode ?? [])].map((item) => ({
        ...item,
        time_use: format(new Date(item.time_use), "dd-MM-yyyy"),
      })),
      "time_use"
    );
    const sms = lodash.groupBy(
      [...(bins?.sms ?? []), ...(packets?.sms ?? [])].map((item) => ({
        ...item,
        time_use: format(new Date(item.time_use), "dd-MM-yyyy"),
      })),
      "time_use"
    );
    const brandname = lodash.groupBy(
      brandnames?.map((item) => ({
        ...item,
        time: format(new Date(item.time), "dd-MM-yyyy"),
      })),
      "time"
    );
    const topup = lodash.groupBy(
      topups?.map((item) => ({
        ...item,
        time: format(new Date(item.time), "dd-MM-yyyy"),
      })),
      "time"
    );
    const data = listDays.map((date) => ({
      date: date,
      topup: topup?.[date]?.length ?? 0,
      brandname: brandname?.[date]?.length ?? 0,
      qrCode: qrCode?.[date]?.length ?? 0,
      sms: sms?.[date]?.length ?? 0,
    }));
    return data;
  }, [topups, bins, packets, brandnames]);
  return (
    <Col xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Dịch vụ</Card.Title>
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              aria-label="anchor"
              className="btn btn-outline-light btn-icons btn-sm text-muted no-caret"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fe fe-more-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu role="menu">
              <Dropdown.Item
                active={dropdownOption === "today"}
                onClick={() => handleDropdownMenu("today")}
              >
                Hôm nay
              </Dropdown.Item>
              <Dropdown.Item
                active={dropdownOption === "week"}
                onClick={() => handleDropdownMenu("week")}
              >
                Tuần này
              </Dropdown.Item>
              <Dropdown.Item
                active={dropdownOption === "lastWeek"}
                onClick={() => handleDropdownMenu("lastWeek")}
              >
                Tuần trước
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body>
          <div id="projectstatistics">
            <Basicline
              series={[
                {
                  name: "QrCode",
                  data: mapService.map((item) => item.qrCode),
                },
                {
                  name: "SMS",
                  data: mapService.map((item) => item.sms),
                },
                {
                  name: "Brandname",
                  data: mapService.map((item) => item.brandname),
                },
                {
                  name: "Topup",
                  data: mapService.map((item) => item.topup),
                },
              ]}
              categories={listDays}
              colors={["#fffc35", "#fba01e", "#4682ff", "#e6bfff"]}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ServiceReport;
