import React, { Fragment, useContext, useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import {
  useGetReportProgramChanceFarmerReportQuery,
  useGetReportProgramChanceRetailerReportQuery,
} from "../../../redux/api/report/report.api";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useCheckTokenExpiredMutation } from "../../../redux/api/other/other.api";
import AppConfirm from "../../../components/AppConfirm";
import { format, subDays } from "date-fns";
import { useMediaQuery } from "@mui/material";
import {
  useExportProgramChanceFarmerMutation,
  useExportProgramChanceRetailerMutation,
} from "../../../redux/api/excel/excel.api";
import { ToastContext } from "../../../components/AppToast";

const startDate = +(format(subDays(new Date(), 7), "yyyyMMdd") + "0000");
const endDate = +(format(new Date(), "yyyyMMdd") + "2359");

function ChanceWeek() {
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { token, username } = useSelector((state: RootState) => state.auth);
  const [checkToken] = useCheckTokenExpiredMutation();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [exportRetailerExcel] = useExportProgramChanceRetailerMutation();
  const [exportFarmerExcel] = useExportProgramChanceFarmerMutation();

  const {
    data: listProgramFarmerChance,
    isLoading: isLoadingProgramFarmerChance,
  } = useGetReportProgramChanceFarmerReportQuery(
    {
      st: +startDate,
      ed: +endDate,
      nu: 0,
      sz: 10000,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );
  const {
    data: listProgramRetailerChance,
    isLoading: isLoadingProgramRetailerChance,
  } = useGetReportProgramChanceRetailerReportQuery(
    {
      st: +startDate,
      ed: +endDate,
      nu: 0,
      sz: 10000,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

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
  const handleExportFarmerExcel = async () => {
    await exportFarmerExcel({
      st: +startDate,
      ed: +endDate,
      u: username,
    })
      .unwrap()
      .then(() => {
        toast.showToast(
          "Xuất dữ liệu thành công, vui lòng kiểm tra mục danh sách yêu cầu"
        );
      });
  };
  const handleExportRetailerExcel = async () => {
    await exportRetailerExcel({
      st: +startDate,
      ed: +endDate,
      u: username,
    })
      .unwrap()
      .then(() => {
        toast.showToast(
          "Xuất dữ liệu thành công, vui lòng kiểm tra mục danh sách yêu cầu"
        );
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
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={12}>
        <Card className="custom-card">
          <AppTable
            title="Danh sách trúng thưởng nông dân"
            headerRightSection={
              <AppConfirm onAccept={handleExportFarmerExcel}>
                <Button
                  size="sm"
                  className={`btn btn-bd-primary ${
                    isSmallScreen ? "btn-icon" : ""
                  }`}
                >
                  {isSmallScreen ? (
                    <i className="ti ti-database-export "></i>
                  ) : (
                    <div className="d-flex align-items-center gap-1">
                      <i className="ti ti-database-export "></i>
                      Xuất Excel
                    </div>
                  )}
                </Button>
              </AppConfirm>
            }
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
                key: "code",
                label: "Mã iQr",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.code}</span>
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
            data={(listProgramFarmerChance || []) as any}
            filters={[]}
            isLoading={isLoadingProgramFarmerChance}
          />
        </Card>
        <Card className="custom-card">
          <AppTable
            title="Danh sách trúng thưởng đại lý"
            headerRightSection={
              <AppConfirm onAccept={handleExportRetailerExcel}>
                <Button
                  size="sm"
                  className={`btn btn-bd-primary ${
                    isSmallScreen ? "btn-icon" : ""
                  }`}
                >
                  {isSmallScreen ? (
                    <i className="ti ti-database-export "></i>
                  ) : (
                    <div className="d-flex align-items-center gap-1">
                      <i className="ti ti-database-export "></i>
                      Xuất Excel
                    </div>
                  )}
                </Button>
              </AppConfirm>
            }
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
                key: "code",
                label: "Mã iQr",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.code}</span>
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
            data={(listProgramRetailerChance || []) as any}
            filters={[]}
            isLoading={isLoadingProgramRetailerChance}
          />
        </Card>
      </Col>
    </Fragment>
  );
}

export default ChanceWeek;
