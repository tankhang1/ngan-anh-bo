import React, { Fragment, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
  Badge,
} from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import {
  useGetBinPackageTodayQuery,
  useGetListGroupObjectiveQuery,
} from "../../../redux/api/manage/manage.api";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const AGENT_FILTERS = [
  {
    key: "code",
    label: "Mã IQR",
  },
  {
    key: "register_phone",
    label: "Số điện thoại đăng ký",
  },
];

function IQRToday() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(AGENT_FILTERS[0].key);

  // const { data: bins, isLoading: isLoadingBin } = useGetBinsQuery(
  //   {
  //     st: +(format(new Date(), "yyyyMMdd") + "0000"),
  //     ed: +(format(new Date(), "yyyyMMdd") + "2399"),
  //     nu: 0,
  //     sz: 9999,
  //   },
  //   {
  //     skipPollingIfUnfocused: true,
  //     pollingInterval: 300000,
  //     refetchOnMountOrArgChange: true,
  //   }
  // );
  // const { data: packets, isLoading: isLoadingPacket } = useGetPacketsQuery(
  //   {
  //     st: +(format(new Date(), "yyyyMMdd") + "0000"),
  //     ed: +(format(new Date(), "yyyyMMdd") + "2399"),

  //     nu: 0,
  //     sz: 9999,
  //   },
  //   {
  //     skipPollingIfUnfocused: true,
  //     pollingInterval: 300000,
  //     refetchOnMountOrArgChange: true,
  //   }
  // );

  const { data: binPacket, isLoading: isLoadingBinPacket } =
    useGetBinPackageTodayQuery();

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
                      value={search}
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
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={12}>
        <Card className="custom-card">
          <AppTable
            isHeader={false}
            externalSearch={search}
            searchByExternal={searchBy}
            title="Thông tin đại lý "
            isLoading={isLoadingBinPacket}
            headers={[
              {
                key: "seri",
                label: "Số seri",
                render: (value) => <td>{value.seri}</td>,
              },
              {
                key: "bin_seri",
                label: "Số seri thùng",
                render: (value) => <td>{value.bin_seri ?? value.seri}</td>,
              },

              {
                key: "code",
                label: "Mã iQR",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.code}</span>
                  </td>
                ),
              },
              {
                key: "product_name",
                label: "Tên sản phẩm",
                render: (value) => <td>{value.product_name}</td>,
              },
              // {
              //   key: "point",
              //   label: "Số điểm",
              //   render: (value) => <td>{value.point}</td>,
              // },
              {
                key: "register_phone",
                label: "Số điện thoại đăng ký",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.register_phone}</span>
                  </td>
                ),
              },

              {
                key: "customer_name",
                label: "Tên khách hàng",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.customer_name}</span>
                  </td>
                ),
              },

              {
                key: "register_province",
                label: "Tỉnh xác thực",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">
                      {value.customer_province_name}
                    </span>
                  </td>
                ),
              },

              {
                key: "customer_code",
                label: "Trạng thái",
                render: (value) => (
                  <td>
                    {value.customer_code ? (
                      <Badge bg="success">Đã xác thực</Badge>
                    ) : (
                      <Badge bg="warning">Chờ xác thực </Badge>
                    )}
                  </td>
                ),
              },

              {
                key: "",
                label: "Chức năng",
                render: (value) => (
                  <td>
                    <button
                      className="btn btn-icon btn-sm btn-primary-ghost"
                      onClick={() =>
                        navigate(
                          `${
                            import.meta.env.BASE_URL
                          }operator/verify-customer/${value.customer_uuid}`
                        )
                      }
                    >
                      <i className="ti ti-eye"></i>
                    </button>
                  </td>
                ),
              },
              {
                key: "register_name",
                label: "Tên đăng ký",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.register_name}</span>
                  </td>
                ),
              },
              {
                key: "register_province",
                label: "Tỉnh đăng ký",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">
                      {value.register_province}
                    </span>
                  </td>
                ),
              },
              {
                key: "source_channel_used",
                label: "Nguồn tham gia",
                render: (value) => <td>{value.source_channel_used}</td>,
              },
              {
                key: "type_use",
                label: "Cách tham gia",
                render: (value) => (
                  <td>
                    {value.type_use === 0
                      ? "QR Code"
                      : value.type_use === 1
                      ? "SMS"
                      : "Zalo"}
                  </td>
                ),
              },
              {
                key: "time_use",
                label: "Ngày sử dụng",
                render: (value) => (
                  <td>
                    {value.time_use
                      ? format(new Date(value.time_use), "dd/MM/yyyy HH:mm:ss")
                      : ""}
                  </td>
                ),
              },
            ]}
            data={binPacket || []}
          />
        </Card>
      </Col>
    </Fragment>
  );
}

export default IQRToday;
