import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, DatePicker, Spin, message, InputNumber, Col } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { handleAnonymous } from '@/utils/util';
import moment from 'moment';
import type { StateType as GlobalStateType } from '@/models/global';
import type { StateType } from './model';
import type { BaseInfoType } from './data';
import { useForm } from 'antd/es/form/Form';
import styles from './style.less';
import { values } from 'lodash';

interface BaseInfoProps {
  dispatch: Dispatch;
  baseInfo?: BaseInfoType;
  baseInfoLoading: boolean;
  useAnonymousGlobal: boolean;
  pid: number;
  isSubmit: boolean;
}

const BaseInfo: React.FC<BaseInfoProps> = (props) => {
  const { baseInfo, baseInfoLoading, pid, useAnonymousGlobal, dispatch, isSubmit } = props;
  const [form] = useForm();
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);

  const dateFormat = 'YYYY-MM-DD';
  const formItemLayout = {
    labelCol: { xl: { span: 2 }, md: { span: 2 } },
    wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
  };

  useEffect(() => {
    // console.log('baseInfo', baseInfo);
    if (baseInfo?.height) {
      setHeight(baseInfo.height / 100);
    } else {
      setHeight(null);
    }
    if (baseInfo?.weight) {
      setWeight(baseInfo.weight);
    } else {
      setWeight(null);
    }
    form.setFieldsValue({
      ...baseInfo,
      height: baseInfo?.height === 0 ? null : baseInfo?.height,
      weight: baseInfo?.weight === 0 ? null : baseInfo?.weight,
      admissionDate: baseInfo?.admissionDate ? moment(baseInfo.admissionDate) : null,
    });
  }, [baseInfo]);

  const handleSubmit = (values: any) => {
    dispatch({
      type: 'base/modifyBaseInfo',
      payload: {
        pid,
        body: {
          ...values,
          admissionDate: values.admissionDate ? values.admissionDate.format() : null,
          bmi: height && weight ? Number((weight / (height * height)).toFixed(2)) : 0,
        },
      },
    });
  };

  return (
    <Spin spinning={baseInfoLoading}>
      <Form
        form={form}
        labelAlign="left"
        {...formItemLayout}
        onFinish={handleSubmit}
        disabled={isSubmit}
      >
        <Form.Item label="医院" name="hospital">
          <Input className={styles.form_input} disabled />
        </Form.Item>
        <Form.Item label="住院号" name="hospitalNumber">
          <Input className={styles.form_input} />
        </Form.Item>
        <Form.Item label="入院日期" name="admissionDate">
          <DatePicker className={styles.form_input} format={dateFormat} />
        </Form.Item>
        <Form.Item
          label="联系电话"
          name="phone"
          rules={[{ pattern: /^1\d{10}$/, message: '请输入正确联系电话' }]}
        >
          <Input className={styles.form_input} />
        </Form.Item>
        <Form.Item label="姓名" name="name">
          <Input className={styles.form_input} />
        </Form.Item>
        <Form.Item label="性别" name="sex">
          <Radio.Group>
            <Radio value="男">男</Radio>
            <Radio value="女">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <InputNumber className={styles.form_input_short} controls={false} />
        </Form.Item>
        <Form.Item label="身高" name="height">
          <InputNumber
            addonAfter="cm"
            className={styles.form_input_short}
            controls={false}
            onChange={(value: number) => setHeight(value / 100)}
          />
        </Form.Item>
        <Form.Item label="体重" name="weight">
          <InputNumber
            addonAfter="kg"
            className={styles.form_input_short}
            controls={false}
            onChange={(value: number) => setWeight(value)}
          />
        </Form.Item>
        <Form.Item label="BMI">
          {weight && height ? <span>{(weight / (height * height)).toFixed(2)}</span> : null}
        </Form.Item>
        <Form.Item label="婚姻状况" name="maritalStatus">
          <Radio.Group>
            <Radio value={0}>已婚</Radio>
            <Radio value={1}>未婚</Radio>
            <Radio value={2}>离异</Radio>
            <Radio value={3}>丧偶</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="文化程度" name="education">
          <Radio.Group>
            <Radio value={0}>未接受正规学校教育</Radio>
            <Radio value={1}>小学</Radio>
            <Radio value={2}>初中</Radio>
            <Radio value={3}>高中/中专</Radio>
            <Radio value={4}>本科/专科</Radio>
            <Radio value={5}>研究生及以上</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="职业" name="occupation">
          <Radio.Group className={styles.form_item_group}>
            <Radio value={0}>农林牧渔人员</Radio>
            <Radio value={1}>生产、运输设备操作及相关人员</Radio>
            <Radio value={2}>机关单位人员</Radio>
            <Radio value={3}>企业人员</Radio>
            <Radio value={4}>商业及服务业人员</Radio>
            <Radio value={5}>专业技术人员</Radio>
            <Radio value={6}>退休人员</Radio>
            <Radio value={7}>其他</Radio>
          </Radio.Group>
        </Form.Item>
        <Col offset={5}>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Col>
      </Form>
    </Spin>
  );
};

const mapStateToProps = ({
  base,
  loading,
  global,
}: {
  base: StateType;
  global: GlobalStateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  return {
    useAnonymousGlobal: global.useAnonymousGlobal,
    baseInfo: base.baseInfo,
    baseInfoLoading: loading.effects['base/fetchBaseInfo'],
    isSubmit: !!base.baseInfo?.isSubmit,
  };
};

export default connect(mapStateToProps)(BaseInfo);
