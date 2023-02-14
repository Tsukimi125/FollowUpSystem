import React, { useEffect, useState } from 'react';
import { Button, Modal, message, Form, DatePicker, Alert } from 'antd';
import type { Dispatch } from 'umi';
import { connect, history } from 'umi';
import request from '@/utils/request';
import type { StateType as GlobalStateType } from '@/models/global';
import moment from 'moment';

interface AddCycleModalProps {
  visible: boolean;
  handleAddCycleModalCancel: () => void;
  dispatch: Dispatch;
  pid: number;
  admissionCycleList: any[];
  onClickMenuItem: (path: any) => void;
}

const AddCycleModal: React.FC<AddCycleModalProps> = (props) => {
  const {
    visible,
    handleAddCycleModalCancel,
    dispatch,
    pid,
    admissionCycleList,
    onClickMenuItem,
  } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const dateFormat = 'YYYY-MM-DD';
  const formItemLayout = {
    labelCol: { xl: { span: 3 }, md: { span: 3 } },
    wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
  };

  const handleSubmit = async (values: any) => {
    if (!values.firstDate) {
      message.error('请填写日期！');
      return;
    }
    setConfirmLoading(true);
    await request(`${GGTJ_API}/cycle/create?sampleId=${pid}`, {
      method: 'POST',
      data: {
        type: 7,
        //创建访视时，统一传早8点
        date: values.firstDate.startOf('date').add(8, 'h').format(),
      },
    }).then(async (res: any) => {
      if (res) {
        message.success('添加成功！');
        await dispatch({
          type: 'global/fetchCycleList',
          payload: { pid },
        });
        history.push(`/detail/${pid}/TreatmentInfo/${res.id}/admission_day`);
        handleAddCycleModalCancel();
      } else {
        message.error('添加失败！');
      }
    });
    setConfirmLoading(false);
  };

  const handleOk = () => {
    form.submit();
  };

  return (
    <Modal
      title="添加入科第X天随访"
      visible={visible}
      okText="确定"
      cancelText="取消"
      onOk={handleOk}
      onCancel={handleAddCycleModalCancel}
      confirmLoading={confirmLoading}
    >
      <Alert
        message="此日期确定后不可更改，请仔细核对后再点击确定"
        type="warning"
        showIcon
        style={{ marginBottom: 30 }}
      />
      <Form form={form} labelAlign="left" {...formItemLayout} onFinish={handleSubmit}>
        <Form.Item label="日期" name="firstDate" required>
          <DatePicker style={{ width: 250 }} format={dateFormat} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = ({ global }: { global: GlobalStateType }) => {
  return {
    admissionCycleList: global.admissionCycleList,
  };
};
export default connect(mapStateToProps)(AddCycleModal);
