/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-10 20:12:59
 */

import { Effect, Reducer } from 'umi';
import { message, notification } from 'antd';
import { FuvListItemDataType, SpecimenListItemDataType } from './data';
import {
  FetchFuvList,
  AddFuv,
  DeleteFuv,
  ExportFuv,
  UnlockFuv,
  FetchSpecimenList,
  FetchAllResearch,
  FetchPatientsInResearch,
  AddPatientsToResearch,
  DelPatientsFromResearch,
  DeleteSearch,
} from './service';

export interface StateType {
  fuvList: FuvListItemDataType[];
  allResearch: any[];
  specimenList: SpecimenListItemDataType[];
  total: number;
  all_pids: [];
  // monitor_status: any;
  // patientsInResearch: any[];
  // allPatientIds: [];
  // patientsTotalInResearch: number;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchFuvList: Effect;
    // fetchSpecimenList: Effect;
    // fetchAllResearch: Effect;
    // fetchPatientsInResearch: Effect;
    // addPatientsToResearch: Effect;
    // delPatientsFromResearch: Effect;
    // delResearch: Effect;
    addFuv: Effect;
    deleteFuv: Effect;
    exportFuv: Effect;
    unlockFuv: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'fuvList',

  state: {
    fuvList: [],
    specimenList: [],
    total: 0,
    all_pids: [],
    allResearch: [],
    // monitor_status: {},
    // patientsInResearch: [],
    // allPatientIds: [],
    // patientsTotalInResearch: 0,
  },

  effects: {
    *fetchFuvList({ payload }, { call, put }) {
      // console.log('model fetchFuvList payload', payload);
      const data = yield call(FetchFuvList, payload);
      // console.log('here is mock list data :', data);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            fuvList: data.list,
            total: data.total,
            all_pids: data.all_pids,
            // monitor_status: data.data.monitor_status,
          },
        });
      }
    },
    // *fetchPatientsInResearch({ payload }, { call, put }) {
    //   // console.log('fetchPatientsInResearch payload', payload);
    //   const data = yield call(FetchFuvList, payload);
    //   // console.log('fetchPatientsInResearch 结果', data);
    //   if (data) {
    //     yield put({
    //       type: 'save',
    //       payload: {
    //         patientsInResearch: data.data,
    //         patientsTotalInResearch: data.total,
    //         allPatientIds: data.all_pids,
    //       },
    //     });
    //   } else {
    //     yield put({
    //       type: 'save',
    //       payload: {
    //         patientsInResearch: null,
    //         patientsTotalInResearch: 0,
    //         allPatientIds: [],
    //       },
    //     });
    //   }
    //   return data;
    // },
    // *fetchAllResearch({ payload }, { call, put }) {
    //   const data = yield call(FetchAllResearch, {});
    //   // console.log('model RESEARCH', data);
    //   if (data) {
    //     yield put({
    //       type: 'save',
    //       payload: {
    //         allResearch: data,
    //       },
    //     });
    //   }
    // },
    // *fetchSpecimenList({ payload }, { call, put }) {
    //   // console.log('model fetchSpecimenList payload', payload);
    //   const data = yield call(FetchSpecimenList, payload);
    //   // console.log('model fetchSpecimenList', data);
    //   if (data) {
    //     yield put({
    //       type: 'save',
    //       payload: {
    //         specimenList: data.data,
    //         total: data.total,
    //         all_pids: data.all_pids,
    //       },
    //     });
    //   }
    // },
    *addFuv({ payload }, { call }) {
      const data = yield call(AddFuv, payload);
      if (data) {
        message.success('新增样本成功！');
      }
    },
    // *addPatientsToResearch({ payload }, { call }) {
    //   const data = yield call(AddPatientsToResearch, payload);
    //   if (data) {
    //     // console.log('病人-添加结果：',data)
    //     message.success('添加病人成功！');
    //   }
    // },
    *deleteFuv({ payload }, { call }) {
      const data = yield call(DeleteFuv, payload);
      if (data) {
        message.success('删除样本成功！');
      }
    },
    *unlockFuv({ payload }, { call }) {
      const data = yield call(UnlockFuv, payload);
      if (data) {
        message.success('解锁样本成功！');
      }
    },
    // *delPatientsFromResearch({ payload }, { call, put, select }) {
    //   const data = yield call(DelPatientsFromResearch, payload);
    //   if (data) {
    //     message.success('移除病人成功！');
    //   }
    // },
    // *delResearch({ payload }, { call, put }) {
    //   const data = yield call(DeleteSearch, payload);
    //   if (data) {
    //     yield put({
    //       type: 'fetchAllResearch',
    //     });
    //     message.success('删除研究成功！');
    //   }
    // },
    *exportFuv({ payload }, { call }) {
      //   const data = yield call(ExportFuv, payload);
      //   if (data) {
      //     message.success('导出样本成功！');
      //   }
      // },
      yield ExportFuv(payload).then((data: any) => {
        // console.log('data', data);
        // if (data.code) {
        //   notification.error({ message: data.msg, description: data.request });
        //   return;
        // }
        // type 为需要导出的文件类型，此处为xls表格类型
        const blob = new Blob([data], { type: 'application/x-xlsx;charset=utf-8' });
        // const file = new File([data], 'sample.xlsx', { type: 'application/x-xlsx;charset=utf-8' })
        // 创建下载链接
        const downloadHref = window.URL.createObjectURL(blob);

        // 创建a标签并为其添加属性
        const downloadLink = document.createElement('a');

        downloadLink.href = downloadHref;
        downloadLink.download = '样本数据.xlsx';
        // 触发点击事件执行下载
        downloadLink.click();
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default Model;
