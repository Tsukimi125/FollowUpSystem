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
          ????????????????????????<span style={{ textDecoration: 'underline' }}>??????</span>?????????
        </h3>
        <Form.Item label="??????sepsis3.0??????" name="isSepsis3Standard">
          <Radio.Group>
            <Radio value={1}>???</Radio>
            <Radio value={0}>???</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="?????????18???????????????80???" name="isSuitableAge">
          <Radio.Group>
            <Radio value={1}>???</Radio>
            <Radio value={0}>???</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="ICU???????????????24??????" name="isIcuLarge24H">
          <Radio.Group>
            <Radio value={1}>???</Radio>
            <Radio value={0}>???</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="???????????????????????????" name="isInformedConsent">
          <Radio.Group>
            <Radio value={1}>???</Radio>
            <Radio value={0}>???</Radio>
          </Radio.Group>
        </Form.Item>
        <Divider />
        <h3 style={{ fontWeight: 'bold', marginBottom: 20 }}>
          ????????????????????????<span style={{ textDecoration: 'underline' }}>??????</span>?????????
        </h3>
        <Form.Item label="?????????18?????????80???" name="isUnsuitableAge">
          <Radio.Group>
            <Radio value={1}>???</Radio>
            <Radio value={0}>???</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="??????????????????????????????" name="isSufferedCancer">
          <Radio.Group>
            <Radio value={1}>???</Radio>
            <Radio value={0}>???</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="???????????????????????????????????????????????????" name="isCnsDiseases">
          <Radio.Group>
            <Radio value={1}>???</Radio>
            <Radio value={0}>???</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="??????????????????????????????" name="isMentalIllness">
          <Radio.Group>
            <Radio value={1}>???</Radio>
            <Radio value={0}>???</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="????????????????????????????????????????????????????????????????????????" name="isCannotFinish">
          <Radio.Group>
            <Radio value={1}>???</Radio>
            <Radio value={0}>???</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="?????????????????????????????????" name="isPregnancyLactation">
          <Radio.Group>
            <Radio value={1}>???</Radio>
            <Radio value={0}>???</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="???????????????????????????" name="isRefuseInformedConsent">
          <Radio.Group>
            <Radio value={1}>???</Radio>
            <Radio value={0}>???</Radio>
          </Radio.Group>
        </Form.Item>
        <Divider />
        <h3 style={{ marginBottom: 30 }}>
          ??????????????????????????????????????????????????????????????????
          {isAcceptVisible ? (
            isAccept ? (
              <span style={{ fontWeight: 'bold', color: 'green' }}>????????????</span>
            ) : (
              <span style={{ fontWeight: 'bold', color: 'red' }}>???????????????</span>
            )
          ) : null}
        </h3>
        <Col offset={4}>
          <Button htmlType="submit" type="primary">
            ??????
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
