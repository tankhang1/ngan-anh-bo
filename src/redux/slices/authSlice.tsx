import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TFeatureCode =
  | "DASHBOARD"
  | "ACCOUNTS"
  | "OPERATORS_iQr_TODAY"
  | "OPERATORS_CUSTOMER_UNVALIDATE_TODAY"
  | "OPERATORS_CUSTOMER_VALIDATE_TODAY"
  | "OPERATORS_TOPUP_TODAY"
  | "OPERATORS_GIFT_TODAY"
  | "OPERATORS_SMS_GATEWAY"
  | "OPERATORS_SMS_BRANDNAME"
  | "CUSTOMERS_SEARCH"
  | "CUSTOMERS_VALIDATE"
  | "CUSTOMERS_UNVALIDATE"
  | "EMPLOYEES_INFO"
  | "EMPLOYEES_ROLES"
  | "EMPLOYEES_DEPARTMENTS"
  | "PRODUCTS_SEARCH_PRODUCT"
  | "PRODUCTS_MARKETING_INFO"
  | "PRODUCTS_PRODUCTION_INFO"
  | "PROGRAMS_POINTS"
  | "PROGRAMS_TOPUPS"
  | "PROGRAM_CHANCE"
  | "REPORTS_CUSTOMER"
  | "REPORTS_IQR"
  | "REPORTS_POINT"
  | "REPORTS_TOPUP"
  | "REPORTS_CHANCE"
  | "REPORTS_SMS"
  | "REPORTS_SMS_BRANDNAME"
  | "REPORTS_IQR_SKU"
  | "REPORTS_IQR_BIN"
  | "SETTINGS_AREA"
  | "SETTINGS_GROUP_CUSTOMER"
  | "SETTINGS_RETAILER_GROUP"
  | "SETTINGS_BRAND"
  | "SETTINGS_INDICATION"
  | "SETTINGS_FORMULATION"
  | "WAREHOUSES_CREATE_MATERIAL"
  | "WAREHOUSES_FILL_MATERIAL"
  | "WAREHOUSES_REPORT_INGREDIENT"
  | "WAREHOUSES_REPORT_INGREDIENT_PACKING"
  | "WAREHOUSES_SEARCH_BATCH_NUMBER"
  | "WAREHOUSES_CREATE_MANUFACTURE_ORDER"
  | "WAREHOUSES_SEARCH_RETAILER_1"
  | "WAREHOUSES_PRODUCTION_INFO"
  | "WAREHOUSES_REPORT_INVENTORY"
  | "WAREHOUSES_SEARCH_EXPORT"
  | "WAREHOUSES_SEARCH_IMPORT"
  | "WAREHOUSES_SEARCH_TODAY"
  | "WAREHOUSES_LIST_IMPORT"
  | "WAREHOUSES_LIST_EXPORT"
  | "WAREHOUSES_REPORT_EXPORT"
  | "WAREHOUSES_REPORT_RETURN"

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
    //Dashboard
    viewDashboard: 0,
    //Accounts
    viewAccounts: 0,
    viewListAccounts: 0,
    createAccount: 0,
    exportAccount: 0,
    editAccount: 0,
    deleteAccount: 0,
    //Search Customer
    viewSearchCustomer: 0,
    //Customer Validate
    viewValidateCustomer: 0,
    viewListValidateCustomer: 0,
    createValidateCustomer: 0,
    exportValidateCustomer: 0,
    editValidateCustomer: 0,
    //Customer UnValidate
    viewListUnValidateCustomer: 0,
    verifyUnvalidateCustomer: 0,
    viewUnValidateCustomer: 0,
    createUnValidateCustomer: 0,
    exportUnValidateCustomer: 0,
    editUnValidateCustomer: 0,
    //Employee
    viewEmployee: 0,
    viewListEmployee: 0,
    exportEmployee: 0,
    editEmployee: 0,
    createEmployee: 0,
    //Role
    viewRoles: 0,
    createRole: 0,
    editRole: 0,
    //Department
    viewDepartment: 0,
    createDepartment: 0,
    editDepartment: 0,
    //Product Search
    viewSearchProduct: 0,
    //Product Marketing
    viewProductsMarketingInfo: 0,
    viewListProductsMarketingInfo: 0,
    createProductMarketingInfo: 0,
    exportProductMarketingInfo: 0,
    editProductMarketingInfo: 0,
    //Product Production Info
    viewProductsProductionInfo: 0,
    viewListProductsProductionInfo: 0,
    createProductProductionInfo: 0,
    exportProductProductionInfo: 0,
    editProductProductionInfo: 0,

    //Warehouse create material
    viewWarehouseCreateMaterial:0,
    //Warehouse fill material
    viewWarehouseFillMaterial:0,
    //Warehoue report ingredient
    viewWarehouseReportIngredient: 0,
    updateWarehouseIngredient:0,
    //Warehouse report ingredient packing
    viewWarehouseReportIngredientPacking:0,
    //Warehouse Search Batch Number
    viewSearchBatchNumber: 0,
    //Create Manufacture order
    viewCreateManufacturOrder: 0,
    //Warehouse search import
    viewWarehouseSearchImport:0,
    //Warehouse search export
    viewWarehouseSearchExport:0,
    // Search Retailer 1
    viewSearchRetailer1: 0,
    //Warehouse list export
    viewWarehouseListExport: 0,
    //Warehouse list import
    viewWarehouseListImport: 0,
    //Warehouse search today
    viewWarehouseSearchToday: 0,
    //Warehouse report inventory
    viewWarehouseReportInventory: 0,

    //Program Point
    viewProgramPoint: 0,
    viewListProgramPoint: 0,
    createProgramPoint: 0,
    editProgramPoint: 0,
    //Program Topup
    viewProgramTopup: 0,
    viewListProgramTopup: 0,
    createProgramTopup: 0,
    editProgramTopup: 0,
    //Program Change
    viewProgramChance: 0,
    viewListProgramChance: 0,
    createProgramChance: 0,
    editProgramChance: 0,
    //Report
    reportCustomer: 0,
    reportIQR: 0,
    reportProgramPoint: 0,
    reportProgramTopup: 0,
    reportProgramChance: 0,
    reportSMSGateway: 0,
    reportSMSBrandname: 0,

    //Setting Area
    settingArea: 0,
    createSettingArea: 0,
    //Setting Group Customer
    settingGroupCustomer: 0,
    createSettingGroupCustomer: 0,
    editSettingGroupCustomer: 0,
    //Setting Retailer Group
    viewRetailerGroup: 0,
    createRetailerGroup: 0,
    //Setting Brand
    viewBrand: 0,
    createBrand: 0,
    //Setting Indication
    viewIndication: 0,
    createIndication: 0,
    //Setting Formulation
    viewFormulation: 0,
    createFormulation: 0,
    //Operator
    viewOperatorSMSBrandname:0,
    viewOperatorGiftToday: 0,
    viewOperatorSMSGateway: 0,
    viewOperatorSearchIQRToday: 0,
    viewOperatorSearchTopupToday: 0,
    viewOperatorSearchCustomerValidateToday: 0,
    viewOperatorSearchCustomerUnValidateToday: 0,
    //Warehouse
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
        viewDashboard: permission.permit_view_list || permission.permit_view_detail,
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
    case "OPERATORS_iQr_TODAY": {
      return {
        viewOperatorSearchIQRToday:
          permission.permit_view_detail || permission.permit_view_list,
      };
    }
    case "OPERATORS_GIFT_TODAY": {
      return {
        viewOperatorGiftToday:
          permission.permit_view_detail || permission.permit_view_list,
      };
    }
    case "OPERATORS_SMS_GATEWAY": {
      return {
        viewOperatorSMSGateway:
          permission.permit_view_detail || permission.permit_view_list,
      };
    }
    case "OPERATORS_SMS_BRANDNAME": {
      return {
        viewOperatorSMSGateway:
          permission.permit_view_detail || permission.permit_view_list,
      };
    }
    case "OPERATORS_TOPUP_TODAY": {
      return {
        viewOperatorSearchTopupToday: permission.permit_view_list|| permission.permit_view_detail,
      };
    }
    case "OPERATORS_CUSTOMER_VALIDATE_TODAY": {
      return {
        viewOperatorSearchCustomerValidateToday: permission.permit_view_list||permission.permit_view_detail,
      };
    }
    case "OPERATORS_CUSTOMER_UNVALIDATE_TODAY": {
      return {
        viewOperatorSearchCustomerUnValidateToday: permission.permit_view_list||permission.permit_view_list,
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
        viewRoles: permission.permit_view_list|| permission.permit_view_detail,
        createRole: permission.permit_create,
        editRole: permission.permit_edit,
      };
    }
    case "EMPLOYEES_DEPARTMENTS": {
      return {
        viewDepartment: permission.permit_view_list|| permission.permit_view_detail,
        createDepartment: permission.permit_create,
        editDepartment: permission.permit_edit,
      };
    }
    case "CUSTOMERS_SEARCH": {
      return {
        viewSearchCustomer:
          permission.permit_view_list || permission.permit_view_detail,
      };
    }
    case "PRODUCTS_SEARCH_PRODUCT": {
      return {
        viewSearchProduct:
          permission.permit_view_list || permission.permit_view_detail,
      };
    }
    case "PRODUCTS_MARKETING_INFO": {
      return {
        viewProductsMarketingInfo: permission.permit_view_detail,
        viewListProductsMarketingInfo: permission.permit_view_list,
        createProductMarketingInfo: permission.permit_create,
        exportProductMarketingInfo: permission.permit_export,
        editProductMarketingInfo: permission.permit_edit,
      };
    }
    case "PRODUCTS_PRODUCTION_INFO": {
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
        reportCustomer: permission.permit_view_list||permission.permit_view_detail,
      };
    }

    case "REPORTS_IQR": {
      return {
        reportIQR: permission.permit_view_list||permission.permit_view_detail,
      };
    }
    case "REPORTS_POINT": {
      return {
        reportProgramPoint: permission.permit_view_list||permission.permit_view_detail,
      };
    }
    case "REPORTS_TOPUP": {
      return {
        reportProgramTopup: permission.permit_view_list||permission.permit_view_detail,
      };
    }
    case "REPORTS_CHANCE": {
      return {
        reportProgramChance: permission.permit_view_list || permission.permit_view_detail,
      };
    }
    case "REPORTS_SMS": {
      return {
        reportSMSGateway: permission.permit_view_list||permission.permit_view_detail,
      };
    }
    case "REPORTS_SMS_BRANDNAME":{
      return {
        reportSMSBrandname: permission.permit_view_detail|| permission.permit_view_list
      }
    }
    case "SETTINGS_AREA": {
      return {
        settingArea: permission.permit_view_list,
        createSettingArea: permission.permit_create,
      };
    }
    case "SETTINGS_GROUP_CUSTOMER": {
      return {
        settingGroupCustomer: permission.permit_view_list||permission.permit_view_detail,
        createSettingGroupCustomer: permission.permit_create,
        editSettingGroupCustomer: permission.permit_edit,
      };
    }
    case "SETTINGS_RETAILER_GROUP": {
      return {
        viewRetailerGroup: permission.permit_view_list||permission.permit_view_detail,
        createRetailerGroup: permission.permit_create,
      };
    }
    case "SETTINGS_BRAND": {
      return {
        viewBrand: permission.permit_view_detail || permission.permit_view_list,
        createBrand: permission.permit_create,
      };
    }
    case "SETTINGS_FORMULATION": {
      return {
        viewFormulation:
          permission.permit_view_detail || permission.permit_view_list,
        createFormulation: permission.permit_create,
      };
    }
    case "SETTINGS_INDICATION": {
      return {
        viewIndication:
          permission.permit_view_detail || permission.permit_view_list,
        createIndication: permission.permit_create,
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
        warehouseSearchExport: permission.permit_view_list||permission.permit_view_detail,
      };
    }
    case "WAREHOUSES_SEARCH_IMPORT": {
      return {
        warehouseSearchImport: permission.permit_view_list||permission.permit_view_detail,
      };
    }
    case "WAREHOUSES_LIST_IMPORT": {
      return {
        warehouseListImport: permission.permit_view_list||permission.permit_view_detail,
        warehouseExportFileImport: permission.permit_export,
      };
    }
    case "WAREHOUSES_LIST_EXPORT": {
      return {
        warehouseListExport: permission.permit_view_list||permission.permit_view_detail,
        warehouseExportFileExport: permission.permit_export,
      };
    }
    case "WAREHOUSES_REPORT_EXPORT": {
      return {
        warehouseReportExport: permission.permit_view_list,
      };
    }
    case "WAREHOUSES_REPORT_INVENTORY": {
      return {
        warehouseInventoryInfo: permission.permit_view_list||permission.permit_view_detail,
      };
    }
    case "WAREHOUSES_CREATE_MATERIAL": {
      return {
        viewWarehouseCreateMaterial:permission.permit_view_detail|| permission.permit_view_list      };
    }
    case "WAREHOUSES_FILL_MATERIAL":{
      return {
        viewWarehouseFillMaterial: permission.permit_view_detail||permission.permit_view_list
      }
    }
    case "WAREHOUSES_REPORT_INGREDIENT_PACKING":{
      return {
        viewWarehouseReportIngredientPacking: permission.permit_view_detail|| permission.permit_view_list
      }
    }
    case "WAREHOUSES_SEARCH_BATCH_NUMBER": {
      return {
        viewSearchBatchNumber:
          permission.permit_view_list || permission.permit_view_detail,
      };
    }
    case "WAREHOUSES_SEARCH_RETAILER_1": {
      return {
        viewSearchRetailer1:
          permission.permit_view_list || permission.permit_view_detail,
      };
    }
    case "WAREHOUSES_CREATE_MANUFACTURE_ORDER": {
      return {
        viewCreateManufacturOrder: permission.permit_create,
      };
    }
    case "WAREHOUSES_PRODUCTION_INFO": {
      return {
        viewProductionInfoWarehouse:
          permission.permit_view_detail || permission.permit_view_list,
      };
    }
    case "WAREHOUSES_REPORT_INGREDIENT": {
      return {
        //Warehouse report export
        viewWarehouseReportIngredient:
          permission.permit_view_detail || permission.permit_view_list,
          };
    }
    case "WAREHOUSES_REPORT_RETURN": {
      return {
        viewWarheouseReportReturn:
          permission.permit_view_detail || permission.permit_view_list,
      };
    }
    case "WAREHOUSES_SEARCH_TODAY": {
      return {
        viewWarehouseSearchToday:
          permission.permit_view_detail || permission.permit_view_list,
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
        //Dashboard
        viewDashboard: 0,
        //Accounts
        viewAccounts: 0,
        viewListAccounts: 0,
        createAccount: 0,
        exportAccount: 0,
        editAccount: 0,
        deleteAccount: 0,
        //Search Customer
        viewSearchCustomer: 0,
        //Customer Validate
        viewValidateCustomer: 0,
        viewListValidateCustomer: 0,
        createValidateCustomer: 0,
        exportValidateCustomer: 0,
        editValidateCustomer: 0,
        //Customer UnValidate
        viewListUnValidateCustomer: 0,
        verifyUnvalidateCustomer: 0,
        viewUnValidateCustomer: 0,
        createUnValidateCustomer: 0,
        exportUnValidateCustomer: 0,
        editUnValidateCustomer: 0,
        //Employee
        viewEmployee: 0,
        viewListEmployee: 0,
        exportEmployee: 0,
        editEmployee: 0,
        createEmployee: 0,
        //Role
        viewRoles: 0,
        createRole: 0,
        editRole: 0,
        //Department
        viewDepartment: 0,
        createDepartment: 0,
        editDepartment: 0,
        //Product Search
        viewSearchProduct: 0,
        //Product Marketing
        viewProductsMarketingInfo: 0,
        viewListProductsMarketingInfo: 0,
        createProductMarketingInfo: 0,
        exportProductMarketingInfo: 0,
        editProductMarketingInfo: 0,
        //Product Production Info
        viewProductsProductionInfo: 0,
        viewListProductsProductionInfo: 0,
        createProductProductionInfo: 0,
        exportProductProductionInfo: 0,
        editProductProductionInfo: 0,
    
        //Warehouse create material
        viewWarehouseCreateMaterial:0,
        //Warehouse fill material
        viewWarehouseFillMaterial:0,
        //Warehoue report ingredient
        viewWarehouseReportIngredient: 0,
        updateWarehouseIngredient:0,
        //Warehouse report ingredient packing
        viewWarehouseReportIngredientPacking:0,
        //Warehouse Search Batch Number
        viewSearchBatchNumber: 0,
        //Create Manufacture order
        viewCreateManufacturOrder: 0,
        //Warehouse search import
        viewWarehouseSearchImport:0,
        //Warehouse search export
        viewWarehouseSearchExport:0,
        // Search Retailer 1
        viewSearchRetailer1: 0,
        //Warehouse list export
        viewWarehouseListExport: 0,
        //Warehouse list import
        viewWarehouseListImport: 0,
        //Warehouse search today
        viewWarehouseSearchToday: 0,
        //Warehouse report inventory
        viewWarehouseReportInventory: 0,
    
        //Program Point
        viewProgramPoint: 0,
        viewListProgramPoint: 0,
        createProgramPoint: 0,
        editProgramPoint: 0,
        //Program Topup
        viewProgramTopup: 0,
        viewListProgramTopup: 0,
        createProgramTopup: 0,
        editProgramTopup: 0,
        //Program Change
        viewProgramChance: 0,
        viewListProgramChance: 0,
        createProgramChance: 0,
        editProgramChance: 0,
        //Report
        reportCustomer: 0,
        reportIQR: 0,
        reportProgramPoint: 0,
        reportProgramTopup: 0,
        reportProgramChance: 0,
        reportSMSGateway: 0,
        reportSMSBrandname: 0,
    
        //Setting Area
        settingArea: 0,
        createSettingArea: 0,
        //Setting Group Customer
        settingGroupCustomer: 0,
        createSettingGroupCustomer: 0,
        editSettingGroupCustomer: 0,
        //Setting Retailer Group
        viewRetailerGroup: 0,
        createRetailerGroup: 0,
        //Setting Brand
        viewBrand: 0,
        createBrand: 0,
        //Setting Indication
        viewIndication: 0,
        createIndication: 0,
        //Setting Formulation
        viewFormulation: 0,
        createFormulation: 0,
        //Operator
        viewOperatorSMSBrandname:0,
        viewOperatorGiftToday: 0,
        viewOperatorSMSGateway: 0,
        viewOperatorSearchIQRToday: 0,
        viewOperatorSearchTopupToday: 0,
        viewOperatorSearchCustomerValidateToday: 0,
        viewOperatorSearchCustomerUnValidateToday: 0,
        //Warehouse
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
