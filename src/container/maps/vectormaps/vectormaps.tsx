
import React, { FC, Fragment, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { MapAnnotation, Shapeworldmap, USState, WorldMap } from "../vectormaps/vectormapdata";

interface VectormapsProps { }

const Vectormaps: FC<VectormapsProps> = () => {
	const [content, setContent] = useState("");
	return (
		<Fragment>
			<Row>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>Basic Vector Map</Card.Title>
						</Card.Header>
						<Card.Body  >
							<div id="vector-map">
								<WorldMap setTooltipContent={setContent} />
								{content}
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>Map With Markers</Card.Title>
						</Card.Header>
						<Card.Body  >
							<div id="marker-map">
								<Shapeworldmap />
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>Map With Image Markers</Card.Title>
						</Card.Header>
						<Card.Body  >
							<div id="marker-image-map">
								<MapAnnotation />
							</div>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={6}>
					<Card className="custom-card">
						<Card.Header>
							<Card.Title>Map With Lines</Card.Title>
						</Card.Header>
						<Card.Body  >
							<div id="lines-map">
								<USState />
							</div>
						</Card.Body>
					</Card>
				</Col>
				{/* <Col xl={6}>
                        <Card className="custom-card">
                            <Card.Header>
                                <Card.Title>US Vector Map</Card.Title>
                            </Card.Header>
                            <Card.Body  >
                                <div id="us-map"></div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card className="custom-card">
                            <Card.Header>
                                <Card.Title>Russia Vector Map</Card.Title>
                            </Card.Header>
                            <Card.Body  >
                                <div id="russia-map"></div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card className="custom-card">
                            <Card.Header>
                                <Card.Title>Spain Vector Map</Card.Title>
                            </Card.Header>
                            <Card.Body  >
                                <div id="spain-map"></div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card className="custom-card">
                            <Card.Header>
                                <Card.Title>Canada Vector Map</Card.Title>
                            </Card.Header>
                            <Card.Body  >
                                <div id="canada-map"></div>
                            </Card.Body>
                        </Card>
                    </Col> */}
			</Row>

		</Fragment>
	);
};

export default Vectormaps;
