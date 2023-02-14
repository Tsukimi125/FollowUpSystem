import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { DiseaseBaseInfoType } from './data';
import { FetchDiseaseBaseInfo, ModifyDiseaseBaseInfo } from './service';

export interface StateType {
  diseaseBaseInfo?: DiseaseBaseInfoType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { fetchDiseaseBaseInfo: Effect; modifyDiseaseBaseInfo: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'diseaseBase',

  state: {
    diseaseBaseInfo: undefined,
  },

  effects: {
    *fetchDiseaseBaseInfo({ payload }, { call, put }) {
      const data = yield call(FetchDiseaseBaseInfo, payload);
      // console.log('fetchDiseaseBaseInfo data', data);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            diseaseBaseInfo: Object.keys(data).length !== 0 ? data : undefined,
          },
        });
      }
    },
    *modifyDiseaseBaseInfo({ payload }, { call, put }) {
      const data = yield call(ModifyDiseaseBaseInfo, payload);
      if (data) {
        message.success('保存疾病基本信息成功！');
        yield put({
          type: 'fetchDiseaseBaseInfo',
          payload: {
            pid: payload.pid,
          },
        });
      } else {
        message.error('保存疾病基本信息失败！');
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
