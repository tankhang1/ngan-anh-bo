import React, { Fragment } from "react";
import { Card, InputGroup, Row, Stack } from "react-bootstrap";
import { Dashed } from "../charts/apexcharts/linechart/linechartdata";
import DatePicker from "react-datepicker";
import { Doughnut } from "react-chartjs-2";
import * as Chartjscharts from "../charts/chartjschart/chartjsdata";
import { Basicolumn } from "../charts/apexcharts/columnchart/columnchartdata";

function ReportPage() {
  return (
    <Fragment>
      <Stack className="d-flex gap-1">
        {/*Đại lí */}
        <Card className="custom-card">
          <Card.Header>
            <Card.Title>Đại lý</Card.Title>
            <div className="d-flex align-items-center gap-2">
              <div className="form-group">
                <InputGroup className="">
                  <InputGroup.Text className="input-group-text text-muted">
                    <i className="ri-calendar-line"></i>
                  </InputGroup.Text>
                  <DatePicker
                    onChange={(date) => {
                      console.log(date);
                    }}
                    placeholderText="Chọn ngày bắt đầu (DD/MM/YYYY)"
                    isClearable
                  />
                </InputGroup>
              </div>
              <div className="form-group">
                <InputGroup className="">
                  <InputGroup.Text className="input-group-text text-muted">
                    <i className="ri-calendar-line"></i>
                  </InputGroup.Text>
                  <DatePicker
                    onChange={(date) => {
                      console.log(date);
                    }}
                    placeholderText="Chọn ngày kết thúc(DD/MM/YYYY)"
                    isClearable
                  />
                </InputGroup>
              </div>
              <button
                className="btn bg-outline-primary"
                style={{ paddingBlock: "0.4rem" }}
              >
                <div className="d-flex align-items-center gap-1">
                  <i className="ti ti-info-circle"></i>
                  Chi tiết
                </div>
              </button>
              <button
                className="btn btn-bd-primary"
                style={{ paddingBlock: "0.4rem" }}
              >
                <div className="d-flex align-items-center gap-1">
                  <i className="ti ti-database-export"></i>
                  Xuất Excel
                </div>
              </button>
            </div>
          </Card.Header>
          <Card.Body>
            <div id="dashed-chart">
              <Dashed
                categories={[
                  "Tháng 1",
                  "Tháng 2",
                  "Tháng 3",
                  "Tháng 4",
                  "Tháng 5",
                  "Tháng 6",
                ]}
                colors={["#fb0102", "#fdbe57"]}
                title="Số lượt đăng kí"
                series={[
                  {
                    name: "Đã xác thực",
                    data: [1, 32, 43, 123, 1233, 213],
                  },
                  {
                    name: "Chờ xác thực",
                    data: [44, 33, 22, 55, 66, 11],
                  },
                ]}
              />
            </div>
          </Card.Body>
        </Card>
        {/*Nông dân */}
        <Card className="custom-card">
          <Card.Header>
            <Card.Title>Nông dân</Card.Title>
            <div className="d-flex align-items-center gap-2">
              <div className="form-group">
                <InputGroup className="">
                  <InputGroup.Text className="input-group-text text-muted">
                    <i className="ri-calendar-line"></i>
                  </InputGroup.Text>
                  <DatePicker
                    onChange={(date) => {
                      console.log(date);
                    }}
                    placeholderText="Chọn ngày bắt đầu (DD/MM/YYYY)"
                    isClearable
                  />
                </InputGroup>
              </div>
              <div className="form-group">
                <InputGroup className="">
                  <InputGroup.Text className="input-group-text text-muted">
                    <i className="ri-calendar-line"></i>
                  </InputGroup.Text>
                  <DatePicker
                    onChange={(date) => {
                      console.log(date);
                    }}
                    placeholderText="Chọn ngày kết thúc(DD/MM/YYYY)"
                    isClearable
                  />
                </InputGroup>
              </div>
              <button
                className="btn bg-outline-primary"
                style={{ paddingBlock: "0.4rem" }}
              >
                <div className="d-flex align-items-center gap-1">
                  <i className="ti ti-info-circle"></i>
                  Chi tiết
                </div>
              </button>
              <button
                className="btn btn-bd-primary"
                style={{ paddingBlock: "0.4rem" }}
              >
                <div className="d-flex align-items-center gap-1">
                  <i className="ti ti-database-export"></i>
                  Xuất Excel
                </div>
              </button>
            </div>
          </Card.Header>
          <Card.Body>
            <div id="dashed-chart">
              <Dashed
                categories={[
                  "Tháng 1",
                  "Tháng 2",
                  "Tháng 3",
                  "Tháng 4",
                  "Tháng 5",
                  "Tháng 6",
                ]}
                colors={["#fb0102", "#fdbe57"]}
                title="Số lượt đăng kí"
                series={[
                  {
                    name: "Đã xác thực",
                    data: [1, 32, 43, 123, 1233, 213],
                  },
                  {
                    name: "Chờ xác thực",
                    data: [44, 33, 22, 55, 66, 11],
                  },
                ]}
              />
            </div>
          </Card.Body>
        </Card>
        {/*QR Code & SMS */}
        <Card className="custom-card">
          <Card.Header>
            <Card.Title>QrCode và SMS</Card.Title>
            <div className="d-flex align-items-center gap-2">
              <div className="form-group">
                <InputGroup className="">
                  <InputGroup.Text className="input-group-text text-muted">
                    <i className="ri-calendar-line"></i>
                  </InputGroup.Text>
                  <DatePicker
                    onChange={(date) => {
                      console.log(date);
                    }}
                    placeholderText="Chọn ngày bắt đầu (DD/MM/YYYY)"
                    isClearable
                  />
                </InputGroup>
              </div>
              <div className="form-group">
                <InputGroup className="">
                  <InputGroup.Text className="input-group-text text-muted">
                    <i className="ri-calendar-line"></i>
                  </InputGroup.Text>
                  <DatePicker
                    onChange={(date) => {
                      console.log(date);
                    }}
                    placeholderText="Chọn ngày kết thúc(DD/MM/YYYY)"
                    isClearable
                  />
                </InputGroup>
              </div>
              <button
                className="btn bg-outline-primary"
                style={{ paddingBlock: "0.4rem" }}
              >
                <div className="d-flex align-items-center gap-1">
                  <i className="ti ti-info-circle"></i>
                  Chi tiết
                </div>
              </button>
              <button
                className="btn btn-bd-primary"
                style={{ paddingBlock: "0.4rem" }}
              >
                <div className="d-flex align-items-center gap-1">
                  <i className="ti ti-database-export"></i>
                  Xuất Excel
                </div>
              </button>
            </div>
          </Card.Header>
          <Card.Body>
            <Doughnut
              options={Chartjscharts.Option4}
              data={Chartjscharts.Data4}
              height={"400px"}
            />
          </Card.Body>
        </Card>
        {/*Topup */}
        <Card className="custom-card">
          <Card.Header>
            <Card.Title>Chương trình điểm và topup</Card.Title>
            <div className="d-flex align-items-center gap-2">
              <div className="form-group">
                <InputGroup className="">
                  <InputGroup.Text className="input-group-text text-muted">
                    <i className="ri-calendar-line"></i>
                  </InputGroup.Text>
                  <DatePicker
                    onChange={(date) => {
                      console.log(date);
                    }}
                    placeholderText="Chọn ngày bắt đầu (DD/MM/YYYY)"
                    isClearable
                  />
                </InputGroup>
              </div>
              <div className="form-group">
                <InputGroup className="">
                  <InputGroup.Text className="input-group-text text-muted">
                    <i className="ri-calendar-line"></i>
                  </InputGroup.Text>
                  <DatePicker
                    onChange={(date) => {
                      console.log(date);
                    }}
                    placeholderText="Chọn ngày kết thúc(DD/MM/YYYY)"
                    isClearable
                  />
                </InputGroup>
              </div>
              <button
                className="btn bg-outline-primary"
                style={{ paddingBlock: "0.4rem" }}
              >
                <div className="d-flex align-items-center gap-1">
                  <i className="ti ti-info-circle"></i>
                  Chi tiết
                </div>
              </button>
              <button
                className="btn btn-bd-primary"
                style={{ paddingBlock: "0.4rem" }}
              >
                <div className="d-flex align-items-center gap-1">
                  <i className="ti ti-database-export"></i>
                  Xuất Excel
                </div>
              </button>
            </div>
          </Card.Header>
          <Card.Body>
            <Basicolumn
              series={[
                {
                  name: "Điểm",
                  data: [44, 55, 57, 90, 61, 58, 63, 60, 66],
                },
                {
                  name: "Topup",
                  data: [44, 55, 57, 90, 61, 58, 63, 60, 66],
                },
              ]}
              categories={[
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
              ]}
              colors={["#d12866", "#fe6601"]}
            />
          </Card.Body>
        </Card>
      </Stack>
    </Fragment>
  );
}

export default ReportPage;
