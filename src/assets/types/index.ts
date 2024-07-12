/**Agent */
export type TAgent = {
  id: number;
  customer_code: string; //hiện
  customer_type: string; // hiện
  customer_name: string | null; // hiện
  customer_province: string | null; // hiện
  phone: string; // hiện
  province: string; // hiện
  name: string; // hiện
  time: string; // hiện
  time_number: number; //
  source_channel_used: string | null; // ẩn
  source_campaign_code: string | null; // ẩn
  finger_province: string | null; // hiện
  code: string; // hiện
  code_item: number; // ko hiện
  code_hash: string; // ko hiện
  product_item: number;
  product_code: string;
  sign_board: string | null;
  otp: string; // ko hiện
  type: number; //không hiện
  verify: number; // ko hiện trạng thái
  v_id: string; // ko hiện
  status: number; //  trạng thái xác thực đã verify ko chuyển được
  info_primary: number; // hiện toggle
  object_primary: string | null; // ko hiện ( này là thằng chính nào)
  time_verify: string | null; // nếu status verify thì hiện
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
  net_weight: number | null;
  unit: string;
  version: string;
  type: ProductTypeEnum | string;
  sku_bin: number | null;
  sku_box: number | null;
  bin_pallet: number | null;
  mop: number;
  device_code: string;
  ingredient: string;
  ingredient_id: string;
  certificate_of_origin: string;
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
  bin_seri: string | null;
  agent_code: string | null;
  time_use: string;
  time_use_number: number;
  time_export: string | null;
  time_export_number: number;
  procedure_order_detail_item: number;
  product_code: string;
  product_sub_code: string | null;
  batch_number: string;
  register_phone: string;
  register_name: string | null;
  register_province: string | null;
  source_channel_used: string | null;
  source_campaign_code: string | null;
  status: number;
  manufacture_date: number;
  expiration_date: number;
  customer_code: string;
  customer_name: string | null;
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
  customer_type?: TObjectiveEnum;
  customer_name?: string;
  customer_province?: string;
  phone?: string;
  sign_board?: string; //bảng hiệu
  type?: number; // 0: QrCode , 1: SMS, tạo thì -1
  verify?: number;
  info_primary: number | null; //số điện thoại tích điểm hay ko 0, 1
  customer_address?: string;
  customer_district?: string;
  status?: number | string;
  customer_code?: string;
};
export type TFarmerForm = {
  customer_type: TObjectiveEnum;
  customer_name: string | null;
  customer_province: string | null;
  phone: string | null;
  type: number | null; // 0: QrCode , 1: SMS, tạo thì -1
  verify: number | null;
  info_primary: number | null; //số điện thoại tích điểm hay ko 0, 1
  customer_address: string | null;
  customer_district: string | null;
  status: number | null | string;
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
  point: number;
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
  uuid?: number;
};

export type TPointCreateForm = {
  name: string;
  products: string | string[];
  agents: string | string[];
  point: number | string;
  objectives: string | string[];
  time_end: string;
  time_start: string;
  locations: string | string[];
  uuid?: number;
  status: number | string;
  time_start_number?: number | string;
  time_end_number?: number | string;
};
