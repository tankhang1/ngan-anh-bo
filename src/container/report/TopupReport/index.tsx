import React, { Fragment } from "react";
import { Stack } from "react-bootstrap";
import Report from "../components/TopupReport";
import BrandnameReport from "../components/BrandnameReport";
function TopupReport() {
  return (
    <Fragment>
      <Stack className="d-flex gap-1">
        <Report />
      </Stack>
    </Fragment>
  );
}

export default TopupReport;
