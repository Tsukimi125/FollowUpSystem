import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { ModifyAdmissionPageDate } from './service';

export interface StateType {
  AdmissionPageDate?: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { modifyAdmissionPageDate: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'AdmissionPageDate',

  state: {
    AdmissionPageDate: undefined,
  },

  effects: {
    *modifyAdmissionPageDate({ payload }, { call, put }) {
      const data = yield call(ModifyAdmissionPageDate, payload);
      if (data) {
        message.success('保存成功！');
        yield put({
          type: 'cycle/fetchCycleInfo',
          payload: {
            cycleId: payload.cycleId,
          },
        });
      } else {
        message.error('保存失败！');
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
