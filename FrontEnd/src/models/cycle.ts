import type { Effect, Reducer } from 'umi';
import { FetchCycleInfo } from '@/services/global';

export interface StateType {
  cycleInfo: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchCycleInfo: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'cycle',

  state: {
    cycleInfo: {},
  },

  effects: {
    *fetchCycleInfo({ payload }, { call, put }) {
      const data = yield call(FetchCycleInfo, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            cycleInfo: data,
          },
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...payload };
    },
  },
};

export default Model;
