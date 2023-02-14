/*
 * @Descripttion: 新增样本的Modal
 * @Author: linkenzone
 * @Date: 2020-10-19 20:21:09
 */

import { getBirthDay } from '@/utils/util';
import { Button, Divider, Form, Input, List, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import type { Dispatch } from 'umi';
import style from './index.less';
import type { AddResearchDataType } from '../data';

import { AddResearch } from '../service';

interface AddResearchModalProps {
  addResearchModalVisable: boolean;
  setAddResearchModalVisable: (value: any) => void;
  dispatch: Dispatch;
}

const ModalFormItemLayout = {
  labelCol: { xl: { span: 8 }, md: { span: 10 } },
  wrapperCol: { xl: { span: 16 }, md: { span: 14 } },
};

const AddResearchModal: React.FC<AddResearchModalProps> = (props) => {
  const { addResearchModalVisable, setAddResearchModalVisable, dispatch } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [addResearchForm] = Form.useForm();

  const handleOk = (e: any) => {
    console.log('e', e);
    setConfirmLoading(true);
    addResearchForm.submit();
  };

  const onFinish = async (values: any) => {
    // console.log('新增研究的values', values);
    const res = (await AddResearch({
      body: { ...values },
    })) as AddResearchDataType;
    setConfirmLoading(false);
    if (res) {
      setAddResearchModalVisable(false);
      addResearchForm.resetFields();
      message.success('研究添加成功！');
      // 获取所有研究
      dispatch({
        type: 'fuvList/fetchAllResearch',
        payload: {},
      });
    }
  };

  useEffect(() => {
    if (addResearchModalVisable) {
      addResearchForm.resetFields();
    }
  }, [addResearchModalVisable]);

  return (
    <Modal
      okText={'添加'}
      title="添加研究中心"
      visible={addResearchModalVisable}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => {
        setAddResearchModalVisable(false);
      }}
    >
      <Form onFinish={onFinish} form={addResearchForm} {...ModalFormItemLayout} labelAlign="left">
        <Form.Item label="研究名称" name="name" required>
          <Input />
        </Form.Item>

        <Form.Item label="描述信息" name="description">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = ({ loading }: { loading: { effects: Record<string, boolean> } }) => {
  return {
    // FuvListLoading: loading.effects['fuvList/fetchFuvList'],
  };
};

export default connect(mapStateToProps)(AddResearchModal);
