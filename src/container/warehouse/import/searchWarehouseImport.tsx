import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup } from "react-bootstrap";
import AppTable from "../../../components/common/table/table";
import { useGetImportByDocumentQuery } from "../../../redux/api/warehouse/warehouse.api";
import { format } from "date-fns";
import { useCheckTokenExpiredMutation } from "../../../redux/api/other/other.api";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

function SearchWarehouseImport() {
  const [searchValue, setSearchValue] = useState("");
  const [isPermitSearch, setIsPermitSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state: RootState) => state.auth);

  const onSearch = () => {
    if (!searchValue) return;
    setIsPermitSearch(true);
  };
  const [checkToken] = useCheckTokenExpiredMutation();

  const { data: imports, isLoading: loadingImport } =
    useGetImportByDocumentQuery(
      {
        code: searchValue,
      },
      {
        skip: !isPermitSearch,
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
  useEffect(() => {
    console.log("log");
    onCheckToken();
  }, [location.pathname]); // Runs when the route changes

  useEffect(() => {
    setIsPermitSearch(false);
  }, [imports]);
  return (
    <Fragment>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body>
            <div className="contact-header">
              <div className="d-flex flex-column gap-2">
                <div className="h6 fw-semibold mb-0">
                  Nhập mã phiếu nhập kho
                </div>
                <InputGroup className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    className="bg-light"
                    placeholder="Vui nhập mã phiếu xuất kho"
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
      {imports?.length !== 0 ? (
        <Col xl={12}>
          <Card className="custom-card">
            <AppTable
              isHeader={false}
              title="Thông tin nhập kho"
              isLoading={loadingImport}
              maxPage={imports?.length}
              headers={[
                {
                  key: "document_code",
                  label: "Mã phiếu",
                  render: ({ document_code }) => <td>{document_code}</td>,
                },
                {
                  key: "agent_code",
                  label: "Mã đại lý",
                  render: ({ agent_code }) => <td>{agent_code}</td>,
                },
                {
                  key: "agent_name",
                  label: "Tên đại lý",
                  render: ({ agent_name }) => <td>{agent_name}</td>,
                },
                {
                  key: "batch_number",
                  label: "Mã lô",
                  render: ({ batch_number }) => <td>{batch_number}</td>,
                },
                {
                  key: "seri",
                  label: "Mã thùng",
                  render: ({ seri }) => <td>{seri}</td>,
                },
                {
                  key: "time",
                  label: "Thời gian nhâp kho",
                  render: ({ time }) => <td>{time}</td>,
                },
              ]}
              data={imports || []}
              searchByExternal="document_code"
              externalSearch=""
            />
          </Card>
        </Col>
      ) : (
        <p className="mx-auto text-black">Không có dữ liệu</p>
      )}
    </Fragment>
  );
}

export default SearchWarehouseImport;
