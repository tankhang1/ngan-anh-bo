import { TObjectiveEnum } from "../assets/types";

const BASE_URL = "http://116.118.95.67";
const BASE_PORT = "https://fgkawrverpi1qyawfgb.yis.vn";
const BASE_PORT_8180 = "https://byxzenverpi1qyrvyf.yis.vn";
const HTTPS_METHOD = {
  POST: "POST",
  PUT: "PUT",
  GET: "GET",
};
const LOCAL_KEY = {
  TOKEN: "TOKEN",
};
const PROVINCES = [
  { label: "An Giang", value: "AGG" },
  { label: "Bà Rịa-Vũng Tàu", value: "BVT" },
  { label: "Bắc Giang", value: "BGG" },
  { label: "Bắc Kạn", value: "BKN" },
  { label: "Bạc Liêu", value: "BLU" },
  { label: "Bắc Ninh", value: "BNH" },
  { label: "Bến Tre", value: "BTE" },
  { label: "Bình Định", value: "BDH" },
  { label: "Bình Dương", value: "BDG" },
  { label: "Bình Phước", value: "BPC" },
  { label: "Bình Thuận", value: "BTN" },
  { label: "Cà Mau", value: "CMU" },
  { label: "Cần Thơ", value: "CTO" },
  { label: "Cao Bằng", value: "CBG" },
  { label: "Đà Nẵng", value: "DAN" },
  { label: "Đắk Lắk", value: "DLC" },
  { label: "Đắk Nông", value: "DNG" },
  { label: "Điện Biên", value: "DBN" },
  { label: "Đồng Nai", value: "DNI" },
  { label: "Đồng Tháp", value: "DTP" },
  { label: "Gia Lai", value: "GLI" },
  { label: "Hà Giang", value: "HAG" },
  { label: "Hà Nam", value: "HNM" },
  { label: "Hà Nội", value: "HAN" },
  { label: "Hà Tĩnh", value: "HTH" },
  { label: "Hải Dương", value: "HDG" },
  { label: "Hải Phòng", value: "HPG" },
  { label: "Hậu Giang", value: "HGG" },
  { label: "Hòa Bình", value: "HBH" },
  { label: "Hưng Yên", value: "HYN" },
  { label: "Khánh Hòa", value: "KHA" },
  { label: "Kiên Giang", value: "KGG" },
  { label: "Kon Tum", value: "KTM" },
  { label: "Lai Châu", value: "LCU" },
  { label: "Lâm Đồng", value: "LDG" },
  { label: "Lạng Sơn", value: "LSN" },
  { label: "Lào Cai", value: "LCI" },
  { label: "Long An", value: "LAN" },
  { label: "Nam Định", value: "NDH" },
  { label: "Nghệ An", value: "NAN" },
  { label: "Ninh Bình", value: "NBH" },
  { label: "Ninh Thuận", value: "NTN" },
  { label: "Phú Thọ", value: "PTO" },
  { label: "Phú Yên", value: "PYN" },
  { label: "Quảng Bình", value: "QBH" },
  { label: "Quảng Nam", value: "QNM" },
  { label: "Quảng Ngãi", value: "QNI" },
  { label: "Quảng Ninh", value: "QNH" },
  { label: "Quảng Trị", value: "QTI" },
  { label: "Sóc Trăng", value: "STG" },
  { label: "Sơn La", value: "SLA" },
  { label: "Tây Ninh", value: "TNH" },
  { label: "Thái Bình", value: "TBH" },
  { label: "Thái Nguyên", value: "TNN" },
  { label: "Thanh Hoá", value: "THA" },
  { label: "Thừa Thiên-Huế", value: "TTH" },
  { label: "Tiền Giang", value: "TGG" },
  { label: "Hồ Chí Minh", value: "HCM" },
  { label: "Trà Vinh", value: "TVH" },
  { label: "Tuyên Quang", value: "TQG" },
  { label: "Vĩnh Long", value: "VLG" },
  { label: "Vĩnh Phúc", value: "VPC" },
  { label: "Yên Bái", value: "YBI" },
];
const MAP_PRODUCT_TYPE = new Map([
  [0, "Gói"],
  [1, "Túi"],
  [2, "Chai"],
  [3, "Hộp"],
  [4, "Thùng"],
]);
export enum ProductTypeEnum {
  PACKET,
  BAG,
  BOTTLE,
  BOX,
  BIN,
}

