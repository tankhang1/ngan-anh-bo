import React, { useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { TActionLog } from "../../assets/types";
import AppLog from "../AppLog";
import AppTable from "../common/table/table";
import { format } from "date-fns";
type TAppHistory = {
  data?: TActionLog[];
  opened: boolean;
  onClose: (opened: boolean) => void;
};
const AppHistory = ({ data, opened, onClose }: TAppHistory) => {
  return (
    <Modal
      backdrop="static"
      show={opened}
      onHide={() => onClose(!opened)}
      onBackdropClick={() => onClose(!opened)}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title as="h5">Lịch sử thay đổi</Modal.Title>
      </Modal.Header>
      <Card className="custom-card p-3">
        <AppTable
          isHeader={true}
          title=""
          headers={[
            {
              key: "user_name",
              label: "Tên tài khoản",
              render: (value: TActionLog) => <td>{value.username}</td>,
            },
            {
              key: "action_type",
              label: "Hành động",
              render: (value: TActionLog) => (
                <td>
                  {value.action_type === 0
                    ? "Thêm mới"
                    : value.action_type === 1
                    ? "Cập nhật"
                    : "Xóa"}
                </td>
              ),
            },
            {
              key: "action_time",
              label: "Thời gian",
              render: (value: TActionLog) => (
                <td>
                  {format(new Date(value.action_time), "dd/MM/yyyy HH:mm:ss")}
                </td>
              ),
            },
            {
              key: "action_detail",
              label: "Thay đổi",
              render: (value: TActionLog) => (
                <td className="text-wrap">{value.action_detail}</td>
              ),
            },
          ]}
          data={data || []}
        />
      </Card>
    </Modal>
  );
};

export default AppHistory;
