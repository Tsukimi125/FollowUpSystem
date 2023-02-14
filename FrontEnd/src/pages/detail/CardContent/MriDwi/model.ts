/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-03 15:59:26
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-03 17:22:46
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\MriDwi\model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import type { MriDwiType } from './data';
import { ModifyMriDwi, FetchMriDwi } from './service';

export interface StateType {
  mriDwi?: MriDwiType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { modifyMriDwi: Effect; fetchMriDwi: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'mriDwi',

  state: {
    mriDwi: undefined,
  },

  effects: {
    *fetchMriDwi({ payload }, { call, put }) {
      const data = yield call(FetchMriDwi, payload);
      // console.log('fetchMriDwi data', data);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            mriDwi: Object.keys(data).length !== 0 ? data : undefined,
          },
        });
      }
    },
    *modifyMriDwi({ payload }, { call, put }) {
      const data = yield call(ModifyMriDwi, payload);
      if (data) {
        message.success('保存成功！');
        yield put({
          type: 'fetchMriDwi',
          payload: {
            pid: payload.pid,
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
