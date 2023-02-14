/* eslint-disable guard-for-in */
/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-01-29 17:29:46
 */
import React, { useEffect, useState } from 'react';
import { Form, Switch, Divider, Button, Collapse, TreeSelect, Alert } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../model';
import SelectFormItem from '../utils/SelectFormItem';
import { exportDataOptions } from '../exportData';
import { AllSelectedForm, AllSelectedFormTreeNodes } from './AllSelectedForm';

const { Panel } = Collapse;

interface Step2FormProps {
  steps: number[];
  current: number;
  formData: StateType['form'];
  dispatch: Dispatch;
}

const ModalFormItemLayout = {
  labelCol: { xl: { span: 8 }, md: { span: 10 } },
  wrapperCol: { xl: { span: 16 }, md: { span: 14 } },
};

// const tailLayout = {
//   wrapperCol: { xl: { span: 6, offset: 8 }, md: { span: 6, offset: 10 } },
// };

const Step2: React.FC<Step2FormProps> = (props) => {
  const { steps, current, dispatch, formData } = props;
  const [form] = Form.useForm();
  const { validateFields, getFieldsValue } = form;
  // 是否导出基线资料
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
    for (const item of AllSelectedForm.slice(5, 14)) {
      if (list.indexOf(item) !== -1) {
        _list.push('2');
        break;
      }
    }
    // 展开其他检查
    for (const item of AllSelectedForm.slice(5, 14)) {
      if (list.indexOf(item) !== -1) {
        _list.push('3');
        break;
      }
    }
    setExpandList2(_list);
  };

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
      // console.log('res_values', res_values);

      // 保存基线资料
      dispatch({
        type: 'exportData/saveFormData',
        payload: { baseLine: res_values },
      });
    } else {
      // 删除form表单的基线资料
      dispatch({
        type: 'exportData/saveFormData',
        payload: { baseLine: undefined },
      });
    }

    // 获取当前位置
    let index = 0;
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

  useEffect(() => {
    // console.log('formData', formData);
    if (formData.baseLine) {
      const _selectedForm = [];
      const baselineFormData: any = {};
      // 设置为选择该表单
      setIsExport(true);
      // 遍历 formData.baseLine 找出已经选择的字段
      for (const item of formData.baseLine) {
        _selectedForm.push(item.table);
        // 设置表单信息
        baselineFormData[item.table] = item.column;
      }
      setSelectedForm(_selectedForm);
      // 展开已选择的表单
      expandCollapse(_selectedForm);
      form.setFieldsValue({ ...baselineFormData });
    } else {
      // 设置为未选该表单
      setIsExport(false);
    }
  }, [formData]);

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

      <Divider orientation="left">基线资料</Divider>

      <Form.Item label="是否导出基线资料">
        <Switch
          checked={isExport}
          onChange={(e) => {
            setIsExport(e);
          }}
        />
      </Form.Item>

      {isExport ? (
        <>
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
            style={{ marginBottom: 24 }}
            onChange={(e: any) => {
              setExpandList1(e);
            }}
            activeKey={expandList1}
          >
            <Panel header="基线资料" key={1} forceRender>
              {AllSelectedForm.slice(0, 3).map((exportFormName) => {
                // 如果存在
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
                style={{ marginBottom: 24 }}
                onChange={(e: any) => {
                  setExpandList2(e);
                }}
                activeKey={expandList2}
              >
                <Panel header="实验室检查" key={2} forceRender>
                  {AllSelectedForm.slice(3, 12).map((exportFormName) => {
                    // 如果存在
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
                  {AllSelectedForm.slice(12, 15).map((exportFormName) => {
                    // 如果存在
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

              {AllSelectedForm.slice(15).map((exportFormName) => {
                // 如果存在
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
  loading,
}: {
  exportData: StateType;
  loading: { effects: Record<string, boolean> };
}) => {
  return {
    steps: exportData.steps,
    formData: exportData.form,
    current: exportData.current,
  };
};

export default connect(mapStateToProps)(Step2);
