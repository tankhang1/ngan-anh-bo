import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ecommerce from "./container/dashboards/ecommerce/ecommerce.tsx";

import Ratings from "./container/advancedui/ratings/ratings.tsx";

import Undermaintanace from "./container/authentication/undermaintenance/undermaintenance.tsx";

import Nointernet from "./container/authentication/nointernet/nointernet.tsx";
import Error401 from "./container/errors/error401/error401.tsx";
import Error404 from "./container/errors/error404/error404.tsx";
import Error500 from "./container/errors/error500/error500.tsx";
import Login from "./firebase/login.tsx";
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
import Employee from "./container/employee/employee.tsx";
import EmployeeCreateEdit from "./container/employee/create-edit/employee-create-edit.tsx";
import EmployeeRole from "./container/employee/role/employee-role.tsx";
import EmployeeDepartment from "./container/employee/department/employee-department.tsx";
import Accounts from "./container/accounts/accounts.tsx";
import SettingGroupRetailer from "./container/settings/group-retailer/index.tsx";
import SearchProductCode from "./container/operator/search-product-code/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <React.Suspense>
          <Routes>
            <Route path={`${import.meta.env.BASE_URL}`} element={<Login />} />
            <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
              <Route
                path={`${import.meta.env.BASE_URL}dashboards`}
                element={<Ecommerce />}
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
              {/* <Route
                path={`${
                  import.meta.env.BASE_URL
                }warehouse/export`}
                element={<CustomerUnValidationCreateEdit />}
              /> */}
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
                path={`${import.meta.env.BASE_URL}employee/role`}
                element={<EmployeeRole />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}employee/department`}
                element={<EmployeeDepartment />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}employee/ce/:isCreate/:id`}
                element={<EmployeeCreateEdit />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}employee`}
                element={<Employee />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}accounts`}
                element={<Accounts />}
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
                path={`${import.meta.env.BASE_URL}operator/search-product-code`}
                element={<SearchProductCode />}
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
                path={`${import.meta.env.BASE_URL}report/program-point`}
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
                path={`${import.meta.env.BASE_URL}setting/group-retailer`}
                element={<SettingGroupRetailer />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}advancedui/ratings`}
                element={<Ratings />}
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
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  </React.Fragment>
);
