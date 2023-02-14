import { getPid } from '@/utils/location';
import {
  ClockCircleOutlined,
  DatabaseOutlined,
  LeftOutlined,
  CloudUploadOutlined,
  PlusCircleOutlined,
  ExclamationCircleOutlined,
  CarryOutOutlined,
  LockOutlined,
} from '@ant-design/icons';
import {
  Layout,
  Button,
  Menu,
  PageHeader,
  Form,
  Select,
  TreeSelect,
  Tooltip,
  Popconfirm,
} from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import type { Dispatch } from 'umi';
import { connect, history } from 'umi';
import type { StateType as GlobalStateType } from '@/models/global';
import type { BaseInfoType } from '@/pages/detail/CardContent/BaseInfo/data';
import type { StateType as PatientStateType } from '@/pages/detail/CardContent/BaseInfo/model';
import style from './index.less';
import SubmitModal from '@/components/SubmitModal';
import { handleAnonymous } from '@/utils/util';
import Cookies from 'js-cookie';
import BaselineInfoPage from '@/pages/detail/BaselineInfoPage';
import Admission1DayPage from '@/pages/detail/TreatmentInfo/Admission1DayPage';
import Discharge24HourPage from '@/pages/detail/TreatmentInfo/Discharge24HourPage';
import AdmissionPlentyDaysPage from '@/pages/detail/TreatmentInfo/AdmissionPlentyDaysPage';
import AddCycleModal from '@/components/AddCycleModal';
import DischargeModal from '@/components/DischargeModal';
import UnlockModal from '@/components/UnlockModal';

const { Header, Sider, Content } = Layout;

interface CrfDetailLayoutProps {
  userAuths: any;
  useAnonymousGlobal: boolean;
  patientInfo?: BaseInfoType;
  location: any;
  dispatch: Dispatch;
  cycleList: any[];
  admissionCycleList: any[];
  isSubmit: boolean;
}

