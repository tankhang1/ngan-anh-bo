
import React, { FC, Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Basicolumn, Columnwithlabels, Distributed, Loaded, Markers, Negativecolumn, Rangecolumn, Rotated, Stacked100column, Stackedcolumn } from "../columnchart/columnchartdata";

interface ColumnchartProps { }

const Columnchart: FC<ColumnchartProps> = () => {
	return (
		<Fragment>
			<Row>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>Basic Column Chart</Card.Title>
						</Card.Header>
						<Card.Body>
							<div id="column-basic">
								<Basicolumn />
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>Column Chart With Datalabels</Card.Title>
						</Card.Header>
						<Card.Body>
							<div id="column-datalabels">
								<Columnwithlabels />
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>Stacked Column Chart</Card.Title>
						</Card.Header>
						<Card.Body>
							<div id="column-stacked">
								<Stackedcolumn />
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>100% Stacked Column Chart</Card.Title>
						</Card.Header>
						<Card.Body>
							<div id="column-stacked-full">
								<Stacked100column />
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>Column Chart With Markers</Card.Title>
						</Card.Header>
						<Card.Body>
							<div id="column-markers">
								<Markers />
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>Column Chart With Rotated Labels</Card.Title>
						</Card.Header>
						<Card.Body>
							<div id="column-rotated-labels">
								<Rotated />
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>Column Chart With Negative Values</Card.Title>
						</Card.Header>
						<Card.Body>
							<div id="column-negative">
								<Negativecolumn />
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>Range Column Chart</Card.Title>
						</Card.Header>
						<Card.Body>
							<div id="column-range">
								<Rangecolumn />
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>Dynamic Loaded Chart</Card.Title>
						</Card.Header>
						<Card.Body>
							{/* <div id="chart-year"></div>
                                <div id="chart-quarter"></div> */}
							<Loaded />
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>Distributed Columns Chart</Card.Title>
						</Card.Header>
						<Card.Body>
							<div id="columns-distributed">
								<Distributed />
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

		</Fragment>
	);
};

export default Columnchart;
