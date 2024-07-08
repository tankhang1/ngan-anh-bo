import React, { FC, Fragment, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
//filepond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);
import { Recentblogdata, Selectdata1, Selectdata2, Selectdata3 } from "../createblog/createblogdata";
import Select from 'react-select';
import ReactQuill from 'react-quill';
import { Link } from "react-router-dom";

interface CreateblogProps { }

const Createblog: FC<CreateblogProps> = () => {

  const [value1, setValue1] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const handleDateChange = (date: any) => {
    // Ensure date is defined before setting it
    if (date) {
      setStartDate(date);
    }
  };
  const [files, setFiles] = useState<any>([]);
  return (
    <Fragment>
      <Row>
        <Col xxl={9} xl={12} lg={12} md={12} sm={12}>
          <Card className="custom-card">
            <Card.Header>
              <Card.Title>New Blog</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="row gy-3">
                <Col xl={12}>
                  <label htmlFor="blog-title" className="form-label">Blog Title</label>
                  <Form.Control type="text" className="" id="blog-title" placeholder="Blog Title" />
                </Col>
                <Col xl={12}>
                  <label htmlFor="blog-category" className="form-label">Blog Category</label>
                  {/* <select className="form-control" data-trigger name="blog-category" id="blog-category">
                                          <option value="">Select Category</option>
                                          <option value="1" selected>Nature</option>
                                          <option value="2">Sports</option>
                                          <option value="3">Food</option>
                                          <option value="4">Travel</option>
                                          <option value="5">Fashion</option>
                                          <option value="6">Beauty</option>
                                      </select> */}
                  <Select name="colors" options={Selectdata1} className="basic-multi-select"
                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Select Category"
                  />
                </Col>
                <Col xl={6}>
                  <Form.Label htmlFor="blog-author" className="">Blog Author</Form.Label>
                  <Form.Control type="text" className="" id="blog-author" placeholder="Enter Name" />
                </Col>
                <Col xl={6}>
                  <Form.Label htmlFor="blog-author-email" className="form-label">Email</Form.Label>
                  <Form.Control type="text" className="" id="blog-author-email" placeholder="Enter Email" />
                </Col>
                <Col xl={6}>
                  <Form.Label htmlFor="publish-date" className="form-label">Publish Date</Form.Label>
                  {/* <Form.Control type="text" className="" id="publish-date" placeholder="Choose date"/> */}
                  <DatePicker placeholderText='Choose date'
                    selected={startDate}
                    onChange={handleDateChange} className='form-control' />
                </Col>
                <Col xl={6}>
                  <Form.Label htmlFor="publish-time" className="form-label">Publish Time</Form.Label>
                  {/* <Form.Control type="text" className="" id="publish-time" placeholder="Choose time"/> */}
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </Col>
                <Col xl={6}>
                  <Form.Label htmlFor="product-status-add" className="form-label">Published Status</Form.Label>
                  {/* <select className="form-control" data-trigger name="product-status-add" id="product-status-add">
                                          <option value="">Select</option>
                                          <option value="Published">Published</option>
                                          <option value="Scheduled">Hold</option>
                                      </select> */}
                  <Select name="colors" options={Selectdata2} className="basic-multi-select"
                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Select Category"
                  />
                </Col>
                <Col xl={6}>
                  <Form.Label htmlFor="blog-tags" className="form-label">Blog Tags</Form.Label>
                  {/* <select className="form-control" name="blog-tags" id="blog-tags" multiple>
                                          <option value="Top Blog" selected>Top Blog</option>
                                          <option value="Blogger">Blogger</option>
                                          <option value="Adventure">Adventure</option>
                                          <option value="Landscape" selected>Landscape</option>
                                      </select> */}
                  <Select isMulti name="colors" options={Selectdata3} className="basic-multi-select"
                    menuPlacement='auto' classNamePrefix="Select2" placeholder="Select Category" defaultValue={[Selectdata3[0], Selectdata3[3]]}
                  />
                </Col>
                <Col xl={12}>
                  <Form.Label className="form-label">Blog Content</Form.Label>
                  <div id="blog-content">
                    <ReactQuill theme="snow" value={value1} onChange={setValue1} />
                  </div>
                </Col>
                <div className="col-xl-12 blog-images-container">
                  <Form.Label htmlFor="blog-author-email" className="">Blog Images</Form.Label>
                  {/* <input type="file" className="blog-images" name="filepond"
                                       multiple data-allow-reorder="true" data-max-file-size="3MB" data-max-files="6"/> */}
                  <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    maxFiles={3}
                    server="/api"
                    name="files" /* sets the file input name, it's filepond by default */
                    labelIdle='Drag & Drop your file here or click '
                  />
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="btn-list text-end">
                <Button variant='' type="button" className="btn btn-light">Save As Draft</Button>
                <Button variant='' type="button" className="btn btn-primary">Post Blog</Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col xxl={3} xl={12} lg={12} md={12} sm={12} className="">
          <Card className="custom-card">
            <Card.Header>
              <Card.Title>
                Recent Blogs
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                {Recentblogdata.map((idx) => (
                  <ListGroup.Item key={Math.random()}>
                    <div className="d-flex flex-wrap align-items-center">
                      <span className="avatar avatar-xl me-3">
                        <img src={idx.src} className="img-fluid" alt="..." />
                      </span>
                      <div className="flex-fill">
                        <Link to="#" className="fs-14 fw-semibold mb-0">{idx.title}</Link>
                        <p className="mb-1 popular-blog-content text-truncate">
                          {idx.text}
                        </p>
                        <span className="text-muted fs-11">{idx.time}</span>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="text-center d-grid">
                  <Button variant='primary' type="button" className="">Load more</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Fragment>
  );
};

export default Createblog;
