import React, { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

type TAppWarning = {
  children: any;
  onAccept: () => void;
  onCancel?: () => void;
};
const AppConfirm = ({ children, onAccept, onCancel }: TAppWarning) => {
  const [showPopover, setShowPopover] = useState(false);

  const handleCancel = () => {
    setShowPopover(false); // Close the popover
    if (onCancel) onCancel(); // Call the cancel callback if provided
  };

  const handleAccept = () => {
    setShowPopover(false); // Close the popover
    onAccept(); // Call the accept callback
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement={"bottom"}
      rootClose={true}
      show={showPopover}
      onToggle={() => setShowPopover(!showPopover)} // Toggle visibility
      overlay={
        <Popover>
          <Popover.Header as="h3" style={{ color: "red" }}>
            Thông báo
          </Popover.Header>
          <Popover.Body>
            <p style={{ fontSize: 14, color: "black" }}>
              Dữ liệu bạn sắp xuất sẽ được lưu dưới dạng tệp Excel. Vui lòng
              kiểm tra lại thông tin trước khi tiếp tục. Việc xuất file có thể
              mất một chút thời gian tùy thuộc vào dung lượng dữ liệu. Vui lòng
              kiểm tra mục danh sách file yêu cầu sau khi xuất thành công.
            </p>
            <div className="d-flex gap-1 my-2 justify-content-end">
              <button
                className="btn btn-sm btn-outline-dark"
                onClick={handleCancel}
              >
                Hủy bỏ
              </button>
              <button className="btn btn-sm btn-success" onClick={handleAccept}>
                Xác nhận
              </button>
            </div>
          </Popover.Body>
        </Popover>
      }
    >
      <div onClick={() => setShowPopover(true)}>{children}</div>
    </OverlayTrigger>
  );
};

export default AppConfirm;
