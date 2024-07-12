import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Card, Col, Dropdown, Pagination, Row } from "react-bootstrap";

type THeader<T> = {
  key: string;
  label: string;
  value?: string | number;
  render?: (value: T) => any;
};
type DataItem = {
  [key: string]: any; // You can be more specific here if you know the exact structure of your data
};

type FilterOption<T> = {
  key: keyof T;
  value: any;
  label: string;
};

type TAppTable<T> = {
  data: T[];
  headers: THeader<T>[];
  filters: FilterOption<T>[];
  title: string;
  isHeader?: boolean;
  externalSearch?: string;
  searchByExternal?: string;
};
const PAGE_SIZE = 10;
const AppTable = <T extends DataItem>({
  headers,
  data,
  filters,
  title,
  isHeader = true,
  externalSearch,
  searchByExternal,
}: TAppTable<T>) => {
  const [page, setPage] = useState(1);
  const [filterOption, setFilterOption] = useState(filters[0]);
  const [searchBy, setSearchBy] = useState(headers[0]);
  const [searchValue, setSearchValue] = useState("");
  const deferSearchValue = useDeferredValue(searchValue);
  const filterData = useMemo(() => {
    if (filterOption?.value !== "ALL")
      return !isHeader
        ? data.filter(
            (item) =>
              item[filterOption.key] === filterOption?.value &&
              item[searchByExternal ?? "id"]
                .toString()
                .toLowerCase()
                .includes(externalSearch?.toString()?.toLowerCase())
          )
        : data.filter(
            (item) =>
              item[filterOption.key] === filterOption?.value &&
              item[searchBy.key]
                .toString()
                .toLowerCase()
                .includes(deferSearchValue.toLowerCase())
          );
    return !isHeader
      ? data.filter((item) =>
          item[searchByExternal ?? "id"]
            ?.toString()
            .toLowerCase()
            .includes(externalSearch?.toString().toLowerCase())
        )
      : data.filter((item) =>
          item[searchBy.key]
            ?.toString()
            .toLowerCase()
            .includes(deferSearchValue.toLowerCase())
        );
  }, [
    data,
    filterOption,
    searchBy,
    deferSearchValue,
    page,
    externalSearch,
    isHeader,
  ]);
  const pagingData = useMemo(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    return filterData.slice(from, to);
  }, [filterData, page]);
  const MAX_PAGE = useMemo(
    () => Math.ceil((filterData.length ?? 0) / PAGE_SIZE),
    [deferSearchValue, filterOption, filterData.length]
  );

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [filterData.length]);

  return (
    <Card className="custom-card ">
      {isHeader && (
        <Card.Header className="d-sm-flex flex-sm-row flex flex-column  justify-content-sm-between">
          <div className="card-title">{title}</div>
          <div className="gap-1 flex-row" style={{ display: "flex" }}>
            <div className="mb-2 mb-sm-0">
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Tìm kiếm"
                aria-label=" example"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <Dropdown className="mb-sm-0 mb-2">
              <Dropdown.Toggle
                variant=""
                className="btn btn-sm btn-outline-primary btn-wave waves-effect waves-light no-caret "
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Tìm kiếm
                <i className="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu role="menu">
                {headers.map((item, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setSearchBy(item)}
                    active={item.key === searchBy.key}
                  >
                    {item.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {filters && (
              <Dropdown>
                <Dropdown.Toggle
                  variant=""
                  className="btn btn-sm btn-primary btn-wave waves-effect waves-light no-caret"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Lọc
                  <i className="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu role="menu">
                  {filters.map((filter, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setFilterOption(filter)}
                      active={filterOption.value === filter.value}
                    >
                      {filter.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Card.Header>
      )}
      <Card.Body>
        <div className="table-responsive">
          <table className="table text-nowrap table-bordered table-striped">
            <thead>
              <tr>
                {headers.map((item) => (
                  <th scope="col" key={item.key}>
                    {item.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagingData.map((item, index) => (
                <tr key={index}>
                  {headers.map((header) => header?.render?.(item))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex align-items-center">
          <div>
            Tổng cộng {filterData.length} items{" "}
            <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
          </div>
          <div className="ms-auto">
            <nav aria-label="Page navigation" className="pagination-style-4">
              <Pagination as="ul" className="pagination mb-0 gap-1">
                <Pagination.Item
                  disabled={page > 1 ? false : true}
                  href="#"
                  onClick={() => setPage(page - 1)}
                >
                  Trước
                </Pagination.Item>

                {Array.from({ length: MAX_PAGE }).map((_, index) => (
                  <Pagination.Item
                    active={page === index + 1 ? true : false}
                    href="#"
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Item
                  disabled={page < MAX_PAGE ? false : true}
                  className="text-primary"
                  href="#"
                  onClick={() => setPage(page + 1)}
                >
                  Sau
                </Pagination.Item>
              </Pagination>
            </nav>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default AppTable;
