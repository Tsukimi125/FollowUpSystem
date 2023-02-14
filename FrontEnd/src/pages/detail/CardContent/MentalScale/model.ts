/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-03 15:59:26
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-03 16:40:12
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\MentalScale\model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import type { MentalScaleType } from './data';
import { ModifyMentalScale } from './service';

export interface StateType {
  mentalScale?: MentalScaleType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { modifyMentalScale: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'mentalScale',

  state: {
    mentalScale: undefined,
  },

  effects: {
    // *fetchMentalScale({ payload }, { call, put }) {
    //   const data = yield call(FetchMentalScale, payload);
    //   console.log('fetchMentalScale data', data);

    //   if (data) {
    //     yield put({
    //       type: 'save',
    //       payload: {
    //         mentalScale: Object.keys(data).length !== 0 ? data : undefined,
    //       },
    //     });
    //   }
    // },
    *modifyMentalScale({ payload }, { call, put }) {
      const data = yield call(ModifyMentalScale, payload);
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
