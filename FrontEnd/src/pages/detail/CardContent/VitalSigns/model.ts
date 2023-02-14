/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-03 15:59:26
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-03 16:02:36
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\VitalSigns\model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import type { VitalSignsType } from './data';
import { ModifyVitalSigns } from './service';

export interface StateType {
  vitalSigns?: VitalSignsType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { modifyVitalSigns: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'vitalSigns',

  state: {
    vitalSigns: undefined,
  },

  effects: {
    // *fetchVitalSigns({ payload }, { call, put }) {
    //   const data = yield call(FetchVitalSigns, payload);
    //   console.log('fetchVitalSigns data', data);

    //   if (data) {
    //     yield put({
    //       type: 'save',
    //       payload: {
    //         vitalSigns: Object.keys(data).length !== 0 ? data : undefined,
    //       },
    //     });
    //   }
    // },
    *modifyVitalSigns({ payload }, { call, put }) {
      const data = yield call(ModifyVitalSigns, payload);
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
