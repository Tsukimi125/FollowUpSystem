import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { SampleFilterType } from './data';
import { FetchSampleFilter, ModifySampleFilter } from './service';

export interface StateType {
  sampleFilter?: SampleFilterType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { fetchSampleFilter: Effect; modifySampleFilter: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'sampleFilter',

  state: {
    sampleFilter: undefined,
  },

  effects: {
    *fetchSampleFilter({ payload }, { call, put }) {
      const data = yield call(FetchSampleFilter, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            sampleFilter: Object.keys(data).length !== 0 ? data : undefined,
          },
        });
      }
    },
    *modifySampleFilter({ payload }, { call, put }) {
      const data = yield call(ModifySampleFilter, payload);
      if (data) {
        message.success('保存疾病基本信息成功！');
        yield put({
          type: 'fetchSampleFilter',
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
