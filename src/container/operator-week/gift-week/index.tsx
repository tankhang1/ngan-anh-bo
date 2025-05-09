import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, InputGroup } from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { TProgramTopupDetail } from "../../../assets/types";

import {
  useGetReportProgramTopupDetailByTimeQuery,
  useGetReportProgramTopupDetailTodayQuery,
} from "../../../redux/api/report/report.api";
import { fNumber } from "../../../hooks";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useCheckTokenExpiredMutation } from "../../../redux/api/other/other.api";
import { format, subDays } from "date-fns";
const TOPUP_FILTERS = [
  {
    key: "phone",
    label: "Số điện thoại",
  },
  {
    key: "code",
    label: "Mã code",
  },
  {
    key: "product_name",
    label: "Tên sản phẩm",
  },
  {
    key: "program_name",
    label: "Tên chương trình",
  },
  {
    key: "customer_name",
    label: "Tên khách hàng",
  },
];
const startDate = +(format(subDays(new Date(), 7), "yyyyMMdd") + "0000");
const endDate = +(format(new Date(), "yyyyMMdd") + "2359");

function GiftWeek() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state: RootState) => state.auth);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(TOPUP_FILTERS[0].key);
  const { data: topups, isLoading: isLoadingTopup } =
    useGetReportProgramTopupDetailByTimeQuery(
      {
        nu: 0,
        sz: 10000,
        st: +startDate,
        ed: +endDate,
      },
      {
        skipPollingIfUnfocused: true,
        pollingInterval: 300000,
        refetchOnMountOrArgChange: true,
      }
    );
  const [checkToken] = useCheckTokenExpiredMutation();
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
                  <Dropdown className="ms-2">
                    <Dropdown.Toggle
                      variant=""
                      aria-label="button"
                      className="btn btn-icon btn-primary-light btn-wave no-caret"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti ti-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu as="ul" className="dropdown-menu-start">
                      {TOPUP_FILTERS.map((item, index) => (
                        <Dropdown.Item
                          active={item.key === searchBy}
                          key={index}
                          onClick={() => setSearchBy(item.key)}
                        >
                          {item.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
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
            title="Thông tin đại lý"
            isLoading={isLoadingTopup}
            maxPage={topups?.length}
            headers={[
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
                key: "price",
                label: "Số tiền",
                render: (value) => (
                  <td>{fNumber((value.price ?? 0) * 1000)}</td>
                ),
              },
              {
                key: "program_name",
                label: "Tên chương trình",
                render: (value: TProgramTopupDetail) => (
                  <td>
                    <span className="fw-semibold"> {value.program_name}</span>
                  </td>
                ),
              },
              // {
              //   key: "agent_name",
              //   label: "Tên đại lý",
              //   render: (value) => (
              //     <td>
              //       <span className="fw-semibold">{value.agent_name}</span>
              //     </td>
              //   ),
              // },
              {
                key: "customer_code",
                label: "Mã khách hàng",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.customer_code}</span>
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
                key: "phone",
                label: "Số điện thoại",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.phone}</span>
                  </td>
                ),
              },
              {
                key: "area",
                label: "Khu vực",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.area}</span>
                  </td>
                ),
              },
              {
                key: "province_name",
                label: "Tỉnh thành",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.province_name}</span>
                  </td>
                ),
              },

              {
                key: "time_topup",
                label: "Thời gian topup",
                render: (value) => <td>{value.time_topup}</td>,
              },
            ]}
            data={topups || []}
            filters={[]}
            searchByExternal={searchBy}
          />
        </Card>
      </Col>
    </Fragment>
  );
}

export default GiftWeek;
