import React, { FC, Fragment, lazy } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { PageLoading } from "../../../redux/middlewares/pageLoading";
import { MixedChart } from "../../charts/mixedchart/MixedChart";

//IMAGES

const OutstandingReport = PageLoading(
  lazy(() => import("./components/OutstandingReport"))
);
const AgentReport = PageLoading(lazy(() => import("./components/AgentReport")));
const FarmerReport = PageLoading(
  lazy(() => import("./components/FarmerReport"))
);
const ServiceReport = PageLoading(
  lazy(() => import("./components/ServiceReport"))
);
const ServiceReportDonut = PageLoading(
  lazy(() => import("./components/ServiceReportDonut"))
);
const ProductTable = PageLoading(
  lazy(() => import("./components/ProductTable"))
);
const TableAgent = PageLoading(lazy(() => import("./components/TableAgent")));
const TableFarmer = PageLoading(lazy(() => import("./components/TableFarmer")));
const TableTopup = PageLoading(lazy(() => import("./components/TableTopup")));
const TablePoint = PageLoading(lazy(() => import("./components/TablePoint")));
const TableBrandname = PageLoading(
  lazy(() => import("./components/TableBrandname"))
);

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
        <TableBrandname />
      </Col>
      <Col xl={12}>
        <TablePoint />
      </Col>
    </Fragment>
  );
};

export default Ecommerce;
