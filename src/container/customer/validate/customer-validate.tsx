import React, {
  Fragment,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { TCustomerRes } from "../../../assets/types";
import AppId from "../../../components/common/app-id";
import { useNavigate } from "react-router-dom";
import {
  useGetCounterCustomerQuery,
  useGetListCustomerQuery,
  useGetListGroupObjectiveQuery,
} from "../../../redux/api/manage/manage.api";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MapCustomerType } from "../../../constants";
import { Checkbox } from "@mui/material";
import { useExportCustomerDataMutation } from "../../../redux/api/excel/excel.api";
import { downloadLink } from "../../../hooks";
import {
  IconDatabaseExport,
  IconEdit,
  IconExchange,
  IconLoader,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";

const AGENT_FILTERS = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "customer_name",
    label: "Tên khách hàng",
  },
  {
    key: "phone",
    label: "Số điện thoại",
  },
];

function CustomerValidation() {
  const { permission } = useSelector((state: RootState) => state.auth);
  const { data: groupObjectives } = useGetListGroupObjectiveQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const [isLoadingExportExcel, setIsLoadingExportExcel] = useState(false);
  const [exportExcel] = useExportCustomerDataMutation();

  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("phone");
  const [customerType, setCustomerType] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const handleExportExcel = async () => {
    if (customerType === "ALL") {
      groupObjectives
        ?.filter((objective) => objective.symbol !== "ANONYMOUS")
        .forEach(async (item) => {
          setIsLoadingExportExcel(true);
          await exportExcel({
            t: item.symbol,
            k: "",
          })
            .unwrap()
            .then((value) => {
              setTimeout(() => {
                window.open(value.data, "_blank");
                setIsLoadingExportExcel(false);
              }, 3000);
            });
        });
    } else {
      setIsLoadingExportExcel(true);
      await exportExcel({
        t: customerType,
        k: "",
      })
        .unwrap()
        .then((value) => {
          setTimeout(() => {
            window.open(value.data, "_blank");
            setIsLoadingExportExcel(false);
          }, 3000);
        });
    }
  };
  const onChangeCustomerType = (type: string) => {
    if (type !== customerType) {
      setSearch("");
      setCustomerType(type);
    }
  };
  const { data: counterCustomer } = useGetCounterCustomerQuery(
    {
      t: customerType,
      s: 1,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: customerType ? false : true,
    }
  );
  const { data: customers, isLoading: isLoadingCustomer } =
    useGetListCustomerQuery(
      {
        nu: page - 1,
        sz: 10,
        t: customerType,
        s: 1,
      },
      {
        refetchOnMountOrArgChange: true,
        skip: customerType ? false : true,
      }
    );

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
                      placeholder="Nhập số điện thoại"
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
                      <IconSearch size={16} />
                    </Button>
                  </InputGroup>

                  <Dropdown className="ms-2">
                    <Dropdown.Toggle
                      variant=""
                      aria-label="button"
                      className="btn btn-icon btn-info-light btn-wave no-caret p-0"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <IconExchange size={16} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu as="ul" className="dropdown-menu-start">
                      {[
                        { symbol: "ALL", name: "Tất cả" },
                        ...(groupObjectives?.filter(
                          (item) => item.symbol !== "ANONYMOUS"
                        ) ?? []),
                      ]?.map((item, index) => (
                        <Dropdown.Item
                          active={item.symbol === customerType}
                          key={index}
                          onClick={() => {
                            setSearch("");
                            onChangeCustomerType(item.symbol);
                          }}
                        >
                          {item.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  {permission.createValidateCustomer ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip className="tooltip">Thêm mới</Tooltip>}
                    >
                      <Button
                        variant=""
                        aria-label="button"
                        type="button"
                        className="btn btn-icon p-0 btn-secondary-light ms-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Add Contact"
                        onClick={() => navigate(`ce/${true}/-1`)}
                      >
                        <IconPlus size={16} />
                      </Button>
                    </OverlayTrigger>
                  ) : null}
                  {permission.exportValidateCustomer ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip className="tooltip">Xuất file</Tooltip>}
                    >
                      <Button
                        variant=""
                        aria-label="button"
                        type="button"
                        className={`btn btn-icon btn-success-light ms-2 p-0 ${
                          isLoadingExportExcel && "btn-loader"
                        }`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Add Contact"
                        onClick={handleExportExcel}
                      >
                        {isLoadingExportExcel ? (
                          <span className="loading">
                            <IconLoader size={19} />
                          </span>
                        ) : (
                          <IconDatabaseExport size={16} />
                        )}
                      </Button>
                    </OverlayTrigger>
                  ) : null}
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
            isLoading={isLoadingCustomer}
            setExternalPage={setPage}
            maxPage={counterCustomer}
            isChange={customerType}
            headers={[
              {
                key: "id",
                label: "ID",
                render: (value: TCustomerRes) => (
                  <td>
                    <AppId id={value.id ?? ""} />
                  </td>
                ),
              },
              {
                key: "customer_code",
                label: "Mã khách hàng",
                render: (value: TCustomerRes) => <td>{value.customer_code}</td>,
              },

              {
                key: "name",
                label: "Họ và tên khách hàng",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.customer_name}</span>
                  </td>
                ),
              },
              {
                key: "sign_board",
                label: "Tên cửa hàng",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.sign_board}</span>
                  </td>
                ),
              },
              {
                key: "customer_province_name",
                label: "Tỉnh thành",
                render: (value) => <td>{value.customer_province_name}</td>,
              },
              {
                key: "phone",
                label: "Số điện thoại",
                render: (value) => <td>{value.phone}</td>,
              },
              {
                key: "customer_type",
                label: "Nhóm khách hàng",
                render: (value) => (
                  <td>
                    {value?.customer_type
                      ? MapCustomerType.get(value.customer_type)
                      : ""}
                  </td>
                ),
              },
              {
                key: "retailer_group_name",
                label: "Nhóm đại lý",
                render: (value) => <td>{value?.retailer_group_name ?? ""}</td>,
              },
              {
                key: "info_primary",
                label: "Tham gia tích điểm",
                render: (value) => (
                  <td>
                    <Checkbox checked={value.info_primary ? true : false} />
                  </td>
                ),
              },
              {
                key: "time_verify",
                label: "Thời gian xác thực",
                render: (value) => (
                  <td>
                    {value?.time_verify
                      ? format(
                          new Date(value.time_verify),
                          "dd/MM/yyyy hh:mm:ss"
                        )
                      : ""}
                  </td>
                ),
              },
              {
                key: "source_channel_used",
                label: "Nguồn đăng kí",
                render: (value) => <td>{value.source_channel_used}</td>,
              },
              {
                key: "status",
                label: "Trạng thái",
                render: (value) => (
                  <td>
                    {value.status === 1 ? (
                      <span className="bg-success bg-opacity-100 text-white badge ">
                        Đã xác thực
                      </span>
                    ) : (
                      <span className="bg-warning bg-opacity-100 text-white badge ">
                        Chờ xác thực
                      </span>
                    )}
                  </td>
                ),
              },
              {
                key: "",
                label: "Chức năng",
                render: (value) => (
                  <td className="d-flex justify-content-center align-item-center">
                    <button
                      className="btn btn-icon p-0 btn-sm btn-primary-ghost"
                      onClick={() =>
                        navigate(`ce/${false}/${value.customer_code}`)
                      }
                    >
                      <IconEdit size={14} />
                    </button>
                  </td>
                ),
              },
              {
                key: "time",
                label: "Thời gian đăng ký",
                render: (value) => <td>{value.time}</td>,
              },
              {
                key: "time_updated",
                label: "Thời gian cập nhật",
                render: (value) => (
                  <td>
                    {value.time_updated
                      ? format(value.time_updated, "dd/MM/yyyy HH:mm:ss")
                      : ""}
                  </td>
                ),
              },
            ]}
            data={customers || []}
            filters={[
              {
                key: "status",
                label: "Tất cả",
                value: "ALL",
              },
            ]}
            searchByExternal={searchBy}
          />
        </Card>
      </Col>
    </Fragment>
  );
}

export default CustomerValidation;
