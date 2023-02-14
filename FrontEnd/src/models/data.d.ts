/*
 * @Descripttion: 全局使用的数据类型
 * @Author: linkenzone
 * @Date: 2020-09-06 21:24:32
 */

export interface UseInfoDataType {
  account: string;
  department: string;
  email: string;
  id: number;
  id_card: string;
  is_super: 1;
  name: string;
  office: string;
  phone: string;
  research_center_id: number;
  research_center_name: string;
  length: number;
}

/**
 * @description: 存在其他的多选框
 * @Param:
 */
export interface MultipleChoiceDataType {
  other: string | null | undefined;
  radio: string[] | null | undefined;
}

export interface ResearchCentersDataType {
  id: number;
  name: string;
}

export interface UserAuthsDataType {
  can_export: boolean;
  can_analysis: boolean;
  can_deleteCRF: boolean;
  can_editCenterCRF: boolean;
  only_specimenInfo: boolean;
  can_removeFromResearch: boolean;
  can_addToResearch: boolean;
  can_viewRawData: boolean;
  can_doubt: boolean;
  can_reply: boolean;
  can_unlock: boolean;
}

export interface CliniDiaType {
  blo_tum?: string;
  bone_tum?: string;
  bre_can?: string;
  dig_tum?: string;
  eso_can?: string;
  gen_tum?: string;
  head_neck_tum?: string;
  lung_can?: string;
  other?: string;
  soft_tis_sar?: string;
  thy_can?: string;
}
