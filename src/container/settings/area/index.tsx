import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import lodash from "lodash";
import { Input, ListItem, useMediaQuery } from "@mui/material";
import { PROVINCES } from "../../../constants";
import Select from "react-select";
import { TArea } from "../../../assets/types";
import { useGetListProvinceQuery } from "../../../redux/api/media/media.api";

const DATA = [
  { id: 1, code: "AGG", name: "An Giang", area: "Nam Sông Hậu 2" },
  { id: 2, code: "BVT", name: "Bà Rịa-Vũng Tàu", area: "Đông Nam Bộ" },
  { id: 3, code: "BGG", name: "Bắc Giang", area: "Miền Bắc & Trung" },
  { id: 4, code: "BKN", name: "Bắc Kạn", area: "Miền Bắc & Trung" },
  { id: 5, code: "BLU", name: "Bạc Liêu", area: "Nam Sông Hậu 1" },
  { id: 6, code: "BNH", name: "Bắc Ninh", area: "Miền Bắc & Trung" },
  { id: 7, code: "BTE", name: "Bến Tre", area: "Bắc Sông Hậu" },
  { id: 8, code: "BDH", name: "Bình Định", area: "Miền Bắc & Trung" },
  { id: 9, code: "BDG", name: "Bình Dương", area: "Tây Nguyên" },
  { id: 10, code: "BPC", name: "Bình Phước", area: "Tây Nguyên" },
  { id: 11, code: "BTN", name: "Bình Thuận", area: "Đông Nam Bộ" },
  { id: 12, code: "CMU", name: "Cà Mau", area: "Nam Sông Hậu 1" },
  { id: 13, code: "CTO", name: "Cần Thơ", area: "Nam Sông Hậu 1" },
  { id: 14, code: "CBG", name: "Cao Bằng", area: "Miền Bắc & Trung" },
];

