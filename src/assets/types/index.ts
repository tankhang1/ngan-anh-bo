import { TPermit } from "../../redux/slices/authSlice";

/**Agent */
export type TAgent = {
  id: number;
  customer_code: string; //hiện
  customer_type: string; // hiện
  customer_name: string | undefined; // hiện
  customer_province: string | undefined; // hiện
  phone: string; // hiện
  province: string; // hiện
  province_name: string;
  name: string; // hiện
  time: string; // hiện
  time_number: number; //
  source_channel_used: string | undefined; // ẩn
  source_campaign_code: string | undefined; // ẩn
  finger_province: string | undefined; // hiện
  code: string; // hiện
  code_item: number; // ko hiện
  code_hash: string; // ko hiện
  product_item: number;
  product_code: string;
  sign_board: string | undefined;
  otp: string; // ko hiện
  type: number; //không hiện
  verify: number; // ko hiện trạng thái
  v_id: string; // ko hiện
  status: number; //  trạng thái xác thực đã verify ko chuyển được
  info_primary: number; // hiện toggle
  object_primary: string | undefined; // ko hiện ( này là thằng chính nào)
  time_verify: string | undefined; // nếu status verify thì hiện thời gian xác nhận đối tượng là nông dân / đại lý /...
  time_confirm: string | undefined; // xác nhận được tham gia chương trình tích lũy với số điện thoại
  customer_address: string | undefined;
  customer_district: string | undefined;
  customer_area: string;
  customer_province_name: string;
  gender: 0 | 1; // 0: nữ, 1: nam
  email?: string;
  birthday?: number; //yyyyMMdd
  citizen_number: number; // CCCD
  citizen_day: string; // Ngày cấp CCCD
  business_docu: string; //  giấy phép kinh doanh
  tags: string; // cây trồng chính
  note: string; //Ghi chú
};

export type TAgentDashboardTable = Pick<
  TAgent,
  "id" | "name" | "phone" | "province" | "time_verify" | "status"
>;

/**Product */
export enum ProductTypeEnum {
  PACKET,
  BAG,
  BOTTLE,
  BOX,
  BIN,
}
export type TProduct = {
  id: number;
  uuid: string;
  code: string;
  code_bin: string;
  code_box: string;
  qr_mapping: boolean | number;
  qr_printing: boolean | number;
  description: string;
  name_display_root: string;
  name_display: string;
  name_display_label: string;
  brand_name: string;
  brand_code: string;
  product_name_detail: string;
  category_code: string;
  category_name: string;
  pack_configuration: string;
  short_info: string;
  detail_url: string;
  net_weight: number | undefined;
  unit: string;
  version: string;
  type: ProductTypeEnum | string;
  sku_bin: number | undefined;
  sku_box: number | undefined;
  bin_pallet: number | undefined;
  mop: number;
  device_code: string;
  ingredient: string;
  ingredient_id: string;
  certificate_of_origin: string;
  point: number;
  c1_price_vnd: number;
  c2_price_vnd: number;
  time_created?: number;
  time_updated?: number;
};

export type TProductForm = Omit<
  TProduct,
  "id" | "uuid" | "code_box" | "version" | "name_display"
>;
export type TProductCreateForm = Omit<
  TProduct,
  | "id"
  | "uuid"
  | "code_box"
  | "version"
  | "name_display"
  | "brand_code"
  | "brand_name"
  | "category_code"
  | "category_name"
>;
export type TBin = {
  id: number;
  code_item: number;
  code: string;
  code_hash: string;
  seri: string;
  bin_seri: string | undefined;
  name_display_root?: string;
  agent_code: string | undefined;
  time_use: string;
  time_use_number: number;
  time_export: string | undefined;
  time_export_number: number;
  procedure_order_detail_item: number;
  description?: string;
  product_code: string;
  product_name: string;
  product_sub_code: string | undefined;
  batch_number: string;
  register_phone: string;
  register_name: string | undefined;
  register_province: string | undefined;
  register_province_name?: string;
  source_channel_used: string | undefined;
  source_campaign_code: string | undefined;
  status: number;
  manufacture_date: number;
  expiration_date: number;
  customer_code: string;
  customer_name: string | undefined;
  customer_province_name?: string;
  customer_province?: string;
  customer_uuid?: string;
  type_use: number; // 0 : Qr Code, 1 : SMS
  point: number;
};
export type TProductDashboardTable = Pick<
  TBin,
  "id" | "seri" | "bin_seri" | "time_use" | "product_name" | "code"
