import React, { useEffect, useState } from 'react';
import { Button, Form, Radio, Spin, Col, Divider } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { handleAnonymous } from '@/utils/util';
import type { StateType as GlobalStateType } from '@/models/global';
import type { StateType } from './model';
import type { SampleFilterType } from './data';
import { useForm } from 'antd/es/form/Form';
import type { StateType as BaseStateType } from '@/pages/detail/CardContent/BaseInfo/model';

interface SampleFilterProps {
  dispatch: Dispatch;
  sampleFilter?: SampleFilterType;
  sampleFilterLoading: boolean;
  useAnonymousGlobal: boolean;
  pid: number;
  isSubmit: boolean;
}

const SampleFilter: React.FC<SampleFilterProps> = (props) => {
  const { sampleFilter, sampleFilterLoading, pid, useAnonymousGlobal, dispatch, isSubmit } = props;
  const [form] = useForm();
  const [isAccept, setIsAccept] = useState(false);
  const [isAcceptVisible, setIsAcceptVisible] = useState(false);

  const formItemLayout = {
    labelCol: { xl: { span: 6 }, md: { span: 6 } },
    wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
  };

  useEffect(() => {
    dispatch({
      type: 'sampleFilter/fetchSampleFilter',
      payload: { pid },
    });
  }, []);

  useEffect(() => {
    // console.log('SampleFilter', sampleFilter);

    form.setFieldsValue(sampleFilter);
    handleIsAcceptCheck(sampleFilter);
  }, [sampleFilter]);

  const handleSubmit = (values: any) => {
    // console.log('values', values);
    dispatch({
      type: 'sampleFilter/modifySampleFilter',
      payload: {
        pid,
        body: values,
      },
    });
  };

  const handleIsAcceptCheck = (values: any) => {
    let isAccept_temp = true;
    const accept_arr = ['isSepsis3Standard', 'isSuitableAge', 'isIcuLarge24H', 'isInformedConsent'];
    for (let key in values) {
      if (values[key] === undefined || values[key] === null) {
        setIsAcceptVisible(false);
        return;
      }
      if (key === 'id' || key === 'sampleId') {
        continue;
      }
      if (accept_arr.includes(key)) {
        isAccept_temp &&= !!values[key];
      } else {
        isAccept_temp &&= !values[key];
      }
    }
    setIsAcceptVisible(true);
    setIsAccept(isAccept_temp);
  };

  return (
    <Spin spinning={sampleFilterLoading}>
      <Form
        form={form}
        labelAlign="left"
        labelWrap
        {...formItemLayout}
        onFinish={handleSubmit}
        onValuesChange={(changedValues, allValues) => handleIsAcceptCheck(allValues)}
        disabled={isSubmit}
      >
        <h3 style={{ fontWeight: 'bold', marginBottom: 20 }}>
          是否符合以下全部<span style={{ textDecoration: 'underline' }}>纳入</span>标准：
        </h3>
        <Form.Item label="符合sepsis3.0标准" name="isSepsis3Standard">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="年龄＞18岁且年龄＜80岁" name="isSuitableAge">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="ICU入院时间＞24小时" name="isIcuLarge24H">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="自愿签署知情同意书" name="isInformedConsent">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Divider />
        <h3 style={{ fontWeight: 'bold', marginBottom: 20 }}>
          是否符合以下全部<span style={{ textDecoration: 'underline' }}>排除</span>标准：
        </h3>
        <Form.Item label="年龄＜18岁或＞80岁" name="isUnsuitableAge">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="确诊为恶性肿瘤的患者" name="isSufferedCancer">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="既往存在或新发各种中枢神经系统疾病" name="isCnsDiseases">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="已确诊为精神相关疾病" name="isMentalIllness">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="意识障碍、听力和视力受损等无法完成量表测试的情况" name="isCannotFinish">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="妊娠期、哺乳期女性患者" name="isPregnancyLactation">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="拒绝签署知情同意书" name="isRefuseInformedConsent">
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Divider />
        <h3 style={{ marginBottom: 30 }}>
          符合入组标准而又不符合排除标准的可纳入研究：
          {isAcceptVisible ? (
            isAccept ? (
              <span style={{ fontWeight: 'bold', color: 'green' }}>可以纳入</span>
            ) : (
              <span style={{ fontWeight: 'bold', color: 'red' }}>不可以纳入</span>
            )
          ) : null}
        </h3>
        <Col offset={4}>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Col>
      </Form>
    </Spin>
  );
};

const mapStateToProps = ({
  sampleFilter,
  loading,
  global,
  base,
}: {
  sampleFilter: StateType;
  global: GlobalStateType;
  loading: { effects: { [key: string]: boolean } };
  base: BaseStateType;
}) => {
  return {
    useAnonymousGlobal: global.useAnonymousGlobal,
    sampleFilter: sampleFilter.sampleFilter,
    sampleFilterLoading: loading.effects['sampleFilter/fetchSampleFilter'],
    isSubmit: !!base.baseInfo?.isSubmit,
  };
};

export default connect(mapStateToProps)(SampleFilter);
