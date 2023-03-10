import { getPid } from '@/utils/location';
import { Button, Card, DatePicker, Modal, PageHeader, Tooltip, message } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import type { Dispatch, Loading } from 'umi';
import { connect } from 'umi';
import { CarryOutOutlined } from '@ant-design/icons';
import FirstDate from '../../CardContent/FirstDate';
import VitalSigns from '../../CardContent/VitalSigns';
import MentalScale from '../../CardContent/MentalScale';
import MriDwi from '../../CardContent/MriDwi';
import AdmissionPageDate from '../../CardContent/AdmissionPageDate';
import { StateType } from '@/pages/detail/CardContent/FirstDate/model';
import type { StateType as GlobalStateType } from '@/models/global';
import type { StateType as AdmissionDayStateType } from './model';
import type { UserAuthsDataType } from '@/models/data';
import DiseaseRelatedScale from '../../CardContent/DiseaseRelatedScale';
import LabInspection from '../../CardContent/LabInspection';
import type { StateType as BaseStateType } from '@/pages/detail/CardContent/BaseInfo/model';
import request from '@/utils/request';

interface Admission1DayPageProps {
  dispatch: Dispatch;
  // userAuths: UserAuthsDataType;
  cycleId: number;
  isFirst: boolean;
  // isLast: boolean;
}

const Admission1DayPage: React.FC<Admission1DayPageProps> = (props) => {
  const { dispatch, cycleId, isFirst } = props;
  const [key, setKey] = useState('FirstDate');
  const [pid, setPid] = useState<number>(getPid());
  // const [dischargeModalVisible, setDischargeModalVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);

  const onTabChange = (card_key: string) => {
    // if (card_key === 'Discharge') {
    //   setDischargeModalVisible(true);
    // } else {
    setKey(card_key);
    // }
  };

  const contentList = useMemo(
    () => ({
      FirstDate: <AdmissionPageDate pid={pid} cycleId={cycleId} />,
      VitalSigns: <VitalSigns pid={pid} cycleId={cycleId} />,
      MentalScale: <MentalScale pid={pid} cycleId={cycleId} />,
      // MriDwi: <MriDwi pid={pid} cycleId={cycleId} />,
      diseaseRelatedScale: <DiseaseRelatedScale pid={pid} cycleId={cycleId} />,
      LabInspection: <LabInspection pid={pid} cycleId={cycleId} />,
    }),
    [pid, cycleId],
  );

  useEffect(() => {
    dispatch({
      type: 'cycle/fetchCycleInfo',
      payload: { cycleId },
    });
    setKey('FirstDate');
    // console.log('Admission1DayPage cycleId', cycleId);
  }, [cycleId]);

  const getTabList = () => {
    const tabList = [
      {
        key: 'FirstDate',
        tab: '??????',
      },
      {
        key: 'VitalSigns',
        tab: '????????????',
      },
      {
        key: 'MentalScale',
        tab: '??????????????????',
      },
      {
        key: 'diseaseRelatedScale',
        tab: '????????????????????????',
      },
      {
        key: 'LabInspection',
        tab: '???????????????',
      },
      // {
      //   key: 'Discharge',
      //   // tab: <span style={{ color: '#39bbdb' }}>?????? <CarryOutOutlined /></span>
      //   tab: (
      //     <Tooltip title="?????????????????????">
      //       <Button type="primary" style={{ width: 80 }}>
      //         ?????? <CarryOutOutlined />
      //       </Button>
      //     </Tooltip>
      //   ),
      // },
    ];
    if (!isFirst) {
      tabList.splice(3, 1);
    }
    // if (!isLast) {
    //   tabList.pop();
    // }
    return tabList;
  };

  // const handleDischarge = async () => {
  //   setConfirmLoading(true);
  //   await request(`${GGTJ_API}/sample/discharge?sampleId=${pid}`, {
  //     method: 'POST',
  //   }).then((res: any) => {
  //     if (res) {
  //       message.success('?????????????????????');
  //       dispatch({
  //         type: 'base/fetchBaseInfo',
  //         payload: { pid },
  //       });
  //       // const path = { keyPath: ['baselineInfo'] };
  //       // onClickMenuItem(path);
  //       // handleSubmitModalCancel();
  //     } else {
  //       message.error('?????????????????????');
  //     }
  //   });
  //   setConfirmLoading(false);
  // };

  return (
    <>
      <Card
        tabList={getTabList()}
        activeTabKey={key}
        onTabChange={(card_key) => {
          onTabChange(card_key);
        }}
      >
        {contentList[key]}
      </Card>
      {/* <Modal
        title="??????"
        visible={dischargeModalVisible}
        okText="??????"
        cancelText="??????"
        onOk={handleDischarge}
        onCancel={() => {
          setDischargeModalVisible(false);
        }}
        confirmLoading={confirmLoading}
      >
        ?????????????????????????????????X????????????????????????????????????
      </Modal> */}
    </>
  );
};

const mapStateToProps = ({
  global,
  AdmissionDay,
  base,
}: {
  global: GlobalStateType;
  AdmissionDay: AdmissionDayStateType;
  base: BaseStateType;
}) => {
  return {
    // userAuths: global.userAuths,
    cycleId: AdmissionDay.currentCycleId,
    isFirst: AdmissionDay.isFirst,
    //isLast???????????????????????????
    // isLast: AdmissionDay.isLast && !base.baseInfo?.isDischarge,
  };
};
export default connect(mapStateToProps)(Admission1DayPage);