function SettingArea() {
  const { data: provinces } = useGetListProvinceQuery();
  const isLgScreen = useMediaQuery("(min-width:1200px)");
  const [data, setData] = useState<TArea[]>(provinces || []);
  const [search, setSearch] = useState("");
  const [newProvince, setNewProvince] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [newArea, setNewArea] = useState("");
  const [openWarning, setOpenWarning] = useState<{
    area: string;
    province: string;
  } | null>(null);
  const groupArea = useMemo(() => lodash.groupBy(data, "area"), [data]);
  const diffProvince = useMemo(() => {
    const ar1 = data
      .filter((item) => item.isAdded !== true)
      .map((item) => ({ label: item.name, value: item.code }));
    const diff = lodash.differenceBy(PROVINCES, ar1, "value");
    return diff;
  }, [data, PROVINCES]);
  const onChangeNewArea = ({
    code,
    name,
    area,
    id,
  }: {
    code: string;
    name: string;
    area: string;
    id: number;
  }) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { code, name, area, id };
      }
      return item;
    });
    setData([...newData]);
    setNewProvince(null);
    setNewArea("");
  };

  useEffect(() => {
    if (provinces) setData(provinces);
  }, [provinces]);
  return (
    <Fragment>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body>
            <div className="contact-header">
              <div className="d-sm-flex d-block align-items-center justify-content-between">
                <div className="h5 fw-semibold mb-0">Tìm kiếm thông tin</div>
                <div className="d-flex w-sm-100 mt-sm-0 mt-2 align-items-center">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      className="bg-light"
                      placeholder="Tìm kiếm thông tin"
                      aria-describedby="search-contact-member"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                      variant=""
                      aria-label="button"
                      className="btn btn-primary"
                      type="button"
                      id="search-contact-member"
                    >
                      <i className="ri-search-line"></i>
                    </Button>
                  </InputGroup>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip className="tooltip">Thêm mới vùng</Tooltip>
                    }
                  >
                    <Button
                      variant=""
                      aria-label="button"
                      type="button"
                      className="btn btn-icon btn-success-light ms-2"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add Contact"
                      onClick={() =>
                        setData([
                          ...data,
                          {
                            id: data.length + 1,
                            area: "",
                            code: "",
                            name: "",
                            isAdded: true,
                          },
                        ])
                      }
                    >
                      <i className="ri-add-line"></i>
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={12}>
        <Row>
          <Col xxl={10}>
            <div className={isLgScreen ? "navbar-nav-scroll" : ""}>
              {Object.keys(groupArea).map((item, index) => {
                if (item.toLowerCase().includes(search.toLowerCase()))
                  return (
                    <Card key={index} className="card custom-card">
                      <Card.Header className="card-header d-flex justify-content-between align-items-center text text-sm fw-smibold">
                        {item || (
                          <Form.Control
                            type="text"
                            className="d-flex bg-light"
                            placeholder="Nhập tên vùng"
                            aria-describedby="search-contact-member"
                            style={{ maxWidth: 200 }}
                            onChange={(e) => setNewArea(e.target.value)}
                          />
                        )}

                        <Row>
                          <Button
                            variant=""
                            aria-label="button"
                            type="button"
                            className="btn btn-icon btn-success-light ms-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Add Contact"
                            onClick={() => {
                              setData([
                                ...data,
                                {
                                  id: data.length + 1,
                                  area: item,
                                  code: "",
                                  name: "",
                                  isAdded: true,
                                },
                              ]);
                            }}
                          >
                            <i className="ti ti-plus"></i>
                          </Button>

                          <Button
                            variant=""
                            aria-label="button"
                            type="button"
                            className="btn btn-icon btn-danger-light ms-2"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Add Contact"
                            onClick={() => {
                              const newData = lodash.differenceBy(
                                data,
                                groupArea[item],
                                "code"
                              );
                              setData([...newData]);
                            }}
                          >
                            <i className="ti ti-x"></i>
                          </Button>
                        </Row>
                      </Card.Header>
                      <Card.Body
                        className="overflow-y-auto"
                        //style={{ maxHeight: 300 }}
                      >
                        <ListGroup as="ol" numbered>
                          {groupArea[item].map((groupItem) => {
                            if (groupItem?.isAdded === true) {
                              return (
                                <ListItem
                                  key={groupItem.code}
                                  className="d-flex align-items-center justify-content-between"
                                >
                                  <Form.Select
                                    defaultValue={diffProvince[0].value}
                                    onChange={(e) => {
                                      const [code, name] =
                                        e.target.value.split("-");
                                      setNewProvince({
                                        label: name,
                                        value: code,
                                      });
                                    }}
                                    style={{ maxWidth: "80%" }}
                                  >
                                    {diffProvince.map((province) => (
                                      <option
                                        value={`${province.value}-${province.label}`}
                                      >
                                        {province.label}
                                      </option>
                                    ))}
                                  </Form.Select>

                                  <Row>
                                    {/* <Button
                                      variant=""
                                      aria-label="button"
                                      type="button"
                                      className="btn btn-icon btn-info-light ms-2"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title="Add Contact"
                                      onClick={() => {
                                        if (newProvince) {
                                          onChangeNewArea({
                                            code: newProvince.value,
                                            name: newProvince.label,
                                            area: item || newArea,
                                            id: data.length,
                                          });
                                        }
                                      }}
                                    >
                                      <i className="ti ti-device-floppy"></i>
                                    </Button> */}
                                    {/* <Button
                                      variant=""
                                      aria-label="button"
                                      type="button"
                                      className="btn btn-icon btn-danger-light ms-2"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title="Add Contact"
                                      onClick={() => {
                                        const newData = data.filter(
                                          (item) => item.code !== groupItem.code
                                        );
                                        setData([...newData]);
                                      }}
                                    >
                                      <i className="ti ti-x"></i>
                                    </Button> */}
                                  </Row>
                                </ListItem>
                              );
                            }

                            return (
                              <ListItem
                                key={groupItem.code}
                                className="d-flex justify-content-between"
                              >
                                {groupItem.name}

                                <Button
                                  variant=""
                                  aria-label="button"
                                  type="button"
                                  className="btn btn-icon btn-danger-light ms-2"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-title="Add Contact"
                                  onClick={() => {
                                    setOpenWarning({
                                      area: item,
                                      province: groupItem.name,
                                    });
                                  }}
                                >
                                  <i className="ti ti-x"></i>
                                </Button>
                              </ListItem>
                            );
                          })}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  );
              })}
            </div>
          </Col>
          <Col xxl={2}>
            <Card className="card custom-card">
              <Card.Header className="card-header text text-sm fw-smibold">
                Danh sách tỉnh thành
              </Card.Header>
              <Card.Body className="navbar-nav-scroll">
                <ListGroup as="ol" numbered>
                  {PROVINCES.map((province) => (
                    <ListItem key={province.value}>
                      {province.label} ({province.value})
                    </ListItem>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
      <Modal
        show={openWarning !== null}
        onHide={() => setOpenWarning(null)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6">Cảnh báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có muốn xóa tỉnh {openWarning?.province} ở vùng{" "}
          {openWarning?.area}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenWarning(null)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => setOpenWarning(null)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default SettingArea;
