/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-01-29 15:47:17
 */
import { Effect, Reducer } from 'umi';
import { notification } from 'antd';
import { ExportFuv, FetchMaxAmount, FetchMaxTreIndex, ExportFuvAnonymous } from './service';
import { ExportDataType } from './data';

export interface StateType {
  current: number;
  steps: number[];
  isExportAll: boolean;
  form: ExportDataType;
  max_treIndex: number;
  max_amount: number;
  data_mask: number;
}

const init_data: StateType = {
  current: 0,
  steps: [0, 1, 2, 3, 4],
  isExportAll: false,
  max_treIndex: 0,
  max_amount: 999,
  data_mask: 1,
  form: {
    pids: [],
    treNums: [0],
    follInfoNum: 1,
    baseLine: [
      {
        table: 'Patient',
        column: [
          'patientName',
          'age',
          'researchCenter',
          'idNumber',
          'hospitalNumber',
          'patNumber',
          'gender',
          'birthday',
          'phoneNumber1',
          'phoneNumber2',
        ],
      },
    ],
  },
};

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
    submitStepFormAnonymous: Effect;
    fetchMaxTreIndex: Effect;
    fetchMaxAmount: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    saveFormData: Reducer<StateType>;
    clear: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'exportData',

  state: init_data,

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield ExportFuv(payload).then((data: any) => {
        // console.log('data', data);
        if (data.code) {
          notification.error({ message: data.msg, description: data.request });
          return;
        }

        // // create BOM UTF-8
        // const buffer = new ArrayBuffer(3);
        // const dataView = new DataView(buffer);
        // dataView.setUint8(0, 0xfe);
        // dataView.setUint8(1, 0xbb);
        // dataView.setUint8(2, 0xbf);
        // const read = new Uint8Array(buffer);

        // type 为需要导出的文件类型，此处为xls表格类型
        // const blob = new Blob([data], { type: 'application/x-xlsx;charset=utf-8' });
        const blob = new Blob(['\ufeff', data], { type: 'text/csv;charset=utf-8' });

        // 创建下载链接
        const downloadHref = window.URL.createObjectURL(blob);
        // 创建a标签并为其添加属性
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadHref;
        downloadLink.download = '样本数据.csv';
        // 触发点击事件执行下载
        downloadLink.click();
      });

      // 请求之后
      //   yield put({
      //     type: 'saveStepFormData',
      //     payload,
      //   });
      //   yield put({
      //     type: 'saveCurrentStep',
      //     payload: 'result',
      //   });
    },

    *fetchMaxTreIndex({ payload }, { call, put }) {
      // console.log('model fetchMaxTreIndex payload', payload);
      const data = yield call(FetchMaxTreIndex, payload);
      // console.log('model fetchMaxTreIndex', data);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            max_treIndex: data,
          },
        });
      }
    },

    *fetchMaxAmount({ payload }, { call, put }) {
      const data = yield call(FetchMaxAmount, payload);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            max_amount: data,
          },
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    saveFormData(state, { payload }) {
      console.log('model saveFormData', {
        ...state,
        form: {
          ...(state as StateType).form,
          ...payload,
        },
      });
      if (state) {
        return {
          ...state,
          form: {
            ...(state as StateType).form,
            ...payload,
          },
        };
      }
      return init_data;
    },

    /**
     * @description: 清理数据
     * @Param:
     * @param {*} state
     */
    clear(state) {
      if (state) {
        init_data.form.pids = state.form.pids;
      }
      return init_data;
    },
  },
};

export default Model;
