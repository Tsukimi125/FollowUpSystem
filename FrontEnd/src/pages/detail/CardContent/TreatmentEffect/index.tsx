/*
 * @Author: 947656035 947656035@qq.com
 * @Date: 2022-07-05 11:59:33
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-16 12:18:50
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\TreatmentEffect\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Col, Spin, Radio } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { TreatmentEffectType, drugType, oxygenType } from './data';
import type { StateType } from './model';
import type { StateType as BaseStateType } from '../BaseInfo/model';
import { useForm } from 'antd/lib/form/Form';
import styles from './style.less';
import type { StateType as GlobalStateType } from '@/models/global';
import type { StateType as CycleStateType } from '@/models/cycle';

interface TreatmentEffectProps {
  dispatch: Dispatch;
  treatmentInfo?: TreatmentEffectType;
  treatmentInfoLoading: boolean;
  useAnonymousGlobal: boolean;
  pid: number;
  cycleId: number;
  isSubmit: boolean;
}

const TreatmentEffect: React.FC<TreatmentEffectProps> = (props) => {
  const { dispatch, treatmentInfo, treatmentInfoLoading, isSubmit, cycleId } = props;

  const formItemLayout = {
    labelCol: { xl: { span: 5 }, md: { span: 5 } },
    wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
  };

  const [form] = useForm();

  const [shock, setShock] = useState(false);
  const [anoxia, setAnoxia] = useState(false);
  const [takeOxygen, setTakeOxygen] = useState(false);
  const [useInvasiveVentilator, setUseInvasiveVentilator] = useState(false);
  const [useNonInvasiveVentilator, setUseNonInvasiveVentilator] = useState(false);
  const [sedative, setSedative] = useState(false);
  const [analgesic, setAnalgesic] = useState(false);
  const [delirium, setDelirium] = useState(false);
  const [neuroprotectiveAgent, setNeuroprotectiveAgent] = useState(false);

  const handleSubmit = (values: any) => {
    // console.log('here is TreatmentEffect values :', values);
    // 返回值json
    const reqData: TreatmentEffectType = {};

    reqData.shock = values.shock ? values.shock : 0;
    reqData.anoxiaTime = values.anoxiaTime ? values.anoxiaTime : 0;

    const oxygen: oxygenType = {
      isExist: values.oxygenUptake_isExist,
      flow: values.flow,
      method: values.method,
    };
    reqData.oxygenUptake = JSON.stringify(oxygen) ? JSON.stringify(oxygen) : 'null';

    reqData.useInvasiveVentilator = values.useInvasiveVentilator ? values.useInvasiveVentilator : 0;
    reqData.useNonInvasiveVentilator = values.useNonInvasiveVentilator
      ? values.useNonInvasiveVentilator
      : 0;

    const Sedative: drugType = {
      isExist: values.sedative_isExist,
      drugName: values.sedative_drugName,
      dosage: values.sedative_dosage,
      time: values.sedative_time,
    };
    reqData.sedative = JSON.stringify(Sedative);

    const Analgesic: drugType = {
      isExist: values.analgesic_isExist,
      drugName: values.analgesic_drugName,
      dosage: values.analgesic_dosage,
      time: values.analgesic_time,
    };
    reqData.analgesic = JSON.stringify(Analgesic);

    const Delirium: drugType = {
      isExist: values.delirium_isExist,
      drugName: values.delirium_drugName,
      dosage: values.delirium_dosage,
      time: values.delirium_time,
    };
    reqData.delirium = JSON.stringify(Delirium);

    const AntibacterialDrug: drugType = {
      drugName: values.antibacterialDrug_drugName,
      time: values.antibacterialDrug_time,
    };
    reqData.antibacterialDrug = JSON.stringify(AntibacterialDrug);

    const NeuroprotectiveAgent: drugType = {
      isExist: values.neuroprotectiveAgent_isExist,
      drugName: values.neuroprotectiveAgent_drugName,
      dosage: values.neuroprotectiveAgent_dosage,
      time: values.neuroprotectiveAgent_time,
    };
    reqData.neuroprotectiveAgent = JSON.stringify(NeuroprotectiveAgent);

    const CorticosteroidInIcu72: drugType = {
      drugName: values.corticosteroidInIcu72_drugName,
      dosage: values.corticosteroidInIcu72_dosage,
    };
    reqData.corticosteroidInIcu72 = JSON.stringify(CorticosteroidInIcu72);

    const VasoactiveDrug: drugType = {
      drugName: values.vasoactiveDrug_drugName,
      dosage: values.vasoactiveDrug_dosage,
    };
    reqData.vasoactiveDrug = JSON.stringify(VasoactiveDrug);

    reqData.treatmentOutcome = values.treatmentOutcome;

    Object.keys(reqData).forEach((item) => {
      // console.log('here is item and index',item)
      if (reqData[item] === '{}') reqData[item] = null;
    });

    dispatch({
      type: 'treatment/modifyTreatmentInfo',
      payload: { body: reqData, cycleId },
    });
    // console.log('here is reqData :', reqData);
  };

  useEffect(() => {
    // console.log('here is treatmentInfo form back:', treatmentInfo);
    let _treatmentInfo: any;
    if (treatmentInfo) {
      _treatmentInfo = Object.keys(treatmentInfo)
        .filter(
          (key) =>
            treatmentInfo[key] !== null &&
            treatmentInfo[key] !== undefined &&
            !['id', 'cycleId'].includes(key),
        )
        .reduce((acc, key) => ({ ...acc, [key]: treatmentInfo[key] }), {});
      // console.log('after filter:', _treatmentInfo);
    }

    const formValue: any = {};
    if (_treatmentInfo && Object.keys(_treatmentInfo).length > 2) {
      Object.keys(_treatmentInfo).forEach((key) => {
        if (
          ['shock', 'anoxiaTime', 'useInvasiveVentilator', 'useNonInvasiveVentilator'].includes(key)
        ) {
          if (_treatmentInfo[key] !== '0') {
            formValue[key] = _treatmentInfo[key];
            formValue[`is_${key}`] = 1;
          } else {
            formValue[`is_${key}`] = 0;
          }
        } else if (key === 'treatmentOutcome') {
          formValue[key] = _treatmentInfo[key];
        } else {
          const item = JSON.parse(_treatmentInfo[key]);
          formValue[`${key}_isExist`] = item.isExist;
          formValue[`${key}_drugName`] = item.drugName;
          formValue[`${key}_dosage`] = item.dosage;
          formValue[`${key}_time`] = item.time;
          if (key === 'oxygenUptake') {
            formValue.flow = item.flow;
            formValue.method = item.method;
          }
        }
      });
    }
    const {
      is_shock,
      neuroprotectiveAgent_isExist,
      delirium_isExist,
      analgesic_isExist,
      sedative_isExist,
      is_useNonInvasiveVentilator,
      is_useInvasiveVentilator,
      oxygenUptake_isExist,
      is_anoxiaTime,
    } = formValue;
    setShock(is_shock);
    setAnoxia(is_anoxiaTime);
    setNeuroprotectiveAgent(neuroprotectiveAgent_isExist);
    setDelirium(delirium_isExist);
    setAnalgesic(analgesic_isExist);
    setSedative(sedative_isExist);
    setUseInvasiveVentilator(is_useNonInvasiveVentilator);
    setUseNonInvasiveVentilator(is_useInvasiveVentilator);
    setTakeOxygen(oxygenUptake_isExist);
    // console.log('here is formValue :', { ...formValue });
    form.setFieldsValue({ ...formValue });
  }, [treatmentInfo]);

  return (
    <Spin spinning={treatmentInfoLoading}>
      <Form
        form={form}
        {...formItemLayout}
        labelAlign="left"
        onFinish={handleSubmit}
        disabled={isSubmit}
        labelWrap
      >
        <Form.Item label="休克" name="is_shock">
          <Radio.Group
            onChange={(e) => {
              setShock(e.target.value === 1);
            }}
          >
            <Radio value={0}>无</Radio>
            <Radio value={1}>
              有
              {shock ? (
                <Form.Item name="shock" noStyle>
                  <Input
                    style={{ width: 200, marginLeft: 15 }}
                    placeholder="休克累积时间"
                    addonAfter="小时"
                  />
                </Form.Item>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="缺氧时间(PaO2﹤60mmHg)" name="is_anoxiaTime">
          <Radio.Group
            onChange={(e) => {
              setAnoxia(e.target.value === 1);
            }}
          >
            <Radio value={0}>无</Radio>
            <Radio value={1}>
              有
              {anoxia ? (
                <Form.Item name="anoxiaTime" noStyle>
                  <Input
                    style={{ width: 200, marginLeft: 15 }}
                    placeholder="缺氧累积时间"
                    addonAfter="小时"
                  />
                </Form.Item>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="是否吸氧" name="oxygenUptake_isExist">
          <Radio.Group
            onChange={(e) => {
              setTakeOxygen(e.target.value === 1);
            }}
          >
            <Radio value={0}>否</Radio>
            <Radio value={1}>
              是
              {takeOxygen ? (
                <>
                  <Form.Item name="flow" noStyle>
                    <Input style={{ width: 200, marginLeft: 15 }} placeholder="氧流量" />
                  </Form.Item>
                  <Form.Item name="method" noStyle>
                    <Input style={{ width: 200, marginLeft: 15 }} placeholder="吸氧方式" />
                  </Form.Item>
                </>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="有创呼吸机使用" name="is_useInvasiveVentilator">
          <Radio.Group
            onChange={(e) => {
              setUseInvasiveVentilator(e.target.value === 1);
            }}
          >
            <Radio value={0}>无</Radio>
            <Radio value={1}>
              有
              {useInvasiveVentilator ? (
                <Form.Item name="useInvasiveVentilator" noStyle>
                  <Input
                    style={{ width: 200, marginLeft: 15 }}
                    placeholder="使用累积时间"
                    addonAfter="小时"
                  />
                </Form.Item>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="无创呼吸机使用" name="is_useNonInvasiveVentilator">
          <Radio.Group
            onChange={(e) => {
              setUseNonInvasiveVentilator(e.target.value === 1);
            }}
          >
            <Radio value={0}>无</Radio>
            <Radio value={1}>
              有
              {useNonInvasiveVentilator ? (
                <Form.Item name="useNonInvasiveVentilator" noStyle>
                  <Input
                    style={{ width: 200, marginLeft: 15 }}
                    placeholder="使用累积时间"
                    addonAfter="小时"
                  />
                </Form.Item>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="是否使用镇静药" name="sedative_isExist">
          <Radio.Group
            onChange={(e) => {
              setSedative(e.target.value === 1);
            }}
          >
            <Radio value={0}>否</Radio>
            <Radio value={1}>
              是
              {sedative ? (
                <>
                  <Form.Item name="sedative_drugName" noStyle>
                    <Input style={{ width: 200, marginLeft: 15 }} placeholder="药物名称" />
                  </Form.Item>
                  <Form.Item name="sedative_dosage" noStyle>
                    <Input
                      style={{ width: 200, marginLeft: 15 }}
                      placeholder="累积剂量"
                      addonAfter="mg"
                    />
                  </Form.Item>
                  <Form.Item name="sedative_time" noStyle>
                    <Input
                      style={{ width: 200, marginLeft: 15 }}
                      placeholder="用药时间"
                      addonAfter="小时"
                    />
                  </Form.Item>
                </>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="是否使用镇痛药" name="analgesic_isExist">
          <Radio.Group
            onChange={(e) => {
              setAnalgesic(e.target.value === 1);
            }}
          >
            <Radio value={0}>否</Radio>
            <Radio value={1}>
              是
              {analgesic ? (
                <>
                  <Form.Item name="analgesic_drugName" noStyle>
                    <Input style={{ width: 200, marginLeft: 15 }} placeholder="药物名称" />
                  </Form.Item>
                  <Form.Item name="analgesic_dosage" noStyle>
                    <Input
                      style={{ width: 200, marginLeft: 15 }}
                      placeholder="累积剂量"
                      addonAfter="mg"
                    />
                  </Form.Item>
                  <Form.Item name="analgesic_time" noStyle>
                    <Input
                      style={{ width: 200, marginLeft: 15 }}
                      placeholder="用药时间"
                      addonAfter="小时"
                    />
                  </Form.Item>
                </>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="是否出现谵妄" name="delirium_isExist">
          <Radio.Group
            onChange={(e) => {
              setDelirium(e.target.value === 1);
            }}
          >
            <Radio value={0}>否</Radio>
            <Radio value={1}>
              是
              {delirium ? (
                <>
                  <Form.Item name="delirium_drugName" noStyle>
                    <Input style={{ width: 200, marginLeft: 15 }} placeholder="药物名称" />
                  </Form.Item>
                  <Form.Item name="delirium_dosage" noStyle>
                    <Input
                      style={{ width: 200, marginLeft: 15 }}
                      placeholder="累积剂量"
                      addonAfter="mg"
                    />
                  </Form.Item>
                  <Form.Item name="delirium_time" noStyle>
                    <Input
                      style={{ width: 200, marginLeft: 15 }}
                      placeholder="用药时间"
                      addonAfter="小时"
                    />
                  </Form.Item>
                </>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="确认感染性休克(严重脓毒症)后到抗菌药物给药名称和时间">
          <Form.Item noStyle name="antibacterialDrug_drugName">
            <Input style={{ width: 200, marginLeft: 15 }} placeholder="药物名称" />
          </Form.Item>
          <Form.Item noStyle name="antibacterialDrug_time">
            <Input
              style={{ width: 200, marginLeft: 15 }}
              placeholder="给药时间"
              addonAfter="小时"
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label="是否使用神经保护剂" name="neuroprotectiveAgent_isExist">
          <Radio.Group
            onChange={(e) => {
              setNeuroprotectiveAgent(e.target.value === 1);
            }}
          >
            <Radio value={0}>否</Radio>
            <Radio value={1}>
              是
              {neuroprotectiveAgent ? (
                <>
                  <Form.Item name="neuroprotectiveAgent_drugName" noStyle>
                    <Input style={{ width: 200, marginLeft: 15 }} placeholder="药物名称" />
                  </Form.Item>
                  <Form.Item name="neuroprotectiveAgent_dosage" noStyle>
                    <Input
                      style={{ width: 200, marginLeft: 15 }}
                      placeholder="累积剂量"
                      addonAfter="mg"
                    />
                  </Form.Item>
                  <Form.Item name="neuroprotectiveAgent_time" noStyle>
                    <Input
                      style={{ width: 200, marginLeft: 15 }}
                      placeholder="用药时间"
                      addonAfter="小时"
                    />
                  </Form.Item>
                </>
              ) : null}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label=" ICU 入院后 72 小时内使用皮质类固醇名称和累积剂量">
          <Form.Item name="corticosteroidInIcu72_drugName" noStyle>
            <Input style={{ width: 200, marginLeft: 15 }} placeholder="药物名称" />
          </Form.Item>

          <Form.Item name="corticosteroidInIcu72_dosage" noStyle>
            <Input style={{ width: 200, marginLeft: 15 }} placeholder="累积剂量" addonAfter="mg" />
          </Form.Item>
        </Form.Item>

        <Form.Item label="血管活性药物使用名称和累积剂量">
          <Form.Item noStyle name="vasoactiveDrug_drugName">
            <Input style={{ width: 200, marginLeft: 15 }} placeholder="药物名称" />
          </Form.Item>

          <Form.Item noStyle name="vasoactiveDrug_dosage">
            <Input style={{ width: 200, marginLeft: 15 }} placeholder="累积剂量" addonAfter="mg" />
          </Form.Item>
        </Form.Item>

        <Form.Item label="治疗转归" name="treatmentOutcome">
          <Radio.Group>
            <Radio value={1}>出院</Radio>
            <Radio value={2}>转科</Radio>
            <Radio value={3}>死亡</Radio>
          </Radio.Group>
        </Form.Item>
        <Col offset={6}>
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
  treatment: StateType;
  global: GlobalStateType;
  loading: { effects: { [key: string]: boolean } };
  base: BaseStateType;
  cycle: CycleStateType;
}) => {
  return {
    useAnonymousGlobal: global.useAnonymousGlobal,
    treatmentInfo: cycle.cycleInfo.treatmentEffect,
    treatmentInfoLoading: loading.effects['cycle/fetchCycleInfo'],
    isSubmit: !!base.baseInfo?.isSubmit,
  };
};

export default connect(mapStateToProps)(TreatmentEffect);