const COUNTRIES = [
  { label: "United States (Hoa Kỳ)", value: "United States (Hoa Kỳ)" },
  { label: "China (Trung Quốc)", value: "China (Trung Quốc)" },
  { label: "India (Ấn Độ)", value: "India (Ấn Độ)" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "Brazil", value: "Brazil" },
  { label: "Nigeria", value: "Nigeria" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Russia (Nga)", value: "Russia (Nga)" },
  { label: "Mexico", value: "Mexico" },
  { label: "Japan (Nhật Bản)", value: "Japan (Nhật Bản)" },
  { label: "Ethiopia", value: "Ethiopia" },
  { label: "Philippines", value: "Philippines" },
  { label: "Egypt (Ai Cập)", value: "Egypt (Ai Cập)" },
  { label: "Vietnam (Việt Nam)", value: "Vietnam (Việt Nam)" },
  { label: "Turkey (Thổ Nhĩ Kỳ)", value: "Turkey (Thổ Nhĩ Kỳ)" },
  { label: "Iran", value: "Iran" },
  { label: "Germany (Đức)", value: "Germany (Đức)" },
  { label: "Thailand (Thái Lan)", value: "Thailand (Thái Lan)" },
  { label: "United Kingdom (Anh)", value: "United Kingdom (Anh)" },
  { label: "France (Pháp)", value: "France (Pháp)" },
  { label: "South Africa (Nam Phi)", value: "South Africa (Nam Phi)" },
  { label: "South Korea (Hàn Quốc)", value: "South Korea (Hàn Quốc)" },
  { label: "Colombia", value: "Colombia" },
  { label: "Spain (Tây Ban Nha)", value: "Spain (Tây Ban Nha)" },
  { label: "Argentina", value: "Argentina" },
  { label: "Ukraine (Ukraina)", value: "Ukraine (Ukraina)" },
  { label: "Algeria", value: "Algeria" },
  { label: "Sudan", value: "Sudan" },
  { label: "Iraq", value: "Iraq" },
  { label: "Afghanistan", value: "Afghanistan" },
  { label: "Poland", value: "Poland" },
  { label: "Canada", value: "Canada" },
  { label: "Morocco", value: "Morocco" },
  { label: "Saudi Arabia (Ả Rập Saudi)", value: "Saudi Arabia (Ả Rập Saudi)" },
  { label: "Uzbekistan", value: "Uzbekistan" },
  { label: "Peru", value: "Peru" },
  { label: "Malaysia", value: "Malaysia" },
  { label: "Angola", value: "Angola" },
  { label: "Ghana", value: "Ghana" },
  { label: "Mozambique", value: "Mozambique" },
  { label: "Yemen", value: "Yemen" },
  { label: "Nepal", value: "Nepal" },
  { label: "Venezuela", value: "Venezuela" },
  { label: "Madagascar", value: "Madagascar" },
  { label: "Cameroon", value: "Cameroon" },
  { label: "Ivory Coast (Bờ Biển Ngà)", value: "Ivory Coast (Bờ Biển Ngà)" },
  {
    label: "North Korea (Bắc Triều Tiên)",
    value: "North Korea (Bắc Triều Tiên)",
  },
  { label: "Australia", value: "Australia" },
  { label: "Niger", value: "Niger" },
  { label: "Taiwan (Đài Loan)", value: "Taiwan (Đài Loan)" },
  { label: "Mali", value: "Mali" },
  { label: "Chile", value: "Chile" },
  { label: "Kazakhstan", value: "Kazakhstan" },
  { label: "Malawi", value: "Malawi" },
  { label: "Zambia", value: "Zambia" },
  { label: "Guatemala", value: "Guatemala" },
  { label: "Ecuador", value: "Ecuador" },
  { label: "Syria (Syria)", value: "Syria (Syria)" },
  { label: "Netherlands (Hà Lan)", value: "Netherlands (Hà Lan)" },
  { label: "Senegal", value: "Senegal" },
  { label: "Cambodia (Campuchia)", value: "Cambodia (Campuchia)" },
  { label: "Chad", value: "Chad" },
  { label: "Somalia (Somalia)", value: "Somalia (Somalia)" },
  { label: "Zimbabwe (Zimbabwe)", value: "Zimbabwe (Zimbabwe)" },
  { label: "Guinea (Guinea)", value: "Guinea (Guinea)" },
  { label: "Rwanda (Rwanda)", value: "Rwanda (Rwanda)" },
  {
    label: "Burkina Faso (Burkina Faso)",
    value: "Burkina Faso (Burkina Faso)",
  },
  { label: "Benin (Benin)", value: "Benin (Benin)" },
  { label: "Haiti (Haiti)", value: "Haiti (Haiti)" },
  { label: "Bolivia (Bolivia)", value: "Bolivia (Bolivia)" },
  { label: "Belgium (Bỉ)", value: "Belgium (Bỉ)" },
  { label: "Cuba (Cuba)", value: "Cuba (Cuba)" },
  { label: "Jordan (Jordan)", value: "Jordan (Jordan)" },
  { label: "Burundi (Burundi)", value: "Burundi (Burundi)" },
  { label: "Greece (Hy Lạp)", value: "Greece (Hy Lạp)" },
  {
    label: "Czech Republic (Cộng hòa Séc)",
    value: "Czech Republic (Cộng hòa Séc)",
  },
  {
    label: "Dominican Republic (Cộng hòa Dominica)",
    value: "Dominican Republic (Cộng hòa Dominica)",
  },
  { label: "Sweden (Thụy Điển)", value: "Sweden (Thụy Điển)" },
  { label: "Portugal (Bồ Đào Nha)", value: "Portugal (Bồ Đào Nha)" },
  { label: "Azerbaijan (Azerbaijan)", value: "Azerbaijan (Azerbaijan)" },
  { label: "Hungary (Hungary)", value: "Hungary (Hungary)" },
  {
    label: "United Arab Emirates (Các Tiểu vương quốc Ả Rập Thống nhất)",
    value: "United Arab Emirates (Các Tiểu vương quốc Ả Rập Thống nhất)",
  },
  { label: "Belarus (Belarus)", value: "Belarus (Belarus)" },
  { label: "Tajikistan (Tajikistan)", value: "Tajikistan (Tajikistan)" },
  { label: "Serbia (Serbia)", value: "Serbia (Serbia)" },
  { label: "Austria (Áo)", value: "Austria (Áo)" },
  { label: "Switzerland (Thụy Sĩ)", value: "Switzerland (Thụy Sĩ)" },
  { label: "Israel (Israel)", value: "Israel (Israel)" },
  { label: "Togo (Togo)", value: "Togo (Togo)" },
  {
    label: "Sierra Leone (Sierra Leone)",
    value: "Sierra Leone (Sierra Leone)",
  },
  { label: "Hong Kong (Hồng Kông)", value: "Hong Kong (Hồng Kông)" },
  { label: "Laos (Lào)", value: "Laos (Lào)" },
  {
    label: "Papua New Guinea (Papua New Guinea)",
    value: "Papua New Guinea (Papua New Guinea)",
  },
  { label: "Paraguay (Paraguay)", value: "Paraguay (Paraguay)" },
  { label: "Bulgaria (Bulgaria)", value: "Bulgaria (Bulgaria)" },
  { label: "Libya (Libya)", value: "Libya (Libya)" },
  { label: "Lebanon (Lebanon)", value: "Lebanon (Lebanon)" },
  { label: "Nicaragua (Nicaragua)", value: "Nicaragua (Nicaragua)" },
  { label: "Kyrgyzstan (Kyrgyzstan)", value: "Kyrgyzstan (Kyrgyzstan)" },
  { label: "El Salvador (El Salvador)", value: "El Salvador (El Salvador)" },
  {
    label: "Turkmenistan (Turkmenistan)",
    value: "Turkmenistan (Turkmenistan)",
  },
  { label: "Denmark (Đan Mạch)", value: "Denmark (Đan Mạch)" },
  { label: "Singapore (Singapore)", value: "Singapore (Singapore)" },
  { label: "Finland (Phần Lan)", value: "Finland (Phần Lan)" },
  {
    label: "Central African Republic (Cộng hòa Trung Phi)",
    value: "Central African Republic (Cộng hòa Trung Phi)",
  },
  { label: "Congo (Congo)", value: "Congo (Congo)" },
  { label: "Costa Rica (Costa Rica)", value: "Costa Rica (Costa Rica)" },
  { label: "Slovakia (Slovakia)", value: "Slovakia (Slovakia)" },
  { label: "Norway (Na Uy)", value: "Norway (Na Uy)" },
  { label: "New Zealand (New Zealand)", value: "New Zealand (New Zealand)" },
  { label: "Oman (Oman)", value: "Oman (Oman)" },
  { label: "Palestine (Palestine)", value: "Palestine (Palestine)" },
  { label: "Liberia (Liberia)", value: "Liberia (Liberia)" },
  { label: "Ireland (Ireland)", value: "Ireland (Ireland)" },
  { label: "Kuwait (Kuwait)", value: "Kuwait (Kuwait)" },
  { label: "Mauritania (Mauritania)", value: "Mauritania (Mauritania)" },
  { label: "Panama (Panama)", value: "Panama (Panama)" },
  { label: "Croatia (Croatia)", value: "Croatia (Croatia)" },
  { label: "Moldova (Moldova)", value: "Moldova (Moldova)" },
  { label: "Uruguay (Uruguay)", value: "Uruguay (Uruguay)" },
  { label: "Georgia (Georgia)", value: "Georgia (Georgia)" },
  { label: "Eritrea (Eritrea)", value: "Eritrea (Eritrea)" },
  { label: "Mongolia (Mông Cổ)", value: "Mongolia (Mông Cổ)" },
  {
    label: "Bosnia and Herzegovina (Bosnia và Herzegovina)",
    value: "Bosnia and Herzegovina (Bosnia và Herzegovina)",
  },
  { label: "Jamaica (Jamaica)", value: "Jamaica (Jamaica)" },
  { label: "Qatar (Qatar)", value: "Qatar (Qatar)" },
  { label: "Armenia (Armenia)", value: "Armenia (Armenia)" },
  { label: "Albania (Albania)", value: "Albania (Albania)" },
  { label: "Puerto Rico (Puerto Rico)", value: "Puerto Rico (Puerto Rico)" },
  { label: "Lithuania (Lithuania)", value: "Lithuania (Lithuania)" },
  { label: "Namibia (Namibia)", value: "Namibia (Namibia)" },
  { label: "Botswana (Botswana)", value: "Botswana (Botswana)" },
  { label: "Gambia (Gambia)", value: "Gambia (Gambia)" },
  { label: "Gabon (Gabon)", value: "Gabon (Gabon)" },
  { label: "Lesotho (Lesotho)", value: "Lesotho (Lesotho)" },
  {
    label: "North Macedonia (Bắc Macedonia)",
    value: "North Macedonia (Bắc Macedonia)",
  },
  { label: "Slovenia (Slovenia)", value: "Slovenia (Slovenia)" },
  {
    label: "Guinea-Bissau (Guinea-Bissau)",
    value: "Guinea-Bissau (Guinea-Bissau)",
  },
  { label: "Latvia (Latvia)", value: "Latvia (Latvia)" },
  { label: "Bahrain (Bahrain)", value: "Bahrain (Bahrain)" },
  {
    label: "Equatorial Guinea (Guinea Xích Đạo)",
    value: "Equatorial Guinea (Guinea Xích Đạo)",
  },
  {
    label: "Trinidad and Tobago (Trinidad và Tobago)",
    value: "Trinidad and Tobago (Trinidad và Tobago)",
  },
  { label: "Estonia (Estonia)", value: "Estonia (Estonia)" },
  { label: "Timor-Leste (Đông Timor)", value: "Timor-Leste (Đông Timor)" },
  { label: "Mauritius (Mauritius)", value: "Mauritius (Mauritius)" },
  { label: "Cyprus (Síp)", value: "Cyprus (Síp)" },
  { label: "Eswatini (Eswatini)", value: "Eswatini (Eswatini)" },
  { label: "Djibouti (Djibouti)", value: "Djibouti (Djibouti)" },
  { label: "Fiji (Fiji)", value: "Fiji (Fiji)" },
  { label: "Réunion (Réunion)", value: "Réunion (Réunion)" },
  { label: "Comoros (Comoros)", value: "Comoros (Comoros)" },
  { label: "Guyana (Guyana)", value: "Guyana (Guyana)" },
  { label: "Bhutan (Bhutan)", value: "Bhutan (Bhutan)" },
  {
    label: "Solomon Islands (Quần đảo Solomon)",
    value: "Solomon Islands (Quần đảo Solomon)",
  },
  { label: "Macau (Macau)", value: "Macau (Macau)" },
  { label: "Montenegro (Montenegro)", value: "Montenegro (Montenegro)" },
  { label: "Luxembourg (Luxembourg)", value: "Luxembourg (Luxembourg)" },
  {
    label: "Western Sahara (Tây Sahara)",
    value: "Western Sahara (Tây Sahara)",
  },
  { label: "Suriname (Suriname)", value: "Suriname (Suriname)" },
  { label: "Cabo Verde (Cabo Verde)", value: "Cabo Verde (Cabo Verde)" },
  { label: "Maldives (Maldives)", value: "Maldives (Maldives)" },
  { label: "Malta (Malta)", value: "Malta (Malta)" },
  { label: "Brunei (Brunei)", value: "Brunei (Brunei)" },
  { label: "Belize (Belize)", value: "Belize (Belize)" },
  { label: "Bahamas (Bahamas)", value: "Bahamas (Bahamas)" },
  { label: "Martinique (Martinique)", value: "Martinique (Martinique)" },
  { label: "Iceland (Iceland)", value: "Iceland (Iceland)" },
  { label: "Vanuatu (Vanuatu)", value: "Vanuatu (Vanuatu)" },
  { label: "Barbados (Barbados)", value: "Barbados (Barbados)" },
  {
    label: "New Caledonia (New Caledonia)",
    value: "New Caledonia (New Caledonia)",
  },
  {
    label: "French Guiana (Guiana Pháp)",
    value: "French Guiana (Guiana Pháp)",
  },
  { label: "Mayotte (Mayotte)", value: "Mayotte (Mayotte)" },
  {
    label: "São Tomé and Príncipe (São Tomé và Príncipe)",
    value: "São Tomé and Príncipe (São Tomé và Príncipe)",
  },
  { label: "Samoa (Samoa)", value: "Samoa (Samoa)" },
  { label: "Saint Lucia (Saint Lucia)", value: "Saint Lucia (Saint Lucia)" },
  { label: "Guadeloupe (Guadeloupe)", value: "Guadeloupe (Guadeloupe)" },
  {
    label: "Channel Islands (Quần đảo Channel)",
    value: "Channel Islands (Quần đảo Channel)",
  },
  { label: "Curaçao (Curaçao)", value: "Curaçao (Curaçao)" },
  { label: "Dominica (Dominica)", value: "Dominica (Dominica)" },
  { label: "Grenada (Grenada)", value: "Grenada (Grenada)" },
  {
    label: "Saint Vincent and the Grenadines (Saint Vincent và Grenadines)",
    value: "Saint Vincent and the Grenadines (Saint Vincent và Grenadines)",
  },
  {
    label: "United States Virgin Islands (Quần đảo Virgin của Mỹ)",
    value: "United States Virgin Islands (Quần đảo Virgin của Mỹ)",
  },
  {
    label: "Turks and Caicos Islands (Quần đảo Turks và Caicos)",
    value: "Turks and Caicos Islands (Quần đảo Turks và Caicos)",
  },
  {
    label: "Falkland Islands (Quần đảo Falkland)",
    value: "Falkland Islands (Quần đảo Falkland)",
  },
  { label: "Montserrat (Montserrat)", value: "Montserrat (Montserrat)" },
  { label: "East Timor (Đông Timor)", value: "East Timor (Đông Timor)" },
  {
    label: "Sint Maarten (Sint Maarten)",
    value: "Sint Maarten (Sint Maarten)",
  },
  { label: "Anguilla (Anguilla)", value: "Anguilla (Anguilla)" },
  {
    label: "Saint Kitts and Nevis (Saint Kitts và Nevis)",
    value: "Saint Kitts and Nevis (Saint Kitts và Nevis)",
  },
  {
    label: "Wallis and Futuna (Wallis và Futuna)",
    value: "Wallis and Futuna (Wallis và Futuna)",
  },
  { label: "Nauru (Nauru)", value: "Nauru (Nauru)" },
  { label: "Tuvalu (Tuvalu)", value: "Tuvalu (Tuvalu)" },
  {
    label:
      "Saint Helena, Ascension and Tristan da Cunha (Saint Helena, Ascension và Tristan da Cunha)",
    value:
      "Saint Helena, Ascension and Tristan da Cunha (Saint Helena, Ascension và Tristan da Cunha)",
  },
  {
    label: "Saint Pierre and Miquelon (Saint Pierre và Miquelon)",
    value: "Saint Pierre and Miquelon (Saint Pierre và Miquelon)",
  },
  {
    label:
      "South Georgia and the South Sandwich Islands (Nam Georgia và Quần đảo Sandwich Nam)",
    value:
      "South Georgia and the South Sandwich Islands (Nam Georgia và Quần đảo Sandwich Nam)",
  },
  {
    label: "British Virgin Islands (Quần đảo Virgin thuộc Anh)",
    value: "British Virgin Islands (Quần đảo Virgin thuộc Anh)",
  },
  {
    label: "Cook Islands (Quần đảo Cook)",
    value: "Cook Islands (Quần đảo Cook)",
  },
  {
    label: "Pitcairn Islands (Quần đảo Pitcairn)",
    value: "Pitcairn Islands (Quần đảo Pitcairn)",
  },
  {
    label: "Åland Islands (Quần đảo Åland)",
    value: "Åland Islands (Quần đảo Åland)",
  },
  {
    label: "Norfolk Island (Đảo Norfolk)",
    value: "Norfolk Island (Đảo Norfolk)",
  },
  {
    label: "Christmas Island (Đảo Christmas)",
    value: "Christmas Island (Đảo Christmas)",
  },
  { label: "Tokelau (Tokelau)", value: "Tokelau (Tokelau)" },
  { label: "Niue (Niue)", value: "Niue (Niue)" },
  {
    label: "Vatican City (Thành Vatican)",
    value: "Vatican City (Thành Vatican)",
  },
  {
    label: "Cocos (Keeling) Islands (Quần đảo Cocos (Keeling))",
    value: "Cocos (Keeling) Islands (Quần đảo Cocos (Keeling))",
  },
  { label: "Bouvet Island (Đảo Bouvet)", value: "Bouvet Island (Đảo Bouvet)" },
  {
    label: "Svalbard and Jan Mayen (Svalbard và Jan Mayen)",
    value: "Svalbard and Jan Mayen (Svalbard và Jan Mayen)",
  },
  {
    label: "Heard Island and McDonald Islands (Đảo Heard và Quần đảo McDonald)",
    value: "Heard Island and McDonald Islands (Đảo Heard và Quần đảo McDonald)",
  },
];

const MAP_PROGRAM_STATUS = new Map([
  [0, { label: "Chờ kích hoạt", color: "warning" }],
  [1, { label: "Đang chạy", color: "success" }],
  [2, { label: "Hết thời hạn", color: "light" }],
  [3, { label: "Tạm dừng", color: "danger" }],
]);
const OBJECTIVES_SELECT = [
  {
    label: "Đại lý",
    value: TObjectiveEnum.RETAILER,
  },
  { label: "Nông dân", value: TObjectiveEnum.FARMER },
];
export {
  PROVINCES,
  BASE_PORT,
  BASE_PORT_8180,
  BASE_URL,
  MAP_PRODUCT_TYPE,
  COUNTRIES,
  MAP_PROGRAM_STATUS,
  HTTPS_METHOD,
  LOCAL_KEY,
  OBJECTIVES_SELECT,
};

const AccountPermission = new Map([
  [
    "ROLE_ADMIN",
    {
      viewAll: true,
    },
  ],
  [
    "ROLE_AGENT",
    {
      viewDataCustomer: true, // Thông tin dữ liệu khách hàng theo vùng
      viewCustomerLevel1: true, // Thông tin khách hàng cấp 1
      viewFarmer: true, // Thông tin nông dân theo vùng
      viewOrder: true, // Xem đơn hàng
      createOrder: true, // Tạo đơn hàng
      exportOrder: true, // Xuất hàng cấp 1
    },
  ],

  [
    "ROLE_BUSINESS",
    {
      viewDataCustomer: true, // Thông tin dữ liệu khách hàng theo vùng
      viewCustomerLevel1: true, // Thông tin khách hàng cấp 1
      viewFarmer: true, // Thông tin nông dân
      viewSaleLevel1: true, // Sản lượng bán / Cấp 1 theo vùng
      viewSaleLevel2: true, //Sản lượng bán / Cấp 2 theo vùng
    },
  ],
  [
    "ROLE_FINANCE",
    {
      viewSales: true, // Sản lượng bán cấp 1 theo vùng
    },
  ],
  [
    "ROLE_WAREHOUSE",
    {
      viewInventory: true, // Thông tin lượng hàng thành phẩm
      manageRawMaterials: true, // Thông tin tồn kho/Thành phẩm nguyên liệu
      manageFinishedProducts: true, //Nhận đơn hàng yêu cầu từ CSKH xuất hàng cho cấp 1
      handleCustomerOrders: true, //Kiểm kê kho hàng thành phẩm
      barcodeCheck: true, // Bar code thùng/batch/pallet
      systemAdjustment: true, // Hiệu chỉnh số liệu tồn kho hệ thống vs kho thành phẩm
    },
  ],
  [
    "ROLE_ENGINEER",
    {
      viewProgram: true, // Xem chương trình
      viewDataCustomer: true, // Xem thông tin khách hàng
      viewFarmer: true, // Xem thông tin nông dân
    },
  ],
]);
