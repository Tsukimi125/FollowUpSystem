import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { FetchCycleList, FetchResearchCentersList, FetchUserAuths } from '@/services/global';
// import { FetchRemindInfo, CloseRemind } from '@/components/RemindModal/service';
import type { ResearchCentersDataType, UserAuthsDataType } from './data';
// import { InGroupInfoDataType } from './data';

export interface StateType {
  userAuths: UserAuthsDataType;
  cycleList: any[];
  useAnonymousGlobal: boolean;
  researchCenters: ResearchCentersDataType[];
  admissionCycleList: any[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchCycleList: Effect;
    fetchResearchCentersList: Effect;
    fetchUserAuths: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'global',

  state: {
    cycleList: [],
    researchCenters: [],
    useAnonymousGlobal: false,
    userAuths: {
      can_analysis: false,
      can_deleteCRF: false,
      can_export: false,
      can_editCenterCRF: false,
      only_specimenInfo: false,
      can_removeFromResearch: false,
      can_addToResearch: false,
      can_viewRawData: false,
      can_reply: true,
      can_doubt: true,
      can_unlock: false,
    },
    admissionCycleList: [],
  },

  effects: {
    *fetchCycleList({ payload }, { call, put }) {
      const data = yield call(FetchCycleList, payload);
      // console.log('fetchCycleList', data);
      // 访视Type的杖举映射
      //   1：入科第1天
      //   2：出院或转出ICU 24小时内
      //   3：入组第30天
      //   4：入组第90天
      //   5：入组第180天
      //   6：入组第365天
      //   7：入科第x天
      if (data !== undefined && data !== null) {
        const newList: any[] = [];
        data.map((item: any) => {
          if (item.type === 7 || item.type === 1) {
            item.isFirst = false;
            item.isLast = false;
            newList.push(item);
          }
        });
        // console.log('newList', newList);
        if (newList.length) {
          newList.sort((a: any, b: any) => a.id - b.id);
          newList[0].isFirst = true;
          newList[newList.length - 1].isLast = true;
        }
        yield put({
          type: 'save',
          payload: {
            cycleList: data.sort((a: any, b: any) => a.type - b.type),
            admissionCycleList: newList,
          },
        });
      }
    },
    *fetchResearchCentersList({ payload }, { call, put }) {
      const data = yield call(FetchResearchCentersList, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            researchCenters: data,
          },
        });
      }
    },
    *fetchUserAuths({ payload }, { call, put }) {
      const data = yield call(FetchUserAuths, payload);
      // console.log('Auth', data);
      let can_export = false;
      let can_analysis = false;
      let can_deleteCRF = false;
      let can_editCenterCRF = false;
      let can_viewRawData = false;
      let can_reply = false;
      let can_doubt = false;
      let can_unlock = false;
      // 仅显示标本信息
      let only_specimenInfo = false;
      let can_removeFromResearch = false;
      let can_addToResearch = false;
      if (data) {
        for (const item of data) {
          // console.log(item)
          if (item === 'ExportSample') can_export = true;
          if (item === 'UnlockSample') can_unlock = true;

          if (item === 'Analysis') can_analysis = true;
          if (item === 'DeleteCRF') can_deleteCRF = true;
          if (item === 'EditCenterCRF') can_editCenterCRF = true;
          if (item === 'OperateAllSpeciInfo') only_specimenInfo = true;
          if (item === 'RemovePatientsFromResearch') can_removeFromResearch = true;
          if (item === 'AddPatientsIntoResearch') can_addToResearch = true;
          if (item === 'ViewRawData') can_viewRawData = true;
          if (item === 'Doubt') can_doubt = true;
          if (item === 'Reply') can_reply = true;
        }
        yield put({
          type: 'save',
          payload: {
            userAuths: {
              can_export,
              can_analysis,
              can_deleteCRF,
              can_editCenterCRF,
              only_specimenInfo,
              can_removeFromResearch,
              can_addToResearch,
              can_viewRawData,
              can_doubt,
              can_reply,
              can_unlock,
            },
          },
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default Model;
