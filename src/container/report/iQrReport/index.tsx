import React, { Fragment } from "react";
import { Stack } from "react-bootstrap";
import Report from "../components/SMS_QR_Report";
function IQrReport() {
  return (
    <Fragment>
      <Stack className="d-flex gap-1">
        <Report />
      </Stack>
    </Fragment>
  );
}

export default IQrReport;
