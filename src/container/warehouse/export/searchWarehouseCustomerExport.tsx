import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup } from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { useGetCustomerStaffQuery } from "../../../redux/api/warehouse/warehouse.api";
import { useLocation, useNavigate } from "react-router-dom";
import { useCheckTokenExpiredMutation } from "../../../redux/api/other/other.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

function SearchWarehouseCustomerExport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [isPermitSearch, setIsPermitSearch] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);

  const [checkToken] = useCheckTokenExpiredMutation();

  const onSearch = () => {
    if (!searchValue) return;
    setIsPermitSearch(true);
  };

  const { data: listCustomerStaff, isLoading: isLoadingCustomerStaff } =
    useGetCustomerStaffQuery();
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

  useEffect(() => {
    setIsPermitSearch(false);
  }, [listCustomerStaff]);
  return (
    <Fragment>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body>
            <div className="contact-header">
              <div className="d-flex flex-column gap-2">
                <div className="h6 fw-semibold mb-0">
                  Nhập thông tin tìm kiếm
                </div>
                <InputGroup className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    className="bg-light"
                    placeholder="Vui nhập thông tin tìm kiếm"
                    aria-describedby="search-contact-member"
                    onChange={(e) => setSearchValue(e.target.value)}
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
      {listCustomerStaff?.length !== 0 ? (
        <Col xl={12}>
          <Card className="custom-card">
            <AppTable
              isHeader={false}
              title="Thông tin nhập kho"
              isLoading={isLoadingCustomerStaff}
              maxPage={listCustomerStaff?.length}
              headers={[
                {
                  key: "export_code",
                  label: "Mã xuất kho",
                  render: ({ export_code }) => <td>{export_code}</td>,
                },
                {
                  key: "code",
                  label: "Mã khách hàng / Nhân viên",
                  render: ({ code }) => <td>{code}</td>,
                },
                {
                  key: "name",
                  label: "Tên khách hàng / Nhân viên",
                  render: ({ name }) => <td>{name}</td>,
                },

                {
                  key: "sign_board",
                  label: "Tên doanh nghiệp",
                  render: ({ sign_board }) => <td>{sign_board}</td>,
                },
                {
                  key: "province",
                  label: "Tỉnh thành",
                  render: ({ province }) => <td>{province}</td>,
                },
                {
                  key: "type",
                  label: "Đối tượng",
                  render: ({ type }) => <td>{type}</td>,
                },

                {
                  key: "export_address",
                  label: "Địa chỉ nhận hàng",
                  render: ({ export_address }) => <td>{export_address}</td>,
                },
                {
                  key: "sale_name",
                  label: "Nhân viên phụ trách",
                  render: ({ sale_name }) => <td>{sale_name}</td>,
                },
              ]}
              data={listCustomerStaff || []}
              searchByExternal="export_code"
              externalSearch={searchValue}
            />
          </Card>
        </Col>
      ) : (
        <p className="mx-auto text-black">Không có dữ liệu</p>
      )}
    </Fragment>
  );
}

export default SearchWarehouseCustomerExport;
