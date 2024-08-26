import React, { Fragment } from "react";
import { Stack } from "react-bootstrap";
import AgentReport from "../components/AgentReport";
import FarmerReport from "../components/FarmerReport";

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
