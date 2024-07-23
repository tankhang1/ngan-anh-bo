import React, { Fragment } from "react";
import { Stack } from "react-bootstrap";
import Report from "../components/AgentReport";
function AgentReport() {
  return (
    <Fragment>
      <Stack className="d-flex gap-1">
        <Report />
      </Stack>
    </Fragment>
  );
}

export default AgentReport;
