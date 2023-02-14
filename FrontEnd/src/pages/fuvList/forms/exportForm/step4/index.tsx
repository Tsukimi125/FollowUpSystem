/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-02-02 20:33:39
 */
/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-01-29 19:02:29
 */
import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Button, Alert, Divider, Switch } from 'antd';
import { Dispatch, connect } from 'umi';
import { StateType } from '../model';
import SelectFormItem from '../utils/SelectFormItem';
import { exportDataOptions } from '../exportData';
import { StateType as FuvStateType } from '@/pages/fuvList/model';

interface Step4FormProps {
  steps: number[];
  current: number;
  formData: StateType['form'];
  dispatch: Dispatch;
  max_amount: number;
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

const Step4: React.FC<Step4FormProps> = (props) => {
  const { steps, current, dispatch, formData, max_amount, all_pids, isExportAll } = props;
  const [form] = Form.useForm();
  const { validateFields, getFieldsValue } = form;
  // 是否导出治疗资料
  const [isExport, setIsExport] = useState(false);

  useEffect(() => {
    // console.log('formData', formData);
    if (formData.follInfo) {
      const trementInfoFormData: any = {};
      // 设置为选择该表单
      setIsExport(true);
      // 设置表单信息
      trementInfoFormData[formData.follInfo.table] = formData.follInfo.column;

      if (formData.follInfoNum !== undefined) {
        trementInfoFormData.follInfoNum = formData.follInfoNum;
      } else {
        trementInfoFormData.follInfoNum = 1;
      }

      form.setFieldsValue({ ...trementInfoFormData });
    } else {
      // 设置为未选该表单
      setIsExport(false);
    }
  }, [formData]);

  const save = (values: any, move: number) => {
    // console.log('save:values', values);
    if (isExport) {
      const res_values: any = {};
      // 按照顺序遍历重新排列,并改变values格式
      // for (const item of ['FollInfo']) {
      //   if (values[item]) {
      //     res_values.push({ table: item, column: values[item] });
      //   }
      // }

      if (values.FollInfo) {
        res_values.table = 'FollInfo';
        res_values.column = values.FollInfo;
      }

      // 存储表单信息
      dispatch({
        type: 'exportData/saveFormData',
        payload: {
          follInfo: res_values,
          follInfoNum: values.follInfoNum !== undefined ? values.follInfoNum : 1,
        },
      });
    } else {
      // 存储表单信息
      dispatch({
        type: 'exportData/saveFormData',
        payload: { follInfo: undefined, follInfoNum: 1 },
      });
    }

    // 获取当前位置
    let index = 0;
    for (const _index in steps) {
      if (steps[_index] === current) {
        index = parseInt(_index, 10);
      }
    }
    // 移动位置
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
        <Button onClick={onPrev} style={{ marginRight: 8 }}>
          上一步
        </Button>
        <Button type="primary" onClick={onValidateForm}>
          下一步
        </Button>
      </div>

      <Divider orientation="left">随访信息</Divider>

      <Form.Item label="是否导出随访信息">
        <Switch
          checked={isExport}
          onChange={(e) => {
            setIsExport(e);
            if (e === true) {
              form.setFieldsValue({ follInfoNum: 1 });
              dispatch({
                type: 'exportData/fetchMaxAmount',
                payload: { pids: isExportAll ? all_pids : formData.pids },
              });
            }
          }}
        />
      </Form.Item>

      {isExport ? (
        <>
          <Form.Item label="导出随访信息条数">
            <Form.Item
              noStyle
              name="follInfoNum"
              rules={[
                {
                  required: true,
                  message: '请输入(将优先导出最近的随访信息)',
                },
              ]}
            >
              <InputNumber
                style={{ width: 320, marginBottom: 8 }}
                placeholder="请输入"
                precision={0}
                min={1}
                max={max_amount || 999}
              />
            </Form.Item>

            <Alert
              message="将优先导出最近的随访信息"
              type="info"
              showIcon
              style={{ marginBottom: '8px', width: 320 }}
            />
          </Form.Item>

          <SelectFormItem {...exportDataOptions.FollInfo} formIns={form} isRequired />
        </>
      ) : null}
    </Form>
  );
};

const mapStateToProps = ({
  exportData,
  loading,
  fuvList,
}: {
  exportData: StateType;
  loading: { effects: { [key: string]: boolean } };
  fuvList: FuvStateType;
}) => {
  return {
    steps: exportData.steps,
    formData: exportData.form,
    current: exportData.current,
    max_amount: exportData.max_amount,
    isExportAll: exportData.isExportAll,
    all_pids: fuvList.all_pids,
  };
};

export default connect(mapStateToProps)(Step4);
