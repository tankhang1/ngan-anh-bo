import React, { Fragment, useState } from "react";
import { useLogCustomerQuery } from "../../../redux/api/log/log.api";
import { GroupCode, TActionLog } from "../../../assets/types";
import { Button, Card, Col, Form, InputGroup } from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { format } from "date-fns";

const LogCustomerPage = () => {
  const [search, setSearch] = useState("");
  const { data: logCustomer } = useLogCustomerQuery(
    {
      group: GroupCode.CUSTOMERS,
    },
    {
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
                      placeholder="Nhập thông tin"
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
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Card className="custom-card">
        <AppTable
          isHeader={false}
          externalSearch={search}
          title=""
          headers={[
            {
              key: "user_name",
              label: "Tên tài khoản",
              render: (value: TActionLog) => <td>{value.username}</td>,
            },
            {
              key: "action_type",
              label: "Hành động",
              render: (value: TActionLog) => (
                <td>
                  {value.action_type === 0
                    ? "Thêm mới"
                    : value.action_type === 1
                    ? "Cập nhật"
                    : "Xóa"}
                </td>
              ),
            },
            {
              key: "action_time",
              label: "Thời gian",
              render: (value: TActionLog) => (
                <td>
                  {format(new Date(value.action_time), "dd/MM/yyyy HH:mm:ss")}
                </td>
              ),
            },
            {
              key: "action_detail",
              label: "Thay đổi",
              render: (value: TActionLog) => (
                <td className="text-wrap">{value.action_detail}</td>
              ),
            },
          ]}
          data={logCustomer || []}
        />
      </Card>
    </Fragment>
  );
};

export default LogCustomerPage;
