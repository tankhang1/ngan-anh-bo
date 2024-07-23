import React, { FC, Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";

//IMAGES

import OutstandingReport from "./components/OutstandingReport";
import AgentReport from "./components/AgentReport";
import FarmerReport from "./components/FarmerReport";
import ServiceReport from "./components/ServiceReport";
import ServiceReportDonut from "./components/ServiceReportDonut";
import ProductTable from "./components/ProductTable";
import TableAgent from "./components/TableAgent";
import TableFarmer from "./components/TableFarmer";
import TableTopup from "./components/TableTopup";
import TablePoint from "./components/TablePoint";

interface EcommerceProps {}

const Ecommerce: FC<EcommerceProps> = () => {
  return (
    <Fragment>
      <Row>
        <Col xxl={12}>
          <Card className="custom-card">
            <Card.Body className="p-0">
              <OutstandingReport />
            </Card.Body>
          </Card>
        </Col>
        <Col xxl={6} xl={12}>
          <Row>
            <AgentReport />
            <ServiceReport />
          </Row>
        </Col>
        <Col xxl={6} xl={12}>
          <Row>
            <FarmerReport />
            <ServiceReportDonut />
          </Row>
        </Col>
      </Row>
      {/*Agent */}
      <Col xl={12}>
        <TableAgent />
      </Col>
      {/*Farmer */}
      <Col xl={12}>
        <TableFarmer />
      </Col>
      {/*SMS & QrCode*/}
      <ProductTable />
      {/* Topup */}
      <Col xl={12}>
        <TableTopup />
      </Col>
      <Col xl={12}>
        <TablePoint />
      </Col>
    </Fragment>
  );
};

export default Ecommerce;
