/*
 * @Author: 947656035 947656035@qq.com
 * @Date: 2022-07-05 10:34:54
 * @LastEditors: 947656035 947656035@qq.com
 * @LastEditTime: 2022-07-05 10:42:11
 * @FilePath: \ggtj-frontend\src\pages\detail\BaselineInfoPage\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getPid } from '@/utils/location';
import { Card, DatePicker, PageHeader } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import type { Dispatch, Loading } from 'umi';
import { connect } from 'umi';

import BaseInfo from '../CardContent/BaseInfo';
import DiseaseBaseInfo from '../CardContent/DiseaseBaseInfo';
import SampleFilter from '../CardContent/SampleFilter';
import MriDwi from '../CardContent/MriDwi';

import { StateType } from '@/pages/detail/CardContent/BaseInfo/model';
import type { StateType as GlobalStateType } from '@/models/global';
import { ModuleName } from '@/layouts/constant';
// import styles from './style.less'
import type { UserAuthsDataType } from '@/models/data';

interface BaseLineInfoProps {
  dispatch: Dispatch;
  userAuths: UserAuthsDataType;
}

const BaseLineInfoPage: React.FC<BaseLineInfoProps> = (props) => {
  const { userAuths, dispatch } = props;
  const [key, setKey] = useState('BaseInfo');
  const [pid, setPid] = useState<number>(getPid());
  // const [tabList, setTabList] = useState(tabListNoTitle);
  // console.log('userAuths', userAuths);
  const treNum = 0;

  const onTabChange = (card_key: string) => {
    setKey(card_key);
  };

  const contentList = useMemo(
    () => ({
      BaseInfo: <BaseInfo pid={pid} />,
      DiseaseBaseInfo: <DiseaseBaseInfo pid={pid} />,
      SampleFilter: <SampleFilter pid={pid} />,
      MriDwi: <MriDwi pid={pid} />,
    }),
    [pid],
  );

  const tabList = [
    {
      key: 'BaseInfo',
      tab: '基本信息',
    },

    {
      key: 'DiseaseBaseInfo',
      tab: '疾病基本信息',
    },
    {
      key: 'SampleFilter',
      tab: '受试者筛选',
    },
    {
      key: 'MriDwi',
      tab: 'MRI+DWI影像学检查',
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
        // style={{ width: '100%' }}
        // className={style.custom_card_body}
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
export default connect(mapStateToProps)(BaseLineInfoPage);
