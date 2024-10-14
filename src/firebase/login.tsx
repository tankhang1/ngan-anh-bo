import { Fragment, SetStateAction, useRef, useState } from "react";
import { Alert, Button, Card, Col, Form, Nav, Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../redux/api/auth/auth.api";
import { useDispatch } from "react-redux";
import { updateAccountInfo } from "../redux/slices/authSlice";
import { IconLoader } from "@tabler/icons-react";

//IMAGES
// import desktoplogo from "../assets/images/brand-logos/desktop-logo.png";
// import desktopdark from "../assets/images/brand-logos/desktop-dark.png";
// import firebase from "../assets/images/brand-logos/firebase.png";
// import react from "../assets/images/brand-logos/react.png";
// import NganAnhLogo from "../assets/images/brand-logos/ngan-anh-logo.png";

const Home = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const dispatch = useDispatch();
  const [passwordshow1, setpasswordshow1] = useState(false);
  const [err, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;
  const changeHandler = (e: { target: { name: any; value: any } }) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };
  const navigate = useNavigate();
  const routeChange = () => {
    // const path = `${import.meta.env.BASE_URL}dashboards/sales/`;
    const path = `${import.meta.env.BASE_URL}dashboards/`;
    navigate(path);
  };

  const Login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await signIn({
      username: email,
      password: password,
    })
      .unwrap()
      .then((value) => {
        dispatch(
          updateAccountInfo({
            token: value.token,
            roles: value.roles,
            username: value.username,
            roles_permission: value.roles_permission,
          })
        );
        routeChange();
      })
      .catch((err: { message: SetStateAction<string> }) => {
        console.log(err);
        setError("Tài khoản hoặc mật khẩu bị sai");
      });
  };
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center align-items-center authentication authentication-basic h-100">
          <Col xxl={4} xl={5} lg={5} md={6} sm={8} className="col-12">
            <div className="my-5 d-flex justify-content-center"></div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="nextjs">
              <Card>
                <Nav
                  variant="pills"
                  className="justify-content-center authentication-tabs"
                ></Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="nextjs" className="border-0">
                    <div className="card-body p-5 pt-1 rectangle3">
                      <p className="h4 fw-semibold mb-2 text-center">
                        Đăng nhập
                      </p>
                      <p className="mb-4 text-muted op-7 fw-normal text-center">
                        Chào mừng trở lại!
                      </p>
                      <div className="row gy-3">
                        {err && <Alert variant="danger">{err}</Alert>}
                        <div className="col-xl-12">
                          <Form.Label
                            htmlFor="signin-username"
                            className="form-label text-default"
                          >
                            Tài khoản
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control form-control-lg"
                            id="signin-username"
                            placeholder="Nhập tài khoản"
                            name="email"
                            value={email}
                            onChange={changeHandler}
                            required
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Tab") {
                                passwordRef.current?.click();
                              }
                            }}
                          />
                        </div>
                        <div className="col-xl-12 mb-2">
                          <Form.Label
                            htmlFor="signin-password"
                            className="form-label text-default d-block"
                          >
                            Mật khẩu
                          </Form.Label>
                          <div className="input-group">
                            <input
                              className="form-control form-control-lg"
                              id="signin-password"
                              placeholder="Mật khẩu"
                              name="password"
                              type={passwordshow1 ? "text" : "password"}
                              value={password}
                              onChange={changeHandler}
                              required
                              ref={passwordRef}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  Login(e);
                                }
                              }}
                            />

                            <Button
                              variant=""
                              className="btn btn-light bg-transparent"
                              type="button"
                              onClick={() => setpasswordshow1(!passwordshow1)}
                              id="button-addon2"
                            >
                              <i
                                className={`${
                                  passwordshow1
                                    ? "ri-eye-line"
                                    : "ri-eye-off-line"
                                } align-middle`}
                              ></i>
                            </Button>
                          </div>
                          <div className="mt-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="defaultCheck1"
                              />
                              <label
                                className="form-check-label text-muted fw-normal"
                                htmlFor="defaultCheck1"
                              >
                                Nhớ mật khẩu?
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 d-grid mt-2">
                          <Button
                            variant="primary"
                            className={`btn btn-lg justify-content-center align-items-center ${
                              isLoading && "btn-loader "
                            }`}
                            onClick={Login}
                          >
                            <span className="me-2"> Đăng nhập</span>
                            {isLoading && (
                              <span className="loading">
                                <IconLoader size={19} />
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="firebase" className="border-0">
                    <div className="card-body p-5 rectangle3">
                      <p className="h4 fw-semibold mb-2 text-center">Sign In</p>
                      <p className="mb-4 text-muted op-7 fw-normal text-center">
                        Welcome back Jhon !
                      </p>
                      <div className="row gy-3">
                        {err && <Alert variant="danger">{err}</Alert>}
                        <div className="col-xl-12">
                          <label
                            htmlFor="signin-username"
                            className="form-label text-default"
                          >
                            Email
                          </label>
                          <Form.Control
                            type="text"
                            className="form-control form-control-lg"
                            id="signin-username"
                            placeholder="Enter your email"
                            name="email"
                            value={email}
                            onChange={changeHandler}
                            required
                          />
                        </div>
                        <div className="col-xl-12 mb-2">
                          <div className="input-group">
                            <Form.Control
                              className="form-control form-control-lg"
                              id="signin-password"
                              placeholder="Enter your password"
                              name="password"
                              type={passwordshow1 ? "text" : "password"}
                              value={password}
                              onChange={changeHandler}
                              required
                            />
                            <button
                              className="btn btn-light bg-transparent"
                              type="button"
                              onClick={() => setpasswordshow1(!passwordshow1)}
                              id="button-addon2"
                            >
                              <i
                                className={`${
                                  passwordshow1
                                    ? "ri-eye-line"
                                    : "ri-eye-off-line"
                                } align-middle`}
                              ></i>
                            </button>
                          </div>
                          <div className="mt-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="defaultCheck1"
                              />
                              <label
                                className="form-check-label text-muted fw-normal"
                                htmlFor="defaultCheck1"
                              >
                                Remember password ?
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 d-grid mt-2">
                          <Link
                            to={`${import.meta.env.BASE_URL}dashboards/sales`}
                            className="btn btn-lg btn-primary"
                            onClick={Login}
                          >
                            Sign In
                          </Link>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="fs-12 text-muted mt-3">
                          Dont have an account?{" "}
                          <Link
                            to={`${
                              import.meta.env.BASE_URL
                            }authentication/signup/signupbasic`}
                            className="text-primary"
                          >
                            Sign Up
                          </Link>
                        </p>
                      </div>
                      <div className="text-center my-3 authentication-barrier">
                        <span>OR</span>
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Card>
            </Tab.Container>
          </Col>
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
