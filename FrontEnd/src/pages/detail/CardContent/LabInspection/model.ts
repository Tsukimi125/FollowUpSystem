/*
 * @Author: 947656035 947656035@qq.com
 * @Date: 2022-07-04 23:22:19
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-28 19:54:54
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\LabInspection\model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import type { LabInspectionType } from './data';
import {
  ModifyArterialBloodGasInfo,
  ModifyCoagulationFunctionInfo,
  ModifyBloodBiochemistryInfo,
  ModifyInflammationIndicatorsInfo,
  ModifyBloodTestInfo,
  ModifySpecialInspectionInfo,
  FetchLabInspectionInfo,
  ModifyMicrobiomeInfo,
  ModifyRheumatism14Info,
  ModifyLymphocyteSubsetsInfo,
  ModifyCellFactorInfo,
  ModifyImmuneInfo,
  ModifyGmTestInfo,
  ModifyTuberculosisInfectionTCellTestInfo,
  ModifyMolecularInfo,
  ModifySciResearchProjectInfo,
} from './service';

export interface StateType {
  labInspectionInfo?: LabInspectionType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: { fetchLabInspectionInfo: Effect; modifyLabInspectionInfo: Effect };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'lab',

  state: {
    labInspectionInfo: undefined,
  },

  effects: {
    *fetchLabInspectionInfo({ payload }, { call, put }) {
      // console.log('here is lab model fetch info:', payload);
      const data = yield call(FetchLabInspectionInfo, payload);
      // console.log('here is labInspectionInfo data :', data);
      if (data) {
        yield put({
          type: 'save',
          payload: {
            labInspectionInfo: Object.keys(data).length !== 0 ? data : undefined,
          },
        });
      }
    },
    *modifyLabInspectionInfo({ payload }, { call, put }) {
      // console.log('here is modify payload :', payload);
      const { body, labTest, item } = payload;
      const ModifyFunction = [
        ModifyInflammationIndicatorsInfo,
        ModifyBloodTestInfo,
        ModifyBloodBiochemistryInfo,
        ModifyCoagulationFunctionInfo,
        ModifyArterialBloodGasInfo,
        ModifySpecialInspectionInfo,
        ModifyMicrobiomeInfo,
        ModifyRheumatism14Info,
        ModifyLymphocyteSubsetsInfo,
        ModifyCellFactorInfo,
        ModifyImmuneInfo,
        ModifyGmTestInfo,
        ModifyTuberculosisInfectionTCellTestInfo,
        ModifyMolecularInfo,
        ModifySciResearchProjectInfo,
      ];
      const ModifyFun = ModifyFunction[item];
      const data = yield call(ModifyFun, { labTest, body });
      if (data) {
        message.success('保存信息成功！');
        yield put({
          type: 'fetchLabInspectionInfo',
          payload: {
            labTest: payload.labTest,
          },
        });
      } else {
        message.error('保存信息失败！');
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      // console.log('here is lab model save payload :', payload);
      return { ...state, ...payload };
    },
  },
};

export default Model;
