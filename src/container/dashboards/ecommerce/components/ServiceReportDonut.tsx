import React, { useMemo, useState } from "react";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { Basicolumn } from "../../../charts/apexcharts/columnchart/columnchartdata";
import {
  useGetBinsQuery,
  useGetListBrandnamesQuery,
  useGetPacketsQuery,
  useGetReportDashboardDayByDayQuery,
  useGetTopupsQuery,
} from "../../../../redux/api/manage/manage.api";
import { endOfWeek, format, startOfWeek, subDays, subWeeks } from "date-fns";
import { getDaysArray } from "./AgentReport";
import { Salesdonut } from "../ecommercedata";
function ServiceReportDonut() {
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
    let tmp = {
      topup: 0,
      brandname: 0,
      agent: 0,
      agent_none: 0,
      farmer: 0,
      farmer_none: 0,
      qrcode: 0,
      sms: 0,
    };
    report7days?.forEach((item) => {
      tmp = {
        topup: item.topup + tmp.topup,
        brandname: item.brandname + tmp.brandname,
        agent: item.agent + tmp.agent,
        agent_none: item.agent_none + tmp.agent_none,
        farmer: item.farmer + tmp.farmer,
        farmer_none: item.farmer_none + tmp.farmer_none,
        qrcode: item.qrcode + tmp.qrcode,
        sms: item.sms + tmp.sms,
      };
    });

    return tmp;
  }, [report7days]);

  return (
    <Col xl={12}>
      <Card className="custom-card" style={{ height: 415 }}>
        <Card.Header className="justify-content-between">
          <Card.Title>Dịch vụ</Card.Title>
        </Card.Header>
        <Card.Body>
          <div id="projectstatistics">
            <Salesdonut
              series={[
                mapService.qrcode,
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
