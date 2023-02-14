/*
 * @Descripttion: 新增样本的Modal
 * @Author: linkenzone
 * @Date: 2020-10-19 20:21:09
 */

import { getBirthDay } from '@/utils/util';
import type { Dispatch } from 'umi';
import {
  Button,
  Divider,
  Form,
  Input,
  List,
  message,
  Modal,
  Select,
  Radio,
  InputNumber,
  DatePicker,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import moment from 'moment';
import style from './index.less';
import type { AddSampleDataType } from '../data';
import request from '@/utils/request';

import { AddFuv } from '../service';

const { Option } = Select;

// interface patientDataType {
//   birthday: string;
//   finishFollowup: number;
//   gender: number;
//   hospitalNumber: string;
//   id: number;
//   idNumber: string;
//   patNumber: string;
//   patientName: string;
//   phoneNumber1: string;
//   phoneNumber2: string;
//   researchCenter: number;
// }

interface AddSampleModalProps {
  addSampleModalVisable: boolean;
  setAddSampleModalVisable: (value: any) => void;
  refreshSampleList: () => void;
  dispatch: Dispatch;
}

const ModalFormItemLayout = {
  labelCol: { xl: { span: 8 }, md: { span: 10 } },
  wrapperCol: { xl: { span: 16 }, md: { span: 14 } },
};

const AddSampleModal: React.FC<AddSampleModalProps> = (props) => {
  const { addSampleModalVisable, setAddSampleModalVisable, dispatch } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [addSampleData, setAddSampleData] = useState<AddSampleDataType>();
  const [isSameName, setIsSameName] = useState(false);

  const dateFormat = 'YYYY-MM-DD';

  // const [formState, setFormState] = useState<number>(3);

  const [addSampleForm] = Form.useForm();

  const handleOk = (e: any) => {
    // console.log('e', e);

    addSampleForm.submit();
  };

  const onFinish = async (values: any) => {
    setConfirmLoading(true);
    if (values.admissionDate) {
      values.admissionDate = moment(values.admissionDate).format(dateFormat);
    }
    // const newValue = { ...values };
    // console.log('values', values);

    if (!values.idNumber || values.idNumber === '') {
      values.idNumber = undefined;
    }
    if (!values.hospitalNumber || values.hospitalNumber === '') {
      values.hospitalNumber = undefined;
    }
    if (!values.patientName || values.patientName === '') {
      values.patientName = undefined;
    }
    if (!values.idNumber && !values.hospitalNumber && !values.name) {
      message.error('“住院号” “姓名” 两项必须填一项');
      setConfirmLoading(false);
      return;
    }
    // setConfirmLoading(true);
    const res: any = await AddFuv({
      body: { ...values },
    });

    // console.log('here is res', res);

    // 0表示该样本不存在，直接添加
    // 1表示该样本存在，但是不由当前账号录入
    // -1表示该样本存在，由当前账号录入，让用户选择是否直接进入
    // 2表示该样本存在，由当前账号录入，让用户选择是新建还是进入

    if (res) {
      // setModalVisible(false);
      message.success('添加成功！');
      const { id } = res;
      history.push(`/detail/${id}/baselineInfo`);

      //   if (res.status === 1) {
      //     console.log('本中心已经存在相同样本');
      //     setConfirmLoading(false);
      //     // setAddSampleData(res);
      //     setIsSameName(false);
      //     // message.success('添加成功！');
      //   } else if (res.status === 0) {
      //     console.log('本账号不存在相同样本');
      //     setConfirmLoading(false);
      //     setAddSampleModalVisable(false);
      //     // refreshSampleList();
      //     message.success('添加成功！');
      //     // 进入当前样本
      //     dispatch({
      //       type: 'doubt/setMonitorStatus',
      //       payload: {},
      //     });
      //     history.push(`/detail/${res.pid}/baselineInfo`);
      //   } else if (res.status === -1) {
      //     console.log('本账号已经存在相同样本');
      //     setConfirmLoading(false);
      //     // setAddSampleData(undefined);
      //     Modal.confirm({
      //       title: '本账号已经存在该样本，是否直接进入',
      //       okText: '确认',
      //       cancelText: '取消',
      //       maskClosable: true,
      //       onOk: async () => {
      //         history.push(`/detail/${res.samples[0].id}/baselineInfo`);
      //       },
      //     });
      //   } else if (res.status === 2) {
      //     console.log('本账号已经存在相同名字的样本');
      //     setConfirmLoading(false);
      //     // setAddSampleData(res);
      //     setIsSameName(true);
      //   }
    } else {
      setConfirmLoading(false);
      message.error('添加失败！');
    }
  };

  useEffect(() => {
    if (addSampleModalVisable) {
      addSampleForm.resetFields();
      setIsSameName(false);
      // setFormState(3);
      // setAddSampleData(undefined);
    }
  }, [addSampleModalVisable]);

  return (
    <Modal
      okText={isSameName ? '新建' : '确定'}
      title="新增样本"
      visible={addSampleModalVisable}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => {
        setAddSampleModalVisable(false);
      }}
    >
      <Form onFinish={onFinish} form={addSampleForm} {...ModalFormItemLayout} labelAlign="left">
        {/* <Form.Item label="医院" name="hospital">
          <Input />
        </Form.Item> */}
        <Form.Item label="住院号" name="hospitalNumber">
          <Input />
        </Form.Item>
        <Form.Item label="入院日期" name="admissionDate">
          <DatePicker format={dateFormat} />
        </Form.Item>
        <Form.Item
          label="联系电话"
          name="phone"
          rules={[
            {
              pattern: new RegExp(/^1[3|4|5|7|8][0-9]\d{8}$/, 'g'),
              message: '电话号码格式不正确！',
            },
            { required: true, message: '电话号码为必填项！' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="姓名" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="性别" name="sex">
          <Radio.Group>
            <Radio value="男">男</Radio>
            <Radio value="女">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <InputNumber />
        </Form.Item>

        {/* <Form.Item
          label="身份证号"
          name="idNumber"
          rules={[
            { pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号(18位)' },
          ]}
        >
          <Input
            onChange={(e) => {
              addSampleForm.setFieldsValue({ birthday: getBirthDay(e.target.value) });
              addSampleForm.validateFields();
            }}
          />
        </Form.Item> */}
        {/* <Form.Item
          name="birthday"
          label="出生日期"
          rules={[{ type: 'date', message: '出生日期无效' }]}
        >
          <Input readOnly bordered={false} />
        </Form.Item> */}

        {/* {addSampleData?.samples.length !== 0 && addSampleData ? (
          <>
            {isSameName ? (
              <Divider orientation="left">选择一个样本进入或新建</Divider>
            ) : (
              <Divider orientation="left">选择一个样本加入到当前账号</Divider>
            )}
            <List
              size="default"
              className={style.custom_ant_list}
              // header={<div>Header</div>}
              // footer={<div>Footer</div>}
              bordered
              dataSource={addSampleData?.samples}
              renderItem={(item: any) => (
                <List.Item
                  style={{ display: 'block' }}
                  onClick={
                    isSameName
                      ? () => {
                          Modal.confirm({
                            title: '是否进入该样本',
                            okText: '确认',
                            cancelText: '取消',
                            maskClosable: true,
                            onOk: async () => {
                              const res = await AddAccount({ pid: item.id, body: {} });
                              console.log('res', res);
                              history.push(`/detail/${item.id}/baselineInfo`);
                            },
                          });
                        }
                      : () => {
                          console.log('点击了样本', item.id);
                          Modal.confirm({
                            title: '确认加入当前账号?',
                            okText: '确认',
                            cancelText: '取消',
                            maskClosable: true,
                            onOk: async () => {
                              setConfirmLoading(true);
                              const res = await AddAccount({ pid: item.id, body: {} });
                              console.log('res', res);
                              if (res) {
                                setConfirmLoading(false);
                                message.success('加入当前账号成功！');
                                history.push(`/detail/${item.id}/baselineInfo`);
                              } else {
                                setConfirmLoading(false);
                                message.error('加入当前账号失败！');
                              }
                            },
                          });
                        }
                  }
                >
                  <span style={{ display: 'block' }}>姓名: {item.patientName}</span>
                  <span style={{ display: 'block' }}>住院号: {item.hospitalNumber}</span>
                  <span style={{ display: 'block' }}>身份证号: {item.idNumber}</span>
                </List.Item>
              )}
            ></List>
          </>
        ) : null} */}
      </Form>
    </Modal>
  );
};

const mapStateToProps = ({ loading }: { loading: { effects: Record<string, boolean> } }) => {
  return {
    FuvListLoading: loading.effects['fuvList/fetchFuvList'],
  };
};

export default connect(mapStateToProps)(AddSampleModal);
