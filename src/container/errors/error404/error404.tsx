import React, { FC, Fragment } from "react";
import { Link } from "react-router-dom";

interface Error404Props {}

const Error404: FC<Error404Props> = () => {
  return (
    <Fragment>
      <div className="page error-bg" id="particles-js">
        <canvas className="error-basic-background"></canvas>
        <div className="error-page  ">
          <div className="container">
            <div className="row align-items-center justify-content-center mx-2">
              <div className="col-xxl-7 col-xl-8 col-lg-9 rectangle error-authentication ">
                <div className="text-center authentication-style rectangle1">
                  <div className="lh-1 mb-3 d-inline-table">
                    <span className="text-info text-large fw-bold">4</span>
                    <span className="text-success text-large fw-bold">0</span>
                    <span className="text-warning text-large fw-bold">4</span>
                  </div>
                  <span className="d-block fs-15 mb-3">
                    Oops &#128557;,Tính năng đang phát triển
                  </span>
                  <p className="text-muted fw-normal">
                    Rất xin lỗi vì sự bất tiện này, vui lòng quay lại vào một
                    lần khác
                  </p>

                  <Link
                    to={`${import.meta.env.BASE_URL}dashboards`}
                    className="btn btn-primary mt-3"
                  >
                    <i className="ri-arrow-left-line align-middle me-1 d-inline-block"></i>
                    Trở lại home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Error404;
