import React, { FC, Fragment } from 'react';
import {  Col, Row, ProgressBar } from "react-bootstrap";
import { CustomProgress2data, Multipleprogress } from "../progress/progressdata";
import Showcode from '../../../components/ui/showcode/showcode';
import { progress1, progress10, progress11, progress12, progress13, progress14, progress2, progress3, progress4, progress5, progress6, progress7, progress8, progress9 } from '../../../components/ui/data/uielementsdata/uielementsprism';

interface ProgressProps { }

const Progress: FC<ProgressProps> = () => {

	return (
		<Fragment>
			<Row>
				<Col xl={6}>
					<Showcode title="Basic Progress" code={progress1}>
						<ProgressBar now={0} className="progress mb-3" />
						<ProgressBar now={25} className="progress mb-3" />
						<ProgressBar now={50} className="progress mb-3" />
						<ProgressBar now={75} className="progress mb-3" />
						<ProgressBar now={100} className="progress mb-0" />
					</Showcode>
				</Col>
				<Col xl={6}>
					<Showcode title="Different Colored Progress" code={progress2}>
						<ProgressBar variant='secondary' now={20} className="progress mb-3" />
						<ProgressBar variant='warning' now={40} className="progress mb-3" />
						<ProgressBar variant='info' now={60} className="progress mb-3" />
						<ProgressBar variant='success' now={80} className="progress mb-3" />
						<ProgressBar variant='danger' now={100} className="progress mb-0" />
					</Showcode>
				</Col>
			</Row>
			<Row>
				<Col xl={6}>
					<Showcode title="Striped Progress" code={progress3}>
						<ProgressBar striped variant='primary' now={10} className="progress mb-3" />
						<ProgressBar striped variant='secondary' now={25} className="progress mb-3" />
						<ProgressBar striped variant='success' now={50} className="progress mb-3" />
						<ProgressBar striped variant='info' now={75} className="progress mb-3" />
						<ProgressBar striped variant='warning' now={100} className="progress mb-0" />
					</Showcode>
				</Col>
				<Col xl={6}>
					<Showcode title="Progress Height" code={progress4}>
						<ProgressBar variant='primary' now={10} className="progress progress-xs mb-3" />
						<ProgressBar variant='primary' now={25} className="progress progress-sm mb-3" />
						<ProgressBar variant='primary' now={50} className="progress  mb-3" />
						<ProgressBar variant='primary' now={75} className="progress progress-lg mb-3" />
						<ProgressBar variant='primary' now={100} className="progress progress-xl mb-0" />
					</Showcode>
				</Col>
			</Row>
			<Row>
				<Col xl={6}>
					<Showcode title="Animated Stripped Progress" code={progress5}>
						<ProgressBar variant='' className="progress mb-3" animated now={10} />
						<ProgressBar variant='secondary' className="progress mb-3" animated now={20} />
						<ProgressBar variant='success' className="progress mb-3" animated now={40} />
						<ProgressBar variant='info' className="progress mb-3" animated now={60} />
						<ProgressBar variant='warning' className="progress" animated now={80} />
					</Showcode>
				</Col>
				<Col xl={6}>
					<Showcode title="Gradient Progress" code={progress6}>
						<ProgressBar variant='primary-gradient' className="progress mb-3" animated now={10} />
						<ProgressBar variant='secondary-gradient' className="progress mb-3" animated now={20} />
						<ProgressBar variant='success-gradient' className="progress mb-3" animated now={40} />
						<ProgressBar variant='info-gradient' className="progress mb-3" animated now={60} />
						<ProgressBar variant='warning-gradient' className="progress" animated now={80} />
					</Showcode>
				</Col>
			</Row>
			<Row>
				<Col xl={6}>
					<Showcode title="Progress With Labels" code={progress7}>
						<ProgressBar variant='primary' now={10} label={`${10}%`} className="progress mb-3" />
						<ProgressBar variant='secondary' now={20} label={`${20}%`} className="progress mb-3" />
						<ProgressBar variant='success' now={40} label={`${40}%`} className="progress mb-3" />
						<ProgressBar variant='info' now={60} label={`${60}%`} className="progress mb-3" />
						<ProgressBar variant='warning' now={80} label={`${80}%`} className="progress mb-0" />
					</Showcode>
				</Col>
				<Col xl={6}>
					<Showcode title="Multiple bars With Sizes" code={progress8}>
						{Multipleprogress.map((idx) => (
							<ProgressBar className={`progress-stacked progress-${idx.size} ${idx.class4}`} key={Math.random()}>
								<ProgressBar variant={idx.class1} now={idx.now1} key={1} />
								<ProgressBar variant={idx.class2} now={idx.now2} key={2} />
								<ProgressBar variant={idx.class3} now={idx.now3} key={3} />
							</ProgressBar>
						))}
					</Showcode>
				</Col>
			</Row>
			<Row>
				<Col xl={6}>
					<Showcode title="Custom Animated Progress" code={progress9}>
						<ProgressBar variant='primary-gradient' className="progress mb-3 progress-animate" now={10} />
						<ProgressBar variant='secondary-gradient' className="progress mb-3 progress-animate" now={20} />
						<ProgressBar variant='success-gradient' className="progress mb-3 progress-animate" now={40} />
						<ProgressBar variant='info-gradient' className="progress mb-3 progress-animate" now={60} />
						<ProgressBar variant='warning-gradient' className="progress  progress-animate" now={80} />

					</Showcode>
				</Col>
				<Col xl={6}>
					<Showcode title="Custom Progress-1" code={progress10}>
						<div className="progress progress-sm progress-custom mb-5 progress-animate">
							<h6 className="progress-bar-title">Mobiles</h6>
							<ProgressBar variant="primary" className="w-100 custom-height1" now={50} />
						</div>
						<div className="progress progress-sm progress-custom mb-5 progress-animate">
							<h6 className="progress-bar-title bg-secondary">Watches</h6>
							<ProgressBar variant="secondary" className="w-100 custom-height1" now={60} />
						</div>
						<div className="progress progress-sm progress-custom progress-animate">
							<h6 className="progress-bar-title bg-success">Shirts</h6>
							<ProgressBar variant="success" className="w-100 custom-height1" now={70} />
						</div>
					</Showcode>
				</Col>
			</Row>
			<Row>
				<Col xl={6}>
					<Showcode title="Custom Progress-2" code={progress11}>
						{CustomProgress2data.map((idx) => (
							<div className={`progress progress-bar progress-sm ${idx.class3}`} key={Math.random()} >
								<div className={`progress-item-1 bg-${idx.class}`}></div>
								<div className={`progress-item-2 bg-${idx.class2}`}></div>
								<div className={`progress-item-3 bg-${idx.class1}`}></div>
								<ProgressBar variant={idx.class} now={idx.now} />
							</div>
						))}
					</Showcode>
				</Col>
				<Col xl={6}>
					<Showcode title="Custom Progress-3" code={progress12}>
						<div className="progress progress-lg mb-5 custom-progress-3 progress-animate" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
							<div className="progress-bar bg-primary" style={{width: "50%"}}>
								<div className="progress-bar-value">50%</div>
							</div>
						</div>
						<div className="progress progress-lg mb-5 custom-progress-3 progress-animate" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
							<div className="progress-bar bg-secondary" style={{width: "60%"}}>
								<div className="progress-bar-value secondary">60%</div>
							</div>
						</div>
						<div className="progress progress-lg custom-progress-3 progress-animate" role="progressbar" aria-valuenow={70} aria-valuemin={0} aria-valuemax={100}>
							<div className="progress-bar bg-success" style={{width: "70%"}}>
								<div className="progress-bar-value success">70%</div>
							</div>
						</div>
					</Showcode>
				</Col>
			</Row>
			<Row>
				<Col xl={6}>
					<Showcode title="Custom Progress-4" code={progress13}>
						<div className="progress progress-xl mb-3 progress-animate custom-progress-4" role="progressbar" aria-valuenow={10} aria-valuemin={0} aria-valuemax={100}>
							<div className="progress-bar bg-primary-gradient" style={{width: "10%"}}></div>
							<div className="progress-bar-label">10%</div>
						</div>
						<div className="progress progress-xl mb-3 progress-animate custom-progress-4 secondary" role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
							<div className="progress-bar bg-secondary-gradient" style={{width: "20%"}}></div>
							<div className="progress-bar-label">20%</div>
						</div>
						<div className="progress progress-xl mb-3 progress-animate custom-progress-4 success" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
							<div className="progress-bar bg-success-gradient" style={{width: "40%"}}></div>
							<div className="progress-bar-label">40%</div>
						</div>
						<div className="progress progress-xl mb-3 progress-animate custom-progress-4 info" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
							<div className="progress-bar bg-info-gradient" style={{width: "60%"}}></div>
							<div className="progress-bar-label">60%</div>
						</div>
						<div className="progress progress-xl mb-3 progress-animate custom-progress-4 warning" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}>
							<div className="progress-bar bg-warning-gradient" style={{width: "80%"}}></div>
							<div className="progress-bar-label">80%</div>
						</div>
						<div className="progress progress-xl progress-animate custom-progress-4 danger" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
							<div className="progress-bar bg-danger-gradient" style={{width: "100%"}}></div>
							<div className="progress-bar-label text-fixed-white">100%</div>
						</div>
					</Showcode>
				</Col>
				<Col xl={6}>
					<Showcode title="Custom Progress-5" code={progress14}>
						<h6 className="fw-semibold mb-2">Project Dependencies</h6>
						<ProgressBar className="progress-stacked progress-xl mb-5" >
							<ProgressBar variant="primary" now={25} label={`${25}%`} key={1} />
							<ProgressBar variant="secondary" now={35} label={`${35}%`} key={2} />
							<ProgressBar variant="danger" now={40} label={`${40}%`} key={3} />
						</ProgressBar>
						<Row className="justify-content-center">
							<Col xl={5}>
								<div className="border p-3">
									<p className="fs-12 fw-semibold mb-0 text-muted">Html<span className="float-end fs-10 fw-normal">25%</span></p>
									<ProgressBar className="progress progress-xs mb-4 progress-animate" variant="primary" now={25} />
									<p className="fs-12 fw-semibold mb-0 text-muted">Css<span className="float-end fs-10 fw-normal">35%</span></p>
									<ProgressBar className="progress progress-xs mb-4 progress-animate" variant="secondary" now={35} />
									<p className="fs-12 fw-semibold mb-0 text-muted">Js<span className="float-end fs-10 fw-normal">40%</span></p>
									<ProgressBar className="progress progress-xs progress-animate" variant="danger" now={40} />
								</div>
							</Col>
						</Row>
					</Showcode>
				</Col>
			</Row>

		</Fragment>
	);
};
export default Progress;
