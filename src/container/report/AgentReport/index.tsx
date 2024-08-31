import React, { Fragment, lazy } from "react";
import { Stack } from "react-bootstrap";
import { PageLoading } from "../../../redux/middlewares/pageLoading";
const Report = PageLoading(lazy(() => import("../components/AgentReport")));
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
