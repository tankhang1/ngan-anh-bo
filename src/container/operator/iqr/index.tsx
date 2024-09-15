import React, { Fragment, useState } from "react";
import { Button, Card, Col, Dropdown, Form, InputGroup } from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { TCustomerRes, TProductDashboardTable } from "../../../assets/types";
import AppId from "../../../components/common/app-id";
import {
  useGetBinsQuery,
  useGetListGroupObjectiveQuery,
  useGetPacketsQuery,
} from "../../../redux/api/manage/manage.api";
import { format } from "date-fns";

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

function IQRToday() {
  const { data: groupObjectives } = useGetListGroupObjectiveQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(AGENT_FILTERS[0].key);
  const [customerType, setCustomerType] = useState<string>(
    groupObjectives?.[0].symbol || ""
  );
  const [page, setPage] = useState(1);

  const onChangeCustomerType = (type: string) => {
    if (type !== customerType) {
      setSearch("");
      setCustomerType(type);
    }
  };
  const { data: bins, isLoading: isLoadingBin } = useGetBinsQuery(
    {
      //   st: +(format(new Date(), "yyyyMMdd") + "0000"),
      //   ed: +(format(new Date(), "yyyyMMdd") + "2399"),
      st: 202402260000,
      ed: 202409260000,
      nu: 0,
      sz: 9999,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: packets, isLoading: isLoadingPacket } = useGetPacketsQuery(
    {
      //   st: +(format(new Date(), "yyyyMMdd") + "0000"),
      //   ed: +(format(new Date(), "yyyyMMdd") + "2399"),
      st: 202402260000,
      ed: 202409260000,
      nu: 0,
      sz: 9999,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
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
                      {AGENT_FILTERS.map((item, index) => (
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
            isLoading={isLoadingBin || isLoadingPacket}
            headers={[
              {
                key: "id",
                label: "ID",
                render: (value: TProductDashboardTable) => (
                  <td>
                    <AppId id={value.id} />
                  </td>
                ),
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
                    <span className="fw-semibold">
                      {value.customer_code
                        ? value.customer_name
                        : value.register_name}
                    </span>
                  </td>
                ),
              },
              {
                key: "register_province",
                label: "Tỉnh thành",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">
                      {value.customer_code
                        ? value.customer_province_name
                        : value.register_province}
                    </span>
                  </td>
                ),
              },
              {
                key: "bin_seri",
                label: "Số seri thùng",
                render: (value) => <td>{value.bin_seri}</td>,
              },
              {
                key: "product_code",
                label: "Mã sản phẩm",
                render: (value) => <td>{value.product_code}</td>,
              },
              {
                key: "time_use",
                label: "Ngày sử dụng",
                render: (value) => <td>{value.time_use}</td>,
              },
            ]}
            data={[
              ...(bins?.qrCode ?? []),
              ...(packets?.qrCode ?? []),
              ...(packets?.zalo ?? []),
              ...(bins?.zalo ?? []),
            ]}
          />
        </Card>
      </Col>
    </Fragment>
  );
}

export default IQRToday;
