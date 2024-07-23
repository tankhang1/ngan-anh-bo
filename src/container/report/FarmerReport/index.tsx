import React, { Fragment } from "react";
import { Stack } from "react-bootstrap";
import Report from "../components/FarmerReport";
function FarmerReport() {
  return (
    <Fragment>
      <Stack className="d-flex gap-1">
        <Report />
      </Stack>
    </Fragment>
  );
}

export default FarmerReport;