const CrfDetailLayout: React.FC<CrfDetailLayoutProps> = (props) => {
  const {
    children,
    patientInfo,
    dispatch,
    userAuths,
    useAnonymousGlobal,
    cycleList,
    admissionCycleList,
    isSubmit,
  } = props;

  const [selectedKeys, setSelectedKeys] = useState(['baselineInfo']);
  const [menuOpenKeys, setMenuOpenKeys] = useState(['TreatmentInfo']);
  const [pid, setPid] = useState(-404);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [addCycleModalVisible, setAddCycleModalVisible] = useState(false);
  const [dischargeModalVisible, setDischargeModalVisible] = useState(false);
  const [currentSelectedKeys, setCurrentSelectedKeys] = useState(['baselineInfo']);
  const [unlockVisible, setUnlockVisible] = useState(false);
  // useEffect(() => {
  //   //   }
  //   // const is_unlockVisible = CookieUtil.get('is_unlockVisible');
  //   // if (is_unlockVisible === 'true') {
  //   //   setUnlockVisible(true);
  //   // } else {
  //   //   setUnlockVisible(false);
  //   // }
  //   setUnlockVisible(userAuths.can_unlock);
  // }, [userAuths]);

  const onClickOpenMenu = (openKeys: any) => {
    setMenuOpenKeys(openKeys);
  };

  const onClickMenuItem = async ({ keyPath }: any) => {
    if (keyPath[0] === 'submit') {
      setSubmitModalVisible(true);
    } else if (keyPath[0] === 'unlock') {
      setUnlockVisible(true);
    } else if (keyPath[0] === 'button' || keyPath[0] === 'unlock_disable') {
      return;
    } else {
      setCurrentSelectedKeys([...keyPath]);
      //如果keyPath[0]是数字，说明是入科第X天
      if (Number(keyPath[0])) {
        const currentCycleId = Number(keyPath[0]);
        dispatch({
          type: 'AdmissionDay/save',
          payload: {
            currentCycleId,
            isFirst: admissionCycleList.find((item) => item.id === currentCycleId).isFirst,
            isLast: admissionCycleList.find((item) => item.id === currentCycleId).isLast,
          },
        });
        keyPath[0] = 'admission_day';
        keyPath.splice(1, 0, currentCycleId);
      }
      setSelectedKeys(keyPath);
      let url = '';
      if (keyPath[keyPath.length - 1] === 'TreatmentInfo') {
        const re_keyPath = keyPath.reverse();
        re_keyPath.forEach((element: string) => {
          url += `/${element}`;
        });
      } else {
        url = `/${keyPath[0]}`;
      }
      if (window.location.hash !== `#/detail/${pid}${url}`) {
        history.push(`/detail/${pid}${url}`);
      }
    }
  };

  const set_menu_selected = () => {
    const { hash } = window.location;
    const path_list = hash.split('/');
    let Keys_list = [];
    if (path_list.length === 6) {
      const currentCycleId = Number(path_list[4]);
      dispatch({
        type: 'AdmissionDay/save',
        payload: {
          currentCycleId,
          isFirst: admissionCycleList.find((item) => item.id === currentCycleId).isFirst,
          isLast: admissionCycleList.find((item) => item.id === currentCycleId).isLast,
        },
      });
      Keys_list = [path_list[3], path_list[5]];
      setCurrentSelectedKeys([path_list[4], path_list[3]]);
    } else if (path_list.length === 5) {
      Keys_list = [path_list[3], path_list[4]];
      setCurrentSelectedKeys(Keys_list);
    } else {
      Keys_list = [path_list[3]];
      setCurrentSelectedKeys(Keys_list);
    }
    setSelectedKeys(Keys_list);
  };

  const handleSubmitModalCancel = () => {
    setSubmitModalVisible(false);
  };
  const handleAddCycleModalCancel = () => {
    setAddCycleModalVisible(false);
  };
  const handleDischargeModalCancel = () => {
    setDischargeModalVisible(false);
  };

  useEffect(() => {
    const _pid = getPid();
    if (_pid && _pid !== -404) {
      dispatch({
        type: 'base/fetchBaseInfo',
        payload: { pid: _pid },
      });
      dispatch({
        type: 'global/fetchCycleList',
        payload: { pid: _pid },
      });
    }
    const use_info = Cookies.get('userInfo');
    // console.log('id', id);
    let _use_info;
    if (use_info) {
      _use_info = JSON.parse(use_info);
    } else {
      return;
    }
    // console.log('_use_info', _use_info);

    dispatch({
      type: 'global/fetchUserAuths',
      payload: { body: { user_id: _use_info.id, project_id: PROJECT_ID } },
    });

    // console.log('patientInfo', patientInfo?.id);
  }, []);

  // 地址改变的时候调用一次
  useEffect(() => {
    const _pid = getPid();
    setPid(_pid);
    if (admissionCycleList.length) {
      set_menu_selected();
    }
  }, [props.location, admissionCycleList]);

  const AddButtonClick = () => {
    setAddCycleModalVisible(true);
  };
  const DischargeButtonClick = () => {
    setDischargeModalVisible(true);
  };

  const detail_body = useMemo(
    () => ({
      baselineInfo: <BaselineInfoPage />,
      // admission_day: currentCycleId ? <Admission1DayPage cycleId={currentCycleId} /> : null,
      admission_day: <Admission1DayPage />,
      discharge_24hour: cycleList[1] ? <Discharge24HourPage cycleId={cycleList[1].id} /> : null,
      admission_30day: cycleList[2] ? <AdmissionPlentyDaysPage cycleId={cycleList[2].id} /> : null,
      admission_90day: cycleList[3] ? <AdmissionPlentyDaysPage cycleId={cycleList[3].id} /> : null,
      admission_180day: cycleList[4] ? <AdmissionPlentyDaysPage cycleId={cycleList[4].id} /> : null,
      admission_365day: cycleList[5] ? <AdmissionPlentyDaysPage cycleId={cycleList[5].id} /> : null,
    }),
    [selectedKeys, cycleList],
  );

  const getTreatmentInfoChildren = () => {
    // const children: any[] = [{ label: '入科第1天', key: 'admission_1day' }];
    const children: any[] = [];
    if (admissionCycleList.length) {
      admissionCycleList.map((item: any) => {
        children.push({ label: item.name, key: item.id });
      });
    }
    if (!patientInfo?.isDischarge) {
      children.push({
        // label: <span style={{ color: '#39bbdb' }}>添加入科第X天随访</span>,
        label: (
          <>
            <Tooltip title="添加入科第X天随访">
              <Button
                type="primary"
                ghost
                style={{ marginRight: 10 }}
                icon={<PlusCircleOutlined />}
                onClick={AddButtonClick}
              >
                添加
              </Button>
            </Tooltip>
            <Tooltip title="样本出院后点击">
              <Button
                type="primary"
                ghost
                icon={<CarryOutOutlined />}
                onClick={DischargeButtonClick}
              >
                出院
              </Button>
            </Tooltip>
          </>
        ),
        key: 'button',
        // icon: <PlusCircleOutlined style={{ color: '#39bbdb' }} />,
      });
    }
    children.push(
      { label: cycleList[1]?.name, key: 'discharge_24hour' },
      { label: cycleList[2]?.name, key: 'admission_30day' },
      { label: cycleList[3]?.name, key: 'admission_90day' },
      { label: cycleList[4]?.name, key: 'admission_180day' },
      { label: cycleList[5]?.name, key: 'admission_365day' },
    );
    return children;
  };

  const getUnlockBTN = () => {
    if (userAuths.can_unlock) {
      return {
        label: (
          <Tooltip title="解锁后可修改样本信息" placement="topLeft">
            解锁
          </Tooltip>
        ),
        key: 'unlock',
        icon: <LockOutlined />,
      };
    } else {
      return {
        label: (
          <Tooltip title="联系管理员可解锁样本" placement="topLeft">
            解锁
          </Tooltip>
        ),
        key: 'unlock_disable',
        icon: <LockOutlined />,
        disabled: true,
      };
    }
  };

  const items = [
    { label: '基线资料', key: 'baselineInfo', icon: <DatabaseOutlined /> },
    {
      label: <span>治疗信息{patientInfo?.isDischarge ? <span>（已出院）</span> : null}</span>,
      key: 'TreatmentInfo',
      icon: <ClockCircleOutlined />,
      children: getTreatmentInfoChildren(),
    },
    isSubmit
      ? getUnlockBTN()
      : {
          label: (
            <Tooltip title="精神量表全部填写完成后才可提交" placement="topLeft">
              提交
            </Tooltip>
          ),
          key: 'submit',
          icon: <CloudUploadOutlined />,
        },
  ];

  // console.log('cycleList',cycleList);

  return (
    <>
      <div
        style={{
          marginRight: 'auto',
          marginLeft: 'auto',
          maxWidth: '1600px',
          paddingBottom: '48px',
          paddingTop: '12px',
        }}
      >
        <PageHeader
          className="site-page-header"
          title={
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ width: '180px' }}>
                <Button type="primary" onClick={() => history.push('/')}>
                  <LeftOutlined />
                  返回
                </Button>
                {/* <Popconfirm
                  key="unlock"
                  title="确认要解锁该样本吗?"
                  placement="topRight"
                  onConfirm={() => {
                    const id = [patientInfo?.id];
                    console.log('patientInfo?.id', patientInfo?.id);
                    dispatch({
                      type: 'fuvList/unlockFuv',
                      payload: {
                        sampleId: id,
                      },
                    });
                  }}
                  okText="是"
                  cancelText="否"
                >
                  <span>
                    {' '}
                    {unlockVisible ? (
                      <Button type="primary">
                        <LockOutlined /> 解锁
                      </Button>
                    ) : null}
                  </span>
                </Popconfirm> */}
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  whiteSpace: 'normal',
                }}
              >
                <span className={style.custom_text_span}>
                  姓名:{' '}
                  {useAnonymousGlobal === false
                    ? patientInfo?.name
                    : handleAnonymous(patientInfo?.name, 'patientName')}
                </span>
                <span className={style.custom_text_span}>
                  住院号:{' '}
                  {useAnonymousGlobal === false
                    ? patientInfo?.hospitalNumber
                    : handleAnonymous(patientInfo?.hospitalNumber, 'hospitalNumber')}
                </span>
                <span className={style.custom_text_span}>
                  联系电话:{' '}
                  {useAnonymousGlobal === false
                    ? patientInfo?.phone
                    : handleAnonymous(patientInfo?.phone, 'phoneNumber')}
                </span>
              </div>
            </div>
          }
          style={{ marginBottom: '12px' }}
        />
        <Layout style={{ margin: '0', backgroundColor: 'white' }}>
          <Sider
            width={250}
            className="site-layout-background"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              // console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              // console.log(collapsed, type);
            }}
          >
            <Menu
              mode="inline"
              onClick={onClickMenuItem}
              onOpenChange={onClickOpenMenu}
              openKeys={menuOpenKeys}
              selectedKeys={currentSelectedKeys}
              style={{
                border: '1px solid rgb(235, 237, 240)',
              }}
              items={items}
            />
          </Sider>
          <Content style={{ width: 0 }}>
            {detail_body[selectedKeys[selectedKeys.length - 1]]}
          </Content>
        </Layout>
      </div>
      <SubmitModal
        visible={submitModalVisible}
        pid={pid}
        handleSubmitModalCancel={handleSubmitModalCancel}
        onClickMenuItem={onClickMenuItem}
      />
      <AddCycleModal
        visible={addCycleModalVisible}
        handleAddCycleModalCancel={handleAddCycleModalCancel}
        pid={pid}
        onClickMenuItem={onClickMenuItem}
      />
      <DischargeModal
        visible={dischargeModalVisible}
        handleDischargeModalCancel={handleDischargeModalCancel}
        pid={pid}
      />
      <UnlockModal
        visible={unlockVisible}
        pid={pid}
        handleUnlockModalCancel={() => setUnlockVisible(false)}
        onClickMenuItem={onClickMenuItem}
      />
    </>
  );
};

const mapStateToProps = ({
  loading,
  global,
  base,
}: {
  loading: { effects: Record<string, boolean> };
  global: GlobalStateType;
  base: PatientStateType;
}) => {
  return {
    userAuths: global.userAuths,
    patientInfo: base.baseInfo,
    useAnonymousGlobal: global.useAnonymousGlobal,
    cycleList: global.cycleList,
    admissionCycleList: global.admissionCycleList,
    isSubmit: !!base.baseInfo?.isSubmit,
  };
};

export default connect(mapStateToProps)(CrfDetailLayout);
