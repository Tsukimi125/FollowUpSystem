/*
 * @Author: 947656035 947656035@qq.com
 * @Date: 2022-07-04 21:15:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-13 15:35:04
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\DiseaseRelatedScale\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from 'react';
import { Button, Form, Input, Col, Spin, InputNumber } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { DiseaseRelatedScaleType } from './data';
import type { StateType } from './model';
import type { StateType as BaseStateType } from '../BaseInfo/model';
import { useForm } from 'antd/lib/form/Form';
import styles from './style.less';
import type { StateType as GlobalStateType } from '@/models/global';
import type { StateType as CycleStateType } from '@/models/cycle';

interface DiseaseRelatedScaleProps {
  dispatch: Dispatch;
  diseaseRelatedScale?: DiseaseRelatedScaleType;
  diseaseRelatedScaleLoading: boolean;
  useAnonymousGlobal: boolean;
  pid: number;
  cycleId: number;
  isSubmit: boolean;
}

const DiseaseRelatedScale: React.FC<DiseaseRelatedScaleProps> = (props) => {
  const {
    diseaseRelatedScale,
    diseaseRelatedScaleLoading,
    pid,
    dispatch,
    isSubmit,
    cycleId,
  } = props;
  // console.log('here is disease cycleId:', cycleId);
  // console.log('here is disease info:', diseaseRelatedScale);

  const [form] = useForm();

  const formItemLayout = {
    labelCol: { xl: { span: 3 }, md: { span: 3 } },
    wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
  };

  useEffect(() => {
    form.setFieldsValue(diseaseRelatedScale);
  }, [diseaseRelatedScale]);

  const handleSubmit = (values: any) => {
    // console.log('value :', values);
    dispatch({
      type: 'diseaseRelatedScale/modifyDiseaseRelatedScale',
      payload: { body: values, cycleId },
    });
  };

  return (
    <Spin spinning={diseaseRelatedScaleLoading}>
      <Form
        form={form}
        {...formItemLayout}
        onFinish={handleSubmit}
        labelAlign="left"
        disabled={isSubmit}
      >
        <Form.Item label="APACHEⅡ评分" name="apacheii">
          <InputNumber type="number" className={styles.form_input} min="0" />
        </Form.Item>
        <Form.Item label="SOFA评分" name="sofa">
          <InputNumber type="number" className={styles.form_input} min="0" />
        </Form.Item>
        <Form.Item label="GCS评分" name="gcs">
          <InputNumber type="number" className={styles.form_input} min="0" />
        </Form.Item>
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
  diseaseRelatedScale,
  loading,
  global,
  base,
  cycle,
}: {
  diseaseRelatedScale: StateType;
  global: GlobalStateType;
  loading: { effects: { [key: string]: boolean } };
  base: BaseStateType;
  cycle: CycleStateType;
}) => {
  return {
    useAnonymousGlobal: global.useAnonymousGlobal,
    diseaseRelatedScale: cycle.cycleInfo.conditionScore,
    diseaseRelatedScaleLoading: loading.effects['cycle/fetchCycleInfo'],
    isSubmit: !!base.baseInfo?.isSubmit,
  };
};

export default connect(mapStateToProps)(DiseaseRelatedScale);
