import React, { useMemo, useState } from "react";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { Basicolumn } from "../../../charts/apexcharts/columnchart/columnchartdata";
import {
  useGetListAgentsQuery,
  useGetListFarmersQuery,
} from "../../../../redux/api/manage/manage.api";
import { endOfWeek, format, startOfWeek, subDays, subWeeks } from "date-fns";
import lodash from "lodash";
import { getDaysArray } from "./AgentReport";
function FarmerReport() {
  const [rangDate, setRangeDate] = useState<{ st: number; ed: number }>({
    st: +(format(new Date(), "yyyyMMdd") + "0000"),
    ed: +(format(new Date(), "yyyyMMdd") + "2399"),
  });
  const [dropdownOption, setDropdownOption] = useState<
    "today" | "week" | "lastWeek"
  >("today");
  const [listDays, setListDays] = useState([format(new Date(), "dd-MM-yyyy")]);

  const { data: farmers, isLoading: isLoadingFarmer } = useGetListFarmersQuery(
    {
      ...rangDate,
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleDropdownMenu = (date: "today" | "week" | "lastWeek") => {
    if (date === "today") {
      setRangeDate({
        st: +(format(new Date(), "yyyyMMdd") + "0000"),
        ed: +(format(new Date(), "yyyyMMdd") + "2399"),
      });
      setListDays([format(new Date(), "dd-MM-yyyy")]);
    }
    if (date === "week") {
      setRangeDate({
        st: +(
          format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyyMMdd") +
          "0000"
        ),
        ed: +(format(new Date(), "yyyyMMdd") + "0000"),
      });
      setListDays(
        getDaysArray(
          startOfWeek(new Date(), { weekStartsOn: 1 }),
          new Date()
        ).map((item) => format(new Date(item), "dd-MM-yyyy"))
      );
    }
    if (date === "lastWeek") {
      setRangeDate({
        st: +(
          format(startOfWeek(subWeeks(new Date(), 1)), "yyyyMMdd") + "0000"
        ),
        ed: +(format(endOfWeek(subWeeks(new Date(), 1)), "yyyyMMdd") + "0000"),
      });
      setListDays(
        getDaysArray(
          startOfWeek(subWeeks(new Date(), 1)),
          endOfWeek(subWeeks(new Date(), 1))
        ).map((item) => format(new Date(item), "dd-MM-yyyy"))
      );
    }
    setDropdownOption(date);
  };

  const mapFarmer = useMemo(() => {
    const checkedFarmers = lodash.groupBy(
      farmers?.listValidateFarmers.map((item) => ({
        ...item,
        time: format(item.time, "dd-MM-yyyy"),
      }))
    );
    const unCheckedFarmers = lodash.groupBy(
      farmers?.listUnValidateFarmers.map((item) => ({
        ...item,
        time: format(item.time, "dd-MM-yyyy"),
      }))
    );
    const data = listDays.map((date) => ({
      date: date,
      farmerChecked: checkedFarmers?.[date]?.length ?? 0,
      farmerUnChecked: unCheckedFarmers?.[date]?.length ?? 0,
    }));
    return data;
  }, [farmers]);
  return (
    <Col xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Nông dân</Card.Title>
          <Dropdown>
            <Dropdown.Toggle
              variant=""
              aria-label="anchor"
              className="btn btn-outline-light btn-icons btn-sm text-muted no-caret"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fe fe-more-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu role="menu">
              <Dropdown.Item
                active={dropdownOption === "today"}
                onClick={() => handleDropdownMenu("today")}
              >
                Hôm nay
              </Dropdown.Item>
              <Dropdown.Item
                active={dropdownOption === "week"}
                onClick={() => handleDropdownMenu("week")}
              >
                Tuần này
              </Dropdown.Item>
              <Dropdown.Item
                active={dropdownOption === "lastWeek"}
                onClick={() => handleDropdownMenu("lastWeek")}
              >
                Tuần trước
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body>
          <div id="projectstatistics">
            <Basicolumn
              series={[
                {
                  name: "Nông dân đã xác thực",
                  data: mapFarmer.map((item) => item.farmerChecked),
                },
                {
                  name: "Nông dân chờ xác thực",
                  data: mapFarmer.map((item) => item.farmerUnChecked),
                },
              ]}
              categories={listDays}
              colors={["#76cff5", "#27c86b"]}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default FarmerReport;
