import React, { useMemo, useState } from "react";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { Basicolumn } from "../../../charts/apexcharts/columnchart/columnchartdata";
import { useGetReportDashboardDayByDayQuery } from "../../../../redux/api/manage/manage.api";
import { endOfWeek, format, startOfWeek, subDays, subWeeks } from "date-fns";
import lodash from "lodash";
import { getDaysArray } from "./AgentReport";
import { fDate } from "../../../../hooks";
function FarmerReport() {
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

  const mapFarmer = useMemo(() => {
    const data =
      report7days?.map((date) => {
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
  }, [report7days]);

  return (
    <Col xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Nông dân</Card.Title>
        </Card.Header>
        <Card.Body>
          <div id="projectstatistics">
            <Basicolumn
              series={[
                {
                  name: "Nông dân đã xác thực",
                  data: mapFarmer.map((item) => item.farmer),
                },
                {
                  name: "Nông dân chờ xác thực",
                  data: mapFarmer.map((item) => item.farmer_none),
                },
              ]}
              categories={getDaysArray(subDays(new Date(), 7), new Date()).map(
                (item) => format(new Date(item), "yyyy-MM-dd")
              )}
              colors={["#76cff5", "#27c86b"]}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default FarmerReport;
