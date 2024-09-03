import React, { useMemo } from "react";
import { Card, Col } from "react-bootstrap";
import { Basicolumn } from "../../../charts/apexcharts/columnchart/columnchartdata";
import { useGetReportDashboardDayByDayQuery } from "../../../../redux/api/manage/manage.api";
import { format, subDays } from "date-fns";
import { fDate } from "../../../../hooks";
export const getDaysArray = function (
  start: string | Date,
  end: string | Date
) {
  const arr = [];
  for (
    const dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};
function AgentReport() {
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

  const mapAgent = useMemo(() => {
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
          <Card.Title>Đại lý</Card.Title>
        </Card.Header>
        <Card.Body>
          <div id="projectstatistics">
            <Basicolumn
              series={[
                {
                  name: "Đã lý đã xác thực",
                  data: mapAgent.map((item) => item?.agent),
                },
                {
                  name: "Đại lý chờ xác thực",
                  data: mapAgent.map((item) => item.agent_none),
                },
              ]}
              categories={getDaysArray(subDays(new Date(), 7), new Date()).map(
                (item) => format(new Date(item), "dd-MM-yyyy")
              )}
              colors={["#fe6601", "#fcd1d1"]}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default AgentReport;
