import React, { useEffect, useState } from 'react';
import { Button, Form, DatePicker, Spin, Col, Popconfirm, Alert } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
// import { handleAnonymous } from '@/utils/util';
import moment from 'moment';
import type { StateType as GlobalStateType } from '@/models/global';
import type { StateType } from './model';
import { useForm } from 'antd/es/form/Form';
import styles from './style.less';
import type { StateType as BaseStateType } from '../BaseInfo/model';
import type { StateType as CycleStateType } from '@/models/cycle';

interface AdmissionPageDateProps {
  dispatch: Dispatch;
  AdmissionPageDate?: any;
  AdmissionPageDateLoading: boolean;
  useAnonymousGlobal: boolean;
  pid: number;
  cycleId: number;
  isSubmit: boolean;
}

const AdmissionPageDate: React.FC<AdmissionPageDateProps> = (props) => {
  const {
    AdmissionPageDate,
    AdmissionPageDateLoading,
    cycleId,
    pid,
    isSubmit,
    // useAnonymousGlobal,
    dispatch,
  } = props;
  const [form] = useForm();
  const [dateModifiable, setDateModifiable] = useState(true);

  const dateFormat = 'YYYY-MM-DD';
  const formItemLayout = {
    labelCol: { xl: { span: 1 }, md: { span: 1 } },
    wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
  };

  useEffect(() => {
    // console.log('AdmissionPageDate', AdmissionPageDate);

    form.setFieldsValue({
      AdmissionPageDate: AdmissionPageDate ? moment(AdmissionPageDate) : null,
    });
    if (AdmissionPageDate) {
      setDateModifiable(false);
    } else {
      setDateModifiable(true);
    }
  }, [AdmissionPageDate]);

  const handleSubmit = (values: any) => {
    // console.log('value :', values);
    // console.log(
    //   'values.AdmissionPageDate.format()',
    //   values.AdmissionPageDate.startOf('date').add(8, 'h').format(),
    // );

    dispatch({
      type: 'AdmissionPageDate/modifyAdmissionPageDate',
      payload: {
        cycleId,
        body: {
          //创建访视时，统一传早8点
          date: values.AdmissionPageDate.startOf('date').add(8, 'h').format(),
        },
      },
    });
  };

  return (
    <Spin spinning={AdmissionPageDateLoading}>
      {dateModifiable ? (
        <Alert
          message="此日期保存后不可更改，请仔细核对！"
          type="warning"
          showIcon
          style={{ width: 300, marginBottom: 30 }}
        />
      ) : null}
      <Form
        form={form}
        labelAlign="left"
        {...formItemLayout}
        onFinish={handleSubmit}
        disabled={isSubmit || !dateModifiable}
      >
        <Form.Item label="日期" name="AdmissionPageDate">
          <DatePicker style={{ width: 200 }} format={dateFormat} />
        </Form.Item>
        {dateModifiable ? (
          <Col offset={2}>
            <Button htmlType="submit" type="primary">
              保存
            </Button>
          </Col>
        ) : null}
      </Form>
    </Spin>
  );
};

const mapStateToProps = ({
  AdmissionPageDate,
  loading,
  global,
  base,
  cycle,
}: {
  AdmissionPageDate: StateType;
  global: GlobalStateType;
  loading: { effects: { [key: string]: boolean } };
  base: BaseStateType;
  cycle: CycleStateType;
}) => {
  return {
    useAnonymousGlobal: global.useAnonymousGlobal,
    AdmissionPageDate: cycle.cycleInfo.date,
    AdmissionPageDateLoading: loading.effects['cycle/fetchCycleInfo'],
    isSubmit: !!base.baseInfo?.isSubmit,
  };
};

export default connect(mapStateToProps)(AdmissionPageDate);
