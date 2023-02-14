/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-03 01:03:22
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-06 21:09:32
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\FirstDate\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, DatePicker, Spin, Col } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
// import { handleAnonymous } from '@/utils/util';
import moment from 'moment';
import type { StateType as GlobalStateType } from '@/models/global';
import type { StateType } from './model';
import type { FirstDateType } from './data';
import { useForm } from 'antd/es/form/Form';
import styles from './style.less';
import type { StateType as BaseStateType } from '../BaseInfo/model';
import type { StateType as CycleStateType } from '@/models/cycle';

interface FirstDateProps {
  dispatch: Dispatch;
  firstDate?: any;
  firstDateLoading: boolean;
  useAnonymousGlobal: boolean;
  pid: number;
  cycleId: number;
  isSubmit: boolean;
}

const FirstDate: React.FC<FirstDateProps> = (props) => {
  const {
    firstDate,
    firstDateLoading,
    cycleId,
    pid,
    isSubmit,
    // useAnonymousGlobal,
    dispatch,
  } = props;
  const [form] = useForm();
  const [setOccupationOtherVisible] = useState(false);

  const dateFormat = 'YYYY-MM-DD';
  const formItemLayout = {
    labelCol: { xl: { span: 1 }, md: { span: 1 } },
    wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
  };

  useEffect(() => {
    form.setFieldsValue({
      firstDate: firstDate ? moment(firstDate) : null,
    });
  }, [firstDate]);

  const handleSubmit = (values: any) => {
    // console.log('value :', values);
    dispatch({
      type: 'firstDate/modifyFirstDate',
      payload: {
        cycleId,
        body: {
          date: values.firstDate.format(),
        },
      },
    });
  };

  return (
    <Spin spinning={firstDateLoading}>
      <Form
        form={form}
        labelAlign="left"
        {...formItemLayout}
        onFinish={handleSubmit}
        disabled={isSubmit}
      >
        <Form.Item label="日期" name="firstDate">
          <DatePicker style={{ width: 200 }} format={dateFormat} />
        </Form.Item>
        <Col offset={2}>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Col>
      </Form>
    </Spin>
  );
};

const mapStateToProps = ({
  firstDate,
  loading,
  global,
  base,
  cycle,
}: {
  firstDate: StateType;
  global: GlobalStateType;
  loading: { effects: { [key: string]: boolean } };
  base: BaseStateType;
  cycle: CycleStateType;
}) => {
  return {
    useAnonymousGlobal: global.useAnonymousGlobal,
    firstDate: cycle.cycleInfo.date,
    firstDateLoading: loading.effects['cycle/fetchCycleInfo'],
    isSubmit: !!base.baseInfo?.isSubmit,
  };
};

export default connect(mapStateToProps)(FirstDate);
