/* eslint-disable react/jsx-boolean-value */
/*
 * @Descripttion: 搜索-按钮产生的模态框
 * @Author: linkenzone
 * @Date: 2020-09-26 21:55:04
 */

import PatDiaFormItem from '@/components/patDiaTree';
import { RedoOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
} from 'antd';
import type { FormInstance } from 'antd/lib/form';
import React, { useEffect, useState } from 'react';
import { specimentType } from '@/layouts/constant';
// import { connect, Dispatch, history } from 'umi';

const { Option } = Select;

const patOps = [
  { label: 'I', value: 'I' },
  { label: 'IA1', value: 'IA1' },
  { label: 'IA2', value: 'IA2' },
  { label: 'IA3', value: 'IA3' },
  { label: 'IB', value: 'IB' },
  { label: 'II', value: 'II' },
  { label: 'IIA', value: 'IIA' },
  { label: 'IIB', value: 'IIB' },
  { label: 'III', value: 'III' },
  { label: 'IIIA', value: 'IIIA' },
  { label: 'IIIB', value: 'IIIB' },
  { label: 'IIIC', value: 'IIIC' },
  { label: 'IV', value: 'IV' },
  { label: 'IVA', value: 'IVA' },
  { label: 'IVB', value: 'IVB' },
];
/* const genes = [
  { label: 'ALK', value: 'ALK' },
  { label: 'BIM', value: 'BIM' },
  { label: 'BRAF', value: 'BRAF' },
  { label: 'cMET', value: 'cMET' },
  { label: 'EGFR', value: 'EGFR' },
  { label: 'HER_2', value: 'HER_2' },
  { label: 'HER-2-co', value: 'HER_2_co' },
  { label: 'PIK3CA', value: 'PIK3CA' },
  { label: 'ROS1', value: 'ROS1' },
  { label: 'RET', value: 'RET' },
  { label: 'UGT1A1', value: 'UGT1A1' },
];
 */
const genes = [
  { label: 'EGFR', value: { gene: 'EGFR', value: null }, checked: false },
  { label: 'ALK', value: { gene: 'ALK', value: null }, checked: false },
  { label: 'ROS1', value: { gene: 'ROS1', value: null }, checked: false },
  { label: 'HER_2', value: { gene: 'HER_2', value: null }, checked: false },
  { label: 'BRAF', value: { gene: 'BRAF', value: null }, checked: false },
  { label: 'cMET', value: { gene: 'cMET', value: null }, checked: false },
  { label: 'RET', value: { gene: 'RET', value: null }, checked: false },
  { label: 'NTRK', value: { gene: 'NTRK', value: null }, checked: false },
  { label: 'KRAS', value: { gene: 'KRAS', value: null }, checked: false },
  { label: 'BIM', value: { gene: 'BIM', value: null }, checked: false },
  { label: 'PIK3CA', value: { gene: 'PIK3CA', value: null }, checked: false },
  { label: 'UGT1A1', value: { gene: 'UGT1A1', value: null }, checked: false },
  { label: 'MSI', value: { gene: 'MSI', value: null }, checked: false },
];
const traSite = [
  { label: '肺内（包括同侧不同叶、同侧同叶）', value: '肺内' },
  { label: '对侧肺（仅对侧有转移结节）', value: '对侧肺' },
  { label: '双肺（双侧肺都有转移结节）', value: '双肺' },
  { label: '脑', value: '脑' },
  { label: '脊柱', value: '脊柱' },
  { label: '四肢骨', value: '四肢骨' },
  { label: '肝', value: '肝' },
  { label: '脾', value: '脾' },
  { label: '肾上腺', value: '肾上腺' },
  { label: '胰腺', value: '胰腺' },
  { label: '淋巴结', value: '淋巴结' },
  { label: '肾脏', value: '肾脏' },
  { label: '脑膜', value: '脑膜' },
  { label: '其他骨', value: '其他骨' },
  { label: '其他', value: '其他' },
];

