/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-03 01:03:22
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-15 19:54:31
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\MentalScale\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Radio, Spin, Col, Input } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
// import { handleAnonymous } from '@/utils/util';
import moment from 'moment';
import type { StateType as GlobalStateType } from '@/models/global';
import type { StateType } from './model';
import type { MentalScaleType } from './data';
import { useForm } from 'antd/es/form/Form';
import type { StateType as BaseStateType } from '../BaseInfo/model';
import type { StateType as CycleStateType } from '@/models/cycle';

interface MentalScaleProps {
  dispatch: Dispatch;
  mentalScale?: MentalScaleType;
  mentalScaleLoading: boolean;
  useAnonymousGlobal: boolean;
  pid: number;
  cycleId: number;
  isSubmit: boolean;
}

const MentalScale: React.FC<MentalScaleProps> = (props) => {
  const { mentalScale, cycleId, mentalScaleLoading, isSubmit, dispatch } = props;
  const [form] = useForm();
  // const [is_continue, setIs_continue] = useState<boolean | null>(null);

  // console.log('here is cycleId :', cycleId);

  const [noCumIcu, setNoCumIcu] = useState<boolean>(false);
  const [noMoca, setNoMoca] = useState<boolean>(false);
  const [noHads, setNoHads] = useState<boolean>(false);
  const [noIesR, setNoIesR] = useState<boolean>(false);
  const formItemLayout = {
    labelCol: { xl: { span: 4 }, md: { span: 2 } },
    wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
  };

  useEffect(() => {
    const _mentalScale: any = {};
    if (mentalScale) {
      Object.keys(mentalScale).forEach((key) => {
        const item = JSON.parse(mentalScale[key]);
        if (item) {
          _mentalScale[key] = item.value;
          _mentalScale[`${key}_note`] = item.note;
        }
      });
      setNoCumIcu(_mentalScale.cumIcu === 10);
      setNoMoca(_mentalScale.moca === 4);
      setNoHads(_mentalScale.hads === 3);
      setNoIesR(_mentalScale.iesR === 4);
    }

    form.setFieldsValue(_mentalScale);
    // if (mentalScale?.isExist === 1) {
    //   setIs_continue(true);
    // }
  }, [mentalScale]);

  const handleSubmit = (values: any) => {
    const formValue: MentalScaleType = {};
    formValue.isExist = 1;
    const CumIcu = {
      isExist: values.cumIcu === 10 ? 0 : 1,
      value: values.cumIcu,
      note: values.cumIcu_note,
    };
    formValue.cumIcu = JSON.stringify(CumIcu);
    const Moca = { isExist: values.moca === 4 ? 0 : 1, value: values.moca, note: values.moca_note };
    formValue.moca = JSON.stringify(Moca);
    const Hads = { isExist: values.hads === 3 ? 0 : 1, value: values.hads, note: values.hads_note };
    formValue.hads = JSON.stringify(Hads);
    const IesR = { isExist: values.iesR === 4 ? 0 : 1, value: values.iesR, note: values.iesR_note };
    formValue.iesR = JSON.stringify(IesR);
    dispatch({
      type: 'mentalScale/modifyMentalScale',
      payload: { cycleId, body: formValue },
    });
  };

  return (
    <Spin spinning={mentalScaleLoading}>
      <Form
        form={form}
        {...formItemLayout}
        labelAlign="left"
        onFinish={handleSubmit}
        disabled={isSubmit}
      >
        {/* <Form.Item
          label="是否进行精神量表评分"
          name="isExist"
          labelCol={{ xl: { span: 4 }, md: { span: 4 } }}
        >
          <Radio.Group onChange={(e) => setIs_continue(e.target.value)}>
            <Radio value={1}>是</Radio>
            <Radio value={0} style={{ marginLeft: 10 }}>
              否
            </Radio>
          </Radio.Group>
        </Form.Item> */}

        {/* {is_continue ? ( */}
        {/* <Form
          form={form}
          labelAlign="left"
          labelWrap
          {...formItemLayout}
          onFinish={handleSubmit}
          disabled={isSubmit}
          //  onValuesChange={(changedValues, allValues) => handleIsAcceptCheck(allValues)}
        > */}
        <Form.Item
          label="CAM-ICU评分"
          name="cumIcu"
          rules={[{ required: true, message: '请选择！' }]}
        >
          <Radio.Group
            onChange={(e) => {
              setNoCumIcu(e.target.value === 10);
            }}
          >
            <Radio value={0}>-5 </Radio>
            <Radio value={1}>-4 </Radio>
            <Radio value={2}>-3 </Radio>
            <Radio value={3}>-2 </Radio>
            <Radio value={4}>-1 </Radio>
            <Radio value={5}>0 </Radio>
            <Radio value={6}>+1 </Radio>
            <Radio value={7}>+2 </Radio>
            <Radio value={8}>+3 </Radio>
            <Radio value={9}>+4 </Radio>
            <Radio value={10}>
              不填写
              {noCumIcu ? (
                <Form.Item
                  noStyle
                  name="cumIcu_note"
                  rules={[{ required: true, message: '请填写原因！' }]}
                >
                  <Input style={{ width: 200, marginLeft: 15 }} placeholder="原因" />
                </Form.Item>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Moca评分" name="moca" rules={[{ required: true, message: '请选择！' }]}>
          <Radio.Group
            onChange={(e) => {
              setNoMoca(e.target.value === 4);
            }}
          >
            <Radio value={0}>≥26分</Radio>
            <Radio value={1}>18-26分</Radio>
            <Radio value={2}>10-17分</Radio>
            <Radio value={3}>＜10分</Radio>
            <Radio value={4}>
              不填写
              {noMoca ? (
                <Form.Item
                  noStyle
                  name="moca_note"
                  rules={[{ required: true, message: '请填写原因！' }]}
                >
                  <Input style={{ width: 200, marginLeft: 15 }} placeholder="原因" />
                </Form.Item>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="HADS评分" name="hads" rules={[{ required: true, message: '请选择！' }]}>
          <Radio.Group
            onChange={(e) => {
              setNoHads(e.target.value === 3);
            }}
          >
            <Radio value={0}>0-7分</Radio>
            <Radio value={1}>8-10分</Radio>
            <Radio value={2}>11-21分</Radio>
            <Radio value={3}>
              不填写
              {noHads ? (
                <Form.Item
                  noStyle
                  name="hads_note"
                  rules={[{ required: true, message: '请填写原因！' }]}
                >
                  <Input style={{ width: 200, marginLeft: 15 }} placeholder="原因" />
                </Form.Item>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="IES-R评分" name="iesR" rules={[{ required: true, message: '请选择！' }]}>
          <Radio.Group
            onChange={(e) => {
              setNoIesR(e.target.value === 4);
            }}
          >
            <Radio value={0}>0-8分</Radio>
            <Radio value={1}>9-25分</Radio>
            <Radio value={2}>26-43分</Radio>
            <Radio value={3}>44-88分</Radio>
            <Radio value={4}>
              不填写
              {noIesR ? (
                <Form.Item
                  noStyle
                  name="iesR_note"
                  rules={[{ required: true, message: '请填写原因！' }]}
                >
                  <Input style={{ width: 200, marginLeft: 15 }} placeholder="原因" />
                </Form.Item>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>
        {/* </Form> */}
        {/* ) : null} */}
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
  loading,
  global,
  base,
  cycle,
}: {
  mentalScale: StateType;
  global: GlobalStateType;
  loading: { effects: { [key: string]: boolean } };
  base: BaseStateType;
  cycle: CycleStateType;
}) => {
  return {
    useAnonymousGlobal: global.useAnonymousGlobal,
    mentalScale: cycle.cycleInfo.psychiatricRatingScale,
    mentalScaleLoading: loading.effects['cycle/fetchCycleInfo'],
    isSubmit: !!base.baseInfo?.isSubmit,
  };
};

export default connect(mapStateToProps)(MentalScale);
