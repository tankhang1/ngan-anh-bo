import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialValue = {
  token: "",
  roles: "",
  username: "",
  permission: {
    viewDashboard: false,
    viewAccounts: false,
    createAccount: false,
    exportAccount: false,
    deleteAccount: false,
    viewCustomer: false,
    createCustomer: false,
    verifyCustomer: false,
    exportCustomer: false,
    editCustomer: false,
    viewEmployee: false,
    exportEmployee: false,
    editEmployee: false,
    createEmployee: false,
    viewRoles: false,
    createRole: false,
    editRole: false,
    viewDepartment: false,
    createDepartment: false,
    editDepartment: false,
    viewProducts: false,
    createProduct: false,
    exportProduct: false,
    editProduct: false,
    viewProgramPoint: false,
    createProgramPoint: false,
    editProgramPoint: false,
    viewProgramTopup: false,
    createProgramTopup: false,
    editProgramTopup: false,
    reportAgent: false,
    reportFarmer: false,
    reportIQR: false,
    reportProgramPoint: false,
    reportProgramTopup: false,
    settingArea: false,
    createSettingArea: false,
    settingGroupCustomer: false,
    createSettingGroupCustomer: false,
    editSettingGroupCustomer: false,
    viewRetailerGroup: false,
    createRetailerGroup: false,
    viewOperator: false,
  },
};
const authSlice = createSlice({
  name: "authSlice",
  initialState: initialValue,
  reducers: {
    updateAccountInfo: (
      state,
      action: PayloadAction<{ token: string; roles: string; username: string }>
    ) => {
      state.token = action.payload.token;
      state.roles = action.payload.roles;
      state.username = action.payload.username;
      if (state.roles === "ROLE_AGENT") {
        state.permission = {
          viewDashboard: true,
          viewAccounts: false,
          exportAccount: false,
          createAccount: false,
          deleteAccount: false,
          viewCustomer: true,
          createCustomer: true,
          verifyCustomer: true,
          exportCustomer: false,
          editCustomer: true,
          viewEmployee: false,
          editEmployee: false,
          exportEmployee: false,

          createEmployee: false,
          viewRoles: false,
          createRole: false,
          editRole: false,
          viewDepartment: false,
          createDepartment: false,
          editDepartment: false,
          viewProducts: false,
          createProduct: false,
          editProduct: false,
          exportProduct: false,

          viewProgramPoint: false,
          createProgramPoint: false,
          editProgramPoint: false,
          viewProgramTopup: false,
          createProgramTopup: false,
          editProgramTopup: false,
          reportAgent: false,
          reportFarmer: false,
          reportIQR: false,
          reportProgramPoint: false,
          reportProgramTopup: false,
          settingArea: false,
          createSettingArea: false,
          settingGroupCustomer: false,
          createSettingGroupCustomer: false,
          editSettingGroupCustomer: false,
          viewOperator: false,
          viewRetailerGroup: false,
          createRetailerGroup: false,
        };
      }
      if (state.roles === "ROLE_SUPERADMIN") {
        state.permission = {
          viewDashboard: true,
          viewAccounts: true,
          createAccount: true,
          exportAccount: true,
          deleteAccount: true,
          viewCustomer: true,
          createCustomer: true,
          verifyCustomer: true,
          exportCustomer: true,
          editCustomer: true,
          viewEmployee: true,
          exportEmployee: true,
          editEmployee: true,
          createEmployee: true,
          viewRoles: true,
          createRole: true,
          editRole: true,
          viewDepartment: true,
          createDepartment: true,
          editDepartment: true,
          viewProducts: true,
          createProduct: true,
          exportProduct: true,

          editProduct: true,
          viewProgramPoint: true,
          createProgramPoint: true,
          editProgramPoint: true,
          viewProgramTopup: true,
          createProgramTopup: true,
          editProgramTopup: true,
          reportAgent: true,
          reportFarmer: true,
          reportIQR: true,
          reportProgramPoint: true,
          reportProgramTopup: true,
          settingArea: true,
          createSettingArea: true,
          settingGroupCustomer: true,
          createSettingGroupCustomer: true,
          editSettingGroupCustomer: true,
          viewOperator: true,
          viewRetailerGroup: true,
          createRetailerGroup: true,
        };
      }
      if (state.roles === "ROLE_MARKETING") {
        state.permission = {
          viewDashboard: true,
          viewAccounts: false,
          createAccount: false,
          exportAccount: false,
          deleteAccount: false,
          viewCustomer: true,
          createCustomer: true,
          verifyCustomer: false,
          exportCustomer: false,
          editCustomer: false,
          viewEmployee: true,
          exportEmployee: false,
          editEmployee: false,
          createEmployee: false,
          viewRoles: false,
          createRole: false,
          editRole: false,
          viewDepartment: false,
          createDepartment: false,
          editDepartment: false,
          viewProducts: true,
          createProduct: false,
          exportProduct: false,
          editProduct: false,
          viewProgramPoint: true,
          createProgramPoint: false,
          editProgramPoint: true,
          viewProgramTopup: true,
          createProgramTopup: false,
          editProgramTopup: true,
          reportAgent: false,
          reportFarmer: false,
          reportIQR: true,
          reportProgramPoint: false,
          reportProgramTopup: true,
          settingArea: false,
          createSettingArea: false,
          settingGroupCustomer: false,
          createSettingGroupCustomer: false,
          editSettingGroupCustomer: false,
          viewOperator: false,
          viewRetailerGroup: true,
          createRetailerGroup: true,
        };
      }
      if (state.roles === "ROLE_BUSINESS") {
        state.permission = {
          viewDashboard: false,
          viewAccounts: false,
          createAccount: false,
          exportAccount: false,
          deleteAccount: false,
          viewCustomer: true,
          createCustomer: true,
          verifyCustomer: true,
          exportCustomer: true,
          editCustomer: false,
          viewEmployee: true,
          exportEmployee: true,
          editEmployee: true,
          createEmployee: true,
          viewRoles: true,
          createRole: true,
          editRole: true,
          viewDepartment: false,
          createDepartment: false,
          editDepartment: false,
          viewProducts: false,
          createProduct: false,
          exportProduct: false,
          editProduct: false,
          viewProgramPoint: false,
          createProgramPoint: false,
          editProgramPoint: false,
          viewProgramTopup: false,
          createProgramTopup: false,
          editProgramTopup: false,
          reportAgent: true,
          reportFarmer: true,
          reportIQR: true,
          reportProgramPoint: true,
          reportProgramTopup: true,
          settingArea: true,
          createSettingArea: true,
          settingGroupCustomer: false,
          createSettingGroupCustomer: false,
          editSettingGroupCustomer: false,
          viewOperator: false,
          viewRetailerGroup: false,
          createRetailerGroup: false,
        };
      }
      if (state.roles === "ROLE_FINANCE") {
        state.permission = {
          viewDashboard: true,
          viewAccounts: false,
          createAccount: false,
          exportAccount: false,
          deleteAccount: false,
          viewCustomer: false,
          createCustomer: false,
          verifyCustomer: false,
          exportCustomer: false,
          editCustomer: false,
          viewEmployee: false,
          exportEmployee: false,
          editEmployee: false,
          createEmployee: false,
          viewRoles: false,
          createRole: false,
          editRole: false,
          viewDepartment: false,
          createDepartment: false,
          editDepartment: false,
          viewProducts: false,
          createProduct: false,
          exportProduct: false,
          editProduct: false,
          viewProgramPoint: false,
          createProgramPoint: false,
          editProgramPoint: false,
          viewProgramTopup: false,
          createProgramTopup: false,
          editProgramTopup: false,
          reportAgent: false,
          reportFarmer: false,
          reportIQR: false,
          reportProgramPoint: false,
          reportProgramTopup: false,
          settingArea: false,
          createSettingArea: false,
          settingGroupCustomer: false,
          createSettingGroupCustomer: false,
          editSettingGroupCustomer: false,
          viewRetailerGroup: false,
          createRetailerGroup: false,
          viewOperator: false,
        };
      }
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