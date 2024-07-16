import { Outlet } from "react-router-dom";
import store from "../redux/store";
import { Provider } from "react-redux";

const Auth = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Auth;
