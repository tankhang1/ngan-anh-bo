import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, InputGroup } from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { useGetListGroupObjectiveQuery } from "../../../redux/api/manage/manage.api";
import { useGetReportProgramChanceTodayQuery } from "../../../redux/api/report/report.api";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useCheckTokenExpiredMutation } from "../../../redux/api/other/other.api";

function ChanceToday() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state: RootState) => state.auth);
  const [checkToken] = useCheckTokenExpiredMutation();

  const { data: listProgramChances, isLoading: isLoadingProgramChance } =
    useGetReportProgramChanceTodayQuery(undefined, {
      refetchOnMountOrArgChange: false,
    });

  const [search, setSearch] = useState("");
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
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={12}>
        <Card className="custom-card">
          <AppTable
            title="Danh sách trúng thưởng nông dân"
            isHeader={false}
            headers={[
              {
                key: "program_name",
                label: "Tên chương trình",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.program_name}</span>
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
                key: "customer_name",
                label: "Tên khách hàng",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.customer_name}</span>
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
                    <span className="fw-semibold">{value.area ?? "-"}</span>
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
                    <span className="fw-semibold">{value.agent_name}</span>
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
            data={(listProgramChances || []) as any}
            filters={[]}
            isLoading={isLoadingProgramChance}
          />
        </Card>
      </Col>
    </Fragment>
  );
}

export default ChanceToday;
