import React, { FC, Fragment } from 'react';

//IMAGES
import media27 from "../../../../assets/images/media/media-27.jpg";
import media28 from "../../../../assets/images/media/media-28.jpg";
import media30 from "../../../../assets/images/media/media-30.jpg";
import faces4 from "../../../../assets/images/faces/4.jpg";

interface Timeline2Props { }

const Timeline2: FC<Timeline2Props> = () => {
	return (
		<Fragment>
			<div className="row justify-content-center">
				<div className="col-xxl-8 col-xl-9 col-lg-10 col-md-8 col-sm-10">
					<ul className="timeline-center list-unstyled mt-3 mt-lg-0">
						<li>
							<div className="timeline-center-time">
								<span className="time d-inline-block">Just Now</span>
							</div>
							<div className="timeline-center-icon">
								<a href="#"></a>
							</div>
							<div className="timeline-center-body">
								<div className="mt-sm-0 mt-2">
									<p className="mb-0 fs-14 fw-semibold">Emperio</p>
									<p className="mb-0 text-muted">Project assigned by the manager all<span className="badge bg-primary-transparent fw-semibold mx-1">files</span>and<span className="badge bg-primary-transparent fw-semibold mx-1">folders</span>were included</p>
									<div className="mt-3 d-sm-flex flex-wrap">
										<a href="#;" className="p-2 rounded-2 d-flex border m-1">
											<div className="attachment-icon me-2">
												<svg xmlns="http://www.w3.org/2000/svg" className="wd-25" baseProfile="tiny" viewBox="0 0 512 512"><path fill="#FFF" d="M422.3 477.9c0 7.6-6.2 13.8-13.8 13.8h-305c-7.6 0-13.8-6.2-13.8-13.8V34.1c0-7.6 6.2-13.8 13.8-13.8h230.1V109h88.7v368.9z"></path><path fill="#2B669F" d="M333.6 6H103.5C88 6 75.4 18.6 75.4 34.1v443.8c0 15.5 12.6 28.1 28.1 28.1h305c15.5 0 28.1-12.6 28.1-28.1V109.1L333.6 6zm88.7 471.9c0 7.6-6.2 13.8-13.8 13.8h-305c-7.6 0-13.8-6.2-13.8-13.8V34.1c0-7.6 6.2-13.8 13.8-13.8h230.1V109h88.7v368.9z"></path><path fill="#084272" d="M333.6 6v103.1h103z"></path><g><path fill="#084272" d="M465.9 450.8H46.1V308c0-9.8 7.9-17.7 17.7-17.7h384.3c9.8 0 17.7 7.9 17.7 17.7v142.8z"></path><path fill="#1A252D" d="M436.6 450.8v19.5l29.3-19.5zM75.4 450.8v19.5l-29.3-19.5z"></path><path fill="#2B669F" d="M64.1 308.4h383.7v124.5H64.1z"></path></g><g fill="#2B669F"><path d="M298.3 78.6h-177a6.7 6.7 0 010-13.4h177a6.7 6.7 0 010 13.4zM298.3 110.6h-177a6.7 6.7 0 010-13.4h177a6.7 6.7 0 010 13.4zM391.8 142.5H121.3a6.7 6.7 0 010-13.4h270.5a6.7 6.7 0 010 13.4zM391.8 174.5H121.3a6.7 6.7 0 010-13.4h270.5a6.7 6.7 0 010 13.4zM391.8 206.5H121.3a6.7 6.7 0 010-13.4h270.5a6.7 6.7 0 010 13.4zM391.8 238.4H121.3a6.7 6.7 0 010-13.4h270.5a6.7 6.7 0 010 13.4zM391.8 270.4H121.3a6.7 6.7 0 010-13.4h270.5a6.7 6.7 0 010 13.4z"></path></g><g fill="#FFF"><path d="M229.3 373.3c0 6.9-1.6 12.5-4.7 16.7-3.1 4.2-7.5 6.3-13.2 6.3-2.2 0-4.2-.4-5.9-1.3-1.7-.9-3.2-2.1-4.5-3.7v21.8h-14.4v-63.8h13.6l.4 5c1.3-1.9 2.8-3.3 4.6-4.3 1.8-1 3.8-1.5 6.1-1.5 5.7 0 10.1 2.2 13.3 6.6 3.1 4.4 4.7 10.2 4.7 17.4v.8zm-14.3-.9c0-3.9-.6-7-1.7-9.4-1.1-2.4-3-3.5-5.4-3.5-1.6 0-3 .3-4.1.9-1.1.6-2 1.5-2.7 2.6v19.2c.7 1 1.6 1.7 2.7 2.2 1.1.5 2.5.7 4.1.7 2.5 0 4.3-1 5.4-3.1 1.1-2.1 1.6-5 1.6-8.7v-.9zM239.8 372.4c0-7.2 1.6-13 4.7-17.4 3.1-4.4 7.6-6.6 13.3-6.6 2.1 0 4 .5 5.8 1.5 1.7 1 3.3 2.4 4.6 4.2V329h14.4v66.4H270l-1-5.6c-1.4 2.1-3 3.7-4.9 4.8-1.9 1.1-4 1.7-6.4 1.7-5.7 0-10.1-2.1-13.2-6.3-3.1-4.2-4.7-9.7-4.7-16.6v-1zm14.4.9c0 3.7.5 6.7 1.6 8.7 1.1 2.1 2.9 3.1 5.5 3.1 1.5 0 2.8-.3 4-.8 1.1-.6 2.1-1.4 2.8-2.4v-18.6c-.7-1.2-1.7-2.2-2.8-2.8-1.1-.7-2.4-1-3.9-1-2.6 0-4.4 1.2-5.5 3.5-1.1 2.4-1.7 5.5-1.7 9.4v.9zM300 395.4v-36.1h-6.6v-10h6.6v-4.8c0-5.3 1.6-9.3 4.8-12.2 3.2-2.9 7.7-4.3 13.5-4.3 1.1 0 2.2.1 3.3.2 1.1.2 2.4.4 3.8.7l-1.1 10.6c-.8-.1-1.5-.2-2.1-.3-.6-.1-1.3-.1-2.2-.1-1.8 0-3.2.5-4.2 1.4-1 .9-1.4 2.3-1.4 4v4.8h9.1v10h-9.1v36.1H300z"></path></g></svg>
											</div>
											<div className="lh-1">
												<p className="mb-1 attachment-name text-truncate">
													file_001_2.21-4.pdf
												</p>
												<p className="mb-0 fs-11 text-muted">
													0.85MB
												</p>
											</div>
										</a>
										<a href="#;" className="p-2 rounded-2 d-flex m-1 border">
											<div className="attachment-icon me-2">
												<svg xmlns="http://www.w3.org/2000/svg" className="wd-25" viewBox="0 0 512 512"><path fill="#FFF" d="M422.3 477.9c0 7.6-6.2 13.8-13.8 13.8h-305c-7.6 0-13.8-6.2-13.8-13.8V34.1c0-7.6 6.2-13.8 13.8-13.8h230.1V109h88.7v368.9z"></path><path fill="#24A885" d="M333.6 6H103.5C88 6 75.4 18.6 75.4 34.1v443.8c0 15.5 12.6 28.1 27.1 28.1h305c16.5 0 29.1-12.6 29.1-28.1V109.1L333.6 6zm88.7 471.9c0 7.6-6.2 13.8-13.8 13.8h-305c-7.6 0-13.8-6.2-13.8-13.8V34.1c0-7.6 6.2-13.8 13.8-13.8h230.1V109h88.7v368.9z"></path><path fill="#16876B" d="M333.6 6v103.1h103zM465.9 450.8H46.1V308c0-9.8 7.9-17.7 17.7-17.7h384.3c9.8 0 17.7 7.9 17.7 17.7v142.8z"></path><path fill="#59E0B9" d="M436.6 450.8v19.5l29.3-19.5zM75.4 450.8v19.5l-29.3-19.5z"></path><path fill="#2EBA98" d="M64.1 308.4h383.7v124.5H64.1z"></path><path fill="#16876B" d="M298.3 78.6h-177a6.7 6.7 0 0 1 0-13.4h177a6.7 6.7 0 0 1 0 13.4zM298.3 110.6h-177a6.7 6.7 0 0 1 0-13.4h177a6.7 6.7 0 0 1 0 13.4zM391.8 142.5H121.3a6.7 6.7 0 0 1 0-13.4h270.5a6.7 6.7 0 0 1 0 13.4zM391.8 174.5H121.3a6.7 6.7 0 0 1 0-13.4h270.5a6.7 6.7 0 0 1 0 13.4zM391.8 206.5H121.3a6.7 6.7 0 0 1 0-13.4h270.5a6.7 6.7 0 0 1 0 13.4zM391.8 238.4H121.3a6.7 6.7 0 0 1 0-13.4h270.5a6.7 6.7 0 0 1 0 13.4zM391.8 270.4H121.3a6.7 6.7 0 0 1 0-13.4h270.5a6.7 6.7 0 0 1 0 13.4z"></path><path fill="#FFF" d="M191.3 349.7v43.9c0 5.4-1.4 9.6-4.3 12.5-2.9 2.9-6.9 4.4-12.1 4.4-1.2 0-2.2-.1-3.2-.2s-2-.3-3.1-.5l.6-10.2c.8.2 1.4.3 2 .4s1.2.1 2.1.1c1.5 0 2.6-.5 3.4-1.6.8-1.1 1.2-2.7 1.2-4.8v-43.9h13.4zm-.2-10h-13.6v-9.1h13.6v9.1zM244.8 372.3c0 6.5-1.5 11.7-4.4 15.7-2.9 3.9-7.1 5.9-12.4 5.9-2.1 0-3.9-.4-5.5-1.2-1.6-.8-3-2-4.2-3.5v20.5h-13.5v-60h12.8l.4 4.7c1.2-1.8 2.6-3.1 4.3-4.1 1.7-1 3.6-1.4 5.7-1.4 5.4 0 9.5 2.1 12.5 6.2s4.4 9.6 4.4 16.3v.9zm-13.5-.8c0-3.7-.5-6.6-1.6-8.8-1.1-2.2-2.8-3.3-5.1-3.3-1.5 0-2.8.3-3.9.8-1.1.6-1.9 1.4-2.5 2.4v18.1c.6.9 1.5 1.6 2.5 2.1 1.1.5 2.4.7 3.9.7 2.4 0 4.1-1 5.1-2.9 1-2 1.5-4.7 1.5-8.2v-.9zM275.7 393.9c-6.6 0-11.7-2-15.4-6-3.7-4-5.6-9-5.6-15.1v-1.5c0-6.6 1.8-12 5.3-16.2 3.5-4.2 8.6-6.2 15.2-6.2 5.8 0 10.4 1.7 13.6 5.2 3.2 3.5 4.8 8.3 4.8 14.4v7.1h-24.8l-.1.2c.2 2.3 1.1 4.1 2.5 5.5 1.5 1.4 3.6 2.1 6.3 2.1 2.6 0 4.7-.2 6.5-.6 1.7-.4 3.7-1.1 5.9-2l3.2 8.3c-1.9 1.4-4.4 2.5-7.5 3.4-3.1 1-6.4 1.4-9.9 1.4zm-.5-34.5c-2.2 0-3.8.7-4.8 2.1-1 1.4-1.6 3.2-1.8 5.6l.1.2h11.7v-1c0-2.2-.4-3.9-1.2-5.1-.7-1.3-2.1-1.8-4-1.8zM303.3 371.5c0-6.8 1.5-12.2 4.4-16.3 3-4.1 7.1-6.2 12.5-6.2 2.3 0 4.3.5 6 1.6 1.7 1.1 3.2 2.6 4.5 4.6l.9-5.4h11.9v42.9c0 5.7-2 10.1-5.9 13.3-3.9 3.1-9.3 4.7-16.2 4.7-2.2 0-4.6-.3-7.1-.9-2.5-.6-4.8-1.4-7.1-2.5l2.3-10c1.9.9 3.8 1.5 5.6 1.9 1.8.4 3.8.6 6.1.6 2.9 0 5-.6 6.4-1.7 1.4-1.1 2.1-3 2.1-5.4v-3.4c-1.2 1.6-2.7 2.8-4.3 3.6-1.6.8-3.5 1.2-5.5 1.2-5.3 0-9.5-2-12.4-5.9-2.9-4-4.4-9.2-4.4-15.7v-1zm13.5.8c0 3.5.5 6.3 1.5 8.2 1 2 2.8 2.9 5.2 2.9 1.5 0 2.7-.2 3.8-.7 1.1-.5 1.9-1.1 2.6-2v-18.2c-.7-1-1.5-1.8-2.6-2.4-1-.5-2.3-.8-3.7-.8-2.4 0-4.1 1.1-5.2 3.3-1.1 2.2-1.6 5.2-1.6 8.8v.9z"></path></svg>
											</div>
											<div className="lh-1">
												<p className="mb-1 attachment-name text-truncate">
													file_003-3.22-1.Jpeg
												</p>
												<p className="mb-0 fs-11 text-muted">
													457KB
												</p>
											</div>
										</a>
									</div>
								</div>
							</div>
						</li>
						<li className="timeline-center-widget">
							<div className="timeline-center-time-right">
								<span className="time d-inline-block ms-1">Today</span>
							</div>
							<div className="timeline-center-icon-right">
								<a href="#;"></a>
							</div>
							<div className="timeline-center-body-right">
								<div className="d-flex align-items-top timeline-main-content mt-0">
									<div className="flex-fill">
										<div className="align-items-center">
											<div className="mt-sm-0 mt-2">
												<p className="mb-0 fs-14 fw-semibold">Dwayne Bero</p>
												<p className="mb-0 text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, repellendus rem rerum excepturi aperiam ipsam temporibus cumque,</p>
												<div className="text-center demo-gallery">
													<div className="mt-2">
														<div className="d-flex row row-sm gy-4">
															<span className="col-6 col-lg-4">
																<a href="#">
																	<img className="img-responsive br-5 w-100" src={media27} alt="Thumb-1" />
																</a>
															</span>
															<span className="col-6 col-lg-4">
																<a href="#">
																	<img className="img-responsive br-5 w-100" src={media28} alt="Thumb-1" />
																</a>
															</span>
															<span className="col-6 col-lg-4">
																<a href="#">
																	<img className="img-responsive br-5 w-100" src={media30} alt="Thumb-1" />
																</a>
															</span>
														</div>
													</div>
												</div>
											</div>
											<div className="ms-auto">
												<span className="float-end badge bg-light text-muted timeline-badge mt-2 rounded-1">
													06:00 AM
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div className="timeline-center-time">
								<span className="time d-inline-block">Yesterday</span>
							</div>
							<div className="timeline-center-icon">
								<a href="#;"></a>
							</div>
							<div className="timeline-center-body">
								<div className="d-flex align-items-top timeline-main-content mt-0">
									<div className="flex-fill">
										<div className="align-items-center">
											<div className="mt-sm-0 mt-2">
												<p className="mb-0 fs-14 fw-semibold">Alister Chuk</p>
												<p className="mb-0 text-muted">Temporary data will be <span className="badge bg-danger-transparent fw-semibold mx-1">deleted</span> once dedicated time complated Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
											</div>
											<div className="d-flex align-items-end">
												<button className="btn btn-light btn-sm   mt-2">
													50k &#128150;
												</button>
												<span className="ms-auto badge bg-light text-muted timeline-badge mt-2  rounded-1">
													08:10 AM
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li className="timeline-center-widget">
							<div className="timeline-center-time-right">
								<span className="time d-inline-block ms-1 text-nowrap">02-5-2023</span>
							</div>
							<div className="timeline-center-icon-right">
								<a href="#;"></a>
							</div>
							<div className="timeline-center-body-right">
								<div className="d-flex align-items-top timeline-main-content  mt-0">
									<div className="flex-fill">
										<div className="align-items-center">
											<div className="mt-sm-0 mt-2">
												<p className="mb-0 fs-14 fw-semibold">Zack Slayer</p>
												<p className="mb-0 text-muted">Social network accounts are at risk check your <span className="badge bg-success-transparent fw-semibold mx-1">login</span> details Lorem ipsum dolor sit amet consectetur adipisicing elit
													<a href="#;" className="text-primary ms-2 text-decoration-underline">Read more</a></p>
											</div>
											<div className="ms-auto">
												<span className="float-end badge bg-light text-muted timeline-badge mt-2  rounded-1">
													10:10 AM
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div className="timeline-center-time">
								<span className="time d-inline-block">02-5-2023</span>
							</div>
							<div className="timeline-center-icon">
								<a href="#;"></a>
							</div>
							<div className="timeline-center-body">
								<div className="d-flex align-items-top timeline-main-content  mt-0">
									<div className="avatar avatar-md online me-3 avatar-rounded mt-sm-0 mt-4 flex-none">
										<img alt="avatar" src={faces4} />
									</div>
									<div className="flex-fill">
										<div className="align-items-center">
											<div className="mt-sm-0 mt-2">
												<p className="mb-0 fs-14 fw-semibold">Melissa Blue</p>
												<p className="mb-0 text-muted">Approved date for sanction of loan is verified <i className="ri-checkbox-circle-line text-success ms-1 fs-16 align-middle"></i></p>
											</div>
											<div className="d-flex align-items-end flex-wrap">
												<button className="btn btn-light btn-sm   mt-2 me-2">
													73k &#128077;
												</button>
												<button className="btn btn-light btn-sm   mt-2">
													55 &#128525;
												</button>
												<span className="ms-auto badge bg-light text-muted timeline-badge mt-2  rounded-1">
													07:10 AM
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li className="timeline-center-widget">
							<div className="timeline-center-time-right">
								<span className="time d-inline-block ms-1 text-nowrap">02-5-2023</span>
							</div>
							<div className="timeline-center-icon-right">
								<a href="#;"></a>
							</div>
							<div className="timeline-center-body-right">
								<div className="d-flex align-items-top timeline-main-content mt-0">
									<div className="flex-fill">
										<div className="align-items-center">
											<div className="mt-sm-0 mt-2">
												<p className="mb-0 fs-14 fw-semibold">Monika Karen</p>
												<p className="mb-0 text-muted">Changed the password of gmail 4 hrs ago. <span className="badge bg-secondary">Update</span></p>
											</div>
											<div className="ms-auto">
												<span className="float-end badge bg-light text-muted timeline-badge mt-2  rounded-1">
													10:00 AM
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>

		</Fragment>
	);
};

export default Timeline2;
