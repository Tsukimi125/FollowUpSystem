/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-06 17:54:05
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-06 20:59:55
 * @FilePath: \ggtj-frontend-1\src\pages\detail\CardContent\BaseInfo\model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { BaseInfoType } from './data';
import { FetchBaseInfo, ModifyBaseInfo } from './service';

export interface StateType {
  baseInfo?: BaseInfoType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { fetchBaseInfo: Effect; modifyBaseInfo: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'base',

  state: {
    baseInfo: undefined,
  },

  effects: {
    *fetchBaseInfo({ payload }, { call, put }) {
      const data = yield call(FetchBaseInfo, payload);
      // console.log('fetchBaseInfo data', data);

      if (data) {
        yield put({
          type: 'save',
          payload: {
            baseInfo: Object.keys(data).length !== 0 ? data : undefined,
          },
        });
      }
    },
    *modifyBaseInfo({ payload }, { call, put }) {
      // console.log('payload', payload);

      const data = yield call(ModifyBaseInfo, payload);
      if (data) {
        message.success('保存基本信息成功！');
        yield put({
          type: 'fetchBaseInfo',
          payload: {
            pid: payload.pid,
          },
        });
      } else {
        message.error('保存基本信息失败！');
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