>;

/*Topup */
export type TTopup = {
  id: number;
  phone: string;
  code: string;
  code_hash: string;
  price: number;
  request_id: string;
  response_body: string;
  time: string;
  time_number: number;
};

export type TTopupDashboardTable = Pick<
  TTopup,
  "id" | "phone" | "code" | "price" | "time"
>;

export enum TObjectiveEnum {
  RETAILER1 = "RETAILER1",
  RETAILER2 = "RETAILER2",
  FARMER = "FARMER",
  ANONYMOUS = "ANONYMOUS",
}

export type TAgentForm = {
  customer_type: TObjectiveEnum | string;
  customer_name: string | undefined;
  customer_province: string | undefined;
  phone: string | undefined;
  sign_board: string | undefined; //bảng hiệu
  type: number | undefined; // 0: QrCode , 1: SMS, tạo thì -1
  verify: number | undefined;
  info_primary: number | undefined; //số điện thoại tích điểm hay ko 0, 1
  customer_address: string | undefined;
  customer_district: string | undefined;
  status: number | undefined | string;
  customer_code?: string;
  name?: string;
  province?: string;
  time: string;
  finger_province?: string;
};
export type TFarmerForm = {
  customer_type: TObjectiveEnum;
  customer_name: string | undefined;
  customer_province: string | undefined;
  phone: string | undefined;
  type: number | undefined; // 0: QrCode , 1: SMS, tạo thì -1
  verify: number | undefined;
  info_primary: number | undefined; //số điện thoại tích điểm hay ko 0, 1
  customer_address: string | undefined;
  customer_district: string | undefined;
  status: number | undefined | string;
};
export type TProgramPoint = {
  id: number;
  uuid: number;
  name: string;
  time_create: string;
  time_create_number: number;
  time_start: string;
  time_start_number: number;
  time_end: string;
  time_end_number: number;
  time_deactive: string;
  time_deactive_number: number;
  time_active: string;
  time_active_number: number;
  time_updated?: number;
  status: number;
  point_coefficient: number;
  products: string;
  agents: string;
  locations: string;
  objectives: string;
  retailer_group: string;
  goods_type: string;
};
export type TProgramTopup = {
  id: number;
  uuid: number;
  name: string;
  time_create: string;
  time_create_number: number;
  time_start: string;
  time_start_number: number;
  time_end: string;
  time_end_number: number;
  time_deactive: string;
  time_deactive_num: number; // Note the typo in the image, corrected here to time_deactive_num
  time_active: string;
  time_active_number: number;
  status: number; // Note that the data type in the image is varchar, but here it's changed to string for TypeScript
  price: number;
  agents: string;
  products: string;
  locations: string;
  objectives: string;

  goods_type: string;
  time_updated?: number;
};
export type TPresentType = "FARMER" | "RETAILER";
export type TPresent = {
  id: number;
  gift: string;
  gift_name: string;
  time_end: number;
  time_start: number;
  province_code: string;
  limits: number;
  percent: number;
  product_code: string;
  image_gift: string;
  type: TPresentType;
  limit_per_customer: number; //0 : giới hạn , 1 : ko giới hạn
  counter: number;
};
export type TProgramChance = {
  id: number;
  uuid: string;
  name: string;
  time_end: string;
  time_start: string;
  time_start_number: number;
  time_end_number: number;
  products: string;
  goods_type: string;
  image: string;
  leaflet: string;
  note: string;
  status: number;
};
export type TTopupCreateForm = {
  name: string;
  products: string | string[];
  agents: string | string[];
  price: number | string;
  objectives: string | string[];
  time_end: string;
  time_start: string;
  locations: string | string[];
  status: number;
  uuid?: number;

  goods_type: string;
};

