/*
 * @Author: 947656035 947656035@qq.com
 * @Date: 2022-07-04 23:22:19
 * @LastEditors: 947656035 947656035@qq.com
 * @LastEditTime: 2022-07-06 18:23:22
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\DiseaseRelatedScale\model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import type { TreatmentEffectType } from './data';
import { ModifyTreatmentInfo } from './service';

export interface StateType {
  treatmentInfo?: TreatmentEffectType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { modifyTreatmentInfo: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'treatment',

  state: {
    treatmentInfo: undefined,
  },

  effects: {
    // *fetchTreatmentInfo({ payload }, { call, put }) {
    //   // console.log('fetchDiseaseRelatedScale here');
    //   const data = yield call(FetchTreatmentInfo, payload);
    //   // console.log('fetchTreatmentInfo data', data);

    //   if (data) {
    //     yield put({
    //       type: 'save',
    //       payload: {
    //         treatmentInfo: Object.keys(data).length !== 0 ? data : undefined,
    //       },
    //     });
    //   }
    // },
    *modifyTreatmentInfo({ payload }, { call, put }) {
      const data = yield call(ModifyTreatmentInfo, payload);
      if (data) {
        message.success('保存信息成功！');
        yield put({
          type: 'cycle/fetchCycleInfo',
          payload: {
            cycleId: payload.cycleId,
          },
        });
      } else {
        message.error('保存信息失败！');
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
