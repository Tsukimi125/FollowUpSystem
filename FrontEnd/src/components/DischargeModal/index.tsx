import React, { useEffect, useState } from 'react';
import { Button, Modal, message } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import request from '@/utils/request';
import type { StateType as GlobalStateType } from '@/models/global';

interface DischargeModalProps {
  visible: boolean;
  pid: number;
  handleDischargeModalCancel: () => void;
  // onClickMenuItem: (path: any) => void;
  dispatch: Dispatch;
}

const DischargeModal: React.FC<DischargeModalProps> = (props) => {
  const { visible, pid, handleDischargeModalCancel, dispatch } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleDischarge = async () => {
    setConfirmLoading(true);
    await request(`${GGTJ_API}/sample/discharge?sampleId=${pid}`, {
      method: 'POST',
    }).then((res: any) => {
      if (res) {
        message.success('出院提交成功！');
        dispatch({
          type: 'base/fetchBaseInfo',
          payload: { pid },
        });
        // const path = { keyPath: ['baselineInfo'] };
        // onClickMenuItem(path);
        handleDischargeModalCancel();
      } else {
        message.error('出院提交失败！');
      }
    });
    setConfirmLoading(false);
  };

  return (
    <Modal
      title="出院"
      visible={visible}
      okText="确定"
      cancelText="取消"
      onOk={handleDischarge}
      onCancel={handleDischargeModalCancel}
      confirmLoading={confirmLoading}
    >
      出院后无法再添加入科第X天随访，请确定是否出院？
    </Modal>
  );
};

const mapStateToProps = ({ global }: { global: GlobalStateType }) => {
  return {
    // admissionCycleList: global.admissionCycleList,
  };
};
export default connect(mapStateToProps)(DischargeModal);