export type TPointCreateForm = {
  name: string;
  products: string | string[];
  agents: string | string[];
  point_coefficient: number | string;
  objectives: string | string[];
  time_end: string;
  time_start: string;
  locations: string | string[];
  uuid?: number;
  status: number | string;
  time_start_number?: number | string;
  time_end_number?: number | string;
  retailer_group?: string;
  agent_or_group_agent: number;
  goods_type: string;
};

export type TPointTableDashboard = {
  id: number;
  program_uuid: number;
  program_name: string;
  customer_code: string;
  customer_name: string;
  province: string;
  phone: string;
  point: number;
  point_coefficient: number;
  c1_price_vnd: number;
  c2_price_vnd: number;
  code: string;
  code_hash: string;
  product_code: string;
  product_name: string;
  time_earn: string;
  time_earn_number: number;
};
export type TTopupTableDashboard = {
  id: number;
  program_uuid: number;
  program_name: string;
  code: string;
  code_hash: string;
  price: number;
  product_code: string;
  product_name: string;
  customer_code: string;
  customer_name: string;
  phone: string;
  province: string;
  agent_code: string;
  time_topup: string;
  time_topup_number: number;
  request_id: string;
  response_body: string;
};

export type TProgramPointDetail = {
  id: number;
  program_name: string;
  program_uuid: string;
  customer_code: string | null;
  customer_name: string | null;
  province_name: string | null;
  area: string | null;
  phone: string;
  point: number;
  point_coefficient: number;
  agent_name: string;
  code: string;
  code_hash: string;
  product_name: string;
  time_earn: string;
  customer_uuid: string;
  time_update: Date | null;
  zalo_device_id: string;
};
export type TProgramTopupDetail = {
  id: number;
  program_name: string;
  program_uuid: string;
  customer_uuid: string;
  zalo_device_id: string;
  customer_code: string;
  customer_name: string | null;
  province_name: string;
  area: string;
  phone: string;
  price: number;
  agent_name: string;
  code: string;
  code_hash: string;
  product_name: string;
  time_topup: string; // Consider using `Date` type if you want to handle date objects
  total: number;
};
export type TProgramChanceReportRES = {
  id: number;
  program_uuid: string;
  program_name: string;
  customer_uuid: string;
  zalo_device_id: string;
  customer_code: string | null;
  customer_name: string;
  province: string;
  province_name: string | null;
  area: string | null;
  phone: string;
  gift: string;
  gift_name: string;
  agent_code: string;
  agent_name: string;
  code: string;
  code_hash: string;
  product_code: string;
  product_name: string;
  time_lucky: string;
  time_lucky_number: number;
  status: number;
  limit_per_customer: number;
};
export type TDevice = {
  id: number;
  device_name: string;
  device_ip: string;
  device_port: number;
  device_port_serial: string;
  work_center_code: string;
  device_code: string;
};
export type TIngredient = {
  id: number;
  code: string;
  code_old: string;
  description: string;
  packing: string;
  product_type: string;
  formulation: string;
  weight: number;
  product_line: string;
  product_line_name: string;
  brand_code: string;
  brand_name: string;
  ingredient: string;
  certificate_of_origin: string;
  material: string;
  product_indication: string;
};
export type TIngredientPacking = {
  id: number;
  shipment_code: string;
  ingredient_code: string;
  ingredient_name: string;
  packing: string;
  weight: number;
  unit: string;
  manufacture_date: number; // YYYYMMDD format
  expiration_date: number; // YYYYMMDD format
  expiry: number; // In months
  orgin: string; // "origin" might be a typo in your data, correct if needed
  import_date: number; // YYYYMMDD format
  note: string | null;
};
export type TProvince = {
  id: string;
  district_code: string;
  district_name: string;
  province_item: string;
  province_name: string;
  province_code: string;
  zip_code: undefined;
};
export type BaseQuery = {
  nu?: number;
  sz?: number;
  st?: number;
  ed?: number;
  status?: number;
  gateway?: number;
  p?: string; //phone
  t?: string; //Loaij khach hang (chờ xác thực)
  k?: string; //loại khách hàng (đã xác thực)
  type?: string;
  s?: number;
  c?: string;
  u?: string; //username
};
export type TPackage = {
  id: number;
  code_item: number;
  code: string;
  code_hash: string;
  seri: string;
  bin_seri: string | undefined;
  agent_code: string | undefined;
  time_use: string;
  time_use_number: number;
  time_export: string | undefined;
  time_export_number: number;
  procedure_order_detail_item: number;
  product_code: string;
  product_name: string;
  product_sub_code: string | undefined;
  batch_number: string;
  register_phone: string;
  register_name: string | undefined;
  register_province: string | undefined;
  source_channel_used: string | undefined;
  source_campaign_code: string | undefined;
  status: number;
  manufacture_date: number;
  expiration_date: number;
  customer_code: string;
  customer_name: string | undefined;
  customer_province_name?: string;
  customer_province?: string;
  type_use: number;
  point: number;
};

