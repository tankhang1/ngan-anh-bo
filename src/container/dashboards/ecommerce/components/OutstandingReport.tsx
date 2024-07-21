import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetReportDashboardByDayQuery } from "../../../../redux/api/manage/manage.api";
import { format, subDays } from "date-fns";

function OutstandingReport() {
  const { data: reportCurrentDay } = useGetReportDashboardByDayQuery(
    {
      day: +format(new Date(), "yyyyMMdd"),
    },
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 300000,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: reportPreviousDay } = useGetReportDashboardByDayQuery({
    day: +format(subDays(new Date(), 1), "yyyyMMdd"),
  });

  const mapReportCurrentDay = useMemo(
    () =>
      reportCurrentDay || {
        id: 15,
        day: +format(new Date(), "yyyyMMdd"),
        topup: 0,
        brandname: 0,
        agent: 0,
        agent_none: 0,
        farmer: 0,
        farmer_none: 0,
        qrcode: 0,
        sms: 0,
      },
    [reportCurrentDay]
  );
  const mapReportPreviousDay = useMemo(
    () =>
      reportPreviousDay || {
        id: 15,
        day: +format(subDays(new Date(), 1), "yyyyMMdd"),
        topup: 0,
        brandname: 0,
        agent: 0,
        agent_none: 0,
        farmer: 0,
        farmer_none: 0,
        qrcode: 0,
        sms: 0,
      },
    [reportCurrentDay]
  );

  return (
    <div className="row row-cols-sm-2 row-cols-xxl-4 g-0 ecommerce-cards">
      <div className="col d-flex p-4 tx-white pos-relative">
        <Link aria-label="anchor" to="#" className="masked-link"></Link>
        <div className="me-2 my-auto">
          <div className="avatar avatar-lg bg-secondary-transparent radius-5">
            <i className="ti ti-circle-check fs-20"></i>
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-0 text-muted">Đại lý đã xác thực</p>
          <div className="">
            <span className="text-xl fw-semibold">
              {mapReportCurrentDay.agent}
            </span>
            {mapReportCurrentDay.agent > mapReportPreviousDay.agent ? (
              <span className="ms-2 fs-13 text-secondary">
                <i className="fe fe-arrow-up-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.agent / mapReportCurrentDay?.agent +
                  mapReportPreviousDay.agent) *
                  100}
                %
              </span>
            ) : (
              <span className="ms-2 fs-13 text-secondary">
                <i className="fe fe-arrow-down-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.agent /
                  (mapReportCurrentDay?.agent + mapReportPreviousDay.agent === 0
                    ? 1
                    : mapReportCurrentDay?.agent +
                      mapReportPreviousDay.agent)) *
                  100}
                %
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col d-flex p-4 tx-white pos-relative">
        <Link aria-label="anchor" to="#" className="masked-link"></Link>
        <div className="me-2 my-auto">
          <div className="avatar avatar-lg bg-secondary-transparent radius-5">
            <i className="ti ti-circle-dotted fs-20"></i>
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-0 text-muted">Đại lý chờ xác thực</p>
          <div className="">
            <span className="text-xl fw-semibold">
              {mapReportCurrentDay.agent_none}
            </span>
            {mapReportCurrentDay.agent_none >
            mapReportPreviousDay.agent_none ? (
              <span className="ms-2 fs-13 text-secondary">
                <i className="fe fe-arrow-up-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.agent_none /
                  mapReportCurrentDay?.agent_none +
                  mapReportPreviousDay.agent_none) *
                  100}
                %
              </span>
            ) : (
              <span className="ms-2 fs-13 text-secondary">
                <i className="fe fe-arrow-down-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.agent_none /
                  (mapReportCurrentDay?.agent_none +
                    mapReportPreviousDay.agent_none ===
                  0
                    ? 1
                    : mapReportCurrentDay?.agent_none +
                      mapReportPreviousDay.agent_none)) *
                  100}
                %
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col d-flex p-4 tx-white pos-relative">
        <Link aria-label="anchor" to="#" className="masked-link"></Link>
        <div className="me-2 my-auto">
          <div className="avatar avatar-lg bg-info-transparent radius-5">
            <i className="ti ti-shovel fs-20"></i>
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-0 text-muted">Nông dân đã xác thực</p>
          <div className="">
            <span className="text-xl fw-semibold">
              {mapReportCurrentDay.farmer}
            </span>

            {mapReportCurrentDay.farmer > mapReportPreviousDay.farmer ? (
              <span className="ms-2 fs-13 text-info">
                <i className="fe fe-arrow-up-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.farmer / mapReportCurrentDay?.farmer +
                  mapReportPreviousDay.farmer) *
                  100}
                %
              </span>
            ) : (
              <span className="ms-2 fs-13 text-info">
                <i className="fe fe-arrow-down-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.farmer /
                  (mapReportCurrentDay?.farmer + mapReportPreviousDay.farmer ===
                  0
                    ? 1
                    : mapReportCurrentDay?.farmer +
                      mapReportPreviousDay.farmer)) *
                  100}
                %
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col d-flex p-4 tx-white pos-relative">
        <Link aria-label="anchor" to="#" className="masked-link"></Link>
        <div className="me-2 my-auto">
          <div className="avatar avatar-lg bg-info-transparent radius-5">
            <i className="ti ti-shovel fs-20"></i>
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-0 text-muted">Nông dân chờ xác thực</p>
          <div className="">
            <span className="text-xl fw-semibold">
              {mapReportCurrentDay.farmer_none}
            </span>
            {mapReportCurrentDay.farmer_none >
            mapReportPreviousDay.farmer_none ? (
              <span className="ms-2 fs-13 text-info">
                <i className="fe fe-arrow-up-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.farmer_none /
                  mapReportCurrentDay?.farmer_none +
                  mapReportPreviousDay.farmer_none) *
                  100}
                %
              </span>
            ) : (
              <span className="ms-2 fs-13 text-info">
                <i className="fe fe-arrow-down-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.farmer_none /
                  (mapReportCurrentDay?.farmer_none +
                    mapReportPreviousDay.farmer_none ===
                  0
                    ? 1
                    : mapReportCurrentDay?.farmer_none +
                      mapReportPreviousDay.farmer_none)) *
                  100}
                %
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col d-flex p-4 tx-white pos-relative">
        <Link aria-label="anchor" to="#" className="masked-link"></Link>
        <div className="me-2 my-auto">
          <div className="avatar avatar-lg bg-warning-transparent radius-5">
            <i className="ti ti-qrcode fs-20"></i>
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-0 text-muted">QrCode</p>
          <div className="d-flex flex-wrap align-items-baseline">
            <span className="text-xl fw-semibold">
              {mapReportCurrentDay.qrcode}
            </span>

            {mapReportCurrentDay.qrcode > mapReportPreviousDay.qrcode ? (
              <span className="ms-2 fs-13 text-warning">
                <i className="fe fe-arrow-up-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.qrcode / mapReportCurrentDay?.qrcode +
                  mapReportPreviousDay.qrcode) *
                  100}
                %
              </span>
            ) : (
              <span className="ms-2 fs-13 text-warning">
                <i className="fe fe-arrow-down-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.qrcode /
                  (mapReportCurrentDay?.qrcode + mapReportPreviousDay.qrcode ===
                  0
                    ? 1
                    : mapReportCurrentDay?.qrcode +
                      mapReportPreviousDay.qrcode)) *
                  100}
                %
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col d-flex p-4 tx-white pos-relative">
        <Link aria-label="anchor" to="#" className="masked-link"></Link>
        <div className="me-2 my-auto">
          <div className="avatar avatar-lg bg-success-transparent radius-5">
            <i className="ti ti-message fs-20"></i>
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-0 text-muted">SMS</p>
          <div className="d-flex flex-wrap align-items-baseline">
            <span className="text-xl fw-semibold">
              {mapReportCurrentDay.sms}
            </span>

            {mapReportCurrentDay.sms > mapReportPreviousDay.sms ? (
              <span className="ms-2 fs-13 text-success">
                <i className="fe fe-arrow-up-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.sms / mapReportCurrentDay?.sms +
                  mapReportPreviousDay.sms) *
                  100}
                %
              </span>
            ) : (
              <span className="ms-2 fs-13 text-success">
                <i className="fe fe-arrow-down-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.sms /
                  (mapReportCurrentDay?.sms + mapReportPreviousDay.sms === 0
                    ? 1
                    : mapReportCurrentDay?.sms + mapReportPreviousDay.sms)) *
                  100}
                %
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col d-flex p-4 tx-white pos-relative">
        <Link aria-label="anchor" to="#" className="masked-link"></Link>
        <div className="me-2 my-auto">
          <div className="avatar avatar-lg bg-dark-transparent radius-5">
            <i className="ti ti-brand-medium fs-20"></i>
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-0 text-muted">Brandname</p>
          <div className="d-flex flex-wrap align-items-baseline">
            <span className="text-xl fw-semibold">
              {mapReportCurrentDay.brandname}
            </span>

            {mapReportCurrentDay.brandname > mapReportPreviousDay.brandname ? (
              <span className="ms-2 fs-13 text-dark">
                <i className="fe fe-arrow-up-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.brandname /
                  mapReportCurrentDay?.brandname +
                  mapReportPreviousDay.brandname) *
                  100}
                %
              </span>
            ) : (
              <span className="ms-2 fs-13 text-dark">
                <i className="fe fe-arrow-down-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.brandname /
                  (mapReportCurrentDay?.brandname +
                    mapReportPreviousDay.brandname ===
                  0
                    ? 1
                    : mapReportCurrentDay?.brandname +
                      mapReportPreviousDay.brandname)) *
                  100}
                %
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col d-flex p-4 tx-white pos-relative">
        <Link aria-label="anchor" to="#" className="masked-link"></Link>
        <div className="me-2 my-auto">
          <div className="avatar avatar-lg bg-purple-transparent radius-5">
            <i className="ti ti-brand-medium fs-20"></i>
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-0 text-muted">Topup</p>
          <div className="d-flex flex-wrap align-items-baseline">
            <span className="text-xl fw-semibold">
              {mapReportCurrentDay.topup}
            </span>
            {mapReportCurrentDay.topup > mapReportPreviousDay.topup ? (
              <span className="ms-2 fs-13 text-primary">
                <i className="fe fe-arrow-up-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.topup / mapReportCurrentDay?.topup +
                  mapReportPreviousDay.topup) *
                  100}
                %
              </span>
            ) : (
              <span className="ms-2 fs-13 text-primary">
                <i className="fe fe-arrow-down-right me-1 d-inline-block fs-12"></i>
                {(mapReportCurrentDay.topup /
                  (mapReportCurrentDay?.topup + mapReportPreviousDay.topup === 0
                    ? 1
                    : mapReportCurrentDay?.topup +
                      mapReportPreviousDay.topup)) *
                  100}
                %
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutstandingReport;
