import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Col, Tabs, InputNumber, Radio, Tooltip } from 'antd';
import type { FormItemType } from './data';
import styles from './style.less';
import { connect } from 'umi';

interface FormWithItemsProps {
  Items: FormItemType[];
  onFinish: any;
  isSubmit: boolean;
  formInstance: any;
  formLayout?: any;
}

const { TextArea } = Input;

const FormWithItems: React.FC<FormWithItemsProps> = (props) => {
  const { Items, onFinish, isSubmit, formInstance, formLayout } = props;
  // console.log('here is formLayout',formLayout);

  const formItemLayout =
    formLayout !== undefined
      ? formLayout
      : {
          labelCol: { xl: { span: 3 }, md: { span: 3 } },
          wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
        };
  const formItemComponent = (item: FormItemType) => {
    switch (item.componentType) {
      case 'string':
        return <TextArea className={styles.form_input} />;
      case 'number':
        return (
          <InputNumber<string>
            className={styles.form_input}
            addonAfter={item.unit}
            step="0.001"
            min="0"
          />
        );
      default:
        return <></>;
    }
  };

  const formSubmit = (values: any) => {
    // console.log('here is values,', values);

    onFinish(values);
  };

  return (
    <>
      <Form
        disabled={isSubmit}
        {...formItemLayout}
        labelAlign="left"
        onFinish={formSubmit}
        form={formInstance}
        // labelWrap={true}
      >
        {Items.map((item) => (
          <Form.Item name={item.name} label={item.label} key={item.name} tooltip={item.remarks}>
            {item.component ? item.component : formItemComponent(item)}
          </Form.Item>
        ))}
        <Col offset={5}>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Col>
      </Form>
    </>
  );
};

const mapStateToProps = ({ base }: { base: any }) => {
  return {
    isSubmit: !!base.baseInfo?.isSubmit,
  };
};

export default connect(mapStateToProps)(FormWithItems);
