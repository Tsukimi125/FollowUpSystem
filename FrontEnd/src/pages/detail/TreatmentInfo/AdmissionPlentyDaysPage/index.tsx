import { getPid } from '@/utils/location';
import { Card, DatePicker, PageHeader } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import type { Dispatch, Loading } from 'umi';
import { connect } from 'umi';

import FirstDate from '../../CardContent/FirstDate';
import MentalScale from '../../CardContent/MentalScale';

import type { StateType as GlobalStateType } from '@/models/global';
import type { UserAuthsDataType } from '@/models/data';

interface AdmissionPlentyDaysPageProps {
  dispatch: Dispatch;
  userAuths: UserAuthsDataType;
  cycleId: number;
}

const AdmissionPlentyDaysPage: React.FC<AdmissionPlentyDaysPageProps> = (props) => {
  const { userAuths, dispatch, cycleId } = props;
  const [key, setKey] = useState('FirstDate');
  const [pid, setPid] = useState<number>(getPid());
  // console.log('userAuths', userAuths);

  const onTabChange = (card_key: string) => {
    setKey(card_key);
  };

  const contentList = useMemo(
    () => ({
      FirstDate: <FirstDate pid={pid} cycleId={cycleId} />,
      MentalScale: <MentalScale pid={pid} cycleId={cycleId} />,
    }),
    [pid, cycleId],
  );

  // console.log('cycleId', cycleId);

  useEffect(() => {
    dispatch({
      type: 'cycle/fetchCycleInfo',
      payload: { cycleId },
    });
    setKey('FirstDate');
  }, [cycleId]);

  const tabList = [
    {
      key: 'FirstDate',
      tab: '日期',
    },
    {
      key: 'MentalScale',
      tab: '精神量表评分',
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
  };
};
export default connect(mapStateToProps)(AdmissionPlentyDaysPage);
