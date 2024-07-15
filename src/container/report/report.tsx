import React, { Fragment } from "react";
import { Stack } from "react-bootstrap";
import AgentReport from "./components/AgentReport";
import FarmerReport from "./components/FarmerReport";
import SMS_QR_Report from "./components/SMS_QR_Report";
import ProgramReport from "./components/ProgramReport";

function ReportPage() {
  return (
    <Fragment>
      <Stack className="d-flex gap-1">
        {/*Đại lí */}
        <AgentReport />
        {/*Nông dân */}
        <FarmerReport />
        {/*QR Code & SMS */}
        <SMS_QR_Report />
        {/*Topup */}
        <ProgramReport />
      </Stack>
    </Fragment>
  );
}

export default ReportPage;
