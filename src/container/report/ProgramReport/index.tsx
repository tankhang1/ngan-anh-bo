import React, { Fragment } from "react";
import { Stack } from "react-bootstrap";
import Report from "../components/ProgramReport";
function ProgramReport() {
  return (
    <Fragment>
      <Stack className="d-flex gap-1">
        <Report />
      </Stack>
    </Fragment>
  );
}

export default ProgramReport;
