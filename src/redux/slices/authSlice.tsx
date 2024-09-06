import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TFeatureCode =
  | "DASHBOARD"
  | "ACCOUNTS"
  | "OPERATORS_SEARCH_PRODUCT"
  | "OPERATORS_SEARCH_CUSTOMER_TODAY"
  | "OPERATORS_SEARCH_TOPUP_TODAY"
  | "OPERATORS_SEARCH_CUSTOMER_VALIDATE_TODAY"
  | "OPERATORS_SEARCH_CUSTOMER_UNVALIDATE_TODAY"
  | "CUSTOMERS_VALIDATE"
  | "CUSTOMERS_UNVALIDATE"
  | "EMPLOYEES_INFO"
  | "EMPLOYEES_ROLES"
  | "EMPLOYEES_DEPARTMENTS"
  | "PRODUCTS_INFO"
  | "PRODUCTS_MANUFACTURE"
  | "PROGRAMS_POINTS"
  | "PROGRAMS_TOPUPS"
  | "PROGRAM_CHANCE"
  | "REPORTS_CUSTOMER"
  | "REPORTS_IQR"
  | "REPORTS_POINT"
  | "REPORTS_TOPUP"
  | "REPORTS_CHANCE"
  | "REPORTS_SMS"
  | "SETTINGS_AREA"
  | "SETTINGS_GROUP_CUSTOMER"
  | "SETTINGS_GROUP_AGENT"
  | "WAREHOUSES_SEARCH_EXPORT"
  | "WAREHOUSES_SEARCH_IMPORT"
  | "WAREHOUSES_LIST_IMPORT"
  | "WAREHOUSES_LIST_EXPORT"
  | "WAREHOUSES_REPORT_EXPORT"
  | "WAREHOUSES_INVENTORY_INFO";
export type TPermit = {
  id: number;
  role_code?: string;
  permit_create: number;
  permit_edit: number;
  permit_remove: number;
  permit_view_detail: number;
  permit_view_list: number;
  permit_export: number;
  feature_group_code: string;
  feature_group_name: string;
  feature_code: TFeatureCode;
  feature_name: string;
};

const initialValue = {
  token: "",
  roles: "",
  username: "",
  permission: {
    viewDashboard: 0,
    viewAccounts: 0,
    viewListAccounts: 0,
    createAccount: 0,
    exportAccount: 0,
    editAccount: 0,
    deleteAccount: 0,
    viewValidateCustomer: 0,
    viewListValidateCustomer: 0,
    viewListUnValidateCustomer: 0,
    createValidateCustomer: 0,
    verifyUnvalidateCustomer: 0,
    exportValidateCustomer: 0,
    editValidateCustomer: 0,
    viewUnValidateCustomer: 0,
    createUnValidateCustomer: 0,
    exportUnValidateCustomer: 0,
    editUnValidateCustomer: 0,
    viewEmployee: 0,
    viewListEmployee: 0,
    exportEmployee: 0,
    editEmployee: 0,
    createEmployee: 0,
    viewRoles: 0,
    createRole: 0,
    editRole: 0,
    viewDepartment: 0,
    createDepartment: 0,
    editDepartment: 0,

    viewProductsInfo: 0,
    viewListProductsInfo: 0,
    createProductInfo: 0,
    exportProductInfo: 0,
    editProductInfo: 0,

    viewProductsWarehouse: 0,
    viewListProductsWarehouse: 0,
    createProductWarehouse: 0,
    exportProductWarehouse: 0,
    editProductWarehouse: 0,

    viewProgramPoint: 0,
    viewListProgramPoint: 0,
    createProgramPoint: 0,
    editProgramPoint: 0,
    viewProgramTopup: 0,
    viewListProgramTopup: 0,
    createProgramTopup: 0,
    editProgramTopup: 0,
    viewProgramChance: 0,
    viewListProgramChance: 0,
    createProgramChance: 0,
    editProgramChance: 0,
    reportCustomer: 0,
    reportIQR: 0,
    reportProgramPoint: 0,
    reportProgramTopup: 0,
    reportProgramChance: 0,
    reportSMS: 0,
    settingArea: 0,
    createSettingArea: 0,
    settingGroupCustomer: 0,
    createSettingGroupCustomer: 0,
    editSettingGroupCustomer: 0,
    viewRetailerGroup: 0,
    createRetailerGroup: 0,
    viewOperatorSearchProduct: 0,
    viewOperatorSearchCustomerToday: 0,
    viewOperatorSearchTopupToday: 0,
    viewOperatorSearchCustomerValidateToday: 0,
    viewOperatorSearchCustomerUnValidateToday: 0,
    warehouseSearchExport: 0,
    warehouseSearchImport: 0,
    warehouseListImport: 0,
    warehouseListExport: 0,
    warehouseExportFileImport: 0,
    warehouseExportFileExport: 0,
    warehouseReportExport: 0,
    warehouseInventoryInfo: 0,
  },
};

