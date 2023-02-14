/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-09-14 15:09:28
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-14 21:59:10
 * @FilePath: \ggtj-frontend-3\src\components\SubmitModal\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import { Button, Modal, message } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import request from '@/utils/request';
import type { StateType as BaseStateType } from '@/pages/detail/CardContent/BaseInfo/model';

interface SubmitModalProps {
  visible: boolean;
  pid: number;
  handleSubmitModalCancel: () => void;
  onClickMenuItem: (path: any) => void;
  dispatch: Dispatch;
  isSubmit: boolean;
}

const SubmitModal: React.FC<SubmitModalProps> = (props) => {
  const { visible, pid, handleSubmitModalCancel, onClickMenuItem, dispatch, isSubmit } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSubmit = async () => {
    setConfirmLoading(true);
    await request(`${GGTJ_API}/sample/submit?sampleId=${pid}`, {
      method: 'POST',
      // data: {
      //   sampleId: pid,
      // },
    }).then((res: any) => {
      if (res) {
        message.success('提交成功！');
        dispatch({
          type: 'base/fetchBaseInfo',
          payload: { pid },
        });
        const path = { keyPath: ['baselineInfo'] };
        onClickMenuItem(path);
        handleSubmitModalCancel();
      } else {
        message.error('提交失败！');
      }
    });
    setConfirmLoading(false);
  };

  return (
    <>
      {isSubmit ? (
        <Modal
          title="提交"
          visible={visible}
          onCancel={handleSubmitModalCancel}
          footer={[
            <Button key="close" onClick={handleSubmitModalCancel} type="primary">
              确定
            </Button>,
          ]}
        >
          该样本已提交，请勿重复提交！
        </Modal>
      ) : (
        <Modal
          title="确认提交"
          visible={visible}
          okText="确定"
          cancelText="取消"
          onOk={handleSubmit}
          onCancel={handleSubmitModalCancel}
          confirmLoading={confirmLoading}
        >
          提交后此样本所有表单将
          <span style={{ fontWeight: 'bold' }}>无法被修改，仅管理员可解锁</span>，请确定是否提交？
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = ({ base }: { base: BaseStateType }) => {
  return {
    isSubmit: !!base.baseInfo?.isSubmit,
  };
};

export default connect(mapStateToProps)(SubmitModal);
