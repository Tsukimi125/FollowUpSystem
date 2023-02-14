/* eslint-disable no-plusplus */
/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-01-29 19:02:29
 */
import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Switch,
  Select,
  Divider,
  Button,
  Collapse,
  TreeSelect,
  Alert,
} from 'antd';
import { Dispatch, connect } from 'umi';
import { StateType } from '../model';
import { StateType as FuvStateType } from '../../../model';
import SelectFormItem from '../utils/SelectFormItem';
import { exportDataOptions } from '../exportData';
import { AllSelectedForm, AllSelectedFormTreeNodes } from './AllSelectedForm';

const { Panel } = Collapse;

interface Step2FormProps {
  steps: number[];
  current: number;
  formData: StateType['form'];
  max_treIndex: number;
  dispatch: Dispatch;
  isExportAll: boolean;
  all_pids: number[];
}

const ModalFormItemLayout = {
  labelCol: { xl: { span: 8 }, md: { span: 10 } },
  wrapperCol: { xl: { span: 16 }, md: { span: 14 } },
};

const tailLayout = {
  wrapperCol: { xl: { span: 6, offset: 8 }, md: { span: 6, offset: 10 } },
};

const Step3: React.FC<Step2FormProps> = (props) => {
  const { steps, current, dispatch, formData, max_treIndex, isExportAll, all_pids } = props;
  const [form] = Form.useForm();
  const { validateFields, getFieldsValue } = form;
  // 是否导出治疗资料
  const [isExport, setIsExport] = useState(false);
  // 当前的展开
  const [expandList1, setExpandList1] = useState<string[]>([]);
  const [expandList2, setExpandList2] = useState<string[]>([]);
  // 当前选择的表单
  const [selectedForm, setSelectedForm] = useState<string[]>([]);

  /**
   * @description:  控制展开
   * @Param:
   * @param {string} list
   */
  const expandCollapse = (list: string[]) => {
    if (list.length > 0) {
      setExpandList1(['1']);
    } else {
      setExpandList1([]);
    }
    const _list = [];
    // 展开实验室检查
    for (const item of AllSelectedForm.slice(8, 17)) {
      if (list.indexOf(item) !== -1) {
        _list.push('2');
        break;
      }
    }
    // 展开其他检查
    for (const item of AllSelectedForm.slice(17)) {
      if (list.indexOf(item) !== -1) {
        _list.push('3');
        break;
      }
    }
    setExpandList2(_list);
  };

  useEffect(() => {
    // console.log('formData', formData);
    if (formData.trementInfo) {
      const _selectedForm = [];
      const trementInfoFormData: any = {};
      // 设置为选择该表单
      setIsExport(true);
      // 遍历 formData.trementInfo 找出已经选择的字段
      for (const item of formData.trementInfo) {
        _selectedForm.push(item.table);
        // 设置表单信息
        trementInfoFormData[item.table] = item.column;
      }
      // 配置minTreNum,maxTreNum
      const { treNums } = formData;
      let minTreNum = 1;
      let maxTreNum = 1;
      if (treNums.length > 1) {
        // eslint-disable-next-line prefer-destructuring
        minTreNum = treNums[1];
        maxTreNum = treNums[treNums.length - 1];
      }
      trementInfoFormData.minTreNum = minTreNum;
      trementInfoFormData.maxTreNum = maxTreNum;

      // 展开已选择的表单
      setSelectedForm(_selectedForm);
      expandCollapse(_selectedForm);

      // 设置表单
      form.setFieldsValue({ ...trementInfoFormData });
    } else {
      // 设置为未选该表单
      setIsExport(false);
    }
  }, [formData]);

  const save = (values: any, move: number) => {
    // console.log('save:values', values);
    // 如果没有选择表单 直接返回
    if (isExport && selectedForm.length === 0) return;
    // 如果选择导出基线资料
    if (isExport) {
      const res_values: any = [];
      // 按照顺序遍历重新排列,并改变values格式
      for (const item of AllSelectedForm) {
        if (values[item]) {
          res_values.push({ table: item, column: values[item] });
        }
      }
      // 配置 treNums
      const treNums = [];
      // 如果导出基线
      if (formData.baseLine) {
        treNums.push(0);
      }
      if (values.minTreNum && values.maxTreNum) {
        for (let i = values.minTreNum; i <= values.maxTreNum; i++) {
          treNums.push(i);
        }
      }
      // 保存基线资料
      dispatch({
        type: 'exportData/saveFormData',
        payload: { trementInfo: res_values, treNums },
      });
    } else {
      // 删除form表单的基线资料
      dispatch({
        type: 'exportData/saveFormData',
        payload: { trementInfo: undefined, treNums: [0] },
      });
    }

    // 获取当前位置
    let index = 0;
    // eslint-disable-next-line @typescript-eslint/no-for-in-array
    for (const _index in steps) {
      if (steps[_index] === current) {
        index = parseInt(_index, 10);
      }
    }
    dispatch({
      type: 'exportData/save',
      payload: { current: steps[index + move] },
    });
  };

  const onPrev = () => {
    const values = getFieldsValue();
    save(values, -1);
  };

  const onValidateForm = async () => {
    const values = await validateFields();
    save(values, 1);
  };

  return (
    <Form form={form} {...ModalFormItemLayout} labelAlign="left">
      <div style={{ textAlign: 'center' }}>
        <Button
          onClick={onPrev}
          style={{ marginRight: 8 }}
          disabled={isExport && selectedForm.length === 0}
        >
          上一步
        </Button>
        <Button
          type="primary"
          onClick={onValidateForm}
          disabled={isExport && selectedForm.length === 0}
        >
          下一步
        </Button>
      </div>

      <Divider orientation="left">治疗信息</Divider>

      <Form.Item label="是否导出治疗信息">
        <Switch
          checked={isExport}
          onChange={(e) => {
            setIsExport(e);
            if (e === true) {
              form.setFieldsValue({ minTreNum: 1, maxTreNum: 1 });
              // console.log('formdata----',formData)
              dispatch({
                type: 'exportData/fetchMaxTreIndex',
                payload: { pids: isExportAll ? all_pids : formData.pids },
              });
            }
          }}
        />
      </Form.Item>

      {isExport ? (
        <>
          <Form.Item label="导出治疗记录数(最小~最大)">
            <Input.Group compact>
              <Form.Item
                name="minTreNum"
                noStyle
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={Math.max(1, max_treIndex - 1)}
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
              <Form.Item
                name="maxTreNum"
                noStyle
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
              >
                <InputNumber
                  className="site-input-right"
                  style={{ width: 100, textAlign: 'center' }}
                  placeholder="最大"
                  precision={0}
                  min={1}
                  max={max_treIndex}
                  onChange={(e) => {
                    const minTreNum = form.getFieldValue('minTreNum');
                    if (typeof e === 'number')
                      if (e < minTreNum) form.setFieldsValue({ maxTreNum: minTreNum });
                  }}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item label="需要导出的表单(多选)">
            <TreeSelect
              treeData={AllSelectedFormTreeNodes}
              maxTagCount="responsive"
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              value={selectedForm}
              treeCheckable
              showCheckedStrategy="SHOW_CHILD"
              onChange={(e) => {
                setSelectedForm(e);
                // 展开基本信息
                expandCollapse(e);
              }}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: '4px 0' }} />
                  <Button
                    type="link"
                    style={{ width: '100%' }}
                    onClick={() => {
                      setSelectedForm(AllSelectedForm);
                      // 展开全部
                      expandCollapse(AllSelectedForm);
                    }}
                  >
                    全选
                  </Button>
                </div>
              )}
              placeholder="请选择需要导出的内容"
              allowClear
              multiple
              // treeDefaultExpandAll
            />
            {selectedForm.length !== 0 ? (
              <Alert
                message="↑ 请在多选框中选择需要导出的表单"
                type="info"
                showIcon
                style={{ marginTop: '8px' }}
              />
            ) : (
              <Alert
                message="↑ 请至少选择一个要导出的表单"
                type="error"
                showIcon
                style={{ marginTop: '8px' }}
              />
            )}
          </Form.Item>

          <Collapse
            defaultActiveKey={[]}
            style={{ marginBottom: 24 }}
            onChange={(e: any) => {
              setExpandList1(e);
            }}
            activeKey={expandList1}
          >
            <Panel header="治疗信息" key={1} forceRender>
              {AllSelectedForm.slice(0, 4).map((exportFormName) => {
                if (selectedForm.indexOf(exportFormName) !== -1) {
                  return (
                    <SelectFormItem
                      {...exportDataOptions[exportFormName]}
                      formIns={form}
                      key={exportDataOptions[exportFormName].name}
                    />
                  );
                }
                return null;
              })}
              <Collapse
                defaultActiveKey={[]}
                style={{ marginBottom: 24 }}
                onChange={(e: any) => {
                  setExpandList2(e);
                }}
                activeKey={expandList2}
              >
                <Panel header="实验室检查" key={2} forceRender>
                  {AllSelectedForm.slice(4, 13).map((exportFormName) => {
                    if (selectedForm.indexOf(exportFormName) !== -1) {
                      return (
                        <SelectFormItem
                          {...exportDataOptions[exportFormName]}
                          formIns={form}
                          key={exportDataOptions[exportFormName].name}
                        />
                      );
                    }
                    return null;
                  })}
                </Panel>
                <Panel header="其他检查" key={3} forceRender>
                  {AllSelectedForm.slice(13, 16).map((exportFormName) => {
                    if (selectedForm.indexOf(exportFormName) !== -1) {
                      return (
                        <SelectFormItem
                          {...exportDataOptions[exportFormName]}
                          formIns={form}
                          key={exportDataOptions[exportFormName].name}
                        />
                      );
                    }
                    return null;
                  })}
                </Panel>
              </Collapse>
              {AllSelectedForm.slice(16).map((exportFormName) => {
                if (selectedForm.indexOf(exportFormName) !== -1) {
                  return (
                    <SelectFormItem
                      {...exportDataOptions[exportFormName]}
                      formIns={form}
                      key={exportDataOptions[exportFormName].name}
                    />
                  );
                }
                return null;
              })}
            </Panel>
          </Collapse>
        </>
      ) : null}
    </Form>
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
    max_treIndex: exportData.max_treIndex,
    steps: exportData.steps,
    formData: exportData.form,
    current: exportData.current,
  };
};

export default connect(mapStateToProps)(Step3);
