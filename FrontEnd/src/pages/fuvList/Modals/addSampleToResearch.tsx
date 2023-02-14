import { connect } from 'umi';
import React, { useEffect, useState } from 'react';
import { Input, message, Modal, Form, Select } from 'antd';
import { AddResearch } from '@/pages/fuvList/service';
import { AddResearchDataType } from '@/pages/fuvList/data';
import { PlusOutlined } from '@ant-design/icons';
import { StateType } from '@/pages/fuvList/model';
import { StateType as ExportStateType } from '@/pages/fuvList/forms/exportForm/model';

const { Option } = Select;
const ModalFormItemLayout = {
  labelCol: { xl: { span: 8 }, md: { span: 10 } },
  wrapperCol: { xl: { span: 16 }, md: { span: 14 } },
};

const AddSampleToResearchModal = (props) => {
  const {
    addResearchSampleModalVisable,
    setAddResearchSampleModalVisable,
    dispatch,
    AllResearch,
    // formData,
    patientIds,
    refreshSampleList,
  } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [curResearchValue, setCurrResearchValue] = useState(0);

  const handleOk = (e: any) => {
    // console.log('e', e);
    // console.log('新增研究的values', values);
    if (curResearchValue <= 0) {
      message.warning('请选择研究！');
      return;
    }
    if (patientIds.length === 0) {
      message.warning('请先选择样本！');
    } else {
      setConfirmLoading(true);
      dispatch({
        type: 'fuvList/addPatientsToResearch',
        payload: { rid: curResearchValue, pids: patientIds },
      }).then(() => {
        refreshSampleList();
        dispatch({
          type: 'exportData/saveFormData',
          payload: { pids: [] },
        });
        setConfirmLoading(false);
        setAddResearchSampleModalVisable(false);
      });
    }
  };

  return (
    <Modal
      okText={'导入'}
      title="导入到研究"
      visible={addResearchSampleModalVisable}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => {
        setAddResearchSampleModalVisable(false);
      }}
    >
      <Form {...ModalFormItemLayout} labelAlign="left">
        <Form.Item label="研究名称" name="name" required>
          <Select
            // value={curResearchValue}
            placeholder={'请选择研究'}
            onChange={(e: any) => {
              setCurrResearchValue(e);
            }}
            dropdownRender={(menu) => <div>{menu}</div>}
          >
            {AllResearch?.map((item) => {
              return (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = ({
  loading,
  fuvList,
  exportData,
}: {
  loading: { effects: Record<string, boolean> };
  fuvList: StateType;
  exportData: ExportStateType;
}) => {
  return {
    // FuvListLoading: loading.effects['fuvList/fetchFuvList'],
    AllResearch: fuvList.allResearch,
    // formData: exportData.form,
  };
};

export default connect(mapStateToProps)(AddSampleToResearchModal);
