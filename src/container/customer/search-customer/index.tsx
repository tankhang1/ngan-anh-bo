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
  useGetProgramPointDetailMutation,
  useGetProgramTopupDetailMutation,
} from "../../../redux/api/info/info.api";
import { fDate, fNumber } from "../../../hooks";
import {
  TCustomerRes,
  TProgramChanceReportRES,
  TProgramPointDetail,
  TProgramPointZaloDetail,
  TProgramTopupDetail,
  TProgramTopupZaloDetail,
} from "../../../assets/types";
import { format } from "date-fns";
import {
  useGetListProgramPointDetailQuery,
  useGetListProgramTopupDetailQuery,
} from "../../../redux/api/product/product.api";
import { useLocation, useNavigate } from "react-router-dom";
import { useCheckTokenExpiredMutation } from "../../../redux/api/other/other.api";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useGetListProgramChanceDetailQuery } from "../../../redux/api/program/program.api";

function SearchCustomer() {
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const deferSearchValue = useDeferredValue(searchValue);
  const [isPermitSearch, setIsPermitSearch] = useState(false);
  const [tabActive, setTabActive] = useState<
    "UnRegister" | "Register" | "Point" | "Topup" | "Chance"
  >("UnRegister");
  const [page, setPage] = useState(1);
  const [openDetail, setOpenDetail] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<TCustomerRes>();
  const [programPointDetail, setProgramPointDetail] = useState<
    TProgramPointZaloDetail[] | null
  >(null);
  const [programTopupDetail, setProgramTopupDetail] = useState<
    TProgramTopupZaloDetail[] | null
  >(null);
  const [programChanceDetail, setProgramChanceDetail] = useState<
    TProgramChanceReportRES[] | null
  >(null);
  const [checkToken] = useCheckTokenExpiredMutation();

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
      zl: customerInfo?.uuid!,
    },
    {
      skip: customerInfo?.uuid ? false : true,
    }
  );

  const { data: programTopup } = useGetListProgramTopupDetailQuery(
    {
      zl: customerInfo?.uuid!,
    },
    {
      skip: customerInfo?.uuid ? false : true,
    }
  );
  const { data: programChance } = useGetListProgramChanceDetailQuery(
    {
      zalo_user_id: customerInfo?.zalo_user_id!,
    },
    {
      skip: customerInfo?.zalo_user_id ? false : true,
    }
  );
  console.log("customer info", customerInfo);
  const [getProgramPointDetail, { isLoading: isLoadingProgramPoint }] =
    useGetProgramPointDetailMutation();
  const [getProgramTopupDetail, { isLoading: isLoadingProgramTopup }] =
    useGetProgramTopupDetailMutation();

  const openPointDetail = async (
    customer_uuid: string,
    program_uuid: string
  ) => {
    await getProgramPointDetail({
      pu: program_uuid,
      u: customer_uuid,
    })
      .unwrap()
      .then((values) => {
        setProgramPointDetail(values);
        setOpenDetail(false);
      })
      .catch(() => {});
  };
  const openTopupDetail = async (
    customer_uuid: string,
    program_uuid: string
  ) => {
    await getProgramTopupDetail({
      pu: program_uuid,
      u: customer_uuid,
    })
      .unwrap()
      .then((values) => {
        setProgramTopupDetail(values);
        setOpenDetail(false);
      })
      .catch(() => {});
  };

  const onCheckToken = async () => {
    await checkToken({
      token: token,
    })
      .unwrap()
      .then((value) => {
        console.log("value expired", value);
        if (!value) {
          return;
        }
        navigate("/", { replace: true });
      })
      .catch(() => {
        navigate("/", { replace: true });
      });
  };
  useEffect(() => {
    console.log("log");
    onCheckToken();
  }, [location.pathname]); // Runs when the route changes
  return (
    <Fragment>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body>
            <div className="contact-header">
              <div className="d-flex flex-column gap-2">
                <div className="h6 fw-semibold mb-0">
                  Nhập thông tin tra cứu
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
          <Modal.Title as="h5">
            {customerInfo?.customer_name ||
              customerInfo?.name ||
              "Thông tin khách hàng"}
          </Modal.Title>
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
                    Topup
                  </button>
                )}

                <button
                  className={`btn ${
                    tabActive === "Chance"
                      ? "bg-purple-gradient"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setTabActive("Chance")}
                >
                  May mắn trúng thưởng
                </button>
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
                      <p className="text-black text-md">
                        {customerInfo?.time
                          ? format(
                              new Date(customerInfo.time),
                              "dd/MM/yyyy HH:mm:ss"
                            )
                          : ""}
                      </p>
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
                          ? fDate(customerInfo.birthday, "dd/MM/yyyy hh:mm:ss")
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
                        Đối tượng:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.customer_type}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="text-black text-md" style={{ width: 200 }}>
                        Nhóm đại lý:
                      </p>
                      <p className="text-black text-md">
                        {customerInfo?.retailer_group_name}
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
                        {customerInfo?.time_verify
                          ? format(
                              new Date(customerInfo?.time_verify),
                              "dd/MM/yyyy HH:mm:ss"
                            )
                          : ""}
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
                      <AppTable
                        title="Danh sách điểm tích lũy"
                        maxPage={programPoint?.data?.length}
                        headers={[
                          {
                            key: "program_name",
                            label: "Tên chương trình",
                            render: (value: TProgramPointDetail) => (
                              <td>{value.program_name}</td>
                            ),
                          },
                          {
                            key: "",
                            label: "Chi tiết",
                            render: (value) => (
                              <td>
                                <button
                                  className="btn btn-icon btn-md btn-bd-primary"
                                  onClick={() =>
                                    openPointDetail(
                                      value.customer_uuid,
                                      value.program_uuid
                                    )
                                  }
                                >
                                  <i className="ti ti-eye"></i>
                                </button>
                              </td>
                            ),
                          },
                          {
                            key: "name",
                            label: "Họ và tên",
                            render: (value) => (
                              <td>
                                <span className="fw-semibold">
                                  {value.customer_name}
                                </span>
                              </td>
                            ),
                          },

                          {
                            key: "point",
                            label: "Số điểm",
                            render: (value) => <td>{value.point}</td>,
                          },

                          {
                            key: "time_update",
                            label: "Thời gian tích lũy điểm",
                            render: (value) => (
                              <td>
                                {value?.time_update
                                  ? format(
                                      value?.time_update,
                                      "dd/MM/yyyy HH:mm:ss"
                                    )
                                  : ""}
                              </td>
                            ),
                          },
                        ]}
                        data={programPoint?.data || []}
                      />
                    </div>
                  </div>
                )}
                {tabActive == "Chance" && (
                  <div className="d-flex flex-column gap-4 w-100">
                    <div
                      className="d-flex flex-wrap gap-4 pb-4 overflow-scroll"
                      style={{ maxHeight: 400 }}
                    >
                      <AppTable
                        title="May mắn trúng thưởng"
                        maxPage={programChance?.length}
                        headers={[
                          {
                            key: "program_name",
                            label: "Tên chương trình",
                            render: (value) => (
                              <td>
                                <span className="fw-semibold">
                                  {value.program_name}
                                </span>
                              </td>
                            ),
                          },
                          {
                            key: "code",
                            label: "Mã iQr",
                            render: (value) => (
                              <td>
                                <span className="fw-semibold">
                                  {value.code}
                                </span>
                              </td>
                            ),
                          },
                          {
                            key: "phone",
                            label: "Số điện thoại",
                            render: (value) => (
                              <td>
                                <span className="fw-semibold">
                                  {value.phone}
                                </span>
                              </td>
                            ),
                          },

                          {
                            key: "customer_name",
                            label: "Tên khách hàng",
                            render: (value) => (
                              <td>
                                <span className="fw-semibold">
                                  {value.customer_name}
                                </span>
                              </td>
                            ),
                          },
                          {
                            key: "province_name",
                            label: "Tỉnh thành",
                            render: (value) => (
                              <td>
                                <span className="fw-semibold">
                                  {value.province_name ?? "-"}
                                </span>
                              </td>
                            ),
                          },
                          {
                            key: "area",
                            label: "Khu vực",
                            render: (value) => (
                              <td>
                                <span className="fw-semibold">
                                  {value.area ?? "-"}
                                </span>
                              </td>
                            ),
                          },
                          {
                            key: "gift_name",
                            label: "Phần thưởng",
                            render: (value) => <td>{value.gift_name}</td>,
                          },
                          {
                            key: "agent_name",
                            label: "Tên đại lý",
                            render: (value) => (
                              <td>
                                <span className="fw-semibold">
                                  {value.agent_name}
                                </span>
                              </td>
                            ),
                          },
                          {
                            key: "product_code",
                            label: "Mã sản phẩm",
                            render: (value) => <td>{value.product_code}</td>,
                          },
                          {
                            key: "product_name",
                            label: "Tên sản phẩm",
                            render: (value) => <td>{value.product_name}</td>,
                          },
                          {
                            key: "time_lucky",
                            label: "Thời gian trúng thưởng",
                            render: (value) => <td>{value.time_lucky}</td>,
                          },
                        ]}
                        data={programChance || []}
                      />
                    </div>
                  </div>
                )}
                {tabActive === "Topup" && (
                  <div className="d-flex flex-column gap-4 w-100">
                    <div
                      className="d-flex flex-wrap gap-4 pb-4 overflow-scroll"
                      style={{ maxHeight: 400 }}
                    >
                      <AppTable
                        title="May mắn trúng thưởng"
                        maxPage={programTopup?.data?.length}
                        headers={[
                          {
                            key: "program_name",
                            label: "Tên chương trình",
                            render: (value: TProgramTopupDetail) => (
                              <td>{value.program_name}</td>
                            ),
                          },
                          {
                            key: "",
                            label: "Chi tiết",
                            render: (value) => (
                              <td>
                                <button
                                  className="btn btn-icon btn-md btn-bd-primary"
                                  onClick={() =>
                                    openTopupDetail(
                                      value.customer_uuid,
                                      value.program_uuid ?? ""
                                    )
                                  }
                                >
                                  <i className="ti ti-eye"></i>
                                </button>
                              </td>
                            ),
                          },
                          {
                            key: "price",
                            label: "Số tiền thưởng (vnđ)",
                            render: (value) => (
                              <td>
                                <span className="fw-semibold">
                                  {value?.price
                                    ? fNumber(value.price * 1000)
                                    : ""}
                                </span>
                              </td>
                            ),
                          },
                          {
                            key: "total",
                            label: "Số lần tham gia",
                            render: (value) => <td>{value.total}</td>,
                          },
                          {
                            key: "province_name",
                            label: "Tỉnh thành",
                            render: (value) => <td>{value.province_name}</td>,
                          },
                          {
                            key: "",
                            label: "Tổng số tiền (vnđ)",
                            render: (value) => (
                              <td>
                                {fNumber(value.total * value.price * 1000)}
                              </td>
                            ),
                          },
                        ]}
                        data={programTopup?.data || []}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={programTopupDetail !== null}
        onHide={() => {
          setProgramTopupDetail(null);
          setOpenDetail(true);
        }}
        backdrop
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {programTopupDetail && programTopupDetail.length > 0
              ? programTopupDetail[0].program_name
              : "Chi tiết chương trình topup"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex p-3">
            <AppTable
              title=""
              headers={[
                {
                  key: "code",
                  label: "Mã code",
                  render: (value: TProgramTopupDetail) => <td>{value.code}</td>,
                },
                {
                  key: "product_name",
                  label: "Tên sản phẩm",
                  render: (value) => <td>{value.product_name}</td>,
                },
                {
                  key: "price",
                  label: "Số tiền",
                  render: (value) => <td>{fNumber(value.price * 1000)}</td>,
                },
                {
                  key: "time_topup",
                  label: "Thời gian topup",
                  render: (value) => (
                    <td>
                      {value.time_topup
                        ? format(
                            new Date(value.time_topup),
                            "dd/MM/yyyy HH:mm:ss"
                          )
                        : ""}
                    </td>
                  ),
                },
                {
                  key: "agent_name",
                  label: "Tên đại lý",
                  render: (value) => (
                    <td>
                      <span className="fw-semibold">{value.agent_name}</span>
                    </td>
                  ),
                },

                {
                  key: "phone",
                  label: "Số điện thoại",
                  render: (value) => (
                    <td>
                      <span className="fw-semibold">{value.phone}</span>
                    </td>
                  ),
                },
              ]}
              data={(programTopupDetail || []) as any}
              filters={[]}
              isLoading={isLoadingProgramTopup}
            />
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={programPointDetail !== null}
        onHide={() => {
          setProgramPointDetail(null);
          setOpenDetail(true);
        }}
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="px-3 pt-3">
            {programPointDetail && programPointDetail.length > 0
              ? programPointDetail[0].program_name
              : "Chi tiết chương trình tích điểm"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppTable
            title=""
            headers={[
              {
                key: "program_name",
                label: "Tên chương trình",
                render: (value: TProgramPointDetail) => (
                  <td>
                    <span className="fw-semibold"> {value.program_name}</span>
                  </td>
                ),
              },
              {
                key: "agent_name",
                label: "Tên đại lý cấp 1",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.agent_name}</span>
                  </td>
                ),
              },
              {
                key: "phone",
                label: "Số điện thoại",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.phone}</span>
                  </td>
                ),
              },
              {
                key: "code",
                label: "Mã code",
                render: (value) => <td>{value.code}</td>,
              },
              {
                key: "product_name",
                label: "Tên sản phẩm",
                render: (value) => <td>{value.product_name}</td>,
              },
              {
                key: "point",
                label: "Số điểm",
                render: (value) => <td>{fNumber(value.point ?? 0)}</td>,
              },

              {
                key: "time_earn",
                label: "Thời gian tích điểm",
                render: (value) => (
                  <td>
                    {value.time_earn
                      ? format(new Date(value.time_earn), "dd/MM/yyyy HH:mm:ss")
                      : ""}
                  </td>
                ),
              },
            ]}
            data={(programPointDetail || []) as any}
            filters={[]}
            isLoading={isLoadingProgramPoint}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default SearchCustomer;