export type TGetListAgentsRes = {
  listValidateAgents: TAgent[];
  listUnValidateAgents: TAgent[];
};

export type TAgencyC1 = {
  id: number;
  name: string;
  code: string;
  province: string;
  address: string | undefined;
  area: string;
  sale: string;
  note: string;
};
/* Farmer */
export type TFarmer = TAgent;
export type TGetListFarmersRes = {
  listValidateFarmers: TFarmer[];
  listUnValidateFarmers: TFarmer[];
};

/* Brandname */
export type TBrandname = {
  id: number;
  phone: string;
  content: string;
  time: string;
  time_number: number;
  code: string;
  response_body: string;
  transactionid: string;
};
export type TGetListBrandnamesRes = TBrandname[];
export type TReportDashboard = {
  id: number;
  day: number;
  topup: number;
  brandname: number;
  retailer1: number;
  retailer2: number;
  retailer2_none: number;
  farmer: number;
  farmer_none: number;
  qrcode: number;
  sms: number;
};
export type TReportDashboardMap = {
  id: number;
  day: number;
  topup: number;
  brandname: number;
  agent: number;
  agent_none: number;
  farmer: number;
  farmer_none: number;
  qrcode: number;
  sms: number;
};

export type BASE_RES = {
  data: any;
  status: number;
  message: string;
};

export type TCustomerRes = {
  id?: number;
  uuid?: string | null; // Lấy API
  customer_code?: string; // ko cần
  customer_type?: string; // select
  customer_name?: string;
  customer_uuid?: string;
  customer_province?: string; // select
  customer_province_name?: string; // ko cần
  customer_area?: string; // ko cần
  customer_district?: string; // select
  customer_district_name?: string; // ko cần
  customer_address?: string;
  phone?: string;
  province?: string; // select
  province_name?: string; // ko cần
  name?: string;
  time?: string; // ko cần
  time_number?: number; // ko cần
  source_channel_used?: string;
  source_campaign_code?: string; // ko cần
  retailer_group?: string;
  retailer_group_name?: string;
  code_hash?: string; // ko cần
  code?: string; // ko cần
  code_item?: number; // ko cần
  product_item?: number; // ko cần
  product_code?: string; // ko cần
  product_name?: string; // ko cần
  otp?: string; // ko cần
  sign_board?: string;
  status?: number;
  info_primary?: number;
  object_primary?: string; // ko cần
  time_verify?: string; // ko cần
  time_confirm?: string; // ko cần
  email?: string;
  gender?: number; // select
  birthday?: number | string | null;
  citizen_number?: number;
  citizen_day?: number | string;
  passport_number?: string;
  business_document?: string;
  tags: string;
  note?: string;
  avatar?: string;
  sale_code?: string; // select
  sale_name?: string; // ko cần
  export_code?: string;
  export_address?: string;
  area_size?: number | null; // diện tích đất canh tác
  zalo_device_id: string | null;
  zalo_user_id: string | null;
  time_updated?: number;
};
export type TGroupCustomer = {
  id?: number;
  symbol: string;
  name: string;
  prefix: string;
};

