/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-03 01:03:22
 * @LastEditors: wzz 960867371@qq.com
 * @LastEditTime: 2022-07-12 15:19:02
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\VitalSigns\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Spin, Col, InputNumber } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
// import { handleAnonymous } from '@/utils/util';
import moment from 'moment';
import type { StateType as GlobalStateType } from '@/models/global';
import type { StateType } from './model';
import type { VitalSignsType } from './data';
import { useForm } from 'antd/es/form/Form';
import styles from './style.less';
import type { StateType as BaseStateType } from '../BaseInfo/model';
import type { StateType as CycleStateType } from '@/models/cycle';

interface VitalSignsProps {
  dispatch: Dispatch;
  vitalSigns?: VitalSignsType;
  vitalSignsLoading: boolean;
  useAnonymousGlobal: boolean;
  pid: number;
  cycleId: number;
  isSubmit: boolean;
}

const VitalSigns: React.FC<VitalSignsProps> = (props) => {
  const { vitalSigns, cycleId, vitalSignsLoading, isSubmit, dispatch } = props;
  const [form] = useForm();

  const dateFormat = 'YYYY-MM-DD';
  const formItemLayout = {
    labelCol: { xl: { span: 2 }, md: { span: 2 } },
    wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
  };

  useEffect(() => {
    form.setFieldsValue(vitalSigns);
  }, [vitalSigns]);

  const handleSubmit = (values: any) => {
    // console.log('value :', values);
    dispatch({
      type: 'vitalSigns/modifyVitalSigns',
      payload: { cycleId, body: values },
    });
  };

  // console.log('vitalSigns',vitalSigns);

  return (
    <Spin spinning={vitalSignsLoading}>
      <Form
        form={form}
        labelAlign="left"
        {...formItemLayout}
        onFinish={handleSubmit}
        disabled={isSubmit}
      >
        <Form.Item label="血压" name="bloodPressure">
          <Input className={styles.form_input} />
        </Form.Item>
        <Form.Item label="呼吸" name="breath">
          <InputNumber
            addonAfter={<div style={{ width: 40 }}>次/分</div>}
            min="0"
            className={styles.form_input}
          />
        </Form.Item>
        <Form.Item label="心率" name="heartRate">
          <InputNumber
            addonAfter={<div style={{ width: 40 }}>次/分</div>}
            min="0"
            className={styles.form_input}
          />
        </Form.Item>
        <Form.Item label="体温" name="bodyTemperature">
          <InputNumber
            addonAfter={<div style={{ width: 40 }}>℃</div>}
            step="0.1"
            className={styles.form_input}
          />
        </Form.Item>
        <Form.Item label="血氧饱和度" name="oxygenSaturation">
          <InputNumber min="0" className={styles.form_input} />
        </Form.Item>
        <Form.Item label="吸入氧浓度" name="fractionOfInspiredOxygen">
          <InputNumber min="0" className={styles.form_input} />
        </Form.Item>
        <Form.Item label="氧合指数" name="oxygenationIndex">
          <InputNumber
            addonAfter={<div style={{ width: 40 }}>mmHg</div>}
            min="0"
            className={styles.form_input}
          />
        </Form.Item>
        <Col offset={3}>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Col>
      </Form>
    </Spin>
  );
};

const mapStateToProps = ({
  // vitalSigns,
  loading,
  global,
  base,
  cycle,
}: {
  vitalSigns: StateType;
  global: GlobalStateType;
  loading: { effects: { [key: string]: boolean } };
  base: BaseStateType;
  cycle: CycleStateType;
}) => {
  return {
    useAnonymousGlobal: global.useAnonymousGlobal,
    vitalSigns: cycle.cycleInfo.vitalSigns,
    vitalSignsLoading: loading.effects['cycle/fetchCycleInfo'],
    isSubmit: !!base.baseInfo?.isSubmit,
  };
};

export default connect(mapStateToProps)(VitalSigns);
