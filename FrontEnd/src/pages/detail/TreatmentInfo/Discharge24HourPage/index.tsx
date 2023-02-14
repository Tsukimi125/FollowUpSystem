import { getPid } from '@/utils/location';
import { Card, DatePicker, PageHeader } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import type { Dispatch, Loading } from 'umi';
import { connect } from 'umi';
import FirstDate from '../../CardContent/FirstDate';
import VitalSigns from '../../CardContent/VitalSigns';
import MentalScale from '../../CardContent/MentalScale';
import type { StateType as GlobalStateType } from '@/models/global';
import type { UserAuthsDataType } from '@/models/data';
import DiseaseRelatedScale from '../../CardContent/DiseaseRelatedScale';
import LabInspection from '../../CardContent/LabInspection';
import TreatmentEffect from '../../CardContent/TreatmentEffect';

interface Discharge24HourPageProps {
  dispatch: Dispatch;
  userAuths: UserAuthsDataType;
  cycleId: number;
}

const Discharge24HourPage: React.FC<Discharge24HourPageProps> = (props) => {
  const { userAuths, dispatch, cycleId } = props;
  const [key, setKey] = useState('FirstDate');
  const [pid, setPid] = useState<number>(getPid());
  // console.log('userAuths', userAuths);
  const treNum = 0;

  const onTabChange = (card_key: string) => {
    setKey(card_key);
  };

  const contentList = useMemo(
    () => ({
      // diseaseRelatedScale: <DiseaseRelatedScale pid={pid} cycleId={cycleId} />,
      LabInspection: <LabInspection pid={pid} cycleId={cycleId} />,
      TreatmentEffect: <TreatmentEffect pid={pid} cycleId={cycleId} />,
      FirstDate: <FirstDate pid={pid} cycleId={cycleId} />,
      VitalSigns: <VitalSigns pid={pid} cycleId={cycleId} />,
      MentalScale: <MentalScale pid={pid} cycleId={cycleId} />,
    }),
    [pid],
  );

  useEffect(() => {
    dispatch({
      type: 'cycle/fetchCycleInfo',
      payload: { cycleId },
    });
  }, []);

  const tabList = [
    {
      key: 'FirstDate',
      tab: '日期',
    },
    {
      key: 'VitalSigns',
      tab: '生命体征',
    },
    {
      key: 'MentalScale',
      tab: '精神量表评分',
    },
    // {
    //   key: 'diseaseRelatedScale',
    //   tab: '病情相关量表评分',
    // },
    {
      key: 'LabInspection',
      tab: '实验室检查',
    },
    {
      key: 'TreatmentEffect',
      tab: '治疗情况及效果',
    },
  ];

  return (
    <>
      <Card
        tabList={tabList}
        activeTabKey={key}
        onTabChange={(card_key) => {
          onTabChange(card_key);
        }}
      >
        {contentList[key]}
      </Card>
    </>
  );
};

const mapStateToProps = ({ global }: { global: GlobalStateType }) => {
  return {
    userAuths: global.userAuths,
    // cycleId: global.cycleList[1]?.id,
  };
};
export default connect(mapStateToProps)(Discharge24HourPage);