export type TEmployee = {
  id?: string;
  code?: string;
  uuid: string;
  name?: string | null;
  province?: string | null | { label?: string; value?: string };
  province_name?: string | null;
  area?: string | null;
  phone?: string;
  email?: string | null;
  gender?: number;
  birthday?: number | string;
  citizen_number?: string | null | number;
  citizen_day?: number | string;
  passport_number?: string | null;
  note?: string | null;
  avatar?: string | null;
  staff_role?: number;
  staff_role_name?: string;
  staff_department_code?: string;
  staff_department_name?: string;
  areas?: string | string[] | { label: string; value: string }[];
  provinces?: string | string[] | { label: string; value: string }[];
  export_address?: string;
  export_code?: string;
  time_created?: number;
  time_updated?: number;
};

export type TEmployeeRole = {
  id?: number;
  name: string;
  note: string;
};

export type TEmployeeDepartment = {
  id?: number;
  code: string;
  name: string;
  note: string;
};
export type TArea = {
  id: number;
  name: string;
  code: string;
  area: string;
  isAdded?: boolean;
};
export type TInventory = {
  id: number;
  device_code: string;
  product_name: string;
  batch_number: string;
  manufacture_date: string; // Format: YYYYMMDD
  expiration_date: string; // Format: YYYYMMDD
  expect_packing_date: string; // Format: YYYYMMDD
  procedure_order_code: string;
  seri: string;
  time: string; // Format: YYYY-MM-DD HH:mm
  time_number: number; // Format: YYYYMMDDHHmm
};

export type TAccount = {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  staff_code?: string;
  otp?: number;
  enabled?: number;
  tfa?: string;
  created?: string;
  modified?: string;
  role_list?: string[] | { label: string; value: string }[] | string;
  roles?: string | string[];
  roles_permission?: TPermit[];
};

export type TAccountRole = {
  id: number;
  name: string;
  code: string;
};

export type TGroupRetailer = {
  id?: string;
  uuid?: string;
  code?: string;
  name?: string;
  note?: string;
};

export type TBinPackage = {
  id: number;
  code_item: number;
  code: string;
  code_hash: string;
  seri: string;
  bin_seri: string | null;
  agent_code: string;
  time_use: string; // ISO 8601 format date string
  time_use_number: number;
  time_export: string | null; // ISO 8601 format date string
  time_export_number: number;
  procedure_order_detail_item: number;
  product_code: string;
  product_sub_code: string;
  batch_number: string;
  register_phone: string | null;
  register_name: string | null;
  register_province: string;
  register_province_name?: string;
  register_area?: string;
  source_channel_used: string;
  source_campaign_code: string | null;
  status: number;
  manufacture_date: number; // Format: YYYYMMDD
  expiration_date: number; // Format: YYYYMMDD
  customer_code: string | null;
  customer_name: string;
  type_use: number;
  zalo_device_id: string;
};

export type TWarehouseExport = {
  id: number;
  code: string;
  code_hash: string;
  seri: string;
  agent_code: string;
  agent_name: string;
  batch_number: string;
  device: string | null;
  sku: string;
  sku_sub: string;
  procedure_order_detail_item: number;
  time: string;
  time_number: string;
  document_code: string;
  document_code_detail: string | null;
  goods_type: string;
  address: string | null;
  staff_import_code: string | null;
  staff_import_name: string | null;
  staff_export_code: string | null;
  staff_export_name: string | null;
  receiver: string | null;
  work_center_export_code: string | null;
  work_center_import_code: string | null;
};

