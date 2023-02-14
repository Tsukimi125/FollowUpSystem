/*
 * @Author: 947656035 947656035@qq.com
 * @Date: 2022-07-04 23:22:19
 * @LastEditors: 947656035 947656035@qq.com
 * @LastEditTime: 2022-07-12 10:19:54
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\DiseaseRelatedScale\model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import type { DiseaseRelatedScaleType } from './data';
import { ModifyDiseaseRelatedScale } from './service';

export interface StateType {
  diseaseRelatedScale?: DiseaseRelatedScaleType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { modifyDiseaseRelatedScale: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'diseaseRelatedScale',

  state: {
    diseaseRelatedScale: undefined,
  },

  effects: {
    *modifyDiseaseRelatedScale({ payload }, { call, put }) {
      // console.log('here is diseaseRelatedScale model modify payload :', payload);
      const data = yield call(ModifyDiseaseRelatedScale, payload);
      if (data) {
        message.success('保存病情相关信息成功！');
        yield put({
          type: 'cycle/fetchCycleInfo',
          payload: {
            cycleId: payload.cycleId,
          },
        });
      } else {
        message.error('保存病情相关信息失败！');
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
