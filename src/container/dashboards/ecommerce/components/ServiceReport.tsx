import React, { useMemo, useState } from "react";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { Basicolumn } from "../../../charts/apexcharts/columnchart/columnchartdata";
import {
  useGetBinsQuery,
  useGetListAgentsQuery,
  useGetListBrandnamesQuery,
  useGetListFarmersQuery,
  useGetPacketsQuery,
  useGetReportDashboardDayByDayQuery,
  useGetTopupsQuery,
} from "../../../../redux/api/manage/manage.api";
import { endOfWeek, format, startOfWeek, subDays, subWeeks } from "date-fns";
import lodash from "lodash";
import { getDaysArray } from "./AgentReport";
import { Basicline } from "../../../charts/apexcharts/linechart/linechartdata";
import { fDate } from "../../../../hooks";
function ServiceReport() {
  const { data: report7days } = useGetReportDashboardDayByDayQuery(
    {
      st: +format(subDays(new Date(), 7), "yyyyMMdd"),
      ed: +format(new Date(), "yyyyMMdd"),
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );

  const mapService = useMemo(() => {
    const data =
      report7days?.map((date) => {
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
  }, [report7days]);
  return (
    <Col xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Dịch vụ</Card.Title>
        </Card.Header>
        <Card.Body>
          <div id="projectstatistics">
            <Basicline
              series={[
                {
                  name: "QrCode",
                  data: mapService.map((item) => item.qrcode),
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
              categories={getDaysArray(subDays(new Date(), 7), new Date()).map(
                (item) => format(new Date(item), "dd-MM-yyyy")
              )}
              colors={["#fffc35", "#fba01e", "#4682ff", "#e6bfff"]}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ServiceReport;
