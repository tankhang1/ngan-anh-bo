//Icons

const icon1 = <i className="bx bx-desktop"></i>;
const icon2 = <i className="bx bx-cube"></i>;
const icon3 = <i className="bx bx-food-menu"></i>;
const icon4 = <i className="bx bx-magnet"></i>;
const icon5 = <i className="bx bx-lock-alt"></i>;
const icon6 = <i className="bx bx-error-alt"></i>;
const icon7 = <i className="bx bx-carousel"></i>;
const icon8 = <i className="bx bx-smile"></i>;
const icon9 = <i className="bx bx-layout"></i>;
const icon10 = <i className="bx bx-underline"></i>;
const icon11 = <i className="bx bx-menu"></i>;
const icon12 = <i className="bx bx-map-pin"></i>;
const icon13 = <i className="bx bx-scatter-chart"></i>;
const icon14 = <i className="bx bx-file"></i>;
const icon15 = <i className="bx bx-table"></i>;

//Badges
const badge1 = <span className="badge bg-warning-transparent ms-2 d-inline-block">12</span>;
const badge2 = <span className="badge bg-danger-transparent ms-2 d-inline-block">Hot</span>;
const badge3 = <span className="badge bg-success-transparent ms-2 d-inline-block">3</span>;

export const MENUITEMS = [
	{
		menutitle: "MAIN",
	},
	{
		title: "Dashboards", icon: icon1, badgetxt: badge1, type: "sub", active: false, selected: false, dirchange: false,
		children: [
			{ path: `${import.meta.env.BASE_URL}dashboards/sales`, type: "link", active: false, selected: false, dirchange: false, title: "Sales", },
			{ path: `${import.meta.env.BASE_URL}dashboards/crypto`, type: "link", active: false, selected: false, dirchange: false, title: "Crypto" },
			{ path: `${import.meta.env.BASE_URL}dashboards/jobs`, type: "link", active: false, selected: false, dirchange: false, title: "Jobs" },
			{ path: `${import.meta.env.BASE_URL}dashboards/crm`, type: "link", active: false, selected: false, dirchange: false, title: "CRM" },
			{ path: `${import.meta.env.BASE_URL}dashboards/ecommerce`, type: "link", active: false, selected: false, dirchange: false, title: "Ecommerce" },
			{ path: `${import.meta.env.BASE_URL}dashboards/analytics`, type: "link", active: false, selected: false, dirchange: false, title: "Analytics" },
			{ path: `${import.meta.env.BASE_URL}dashboards/projects`, type: "link", active: false, selected: false, dirchange: false, title: "Projects" },
			{ path: `${import.meta.env.BASE_URL}dashboards/nft`, type: "link", active: false, selected: false, dirchange: false, title: "NFT" },
			{ path: `${import.meta.env.BASE_URL}dashboards/hrm`, type: "link", active: false, selected: false, dirchange: false, title: "HRM" },
			{ path: `${import.meta.env.BASE_URL}dashboards/personal`, type: "link", active: false, selected: false, dirchange: false, title: "Personal" },
			{ path: `${import.meta.env.BASE_URL}dashboards/stocks`, type: "link", active: false, selected: false, dirchange: false, title: "Stocks" },
			{ path: `${import.meta.env.BASE_URL}dashboards/courses`, type: "link", active: false, selected: false, dirchange: false, title: "Course" },
		],
	},
	{
		menutitle: "GENERAL",
	},
	{
		title: "Advanced Ui", icon: icon2, badgetxt: "", type: "sub", active: false, selected: false, dirchange: false,
		children: [
			{ path: `${import.meta.env.BASE_URL}advancedui/accordions-collapse`, type: "link", active: false, selected: false, dirchange: false, title: "Accordions & Collapse" },
			{ path: `${import.meta.env.BASE_URL}advancedui/carousel`, type: "link", active: false, selected: false, dirchange: false, title: "Carousel" },
			{ path: `${import.meta.env.BASE_URL}advancedui/draggablecards`, type: "link", active: false, selected: false, dirchange: false, title: "Draggable Cards" },
			{ path: `${import.meta.env.BASE_URL}advancedui/modals-closes`, type: "link", active: false, selected: false, dirchange: false, title: "Modals & Closes" },
			{ path: `${import.meta.env.BASE_URL}advancedui/navbar`, type: "link", active: false, selected: false, dirchange: false, title: "Navbar" },
			{ path: `${import.meta.env.BASE_URL}advancedui/offcanvas`, type: "link", active: false, selected: false, dirchange: false, title: "Offcanvas" },
			{ path: `${import.meta.env.BASE_URL}advancedui/placeholders`, type: "link", active: false, selected: false, dirchange: false, title: "Placeholders" },
			{ path: `${import.meta.env.BASE_URL}advancedui/ratings`, type: "link", active: false, selected: false, dirchange: false, title: "Ratings" },
			{ path: `${import.meta.env.BASE_URL}advancedui/swiperjs`, type: "link", active: false, selected: false, dirchange: false, title: "Swipper JS" }
		],
	},
	{
		menutitle: "PAGES",
	},
	{
		title: "Pages", icon: icon3, badgetxt: "", type: "sub", active: false, selected: false, dirchange: false,
		children: [
			{
				title: "Blog", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}pages/blog/blog`, type: "link", active: false, selected: false, dirchange: false, title: "Blog" },
					{ path: `${import.meta.env.BASE_URL}pages/blog/blogdetails`, type: "link", active: false, selected: false, dirchange: false, title: "Blog Details " },
					{ path: `${import.meta.env.BASE_URL}pages/blog/createblog`, type: "link", active: false, selected: false, dirchange: false, title: "Create Blog" },
				],
			},
			{ path: `${import.meta.env.BASE_URL}pages/chat`, type: "link", active: false, selected: false, dirchange: false, title: "Chat" },
			{ path: `${import.meta.env.BASE_URL}pages/contacts`, type: "link", active: false, selected: false, dirchange: false, title: "Contacts" },
			{
				title: "Ecommerce", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}pages/ecommerce/addproducts`, type: "link", active: false, selected: false, dirchange: false, title: "Add Products" },
					{ path: `${import.meta.env.BASE_URL}pages/ecommerce/cart`, type: "link", active: false, selected: false, dirchange: false, title: "Cart " },
					{ path: `${import.meta.env.BASE_URL}pages/ecommerce/checkout`, type: "link", active: false, selected: false, dirchange: false, title: "Checkout" },
					{ path: `${import.meta.env.BASE_URL}pages/ecommerce/editproducts`, type: "link", active: false, selected: false, dirchange: false, title: "Edit Products" },
					{ path: `${import.meta.env.BASE_URL}pages/ecommerce/orders`, type: "link", active: false, selected: false, dirchange: false, title: "Orders" },
					{ path: `${import.meta.env.BASE_URL}pages/ecommerce/orderdetails`, type: "link", active: false, selected: false, dirchange: false, title: "Order Details" },
					{ path: `${import.meta.env.BASE_URL}pages/ecommerce/products`, type: "link", active: false, selected: false, dirchange: false, title: "Products" },
					{ path: `${import.meta.env.BASE_URL}pages/ecommerce/productdetails`, type: "link", active: false, selected: false, dirchange: false, title: "Product Details" },
					{ path: `${import.meta.env.BASE_URL}pages/ecommerce/productslist`, type: "link", active: false, selected: false, dirchange: false, title: "Products List" },
					{ path: `${import.meta.env.BASE_URL}pages/ecommerce/wishlist`, type: "link", active: false, selected: false, dirchange: false, title: "Wishlist" },
				],
			},
			{
				title: "Email", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}pages/email/mailapp`, type: "link", active: false, selected: false, dirchange: false, title: "Mail App" },
					{ path: `${import.meta.env.BASE_URL}pages/email/mailchat`, type: "link", active: false, selected: false, dirchange: false, title: "Mail-chat" },
					{ path: `${import.meta.env.BASE_URL}pages/email/mailsettings`, type: "link", active: false, selected: false, dirchange: false, title: "Mail Settings" },
				],
			},
			{ path: `${import.meta.env.BASE_URL}pages/empty`, type: "link", active: false, selected: false, dirchange: false, title: "Empty" },
			{ path: `${import.meta.env.BASE_URL}pages/faqs`, type: "link", active: false, selected: false, dirchange: false, title: "FAQ's" },
			{
				title: "File Manager", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}pages/filemanager/filemanager`, type: "link", active: false, selected: false, dirchange: false, title: "File Manager" },
					{ path: `${import.meta.env.BASE_URL}pages/filemanager/filedetails`, type: "link", active: false, selected: false, dirchange: false, title: "File Details" },
				],
			},
			{
				title: "Invoice", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}pages/invoice/createinvoice`, type: "link", active: false, selected: false, dirchange: false, title: "Create Invoice" },
					{ path: `${import.meta.env.BASE_URL}pages/invoice/invoicedetails`, type: "link", active: false, selected: false, dirchange: false, title: "Invoice Details" },
					{ path: `${import.meta.env.BASE_URL}pages/invoice/invoicelist`, type: "link", active: false, selected: false, dirchange: false, title: "Invoice List" },
				],
			},
			{
				title: "Timeline", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}pages/timeline/timeline1`, type: "link", active: false, selected: false, dirchange: false, title: "Timeline-1" },
					{ path: `${import.meta.env.BASE_URL}pages/timeline/timeline2`, type: "link", active: false, selected: false, dirchange: false, title: "Timeline-2" },
				],
			},
			{ path: `${import.meta.env.BASE_URL}pages/landing`, type: "link", active: false, selected: false, dirchange: false, title: "Landing" },
			{ path: `${import.meta.env.BASE_URL}pages/notifications`, type: "link", active: false, selected: false, dirchange: false, title: "Notifications" },
			{ path: `${import.meta.env.BASE_URL}pages/pricing`, type: "link", active: false, selected: false, dirchange: false, title: "Pricing" },
			{ path: `${import.meta.env.BASE_URL}pages/profile`, type: "link", active: false, selected: false, dirchange: false, title: "Profile" },
			{ path: `${import.meta.env.BASE_URL}pages/reviews`, type: "link", active: false, selected: false, dirchange: false, title: "Reviews" },
			{ path: `${import.meta.env.BASE_URL}pages/team`, type: "link", active: false, selected: false, dirchange: false, title: "Team" },
			{ path: `${import.meta.env.BASE_URL}pages/terms-conditions`, type: "link", active: false, selected: false, dirchange: false, title: "Terms & Conditions" },
			{ path: `${import.meta.env.BASE_URL}pages/todolist`, type: "link", active: false, selected: false, dirchange: false, title: "To Do List" },
		],
	},
	{
		title: "Utilities", icon: icon4, type: "sub", active: false, selected: false, dirchange: false, badgetxt: "",
		children: [
			{ path: `${import.meta.env.BASE_URL}utilities/avatars`, type: "link", active: false, selected: false, dirchange: false, title: "Avatars" },
			{ path: `${import.meta.env.BASE_URL}utilities/borders`, type: "link", active: false, selected: false, dirchange: false, title: "Borders" },
			{ path: `${import.meta.env.BASE_URL}utilities/breakpoints`, type: "link", active: false, selected: false, dirchange: false, title: "Breakpoints" },
			{ path: `${import.meta.env.BASE_URL}utilities/colors`, type: "link", active: false, selected: false, dirchange: false, title: "Colors" },
			{ path: `${import.meta.env.BASE_URL}utilities/columns`, type: "link", active: false, selected: false, dirchange: false, title: "Columns" },
			{ path: `${import.meta.env.BASE_URL}utilities/flex`, type: "link", active: false, selected: false, dirchange: false, title: "Flex" },
			{ path: `${import.meta.env.BASE_URL}utilities/gutters`, type: "link", active: false, selected: false, dirchange: false, title: "Gutters" },
			{ path: `${import.meta.env.BASE_URL}utilities/helpers`, type: "link", active: false, selected: false, dirchange: false, title: "Helpers" },
			{ path: `${import.meta.env.BASE_URL}utilities/position`, type: "link", active: false, selected: false, dirchange: false, title: "Position" },
			{ path: `${import.meta.env.BASE_URL}utilities/additionalContent`, type: "link", active: false, selected: false, dirchange: false, title: "Additional Content" },
		],
	},
	{
		title: "Authentication", icon: icon5, type: "sub", active: false, selected: false, dirchange: false,
		children: [
			{ path: `${import.meta.env.BASE_URL}authentication/comingsoon`, type: "link", active: false, selected: false, dirchange: false, title: "Coming Soon" },
			{
				title: "Create Password", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}authentication/createpassword/createbasic`, type: "link", active: false, selected: false, dirchange: false, title: "Basic" },
					{ path: `${import.meta.env.BASE_URL}authentication/createpassword/createcover1`, type: "link", active: false, selected: false, dirchange: false, title: "Cover" },
					{ path: `${import.meta.env.BASE_URL}authentication/createpassword/createcover2`, type: "link", active: false, selected: false, dirchange: false, title: "Cover2" },
				],
			},
			{
				title: "Lock Screen", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}authentication/lockscreen/lockscreenbasic`, type: "link", active: false, selected: false, dirchange: false, title: "Basic" },
					{ path: `${import.meta.env.BASE_URL}authentication/lockscreen/lockscreencover1`, type: "link", active: false, selected: false, dirchange: false, title: "Cover" },
					{ path: `${import.meta.env.BASE_URL}authentication/lockscreen/lockscreencover2`, type: "link", active: false, selected: false, dirchange: false, title: "Cover2" },
				],
			},
			{
				title: "Reset Password", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}authentication/resetpassword/resetbasic`, type: "link", active: false, selected: false, dirchange: false, title: "Basic" },
					{ path: `${import.meta.env.BASE_URL}authentication/resetpassword/resetcover1`, type: "link", active: false, selected: false, dirchange: false, title: "Cover" },
					{ path: `${import.meta.env.BASE_URL}authentication/resetpassword/resetcover2`, type: "link", active: false, selected: false, dirchange: false, title: "Cover2" },
				],
			},
			{
				title: "Sign Up", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}authentication/signup/signupbasic`, type: "link", active: false, selected: false, dirchange: false, title: "Basic" },
					{ path: `${import.meta.env.BASE_URL}authentication/signup/signupcover1`, type: "link", active: false, selected: false, dirchange: false, title: "Cover" },
					{ path: `${import.meta.env.BASE_URL}authentication/signup/signupcover2`, type: "link", active: false, selected: false, dirchange: false, title: "Cover2" },
				],
			},
			{
				title: "Sign In", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}authentication/signin/signinbasic`, type: "link", active: false, selected: false, dirchange: false, title: "Basic", },
					{ path: `${import.meta.env.BASE_URL}authentication/signin/signincover1`, type: "link", active: false, selected: false, dirchange: false, title: "Cover", },
					{ path: `${import.meta.env.BASE_URL}authentication/signin/signincover2`, type: "link", active: false, selected: false, dirchange: false, title: "Cover2", },
				],
			},
			{
				title: "Two Step Verification", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}authentication/twostepverification/twostepbasic`, type: "link", active: false, selected: false, dirchange: false, title: "Basic" },
					{ path: `${import.meta.env.BASE_URL}authentication/twostepverification/twostepcover1`, type: "link", active: false, selected: false, dirchange: false, title: "Cover" },
					{ path: `${import.meta.env.BASE_URL}authentication/twostepverification/twostepcover2`, type: "link", active: false, selected: false, dirchange: false, title: "Cover2" },
				],
			},
			{ path: `${import.meta.env.BASE_URL}authentication/undermaintenance`, type: "link", active: false, selected: false, dirchange: false, title: "Under Maintainance" },
			{ path: `${import.meta.env.BASE_URL}authentication/nointernet`, type: "link", active: false, selected: false, dirchange: false, title: "no-internet" },
		],
	},
	{
		title: "Error", icon: icon6, type: "sub", active: false, selected: false, dirchange: false,
		children: [
			{ path: `${import.meta.env.BASE_URL}errors/error401`, type: "link", active: false, selected: false, dirchange: false, title: "401-Error" },
			{ path: `${import.meta.env.BASE_URL}errors/error404`, type: "link", active: false, selected: false, dirchange: false, title: "404-Error" },
			{ path: `${import.meta.env.BASE_URL}errors/error500`, type: "link", active: false, selected: false, dirchange: false, title: "500-Error" },
		],
	},
	{
		title: "Apps", icon: icon7, type: "sub", active: false, selected: false, dirchange: false,
		children: [
			{ path: `${import.meta.env.BASE_URL}apps/fullcalendar`, type: "link", active: false, selected: false, dirchange: false, title: "Full Calendar" },
			{ path: `${import.meta.env.BASE_URL}apps/gallery`, type: "link", active: false, selected: false, dirchange: false, title: "Gallery" },
			{ path: `${import.meta.env.BASE_URL}apps/sweetalerts`, type: "link", active: false, selected: false, dirchange: false, title: "Sweet Alerts" },
		],
	},
	{ path: `${import.meta.env.BASE_URL}icons/icons`, icon: icon8, type: "link", active: false, selected: false, dirchange: false, title: "Icons" },
	{ path: `${import.meta.env.BASE_URL}widgets/widgets`, title: "Widgets", icon: icon9, badgetxt: badge2, type: "link", active: false, selected: false },

	{
		menutitle: "web apps",
	},
	{
		title: "Ui Elements", icon: icon10, type: "sub", badgetxt: "", active: false, selected: false, dirchange: false,
		children: [
			{ path: `${import.meta.env.BASE_URL}uielements/alerts`, type: "link", active: false, selected: false, dirchange: false, title: "Alerts" },
			{ path: `${import.meta.env.BASE_URL}uielements/badge`, type: "link", active: false, selected: false, dirchange: false, title: "Badge" },
			{ path: `${import.meta.env.BASE_URL}uielements/breadcrumb`, type: "link", active: false, selected: false, dirchange: false, title: "Breadcrumb" },
			{ path: `${import.meta.env.BASE_URL}uielements/buttons`, type: "link", active: false, selected: false, dirchange: false, title: "Buttons" },
			{ path: `${import.meta.env.BASE_URL}uielements/buttongroup`, type: "link", active: false, selected: false, dirchange: false, title: "Button Group" },
			{ path: `${import.meta.env.BASE_URL}uielements/cards`, type: "link", active: false, selected: false, dirchange: false, title: "Cards" },
			{ path: `${import.meta.env.BASE_URL}uielements/dropdowns`, type: "link", active: false, selected: false, dirchange: false, title: "Dropdowns" },
			{ path: `${import.meta.env.BASE_URL}uielements/images&figures`, type: "link", active: false, selected: false, dirchange: false, title: "Images & Figures" },
			{ path: `${import.meta.env.BASE_URL}uielements/listgroup`, type: "link", active: false, selected: false, dirchange: false, title: "List Group" },
			{ path: `${import.meta.env.BASE_URL}uielements/navs&tabs`, type: "link", active: false, selected: false, dirchange: false, title: "Navs & Tabs" },
			{ path: `${import.meta.env.BASE_URL}uielements/objectfit`, type: "link", active: false, selected: false, dirchange: false, title: "Object Fit" },
			{ path: `${import.meta.env.BASE_URL}uielements/paginations`, type: "link", active: false, selected: false, dirchange: false, title: "Pagination" },
			{ path: `${import.meta.env.BASE_URL}uielements/popovers`, type: "link", active: false, selected: false, dirchange: false, title: "Popovers" },
			{ path: `${import.meta.env.BASE_URL}uielements/progress`, type: "link", active: false, selected: false, dirchange: false, title: "Progress" },
			{ path: `${import.meta.env.BASE_URL}uielements/spinners`, type: "link", active: false, selected: false, dirchange: false, title: "Spinners" },
			{ path: `${import.meta.env.BASE_URL}uielements/toasts`, type: "link", active: false, selected: false, dirchange: false, title: "Toasts" },
			{ path: `${import.meta.env.BASE_URL}uielements/tooltips`, type: "link", active: false, selected: false, dirchange: false, title: "Tooltips" },
			{ path: `${import.meta.env.BASE_URL}uielements/typography`, type: "link", active: false, selected: false, dirchange: false, title: "Typography" },
		],
	},
	{
		title: "Nested Menu", icon: icon11, type: "sub",
		children: [
			{ path: `${import.meta.env.BASE_URL}`, type: "empty", active: false, selected: false, dirchange: false, title: "Nested-1" },
			{
				title: "Nested-2", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}`, type: "empty", active: false, selected: false, dirchange: false, title: "Nested-2-1" },
					{ path: `${import.meta.env.BASE_URL}`, type: "empty", active: false, selected: false, dirchange: false, title: "Nested-2-2" },

				],
			},
		],
	},
	{
		menutitle: "MAPS & CHARTS",
	},
	{
		title: "Maps", icon: icon12, type: "sub", background: "hor-rightangle", active: false, selected: false, dirchange: false,
		children: [
			{ path: `${import.meta.env.BASE_URL}maps/leafletmaps`, type: "link", active: false, selected: false, dirchange: false, title: "Leaflet Maps" },
			{ path: `${import.meta.env.BASE_URL}maps/vectormaps`, type: "link", active: false, selected: false, dirchange: false, title: "Vector Maps" },
		],
	},
	{
		title: "Charts", icon: icon13, type: "sub",
		children: [
			{
				title: "Apex Charts", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}apexcharts/linecharts`, type: "link", active: false, selected: false, dirchange: false, title: "Line Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/areacharts`, type: "link", active: false, selected: false, dirchange: false, title: "Area Charts " },
					{ path: `${import.meta.env.BASE_URL}apexcharts/columncharts`, type: "link", active: false, selected: false, dirchange: false, title: "Column Charts " },
					{ path: `${import.meta.env.BASE_URL}apexcharts/barcharts`, type: "link", active: false, selected: false, dirchange: false, title: "Bar Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/mixedcharts`, type: "link", active: false, selected: false, dirchange: false, title: "Mixed Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/rangeareacharts`, type: "link", active: false, selected: false, dirchange: false, title: "Range Area Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/timelinecharts`, type: "link", active: false, selected: false, dirchange: false, title: "Timeline Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/candlestickcharts`, type: "link", active: false, selected: false, dirchange: false, title: "CandleStick Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/boxplotcharts`, type: "link", active: false, selected: false, dirchange: false, title: "Boxplot Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/bubblecharts`, type: "link", active: false, selected: false, dirchange: false, title: "Bubble Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/scattercharts`, type: "link", active: false, selected: false, dirchange: false, title: "Scatter Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/heatmapcharts`, type: "link", active: false, selected: false, dirchange: false, title: "Heatmap Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/treemapcharts`, type: "link", active: false, selected: false, dirchange: false, title: "Treemap Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/piecharts`, type: "link", active: false, selected: false, dirchange: false, title: "Pie Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/radialbarcharts`, type: "link", active: false, selected: false, dirchange: false, title: "Radialbar Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/radarcharts`, type: "link", active: false, selected: false, dirchange: false, title: "Radar Charts" },
					{ path: `${import.meta.env.BASE_URL}apexcharts/polarareacharts`, type: "link", active: false, selected: false, dirchange: false, title: "Polararea Charts" },
				],
			},
			{ path: `${import.meta.env.BASE_URL}charts/chartjscharts`, type: "link", active: false, selected: false, dirchange: false, title: "ChartJS Charts" },
			{ path: `${import.meta.env.BASE_URL}charts/echartcharts`, type: "link", active: false, selected: false, dirchange: false, title: "Echart Charts" },
		],
	},

	{
		menutitle: "FORMS & TABLES",
	},
	{
		title: "Forms", icon: icon14, type: "sub", active: false, selected: false, dirchange: false,
		children: [
			{
				title: "Form Elements", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}forms/formelements/inputs`, type: "link", active: false, selected: false, dirchange: false, title: "Inputs" },
					{ path: `${import.meta.env.BASE_URL}forms/formelements/checks-radios`, type: "link", active: false, selected: false, dirchange: false, title: "checks&Radios" },
					{ path: `${import.meta.env.BASE_URL}forms/formelements/inputgroups`, type: "link", active: false, selected: false, dirchange: false, title: "Input Group" },
					{ path: `${import.meta.env.BASE_URL}forms/formelements/formselect`, type: "link", active: false, selected: false, dirchange: false, title: "Form Select" },
					{ path: `${import.meta.env.BASE_URL}forms/formelements/rangeslider`, type: "link", active: false, selected: false, dirchange: false, title: "Range Slider" },
					{ path: `${import.meta.env.BASE_URL}forms/formelements/inputmasks`, type: "link", active: false, selected: false, dirchange: false, title: "Input Masks" },
					{ path: `${import.meta.env.BASE_URL}forms/formelements/fileuploads`, type: "link", active: false, selected: false, dirchange: false, title: "File Uploads" },
					{ path: `${import.meta.env.BASE_URL}forms/formelements/datetimepicker`, type: "link", active: false, selected: false, dirchange: false, title: "Date,Time Picker" }
				],
			},
			{ path: `${import.meta.env.BASE_URL}forms/floatinglabels`, type: "link", active: false, selected: false, dirchange: false, title: "Floating Labels" },
			{ path: `${import.meta.env.BASE_URL}forms/formlayouts`, type: "link", active: false, selected: false, dirchange: false, title: "Form Layouts" },
			{
				title: "Form Editors", type: "sub", menusub: true, active: false, selected: false, dirchange: false,
				children: [
					{ path: `${import.meta.env.BASE_URL}forms/formeditors/quilleditor`, type: "link", active: false, selected: false, dirchange: false, title: "Quill Editors" },
				],
			},
			{ path: `${import.meta.env.BASE_URL}forms/validation`, type: "link", active: false, selected: false, dirchange: false, title: "Validation" },
			{ path: `${import.meta.env.BASE_URL}forms/select2`, type: "link", active: false, selected: false, dirchange: false, title: "Select2" },
		],
	},
	{
		title: "Tables", icon: icon15, type: "sub", menutitle: "", badgetxt: badge3, active: false, selected: false, dirchange: false,
		children: [
			{ path: `${import.meta.env.BASE_URL}tables/tables`, type: "link", active: false, selected: false, dirchange: false, title: "Tables" },
			{ path: `${import.meta.env.BASE_URL}tables/gridjs`, type: "link", active: false, selected: false, dirchange: false, title: "Grid JS Tables" },
			{ path: `${import.meta.env.BASE_URL}tables/datatables`, type: "link", active: false, selected: false, dirchange: false, title: "Data Tables" },
		],
	},

];