// const specimenType = [
//   { label: '血标本', value: '血标本' },
//   {
//     label: '组织标本(包括新鲜冰冰组织，蜡块，切片)',
//     value: '组织标本(包括新鲜冰冰组织，蜡块，切片)',
//   },
//   { label: '胸腔积液', value: '胸腔积液' },
//   { label: '腹腔积液', value: '腹腔积液' },
//   { label: '脑脊液', value: '脑脊液' },
//   { label: '其他', value: '其他' },
// ];

interface Props {
  modalVisible: boolean;
  modalForm: FormInstance;
  onModalFinish: (value: any) => void;
  onModalClose: () => void;
}

const ModalFormItemLayout = {
  labelCol: { xl: { span: 8 }, md: { span: 10 } },
  wrapperCol: { xl: { span: 16 }, md: { span: 14 } },
};

const SearchForm: React.FC<Props> = (props) => {
  const { modalVisible, modalForm, onModalFinish, onModalClose } = props;

  const [genesCheck, setgenesCheck] = useState(genes);

  const onGenesChange = (e: any) => {
    const genesName = e.target.name;
    // 需要使用...运算符进行深拷贝，这样组件会认为数据发生了变化，从而重新渲染
    const tempGenesCheck = [...genesCheck];
    // console.log(e.target);
    // 找到目标下标
    const targetIndex = tempGenesCheck.findIndex((val) => val.label === genesName);

    // 设置新元素，替换原来的元素
    let radioVal;
    // 如果选中了，value默认为2，如果没选中，value变为null
    if (e.target.checked)
      radioVal =
        tempGenesCheck[targetIndex].value.value === null
          ? 2
          : tempGenesCheck[targetIndex].value.value;
    else radioVal = null;
    const newEle = {
      ...tempGenesCheck[targetIndex],
      checked: e.target.checked,
      value: {
        ...tempGenesCheck[targetIndex].value,
        value: radioVal,
      },
    };
    tempGenesCheck.splice(targetIndex, 1, newEle);
    const nowGenesCheck = [...tempGenesCheck];
    // console.log('nowGenesCheck', nowGenesCheck);
    setgenesCheck([...tempGenesCheck]);

    // 修改提交值
    const submitVal: { gene: string; value: never }[] = [];
    tempGenesCheck.forEach((item) => {
      if (item.checked && item.value.value !== null) {
        submitVal.push({
          gene: item.label,
          value: item.value.value,
        });
      }
    });
    const nowsubmitVal = [...submitVal];
    // console.log('submitVal', nowsubmitVal);
    modalForm.setFieldsValue({ genes: nowsubmitVal });
  };

  const onRadioChange = (e: any) => {
    const genesName = e.target.name;
    // console.log('e.target',e.target)
    const tempGenesCheck = [...genesCheck];
    const targetIndex = tempGenesCheck.findIndex((val) => val.label === genesName);

    // 设置新元素，替换原来的元素
    const newEle = {
      ...tempGenesCheck[targetIndex],
      value: {
        ...tempGenesCheck[targetIndex].value,
        value: e.target.value, // 此时一定可以设置value值，因为可以点击
      },
    };
    tempGenesCheck.splice(targetIndex, 1, newEle);
    const nowGenesCheck = [...tempGenesCheck];
    // console.log('nowGenesCheck', nowGenesCheck);
    setgenesCheck([...tempGenesCheck]);

    // 修改提交值
    const submitVal: { gene: string; value: never }[] = [];
    tempGenesCheck.forEach((item) => {
      if (item.checked && item.value.value !== null) {
        submitVal.push({
          gene: item.label,
          value: item.value.value,
        });
      }
    });
    const nowsubmitVal = [...submitVal];
    // console.log('submitVal', nowsubmitVal);
    modalForm.setFieldsValue({ genes: nowsubmitVal });
  };

  return (
    <Modal
      title=""
      visible={modalVisible}
      onOk={() => {
        modalForm.submit();
      }}
      onCancel={() => {
        onModalClose();
      }}
      // confirmLoading={confirmLoading}
      width={1000}
      forceRender
    >
      <Form onFinish={onModalFinish} form={modalForm} {...ModalFormItemLayout} labelAlign="left">
        <Form.Item>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              modalForm.resetFields();
              setgenesCheck(genes);
            }}
          >
            重置
          </Button>
        </Form.Item>

        <PatDiaFormItem form={modalForm} setPatDiaOthers={() => {}} name="patDia" />

        <Form.Item label="病理分期">
          <span style={{ lineHeight: '32px', fontSize: '14px', marginRight: '8px' }}>C分期:</span>
          <Form.Item name="cliStage" noStyle>
            <Select allowClear style={{ width: '120px', marginRight: '8px' }} options={patOps} />
          </Form.Item>
          <span style={{ lineHeight: '32px', fontSize: '14px', marginRight: '8px' }}>P分期:</span>
          <Form.Item name="patStage" noStyle>
            <Select allowClear style={{ width: '120px' }} options={patOps} />
          </Form.Item>
        </Form.Item>

        {/* 被设置了 name 属性的 Form.Item 包装的控件，会对包裹的控件造成影响，具体参见：https://ant.design/components/form-cn/#API */}
        <Form.Item label="基因突变点位" name="genes">
          <>
            {genesCheck.map((value, index) => {
              // console.log('genesCheck',genesCheck);
              return (
                <Row key={value.label}>
                  <Checkbox
                    name={value.label}
                    onChange={onGenesChange}
                    // checkboxGroup包裹多个checkbox时，给单个checkbox设置checked或defaultChecked属性表示默认选中时均会失效
                    checked={value.checked}
                    style={{ width: '100px' }}
                  >
                    {value.label}
                  </Checkbox>
                  <Radio.Group
                    name={value.label}
                    style={{ marginBottom: '8px' }}
                    disabled={!value.checked}
                    onChange={onRadioChange}
                    // value={!value.checked ? null : value.value.value} // 在响应事件中设置了单选值，不需要再判断了
                    value={value.value.value}
                  >
                    <Radio value={2}>{value.label === 'MSI' ? 'MSIL' : '无'}</Radio>
                    <Radio value={0}>{value.label === 'MSI' ? 'MSS' : '阴性'}</Radio>
                    <Radio value={1}>{value.label === 'MSI' ? 'MSIH' : '阳性'}</Radio>
                  </Radio.Group>
                </Row>
              );
            })}
          </>
        </Form.Item>

        <Form.Item label="转移部位" name="traSite">
          <Checkbox.Group options={traSite} />
        </Form.Item>

        <Form.Item label="标本类型" name="specimenType">
          <Cascader
            allowClear
            style={{ width: 320 }}
            options={specimentType}
            expandTrigger="hover"
          />
        </Form.Item>

        <Form.Item label="性别" name="gender">
          <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={0}>女</Radio>
            <Button
              style={{ marginRight: '8px', borderRadius: '50%' }}
              size="small"
              shape="circle"
              onClick={() => {
                modalForm.setFieldsValue({ gender: null });
              }}
            >
              <RedoOutlined />
            </Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="年龄">
          <Input.Group compact>
            <Form.Item name="age1" noStyle>
              <InputNumber
                className="site-input-left"
                style={{ width: 100, textAlign: 'center' }}
                placeholder="最小"
                precision={0}
              />
            </Form.Item>
            <Input
              className="site-input-split"
              style={{
                width: 30,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
                marginLeft: '1px',
              }}
              placeholder="~"
              disabled
            />
            <Form.Item name="age2" noStyle>
              <InputNumber
                className="site-input-right"
                style={{ width: 100, textAlign: 'center' }}
                placeholder="最大"
                precision={0}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="吸烟史" name="smoke">
          <Radio.Group>
            <Radio value={true}>有</Radio>
            <Radio value={false}>无</Radio>
            <Button
              style={{ marginRight: '8px', borderRadius: '50%' }}
              size="small"
              shape="circle"
              onClick={() => {
                modalForm.setFieldsValue({ smoke: null });
              }}
            >
              <RedoOutlined />
            </Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="饮酒史" name="drink">
          <Radio.Group>
            <Radio value={true}>有</Radio>
            <Radio value={false}>无</Radio>
            <Button
              style={{ marginRight: '8px', borderRadius: '50%' }}
              size="small"
              shape="circle"
              onClick={() => {
                modalForm.setFieldsValue({ drink: null });
              }}
            >
              <RedoOutlined />
            </Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="激素使用史" name="hormone">
          <Radio.Group>
            <Radio value={true}>有</Radio>
            <Radio value={false}>无</Radio>
            <Button
              style={{ marginRight: '8px', borderRadius: '50%' }}
              size="small"
              shape="circle"
              onClick={() => {
                modalForm.setFieldsValue({ hormone: null });
              }}
            >
              <RedoOutlined />
            </Button>
          </Radio.Group>
        </Form.Item>

        {/* <Form.Item label="几线治疗" name={['therapy_method', 'trement']}>
          <Select
            allowClear
            style={{ width: 180 }}
            onChange={(value) => {
              if (value) {
                setTrement(value.toString());
              } else {
                setTrement('');
              }
            }}
          >
            <Option value="one">1线</Option>
            <Option value="two">2线</Option>
            <Option value="three">3线</Option>
            <Option value="four">4线</Option>
            <Option value="five">5线</Option>
            <Option value="surgery">手术</Option>
            <Option value="radiotherapy">放疗</Option>
            <Option value="other">其他</Option>
          </Select>
        </Form.Item> */}

        <Form.Item label="治疗方案" name={['therapy_method', 'treSolu']}>
          <Select allowClear style={{ width: 180 }}>
            <Option value="surgery">手术</Option>
            <Option value="radiotherapy">放疗</Option>
            <Option value="Chemotherapy">化疗</Option>
            <Option value="TargetedTherapy">靶向治疗</Option>
            <Option value="ImmunityTherapy">免疫治疗</Option>
            <Option value="AntivascularTherapy">抗血管治疗</Option>
            <Option value="Other">其他</Option>
          </Select>
        </Form.Item>

        {/* {trement === 'surgery' ? (
          <Form.Item label="治疗方案" name={['therapy_method', 'treSolu']}>
            <Select allowClear style={{ width: 180 }}>
              <Option value="Chemotherapy">术后辅助化疗</Option>
            </Select>
          </Form.Item>
        ) : null}

        {trement === 'radiotherapy' || trement === '' ? (
          <Form.Item label="治疗方案">无</Form.Item>
        ) : null} */}

        <Form.Item label="PDL1">
          <Input.Group compact>
            <Form.Item name="PDL1_1" noStyle>
              <InputNumber
                min={0}
                max={100}
                className="site-input-left"
                style={{ width: '140px', textAlign: 'center' }}
                placeholder="Minimum"
                formatter={(value) => `${value}%`}
                parser={(value: any) => value.replace('%', '')}
                precision={0}
              />
            </Form.Item>
            <Input
              className="site-input-split"
              style={{
                width: 30,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
                marginLeft: '1px',
              }}
              placeholder="~"
              disabled
            />
            <Form.Item name="PDL1_2" noStyle>
              <InputNumber
                min={0}
                max={100}
                className="site-input-right"
                style={{ width: '140px', textAlign: 'center' }}
                placeholder="Maximum"
                formatter={(value) => `${value}%`}
                parser={(value: any) => value.replace('%', '')}
                precision={0}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label="TMB">
          <Input.Group compact>
            <Form.Item name="TMB1" noStyle>
              <InputNumber
                className="site-input-left"
                formatter={(value) => `${value}个/MB`}
                parser={(value: any) => value.replace('个/MB', '')}
                style={{ width: '140px', textAlign: 'center' }}
                placeholder="Minimum"
              />
            </Form.Item>
            <Input
              className="site-input-split"
              style={{
                width: 30,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
                marginLeft: '1px',
              }}
              placeholder="~"
              disabled
            />
            <Form.Item name="TMB2" noStyle>
              <InputNumber
                className="site-input-right"
                formatter={(value) => `${value}个/MB`}
                parser={(value: any) => value.replace('个/MB', '')}
                style={{ width: '140px', textAlign: 'center' }}
                placeholder="Maximum"
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SearchForm;