export type TWarehouseDocument = {
  id: number;
  agent_code: string;
  agent_name: string;
  time_export: string; // Assuming this is a date-time string
  time_export_number: number;
  address: string;
  note: string;
  total: number;
  export_time_day: number;
  document_code: string;
  document_code_detail: string;
  goods_type: string; // Assuming "SALE" is one of the possible values
  staff_import_code: string;
  staff_import_name: string;
  staff_export_code: string;
  staff_export_name: string;
  receiver: string;
  work_center_export_code: string;
};

export type TWarehouseDocumentImport = {
  id: number;
  agent_code: string;
  agent_name: string;
  time_import: string; // Assuming this is a date-time string
  time_import_number: number; // Assuming long corresponds to number in TypeScript
  address: string;
  note: string;
  total: number;
  import_time_day: number;
  document_code: string;
  document_code_detail: string;
  goods_type: string;
  staff_import_code: string;
  staff_import_name: string;
  staff_export_code: string;
  staff_export_name: string;
  shipper: string;
  work_center_export_code: string;
  work_center_import_code: string;
};

export type TBrand = {
  id: number;
  code: string;
  name: string;
};

export type TMaterial = {
  id: number;
  code: string;
  name: string;
};

export type TIndication = {
  id: number;
  code: string;
  name: string;
};

export type TFormulation = {
  id: number;
  code: string;
  name: string;
};

export type TSMSGateway = {
  id: number;
  info: string;
  phone: string;
  request_id: string;
  response: string | null;
  status: number;
  time: string;
  service_id: string;
  smsc: string;
  customer_code: string;
  customer_name: string | null;
  customer_province_name: string;
  customer_district_name: string;
  customer_area: string;
  code: string;
  code_hash: string;
  code_bin_package_item: number;
  product_name: string;
};
export type TSMSLucky = {
  id: number;
  phone: string;
  code: string;
  code_hash: string;
  price: number;
  request_id: string;
  time: string; // format: YYYYMMDDHHMMSS
  time_number: number; // format: YYYYMMDDHHMM
  type: "PROGRAM LUCKY SMS";
  customer_code: string | null;
  customer_name: string | null;
  product_code: string;
  product_name: string;
};
export type TCustomerStaff = {
  id: number;
  code: string;
  name: string;
  export_code: string;
  export_address: string | null;
  sign_board: string;
  province: string;
  type: string;
  sale_name: string;
};

export type TManufactorOrder = {
  device_code: string | null;
  product_code: string | null;
  shipment_code: string | null;
  total_bin: number | null;
  expect_packing_date: number | null;
  total_extra: number | null;
  ingredient_id: string | null;
  min_bin: number | null;
};

export type TProgramPointZaloDetail = {
  id: number;
  program_uuid: string;
  program_name: string;
  customer_uuid: string;
  customer_code: string;
  customer_name: string;
  province: string;
  province_name: string;
  area: string | null;
  phone: string;
  point: number;
  point_coefficient: number;
  agent_code: string;
  agent_name: string;
  code: string;
  code_hash: string;
  product_code: string;
  product_name: string;
  time_earn: string;
  time_earn_number: number;
  c1_price_vnd: number;
  c2_price_vnd: number;
  zalo_device_id: string;
};

export type TProgramTopupZaloDetail = {
  id: number;
  program_uuid: string;
  program_name: string;
  customer_uuid: string;
  zalo_device_id: string;
  customer_code: string | null;
  customer_name: string | null;
  province: string;
  province_name: string | null;
  area: string | null;
  phone: string;
  price: number;
  agent_code: string | null;
  agent_name: string | null;
  code: string;
  code_hash: string;
  product_code: string;
  product_name: string;
  time_topup: string;
  time_topup_number: number;
  request_id: string;
  response_id: string;
  response_body: string;
  status: number;
};

export type TWarehouseDevice = {
  id: number;
  work_center_code: string;
  domain: string;
  key: string;
  device_id: string;
  device_name: string;
  time_created: Date;
  time_authen: Date;
  time_updated: Date;
  status: number;
};

