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
import { Salesdonut } from "../ecommercedata";
function ServiceReportDonut() {
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

  const mapService = useMemo(
    () => ({
      topup: topups?.length ?? 0,
      brandname: brandnames?.length ?? 0,
      qrCode: bins?.qrCode.length ?? 0 + (packets?.qrCode.length ?? 0) ?? 0,
      sms: bins?.sms.length ?? 0 + (packets?.sms.length ?? 0) ?? 0,
    }),

    [topups, bins, packets, brandnames]
  );
  console.log(brandnames?.length);
  return (
    <Col xl={12}>
      <Card className="custom-card" style={{ height: 415 }}>
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
            <Salesdonut
              series={[
                mapService.qrCode,
                mapService.sms,
                mapService.brandname,
                mapService.topup,
              ]}
              categories={["QrCode", "SMS", "Brandname", "Topup"]}
              colors={["#fffc35", "#fba01e", "#4682ff", "#e6bfff"]}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ServiceReportDonut;
