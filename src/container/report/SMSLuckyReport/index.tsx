import React, { useContext, useState } from "react";
import { Badge, Card, InputGroup, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useMediaQuery } from "@mui/material";
import { format, isBefore, subDays } from "date-fns";
import { useGetListSMSLuckyDayByDayQuery } from "../../../redux/api/manage/manage.api";
import { getDaysArray } from "../../dashboards/ecommerce/components/AgentReport";
import AppTable from "../../../components/common/table/table";
import AppId from "../../../components/common/app-id";
import { TSMSLucky } from "../../../assets/types";
import { useExportSMSLuckyMutation } from "../../../redux/api/excel/excel.api";
import { ToastContext } from "../../../components/AppToast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import AppConfirm from "../../../components/AppConfirm";
function SMSLuckyReport() {
  const toast = useContext(ToastContext);
  const { username } = useSelector((state: RootState) => state.auth);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [rangDate, setRangeDate] = useState<{ st: number; ed: number }>({
    st: +format(subDays(new Date(), 10), "yyyyMMdd"),
    ed: +format(new Date(), "yyyyMMdd"),
  });
  const [newRangeDate, setNewRangeDate] = useState<{ st: Date; ed: Date }>({
    st: subDays(new Date(), 10),
    ed: new Date(),
  });

  const [exportExcel] = useExportSMSLuckyMutation();

  const { data: listSMS, isLoading: isLoadingSMS } =
    useGetListSMSLuckyDayByDayQuery(
      {
        st: +(rangDate.st + "0000"),
        ed: +(rangDate.ed + "2359"),
        nu: 0,
        sz: 9999,
      },
      {
        skipPollingIfUnfocused: true,
        pollingInterval: 300000,
        refetchOnMountOrArgChange: true,
      }
    );

  const handleExportExcel = async () => {
    await exportExcel({
      ...newRangeDate,
      st: +(format(newRangeDate.st, "yyyyMMdd") + "0000"),
      ed: +(format(newRangeDate.ed, "yyyyMMdd") + "2359"),
      u: username,
    })
      .unwrap()
      .then(() => {
        toast.showToast(
          "Xuất dữ liệu thành công, vui lòng kiểm tra mục danh sách yêu cầu"
        );
      });
  };

  return (
    <Stack>
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>May rủi SMS</Card.Title>
          <div className="d-flex   align-items-center gap-2">
            <div className="form-group">
              <InputGroup className="">
                <InputGroup.Text className="input-group-text text-muted">
                  <i className="ri-calendar-line"></i>
                </InputGroup.Text>
                <DatePicker
                  onChange={(date) => {
                    date !== null &&
                      isBefore(date, newRangeDate.ed) &&
                      setNewRangeDate({ ...newRangeDate, st: date });
                  }}
                  value={format(newRangeDate.st, "dd-MM-yyyy")}
                  placeholderText="Chọn ngày bắt đầu (DD/MM/YYYY)"
                  isClearable
                  maxDate={new Date()}
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
                    date !== null &&
                      isBefore(newRangeDate.st, date) &&
                      setNewRangeDate({ ...newRangeDate, ed: date });
                  }}
                  value={format(newRangeDate.ed, "dd-MM-yyyy")}
                  placeholderText="Chọn ngày kết thúc(DD/MM/YYYY)"
                  isClearable
                  maxDate={new Date()}
                />
              </InputGroup>
            </div>
            <button
              className="btn btn-icon bg-danger"
              onClick={() => {
                console.log("rang date", newRangeDate);
                setRangeDate({
                  st: +format(newRangeDate.st, "yyyyMMdd"),
                  ed: +format(newRangeDate.ed, "yyyyMMdd"),
                });
              }}
            >
              <i className="ti ti-filter" style={{ color: "white" }}></i>
            </button>
            <AppConfirm onAccept={handleExportExcel}>
              <button
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
              </button>
            </AppConfirm>
          </div>
        </Card.Header>
        <Card.Body>
          <AppTable
            title=""
            isLoading={isLoadingSMS}
            headers={[
              {
                key: "id",
                label: "ID",
                render: (value: TSMSLucky) => (
                  <td>
                    <AppId id={value.id ?? ""} />
                  </td>
                ),
              },
              {
                key: "code",
                label: "Mã iQR",
                render: (value: TSMSLucky) => <td>{value.code}</td>,
              },
              {
                key: "product_name",
                label: "Tên sản phẩm",
                render: (value: TSMSLucky) => (
                  <td>
                    <span className="fw-semibold">{value.product_name}</span>
                  </td>
                ),
              },
              {
                key: "customer_name",
                label: "Họ và tên khách hàng",
                render: (value: TSMSLucky) => (
                  <td>
                    <span className="fw-semibold">{value.customer_name}</span>
                  </td>
                ),
              },
              {
                key: "customer_code",
                label: "Trạng thái",
                render: (value: TSMSLucky) => (
                  <td>
                    {!!value.customer_code ? (
                      <Badge bg="success">Đã xác thực</Badge>
                    ) : (
                      <Badge bg="warning">Chờ xác thực</Badge>
                    )}
                  </td>
                ),
              },
              {
                key: "phone",
                label: "Số điện thoại",
                render: (value: TSMSLucky) => (
                  <td>
                    <span className="fw-semibold">{value.phone}</span>
                  </td>
                ),
              },
              {
                key: "price",
                label: "Giá trị",
                render: (value: TSMSLucky) => (
                  <td>
                    <span className="fw-semibold">{value.price}</span>
                  </td>
                ),
              },
              {
                key: "time",
                label: "Thời gian nhắn tin",
                render: (value: TSMSLucky) => (
                  <td>
                    <span className="fw-semibold">
                      {value.time
                        ? format(
                            new Date(
                              value.time.replace(
                                /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
                                "$1-$2-$3T$4:$5:$6"
                              )
                            ),
                            "dd/MM/yyyy HH:mm:ss"
                          )
                        : ""}
                    </span>
                  </td>
                ),
              },
            ]}
            data={listSMS || []}
          />
        </Card.Body>
      </Card>
    </Stack>
  );
}

export default SMSLuckyReport;
