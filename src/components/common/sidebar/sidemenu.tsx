//Icons

import store from "../../../redux/store";

const icon1 = <i className="bx bx-desktop"></i>;
const icon2 = <i className="ti ti-box"></i>;
const icon16 = <i className="bx bx-user"></i>;
const icon17 = <i className="ti ti-settings-automation"></i>;
const icon18 = <i className="ti ti-chart-infographic"></i>;
const icon3 = <i className="ti ti-settings"></i>;
const icon4 = <i className="bi bi-people"></i>;
const icon5 = <i className="bx bx-user-voice"></i>;
const icon6 = <i className="bx bx-user-circle"></i>;
const icon7 = <i className="ti ti-building-warehouse"></i>;
export const MENU_KEY = {
  MAIN_TITLE: "MAIN_TITLE",
  MANAGE_TITLE: "MANAGE_TITLE",
  MANAGE_OPERATOR: "MANAGE_OPERATOR",
  MANAGE_WAREHOUSE: "MANAGE_WAREHOUSE",
  CUSTOMERS: "CUSTOMERS",
  MANAGE_PERSONEL: "MANAGE_PERSONEL",
  PRODUCTS: "PRODUCTS",
  MANAGE_PROGRAM: "MANAGE_PROGRAM",
  REPORT_TITLE: "REPORT_TITLE",
  MANAGE_REPORT: "MANAGE_REPORT",
  SETTING_TITLE: "SETTING_TITLE",
  MANAGE_SETTING: "MANAGE_SETTING",

  DASHBOARD: "DASHBOARD",
  ACCOUNTS: "ACCOUNTS",
  OPERATORS_iQr_TODAY: "OPERATORS_iQr_TODAY",
  OPERATORS_CUSTOMER_UNVALIDATE_TODAY: "OPERATORS_CUSTOMER_UNVALIDATE_TODAY",
  OPERATORS_CUSTOMER_VALIDATE_TODAY: "OPERATORS_CUSTOMER_VALIDATE_TODAY",
  OPERATORS_TOPUP_TODAY: "OPERATORS_TOPUP_TODAY",
  OPERATORS_GIFT_TODAY: "OPERATORS_GIFT_TODAY",
  OPERATORS_SMS_GATEWAY: "OPERATORS_SMS_GATEWAY",
  CUSTOMERS_SEARCH: "CUSTOMERS_SEARCH",
  CUSTOMERS_VALIDATE: "CUSTOMERS_VALIDATE",
  CUSTOMERS_UNVALIDATE: "CUSTOMERS_UNVALIDATE",
  EMPLOYEES_INFO: "EMPLOYEES_INFO",
  EMPLOYEES_ROLES: "EMPLOYEES_ROLES",
  EMPLOYEES_DEPARTMENTS: "EMPLOYEES_DEPARTMENTS",
  PRODUCTS_SEARCH_PRODUCT: "PRODUCTS_SEARCH_PRODUCT",
  PRODUCTS_MARKETING_INFO: "PRODUCTS_MARKETING_INFO",
  PRODUCTS_PRODUCTION_INFO: "PRODUCTS_PRODUCTION_INFO",
  PROGRAMS_POINTS: "PROGRAMS_POINTS",
  PROGRAMS_TOPUPS: "PROGRAMS_TOPUPS",
  PROGRAM_CHANCE: "PROGRAM_CHANCE",
  REPORTS_CUSTOMER: "REPORTS_CUSTOMER",
  REPORTS_IQR: "REPORTS_IQR",
  REPORTS_POINT: "REPORTS_POINT",
  REPORTS_TOPUP: "REPORTS_TOPUP",
  REPORTS_CHANCE: "REPORTS_CHANCE",
  REPORTS_SMS: "REPORTS_SMS",
  REPORTS_SMS_BRANDNAME: "REPORTS_SMS_BRANDNAME",
  REPORTS_IQR_SKU: "REPORTS_IQR_SKU",
  REPORTS_IQR_BIN: "REPORTS_IQR_BIN",
  SETTINGS_AREA: "SETTINGS_AREA",
  SETTINGS_GROUP_CUSTOMER: "SETTINGS_GROUP_CUSTOMER",
  SETTINGS_RETAILER_GROUP: "SETTINGS_RETAILER_GROUP",
  SETTINGS_BRAND: "SETTINGS_BRAND",
  SETTINGS_INDICATION: "SETTINGS_INDICATION",
  SETTINGS_FORMULATION: "SETTINGS_FORMULATION",
  WAREHOUSES_CREATE_MATERIAL: "WAREHOUSES_CREATE_MATERIAL",
  WAREHOUSES_FILL_MATERIAL: "WAREHOUSES_FILL_MATERIAL",
  WAREHOUSES_MATERIAL: "WAREHOUSES_MATERIAL",
  WAREHOUSES_SEARCH_BATCH_NUMBER: "WAREHOUSES_SEARCH_BATCH_NUMBER",
  WAREHOUSES_SEARCH_RETAILER_1: "WAREHOUSES_SEARCH_RETAILER_1",
  WAREHOUSES_CREATE_MANUFACTURE_ORDER: "WAREHOUSES_CREATE_MANUFACTURE_ORDER",
  WAREHOUSES_PRODUCTION_INFO: "WAREHOUSES_PRODUCTION_INFO",
  WAREHOUSES_REPORT_INVENTORY: "WAREHOUSES_REPORT_INVENTORY",
  WAREHOUSES_SEARCH_EXPORT: "WAREHOUSES_SEARCH_EXPORT",
  WAREHOUSES_SEARCH_IMPORT: "WAREHOUSES_SEARCH_IMPORT",
  WAREHOUSES_SEARCH_TODAY: "WAREHOUSES_SEARCH_TODAY",
  WAREHOUSES_LIST_IMPORT: "WAREHOUSES_LIST_IMPORT",
  WAREHOUSES_LIST_EXPORT: "WAREHOUSES_LIST_EXPORT",
  WAREHOUSES_REPORT_EXPORT: "WAREHOUSES_REPORT_EXPORT",
  WAREHOUSES_REPORT_RETURN: "WAREHOUSES_REPORT_RETURN",
  WAREHOUSES_REPORT_INGREDIENT: "WAREHOUSES_REPORT_INGREDIENT",
  WAREHOUSES_REPORT_INGREDIENT_PACKING: "WAREHOUSES_REPORT_INGREDIENT_PACKING",
};

