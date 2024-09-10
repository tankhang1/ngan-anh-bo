import React, {
  createContext,
  forwardRef,
  memo,
  startTransition,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import ngan_anh_logo from "../../assets/images/brand-logos/ngan-anh-logo.png";
type TAppToastRef = {
  showToast: (config: string) => void;
  closeToast: () => void;
};
export const ToastContext = createContext<TAppToastRef>({
  showToast: () => {},
  closeToast: () => {},
});
type TAppToast = {};

const AppToast = memo(
  forwardRef<TAppToastRef, TAppToast>((_, ref) => {
    const [openToast, setOpenToast] = useState(false);
    const [config, setConfig] = useState("");
    const showToast = (message: string) => {
      startTransition(() => {
        setOpenToast(true);
        setConfig(message);
      });
      // const timeout = setTimeout(() => {
      //   startTransition(() => {
      //     setOpenToast(false);
      //   });
      // }, 30000);
      // return clearTimeout(timeout);
    };
    const closeToast = () => {
      startTransition(() => {
        setOpenToast(false);
      });
    };
    useImperativeHandle(ref, () => ({
      showToast: showToast,
      closeToast: closeToast,
    }));

    return (
      <ToastContainer
        className="toast-container position-fixed top-0 end-0 p-4"
        style={{ zIndex: 9999 }}
      >
        <Toast
          id="topright-Toast"
          className="toast shadow-sm rounded-lg bg-light"
          color="red"
          onClose={closeToast}
          show={openToast}
          delay={7000}
          autohide
        >
          <Toast.Header className="d-flex align-items-center bg-primary text-white">
            <img
              className="rounded me-3"
              src={ngan_anh_logo}
              alt="Ngân Anh Logo"
              style={{ width: "30px", height: "30px" }}
            />
            <strong className="me-auto">Ngân Anh</strong>
          </Toast.Header>
          <Toast.Body className="p-3 bg-white rounded-bottom">
            <h6 className="text-dark mb-1">Thông báo</h6>
            <p className="mb-0 text-muted">{config}</p>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    );
  })
);

const ToastProvider = ({ children }: { children: any }) => {
  const toastRef = useRef<TAppToastRef>({
    showToast: () => {},
    closeToast: () => {},
  });
  const showToast = (config: string) => {
    toastRef.current?.showToast(config);
  };
  const closeToast = () => {
    toastRef.current?.closeToast();
  };
  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      <AppToast ref={toastRef} />
    </ToastContext.Provider>
  );
};
export default ToastProvider;
