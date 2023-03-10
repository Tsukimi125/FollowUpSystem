import { getBirthDay } from '@/utils/util';
import {
  Badge,
  Button,
  Col,
  Divider,
  Form,
  Input,
  List,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { connect, history } from 'umi';
import type { Dispatch } from 'umi';
import style from './index.less';
import type { AddSampleDataType, FuvListItemDataType } from '../data';
import type { StateType } from '../model';
import { AddAccount, AddFuv } from '../service';
import type { ResearchCentersDataType, UserAuthsDataType } from '@/models/data';
import type { StateType as GlobalStateType } from '@/models/global';
import type { StateType as ExportStateType } from '../../fuvList/forms/exportForm/model';
import { ExportOutlined, FullscreenOutlined, SettingOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { DelDuplicateNodes } from '@/components/patDiaTree/util';
import ProTable from '@ant-design/pro-table';
import { useForm } from 'antd/es/form/Form';

interface ResearchModalProps {
  userAuths: UserAuthsDataType;
  researchID: number;
  researchName: string;
  researchModalVisable: boolean;
  setResearchModalVisable: (value: any) => void;
  PatientsInResearch: any[];
  formData: ExportStateType['form'];
  researchCenters: ResearchCentersDataType[];
  dispatch: Dispatch;
  researchDataLoading: any;
  patientsTotalInResearch: number;
  allPatientIds: any[];
}

// const ModalFormItemLayout = {
//   labelCol: { xl: { span: 8 }, md: { span: 10 } },
//   wrapperCol: { xl: { span: 16 }, md: { span: 14 } },
// };

const ResearchModal: React.FC<ResearchModalProps> = (props) => {
  const {
    researchModalVisable,
    setResearchModalVisable,
    researchID,
    researchName,
    PatientsInResearch,
    userAuths,
    formData,
    researchCenters,
    dispatch,
    researchDataLoading,
    patientsTotalInResearch,
    allPatientIds,
  } = props;
  // console.log('allPatientIds', allPatientIds);

  // useEffect(() => {
  //   if (PatientsInResearch === null) {
  //     setResearchModalVisable(false);
  //   }
  // }, [PatientsInResearch]);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  // date????????????ProTable????????????????????????request
  const [date, setDate] = useState<number>(0);
  const rowSelection = {
    selectedRowKeys,
    // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
    onChange: (selectRowKeys: any) => {
      // console.log('selectRowKeys', selectRowKeys);
      setSelectedRowKeys(selectRowKeys);
    },
    preserveSelectedRowKeys: true,
  };
  const actionRef = useRef<ActionType>();

  type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

  const columns: ProColumns<FuvListItemDataType>[] = [
    {
      title: '??????',
      fixed: 'left',
      width: 80,
      align: 'center',
      dataIndex: 'patNumber',
      responsive: ['sm'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text: any) => {
        return (
          <Tooltip placement="top" title={text}>
            <span className={style.custom_table_ellipsis}>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '??????',
      align: 'center',
      // shouldCellUpdate: (record, prevRecord) => {
      //   return record !== prevRecord;
      // },
      dataIndex: 'research_center_id',
      responsive: ['sm'] as Breakpoint[],
      render: (text: any) => {
        let _text = '';
        if (researchCenters) {
          for (const item of researchCenters) {
            if (item.id === text) {
              _text = item.name;
            }
          }
        }
        return (
          <Tooltip placement="top" title={_text}>
            <span className={style.custom_table_ellipsis}>{_text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '?????????/?????????',
      // width: 120,
      align: 'center',
      dataIndex: 'hospitalNumber',
      responsive: ['sm'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text: any) => {
        return (
          <Tooltip placement="top" title={text}>
            <span className={style.custom_table_ellipsis}>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '??????',
      width: 100,
      align: 'center',
      dataIndex: 'patientName',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text: any) => {
        return (
          <Tooltip placement="top" title={text}>
            <span className={style.custom_table_ellipsis}>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '????????????',
      // width: 80,
      align: 'center',
      dataIndex: 'idNumber',
      responsive: ['md'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text: any) => {
        return (
          <Tooltip placement="top" title={text}>
            <span className={style.custom_table_ellipsis}>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '????????????',
      // width: 80,
      // ellipsis: true,
      align: 'center',
      dataIndex: 'phoneNumber',
      responsive: ['md'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text: any) => {
        return (
          <Tooltip placement="top" title={text}>
            <span className={style.custom_table_ellipsis}>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '??????',
      width: 60,
      // ellipsis: true,
      align: 'center',
      dataIndex: 'gender',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      valueEnum: {
        1: { text: '???' },
        0: { text: '???' },
      },
    },
    {
      title: '??????',
      width: 60,
      // ellipsis: true,
      align: 'center',
      responsive: ['md'] as Breakpoint[],
      dataIndex: 'age',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
    },
    {
      title: '????????????',
      // width: 80,
      // ellipsis: true,
      align: 'center',
      dataIndex: 'patDia',
      responsive: ['lg'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text, record) => {
        // // console.log('??????...', record.patDia);
        let _text = '-';
        if (record.patDia) {
          _text = DelDuplicateNodes(record.patDia.radio ? record.patDia.radio.toString() : '');
          if (record.patDia.other) {
            if (_text === '-' || _text === '') {
              _text = `??????-${record.patDia.other}`;
            } else {
              _text += `,??????-${record.patDia.other}`;
            }
          }
        }

        return (
          <Tooltip placement="top" title={_text}>
            <span className={style.custom_table_ellipsis}>{_text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '????????????',
      width: 80,
      // ellipsis: true,
      align: 'center',
      responsive: ['md'] as Breakpoint[],
      dataIndex: 'livSta',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
    },
    {
      title: '??????',
      fixed: 'right',
      align: 'center',
      valueType: 'option',
      width: 80,
      render: (text, record) => (
        <Space size="small">
          <Popconfirm
            key="delete"
            title="?????????????????????????????????????"
            placement="topRight"
            onConfirm={() => {
              dispatch({
                type: 'fuvList/delPatientsFromResearch',
                payload: { pids: [record.id], rid: researchID },
              }).then(() => {
                setSelectedRowKeys([]);
                actionRef.current?.reload();
                // setDate(Date.now());
                // refreshSampleListBySearch(pageInfo.current, pageInfo.pageSize, {
                //   [curSearchValue.name]: curSearchValue.value ? curSearchValue.value : undefined,
                //   ...lastfilterValues,
                // });
              });
            }}
            okText="???"
            cancelText="???"
          >
            <a className="custom_toolbar_buttom_danger">??????</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (researchModalVisable) {
      // ??????????????????
      // dispatch({
      //   type: 'fuvList/fetchPatientsInResearch',
      //   payload: { rid: researchID },
      // });
      // console.log('PatientsInResearch', PatientsInResearch);
    }
  }, [researchModalVisable]);

  return (
    <Modal
      // style={{width:'900px'}}
      width={1500}
      centered
      okText={'??????'}
      title={'?????? - '.concat(researchName)}
      footer={[
        <a
          className="custom_toolbar_buttom"
          onClick={() => {
            setResearchModalVisable(false);
          }}
        >
          ??????
        </a>,
        <Popconfirm
          key="delete"
          title="???????????????????????????????????????????????????????????????????"
          placement="topRight"
          onConfirm={() => {
            dispatch({
              type: 'fuvList/delResearch',
              payload: { rid: researchID },
            }).then(() => {
              setSelectedRowKeys([]);
              setResearchModalVisable(false);
            });
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
          okText="???"
          cancelText="???"
        >
          <a className="custom_toolbar_buttom_danger" style={{ marginLeft: '5px' }}>
            ??????
          </a>
        </Popconfirm>,
      ]}
      visible={researchModalVisable}
      // onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => {
        setResearchModalVisable(false);
      }}
    >
      <Badge
        style={{ display: userAuths.only_specimenInfo ? 'none' : '' }}
        count={formData?.pids.length}
        overflowCount={999}
        offset={[-20, 4]}
      >
        <Button
          type="primary"
          onClick={() => {
            if (formData.pids.length === 0) {
              message.warning('?????????????????????');
            } else {
              dispatch({
                type: 'fuvList/addPatientsToResearch',
                payload: { rid: researchID, pids: formData.pids },
              }).then(() => {
                // ????????????
                // dispatch({
                //   type: 'fuvList/fetchPatientsInResearch',
                //   payload: { rid: researchID },
                // });
                // setDate(Date.now());
                actionRef.current?.reload();
                dispatch({
                  type: 'exportData/saveFormData',
                  payload: { pids: [] },
                });
              });
            }
          }}
          style={{
            marginRight: '1.5rem',
            marginBottom: '1rem',
            display: userAuths.only_specimenInfo ? 'none' : '',
          }}
          disabled={!userAuths.can_export}
        >
          <Tooltip title={'????????????????????????????????????'}>
            <ExportOutlined /> ????????????
          </Tooltip>
        </Button>
      </Badge>
      <ProTable
        scroll={{ x: 1300, y: 500 }}
        // loading={userAuths.only_specimenInfo?SpecimenListLoading:FuvListLoading}
        // loading={FuvListLoading}
        loading={researchDataLoading}
        columns={columns}
        search={false}
        actionRef={actionRef}
        pagination={{ pageSize: 10 }}
        // dataSource={userAuths.only_specimenInfo?SpecimenList:FuvList}
        // dataSource={PatientsInResearch}
        params={{ researchID, date }}
        request={async (params, sort, filter) => {
          // console.log(sort, filter);
          // console.log('params', params);
          // if (!params.researchModalVisable) {
          //   return null;
          // }
          return dispatch({
            type: 'fuvList/fetchPatientsInResearch',
            payload: { rid: researchID, params: { limit: params.pageSize, page: params.current } },
          }).then((res: any) => {
            // console.log('res', res);
            if (!res) {
              return {
                data: [],
                success: true,
                total: 0,
              };
            }

            if (res.all_pids.length > 0 && res.data.length <= 0) {
              actionRef.current?.reloadAndRest();
              return null;
            }
            //   return dispatch({
            //     type: 'fuvList/fetchPatientsInResearch',
            //       payload: { rid: researchID, params: { limit: params.pageSize, page: 1 } },
            //   })
            // }
            return {
              data: res.data,
              success: true,
              total: res.total,
            };
          });
        }}
        // scroll={{ x: 1080 }}
        tableLayout="fixed"
        className={style.custom_modal_table}
        bordered
        rowKey="id"
        options={{
          reload: () => {},
          fullScreen: true,
          density: false, // ????????????
          setting: true,
        }}
        rowSelection={rowSelection}
        // rowSelection={
        //   userAuths.only_specimenInfo
        //     ? undefined
        //     : {
        //         onChange: listenAllChange,
        //         columnWidth: 40,
        //         selectedRowKeys: curSelectedIds,
        //         onSelect: listenRowSelect,
        //         onSelectAll: listenSelectAll,
        //         onSelectMultiple: (e) => {
        //           // console.log('onSelectMultiple', e);
        //         },
        //       }
        // }
        // tableAlertRender={({ selectedRowKeys, selectedRows }) => {
        //   return `111?????????????????? ${selectedRowKeys.length} ??? `;
        // }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <Popconfirm
                key="deletePatient"
                title="???????????????????????????????????????"
                placement="topRight"
                onConfirm={() => {
                  dispatch({
                    type: 'fuvList/delPatientsFromResearch',
                    payload: { pids: selectedRowKeys, rid: researchID },
                  }).then(() => {
                    setSelectedRowKeys([]);
                    // setDate(Date.now());
                    actionRef.current?.reload();
                    // refreshSampleListBySearch(pageInfo.current, pageInfo.pageSize, {
                    //   [curSearchValue.name]: curSearchValue.value ? curSearchValue.value : undefined,
                    //   ...lastfilterValues,
                    // });
                  });
                }}
                okText="???"
                cancelText="???"
              >
                <a style={{ marginLeft: '5px' }}>????????????</a>
              </Popconfirm>
              <a onClick={() => setSelectedRowKeys([])}>????????????</a>
            </Space>
          );
        }}
        toolBarRender={() => [
          <>
            <a onClick={() => setSelectedRowKeys(allPatientIds)}>??????</a>
            <span key="total" className="invisible-sm">
              ???{patientsTotalInResearch}?????????
            </span>
          </>,
        ]}
        // tableAlertOptionRender={(table_props: any) => {
        //   const { onCleanSelected, selectedRowKeys } = table_props;
        //   return (
        //     <Space size="large" style={{ fontWeight: 'bold', fontSize: '14px' }}>
        //       <a
        //         onClick={() => {
        //           const ids = formData.pids;
        //           // console.log('???????????????????????????formData.pids', ids);
        //           // console.log('???????????????????????????curSelectedIds', curSelectedIds);
        //           for (const tmpId of curSelectedIds) {
        //             const delIdx = ids.indexOf(tmpId);
        //             ids.splice(delIdx, 1);
        //           }
        //           // console.log('???????????????????????????payload ids', ids);
        //           dispatch({
        //             type: 'exportData/saveFormData',
        //             payload: { pids: ids },
        //           });
        //         }}
        //       >
        //         ????????????????????????
        //       </a>
        //     </Space>
        //   );
        // }}
        // toolBarRender={() => [
        //   <span key="total" className="invisible-sm">
        //     ???{FuvListTotal}?????????
        //   </span>,
        //   <Button
        //     key="add_sample"
        //     type="primary"
        //     onClick={() => {
        //       setAddSampleModalVisable(true);
        //     }}
        //   >
        //     <PlusOutlined />
        //     ??????
        //   </Button>,
        // ]}
        headerTitle={
          <div>
            <span
              style={{
                display: 'inline-block',
                paddingLeft: '1rem',
                fontWeight: 'bold',
                height: '64px',
                lineHeight: '64px',
                marginRight: '15px',
              }}
            >
              ????????????????????????
            </span>
          </div>
        }
        tableRender={(_, dom) => <div style={{ border: '1px solid #f0f0f0' }}>{dom}</div>}
      />
      {/*<Pagination defaultCurrent={6} total={500} />*/}
    </Modal>
  );
};

const mapStateToProps = ({
  fuvList,
  global,
  exportData,
  loading,
}: {
  fuvList: StateType;
  global: GlobalStateType;
  exportData: ExportStateType;
  loading: { effects: Record<string, boolean> };
}) => {
  return {
    PatientsInResearch: fuvList.patientsInResearch,
    userAuths: global.userAuths,
    formData: exportData.form,
    researchCenters: global.researchCenters,
    researchDataLoading: loading.effects['fuvList/fetchPatientsInResearch'],
    patientsTotalInResearch: fuvList.patientsTotalInResearch,
    allPatientIds: fuvList.allPatientIds,
  };
};

export default connect(mapStateToProps)(ResearchModal);
