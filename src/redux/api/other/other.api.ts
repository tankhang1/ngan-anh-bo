import { HTTPS_METHOD } from "../../../constants";

import {
  BASE_RES,
  TCustomerRes,
  TEmployee,
  TEmployeeDepartment,
  TEmployeeRole,
  TGroupCustomer,
  TPointCreateForm,
  TTopupCreateForm,
} from "../../../assets/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../middlewares/baseQueryWithReauth";
import { TagsEnum } from "../tags.enum.api";

export enum OtherEnum {
  CREATE_POINT_PROGRAM = "LIST_PROGRAM_POINT_STATUS",
  CREATE_TOPUP_PROGRAM = "CREATE_TOPUP_PROGRAM",
  UPDATE_POINT_PROGRAM = "LIST_PROGRAM_POINT_STATUS",
  UPDATE_TOPUP_PROGRAM = "UPDATE_TOPUP_PROGRAM",
  CUSTOMER = "CUSTOMER",
  LIST_GROUP_OBJECTIVE = "LIST_GROUP_OBJECTIVE",
  EMPLOYEE = "EMPLOYEE",
  EMPLOYEE_ROLE = "EMPLOYEE_ROLE",
  EMPLOYEE_DEPARTMENT = "EMPLOYEE_DEPARTMENT",
}

export const otherApi = createApi({
  reducerPath: "otherApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    TagsEnum.PROGRAM_POINT,
    TagsEnum.PROGRAM_TOPUP,
    TagsEnum.CUSTOMER,
    TagsEnum.CUSTOMER_OBJECTIVE,
    TagsEnum.EMPLOYEE,
    TagsEnum.EMPLOYEE_ROLE,
    TagsEnum.EMPLOYEE_DEPARTMENT,
  ],
  endpoints: (builder) => ({
    getNewUUID: builder.query<number, void | null>({
      query: () => ({
        url: "/generate/uuid",
        method: HTTPS_METHOD.GET,
        responseHandler: (response) => response.text(),
        cache: "no-cache",
      }),
    }),
    createPointProgram: builder.mutation<BASE_RES, TPointCreateForm>({
      query: (body) => ({
        url: `/program/point/create`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [TagsEnum.PROGRAM_POINT],
    }),
    createTopupProgram: builder.mutation<BASE_RES, TTopupCreateForm>({
      query: (body) => ({
        url: `/program/topup/create`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [TagsEnum.PROGRAM_TOPUP],
    }),
    updateTopupProgram: builder.mutation<BASE_RES, TTopupCreateForm>({
      query: (body) => ({
        url: `/program/topup/update`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TagsEnum.PROGRAM_TOPUP, uuid: arg.uuid },
      ],
    }),
    updatePointProgram: builder.mutation<BASE_RES, TPointCreateForm>({
      query: (body) => ({
        url: `/program/point/update`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TagsEnum.PROGRAM_POINT, uuid: arg.uuid },
      ],
    }),
    createUpdateCustomer: builder.mutation<BASE_RES, TCustomerRes>({
      query: (body) => ({
        url: `/customer/create`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: [TagsEnum.CUSTOMER],
    }),
    updateCustomer: builder.mutation<BASE_RES, TCustomerRes>({
      query: (body) => ({
        url: `/customer/update`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TagsEnum.CUSTOMER, id: arg.id! },
      ],
    }),
    verifyCustomer: builder.mutation<BASE_RES, TCustomerRes>({
      query: (body) => ({
        url: `/customer/verify`,
        method: HTTPS_METHOD.POST,
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TagsEnum.CUSTOMER, id: arg.id! },
      ],
    }),
    createUpdateGroupObjective: builder.mutation<BASE_RES, TGroupCustomer>({
      query: (body) => ({
        url: "/customer/group/create",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.CUSTOMER_OBJECTIVE],
    }),
    createEmployee: builder.mutation<BASE_RES, TEmployee>({
      query: (body) => ({
        url: "/staff/create",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.EMPLOYEE],
    }),
    updateEmployee: builder.mutation<BASE_RES, TEmployee>({
      query: (body) => ({
        url: "/staff/update",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TagsEnum.EMPLOYEE as const, uuid: arg.uuid! },
      ],
    }),
    createEmployeeRole: builder.mutation<BASE_RES, TEmployeeRole>({
      query: (body) => ({
        url: "/staff/role/create",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.EMPLOYEE_ROLE],
    }),
    createEmployeeDepartment: builder.mutation<BASE_RES, TEmployeeDepartment>({
      query: (body) => ({
        url: "/staff/department/create",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: [TagsEnum.EMPLOYEE_ROLE],
    }),
    updateEmployeeRole: builder.mutation<BASE_RES, TEmployeeRole>({
      query: (body) => ({
        url: "/staff/role/update",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TagsEnum.EMPLOYEE_ROLE as const, id: arg.id! },
      ],
    }),
    updateEmployeeDepartment: builder.mutation<BASE_RES, TEmployeeDepartment>({
      query: (body) => ({
        url: "/staff/department/update",
        method: HTTPS_METHOD.POST,
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TagsEnum.EMPLOYEE_DEPARTMENT as const, id: arg.id! },
      ],
    }),
  }),
});
export const {
  useGetNewUUIDQuery,
  useCreatePointProgramMutation,
  useCreateTopupProgramMutation,
  useUpdatePointProgramMutation,
  useUpdateTopupProgramMutation,
  useCreateUpdateCustomerMutation,
  useVerifyCustomerMutation,
  useCreateUpdateGroupObjectiveMutation,
  useCreateEmployeeMutation,
  useUpdateCustomerMutation,
  useUpdateEmployeeMutation,
  useCreateEmployeeDepartmentMutation,
  useCreateEmployeeRoleMutation,
  useUpdateEmployeeDepartmentMutation,
  useUpdateEmployeeRoleMutation,
} = otherApi;
