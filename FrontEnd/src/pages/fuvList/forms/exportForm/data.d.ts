/*
 * @Descripttion: 基本信息数据格式
 * @Author: linkenzone
 * @Date: 2020-09-15 14:35:04
 */

export interface ExportDataType {
  pids: number[];
  treNums: number[];
  follInfoNum: number;
  baseLine?: ExportDetailDataType[];
  trementInfo?: ExportDetailDataType[];
  follInfo?: ExportDetailDataType;
}

interface ExportDetailDataType {
  table: string;
  column: string[];
}

// // 基线资料的导出字段
// export interface ExportBaseLineDataType {
//   // 基线资料
//   Patient?: ExportDetailDataType; // 0
//   PastHis?: ExportDetailDataType;
//   IniDiaPro?: ExportDetailDataType;
//   Immunohis?: ExportDetailDataType;
//   MoleDetec?: ExportDetailDataType; // 4
//   // 实验室检查
//   BloodRoutine?: ExportDetailDataType; // 5
//   BloodBio?: ExportDetailDataType;
//   Thyroid?: ExportDetailDataType;
//   Coagulation?: ExportDetailDataType;
//   MyocardialEnzyme?: ExportDetailDataType;
//   Cytokines?: ExportDetailDataType;
//   LymSubsets?: ExportDetailDataType;
//   UrineRoutine?: ExportDetailDataType;
//   TumorMarker?: ExportDetailDataType; // 13
//   // 其他检查
//   Lung?: ExportDetailDataType; // 14
//   OtherExams?: ExportDetailDataType;
//   ImageExams?: ExportDetailDataType; // 16
// }

// // 治疗的导出字段
// export interface ExportTrementInfoDataType {
//   // 治疗信息
//   TreRec?: ExportDetailDataType; // 0
//   Surgery?: ExportDetailDataType;
//   Radiotherapy?: ExportDetailDataType;
//   OneToFive?: ExportDetailDataType;
//   Signs?: ExportDetailDataType;
//   SideEffect?: ExportDetailDataType;
//   Immunohis?: ExportDetailDataType;
//   MoleDetec?: ExportDetailDataType; // 7
//   // 实验室检查
//   BloodRoutine?: ExportDetailDataType; // 8
//   BloodBio?: ExportDetailDataType;
//   Thyroid?: ExportDetailDataType;
//   Coagulation?: ExportDetailDataType;
//   MyocardialEnzyme?: ExportDetailDataType;
//   Cytokines?: ExportDetailDataType;
//   LymSubsets?: ExportDetailDataType;
//   UrineRoutine?: ExportDetailDataType;
//   TumorMarker?: ExportDetailDataType; // 16
//   // 其他检查
//   Lung?: ExportDetailDataType; // 17
//   OtherExams?: ExportDetailDataType;
//   ImageExams?: ExportDetailDataType; // 19
// }

// // 治疗的导出字段
// export interface ExportFollInfoDataType {
//   FollInfo?: ExportDetailDataType; // 0
// }
