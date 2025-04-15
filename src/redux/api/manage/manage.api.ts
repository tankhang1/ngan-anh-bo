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
  TBrand,
  TIndication,
  TFormulation,
  TSMSGateway,
  TIngredient,
  TMaterial,
  TBrandname,
} from "../../../assets/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TPermit } from "../../slices/authSlice";
import { TagsEnum } from "../tags.enum.api";

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
    TagsEnum.BRAND,
    TagsEnum.INDICATION,
    TagsEnum.FORMULATION,
    TagsEnum.SMS,
    TagsEnum.MATERIAL,
  ],
  endpoints: (builder) => ({
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
      { qrCode: TPackage[]; sms: TPackage[]; zalo: TPackage[] },
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
        const zalo: TPackage[] = [];
        packets.forEach((packet) => {
          if (packet.type_use === 0) qrCode.push(packet);
          if (packet.type_use === 1) sms.push(packet);
          if (packet.type_use === 2) zalo.push(packet);
        });
        return {
          qrCode,
          sms,
          zalo,
        };
      },
      providesTags: (results) =>
        results
          ? [
              ...[...results.qrCode, ...results.sms, ...results.zalo].map(
                ({ id }) => ({
                  type: TagsEnum.PACKETS as const,
                  id,
                })
              ),
              TagsEnum.PACKETS,
            ]
          : [TagsEnum.PACKETS],
    }),
    getBins: builder.query<
      { qrCode: TBin[]; sms: TBin[]; zalo: TBin[] },
      BaseQuery
    >({
      query: (params) => ({
        url: "/api/report/bin",
        method: HTTPS_METHOD.GET,
        params: params,
      }),
      transformResponse: (bins: TBin[]) => {
        const qrCode: TBin[] = [];
        const sms: TBin[] = [];
        const zalo: TBin[] = [];
        bins.forEach((bin) => {
          if (bin.type_use === 0) qrCode.push(bin);
          if (bin.type_use === 1) sms.push(bin);
          if (bin.type_use === 2) zalo.push(bin);
        });
        return {
          qrCode,
          sms,
          zalo,
        };
      },
      providesTags: (results) =>
        results
          ? [
              ...[...results.qrCode, ...results.sms, ...results.zalo].map(
                ({ id }) => ({
                  type: TagsEnum.BINS as const,
                  id,
                })
              ),
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
    getReportDashboardDayByDay: builder.query<TReportDashboardMap[], BaseQuery>(
      {
        query: (params) => ({
          url: "/api/report/dashboard/day-by-day",
          method: HTTPS_METHOD.GET,
          params,
        }),
        transformResponse: (result: TReportDashboard[]) =>
          result?.map((item) => ({
            id: item.id,
            day: item.day,
            topup: item.topup,
            brandname: item.brandname,
            agent: item.retailer2,
            agent_none: item.retailer2_none,
            farmer: item.farmer,
            farmer_none: item.farmer_none,
            qrcode: item.qrcode,
            sms: item.sms,
          })),
      }
    ),

    getCounterCustomer: builder.query<number, BaseQuery>({
      query: (params) => ({
        url: "/api/customer/list/counter",
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
    getListBrand: builder.query<TBrand[], void>({
      query: () => ({
        url: "/api/product/brand/all",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.BRAND as const,
                id,
              })),
              TagsEnum.BRAND,
            ]
          : [TagsEnum.BRAND],
    }),
    getListIndication: builder.query<TIndication[], void>({
      query: () => ({
        url: "/api/product/indication/all",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.INDICATION as const,
                id,
              })),
              TagsEnum.INDICATION,
            ]
          : [TagsEnum.INDICATION],
    }),
    getListFormulation: builder.query<TFormulation[], void>({
      query: () => ({
        url: "/api/product/formulation/all",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.FORMULATION as const,
                id,
              })),
              TagsEnum.FORMULATION,
            ]
          : [TagsEnum.FORMULATION],
    }),
    getListSMSGateway: builder.query<TSMSGateway[], void>({
      query: () => ({
        url: "/api/report/sms/today",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.SMS as const,
                id,
              })),
              TagsEnum.SMS,
            ]
          : [TagsEnum.SMS],
    }),
    getListSMSGatewayDayByDay: builder.query<TSMSGateway[], BaseQuery>({
      query: (params) => ({
        url: "/api/report/sms",
        method: HTTPS_METHOD.GET,
        params,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.SMS as const,
                id,
              })),
              TagsEnum.SMS,
            ]
          : [TagsEnum.SMS],
    }),
    getListMaterial: builder.query<TMaterial[], void>({
      query: () => ({
        url: "/api/product/material/all",
        method: HTTPS_METHOD.GET,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TagsEnum.MATERIAL as const,
                id,
              })),
              TagsEnum.MATERIAL,
            ]
          : [TagsEnum.MATERIAL],
    }),
    getBinToday: builder.query<TBin[], void>({
      query: () => ({
        url: "/api/report/iqr/today",
        method: HTTPS_METHOD.GET,
        params: {
          t: 1,
        },
      }),
    }),
    getPackageToday: builder.query<TBin[], void>({
      query: () => ({
        url: "/api/report/iqr/today",
        method: HTTPS_METHOD.GET,
        params: {
          t: 0,
        },
      }),
    }),
    getListBrandnameToday: builder.query<TBrandname[], void>({
      query: () => ({
        url: "/api/report/brandname/today",
        method: HTTPS_METHOD.GET,
      }),
    }),
  }),
});
export const {
  useGetListBrandnamesQuery,
  useGetBinsQuery,
  useGetTopupsQuery,
  useGetPacketsQuery,
  useGetRolePermissionListQuery,
  useGetListAgencyC1Query,
  useGetReportDashboardByDayQuery,
  useGetReportDashboardDayByDayQuery,
  useGetCounterCustomerQuery,
  useGetListCustomerQuery,
  useGetListGroupObjectiveQuery,
  useGetListEmployeeQuery,
  useGetListEmployeeRoleQuery,
  useGetListEmployeeDepartmentQuery,
  useGetListGroupRetailerQuery,
  useGetListBrandQuery,
  useGetListFormulationQuery,
  useGetListIndicationQuery,
  useGetListSMSGatewayQuery,
  useGetListSMSGatewayDayByDayQuery,
  useGetListMaterialQuery,
  useGetBinTodayQuery,
  useGetPackageTodayQuery,
  useGetListBrandnameTodayQuery,
} = manageApi;
