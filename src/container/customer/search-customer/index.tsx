import React, { Fragment, useDeferredValue, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  Modal,
} from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import {
  useGetCustomerCounterQuery,
  useGetCustomerQuery,
} from "../../../redux/api/info/info.api";
import { fDate, fNumber } from "../../../hooks";
import { TCustomerRes } from "../../../assets/types";
import { useGetListProgramPointDetailQuery } from "../../../redux/api/program/program.api";
import { format } from "date-fns";

function SearchCustomer() {
  const [searchValue, setSearchValue] = useState("");
  const deferSearchValue = useDeferredValue(searchValue);
  const [isPermitSearch, setIsPermitSearch] = useState(false);
  const [tabActive, setTabActive] = useState<
    "UnRegister" | "Register" | "Point" | "Topup"
  >("UnRegister");
  const [page, setPage] = useState(1);
  const [openDetail, setOpenDetail] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<TCustomerRes>();
  const onSearch = () => {
    if (searchValue.length === 0) return;
  };

  const { data: customers, isLoading: loadingCustomer } = useGetCustomerQuery(
    {
      nu: page - 1,
      sz: 10,
      k: deferSearchValue,
    },
    { skip: deferSearchValue === "" }
  );
  const { data: customerCounter } = useGetCustomerCounterQuery(
    {
      nu: page - 1,
      sz: 10,
      k: deferSearchValue,
    },
    {
      skip: deferSearchValue === "",
    }
  );

  const { data: programPoint } = useGetListProgramPointDetailQuery(
    {
      zl: customerInfo?.zalo_device_id!,
    },
    {
      skip: customerInfo?.zalo_device_id ? false : true,
    }
  );

  const { data: programTopup } = useGetListProgramPointDetailQuery(
    {
      zl: customerInfo?.uuid!,
    },
    {
      skip: customerInfo?.uuid ? false : true,
    }
  );

  return (
    <Fragment>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body>
            <div className="contact-header">
              <div className="d-flex flex-column gap-2">
                <div className="h6 fw-semibold mb-0">
                  Nhập tên khách đăng ký / tên khách hàng xác thực / số điện
                  thoại
                </div>
                <InputGroup className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    className="bg-light"
                    placeholder="Nhập tên khách đăng ký / tên khách hàng xác thực / số điện thoại"
                    aria-describedby="search-contact-member"
                    onChange={(e) => {
                      setPage(1);
                      if (e.target.value === "") {
                        setIsPermitSearch(true);
                      }
                      setSearchValue(e.target.value);
                    }}
                    value={searchValue}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSearch();
                    }}
                  />
                  <Button
                    className="btn btn-danger rounded-2"
                    onClick={() => {
                      setIsPermitSearch(false);
                      setSearchValue("");
                    }}
                  >
                    <i className="ti ti-x"></i>
                  </Button>
                  <Button
                    variant=""
                    aria-label="button"
                    className="btn btn-primary rounded-2"
                    type="button"
                    onClick={onSearch}
                  >
                    <i className="ri-search-line"></i>
                  </Button>
                </InputGroup>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      {customers?.length !== 0 ? (
        <Col xl={12}>
          <Card className="custom-card">
            <AppTable
              isHeader={false}
              title="Thông tin khách hàng"
              isLoading={loadingCustomer}
              maxPage={customerCounter}
              setExternalPage={setPage}
              headers={[
                {
                  key: "name",
                  label: "Tên đăng ký",
                  render: ({ name }) => <td>{name}</td>,
                },
                {
                  key: "customer_name",
                  label: "Tên xác thực",
                  render: ({ customer_name }) => <td>{customer_name}</td>,
                },
                {
                  key: "phone",
                  label: "Số điện thoại",
                  render: ({ phone }) => <td>{phone}</td>,
                },
                {
                  key: "province_name",
                  label: "Tỉnh thành",
                  render: ({ province_name }) => <td>{province_name}</td>,
                },
                {
                  key: "customer_type",
                  label: "Loại khách hàng",
                  render: ({ customer_type }) => <td>{customer_type}</td>,
                },
                {
                  key: "source_channel_used",
                  label: "Nguồn tham gia",
                  render: ({ source_channel_used }) => (
                    <td>{source_channel_used}</td>
                  ),
                },
                {
                  key: "time",
                  label: "Thời gian đăng ký",
                  render: ({ time }) => <td>{time}</td>,
                },
                {
                  key: "",
                  label: "Chức năng",
                  render: (record) => (
                    <td>
                      <button
                        className="btn btn-icon btn-sm btn-primary-ghost"
                        onClick={() => {
                          setOpenDetail(true);
                          setCustomerInfo(record);
                        }}
                      >
                        <i className="ti ti-edit"></i>
                      </button>
                    </td>
                  ),
                },
              ]}
              data={customers || []}
              searchByExternal="name"
              externalSearch={""}
            />
          </Card>
        </Col>
      ) : (
        <p className="mx-auto text-black">Không có dữ liệu</p>
      )}
      <Modal
        show={openDetail}
        onHide={() => {
          setOpenDetail(false);
          setCustomerInfo(undefined);
        }}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5">Chi tiết khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-4">
            <Image
              src={
                customerInfo?.avatar ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
              }
              style={{
                width: "100%",
                height: 200,
                objectFit: "contain",
                borderRadius: 10,
              }}
            />
            <div>
              <div className="d-flex overflow-scroll gap-2">
                <button
                  className={`btn ${
                    tabActive === "UnRegister"
                      ? "bg-purple-gradient"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setTabActive("UnRegister")}
                >
                  Thông tin đăng ký
                </button>
                <button
                  className={`btn ${
                    tabActive === "Register"
                      ? "bg-purple-gradient"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setTabActive("Register")}
                >
                  Thông tin đã xác thực
                </button>
                {customerInfo?.info_primary === 1 && (
                  <button
                    className={`btn ${
                      tabActive === "Point"
                        ? "bg-purple-gradient"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setTabActive("Point")}
                  >
                    Tích lũy điểm
                  </button>
                )}
                {customerInfo?.info_primary === 1 && (
                  <button
                    className={`btn ${
                      tabActive === "Topup"
                        ? "bg-purple-gradient"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setTabActive("Topup")}
                  >
                    Quà tặng
                  </button>
                )}
              </div>
              <div className="d-flex flex-row justify-content-start px-2 ">
                {tabActive === "UnRegister" && (
                  <div className="d-flex flex-column gap-0 justify-content-start align-items-start">
                    <div className=" d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Tên:
                      </p>
                      <p className="text-black text-md">{customerInfo?.name}</p>
                    </div>
                    <div className=" d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Số điện thoại:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.phone}
                      </p>
                    </div>

                    <div className=" d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Tỉnh thành:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.province_name}
                      </p>
                    </div>
                    <div className=" d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Thời gian:
                      </p>
                      <p className="text-black text-md">{customerInfo?.time}</p>
                    </div>
                    <div className=" d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Nguồn tham gia:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.source_channel_used}
                      </p>
                    </div>
                  </div>
                )}

                {tabActive === "Register" && (
                  <div className="d-flex flex-column gap-0">
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Mã khách hàng:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.customer_code}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Mã xuất kho:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.export_code}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Họ và tên:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.customer_name}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Số điện thoại:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.phone}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Email:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.email}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Ngày sinh:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.birthday
                          ? fDate(customerInfo.birthday)
                          : ""}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Giới tính:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.gender === 1 ? "Nam" : "Nữ"}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Tỉnh thành:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.customer_province_name}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Quận huyện:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.customer_district_name}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Khu vực:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.customer_area}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Địa chỉ:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.customer_address}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Bảng hiệu:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.sign_board}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Phân loại:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.customer_type}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Nhóm cây trồng chính:
                      </p>
                      <p className="text-black text-md">{customerInfo?.tags}</p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Cho phép tham gia chương trình:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.info_primary === 1 ? (
                          <Badge bg="success">Cho phép</Badge>
                        ) : (
                          <Badge bg="danger">Không</Badge>
                        )}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Thời gian:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.time_verify}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Nhân viên phụ trách:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.sale_name}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Ghi chú:
                      </p>
                      <p className="text-black text-md">{customerInfo?.note}</p>
                    </div>
                  </div>
                )}

                {tabActive === "Point" && (
                  <div className="d-flex flex-column gap-4 w-100">
                    <div
                      className="d-flex flex-wrap gap-4 pb-4 overflow-y-scroll "
                      style={{ maxHeight: 400 }}
                    >
                      {programPoint?.map((point, index) => (
                        <div
                          key={index}
                          className="shadow px-3 rounded-2 py-3"
                          style={{ flex: "0 1 calc(50% - 1rem)" }} // Adjust width for two columns
                        >
                          <div className="d-flex">
                            <p
                              className="text-black text-sm"
                              style={{ width: 200 }}
                            >
                              Chương trình:
                            </p>
                            <p className="text-black text-sm">
                              {point?.program_name}
                            </p>
                          </div>
                          <div className="d-flex">
                            <p
                              className="text-black text-sm"
                              style={{ width: 200 }}
                            >
                              Điểm tích lũy:
                            </p>
                            <p className="text-black text-sm">{point?.point}</p>
                          </div>
                          <div className="d-flex">
                            <p
                              className="text-black text-sm"
                              style={{ width: 200 }}
                            >
                              Thời gian tích lũy điểm gần nhất:
                            </p>
                            <p className="text-black text-sm">
                              {point?.time_update
                                ? format(point?.time_update, "dd/MM/yyyy")
                                : ""}
                            </p>
                          </div>
                        </div>
                      ))}
                      {programPoint?.length === 0 && (
                        <p className="text-md text-center w-100">
                          Chưa có dữ liệu
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {tabActive === "Topup" && (
                  <div className="d-flex flex-column gap-4 w-100">
                    <div
                      className="d-flex flex-wrap gap-4 pb-4 overflow-scroll"
                      style={{ maxHeight: 400 }}
                    >
                      {programTopup?.map((topup, index) => (
                        <div
                          key={index}
                          className="shadow px-4 py-3 rounded-2"
                          style={{ flex: "0 1 calc(50% - 1rem)" }} // 50% width minus the gap for two columns
                        >
                          <div className="d-flex">
                            <p
                              className="text-black text-sm"
                              style={{ width: 150 }}
                            >
                              Tên khách hàng:
                            </p>
                            <p className="text-black text-sm">
                              {topup?.customer_name}
                            </p>
                          </div>
                          <div className="d-flex">
                            <p
                              className="text-black text-sm"
                              style={{ width: 150 }}
                            >
                              Số tiền:
                            </p>
                            <p className="text-black text-sm">
                              {topup?.price ? fNumber(topup.price) : ""}
                            </p>
                          </div>
                          <div className="d-flex">
                            <p
                              className="text-black text-sm"
                              style={{ width: 150 }}
                            >
                              Số lần tham gia:
                            </p>
                            <p className="text-black text-sm">{topup.total}</p>
                          </div>
                        </div>
                      ))}
                      {programTopup?.length === 0 && (
                        <p className="text-md text-center w-100">
                          Chưa có dữ liệu
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default SearchCustomer;
