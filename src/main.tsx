import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ecommerce from "./container/dashboards/ecommerce/ecommerce.tsx";

import Undermaintanace from "./container/authentication/undermaintenance/undermaintenance.tsx";

import Nointernet from "./container/authentication/nointernet/nointernet.tsx";
import Error401 from "./container/errors/error401/error401.tsx";
import Error404 from "./container/errors/error404/error404.tsx";
import Error500 from "./container/errors/error500/error500.tsx";
import Login from "./firebase/login.tsx";
import ScrollToTop from "./components/common/scrolltotop/scrolltotop.tsx";
import "./index.scss";
import ProductCreateEdit from "./container/product/create-edit/product-create-edit.tsx";
import PointProgram from "./container/program/point/point.tsx";
import TopupProgram from "./container/program/topup/topup.tsx";
import TopupCreateEdit from "./container/program/topup/create-edit/topup-create-edit.tsx";
import PointCreateEdit from "./container/program/point/create-edit/point-create-edit.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
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
const Accounts = PageLoading(
  lazy(() => import("./container/accounts/accounts.tsx"))
);
import SettingGroupRetailer from "./container/settings/group-retailer/index.tsx";
import SearchProductCode from "./container/product/search-product-code/index.tsx";
import WarehouseExport from "./container/warehouse/export/warehouseExport.tsx";
import SearchWarehouseExport from "./container/warehouse/export/searchWarehouseExport.tsx";
import WarehouseImport from "./container/warehouse/import/warehouseImport.tsx";
import SearchWarehouseImport from "./container/warehouse/import/searchWarehouseImport.tsx";
import CustomerReport from "./container/report/CustomerReport/index.tsx";
import { PageLoading } from "./redux/middlewares/pageLoading.tsx";
import WarehouseReportExport from "./container/warehouse/export/warehouseReportExport.tsx";
import SMSReport from "./container/report/components/SMSReport.tsx";
import CustomerToday from "./container/operator/customer-today/index.tsx";
import TopupToday from "./container/operator/topup-today/index.tsx";
import CustomerUnValidateToday from "./container/operator/customer-unvalidate-today/index.tsx";
import ProductEditInfo from "./container/product/product-info/edit-info/product-edit-info.tsx";
import ProductEditWarehouse from "./container/product/product-warehouse/edit-warehouse/product-edit-warehouse.tsx";
import ProductWarehousePage from "./container/product/product-warehouse/index.tsx";
import ProductInfoPage from "./container/product/product-info/index.tsx";
import ProductCreate from "./container/product/create-edit/product-create-edit.tsx";
import CustomerValidateToday from "./container/operator/customer-validate-today/index.tsx";
import SearchCustomer from "./container/customer/search-customer/index.tsx";
import SettingBrandPage from "./container/settings/brand/index.tsx";
import SettingFormulationPage from "./container/settings/formulation/index.tsx";
import SettingIndicationPage from "./container/settings/indication/index.tsx";
import SMSGateway from "./container/operator/sms-gateway/index.tsx";
import IQRToday from "./container/operator/iqr/index.tsx";
import CreateMaterialWarehouse from "./container/warehouse/material/create/index.tsx";
import FillMaterialWarehouse from "./container/warehouse/material/fill/index.tsx";
import ManageMaterial from "./container/warehouse/material/manage/manage-material.tsx";
import ManageMaterialUpdate from "./container/warehouse/material/manage/update/manage-material-update.tsx";
import ManageMaterialPacking from "./container/warehouse/material/manage/mange-material-packing.tsx";

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
              <Route
                path={`${import.meta.env.BASE_URL}warehouse/export`}
                element={<WarehouseExport />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}warehouse/import`}
                element={<WarehouseImport />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }warehouse/export/search-warehouse-export`}
                element={<SearchWarehouseExport />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}warehouse/report/export`}
                element={<WarehouseReportExport />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }warehouse/import/search-warehouse-import`}
                element={<SearchWarehouseImport />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}warehouse/material-create`}
                element={<CreateMaterialWarehouse />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}warehouse/material-fill`}
                element={<FillMaterialWarehouse />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}warehouse/report-material`}
                element={<ManageMaterial />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }warehouse/report-material-packing`}
                element={<ManageMaterialPacking />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }warehouse/report-material/update/:code`}
                element={<ManageMaterialUpdate />}
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
                path={`${import.meta.env.BASE_URL}product/info`}
                element={<ProductInfoPage />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}product/warehouse`}
                element={<ProductWarehousePage />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}product/warehouse/create`}
                element={<ProductCreate />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}product/info/create`}
                element={<ProductCreate />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}product/info/edit/:id`}
                element={<ProductEditInfo />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}product/warehouse/edit/:id`}
                element={<ProductEditWarehouse />}
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
                path={`${import.meta.env.BASE_URL}product/search`}
                element={<SearchProductCode />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }operator/search-customer-unvalidate-today`}
                element={<CustomerUnValidateToday />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }operator/search-customer-unvalidate-today`}
                element={<CustomerUnValidateToday />}
              />
              <Route
                path={`${
                  import.meta.env.BASE_URL
                }operator/search-customer-validate-today`}
                element={<CustomerValidateToday />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}operator/iqr-today`}
                element={<IQRToday />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}customer/search`}
                element={<SearchCustomer />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}operator/search-topup-today`}
                element={<TopupToday />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}operator/sms-gateway`}
                element={<SMSGateway />}
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

              <Route
                path={`${import.meta.env.BASE_URL}report/customer`}
                element={<CustomerReport />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}report/iQr`}
                element={<IQrReport />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}report/sms`}
                element={<SMSReport />}
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
                path={`${import.meta.env.BASE_URL}setting/brand`}
                element={<SettingBrandPage />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}setting/formulation`}
                element={<SettingFormulationPage />}
              />
              <Route
                path={`${import.meta.env.BASE_URL}setting/indication`}
                element={<SettingIndicationPage />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}authentication/nointernet`}
                element={<Nointernet />}
              />

              <Route
                path={`${import.meta.env.BASE_URL}errors/error401`}
                element={<Error401 />}
              />
              <Route path={"*"} element={<Error404 />} />
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
