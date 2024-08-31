import React, { Fragment, lazy } from "react";
import { Stack } from "react-bootstrap";

import { PageLoading } from "../../../redux/middlewares/pageLoading";
const AgentReport = PageLoading(
  lazy(() => import("../components/AgentReport"))
);
const FarmerReport = PageLoading(
  lazy(() => import("../components/FarmerReport"))
);

const CustomerReport = () => {
  return (
    <Fragment>
      <Stack className="d-flex gap-1">
        <AgentReport />
        <FarmerReport />
      </Stack>
    </Fragment>
  );
};

export default CustomerReport;
