/**Agent */
export type TAgent = {
  id: number;
  customer_code: string; //hiện
  customer_type: string; // hiện
  customer_name: string | undefined; // hiện
  customer_province: string | undefined; // hiện
  phone: string; // hiện
  province: string; // hiện
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
};

export type TProductForm = Omit<
  TProduct,
  "id" | "uuid" | "code_box" | "name_display_root" | "version" | "name_display"
>;
export type TBin = {
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
  type_use: number; // 0 : Qr Code, 1 : SMS
};
export type TProductDashboardTable = Pick<
  TBin,
  "id" | "seri" | "bin_seri" | "product_code" | "time_use"
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
  RETAILER = "RETAILER",
  FARMER = "FARMER",
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
  status: number;
  point_coefficient: number;
  products: string;
  agents: string;
  locations: string;
  objectives: string;
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
  type_use: number;
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
  roles?: string[] | { label: string; value: string }[] | string;
};

export type TAccountRole = {
  id: number;
  name: string;
  code: string;
};
