import React, { useState } from "react";
import { TActionLog } from "../../assets/types";
import { format } from "date-fns";
import { Button } from "react-bootstrap";
type TAppLog = {
  log: TActionLog;
};
const AppLog = ({ log }: TAppLog) => {
  const [isDetail, setIsDetail] = useState(false);
  return (
    <div className="flex-1 flex-column">
      <div className="d-flex justify-content-between align-items-center">
        <p className=" mb-1" style={{ fontWeight: "bold" }}>
          {log.username} -{" "}
          {log.action_type === 0
            ? "Tạo mới"
            : log.action_type === 1
            ? "Cập nhật"
            : "Xóa"}
        </p>
        <Button
          variant=""
          aria-label="button"
          type="button"
          className="btn-sm btn-icon"
          onClick={() => setIsDetail(!isDetail)}
        >
          {!isDetail ? (
            <i className="ti ti-eye"></i>
          ) : (
            <i className="ti ti-eye-off"></i>
          )}
        </Button>
      </div>

      {isDetail && <p className=" mb-1">{log.action_detail}</p>}
      <p className=" mb-1" style={{ color: "gray" }}>
        {format(new Date(log.action_time), "dd/MM/yyyy HH:mm:ss")}
      </p>
    </div>
  );
};

export default AppLog;
