import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Card, Dropdown, Pagination } from "react-bootstrap";
import Loading from "../../../assets/images/apps/loading.gif";
import Empty from "../../../assets/images/apps/empty.jpg";

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
  headers: (THeader<T> | undefined)[];
  filters?: FilterOption<T>[];
  title: string;
  isHeader?: boolean;
  externalSearch?: string;
  searchByExternal?: string;
  isLoading?: boolean;
  maxPage?: number;
  setExternalPage?: (page: number) => void;
  isChange?: boolean | number | string;
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
  isLoading = false,
  maxPage,
  setExternalPage,
  isChange,
}: TAppTable<T>) => {
  const [page, setPage] = useState(1);
  const [filterOption, setFilterOption] = useState(filters?.[0]);
  const [searchBy, setSearchBy] = useState(headers[0]);
  const [searchValue, setSearchValue] = useState("");
  const deferSearchValue = useDeferredValue(searchValue);
  const filterData = useMemo(() => {
    if (!data) return [];
    if (filterOption && filterOption?.value !== "ALL")
      return !isHeader
        ? data?.filter(
            (item) =>
              item[filterOption?.key] === filterOption?.value &&
              item[searchByExternal ?? "id"]
                .toString()
                .toLowerCase()
                .includes(externalSearch?.toString()?.toLowerCase())
          )
        : data?.filter(
            (item) =>
              item[filterOption.key] === filterOption?.value &&
              item[searchBy?.key || "id"]
                .toString()
                .toLowerCase()
                .includes(deferSearchValue.toLowerCase())
          );
    return !isHeader
      ? data?.filter((item) =>
          item[searchByExternal ?? "id"]
            ?.toString()
            .toLowerCase()
            .includes(externalSearch?.toString().toLowerCase())
        )
      : data?.filter((item) =>
          item[searchBy?.key || "id"]
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
    if (setExternalPage) {
      return filterData;
    }
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    return filterData.slice(from, to);
  }, [filterData, page, setExternalPage]);
  const MAX_PAGE = Math.ceil(
    (searchValue?.length === 0 && externalSearch?.length === 0
      ? maxPage ?? filterData.length
      : filterData.length ?? 0) / PAGE_SIZE
  );

  const listButtonPaging = useMemo(() => {
    if (MAX_PAGE < 5)
      return Array.from({ length: MAX_PAGE }).map((_, index) => {
        return index + 1;
      });
    if (page > MAX_PAGE - 5 && page < MAX_PAGE)
      return Array.from({ length: 5 }).map((_, index) => {
        return index + MAX_PAGE - 4;
      });
    return Array.from({ length: 5 }).map((_, index) => {
      if (index + page <= MAX_PAGE) return index + page;
      return null;
    });
  }, [data.length, page, MAX_PAGE]);
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [isChange, searchBy, searchByExternal, externalSearch]);

  useEffect(() => {
    setExternalPage?.(page);
  }, [page]);
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
                {headers.map(
                  (item, index) =>
                    item !== undefined && (
                      <Dropdown.Item
                        key={index}
                        onClick={() => setSearchBy(item)}
                        active={item.key === searchBy?.key}
                      >
                        {item.label}
                      </Dropdown.Item>
                    )
                )}
              </Dropdown.Menu>
            </Dropdown>
            {filters && filters.length > 0 && (
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
                  {filters?.map((filter, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setFilterOption(filter)}
                      active={filterOption?.value === filter.value}
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
                {headers.map(
                  (item, index) =>
                    item !== undefined && (
                      <th scope="col" key={index} className="text-center">
                        {item.label}
                      </th>
                    )
                )}
              </tr>
            </thead>

            {!isLoading && (
              <tbody>
                {pagingData.map((item, index) => (
                  <tr key={index} className="text-center">
                    {headers.map(
                      (header, index) =>
                        item !== undefined && header?.render?.(item)
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {isLoading && (
            <div className="d-flex w-100 align-items-center justify-content-center">
              <img src={Loading} className="w-25" />
            </div>
          )}
          {!isLoading && pagingData.length === 0 && (
            <div className="d-flex w-100 align-items-center justify-content-center">
              <img src={Empty} className="w-25" />
            </div>
          )}
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex flex-sm-row gap-2 flex-column align-items-center">
          <div className="text-black">
            Tổng cộng {externalSearch ? filterData.length : maxPage ?? 0} items{" "}
            <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
          </div>
          <div className="ms-auto">
            <nav aria-label="Page navigation" className="pagination-style-4">
              <Pagination as="ul" className="pagination mb-0 gap-1">
                <Pagination.Item
                  disabled={page > 1 ? false : true}
                  href="#"
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                    }
                  }}
                >
                  Trước
                </Pagination.Item>

                {listButtonPaging.map(
                  (item, index) =>
                    item !== null && (
                      <Pagination.Item
                        key={index}
                        active={page === item}
                        onClick={() => setPage(item)}
                      >
                        {item}
                      </Pagination.Item>
                    )
                )}
                <Pagination.Item
                  disabled={page < MAX_PAGE ? false : true}
                  className="text-primary"
                  onClick={() => {
                    if (!listButtonPaging.includes(null) && page < MAX_PAGE) {
                      setPage(page + 1);
                    }
                  }}
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
