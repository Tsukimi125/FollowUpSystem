/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-01-29 15:42:57
 */

import React, { useEffect } from 'react';
import { Button, Divider, Form, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';

const SelectFormItem: React.FC<{
  label: string;
  name: string;
  formIns: FormInstance;
  options: any;
  isRequired?: boolean; // 默认为 false
}> = (props) => {
  const { label, name, formIns, options, isRequired } = props;

  useEffect(() => {
    // console.log('init SelectFormItem...', formIns.getFieldValue(name));
    // 如果form中不存在当前属性，则全选
    if (formIns.getFieldValue(name) === undefined) {
      const all_list: string[] = [];
      for (const item of options) {
        all_list.push(item.value);
      }
      formIns.setFieldsValue({ [name]: all_list });
    }
  }, []);

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: isRequired, message: '请选择需要导出的内容' }]}
    >
      <Select
        mode="multiple"
        placeholder="请选择需要导出的数据"
        options={options}
        // maxTagCount="responsive"
        allowClear
        onChange={(e: any) => {
          // 重新排序
          const new_list: string[] = [];
          for (const item of options) {
            if (e.indexOf(item.value) !== -1) {
              new_list.push(item.value);
            }
          }
          formIns.setFieldsValue({ [name]: new_list });
        }}
        dropdownRender={(menu) => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <Button
              type="link"
              style={{ width: '100%' }}
              onClick={() => {
                const all_list: string[] = [];
                for (const item of options) {
                  all_list.push(item.value);
                }
                formIns.setFieldsValue({ [name]: all_list });
              }}
            >
              全选
            </Button>
          </div>
        )}
      />
    </Form.Item>
  );
};

// 设置默认值
SelectFormItem.defaultProps = {
  isRequired: false,
};

export default SelectFormItem;
