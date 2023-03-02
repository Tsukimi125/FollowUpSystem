/*
 * @Descripttion: 项目的首页
 * @Author: linkenzone
 * @Date: 2020-09-10 20:12:23
 * table使用了 pro-table
 * https://procomponents.ant.design/components/table
 */

import React, { useEffect, useState } from 'react';
import type { Dispatch } from 'umi';
import { connect, history } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { bioReasonOptions } from '@/layouts/constant';
import { Button, Space, Tooltip, Select, Input, Pagination, Popconfirm, Form, message } from 'antd';
import {
  ExportOutlined,
  FilterOutlined,
  LeftOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
  LoadingOutlined,
  StrikethroughOutlined,
} from '@ant-design/icons';
// import RemindModal from '@/components/RemindModal';
// import { DelDuplicateNodes } from '@/components/patDiaTree/util';
import type { StateType as GlobalStateType } from '@/models/global';
import type { ResearchCentersDataType, UseInfoDataType, UserAuthsDataType } from '@/models/data';
import Cookies from 'js-cookie';
import type { FuvListItemDataType, SpecimenListItemDataType } from './data';
import type { StateType } from './model';
import type { StateType as ExportStateType } from '../fuvList/forms/exportForm/model';
import style from './style.less';
// import SearchForm from './forms/searchForm';
// import ExportForm from './forms/exportForm';
import AddSampleModal from './Modals/addSample';
// import { ProgressText, ProgressColor } from '@/components/Doubt/DoubtStatus';
// import AddResearchModal from './Modals/addResearch';
// import ResearchModal from './Modals/researchModal';
// import { ConnectedUnchangedListModal } from '@/extensions/message';
// import SpecimenInformation from '../detail/CardContent/SpecimenInformation';
// import AddSampleToResearch from '@/pages/fuvList/Modals/addSampleToResearch';
// import AddSampleToResearchModal from '@/pages/fuvList/Modals/addSampleToResearch';
// import EditResearchModal from '@/pages/fuvList/Modals/editResearch';
import { handleAnonymous } from '@/utils/util';
import Anonymous from './components/Anonymous';
import moment from 'moment';
import { CookieUtil } from '@/utils/cookie';
import { FetchFile } from '@/utils/requestFile';

type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

const { Search } = Input;
const { Option } = Select;

interface FuvListProps {
  FuvList: FuvListItemDataType[];
  // SpecimenList: SpecimenListItemDataType[];
  userAuths: UserAuthsDataType;
  FuvListTotal: number;
  FuvListLoading: boolean;
  // SpecimenListLoading: boolean;
  SampleExportLoading: boolean;
  useAnonymousGlobal: boolean;
  FuvAllPids: number[];
  AllResearch: any[];
  researchCenters: ResearchCentersDataType[];
  formData: ExportStateType['form'];
  // curSelectedIds: number[];
  dispatch: Dispatch;
  // patientsInResearch: any[];
  // researchDataLoading: boolean;
  // patientsTotalInResearch: number;
  // researchPids: any[];
}