export const MENUITEMS = [
  {
    menutitle: "MAIN",
    key: MENU_KEY.MAIN_TITLE,
  },
  {
    path: `${import.meta.env.BASE_URL}dashboards`,
    title: "Dashboard",
    icon: icon1,
    // badgetxt: badge1,
    type: "link",
    active: false,
    selected: false,
    key: MENU_KEY.DASHBOARD,
  },
  {
    menutitle: "Quản lý",
    key: MENU_KEY.MANAGE_TITLE,
  },
  {
    path: `${import.meta.env.BASE_URL}accounts`,
    title: "Tài khoản",
    icon: icon6,
    // badgetxt: badge1,
    type: "link",
    active: false,
    selected: false,
    key: MENU_KEY.ACCOUNTS,
  },
  {
    title: "Thông tin trong ngày",
    icon: icon5,
    badgetxt: "",
    type: "sub",
    active: true,
    selected: false,
    dirchange: false,
    key: MENU_KEY.MANAGE_OPERATOR,
    children: [
      {
        path: `${import.meta.env.BASE_URL}operator/iqr-today`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "iQr",
        key: MENU_KEY.OPERATORS_iQr_TODAY,
      },
      {
        path: `${
          import.meta.env.BASE_URL
        }operator/search-customer-unvalidate-today`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Danh sách chờ xác thực",
        key: MENU_KEY.OPERATORS_CUSTOMER_UNVALIDATE_TODAY,
      },
      {
        path: `${
          import.meta.env.BASE_URL
        }operator/search-customer-validate-today`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Danh sách đã xác thực",
        key: MENU_KEY.OPERATORS_CUSTOMER_VALIDATE_TODAY,
      },
      {
        path: `${import.meta.env.BASE_URL}operator/search-topup-today`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Topup",
        key: MENU_KEY.OPERATORS_TOPUP_TODAY,
      },
      // {
      //   path: `${import.meta.env.BASE_URL}operator/customer-sms-6068`,
      //   type: "link",
      //   active: false,
      //   selected: false,
      //   dirchange: false,
      //   title: "SMS 6088",
      //   key: MENU_KEY.OPERATORS_CUSTOMER_SMS_6088,
      // },
      {
        path: `${import.meta.env.BASE_URL}operator/topup/list`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Quà tặng",
        key: MENU_KEY.OPERATORS_GIFT_TODAY,
      },
      {
        path: `${import.meta.env.BASE_URL}operator/sms-gateway`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "SMS Gateway",
        key: MENU_KEY.OPERATORS_SMS_GATEWAY,
      },
    ],
  },
  {
    title: "Khách hàng",
    icon: icon4,
    badgetxt: "",
    type: "sub",
    active: true,
    selected: false,
    dirchange: false,
    key: MENU_KEY.CUSTOMERS,
    children: [
      {
        path: `${import.meta.env.BASE_URL}customer/search`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Tra cứu",
        key: MENU_KEY.CUSTOMERS_SEARCH,
      },
      {
        path: `${import.meta.env.BASE_URL}customer/validate`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Đã xác thực",
        key: MENU_KEY.CUSTOMERS_VALIDATE,
      },
      {
        path: `${import.meta.env.BASE_URL}customer/unvalidate`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Chờ xác thực",
        key: MENU_KEY.CUSTOMERS_UNVALIDATE,
      },
    ],
  },
  {
    title: "Nhân sự",
    icon: icon16,
    type: "sub",
    path: `${import.meta.env.BASE_URL}employee`,
    active: false,
    key: MENU_KEY.MANAGE_PERSONEL,
    children: [
      {
        path: `${import.meta.env.BASE_URL}employee`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Thông tin nhân sự",
        key: MENU_KEY.EMPLOYEES_INFO,
      },
      {
        path: `${import.meta.env.BASE_URL}employee/role`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Quản lý cấp bậc",
        key: MENU_KEY.EMPLOYEES_ROLES,
      },
      {
        path: `${import.meta.env.BASE_URL}employee/department`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Quản lý bộ phận",
        key: MENU_KEY.EMPLOYEES_DEPARTMENTS,
      },
    ],
  },
  {
    title: "Sản phẩm",
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    icon: icon2,
    path: `${import.meta.env.BASE_URL}product`,
    key: MENU_KEY.PRODUCTS,
    children: [
      {
        path: `${import.meta.env.BASE_URL}product/search`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Tra cứu",
        key: MENU_KEY.PRODUCTS_SEARCH_PRODUCT,
      },
      {
        path: `${import.meta.env.BASE_URL}product/info`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Thông tin Marketing",
        key: MENU_KEY.PRODUCTS_MARKETING_INFO,
      },
      {
        path: `${import.meta.env.BASE_URL}product/warehouse`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Thông tin Sản xuất",
        key: MENU_KEY.PRODUCTS_PRODUCTION_INFO,
      },
    ],
  },
  {
    title: "Chương trình",
    icon: icon17,
    badgetxt: "",
    type: "sub",
    active: true,
    selected: false,
    dirchange: false,
    key: MENU_KEY.MANAGE_PROGRAM,

    children: [
      {
        path: `${import.meta.env.BASE_URL}program/point`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Tích điểm",
        key: MENU_KEY.PROGRAMS_POINTS,
      },
      {
        path: `${import.meta.env.BASE_URL}program/topup`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Topup",
        key: MENU_KEY.PROGRAMS_TOPUPS,
      },
      {
        path: `${import.meta.env.BASE_URL}program/chance`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "May rủi",
        key: MENU_KEY.PROGRAM_CHANCE,
      },
    ],
  },
  {
    title: "Thông tin kho",
    icon: icon7,
    badgetxt: "",
    type: "sub",
    active: true,
    selected: false,
    dirchange: false,
    key: MENU_KEY.MANAGE_WAREHOUSE,
    children: [
      {
        title: "Nguyên vật liệu",
        icon: icon7,
        badgetxt: "",
        type: "sub",
        active: true,
        selected: false,
        dirchange: false,
        key: MENU_KEY.WAREHOUSES_MATERIAL,
        children: [
          {
            path: `${import.meta.env.BASE_URL}warehouse/material-create`,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Tạo mã",
            key: MENU_KEY.WAREHOUSES_CREATE_MATERIAL,
          },
          {
            path: `${import.meta.env.BASE_URL}warehouse/material-fill`,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Nhập nguyên vật liệu",
            key: MENU_KEY.WAREHOUSES_FILL_MATERIAL,
          },
          {
            path: `${import.meta.env.BASE_URL}warehouse/report-material`,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Danh sách vật tư",
            key: MENU_KEY.WAREHOUSES_REPORT_INGREDIENT,
          },
          {
            path: `${
              import.meta.env.BASE_URL
            }warehouse/report-material-packing`,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Danh sách nguyên vật liệu",
            key: MENU_KEY.WAREHOUSES_REPORT_INGREDIENT_PACKING,
          },
        ],
      },
      {
        title: "Đóng gói",
        icon: icon7,
        badgetxt: "",
        type: "sub",
        active: true,
        selected: false,
        dirchange: false,
        key: MENU_KEY.WAREHOUSES_MATERIAL,
        children: [
          {
            path: `${import.meta.env.BASE_URL}warehouse/search/batch-number`,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Tìm kiếm mã lô",
            key: MENU_KEY.WAREHOUSES_SEARCH_BATCH_NUMBER,
          },
          {
            path: `${
              import.meta.env.BASE_URL
            }warehouse/manufacture-order/create`,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Tạo lệnh sản xuất",
            key: MENU_KEY.WAREHOUSES_CREATE_MANUFACTURE_ORDER,
          },
        ],
      },
      {
        title: "Kho",
        icon: icon7,
        badgetxt: "",
        type: "sub",
        active: true,
        selected: false,
        dirchange: false,
        key: MENU_KEY.WAREHOUSES_MATERIAL,
        children: [
          {
            path: `${
              import.meta.env.BASE_URL
            }warehouse/import/search-warehouse-import`,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Tra cứu nhập kho",
            key: MENU_KEY.WAREHOUSES_SEARCH_IMPORT,
          },
          {
            path: `${
              import.meta.env.BASE_URL
            }warehouse/export/search-warehouse-export`,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Tra cứu xuất kho",
            key: MENU_KEY.WAREHOUSES_SEARCH_EXPORT,
          },
          {
            path: `${import.meta.env.BASE_URL}warehouse/search/retailer1`,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Tìm kiếm mã KH-XK",
            key: MENU_KEY.WAREHOUSES_SEARCH_RETAILER_1,
          },

          {
            path: `${import.meta.env.BASE_URL}warehouse/export`,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Danh sách xuất kho",
            key: MENU_KEY.WAREHOUSES_LIST_EXPORT,
          },
          {
            path: `${import.meta.env.BASE_URL}warehouse/import`,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Danh sách nhập kho",
            key: MENU_KEY.WAREHOUSES_LIST_IMPORT,
          },
          {
            path: `${import.meta.env.BASE_URL}warehouse/report/export`,
            type: "link",
            active: false,
            selected: false,
            dirchange: false,
            title: "Báo cáo trong ngày",
            key: MENU_KEY.WAREHOUSES_SEARCH_TODAY,
          },
        ],
      },

      {
        path: `${import.meta.env.BASE_URL}warehouse/inventory`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Báo cáo tồn kho",
        key: MENU_KEY.WAREHOUSES_REPORT_INVENTORY,
      },
    ],
  },

  {
    menutitle: "Báo cáo",
    key: MENU_KEY.REPORT_TITLE,
  },
  {
    path: `${import.meta.env.BASE_URL}report`,
    title: "Báo cáo",
    icon: icon18,
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    key: MENU_KEY.MANAGE_REPORT,

    children: [
      {
        path: `${import.meta.env.BASE_URL}report/customer`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Khách hàng",
        key: MENU_KEY.REPORTS_CUSTOMER,
      },
      {
        path: `${import.meta.env.BASE_URL}report/iQr`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "iQr",
        key: MENU_KEY.REPORTS_IQR,
      },
      {
        path: `${import.meta.env.BASE_URL}report/program-point`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Chương trình tích điểm",
        key: MENU_KEY.REPORTS_POINT,
      },
      {
        path: `${import.meta.env.BASE_URL}report/topup`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Chương trình topup",
        key: MENU_KEY.REPORTS_TOPUP,
      },
      {
        path: `${import.meta.env.BASE_URL}report/chance`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Chương trình may rủi",
        key: MENU_KEY.REPORTS_CHANCE,
      },
      {
        path: `${import.meta.env.BASE_URL}report/sms`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "SMS Gateway",
        key: MENU_KEY.REPORTS_SMS,
      },
      {
        path: `${import.meta.env.BASE_URL}report/sms-brandname`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "SMS Brandname",
        key: MENU_KEY.REPORTS_SMS_BRANDNAME,
      },
    ],
  },
  {
    menutitle: "Cài đặt",
    key: MENU_KEY.SETTING_TITLE,
  },
  {
    title: "Cài đặt",
    type: "sub",
    active: false,
    selected: false,
    dirchange: false,
    icon: icon3,
    key: MENU_KEY.MANAGE_SETTING,

    children: [
      {
        path: `${import.meta.env.BASE_URL}setting/area`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Phân vùng",
        key: MENU_KEY.SETTINGS_AREA,
      },
      {
        path: `${import.meta.env.BASE_URL}setting/group-customer`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Nhóm khách hàng",
        key: MENU_KEY.SETTINGS_GROUP_CUSTOMER,
      },
      {
        path: `${import.meta.env.BASE_URL}setting/group-retailer`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Nhóm đại lý",
        key: MENU_KEY.SETTINGS_RETAILER_GROUP,
      },
      {
        path: `${import.meta.env.BASE_URL}setting/brand`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Nhãn hàng",
        key: MENU_KEY.SETTINGS_BRAND,
      },
      {
        path: `${import.meta.env.BASE_URL}setting/indication`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Nhóm thuốc",
        key: MENU_KEY.SETTINGS_INDICATION,
      },
      {
        path: `${import.meta.env.BASE_URL}setting/formulation`,
        type: "link",
        active: false,
        selected: false,
        dirchange: false,
        title: "Dạng thuốc",
        key: MENU_KEY.SETTINGS_FORMULATION,
      },
    ],
  },
];
