import { Button, Modal, Popconfirm, Space, Table } from 'antd';
import React, { useState } from 'react';
import AddResearchModal from '@/pages/fuvList/Modals/addResearch';
import { StateType } from '@/pages/fuvList/model';
import { StateType as ExportStateType } from '@/pages/fuvList/forms/exportForm/model';
import { connect } from 'umi';

const EditResearchModal = (props) => {
  const {
    editResearchModalVisable,
    setEditResearchModalVisable,
    AllResearch,
    allResearchLoading,
    dispatch,
  } = props;
  const [addResearchModalVisable, setAddResearchModalVisable] = useState(false);
  const columns = [
    {
      title: '研究名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '研究描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            key="delete"
            title="确认要删除该研究及其所有病人吗?（请慎重操作）"
            placement="topRight"
            onConfirm={() => {
              dispatch({
                type: 'fuvList/delResearch',
                payload: { rid: record.id },
              }).then(() => {});
              // dispatch({
              //   type: 'fuvList/deleteFuv',
              //   payload: { body: { ids: [record.id] } },
              // }).then(() => {
              //   refreshSampleListBySearch(pageInfo.current, pageInfo.pageSize, {
              //     [curSearchValue.name]: curSearchValue.value ? curSearchValue.value : undefined,
              //     ...lastfilterValues,
              //   });
              // });
            }}
            okText="是"
            cancelText="否"
          >
            <a className="custom_toolbar_buttom_danger" style={{ marginLeft: '5px' }}>
              删除
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleAdd = () => {
    setAddResearchModalVisable(true);
  };
  return (
    <Modal
      title={'研究管理'}
      footer={null}
      visible={editResearchModalVisable}
      onCancel={() => setEditResearchModalVisable(false)}
    >
      <div>
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          增加研究
        </Button>
        <Table loading={allResearchLoading} columns={columns} dataSource={AllResearch} />
        <AddResearchModal
          addResearchModalVisable={addResearchModalVisable}
          setAddResearchModalVisable={setAddResearchModalVisable}
        />
      </div>
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
    allResearchLoading: loading.effects['fuvList/fetchAllResearch'],
    AllResearch: fuvList.allResearch,
    // formData: exportData.form,
  };
};

export default connect(mapStateToProps)(EditResearchModal);
