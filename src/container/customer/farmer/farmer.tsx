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
import { TFarmer } from "../../../assets/types";
import AppId from "../../../components/common/app-id";
import { useNavigate } from "react-router-dom";
import {
  useGetCounterFarmerStatusQuery,
  useGetListFarmersByStatusQuery,
} from "../../../redux/api/manage/manage.api";
import { format } from "date-fns";
import { PROVINCES } from "../../../constants";

const FAMER_FILTERS = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Tên",
  },
  {
    key: "phone",
    label: "Số điện thoại",
  },
];
function Farmer() {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(FAMER_FILTERS[0].key);
  const deferSearchValue = useDeferredValue(search);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const [page, setPage] = useState(1);
  const [listFarmers, setListFarmers] = useState<TFarmer[]>([]);
  const { data: counterFarmer } = useGetCounterFarmerStatusQuery(
    {
      status: isActive ? 1 : 0,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: farmers, isLoading: isLoadingFarmer } =
    useGetListFarmersByStatusQuery(
      {
        status: isActive ? 1 : 0,
        sz: 10,
        nu: page - 1,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );
  const getProvinceLabel = useCallback(
    (provinceId: string) => {
      return PROVINCES.find((item) => item.value === provinceId)?.label ?? "";
    },
    [PROVINCES]
  );

  const changeActive = () => {
    setIsActive(!isActive);
    setListFarmers([]);
  };

  useEffect(() => {
    if (
      counterFarmer &&
      farmers &&
      listFarmers.length + farmers.length <= counterFarmer
    ) {
      setListFarmers([...listFarmers, ...farmers]);
    }
  }, [farmers, counterFarmer]);
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
                      {FAMER_FILTERS.map((item, index) => (
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
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip className="tooltip">Đổi trạng thái</Tooltip>
                    }
                  >
                    <button
                      aria-label="button"
                      type="button"
                      className="btn btn-info-light ms-2 w-auto"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add Contact"
                      onClick={changeActive}
                    >
                      <i className="ti ti-exchange"></i>
                    </button>
                  </OverlayTrigger>
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
            externalSearch={deferSearchValue}
            title="Thông tin nông dân"
            isLoading={isLoadingFarmer}
            setExternalPage={setPage}
            maxPage={counterFarmer}
            isChange={isActive}
            headers={[
              {
                key: "id",
                label: "ID",
                render: (value: TFarmer) => (
                  <td>
                    <AppId id={value.id} />
                  </td>
                ),
              },
              {
                key: "name",
                label: "Tên",
                render: (value) => (
                  <td>
                    <span className="fw-semibold">{value.name}</span>
                  </td>
                ),
              },
              {
                key: "phone",
                label: "Số điện thoại",
                render: (value) => <td>{value.phone}</td>,
              },
              {
                key: "province",
                label: "Địa chỉ",
                render: (value) => (
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>{getProvinceLabel(value.province)}</Tooltip>
                      }
                    >
                      <p>{value.province}</p>
                    </OverlayTrigger>
                  </td>
                ),
              },
              {
                key: "time",
                label: "Thời gian đăng kí",
                render: (value) => <td>{value.time}</td>,
              },
              {
                key: "time_verify",
                label: "Thời gian xác thực",
                render: (value) => <td>{value.time_verify}</td>,
              },
              {
                key: "status",
                label: "Trạng thái",
                render: (value) => (
                  <td>
                    {value.status === 1 ? (
                      <span className="bg-secondary bg-opacity-100 text-white badge ">
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
                      className="btn btn-icon btn-sm btn-primary-ghost"
                      onClick={() =>
                        navigate(
                          `ce/${false}/${value.customer_code}_${
                            isActive ? 1 : 0
                          }_${page - 1}`
                        )
                      }
                    >
                      <i className="ti ti-edit"></i>
                    </button>
                  </td>
                ),
              },
            ]}
            data={listFarmers || []}
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

export default Farmer;
