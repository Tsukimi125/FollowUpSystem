import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import type { FirstDateType } from './data';
import { ModifyFirstDate } from './service';

export interface StateType {
  firstDate?: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { modifyFirstDate: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'firstDate',

  state: {
    firstDate: undefined,
  },

  effects: {
    // *fetchFirstDate({ payload }, { call, put }) {
    //   const data = yield call(FetchFirstDate, payload);
    //   console.log('fetchFirstDate data', data);

    //   if (data) {
    //     yield put({
    //       type: 'save',
    //       payload: {
    //         firstDate: Object.keys(data).length !== 0 ? data : undefined,
    //       },
    //     });
    //   }
    // },
    *modifyFirstDate({ payload }, { call, put }) {
      const data = yield call(ModifyFirstDate, payload);
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
