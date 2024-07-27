import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
// import Analytics from "./container/dashboards/analytics/analytics.tsx";
// import Courses from "./container/dashboards/courses/courses.tsx";
// import Crm from "./container/dashboards/crm/crm.tsx";
// import Crypto from "./container/dashboards/crypto/crypto.tsx";
import Ecommerce from "./container/dashboards/ecommerce/ecommerce.tsx";
// import Hrm from "./container/dashboards/hrm/hrm.tsx";
// import Jobs from "./container/dashboards/jobs/jobs.tsx";
// import Nft from "./container/dashboards/nft/nft.tsx";
// import Personal from "./container/dashboards/personal/personal.tsx";
// import Projects from "./container/dashboards/projects/projects.tsx";
// import Sales from "./container/dashboards/sales/sales.tsx";
// import Stocks from "./container/dashboards/stocks/stocks.tsx";
import Alerts from "./container/uielements/alerts/alerts.tsx";
import Badge from "./container/uielements/badge/badge.tsx";
import Breadcrumb from "./container/uielements/breadcrumb/breadcrumb.tsx";
import Buttons from "./container/uielements/buttons/buttons.tsx";
import Buttongroup from "./container/uielements/buttongroup/buttongroup.tsx";
import Cards from "./container/uielements/cards/cards.tsx";
import Dropdowns from "./container/uielements/dropdown/dropdown.tsx";
import Imagesandfigure from "./container/uielements/images-figure/images-figure.tsx";
import Listgroup from "./container/uielements/listgroup/listgroup.tsx";
import Navtabs from "./container/uielements/navs-tabs/navs-tabs.tsx";
import Objectfit from "./container/uielements/objectfit/objectfit.tsx";
import Pagination from "./container/uielements/pagination/pagination.tsx";
import Popovers from "./container/uielements/popovers/popovers.tsx";
import Progress from "./container/uielements/progress/progress.tsx";
import Spinners from "./container/uielements/spinners/spinners.tsx";
import Toasts from "./container/uielements/toasts/toasts.tsx";
import Tooltips from "./container/uielements/tooltips/tooltips.tsx";
import Typography from "./container/uielements/typography/typography.tsx";
import Accordioncollapse from "./container/advancedui/accordions-collapse/accordions-collapse.tsx";
import Draggablecards from "./container/advancedui/draggablecards/draggable cards.tsx";
import Modalcloses from "./container/advancedui/modals-closes/modals-closes.tsx";
import Navbar from "./container/advancedui/navbar/navbar.tsx";
import Offcanvas from "./container/advancedui/offcanvas/offcanvas.tsx";
import Swiperjs from "./container/advancedui/swiperjs/swiperjs.tsx";
import Carousel from "./container/advancedui/carousel/carousel.tsx";
import Ratings from "./container/advancedui/ratings/ratings.tsx";
import Placeholders from "./container/advancedui/placeholders/placeholders.tsx";
import Fullacalendar from "./container/apps/fullcalendar/fullcalendar.tsx";
import Gallery from "./container/apps/gallery/gallery.tsx";
import Sweetalerts from "./container/apps/sweetalerts/sweetalerts.tsx";
import Linechart from "./container/charts/apexcharts/linechart/linechart.tsx";
import Areachart from "./container/charts/apexcharts/areachart/areachart.tsx";
import Columnchart from "./container/charts/apexcharts/columnchart/columnchart.tsx";
import Barchart from "./container/charts/apexcharts/barchart/barchart.tsx";
import Mixedchart from "./container/charts/apexcharts/mixedchart/mixedchart.tsx";
import Rangeareachart from "./container/charts/apexcharts/rangeareachart/rangeareachart.tsx";
import Timelinechart from "./container/charts/apexcharts/timelinechart/timelinechart.tsx";
import Candlestickchart from "./container/charts/apexcharts/candlestickchart/candlestickchart.tsx";
import Boxplotchart from "./container/charts/apexcharts/boxplotchart/boxplotchart.tsx";
import Bubblechart from "./container/charts/apexcharts/bubblechart/bubblechart.tsx";
import Scatterchart from "./container/charts/apexcharts/scatterchart/scatterchart.tsx";
import Heatmapchart from "./container/charts/apexcharts/heatmapchart/heatmapchart.tsx";
import Treemapchart from "./container/charts/apexcharts/treemapchart/treemapchart.tsx";
import Piechart from "./container/charts/apexcharts/piechart/piechart.tsx";
import Radialbarchart from "./container/charts/apexcharts/radialbarchart/radialbarchart.tsx";
import Polarareachart from "./container/charts/apexcharts/polarareachart/polarareachart.tsx";
import Radarchart from "./container/charts/apexcharts/radarchart/radarchart.tsx";
import Chartjs from "./container/charts/chartjschart/chartjschart.tsx";
import Echarts from "./container/charts/echarts/echarts.tsx";
import Leafletmaps from "./container/maps/leafletmaps/leafletmaps.tsx";
import Vectormaps from "./container/maps/vectormaps/vectormaps.tsx";
import Icons from "./container/icons/icons.tsx";
import Undermaintanace from "./container/authentication/undermaintenance/undermaintenance.tsx";
import Lockbasic from "./container/authentication/lockscreen/basic/lockbasic.tsx";
import Lockcover1 from "./container/authentication/lockscreen/cover1/lockcover1.tsx";
import Lockcover2 from "./container/authentication/lockscreen/cover2/lockcover2.tsx";
import Resetbasic from "./container/authentication/resetpassword/basic/resetbasic.tsx";
import Resetcover1 from "./container/authentication/resetpassword/cover1/resetcover1.tsx";
import Resetcover2 from "./container/authentication/resetpassword/cover2/resetcover2.tsx";
import Signupbasic from "./container/authentication/signup/signbasic/signbasic.tsx";
import Signupcover1 from "./container/authentication/signup/signupcover1/signupcover1.tsx";
import Signupcover2 from "./container/authentication/signup/signupcover2/signupcover2.tsx";
import Signinbasic from "./container/authentication/signin/basic/signinbasic.tsx";
import Signincover1 from "./container/authentication/signin/cover1/signincover1.tsx";
import Signincover2 from "./container/authentication/signin/cover2/signincover2.tsx";
import Twostepbasic from "./container/authentication/twostepverification/twostepbasic/twostepbasic.tsx";
import Twostepcover1 from "./container/authentication/twostepverification/twostepcover1/twostepcover1.tsx";
import Twostepcover2 from "./container/authentication/twostepverification/twostepcover2/twostepcover2.tsx";
import Createbasic from "./container/authentication/createpassword/basic/createbasic.tsx";
import Createcover1 from "./container/authentication/createpassword/cover1/createcover1.tsx";
import Createcover2 from "./container/authentication/createpassword/cover2/createcover2.tsx";
import Nointernet from "./container/authentication/nointernet/nointernet.tsx";
import Error401 from "./container/errors/error401/error401.tsx";
import Error404 from "./container/errors/error404/error404.tsx";
import Error500 from "./container/errors/error500/error500.tsx";
import Avatars from "./container/utilities/avatars/avatars.tsx";
import Borders from "./container/utilities/borders/borders.tsx";
import Colors from "./container/utilities/colors/colors.tsx";
import Breakpoints from "./container/utilities/breakpoints/breakpoints.tsx";
import Flex from "./container/utilities/flex/flex.tsx";
import Columns from "./container/utilities/columns/columns.tsx";
import Gutter from "./container/utilities/gutters/gutters.tsx";
import Helper from "./container/utilities/helpers/helpers.tsx";
import Position from "./container/utilities/position/position.tsx";
import Tables from "./container/tables/tables/tables.tsx";
import Gridjstables from "./container/tables/gridjs/gridjs.tsx";
import Datatables from "./container/tables/datatables/datatables.tsx";
import Blog from "./container/pages/blog/blog/blog.tsx";
import Blogdetails from "./container/pages/blog/blogdetails/blogdetails.tsx";
import Createblog from "./container/pages/blog/createblog/createblog.tsx";
import Chat from "./container/pages/chat/chat.tsx";
import Contacts from "./container/pages/contacts/contacts.tsx";
import Addproducts from "./container/pages/ecommerce/addproducts/addproducts.tsx";
import Cart from "./container/pages/ecommerce/cart/cart.tsx";
import Checkout from "./container/pages/ecommerce/checkout/checkout.tsx";
import Editproducts from "./container/pages/ecommerce/editproducts/editproducts.tsx";
import Orderdetails from "./container/pages/ecommerce/orderdetails/orderdetails.tsx";
import Orders from "./container/pages/ecommerce/orders/orders.tsx";
import Products from "./container/pages/ecommerce/products/products.tsx";
import Productdetails from "./container/pages/ecommerce/productdetails/productdetails.tsx";
import Productlist from "./container/pages/ecommerce/productlist/productlist.tsx";
import Wishlist from "./container/pages/ecommerce/wishlist/wishlist.tsx";
import Mailapp from "./container/pages/emails/mailapp/mailapp.tsx";
import Mailsettings from "./container/pages/emails/mailsettings/mailsettings.tsx";
import Empty from "./container/pages/empty/empty.tsx";
import Faqs from "./container/pages/faqs/faqs.tsx";
import Filemanager from "./container/pages/filemanager/filemanager/filemanager.tsx";
import Filedetails from "./container/pages/filemanager/filedetails/filedetails.tsx";
import Createinvoice from "./container/pages/invoice/createinvoice/createinvoice.tsx";
import Invoicedetails from "./container/pages/invoice/invoicedetails/invoicedetails.tsx";
import Invoicelist from "./container/pages/invoice/invoicelist/invoicelist.tsx";
import Notifications from "./container/pages/notifications/notifications.tsx";
import Pricing from "./container/pages/pricing/pricing.tsx";
import Profile from "./container/pages/profile/profile.tsx";
import Reviews from "./container/pages/reviews/reviews.tsx";
import Team from "./container/pages/team/team.tsx";
import Termsconditions from "./container/pages/terms-conditions/terms-conditions.tsx";
import Timeline1 from "./container/pages/timeline/timeline1/timeline1.tsx";
import Timeline2 from "./container/pages/timeline/timeline2/timeline2.tsx";
import Todolist from "./container/pages/todolist/todolist.tsx";
import Widgets from "./container/widgets/widgets.tsx";
import Auth from "./firebase/auth.tsx";
import Login from "./firebase/login.tsx";
import Signup from "./firebase/signup.tsx";
import Inputs from "./container/forms/formelements/inputs/inputs.tsx";
import Inputgroup from "./container/forms/formelements/inputgroup/inputgroup.tsx";
import Formselect from "./container/forms/formelements/formselect/formselect.tsx";
import Datetimepicker from "./container/forms/formelements/datetimepicker/datetimepicker.tsx";
import Comingsoon from "./container/authentication/comingsoon/comingsoon.tsx";
import Authenticationlayout from "./pages/authenticationlayout.tsx";
import Landinglayout from "./pages/landinglayout.tsx";
import Landing from "./container/pages/landing/landing.tsx";
import AdditionalContent from "./container/utilities/additional-content/additional-content.tsx";
import Rangesliders from "./container/forms/formelements/rangeslider/rangeslider.tsx";
import Checksradio from "./container/forms/formelements/checksradio/checksradio.tsx";
import Fileuploads from "./container/forms/formelements/fileuploads/fileuploads.tsx";
import Inputmask from "./container/forms/formelements/inputmask/inputmask.tsx";
import Validation from "./container/forms/validation/validation.tsx";
import Select2 from "./container/forms/select2/select2.tsx";
import Formeditors from "./container/forms/formeditors/formeditors.tsx";
import Floatinglables from "./container/forms/floatinglables/floatinglables.tsx";
import Formlayout from "./container/forms/formlayout/formlayout.tsx";
import Mailchat from "./container/pages/emails/mailchat/mailchat.tsx";
import Pagelayout from "./pages/pagelayout.tsx";
import ScrollToTop from "./components/common/scrolltotop/scrolltotop.tsx";
import "./index.scss";
import ProductPage from "./container/product/index.tsx";
import ProductCreateEdit from "./container/product/create-edit/product-create-edit.tsx";
import PointProgram from "./container/program/point/point.tsx";
import TopupProgram from "./container/program/topup/topup.tsx";
import TopupCreateEdit from "./container/program/topup/create-edit/topup-create-edit.tsx";
import PointCreateEdit from "./container/program/point/create-edit/point-create-edit.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import AgentReport from "./container/report/AgentReport/index.tsx";
import FarmerReport from "./container/report/FarmerReport/index.tsx";
import IQrReport from "./container/report/iQrReport/index.tsx";
import ProgramReport from "./container/report/ProgramReport/index.tsx";
import TopupReport from "./container/report/TopupReport/index.tsx";
import SettingArea from "./container/settings/area/index.tsx";
import SettingGroupCustomer from "./container/settings/group-customer/index.tsx";
import CustomerValidationCreateEdit from "./container/customer/validate/create-edit/customer-validate-create-edit.tsx";
import CustomerValidation from "./container/customer/validate/customer-validate.tsx";
import CustomerUnValidation from "./container/customer/unvalidate/customer-unvalidate.tsx";
import CustomerUnValidationCreateEdit from "./container/customer/unvalidate/create-edit/customer-unvalidate-create-edit.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <Provider store={store}>
      <HashRouter>
        <ScrollToTop />
        <React.Suspense>
          <Routes>
            <Route path={`${import.meta.env.BASE_URL}`} element={<Login />} />
            <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
              {/* <Route
              path={`${import.meta.env.BASE_URL}dashboards/crm`}
              element={<Crm />}
            /> */}
              <Route
                path={`${import.meta.env.BASE_URL}dashboards`}
                element={<Ecommerce />}
              />
              {/* <Route
              path={`${import.meta.env.BASE_URL}dashboards/crypto`}
              element={<Crypto />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/jobs`}
              element={<Jobs />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/nft`}
              element={<Nft />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/sales`}
              element={<Sales />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/analytics`}
              element={<Analytics />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/projects`}
              element={<Projects />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/hrm`}
              element={<Hrm />}
            /> */}
              {/* <Route
              path={`${import.meta.env.BASE_URL}dashboards/stocks`}
              element={<Stocks />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/courses`}
              element={<Courses />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/personal`}
              element={<Personal />}
            /> */}

              <Route
                path={`${import.meta.env.BASE_URL}pages/blog/blogdetails`}
                element={<Blogdetails />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/blog/createblog`}
                element={<Createblog />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}pages/chat`}
                element={<Chat />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/contacts`}
                element={<Contacts />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}pages/ecommerce/addproducts`}
                element={<Addproducts />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/ecommerce/cart`}
                element={<Cart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/ecommerce/checkout`}
                element={<Checkout />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/ecommerce/editproducts`}
                element={<Editproducts />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/ecommerce/orderdetails`}
                element={<Orderdetails />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/ecommerce/orders`}
                element={<Orders />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/ecommerce/products`}
                element={<Products />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }pages/ecommerce/productdetails`}
                element={<Productdetails />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/ecommerce/productslist`}
                element={<Productlist />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/ecommerce/wishlist`}
                element={<Wishlist />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}pages/email/mailapp`}
                element={<Mailapp />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/email/mailchat`}
                element={<Mailchat />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/email/mailsettings`}
                element={<Mailsettings />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}pages/empty`}
                element={<Empty />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/faqs`}
                element={<Faqs />}
              />

              <Route
                path={`${
                  import.meta.env.BASE_URL
                }pages/filemanager/filemanager`}
                element={<Filemanager />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }pages/filemanager/filedetails`}
                element={<Filedetails />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}pages/invoice/createinvoice`}
                element={<Createinvoice />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/invoice/invoicedetails`}
                element={<Invoicedetails />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/invoice/invoicelist`}
                element={<Invoicelist />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}pages/notifications`}
                element={<Notifications />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/pricing`}
                element={<Pricing />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/profile`}
                element={<Profile />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/reviews`}
                element={<Reviews />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/team`}
                element={<Team />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/terms-conditions`}
                element={<Termsconditions />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/timeline/timeline1`}
                element={<Timeline1 />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/timeline/timeline2`}
                element={<Timeline2 />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}pages/todolist`}
                element={<Todolist />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}uielements/alerts`}
                element={<Alerts />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/badge`}
                element={<Badge />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/breadcrumb`}
                element={<Breadcrumb />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/buttons`}
                element={<Buttons />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/buttongroup`}
                element={<Buttongroup />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/cards`}
                element={<Cards />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/dropdowns`}
                element={<Dropdowns />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/images&figures`}
                element={<Imagesandfigure />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/listgroup`}
                element={<Listgroup />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/navs&tabs`}
                element={<Navtabs />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/objectfit`}
                element={<Objectfit />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/paginations`}
                element={<Pagination />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/popovers`}
                element={<Popovers />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/progress`}
                element={<Progress />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/spinners`}
                element={<Spinners />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/toasts`}
                element={<Toasts />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/tooltips`}
                element={<Tooltips />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}uielements/typography`}
                element={<Typography />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}utilities/avatars`}
                element={<Avatars />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}utilities/borders`}
                element={<Borders />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}utilities/colors`}
                element={<Colors />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}utilities/flex`}
                element={<Flex />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}utilities/columns`}
                element={<Columns />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}utilities/breakpoints`}
                element={<Breakpoints />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}utilities/gutters`}
                element={<Gutter />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}utilities/helpers`}
                element={<Helper />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}utilities/position`}
                element={<Position />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}utilities/additionalContent`}
                element={<AdditionalContent />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}forms/formelements/inputs`}
                element={<Inputs />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }forms/formelements/checks-radios`}
                element={<Checksradio />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }forms/formelements/inputgroups`}
                element={<Inputgroup />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }forms/formelements/formselect`}
                element={<Formselect />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }forms/formelements/rangeslider`}
                element={<Rangesliders />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }forms/formelements/inputmasks`}
                element={<Inputmask />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }forms/formelements/fileuploads`}
                element={<Fileuploads />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }forms/formelements/datetimepicker`}
                element={<Datetimepicker />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}forms/validation`}
                element={<Validation />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}forms/select2`}
                element={<Select2 />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}forms/floatinglabels`}
                element={<Floatinglables />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}forms/formlayouts`}
                element={<Formlayout />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }forms/formeditors/quilleditor`}
                element={<Formeditors />}
              />

              <Route
                path={`${
                  import.meta.env.BASE_URL
                }customer/validate/ce/:isCreate/:id`}
                element={<CustomerValidationCreateEdit />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}customer/validate`}
                element={<CustomerValidation />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }customer/unvalidate/ce/:isCreate/:id`}
                element={<CustomerUnValidationCreateEdit />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}customer/unvalidate`}
                element={<CustomerUnValidation />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}product`}
                element={<ProductPage />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}product/ce/:isCreate/:id`}
                element={<ProductCreateEdit />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}program/point`}
                element={<PointProgram />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }program/point/ce/:isCreate/:id`}
                element={<PointCreateEdit />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}program/topup`}
                element={<TopupProgram />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }program/topup/ce/:isCreate/:id`}
                element={<TopupCreateEdit />}
              />
              {/* <Route
                path={`${import.meta.env.BASE_URL}report`}
                element={<ReportPage />}
              /> */}
              <Route
                path={`${import.meta.env.BASE_URL}report/agent`}
                element={<AgentReport />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}report/farmer`}
                element={<FarmerReport />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}report/iQr`}
                element={<IQrReport />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}report/program`}
                element={<ProgramReport />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}report/topup`}
                element={<TopupReport />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}setting/area`}
                element={<SettingArea />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}setting/group-customer`}
                element={<SettingGroupCustomer />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }advancedui/accordions-collapse`}
                element={<Accordioncollapse />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}advancedui/draggablecards`}
                element={<Draggablecards />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}advancedui/modals-closes`}
                element={<Modalcloses />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}advancedui/navbar`}
                element={<Navbar />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}advancedui/offcanvas`}
                element={<Offcanvas />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}advancedui/ratings`}
                element={<Ratings />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}advancedui/swiperjs`}
                element={<Swiperjs />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}advancedui/carousel`}
                element={<Carousel />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}advancedui/placeholders`}
                element={<Placeholders />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}widgets/widgets`}
                element={<Widgets />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}apps/fullcalendar`}
                element={<Fullacalendar />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apps/gallery`}
                element={<Gallery />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apps/sweetalerts`}
                element={<Sweetalerts />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}tables/tables`}
                element={<Tables />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}tables/gridjs`}
                element={<Gridjstables />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}tables/datatables`}
                element={<Datatables />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/linecharts`}
                element={<Linechart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/areacharts`}
                element={<Areachart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/columncharts`}
                element={<Columnchart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/barcharts`}
                element={<Barchart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/mixedcharts`}
                element={<Mixedchart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/rangeareacharts`}
                element={<Rangeareachart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/timelinecharts`}
                element={<Timelinechart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/candlestickcharts`}
                element={<Candlestickchart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/boxplotcharts`}
                element={<Boxplotchart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/bubblecharts`}
                element={<Bubblechart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/scattercharts`}
                element={<Scatterchart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/heatmapcharts`}
                element={<Heatmapchart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/treemapcharts`}
                element={<Treemapchart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/piecharts`}
                element={<Piechart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/radialbarcharts`}
                element={<Radialbarchart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/polarareacharts`}
                element={<Polarareachart />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}apexcharts/radarcharts`}
                element={<Radarchart />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}charts/chartjscharts`}
                element={<Chartjs />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}charts/echartcharts`}
                element={<Echarts />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}maps/leafletmaps`}
                element={<Leafletmaps />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}maps/vectormaps`}
                element={<Vectormaps />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}icons/icons`}
                element={<Icons />}
              />
            </Route>
            <Route
              path={`${import.meta.env.BASE_URL}`}
              element={<Authenticationlayout />}
            >
              <Route
                path={`${import.meta.env.BASE_URL}authentication/comingsoon`}
                element={<Comingsoon />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/createpassword/createbasic`}
                element={<Createbasic />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/createpassword/createcover1`}
                element={<Createcover1 />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/createpassword/createcover2`}
                element={<Createcover2 />}
              />

              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/lockscreen/lockscreenbasic`}
                element={<Lockbasic />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/lockscreen/lockscreencover1`}
                element={<Lockcover1 />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/lockscreen/lockscreencover2`}
                element={<Lockcover2 />}
              />

              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/resetpassword/resetbasic`}
                element={<Resetbasic />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/resetpassword/resetcover1`}
                element={<Resetcover1 />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/resetpassword/resetcover2`}
                element={<Resetcover2 />}
              />

              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/signup/signupbasic`}
                element={<Signupbasic />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/signup/signupcover1`}
                element={<Signupcover1 />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/signup/signupcover2`}
                element={<Signupcover2 />}
              />

              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/signin/signinbasic`}
                element={<Signinbasic />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/signin/signincover1`}
                element={<Signincover1 />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/signin/signincover2`}
                element={<Signincover2 />}
              />

              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/twostepverification/twostepbasic`}
                element={<Twostepbasic />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/twostepverification/twostepcover1`}
                element={<Twostepcover1 />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/twostepverification/twostepcover2`}
                element={<Twostepcover2 />}
              />

              <Route
                path={`${
                  import.meta.env.BASE_URL
                }authentication/undermaintenance`}
                element={<Undermaintanace />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}authentication/nointernet`}
                element={<Nointernet />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}errors/error401`}
                element={<Error401 />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}errors/error404`}
                element={<Error404 />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}errors/error500`}
                element={<Error500 />}
              />
            </Route>
            <Route
              path={`${import.meta.env.BASE_URL}`}
              element={<Landinglayout />}
            >
              <Route
                path={`${import.meta.env.BASE_URL}pages/landing`}
                element={<Landing />}
              />
            </Route>
            <Route
              path={`${import.meta.env.BASE_URL}`}
              element={<Pagelayout />}
            >
              <Route
                path={`${import.meta.env.BASE_URL}pages/blog/blog`}
                element={<Blog />}
              />
            </Route>
          </Routes>
        </React.Suspense>
      </HashRouter>
    </Provider>
  </React.Fragment>
);