const onPermissionFeature = (permission: TPermit) => {
  switch (permission.feature_code) {
    case "DASHBOARD":
      return {
        viewDashboard: permission.permit_view_list,
      };
    case "ACCOUNTS": {
      return {
        viewAccounts: permission.permit_view_detail,
        viewListAccounts: permission.permit_view_list,
        createAccount: permission.permit_create,
        exportAccount: permission.permit_export,
        deleteAccount: permission.permit_remove,
        editAccount: permission.permit_edit,
      };
    }
    case "OPERATORS_SEARCH_PRODUCT": {
      return {
        viewOperatorSearchProduct: permission.permit_view_list,
      };
    }
    case "OPERATORS_SEARCH_CUSTOMER_TODAY": {
      return {
        viewOperatorSearchCustomerToday: permission.permit_view_list,
      };
    }

    case "OPERATORS_SEARCH_TOPUP_TODAY": {
      return {
        viewOperatorSearchTopupToday: permission.permit_view_list,
      };
    }
    case "OPERATORS_SEARCH_CUSTOMER_VALIDATE_TODAY": {
      return {
        viewOperatorSearchCustomerValidateToday: permission.permit_view_list,
      };
    }
    case "OPERATORS_SEARCH_CUSTOMER_UNVALIDATE_TODAY": {
      return {
        viewOperatorSearchCustomerUnValidateToday: permission.permit_view_list,
      };
    }
    case "EMPLOYEES_INFO": {
      return {
        viewEmployee: permission.permit_view_detail,
        viewListEmployee: permission.permit_view_list,
        exportEmployee: permission.permit_export,
        editEmployee: permission.permit_edit,
        createEmployee: permission.permit_create,
      };
    }
    case "EMPLOYEES_ROLES": {
      return {
        viewRoles: permission.permit_view_list,
        createRole: permission.permit_create,
        editRole: permission.permit_edit,
      };
    }
    case "EMPLOYEES_DEPARTMENTS": {
      return {
        viewDepartment: permission.permit_view_list,
        createDepartment: permission.permit_create,
        editDepartment: permission.permit_edit,
      };
    }
    case "PRODUCTS_INFO": {
      return {
        viewProductsInfo: permission.permit_view_detail,
        viewListProductsInfo: permission.permit_view_list,
        createProductInfo: permission.permit_create,
        exportProductInfo: permission.permit_export,
        editProductInfo: permission.permit_edit,
      };
    }
    case "PRODUCTS_MANUFACTURE": {
      return {
        viewProductsWarehouse: permission.permit_view_detail,
        viewListProductsWarehouse: permission.permit_view_list,
        createProductWarehouse: permission.permit_create,
        exportProductWarehouse: permission.permit_export,
        editProductWarehouse: permission.permit_edit,
      };
    }
    case "PROGRAMS_POINTS": {
      return {
        viewProgramPoint: permission.permit_view_detail,
        viewListProgramPoint: permission.permit_view_list,
        createProgramPoint: permission.permit_create,
        editProgramPoint: permission.permit_edit,
      };
    }
    case "PROGRAMS_TOPUPS": {
      return {
        viewProgramTopup: permission.permit_view_detail,
        viewListProgramTopup: permission.permit_view_list,
        createProgramTopup: permission.permit_create,
        editProgramTopup: permission.permit_edit,
      };
    }
    case "PROGRAM_CHANCE": {
      return {
        viewProgramChance: permission.permit_view_detail,
        viewListProgramChance: permission.permit_view_list,
        createProgramChance: permission.permit_create,
        editProgramChance: permission.permit_edit,
      };
    }
    case "REPORTS_CUSTOMER": {
      return {
        reportCustomer: permission.permit_view_list,
      };
    }

    case "REPORTS_IQR": {
      return {
        reportIQR: permission.permit_view_list,
      };
    }
    case "REPORTS_POINT": {
      return {
        reportProgramPoint: permission.permit_view_list,
      };
    }
    case "REPORTS_TOPUP": {
      return {
        reportProgramTopup: permission.permit_view_list,
      };
    }
    case "REPORTS_CHANCE": {
      return {
        reportProgramChance: permission.permit_view_list,
      };
    }
    case "REPORTS_SMS": {
      return {
        reportSMS: permission.permit_view_list,
      };
    }
    case "SETTINGS_AREA": {
      return {
        settingArea: permission.permit_view_list,
        createSettingArea: permission.permit_create,
      };
    }
    case "SETTINGS_GROUP_CUSTOMER": {
      return {
        settingGroupCustomer: permission.permit_view_list,
        createSettingGroupCustomer: permission.permit_create,
        editSettingGroupCustomer: permission.permit_edit,
      };
    }
    case "SETTINGS_GROUP_AGENT": {
      return {
        viewRetailerGroup: permission.permit_view_list,
        createRetailerGroup: permission.permit_create,
      };
    }
    case "CUSTOMERS_VALIDATE": {
      return {
        viewValidateCustomer: permission.permit_view_detail,
        viewListValidateCustomer: permission.permit_view_list,
        createValidateCustomer: permission.permit_create,
        exportValiteCustomer: permission.permit_export,
        editValidateCustomer: permission.permit_edit,
      };
    }
    case "CUSTOMERS_UNVALIDATE": {
      return {
        verifyUnvalidateCustomer: permission.permit_edit,
        viewUnValidateCustomer: permission.permit_view_detail,
        viewListUnValidateCustomer: permission.permit_view_list,
        createUnValidateCustomer: permission.permit_create,
        exportUnValiteCustomer: permission.permit_export,
        editUnValidateCustomer: permission.permit_edit,
      };
    }
    case "WAREHOUSES_SEARCH_EXPORT": {
      return {
        warehouseSearchExport: permission.permit_view_list,
      };
    }
    case "WAREHOUSES_SEARCH_IMPORT": {
      return {
        warehouseSearchImport: permission.permit_view_list,
      };
    }
    case "WAREHOUSES_LIST_IMPORT": {
      return {
        warehouseListImport: permission.permit_view_list,
        warehouseExportFileImport: permission.permit_export,
      };
    }
    case "WAREHOUSES_LIST_EXPORT": {
      return {
        warehouseListExport: permission.permit_view_list,
        warehouseExportFileExport: permission.permit_export,
      };
    }
    case "WAREHOUSES_REPORT_EXPORT": {
      return {
        warehouseReportExport: permission.permit_view_list,
      };
    }
    case "WAREHOUSES_INVENTORY_INFO": {
      return {
        warehouseInventoryInfo: permission.permit_view_list,
      };
    }
    default:
      return undefined;
  }
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialValue,
  reducers: {
    updateAccountInfo: (
      state,
      action: PayloadAction<{
        token: string;
        roles: string;
        username: string;
        roles_permission: TPermit[];
      }>
    ) => {
      state.token = action.payload.token;
      state.roles = action.payload.roles;
      state.username = action.payload.username;
      let permission = {
        viewDashboard: 0,
        viewAccounts: 0,
        viewListAccounts: 0,
        createAccount: 0,
        exportAccount: 0,
        editAccount: 0,
        deleteAccount: 0,
        viewValidateCustomer: 0,
        viewListValidateCustomer: 0,
        viewListUnValidateCustomer: 0,
        createValidateCustomer: 0,
        verifyUnvalidateCustomer: 0,
        exportValidateCustomer: 0,
        editValidateCustomer: 0,
        viewUnValidateCustomer: 0,
        createUnValidateCustomer: 0,
        exportUnValidateCustomer: 0,
        editUnValidateCustomer: 0,
        viewEmployee: 0,
        viewListEmployee: 0,
        exportEmployee: 0,
        editEmployee: 0,
        createEmployee: 0,
        viewRoles: 0,
        createRole: 0,
        editRole: 0,
        viewDepartment: 0,
        createDepartment: 0,
        editDepartment: 0,
        viewProductsInfo: 0,
        viewListProductsInfo: 0,
        createProductInfo: 0,
        exportProductInfo: 0,
        editProductInfo: 0,

        viewProductsWarehouse: 0,
        viewListProductsWarehouse: 0,
        createProductWarehouse: 0,
        exportProductWarehouse: 0,
        editProductWarehouse: 0,
        viewProgramPoint: 0,
        viewListProgramPoint: 0,
        createProgramPoint: 0,
        editProgramPoint: 0,
        viewProgramTopup: 0,
        viewListProgramTopup: 0,
        createProgramTopup: 0,
        editProgramTopup: 0,
        viewProgramChance: 0,
        viewListProgramChance: 0,
        createProgramChance: 0,
        editProgramChance: 0,
        reportCustomer: 0,
        reportIQR: 0,
        reportProgramPoint: 0,
        reportProgramTopup: 0,
        reportProgramChance: 0,
        reportSMS: 0,
        settingArea: 0,
        createSettingArea: 0,
        settingGroupCustomer: 0,
        createSettingGroupCustomer: 0,
        editSettingGroupCustomer: 0,
        viewRetailerGroup: 0,
        createRetailerGroup: 0,
        viewOperatorSearchProduct: 0,
        viewOperatorSearchCustomerToday: 0,
        viewOperatorSearchTopupToday: 0,
        viewOperatorSearchCustomerValidateToday: 0,
        viewOperatorSearchCustomerUnValidateToday: 0,
        warehouseSearchExport: 0,
        warehouseSearchImport: 0,
        warehouseListImport: 0,
        warehouseListExport: 0,
        warehouseExportFileImport: 0,
        warehouseExportFileExport: 0,
        warehouseReportExport: 0,
        warehouseInventoryInfo: 0,
      };
      action.payload.roles_permission.forEach((item) => {
        const parseValue = onPermissionFeature(item);
        if (parseValue) {
          //@ts-ignore
          permission = {
            ...permission,
            ...parseValue,
          };
        }
      });
      state.permission = permission;
      return state;
    },
    resetAccountInfo: (state) => {
      state = initialValue;
      return state;
    },
    resetToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      return state;
    },
  },
});

export const { updateAccountInfo, resetAccountInfo, resetToken } =
  authSlice.actions;
export default authSlice.reducer;
