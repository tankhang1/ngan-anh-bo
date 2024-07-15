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
type TAppToastRef = {
  showToast: (config: string) => void;
  closeToast: () => void;
};
export const ToastContext = createContext<TAppToastRef>({
  showToast: (message: string) => {},
  closeToast: () => {},
});
type TAppToast = {};

const AppToast = memo(
  forwardRef<TAppToastRef, TAppToast>((props, ref) => {
    const [openToast, setOpenToast] = useState(false);
    const [config, setConfig] = useState("");
    const showToast = (message: string) => {
      startTransition(() => {
        setOpenToast(true);
        setConfig(config);
      });
      const timeout = setTimeout(() => {
        startTransition(() => {
          setOpenToast(false);
        });
      }, 30000);
      return clearTimeout(timeout);
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
      <ToastContainer className="toast-container position-fixed top-0 end-0 p-3">
        <Toast
          id="topright-Toast"
          className="toast colored-toast bg-primary-transparent text-primary"
          onClose={closeToast}
          show={openToast}
          delay={1000}
          autohide
        >
          <Toast.Header className="toast-header bg-primary text-fixed-white">
            <img
              className="bd-placeholder-img rounded me-2"
              src={""}
              alt="..."
            />
            <strong className="me-auto">Velvet</strong>
          </Toast.Header>
          <Toast.Body className="toast-body text-default bg-white rounded-bottom">
            {config}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    );
  })
);

const ToastProvider = ({ children }: { children: any }) => {
  const toastRef = useRef<TAppToastRef>({
    showToast: (config: string) => {},
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
