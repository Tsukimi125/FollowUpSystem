/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-01-29 17:54:52
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Switch, Select, Divider, Button, message, Spin } from 'antd';
import { Dispatch, connect } from 'umi';

import { AllSelectedForm as baseline_AllSelectedForm } from '../step2/AllSelectedForm';
import { AllSelectedForm as tre_AllSelectedForm } from '../step3/AllSelectedForm';
import { AllSelectedForm, colLimit } from './AllSelectedForm';
import { StateType as FuvStateType } from '../../../model';
import { StateType } from '../model';

import { exportDataOptions } from '../exportData';

const { Option } = Select;

interface Step5FormProps {
  all_pids: number[];
  isExportAll: boolean;
  steps: number[];
  formData: StateType['form'];
  exportLoading: boolean;
  data_mask: number;
  dispatch: Dispatch;
}

const ModalFormItemLayout = {
  labelCol: { xl: { span: 8 }, md: { span: 10 } },
  wrapperCol: { xl: { span: 16 }, md: { span: 14 } },
};

const tailLayout = {
  wrapperCol: { xl: { span: 6, offset: 8 }, md: { span: 6, offset: 10 } },
};

const Step5: React.FC<Step5FormProps> = (props) => {
  const { all_pids, dispatch, isExportAll, steps, data_mask, formData, exportLoading } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    // console.log('data_mask', data_mask);
  }, [data_mask]);

  // 仅在组件渲染的时候调用一次
  //   useEffect(() => {
  //     console.log('exportForms', steps);
  //   }, [steps]);

  // // 重新配置formData
  // const relocationFormData = (_formData: StateType['form']) => {
  //   // 配置基本信息
  //   const res_formData: any = {
  //     pids: _formData.pids,
  //     treNums: _formData.treNums,
  //     follInfoNum: 0,
  //   };

  //   // 根据选择的路径，配置详细字段
  //   const selectedForm = steps.slice(1, steps.length - 1);
  //   const detailForm: any = {};

  //   // 配置基线资料
  //   if (selectedForm.indexOf(1) !== -1) {
  //     for (const item of baseline_AllSelectedForm) {
  //       // 如果选了，则加入
  //       if (_formData[item]) {
  //         detailForm[item] = _formData[item];
  //       }
  //     }
  //   }

  //   // 配置治疗记录
  //   if (selectedForm.indexOf(2) !== -1) {
  //     for (const item of tre_AllSelectedForm) {
  //       // 如果选了，则加入
  //       if (_formData[item]) {
  //         detailForm[item] = _formData[item];
  //       }
  //     }
  //   }

  //   // 配置随访记录
  //   if (selectedForm.indexOf(3) !== -1) {
  //     if (_formData.FollInfo) {
  //       detailForm.FollInfo = _formData.FollInfo;
  //       // 随访信息条数
  //       res_formData.follInfoNum = _formData.follInfoNum;
  //     }
  //   }

  //   const _data = [];
  //   // 最后按照列表排序
  //   for (const item of AllSelectedForm) {
  //     // 如果选了，则加入最后的表单
  //     if (detailForm[item]) {
  //       _data.push({ table: item, column: detailForm[item] });
  //     }
  //   }
  //   res_formData.data = _data;

  //   return res_formData;
  // };

  useEffect(() => {
    // 重新设置表单
    // console.log('formData', formData);
  }, [formData]);

  const { getFieldsValue } = form;

  const exportFuv = () => {
    const values = { ...formData };
    if (values.pids.length === 0 && isExportAll === false) {
      message.error('未选择导出样本!');
      return;
    }
    if (isExportAll) {
      values.pids = all_pids;
    }

    // -------------------------mt修改部分:start------------------------------
    // console.log('values（所有选择字段）：', values);
    const allInfoList = ['baseLine', 'treNums', 'trementInfo', 'follInfoNum', 'follInfo'];
    // 计算每一步得到的字段数
    const calculateCol = (item: string) => {
      const itemAry = values[item];
      let itemCount = 0;
      for (let index = 0; index < itemAry.length; index++) {
        const ele = itemAry[index];
        itemCount += ele['column'].length;
      }
      return itemCount;
    };
    // 设置总字段数为colCount
    let colCount = 0;
    for (let index = 0; index < allInfoList.length; index++) {
      const element = values[allInfoList[index]];
      if (element !== undefined) {
        switch (allInfoList[index]) {
          case 'baseLine':
            colCount += calculateCol(allInfoList[index]);
            break;
          case 'trementInfo':
            colCount += calculateCol(allInfoList[index]) * (values['treNums'].length - 1);
            break;
          case 'follInfo':
            colCount += values['follInfo']['column'].length * values['follInfoNum'];
            if (values['follInfo']['column'].indexOf('nextFollowupTime') > -1) {
              colCount -= values['follInfoNum'] + 1;
            }
            break;
          default:
            break;
        }
      }
    }
    // console.log(colCount)

    if (colCount > colLimit) {
      message.warning(
        ''.concat(
          '导出字段数：',
          colCount.toString(),
          '，预计超出Excel列限制，请返回上一步减少字段！',
        ),
      );
    } else if (dispatch) {
      dispatch({
        type: 'exportData/submitStepForm',
        payload: { body: values, data_mask },
      });
    }

    // -------------------------mt修改部分:end------------------------------
    // 循环清除 []
    // for (const attr in values) {
    //   // 判断是否为 导出字段
    //   if (attr === 'baseLine' || attr === 'trementInfo' || attr === 'follInfo') {
    //     // 清除为空的数据
    //     if (values[attr] !== undefined) {
    //       for (const item of values[attr]) {

    //       }
    //       delete values[attr];
    //     }
    //   }
    // }
  };

  const onPrev = () => {
    if (dispatch && steps) {
      const values = getFieldsValue();
      console.log('values', values);
      let index = 0;
      for (const _index in steps) {
        if (steps[_index] === 4) {
          index = parseInt(_index, 10);
        }
      }
      dispatch({
        type: 'exportData/save',
        payload: { current: steps[index - 1] },
      });
    }
  };

  return (
    <Spin spinning={exportLoading === true} tip="正在导出...">
      <Form onFinish={() => {}} form={form} {...ModalFormItemLayout} labelAlign="left">
        <div style={{ textAlign: 'center' }}>
          <Button onClick={onPrev} style={{ marginRight: 8 }}>
            上一步
          </Button>
          <Button type="primary" onClick={exportFuv} loading={exportLoading}>
            导出
          </Button>
        </div>

        <Divider orientation="left">随访信息</Divider>

        <Form.Item label="当前选择的病例数">
          <span>{isExportAll ? all_pids?.length : formData.pids?.length}</span>
        </Form.Item>

        {formData.trementInfo ? (
          <>
            <Form.Item label="最小治疗记录数">
              {formData.treNums.length < 2 ? 1 : formData.treNums[1]}
            </Form.Item>
            <Form.Item label="最大治疗记录数">
              {formData.treNums.length < 2 ? 1 : formData.treNums[formData.treNums.length - 1]}
            </Form.Item>
          </>
        ) : null}

        {formData.follInfo ? (
          <>
            <Form.Item label="导出随访信息条数">{formData.follInfoNum}</Form.Item>
          </>
        ) : null}

        {/* <Divider orientation="left">调试信息</Divider>
        <Form.Item label="treNum">
          <div style={{ width: 400 }}>
            {formData.treNums?.map((value) => (
              <span key={value}>{value},</span>
            ))}
          </div>
        </Form.Item>
        <Form.Item label="基线资料">
          {formData.baseLine?.map((value) => {
            if (value.column) {
              return (
                <div key={value.table}>
                  {exportDataOptions[value.table].label}:{value.table}
                  <span style={{ width: 400, display: 'block' }}>
                    (
                    {value.column.map((_value) => {
                      return `${_value},`;
                    })}
                    )
                  </span>
                </div>
              );
            }
            return null;
          })}
        </Form.Item>

        <Form.Item label="治疗信息">
          {formData.trementInfo?.map((value) => {
            if (value.column) {
              return (
                <div key={value.table}>
                  {exportDataOptions[value.table].label}:{value.table}
                  <span style={{ width: 400, display: 'block' }}>
                    (
                    {value.column.map((_value) => {
                      return `${_value},`;
                    })}
                    )
                  </span>
                </div>
              );
            }
            return null;
          })}
        </Form.Item>

        <Form.Item label="随访信息">
          {formData.follInfo ? (
            <div key={formData.follInfo.table}>
              {exportDataOptions[formData.follInfo.table].label}:{formData.follInfo.table}
              <span style={{ width: 400, display: 'block' }}>
                (
                {formData.follInfo.column.map((_value) => {
                  return `${_value},`;
                })}
                )
              </span>
            </div>
          ) : null}
        </Form.Item> */}
      </Form>
    </Spin>
  );
};

const mapStateToProps = ({
  exportData,
  fuvList,
  loading,
}: {
  exportData: StateType;
  fuvList: FuvStateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  return {
    all_pids: fuvList.all_pids,
    isExportAll: exportData.isExportAll,
    steps: exportData.steps,
    data_mask: exportData.data_mask,
    formData: exportData.form,
    exportLoading: loading.effects['exportData/submitStepForm'],
  };
};

export default connect(mapStateToProps)(Step5);