const FuvListPage: React.FC<FuvListProps> = (props) => {
  const {
    userAuths,
    FuvList,
    FuvListTotal,
    FuvListLoading,
    useAnonymousGlobal,
    AllResearch,
    formData,
    dispatch,
  } = props;

  const dateFormat = 'YYYY-MM-DD';

  // console.log('here is FuvList :', FuvList);
  // console.log('FuvAllPids', FuvAllPids);

  const [addSampleModalVisable, setAddSampleModalVisable] = useState(false);
  // const [researchModalVisable, setresearchModalVisable] = useState(false);
  // const [addResearchModalVisable, setAddResearchModalVisable] = useState(false);
  // const [addResearchSampleModalVisable, setAddResearchSampleModalVisable] = useState(false);
  // const [editResearchModalVisable, setEditResearchModalVisable] = useState(false);

  const [userInfo, setUserInfo] = useState<UseInfoDataType>();

  const [curSearchValue, setCurSearchValue] = useState<{ name: string; value?: string | null }>({
    name: 'patientName',
    value: null,
  });

  const [curSortValue, setCurSortValue] = useState<{ name: string; value?: string | null }>({
    name: '请选择排序方式',
    value: '0',
  });

  const [curResearchValue, setCurResearchValue] = useState<number>(0);

  const [lastfilterValues, setLastFilterValues] = useState<any>({});

  useEffect(() => {
    if (!userAuths.only_specimenInfo) {
      dispatch({
        type: 'fuvList/fetchAllResearch',
        payload: {},
      });
    } else console.log('userAuths.only_specimenInfo', userAuths.only_specimenInfo);
  }, [userAuths.only_specimenInfo]);

  // page
  const [pageInfo, setPageInfo] = useState({ current: 1, pageSize: 20 });

  // modal 相关
  const [searchModalForm] = Form.useForm();
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  // 导出相关
  const [exportVisible, setExportVisible] = useState<boolean>(false);
  const [isAllChecked, setisAllChecked] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [curSelectedIds, setCurSelectedIds] = useState<any[]>([]);

  useEffect(() => {
    //   }
    // const is_exportVisble = CookieUtil.get('is_exportVisble');
    // console.log('is_exportVisble', CookieUtil.get('is_exportVisble'));
    // if (is_exportVisble === 'true') {
    //   setExportVisible(true);
    // } else {
    //   setExportVisible(false);
    // }
    setExportVisible(userAuths.can_export);
  }, [userAuths]);
  // };

  // #region 页面相关函数
  useEffect(() => {
    const total = FuvListTotal;
    if (total > 0 && selectedRowKeys?.length >= total) {
      setisAllChecked(true);
    } else {
      setisAllChecked(false);
    }
  }, [selectedRowKeys]);

  useEffect(() => {
    const target = AllResearch.filter((val) => {
      return val.id === curResearchValue;
    });
    if (target.length <= 0) {
      setCurResearchValue(0);
    }
  }, [AllResearch]);

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [FuvListTotal]);

  /**
   * @description: 获取数据, current为当前页，pageSize为一页大小，sort为排序信息，rid为研究id
   * @Param:
   */
  const fetchData = (
    current: number,
    pageSize: number,
    sort?: string | null,
    body?: any,
    rid: number = curResearchValue,
  ) => {
    const fetchType = userAuths.only_specimenInfo
      ? 'fuvList/fetchSpecimenList'
      : 'fuvList/fetchFuvList';

    dispatch({
      type: fetchType,
      payload: {
        params: { offset: current, limit: pageSize },
        body: { ...body, research_id: rid !== 0 ? rid : undefined },
      },
    });
  };
  /**
   * @description: 刷新页面，不含参数，page为1，size为20
   * @Param:
   */

  const refreshSampleList = () => {
    // // // console.log('refreshSampleList userAuths',userAuths)
    fetchData(1, 20);
  };

  /**
   * @description: 刷新页面，含当前页面和页面大小
   * @Param:
   */

  const refreshSampleListByPage = (current: number, pageSize: number) => {
    if (curSortValue.value === '0') {
      fetchData(current, pageSize);
    } else {
      fetchData(current, pageSize, curSortValue.value);
    }
  };

  /**
   * @description: 刷新页面，含当前页面和，页面大小和搜索参数，同时如果有排序方式，则按照排序方式展示搜索结果
   * @Param:
   */

  const refreshSampleListBySearch = (current: number, pageSize: number, values: any) => {
    if (curSortValue.value === '0') {
      fetchData(current, pageSize, undefined, values);
      // // console.log('仅搜索');
    } else {
      // // console.log('排序和搜索同步');
      fetchData(current, pageSize, curSortValue.value, values);
    }
  };

  const PageSizeHandler = (current: number, size: number) => {
    setPageInfo({ current, pageSize: size });
    refreshSampleListByPage(current, size);
    refreshSampleListBySearch(current, size, {
      [curSearchValue.name]: curSearchValue.value ? curSearchValue.value : undefined,
      ...lastfilterValues,
    });
  };

  const PaginationHandler = (page: number, pageSize?: number | undefined) => {
    setPageInfo({ current: page, pageSize: pageSize || 20 });
    refreshSampleListByPage(page, pageSize || 20);
    refreshSampleListBySearch(page, pageSize || 20, {
      [curSearchValue.name]: curSearchValue.value ? curSearchValue.value : undefined,
      ...lastfilterValues,
    });
  };
  // #endregion

  // 仅在组件渲染的时候调用一次 userAuths
  useEffect(() => {
    const use_info = Cookies.get('userInfo');
    // // console.log('use_info', use_info);
    let _use_info;
    if (use_info) {
      _use_info = JSON.parse(use_info);
      setUserInfo(_use_info);
    }
    // dispatch({
    //   type: 'global/fetchResearchCentersList',
    //   payload: {},
    // });
    if (_use_info) {
      dispatch({
        type: 'global/fetchUserAuths',
        payload: { body: { user_id: _use_info.id, project_id: PROJECT_ID } },
      });
    }

    refreshSampleList();

    // // 清空pids
    // dispatch({
    //   type: 'exportData/saveFormData',
    //   payload: { pids: [] },
    // });
    // setisAllChecked(false)
  }, []);

  useEffect(() => {
    // // console.log('userAuths', userAuths);
    refreshSampleList();
  }, [userAuths, curResearchValue]);

  useEffect(() => {
    // console.log('导出项改变了',formData)
    if (formData.pids.length === 0) {
      setSelectedRowKeys([]);
    }
  }, [formData, curResearchValue]);

  // 排序方式改变的时候回到第一页，同时保留搜索表单的结果
  useEffect(() => {
    refreshSampleListBySearch(pageInfo.current, pageInfo.pageSize, {
      [curSearchValue.name]: curSearchValue.value ? curSearchValue.value : undefined,
      ...lastfilterValues,
    });
  }, [curSortValue]);

  // #region 表头的设置
  const columns: ProColumns<FuvListItemDataType>[] = [
    // {
    //   title: '编号',
    //   width: 150,
    //   align: 'center',
    //   dataIndex: 'id',
    //   responsive: ['sm'] as Breakpoint[],
    //   shouldCellUpdate: (record, prevRecord) => {
    //     return record !== prevRecord;
    //   },
    //   render: (text: any) => {
    //     return (
    //       <Tooltip placement="top" title={text}>
    //         <span className={style.custom_table_ellipsis}>{text}</span>
    //       </Tooltip>
    //     );
    //   },
    // },
    {
      title: '医院',
      // width: 80,
      // ellipsis: true,
      align: 'center',
      responsive: ['md'] as Breakpoint[],
      dataIndex: 'hospital',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
    },
    {
      title: '住院号',
      width: 150,
      align: 'center',
      dataIndex: 'hospitalNumber',
      responsive: ['sm'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      // render: (text: any) => {
      //   return (
      //     <Tooltip placement="top" title={text}>
      //       <Anonymous
      //         useAnonymous={useAnonymousGlobal}
      //         originValue={text}
      //         anonymousValue={handleAnonymous(text, 'hospitalNumber')}
      //       />
      //     </Tooltip>
      //   );
      // },
    },
    {
      title: '姓名',
      width: 120,
      align: 'center',
      dataIndex: 'name',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      // render: (text: any) => {
      //   return (
      //     <Tooltip placement="top" title={text}>
      //       <Anonymous
      //         useAnonymous={useAnonymousGlobal}
      //         originValue={text}
      //         anonymousValue={handleAnonymous(text, 'patientName')}
      //       />
      //     </Tooltip>
      //   );
      // },
    },
    {
      title: '联系方式',
      width: 180,
      // ellipsis: true,
      align: 'center',
      dataIndex: 'phone',
      responsive: ['md'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      // render: (text: any) => {
      //   return (
      //     <Tooltip placement="top" title={text}>
      //       <Anonymous
      //         useAnonymous={useAnonymousGlobal}
      //         originValue={text}
      //         anonymousValue={handleAnonymous(text, 'phoneNumber')}
      //       />
      //     </Tooltip>
      //   );
      // },
    },
    {
      title: '性别',
      width: 60,
      // ellipsis: true,
      align: 'center',
      dataIndex: 'sex',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      valueEnum: {
        1: { text: '男' },
        0: { text: '女' },
      },
    },
    {
      title: '年龄',
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
      title: '入院日期',
      // width: 100,
      align: 'center',
      responsive: ['md'] as Breakpoint[],
      dataIndex: 'admissionDate',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text: any) => {
        return text !== '-' ? moment(text).format(dateFormat) : '-';
      },
    },
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      width: 140,
      render: (text, record) => (
        <Space size="small">
          <a
            className="custom_toolbar_buttom"
            key="show"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              dispatch({
                type: 'global/fetchCycleList',
                payload: { pid: record.id },
              });
              history.push(`/detail/${record.id}/baselineInfo`);
            }}
          >
            查看
          </a>
          {/* {(curResearchValue > 0 && userAuths.can_removeFromResearch) ||
          (curResearchValue <= 0 && userAuths.can_deleteCRF) ? ( */}
          <Popconfirm
            key="delete"
            title="确认要删除这一条记录?"
            placement="topRight"
            onConfirm={() => {
              dispatch({
                type: 'fuvList/deleteFuv',
                payload: { sampleId: record.id },
              }).then(() => {
                refreshSampleListBySearch(pageInfo.current, pageInfo.pageSize, {
                  [curSearchValue.name]: curSearchValue.value ? curSearchValue.value : undefined,
                  ...lastfilterValues,
                });
              });
            }}
            okText="是"
            cancelText="否"
          >
            <a className="custom_toolbar_buttom_danger">
              {/* {curResearchValue > 0 ? '移除' : '删除'} */}
              删除
            </a>
          </Popconfirm>
          {/* // ) : (
          //   <a className="custom_toolbar_buttom_danger_disable">
          //     {curResearchValue > 0 ? '移除' : '删除'}
          //   </a>
          // )} */}
        </Space>
      ),
    },
  ];

  const columnsForSpecimen: ProColumns<SpecimenListItemDataType>[] = [
    {
      title: '编号',
      width: 100,
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
      title: '住院号',
      width: 120,
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
      title: '姓名',
      width: 100,
      align: 'center',
      dataIndex: 'patientName',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text: any) => {
        return (
          <Tooltip placement="top" title={text}>
            <Anonymous
              useAnonymous={useAnonymousGlobal}
              originValue={text}
              anonymousValue={handleAnonymous(text, 'patientName')}
            />
          </Tooltip>
        );
      },
    },
    {
      title: '样本类型',
      // width: 120,
      align: 'center',
      dataIndex: 'specimen_info',
      responsive: ['sm'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (data: any) => {
        // // // console.log('text', data);
        let retStr = '';
        for (const item of data) {
          let text = item.type;
          // 如果为字符串，将它转换
          if (text && typeof text === 'string') {
            text = JSON.parse(text);
          }

          if (text && text.radio && text.radio[0]) {
            retStr = retStr.concat(
              `${text.radio[0].join('-')}${text.other ? `---${text.other}` : ''}`,
              ' | ',
            );
          }
        }
        retStr = retStr === '' ? '-' : retStr.slice(0, -2);
        return (
          <Tooltip placement="top" title={retStr}>
            <span className={style.custom_table_ellipsis}>{retStr}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '样本储存位置',
      // width: 120,
      align: 'center',
      dataIndex: 'specimen_info',
      responsive: ['sm'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (data: any) => {
        // // // console.log('text', data);
        let retStr = '';
        for (const item of data) {
          if (!(item.storeSite === null || item.storeSite === undefined)) {
            retStr = retStr.concat(item.storeSite, ' | ');
          }
        }
        retStr = retStr === '' ? '-' : retStr.slice(0, -2);
        return (
          <Tooltip placement="top" title={retStr}>
            <span className={style.custom_table_ellipsis}>{retStr}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '活检原因',
      // width: 120,
      align: 'center',
      dataIndex: 'specimen_info',
      responsive: ['sm'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (data: any) => {
        // // // console.log('text', data);
        let retStr = '';
        for (const item of data) {
          let text = item.bioReason;
          // 如果为字符串，将它转换
          if (text && typeof text === 'string') {
            text = JSON.parse(text);
          }

          if (text && text.radio !== undefined) {
            retStr = retStr.concat(
              `${bioReasonOptions[text.radio].label}${text.other ? `---${text.other}` : ''}`,
              ' | ',
            );
          }
        }
        retStr = retStr === '' ? '-' : retStr.slice(0, -2);
        return (
          <Tooltip placement="top" title={retStr}>
            <span className={style.custom_table_ellipsis}>{retStr}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      width: 140,
      // shouldCellUpdate: (record, prevRecord) => {
      //   return record !== prevRecord;
      // },
      render: (text, record) => (
        <Space size="small">
          <a
            className="custom_toolbar_buttom"
            key="show"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              // // // console.log('record',record)
              history.push(`/detail/${record.id}/baselineInfo`);
            }}
          >
            查看
          </a>
        </Space>
      ),
    },
  ];
  // #endregion

  const exportDownload = () => {
    // message.warning('功能暂未开放');
    const ids = [...selectedRowKeys];
    if (ids.length === 0) {
      message.info('未选择样本，请重新选择！');
      return;
    }
    const option = {
      method: 'POST',
      dataType: 'blob',
      url: `${GGTJ_API}/sample/export`,
      data: {
        sampleIds: ids,
      },
      fileName: '样本数据.xlsx',
    };
    FetchFile(option);
  };

  return (
    <>
      <div
        style={{ maxWidth: '1600px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '1rem' }}
      >
        <ProTable
          // loading={userAuths.only_specimenInfo?SpecimenListLoading:FuvListLoading}
          loading={FuvListLoading}
          columns={userAuths.only_specimenInfo ? columnsForSpecimen : columns}
          search={false}
          pagination={false}
          // dataSource={userAuths.only_specimenInfo?SpecimenList:FuvList}
          dataSource={FuvList}
          // scroll={{ x: 1080 }}
          tableLayout="fixed"
          className={style.custom_modal_table}
          bordered
          rowKey="id"
          options={{
            reload: () => {
              // // console.log('执行刷新');
              refreshSampleListByPage(pageInfo.current, pageInfo.pageSize);
              setLastFilterValues({});
              setCurSearchValue({ ...curSearchValue, value: null });
              searchModalForm.resetFields();
            },
            fullScreen: true,
            density: true,
            setting: true,
          }}
          rowSelection={
            userAuths.only_specimenInfo
              ? undefined
              : {
                  onChange: (selectRowKeys: any) => {
                    setSelectedRowKeys(selectRowKeys);
                    // console.log('selectRowKeys', selectRowKeys);
                  },
                  preserveSelectedRowKeys: true,
                  columnWidth: 40,
                  selectedRowKeys,
                }
          }
          tableAlertOptionRender={(table_props: any) => {
            const { selectedRowKeys } = table_props;
            return (
              <Space size="large" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                <a
                  onClick={() => {
                    const ids = [...selectedRowKeys];
                    const delList = FuvList;
                    const delIds = delList.map((item) => item.id);
                    // setisAllChecked(false);
                    // console.log('取消当前页选择项，selectedRowKeys', ids);
                    // console.log('取消当前页选择项，curSelectedIds', curSelectedIds);
                    const res = ids.filter((id) => delIds.indexOf(id) < 0);
                    // for (const tmpId of curSelectedIds) {
                    //   const delIdx = ids.indexOf(tmpId);
                    //   ids.splice(delIdx, 1);
                    // }
                    setSelectedRowKeys(res);
                    // setCurSelectedIds([]);
                  }}
                  // onClick={onCleanSelected}
                >
                  取消当前页选择项
                </a>
                <a onClick={() => setSelectedRowKeys([])}>取消全部选择</a>
              </Space>
            );
          }}
          toolBarRender={() => [
            <span key="total" className="invisible-sm">
              共{FuvListTotal}个样本
            </span>,

            <Button
              key="add_sample"
              type="primary"
              onClick={() => {
                setAddSampleModalVisable(true);
              }}
            >
              <PlusOutlined />
              添加
            </Button>,

            <Popconfirm
              key="export"
              title="确认要导出所选样本吗?"
              placement="topRight"
              onConfirm={
                // () => {
                //   const ids = [...selectedRowKeys];
                //   if (ids.length === 0) {
                //     message.info('未选择样本，请重新选择！');
                //     return;
                //   }
                //   console.log('ids', ids);
                //   dispatch({
                //     type: 'fuvList/exportFuv',
                //     payload: {
                //       body: {
                //         sampleIds: ids,
                //       },
                //     },
                //   });
                // }
                exportDownload
              }
              okText="是"
              cancelText="否"
            >
              {exportVisible ? (
                <Button type="primary">
                  <ExportOutlined /> 导出
                </Button>
              ) : null}
            </Popconfirm>,
            // userAuths.can_viewRawData ? (
            //   <Button
            //     key="use_anonymous"
            //     type="primary"
            //     onClick={() => {
            //       dispatch({
            //         type: 'global/save',
            //         payload: { useAnonymousGlobal: !useAnonymousGlobal },
            //       });
            //       refreshSampleListByPage(pageInfo.current, pageInfo.pageSize);
            //     }}
            //   >
            //     <StrikethroughOutlined />
            //     {useAnonymousGlobal ? '恢复' : '脱敏'}
            //   </Button>
            // ) : null,
          ]}
          headerTitle={
            <div>
              {/* <Button type="primary" style={{ marginLeft: 0 }}>
                <a href={RBAC_URL}>
                  <LeftOutlined /> 返回
                </a>
              </Button> */}
              <span
                style={{
                  display: 'inline-block',
                  // paddingLeft: '1rem',
                  fontWeight: 'bold',
                  height: '64px',
                  lineHeight: '64px',
                  marginRight: '15px',
                }}
              >
                样本列表
              </span>
              {/* <Checkbox
                checked={isAllChecked}
                style={{ display: userAuths.only_specimenInfo ? 'none' : '' }}
                onChange={(e) => {
                  const isCheck = e.target.checked;
                  if (isCheck) {
                    setSelectedRowKeys(FuvAllPids);
                  } else {
                    setSelectedRowKeys([]);
                    // setCurSelectedIds([]);
                  }
                  // setisAllChecked(isCheck);
                }}
              >
                全选
              </Checkbox> */}
            </div>
          }
          tableRender={(_, dom) => <div style={{ border: '1px solid #f0f0f0' }}>{dom}</div>}
        />

        <Pagination
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 24,
            textAlign: 'center',
            maxWidth: '100%',
          }}
          current={pageInfo.current}
          pageSize={pageInfo.pageSize}
          total={FuvListTotal}
          showSizeChanger
          onChange={PaginationHandler}
          onShowSizeChange={PageSizeHandler}
          responsive
          showTotal={(total) => `共有 ${total} 个样本`}
        />
      </div>

      {/* <Modal
        title={null}
        visible={SampleExportLoading}
        footer={null}
        closable={false}
        // bodyStyle={{ backgroundColor: '#dbf8ff' }}
        // maskStyle={{ backgroundColor: '#fff0' }}
        className={style.custom_modal}
      >
        <div
          style={{
            height: '180px',
            textAlign: 'center',
            color: '#64e0ff',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          <span style={{ display: 'block', paddingTop: '7%' }}>
            <LoadingOutlined style={{ fontSize: 36 }} spin />
          </span>
          <span style={{ display: 'block', paddingTop: '4%' }}>正在导出...</span>
        </div>
      </Modal> */}

      {/* <SearchForm
        modalVisible={searchModalVisible}
        modalForm={searchModalForm}
        onModalClose={() => {
          setSearchModalVisible(false);
        }}
        onModalFinish={onSearchModalFinish}
      /> */}

      <AddSampleModal
        addSampleModalVisable={addSampleModalVisable}
        setAddSampleModalVisable={setAddSampleModalVisable}
        refreshSampleList={() => {
          refreshSampleList();
          refreshSampleListByPage(pageInfo.current, pageInfo.pageSize);
          setCurSearchValue({ ...curSearchValue, value: null });
          setLastFilterValues({});
        }}
      />

      {/* <AddSampleToResearchModal
        addResearchSampleModalVisable={addResearchSampleModalVisable}
        setAddResearchSampleModalVisable={setAddResearchSampleModalVisable}
        patientIds={selectedRowKeys}
        refreshSampleList={refreshSampleList}
      /> */}

      {/* <EditResearchModal
        editResearchModalVisable={editResearchModalVisable}
        setEditResearchModalVisable={setEditResearchModalVisable}
      /> */}

      {/* <ExportForm
        modalVisible={exportModalVisible}
        useAnonymous={useAnonymousGlobal}
        onModalClose={() => {
          setExportModalVisible(false);
        }}
      /> */}
    </>
  );
};

const mapStateToProps = ({
  fuvList,
  global,
  loading,
  exportData,
}: {
  fuvList: StateType;
  global: GlobalStateType;
  loading: { effects: Record<string, boolean> };
  exportData: ExportStateType;
}) => {
  // 在此设置当前页的选项
  /* const curSelectedIds = [];
  for (const item of fuvList.fuvList) {
    if (exportData.form.pids.indexOf(item.id) !== -1) {
      curSelectedIds.push(item.id);
    }
  }
  // console.log('fuvList', fuvList); */

  // 根据用户权限设置渲染列表
  const FuvListLoading = global.userAuths.only_specimenInfo
    ? loading.effects['fuvList/fetchSpecimenList']
    : loading.effects['fuvList/fetchFuvList'];
  const FuvList = global.userAuths.only_specimenInfo ? fuvList.specimenList : fuvList.fuvList;
  return {
    // curSelectedIds, // 当前页面下已经选择的pid列表
    formData: exportData.form, // 待导出的病例列表
    userAuths: global.userAuths,
    // FuvList: fuvList.fuvList, // 当前页面下的所有病例列表
    FuvList, // 当前页面下的所有病例列表
    // SpecimenList: fuvList.specimenList, // 当前页面下的所有病例列表
    FuvListTotal: fuvList.total,
    FuvAllPids: fuvList.all_pids,
    AllResearch: fuvList.allResearch,
    researchCenters: global.researchCenters,
    FuvListLoading,
    useAnonymousGlobal: global.useAnonymousGlobal,
    // SpecimenListLoading
    SampleExportLoading: loading.effects['fuvList/exportFuv'],
    // patientsInResearch: fuvList.patientsInResearch,
    // researchDataLoading: loading.effects['fuvList/fetchPatientsInResearch'],
    // patientsTotalInResearch: fuvList.patientsTotalInResearch,
    // researchPids: fuvList.allPatientIds,
  };
};

export default connect(mapStateToProps)(FuvListPage);
