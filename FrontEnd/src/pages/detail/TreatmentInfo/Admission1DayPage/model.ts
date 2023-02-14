import { Effect, Reducer } from 'umi';
import { message } from 'antd';

export interface StateType {
  currentCycleId: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'AdmissionDay',
  state: {
    currentCycleId: -1,
    isFirst: false,
    isLast: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default Model;
