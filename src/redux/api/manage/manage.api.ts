import { BASE_PORT, HTTPS_METHOD } from "../../../constants";

import {
  TTopup,
  TProduct,
  TPackage,
  TAgencyC1,
  TAgent,
  TAgentForm,
  TFarmer,
  TGetListAgentsRes,
  TGetListBrandnamesRes,
  TGetListFarmersRes,
  TReportDashboard,
  TBin,
  BaseQuery,
  TCustomerRes,
  TGroupCustomer,
  BASE_RES,
  TEmployee,
  TReportDashboardMap,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export enum ManageEnum {
  AGENTS = "AGENTS",
  AGENTS_STATUS = "AGENTS_STATUS",
  FARMERS = "FARMERS",
  FARMERS_STATUS = "FARMER_STATUS",
  BRANDNAMES = "BRANDNAMES",
  COUNTER_BRANDNAME = "COUNTER_BRANDNAME",
  COUNTER_BIN = "COUNTER_BIN",
  COUNTER_TOPUP = "COUNTER_TOPUP",
  COUNTER_FARMER = "COUNTER_FARMER",
  COUNTER_FARMER_STATUS = "COUNTER_FARMER_STATUS",
  COUNTER_AGENT_STATUS = "COUNTER_AGENT_STATUS",
  COUNTER_BIN_GATEWAY = "COUNTER_BIN_GATEWAY",
  COUNTER_PACKET_GATEWAY = "COUNTER_PACKET_GATEWAY",
  COUNTER_AGENT = "COUNTER_AGENT",
  COUNTER_PACKET = "COUNTER_PACKET",
  BINS = "BINS",
  BIN = "BIN",
  PACKETS = "PACKETS",
  TOPUPS = "TOPUPS",
  LIST_AGENCY_C1 = "LIST_AGENCY_C1",
  REPORT_DASHBOARD_DAY = "REPORT_DASHBOARD_DAY",
  REPORT_DASHBOARD_DAY_BY_DAY = "REPORT_DASHBOARD_DAY_BY_DAY",
  CUSTOMER_REGISTER = "CUSTOMER_REGISTER",
  CUSTOMER = "CUSTOMER",
  COUNTER_CUSTOMER_REGISTER = "COUNTER_CUSTOMER_REGISTER",
  COUNTER_CUSTOMER = "COUNTER_CUSTOMER",
  LIST_GROUP_OBJECTIVE = "LIST_GROUP_OBJECTIVE",
  EMPLOYEE = "EMPLOYEE",
}
export const manageApi = createApi({
  reducerPath: "manageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_PORT,
  }),
  tagTypes: [
    ManageEnum.AGENTS,
    ManageEnum.AGENTS_STATUS,
    ManageEnum.FARMERS,
    ManageEnum.BRANDNAMES,
    ManageEnum.BIN,
    ManageEnum.BINS,
    ManageEnum.TOPUPS,
    ManageEnum.PACKETS,
    ManageEnum.COUNTER_BRANDNAME,
    ManageEnum.COUNTER_BIN,
    ManageEnum.COUNTER_TOPUP,
    ManageEnum.COUNTER_FARMER,
    ManageEnum.COUNTER_AGENT,
    ManageEnum.COUNTER_PACKET,
    ManageEnum.COUNTER_AGENT_STATUS,
    ManageEnum.COUNTER_FARMER_STATUS,
    ManageEnum.COUNTER_BIN_GATEWAY,
    ManageEnum.COUNTER_PACKET_GATEWAY,
    ManageEnum.FARMERS_STATUS,
    ManageEnum.LIST_AGENCY_C1,
    ManageEnum.REPORT_DASHBOARD_DAY,
    ManageEnum.REPORT_DASHBOARD_DAY_BY_DAY,
    ManageEnum.CUSTOMER_REGISTER,
    ManageEnum.COUNTER_CUSTOMER_REGISTER,
    ManageEnum.CUSTOMER,
    ManageEnum.COUNTER_CUSTOMER,
    ManageEnum.LIST_GROUP_OBJECTIVE,
    ManageEnum.EMPLOYEE,
  ],
  endpoints: (builder) => ({
    getListAgents: builder.query<TGetListAgentsRes, BaseQuery | null>({
      query: (params) => {
        if (params === null)
          return {
            url: "/api/register/agent/list",
            method: HTTPS_METHOD.GET,
          };
        return {
          url: "/api/register/agent/list",
          method: HTTPS_METHOD.GET,
          params: params,
        };
      },
      transformResponse: (agents: TAgent[], meta, arg) => {
        const listValidateAgents: TAgent[] = [];
        const listUnValidateAgents: TAgent[] = [];
        agents.forEach((agent) => {
          if (agent.status === 1) listValidateAgents.push(agent);
          if (agent.status === 0) listUnValidateAgents.push(agent);
        });
        return {
          listValidateAgents,
          listUnValidateAgents,
        };
      },
      providesTags: (results) =>
        results
          ? [
              ...results.listUnValidateAgents,
              ...results.listValidateAgents,
            ].map(({ id }) => ({ type: ManageEnum.AGENTS, id }))
          : [ManageEnum.AGENTS],
    }),
    getListAgentsByStatus: builder.query<TAgent[], BaseQuery | null>({
      query: (params) => ({
        url: "/api/register/agent/status",
        method: HTTPS_METHOD.GET,
        params: params === null ? {} : params,
      }),
      providesTags: (results) =>
        results
          ? results.map(({ customer_code }) => ({
              type: ManageEnum.AGENTS_STATUS,
              customer_code,
            }))
          : [ManageEnum.AGENTS_STATUS],
    }),
    getCounterAgent: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/register/agent/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ManageEnum.COUNTER_AGENT],
    }),
    getCounterAgentStatus: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/register/agent/status/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ManageEnum.COUNTER_AGENT_STATUS],
    }),
    getListFarmers: builder.query<TGetListFarmersRes, BaseQuery>({
      query: (params) => ({
        url: "/api/register/farmer/list",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      transformResponse: (farmers: TFarmer[], meta, arg) => {
        const listValidateFarmers: TFarmer[] = [];
        const listUnValidateFarmers: TFarmer[] = [];
        farmers.forEach((farmer) => {
          if (farmer.status === 1) listValidateFarmers.push(farmer);
          if (farmer.status === 0) listUnValidateFarmers.push(farmer);
        });
        return {
          listUnValidateFarmers,
          listValidateFarmers,
        };
      },
      providesTags: (results) =>
        results
          ? [
              ...results.listUnValidateFarmers,
              ...results.listValidateFarmers,
            ].map(({ id }) => ({ type: ManageEnum.FARMERS, id }))
          : [ManageEnum.FARMERS],
    }),
    getListFarmersByStatus: builder.query<TFarmer[], BaseQuery>({
      query: (params) => ({
        url: "/api/register/farmer/status",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: (results) =>
        results
          ? results.map(({ code }) => ({
              type: ManageEnum.FARMERS_STATUS,
              code,
            }))
          : [ManageEnum.FARMERS_STATUS],
    }),
    getCounterFarmer: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/register/farmer/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ManageEnum.COUNTER_FARMER],
    }),
    getCounterFarmerStatus: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/register/farmer/status/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ManageEnum.COUNTER_FARMER_STATUS],
    }),
    getListBrandnames: builder.query<TGetListBrandnamesRes, BaseQuery>({
      query: (params) => ({
        url: "/api/report/brandname",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: (results) =>
        results
          ? results.map(({ id }) => ({ type: ManageEnum.BRANDNAMES, id }))
          : [ManageEnum.BRANDNAMES],
    }),
    getCounterBrandname: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/report/brandname/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ManageEnum.COUNTER_BRANDNAME],
    }),
    getBin: builder.query<TBin, { val: string }>({
      query: (params) => ({
        url: "/api/bin/code",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ManageEnum.BIN],
    }),
    getTopups: builder.query<TTopup[], BaseQuery>({
      query: (params) => ({
        url: "/api/report/topup",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: (results) =>
        results
          ? results.map(({ id }) => ({ type: ManageEnum.TOPUPS, id }))
          : [ManageEnum.TOPUPS],
    }),
    getCounterTopup: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/report/topup/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ManageEnum.COUNTER_TOPUP],
    }),
    getPackets: builder.query<
      { qrCode: TPackage[]; sms: TPackage[] },
      BaseQuery
    >({
      query: (params) => ({
        url: "/api/report/package",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      transformResponse: (packets: TPackage[]) => {
        const qrCode: TPackage[] = [];
        const sms: TPackage[] = [];
        packets.forEach((packet) => {
          if (packet.type_use === 0) qrCode.push(packet);
          if (packet.type_use === 1) sms.push(packet);
        });
        return {
          qrCode,
          sms,
        };
      },
      providesTags: (results) =>
        results
          ? [...results.qrCode, ...results.sms].map(({ id }) => ({
              type: ManageEnum.PACKETS,
              id,
            }))
          : [ManageEnum.PACKETS],
    }),
    getCounterPacket: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/report/package/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ManageEnum.COUNTER_PACKET],
    }),
    getCounterPacketGateway: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/report/package/gateway/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ManageEnum.COUNTER_PACKET_GATEWAY],
    }),
    getBins: builder.query<{ qrCode: TBin[]; sms: TBin[] }, BaseQuery>({
      query: (params) => ({
        url: "/api/report/bin",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      transformResponse: (bins: TBin[]) => {
        const qrCode: TBin[] = [];
        const sms: TBin[] = [];
        bins.forEach((bin) => {
          if (bin.type_use === 0) qrCode.push(bin);
          if (bin.type_use === 1) sms.push(bin);
        });
        return {
          qrCode,
          sms,
        };
      },
      providesTags: (results) =>
        results
          ? [...results.qrCode, ...results.sms].map(({ id }) => ({
              type: ManageEnum.BINS,
              id,
            }))
          : [ManageEnum.BINS],
    }),
    getCounterBin: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/report/bin/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ManageEnum.COUNTER_BIN],
    }),
    getCounterBinGateWay: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/report/bin/gateway/counter",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: [ManageEnum.COUNTER_BIN_GATEWAY],
    }),
    getListAgencyC1: builder.query<{ label: string; value: string }[], void>({
      query: () => ({
        url: "/api/register/agent-c1/list",
        method: HTTPS_METHOD.GET,
      }),
      transformResponse: (response: TAgencyC1[]) => {
        return response.map((item) => ({ label: item.name, value: item.code }));
      },
      providesTags: (response) =>
        response
          ? response.map(({ value }) => ({
              type: ManageEnum.LIST_AGENCY_C1,
              value,
            }))
          : [ManageEnum.LIST_AGENCY_C1],
    }),
    getReportDashboardByDay: builder.query<
      TReportDashboardMap,
      { day: number }
    >({
      query: (params) => ({
        url: "/api/report/dashboard/day",
        method: HTTPS_METHOD.GET,
        params,
      }),
      transformResponse: (result: TReportDashboard) => ({
        id: result.id,
        day: result.day,
        topup: result.topup,
        brandname: result.brandname,
        agent: result.retailer1 + result.retailer2,
        agent_none: result.retailer2_none,
        farmer: result.farmer,
        farmer_none: result.farmer_none,
        qrcode: result.qrcode,
        sms: result.sms,
      }),
      providesTags: [ManageEnum.REPORT_DASHBOARD_DAY],
    }),
    getCounterDayByDay: builder.query<
      TReportDashboard,
      { st: number; ed: number }
    >({
      query: (params) => ({
        url: "/api/report/dashboard/day-by-day",
        method: HTTPS_METHOD.GET,
        params,
      }),

      providesTags: [ManageEnum.REPORT_DASHBOARD_DAY_BY_DAY],
    }),
    getCounterCustomerRegister: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/customer/register/counter",
        method: HTTPS_METHOD.GET,
        params,
      }),
      providesTags: [ManageEnum.COUNTER_CUSTOMER_REGISTER],
    }),
    getListCustomerRegister: builder.query<TCustomerRes[], BaseQuery>({
      query: (params) => ({
        url: "/api/customer/register/list",
        method: HTTPS_METHOD.GET,
        params,
      }),
      providesTags: (results) =>
        results
          ? results.map(({ id }) => ({
              type: ManageEnum.CUSTOMER_REGISTER,
              id,
            }))
          : [ManageEnum.CUSTOMER_REGISTER],
    }),
    getCounterCustomer: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/customer/counter",
        method: HTTPS_METHOD.GET,
        params,
      }),
      providesTags: [ManageEnum.COUNTER_CUSTOMER],
    }),
    getListCustomer: builder.query<TCustomerRes[], BaseQuery>({
      query: (params) => ({
        url: "/api/customer/list",
        method: HTTPS_METHOD.GET,
        params,
      }),
      providesTags: (results) =>
        results
          ? results.map(({ id }) => ({
              type: ManageEnum.CUSTOMER,
              id,
            }))
          : [ManageEnum.CUSTOMER],
    }),
    getListGroupObjective: builder.query<TGroupCustomer[], void | null>({
      query: () => ({
        url: "/api/customer/group/list",
        method: HTTPS_METHOD.GET,
      }),

      providesTags: (results) =>
        results
          ? results.map(({ id }) => ({
              type: ManageEnum.LIST_GROUP_OBJECTIVE,
              id,
            }))
          : [ManageEnum.LIST_GROUP_OBJECTIVE],
    }),
    getListEmployee: builder.query<TEmployee[], void | null>({
      query: () => ({
        url: "/api/staff/list",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? results.map(({ uuid }) => ({
              type: ManageEnum.EMPLOYEE,
              uuid,
            }))
          : [ManageEnum.EMPLOYEE],
    }),
  }),
});
export const {
  useGetListAgentsQuery,
  useGetListAgentsByStatusQuery,
  useLazyGetListAgentsByStatusQuery,
  useGetListFarmersQuery,
  useGetListBrandnamesQuery,
  useGetCounterBrandnameQuery,
  useGetCounterTopupQuery,
  useGetCounterFarmerQuery,
  useGetBinQuery,
  useGetBinsQuery,
  useGetTopupsQuery,
  useGetPacketsQuery,
  useGetCounterBinQuery,
  useGetCounterAgentQuery,
  useGetCounterPacketQuery,
  useGetCounterBinGateWayQuery,
  useGetCounterPacketGatewayQuery,
  useGetCounterAgentStatusQuery,
  useGetCounterFarmerStatusQuery,
  useGetListAgencyC1Query,
  useGetReportDashboardByDayQuery,
  useGetCounterDayByDayQuery,
  useGetListFarmersByStatusQuery,
  useGetCounterCustomerRegisterQuery,
  useGetListCustomerRegisterQuery,
  useGetCounterCustomerQuery,
  useGetListCustomerQuery,
  useGetListGroupObjectiveQuery,
  useGetListEmployeeQuery,
} = manageApi;
