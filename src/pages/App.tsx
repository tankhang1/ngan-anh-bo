import { Fragment, useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import store, { persistor, RootState } from "../redux/store";
import Header from "../components/common/header/header";
import Switcher from "../components/common/switcher/switcher";
import Sidebar from "../components/common/sidebar/sidebar";
import Pageheader from "../components/pageheader/pageheader";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/common/footer/footer";
import Tabtotop from "../components/common/tab-to-tap/tabtotap";
import ToastProvider from "../components/AppToast";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);
  const [lateLoad, setlateLoad] = useState(false);
  useEffect(() => {
    setlateLoad(true);
  });

  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);
  return (
    <Fragment>
      <ToastProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div style={{ display: `${lateLoad ? "block" : "none"}` }}>
              <Switcher />
              <div className="page">
                <Header />
                <Sidebar />
                <Pageheader />
                <div className="main-content app-content">
                  <div className="container-fluid">
                    <Outlet />
                  </div>
                </div>
                <Footer />
              </div>

              <Tabtotop />
            </div>
          </PersistGate>
        </Provider>
      </ToastProvider>
    </Fragment>
  );
}

export default App;
