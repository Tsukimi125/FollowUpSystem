/*
 * @Author: 947656035 947656035@qq.com
 * @Date: 2022-07-05 21:12:06
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-28 19:54:44
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\LabInspection\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Col, Tabs, InputNumber, Radio } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { LabInspectionType } from './data';
import type { StateType } from './model';
import type { StateType as BaseStateType } from '../BaseInfo/model';
import { useForm } from 'antd/lib/form/Form';
import styles from './style.less';
import type { StateType as GlobalStateType } from '@/models/global';
import type { StateType as CycleStateType } from '@/models/cycle';
import FormWithItems from '@/components/FormWithItems';
import {
  BloodRoutine,
  Cytokine,
  GMTest,
  IgGAMC3,
  LymphocyteSubsets,
  Microbiome,
  MolecularGroup,
  RheumatismFullSet,
  ScientificResearchProjects,
  TuberculosisInfectionTCellTest,
} from './Items';
// import { PhoneFilled } from '@ant-design/icons';

interface LabInspectionProps {
  dispatch: Dispatch;
  labInspectionInfo?: LabInspectionType;
  labInspectionLoading: boolean;
  useAnonymousGlobal: boolean;
  pid: number;
  cycleId: number;
  isSubmit: boolean;
  labTestId: number;
}

const LabInspection: React.FC<LabInspectionProps> = (props) => {
  const { labInspectionInfo, cycleId, dispatch, isSubmit, labTestId } = props;

  const { TabPane } = Tabs;

  const [bloodCulturePositive, setBloodCulturePositive] = useState(false);

  const [inflammatoryForm] = useForm();
  const [bloodRoutineForm] = useForm();
  const [bloodChemistryForm] = useForm();
  const [coagulationForm] = useForm();
  const [ABGAForm] = useForm();
  const [specialTestForm] = useForm();

  const [MicrobiomeForm] = useForm();
  const [RheumatismFullSetForm] = useForm();
  const [LymphocyteSubsetsForm] = useForm();
  const [CytokineForm] = useForm();
  const [IgGAMC3Form] = useForm();
  const [GMTestForm] = useForm();
  const [TuberculosisInfectionTCellTestForm] = useForm();
  const [MolecularGroupForm] = useForm();
  const [ScientificResearchProjectsForm] = useForm();

  // console.log('pid is : ', pid);
  // console.log('here is labInspectionInfo', labInspectionInfo);
  // const { ABGA, bloodChemistry, bloodRoutine, coagulation, inflammatory } = labInspectionInfo;

  // console.log('here is lab test id', labTestId);

  const formItemLayout = {
    labelCol: { xl: { span: 3 }, md: { span: 3 } },
    wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
  };

  useEffect(() => {
    if (labInspectionInfo) {
      const {
        arterialBloodGas,
        bloodBiochemistry,
        bloodTest,
        coagulationFunction,
        inflammationIndicators,
        specialInspection,
        microbiome,
        rheumatism14,
        lymphocyteSubsets,
        cellFactor,
        immune,
        gmTest,
        tuberculosisInfectionTCellTest,
        molecular,
        sciResearchProject,
      } = labInspectionInfo;
      if (arterialBloodGas) {
        ABGAForm.setFieldsValue(arterialBloodGas);
      }
      if (bloodBiochemistry) {
        bloodChemistryForm.setFieldsValue(bloodBiochemistry);
      }
      if (bloodTest) {
        bloodRoutineForm.setFieldsValue(bloodTest);
      }
      if (coagulationFunction) {
        coagulationForm.setFieldsValue(coagulationFunction);
      }
      if (inflammationIndicators) {
        inflammatoryForm.setFieldsValue(inflammationIndicators);
      }
      // console.log('here is specialInspection:', specialInspection);
      if (specialInspection) {
        if (specialInspection.bloodCulture) {
          const _bloodCulture = JSON.parse(specialInspection.bloodCulture);
          // console.log('here is _bloodCulture:', _bloodCulture);
          if (_bloodCulture.value !== 0) {
            setBloodCulturePositive(true);
            // specialInspection.BCPositive =
            //   specialInspection.bloodCulture === '1' ? '' : specialInspection.bloodCulture;
            // specialInspection.bloodCulture = 1;
            specialInspection.BCPositive = _bloodCulture.note;
            specialInspection.bloodCulture = 1;
          } else {
            specialInspection.bloodCulture = 0;
          }
        }

        specialTestForm.setFieldsValue(specialInspection);
      }
      if (microbiome) {
        MicrobiomeForm.setFieldsValue(microbiome);
      }
      if (rheumatism14) {
        RheumatismFullSetForm.setFieldsValue(rheumatism14);
      }
      if (lymphocyteSubsets) {
        LymphocyteSubsetsForm.setFieldsValue(lymphocyteSubsets);
      }
      if (cellFactor) {
        CytokineForm.setFieldsValue(cellFactor);
      }
      if (immune) {
        IgGAMC3Form.setFieldsValue(immune);
      }
      if (gmTest) {
        GMTestForm.setFieldsValue(gmTest);
      }
      if (tuberculosisInfectionTCellTest) {
        TuberculosisInfectionTCellTestForm.setFieldsValue(tuberculosisInfectionTCellTest);
      }
      if (molecular) {
        MolecularGroupForm.setFieldsValue(molecular);
      }
      if (sciResearchProject) {
        ScientificResearchProjectsForm.setFieldsValue(sciResearchProject);
      }

      // MicrobiomeForm.setFieldsValue({
      //   a: 0,
      //   b: 0,
      //   c: 0,
      // });

      // RheumatismFullSetForm.setFieldsValue({
      //   a: 0,
      //   b: 0,
      // });
    }
  }, [labInspectionInfo]);

  useEffect(() => {
    dispatch({
      type: 'lab/fetchLabInspectionInfo',
      payload: { labTest: labTestId },
    });
  }, []);

  // type取值
  // 0 炎症相关指标
  // 1 血常规
  // 2 血生化
  // 3 凝血功能
  // 4 动脉血气分析
  const handleSubmit = (values: any, item: number) => {
    // console.log('value and item :', values, item);
    if (item === 5) {
      const BloodCulture = {
        isExist: 1,
        value: values.bloodCulture,
        note: values.BCPositive,
      };
      values.bloodCulture = JSON.stringify(BloodCulture);
    }

    // if (item === 5) {
    //   if (values.BCPositive) {
    //     values.bloodCulture = JSON.stringify(BloodCulture);;
    //     delete values.BCPositive;
    //   }
    // }
    dispatch({
      type: 'lab/modifyLabInspectionInfo',
      payload: { cycleId, body: { ...values }, item, labTest: labTestId },
    });
    // console.log('here is after dispatch');
  };

  // // 字段值转换
  // const format3 = (e: any) => {
  //   const num = e.target.value;
  //   console.log(num);
  //   const result = parseFloat(num);
  //   return result.toFixed(3);
  // };

  return (
    <>
      <Tabs defaultActiveKey="1" tabPosition="left" tabBarStyle={{ fontWeight: 'bold' }}>
        <TabPane tab="炎症相关指标" key="1">
          <Form
            disabled={isSubmit}
            {...formItemLayout}
            labelAlign="left"
            onFinish={(values) => {
              handleSubmit(values, 0);
            }}
            form={inflammatoryForm}
          >
            {/* <Form.Item name="id" hidden>
              <Input />
            </Form.Item> */}
            <Form.Item label="IL-6" name="il6">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="IL-1β" name="il1B">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="IL-10" name="il10">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="TNF-a" name="tnfA">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="PCT" name="pct">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="CRP" name="crp">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="铁蛋白" name="ferritin">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Col offset={5}>
              <Button htmlType="submit" type="primary">
                保存
              </Button>
            </Col>
          </Form>
        </TabPane>
        <TabPane tab="血常规" key="2">
          <FormWithItems
            formLayout={{
              labelCol: { xl: { span: 4 }, md: { span: 4 } },
              wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
            }}
            formInstance={bloodRoutineForm}
            Items={BloodRoutine}
            onFinish={(values: any) => {
              handleSubmit(values, 1);
            }}
          />
          {/* <Form
            {...formItemLayout}
            labelAlign="left"
            form={bloodRoutineForm}
            disabled={isSubmit}
            onFinish={(values) => {
              handleSubmit(values, 1);
            }}
          >
            <Form.Item label="白细胞计数" name="wbc">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="红细胞计数" name="rbc">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="红细胞容积" name="corpuscularVolume">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="血红蛋白" name="hemoglobin">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="血小板计数" name="bpc">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Col offset={5}>
              <Button htmlType="submit" type="primary">
                保存
              </Button>
            </Col>
          </Form> */}
        </TabPane>
        <TabPane tab="血生化" key="3">
          <Form
            {...formItemLayout}
            labelAlign="left"
            form={bloodChemistryForm}
            disabled={isSubmit}
            onFinish={(values) => {
              handleSubmit(values, 2);
            }}
          >
            <Form.Item label="谷丙转氨酶" name="alt">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="谷草转氨酶" name="ast">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="胆固醇" name="cholesterol">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="甘油三酯" name="triglyceride">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="总胆红素" name="totalBilirubin">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="直接胆红素" name="directBilirubin">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="间接胆红素" name="indirectBilirubin">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="血糖" name="bloodSugar">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="肌酐" name="creatinine">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="尿素氮" name="ureaNitrogen">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>

            <Form.Item label="γ-谷氨酰转肽酶" name="ygt">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="碱性磷酸酶" name="alp">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="高密度脂蛋白" name="hdl">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="低密度脂蛋白" name="ldl">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="肌酸激酶" name="creatineKinase">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="乳酸脱氢酶" name="ldh">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="总蛋白" name="totalProtein">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="白蛋白" name="albumin">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="球蛋白" name="globulin">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="乳酸" name="lactate">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="尿酸" name="uricAcid">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="胱抑素C" name="cystatinC">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="胆碱酯酶" name="cholinesterase">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="eGFR" name="egfr">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="钾离子" name="potassiumIon">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="钠离子" name="sodiumIon">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="钙离子" name="calciumIon">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>

            <Col offset={5}>
              <Button htmlType="submit" type="primary">
                保存
              </Button>
            </Col>
          </Form>
        </TabPane>
        <TabPane tab="凝血功能" key="4">
          <Form
            {...{
              labelCol: { xl: { span: 4 }, md: { span: 4 } },
              wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
            }}
            labelAlign="left"
            form={coagulationForm}
            disabled={isSubmit}
            onFinish={(values) => {
              handleSubmit(values, 3);
            }}
          >
            <Form.Item label="凝血酶时间" name="tt">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="凝血酶原时间" name="pt">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="活化部分凝血酶原时间" name="aptt">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="D-D二聚体" name="dddimer">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="纤维蛋白降解产物" name="fdp">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Col offset={5}>
              <Button htmlType="submit" type="primary">
                保存
              </Button>
            </Col>
          </Form>
        </TabPane>
        <TabPane tab="动脉血气分析" key="5">
          <Form
            {...formItemLayout}
            labelAlign="left"
            form={ABGAForm}
            disabled={isSubmit}
            onFinish={(values) => {
              handleSubmit(values, 4);
            }}
          >
            <Form.Item label="酸碱度" name="ph">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="二氧化碳分压" name="pco2">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="氧分压" name="oxygenPressure">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="氧饱和度" name="oxygenSaturation">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="碳酸" name="carbonicAcid">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            {/* <Form.Item label="乳酸" name="lactate">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item> */}
            <Col offset={5}>
              <Button htmlType="submit" type="primary">
                保存
              </Button>
            </Col>
          </Form>
        </TabPane>
        <TabPane tab="特殊检查" key="6">
          <Form
            {...formItemLayout}
            labelAlign="left"
            form={specialTestForm}
            disabled={isSubmit}
            onFinish={(values) => {
              handleSubmit(values, 5);
            }}
          >
            <Form.Item label="心脏超声" name="cardiacUltrasound">
              <Input.TextArea className={styles.form_input} />
            </Form.Item>
            <Form.Item label="心电图" name="electrocardiogram">
              <Input.TextArea className={styles.form_input} />
            </Form.Item>
            <Form.Item label="高敏心肌肌钙蛋白" name="hsCtn">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="pro-BNP" name="proBnp">
              <InputNumber<string>
                type="number"
                className={styles.form_input}
                step="0.001"
                min="0"
              />
            </Form.Item>
            <Form.Item label="X线胸片" name="xrayChestFilm">
              <Input.TextArea className={styles.form_input} />
            </Form.Item>
            <Form.Item label="血培养" name="bloodCulture">
              <Radio.Group
                onChange={(e) => {
                  setBloodCulturePositive(e.target.value === 1);
                }}
              >
                <Radio value={0}>阴性</Radio>
                <Radio value={1}>
                  阳性
                  {bloodCulturePositive ? (
                    <Form.Item name="BCPositive" noStyle>
                      <Input style={{ width: 200, marginLeft: 15 }} placeholder="情况说明" />
                    </Form.Item>
                  ) : null}
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Col offset={5}>
              <Button htmlType="submit" type="primary">
                保存
              </Button>
            </Col>
          </Form>
        </TabPane>
        <TabPane tab="微生物组" key="7">
          <FormWithItems
            key={7}
            Items={Microbiome}
            onFinish={(values: any) => {
              handleSubmit(values, 6);
            }}
            formInstance={MicrobiomeForm}
            formLayout={{
              labelCol: { xl: { span: 6 }, md: { span: 6 } },
              wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
            }}
          />
        </TabPane>
        <TabPane tab="风湿全套14" key="8">
          <FormWithItems
            Items={RheumatismFullSet}
            formInstance={RheumatismFullSetForm}
            onFinish={(values: any) => {
              handleSubmit(values, 7);
            }}
          />
        </TabPane>
        <TabPane tab="淋巴细胞亚群" key="9">
          <FormWithItems
            Items={LymphocyteSubsets}
            formInstance={LymphocyteSubsetsForm}
            formLayout={{
              labelCol: { xl: { span: 7 }, md: { span: 7 } },
              wrapperCol: { xl: { span: 17 }, md: { span: 17 } },
            }}
            onFinish={(values: any) => {
              handleSubmit(values, 8);
            }}
          />
        </TabPane>
        <TabPane tab="细胞因子" key="10">
          <FormWithItems
            formInstance={CytokineForm}
            Items={Cytokine}
            onFinish={(values: any) => {
              handleSubmit(values, 9);
            }}
          />
        </TabPane>
        <TabPane tab="免疫全套IgGAM,C3" key="11">
          <FormWithItems
            formInstance={IgGAMC3Form}
            Items={IgGAMC3}
            onFinish={(values: any) => {
              handleSubmit(values, 10);
            }}
          />
        </TabPane>
        <TabPane tab="GM试验-曲霉菌半乳甘露聚糖检测" key="12">
          <FormWithItems
            formLayout={{
              labelCol: { xl: { span: 4 }, md: { span: 4 } },
              wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
            }}
            formInstance={GMTestForm}
            Items={GMTest}
            onFinish={(values: any) => {
              handleSubmit(values, 11);
            }}
          />
        </TabPane>
        <TabPane tab="结核感染T细胞检测" key="13">
          <FormWithItems
            formInstance={TuberculosisInfectionTCellTestForm}
            Items={TuberculosisInfectionTCellTest}
            onFinish={(values: any) => {
              handleSubmit(values, 12);
            }}
          />
        </TabPane>
        <TabPane tab="分子组" key="14">
          <FormWithItems
            formLayout={{
              labelCol: { xl: { span: 4 }, md: { span: 4 } },
              wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
            }}
            formInstance={MolecularGroupForm}
            Items={MolecularGroup}
            onFinish={(values: any) => {
              handleSubmit(values, 13);
            }}
          />
        </TabPane>
        <TabPane tab="科研项目" key="15">
          <FormWithItems
            formLayout={{
              labelCol: { xl: { span: 8 }, md: { span: 8 } },
              wrapperCol: { xl: { span: 16 }, md: { span: 16 } },
            }}
            formInstance={ScientificResearchProjectsForm}
            Items={ScientificResearchProjects}
            onFinish={(values: any) => {
              handleSubmit(values, 14);
            }}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

const mapStateToProps = ({
  lab,
  loading,
  global,
  base,
  cycle,
}: {
  lab: StateType;
  global: GlobalStateType;
  loading: { effects: { [key: string]: boolean } };
  base: BaseStateType;
  cycle: CycleStateType;
}) => {
  // console.log('here is map :', lab.labInspectionInfo);
  return {
    useAnonymousGlobal: global.useAnonymousGlobal,
    labInspectionInfo: lab.labInspectionInfo,
    labInspectionLoading: loading.effects['lab/fetchLabInspectionInfo'],
    isSubmit: !!base.baseInfo?.isSubmit,
    labTestId: cycle.cycleInfo.labTest.id,
  };
};

export default connect(mapStateToProps)(LabInspection);
