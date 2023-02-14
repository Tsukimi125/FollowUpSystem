import React, { useEffect, useState } from 'react';
import { Button, Modal, message } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import request from '@/utils/request';
import type { StateType as BaseStateType } from '@/pages/detail/CardContent/BaseInfo/model';

interface UnlockModalProps {
  visible: boolean;
  pid: number;
  handleUnlockModalCancel: () => void;
  onClickMenuItem: (path: any) => void;
  dispatch: Dispatch;
  can_unlock: boolean;
}

const UnlockModal: React.FC<UnlockModalProps> = (props) => {
  const { visible, pid, handleUnlockModalCancel, onClickMenuItem, dispatch, can_unlock } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSubmit = async () => {
    setConfirmLoading(true);
    await request(`${GGTJ_API}/sample/unlock`, {
      method: 'POST',
      params: {
        sampleId: pid,
      },
    }).then((res: any) => {
      if (res) {
        message.success('解锁成功！');
        dispatch({
          type: 'base/fetchBaseInfo',
          payload: { pid },
        });
        const path = { keyPath: ['baselineInfo'] };
        onClickMenuItem(path);
        handleUnlockModalCancel();
      } else {
        message.error('解锁失败！');
      }
    });
    setConfirmLoading(false);
  };

  return (
    <>
      {can_unlock ? (
        <Modal
          title="确认解锁"
          visible={visible}
          okText="确定"
          cancelText="取消"
          onOk={handleSubmit}
          onCancel={handleUnlockModalCancel}
          confirmLoading={confirmLoading}
        >
          点击后可修改此样本数据，请确定是否解锁？
        </Modal>
      ) : (
        <Modal
          title="解锁"
          visible={visible}
          onCancel={handleUnlockModalCancel}
          footer={[
            <Button key="close" onClick={handleUnlockModalCancel} type="primary">
              确定
            </Button>,
          ]}
        >
          无权限解锁，请联系管理员解锁样本！
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = ({ global }: { global: any }) => {
  return {
    can_unlock: global.userAuths.can_unlock,
  };
};

export default connect(mapStateToProps)(UnlockModal);
