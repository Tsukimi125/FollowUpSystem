/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2020-09-10 20:12:53
 */

import { MultipleChoiceDataType } from '@/models/data';

export interface FuvListItemDataType {
  age: number;
  gender: string;
  hospitalNumber: string;
  id: number;
  idNumber: string;
  name: string;
  patDia: MultipleChoiceDataType;
  patNumber: string;
  phoneNumber: string;
  monitor_status: any;
}

export interface SpecimenListItemDataType {
  patientName: string; // 患者姓名
  hospitalNumber: string; // 住院号
  idNumber: string;
  patNumber: string;
  id: number;
  pid: number;
  specimen_info: [];
}

export interface AddSampleDataType {
  pid: number;
  samples: FuvListItemDataType[];
  status: number;
}

export interface AddResearchDataType {
  name: string;
  description: string;
}
export interface ExportDataType {
  name: string;
  description: string;
}