export type TWorkCenter = {
  id: number;
  code: string;
  name: string;
  address: string;
  factory_name: string;
  factory_code: string;
  note: string;
};

export type TBinByBatch = {
  id: number;
  code: string;
  code_hash: string;
  seri: string;
  agent_code: string;
  agent_name: string;
  batch_number: string;
  device: string;
  sku: string;
  sku_sub: string;
  procedure_order_detail_item: number;
  time: string;
  time_number: string;
  document_code: string;
  document_code_detail: string;
  goods_type: string;
  address: string;
  staff_import_code: string;
  staff_import_name: string;
  staff_export_code: string;
  staff_export_name: string;
  receiver: string;
  work_center_export_code: string;
};

export type TProcedure = {
  id: number;
  code: string;
  product_code: string;
  product_name: string;
  product_number: number; // product id -> ko hiện
  container_number: string; // Số lượng thùng
  ingredient_packing_code: string;
  ingredient_name: string;
  manufacture_date: number; // ngày sản xuất sp
  expiration_date: number; // ngày hết hạn sp
  expiry: number;
  expect_packing_date: number; // ngày thực hiện đóng gói
  note: string;
  total_sku: number;
  total_bin: number;
  total_box: number;
  total_pallet: number;
  status: number;
  bin_pallet: number;
  sku_bin: number;
  sku_box: number;
  box_bin: number;
  work_center_code: string;
  extra_temp: number;
  execute_date: number;
  order_number: number;
  device_code: string;
  have_procedure: number;
  time_created: string;
};

export type TProcedureOrderDetail = {
  id: number;
  procedure_order_code: string;
  device_code: string;
  product_code: string;
  product_name: string;
  product_number: number;
  batch_number: string;
  manufacture_date: number;
  expiration_date: number;
  expiry: number;
  expect_packing_date: number;
  execute_date: number;
  total_sku: number;
  total_bin: number;
  total_box: number;
  status: number;
  sku_bin: number;
  sku_box: number;
  box_bin: number;
  order_number: number;
  print_label: number;
  finish_map: number;
};

export type THistoryFile = {
  id: number;
  username: string;
  feature_code: string;
  description: string;
  file_path: string;
  status: number;
  time_request: string;
  time_done: string;
  file_url: string;
  transaction_id: string;
  newEntry: boolean;
  isNew: boolean;
};

export type TActionLog = {
  id: number;
  username: string;
  group_code: string;
  action_type: number;
  action_detail: string;
  action_time: string;
  action_object_code: string | null;
};
export enum GroupCode {
  EMPLOYEES_DEPARTMENT = "EMPLOYEES_DEPARTMENT",
  EMPLOYEES = "EMPLOYEES",
  EMPLOYEES_ROLE = "EMPLOYEES_ROLE",
  RETAIL_GROUP = "RETAIL_GROUP",
  CUSTOMERS = "CUSTOMERS",
  CUSTOMERS_GROUP = "CUSTOMERS_GROUP",
  ACCOUNTS = "ACCOUNTS",
  PRODUCTS = "PRODUCTS",
  PRODUCTS_MARKETING = "PRODUCTS_MARKETING",
  PRODUCTS_PRODUCTION = "PRODUCTS_PRODUCTION",
  PRODUCTS_BRAND = "PRODUCTS_BRAND",
  PRODUCTS_FORMULATION = "PRODUCTS_FORMULATION",
  PRODUCTS_INDICATION = "PRODUCTS_INDICATION",
  INGREDIENTS = "INGREDIENTS",
  INGREDIENTS_PACKING = "INGREDIENTS_PACKING",
  PROGRAMS_POINT = "PROGRAMS_POINT",
  PROGRAMS_TOPUP = "PROGRAMS_TOPUP",
  WAREHOUSE_DEVICES = "WAREHOUSE_DEVICES",
  WAREHOUSE_PROCEDURE = "WAREHOUSE_PROCEDURE",
}
