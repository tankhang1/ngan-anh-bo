import { BASE_PORT, HTTPS_METHOD } from "../../../constants";

import {
  TTopup,
  TPackage,
  TAgent,
  TFarmer,
  TGetListAgentsRes,
  TGetListBrandnamesRes,
  TGetListFarmersRes,
  TReportDashboard,
  TBin,
  BaseQuery,
  TCustomerRes,
  TGroupCustomer,
  TEmployee,
  TReportDashboardMap,
  TEmployeeRole,
  TEmployeeDepartment,
  TGroupRetailer,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TPermit } from "../../slices/authSlice";
import { TagsEnum } from "../tags.enum.api";
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
  EMPLOYEE_ROLE = "EMPLOYEE_ROLE",
  ROLE_PERMISSION = "ROLE_PERMISSION",
  EMPLOYEE_DEPARTMENT = "EMPLOYEE_DEPARTMENT",
  GROUP_RETAILER = "GROUP_RETAILER",
}
export const manageApi = createApi({
  reducerPath: "manageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_PORT,
  }),
  tagTypes: [
    TagsEnum.AGENTS,
    TagsEnum.FARMERS,
    TagsEnum.BRANDNAMES,
    TagsEnum.TOPUPS,
    TagsEnum.PACKETS,
    TagsEnum.BINS,
    TagsEnum.AGENTS_C1,
    TagsEnum.CUSTOMER_REGISTER,
    TagsEnum.CUSTOMER,
    TagsEnum.CUSTOMER_OBJECTIVE,
    TagsEnum.EMPLOYEE,
    TagsEnum.EMPLOYEE_ROLE,
    TagsEnum.ROLE_PERMISSION,
    TagsEnum.EMPLOYEE_DEPARTMENT,
    TagsEnum.ROLE_PERMISSION,
    TagsEnum.RETAILER_GROUP,
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
              ...[
                ...results.listUnValidateAgents,
                ...results.listValidateAgents,
              ].map(({ id }) => ({ type: TagsEnum.AGENTS as const, id })),
              TagsEnum.AGENTS,
            ]
          : [TagsEnum.AGENTS],
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
              ...[
                ...results.listUnValidateFarmers,
                ...results.listValidateFarmers,
              ].map(({ id }) => ({ type: TagsEnum.FARMERS as const, id })),
              TagsEnum.FARMERS,
            ]
          : [TagsEnum.FARMERS],
    }),
    getListBrandnames: builder.query<TGetListBrandnamesRes, BaseQuery>({
      query: (params) => ({
        url: "/api/report/brandname",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.BRANDNAMES as const,
                id,
              })),
              TagsEnum.BRANDNAMES,
            ]
          : [TagsEnum.BRANDNAMES],
    }),
    getBin: builder.query<TBin, { val: string }>({
      query: (params) => ({
        url: "/api/bin/code",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
    }),
    getTopups: builder.query<TTopup[], BaseQuery>({
      query: (params) => ({
        url: "/api/report/topup",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.TOPUPS as const,
                id,
              })),
              TagsEnum.TOPUPS,
            ]
          : [TagsEnum.TOPUPS],
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
          ? [
              ...[...results.qrCode, ...results.sms].map(({ id }) => ({
                type: TagsEnum.PACKETS as const,
                id,
              })),
              TagsEnum.PACKETS,
            ]
          : [TagsEnum.PACKETS],
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
          ? [
              ...[...results.qrCode, ...results.sms].map(({ id }) => ({
                type: TagsEnum.BINS as const,
                id,
              })),
              TagsEnum.BINS,
            ]
          : [TagsEnum.BINS],
    }),

    getListAgencyC1: builder.query<{ label: string; value: string }[], void>({
      query: () => ({
        url: "/api/customer/list",
        method: HTTPS_METHOD.GET,
        params: {
          nu: 0,
          sz: 9999,
          t: "RETAILER1",
          s: 1,
        },
      }),
      transformResponse: (response: TCustomerRes[]) => {
        return response.map((item) => ({
          label: item.customer_name!,
          value: item.customer_code!,
        }));
      },
      providesTags: (response) =>
        response
          ? [
              ...response.map(({ value }) => ({
                type: TagsEnum.AGENTS_C1 as const,
                value,
              })),
              TagsEnum.AGENTS_C1,
            ]
          : [TagsEnum.AGENTS_C1],
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
        agent: result.retailer2,
        agent_none: result.retailer2_none,
        farmer: result.farmer,
        farmer_none: result.farmer_none,
        qrcode: result.qrcode,
        sms: result.sms,
      }),
    }),

    getListCustomerRegister: builder.query<TCustomerRes[], BaseQuery>({
      query: (params) => ({
        url: "/api/customer/register/list",
        method: HTTPS_METHOD.GET,
        params,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.CUSTOMER_REGISTER as const,
                id,
              })),
              TagsEnum.CUSTOMER_REGISTER,
            ]
          : [TagsEnum.CUSTOMER_REGISTER],
    }),
    getCounterCustomer: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/customer/counter",
        method: HTTPS_METHOD.GET,
        params,
      }),
    }),
    getListCustomer: builder.query<TCustomerRes[], BaseQuery>({
      query: (params) => ({
        url: "/api/customer/list",
        method: HTTPS_METHOD.GET,
        params,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.CUSTOMER as const,
                id,
              })),
              TagsEnum.CUSTOMER,
            ]
          : [TagsEnum.CUSTOMER],
    }),
    getListGroupObjective: builder.query<TGroupCustomer[], void | null>({
      query: () => ({
        url: "/api/customer/group/list",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.CUSTOMER_OBJECTIVE as const,
                id,
              })),
              TagsEnum.CUSTOMER_OBJECTIVE,
            ]
          : [TagsEnum.CUSTOMER_OBJECTIVE],
    }),
    getListEmployee: builder.query<TEmployee[], void | null>({
      query: () => ({
        url: "/api/staff/list",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ uuid }) => ({
                type: TagsEnum.EMPLOYEE as const,
                uuid,
              })),
              TagsEnum.EMPLOYEE,
            ]
          : [TagsEnum.EMPLOYEE],
    }),
    getListEmployeeRole: builder.query<TEmployeeRole[], void | null>({
      query: () => ({
        url: "/api/staff/role/list",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.EMPLOYEE_ROLE as const,
                id,
              })),
              TagsEnum.EMPLOYEE_ROLE,
            ]
          : [TagsEnum.EMPLOYEE_ROLE],
    }),
    getRolePermissionList: builder.query<TPermit[], void | null>({
      query: () => ({
        url: "/api/staff/role-permission/list",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ feature_code }) => ({
                type: TagsEnum.ROLE_PERMISSION as const,
                feature_code,
              })),
              TagsEnum.ROLE_PERMISSION,
            ]
          : [TagsEnum.ROLE_PERMISSION],
    }),
    getListEmployeeDepartment: builder.query<
      TEmployeeDepartment[],
      void | null
    >({
      query: () => ({
        url: "/api/staff/department/list",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.EMPLOYEE_DEPARTMENT as const,
                id,
              })),
              TagsEnum.EMPLOYEE_DEPARTMENT,
            ]
          : [TagsEnum.EMPLOYEE_DEPARTMENT],
    }),
    getListGroupRetailer: builder.query<TGroupRetailer[], void>({
      query: () => ({
        url: "/api/customer/retailer/group/list",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.RETAILER_GROUP as const,
                id,
              })),
              TagsEnum.RETAILER_GROUP,
            ]
          : [TagsEnum.RETAILER_GROUP],
    }),
  }),
});
export const {
  useGetListAgentsQuery,
  useGetListFarmersQuery,
  useGetListBrandnamesQuery,
  useGetBinQuery,
  useGetBinsQuery,
  useGetTopupsQuery,
  useGetPacketsQuery,
  useGetRolePermissionListQuery,
  useGetListAgencyC1Query,
  useGetReportDashboardByDayQuery,
  useGetListCustomerRegisterQuery,
  useGetCounterCustomerQuery,
  useGetListCustomerQuery,
  useGetListGroupObjectiveQuery,
  useGetListEmployeeQuery,
  useGetListEmployeeRoleQuery,
  useGetListEmployeeDepartmentQuery,
  useGetListGroupRetailerQuery,
} = manageApi;
