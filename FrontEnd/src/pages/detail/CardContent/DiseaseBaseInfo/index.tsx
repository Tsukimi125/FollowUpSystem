import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Radio,
  DatePicker,
  Spin,
  message,
  InputNumber,
  Col,
  Checkbox,
  Row,
} from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { handleAnonymous } from '@/utils/util';
import moment from 'moment';
import type { StateType as GlobalStateType } from '@/models/global';
import type { StateType } from './model';
import type { StateType as BaseStateType } from '@/pages/detail/CardContent/BaseInfo/model';
import type { DiseaseBaseInfoType } from './data';
import { useForm } from 'antd/es/form/Form';
import styles from './style.less';

interface DiseaseBaseInfoProps {
  dispatch: Dispatch;
  diseaseBaseInfo?: DiseaseBaseInfoType;
  diseaseBaseInfoLoading: boolean;
  useAnonymousGlobal: boolean;
  pid: number;
  isSubmit: boolean;
}

const DiseaseBaseInfo: React.FC<DiseaseBaseInfoProps> = (props) => {
  const {
    diseaseBaseInfo,
    diseaseBaseInfoLoading,
    pid,
    useAnonymousGlobal,
    dispatch,
    isSubmit,
  } = props;
  const [form] = useForm();
  const [pastHistoryOtherVisible, setPastHistoryOtherVisible] = useState(false);
  const [infectionSourceOtherVisible, setInfectionSourceOtherVisible] = useState(false);

  const formItemLayout = {
    labelCol: { xl: { span: 2 }, md: { span: 2 } },
    wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
  };

  useEffect(() => {
    dispatch({
      type: 'diseaseBase/fetchDiseaseBaseInfo',
      payload: { pid },
    });
  }, []);

  useEffect(() => {
    // console.log('diseaseBaseInfo', diseaseBaseInfo);
    if (diseaseBaseInfo?.infectionSource === 5) {
      setInfectionSourceOtherVisible(true);
    }
    if (diseaseBaseInfo) {
      const { pastHistory } = diseaseBaseInfo;
      let _pastHistory;
      if (pastHistory) {
        // console.log('here is pastHistory', typeof pastHistory);
        if (typeof pastHistory !== 'number') {
          _pastHistory = typeof pastHistory === 'object' ? pastHistory : JSON.parse(pastHistory);
          setPastHistoryOtherVisible(_pastHistory.includes(9));
        } else {
          setPastHistoryOtherVisible(pastHistory === 9);
          _pastHistory = pastHistory === 0 ? undefined : [pastHistory];
        }
      }

      diseaseBaseInfo.pastHistory = _pastHistory;
    }

    form.setFieldsValue(diseaseBaseInfo);
  }, [diseaseBaseInfo]);

  const handleSubmit = (values: any) => {
    const { pastHistory } = values;
    const _pastHistory = JSON.stringify(pastHistory);

    if (!pastHistory.includes(9)) {
      values.pastHistoryOther = '';
    }
    if (values.infectionSource !== 5) {
      values.infectionSourceOther = '';
    }
    values.pastHistory = _pastHistory;

    dispatch({
      type: 'diseaseBase/modifyDiseaseBaseInfo',
      payload: {
        pid,
        body: values,
      },
    });
  };

  return (
    <Spin spinning={diseaseBaseInfoLoading}>
      <Form
        form={form}
        labelAlign="left"
        {...formItemLayout}
        onFinish={handleSubmit}
        disabled={isSubmit}
      >
        <Form.Item label="??????" name="diagnosis">
          <Input.TextArea style={{ height: 200 }} />
        </Form.Item>
        <Form.Item label="?????????" name="pastHistory">
          <Checkbox.Group
            onChange={(e) => {
              setPastHistoryOtherVisible(e.includes(9));
            }}
          >
            <Checkbox value={1}>?????????</Checkbox>
            <Checkbox value={2}>?????????</Checkbox>
            <Checkbox value={3}>????????????</Checkbox>
            <Checkbox value={4}>??????????????????</Checkbox>
            <Checkbox value={5}>???????????????</Checkbox>
            <Checkbox value={6}>???????????????</Checkbox>
            <Checkbox value={7}>???????????????</Checkbox>
            <Checkbox value={8}>????????????</Checkbox>
            <Checkbox value={9}>
              ??????
              {pastHistoryOtherVisible ? (
                <Form.Item name="pastHistoryOther" noStyle>
                  <Input style={{ width: 200, marginLeft: 15 }} placeholder="??????" />
                </Form.Item>
              ) : null}
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="????????????" name="infectionSource">
          <Radio.Group
            className={styles.form_item_group}
            onChange={(e) => {
              if (e.target.value === 5) {
                setInfectionSourceOtherVisible(true);
              } else {
                setInfectionSourceOtherVisible(false);
              }
            }}
          >
            <Radio value={0}>??????????????????</Radio>
            <Radio value={1}>???????????????</Radio>
            <Radio value={2}>?????????????????????</Radio>
            <Radio value={3}>??????????????????</Radio>
            <Radio value={4}>???????????????</Radio>
            <Radio value={5}>
              ??????
              {infectionSourceOtherVisible ? (
                <Form.Item name="infectionSourceOther" noStyle>
                  <Input style={{ width: 200, marginLeft: 15 }} placeholder="??????" />
                </Form.Item>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Col offset={5}>
          <Button htmlType="submit" type="primary">
            ??????
          </Button>
        </Col>
      </Form>
    </Spin>
  );
};

const mapStateToProps = ({
  diseaseBase,
  loading,
  global,
  base,
}: {
  diseaseBase: StateType;
  global: GlobalStateType;
  loading: { effects: { [key: string]: boolean } };
  base: BaseStateType;
}) => {
  return {
    useAnonymousGlobal: global.useAnonymousGlobal,
    diseaseBaseInfo: diseaseBase.diseaseBaseInfo,
    diseaseBaseInfoLoading: loading.effects['diseaseBase/fetchDiseaseBaseInfo'],
    isSubmit: !!base.baseInfo?.isSubmit,
  };
};

export default connect(mapStateToProps)(DiseaseBaseInfo);
