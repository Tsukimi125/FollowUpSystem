/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-02-01 18:10:17
 */

// 所有的字段
export const AllSelectedForm = [
  // 基线资料
  'Patient',
  'PastHis',
  'IniDiaPro',
  // 治疗
  'TreRec',
  'Surgery',
  'Radiotherapy',
  'OneToFive',
  // 实验室检查
  'BloodRoutine',
  'BloodBio',
  'Thyroid',
  'Coagulation',
  'MyocardialEnzyme',
  'Cytokines',
  'LymSubsets',
  'UrineRoutine',
  'TumorMarker',
  // 其他检查
  'Lung',
  'OtherExams',
  'ImageExams',
  // ---
  'Signs',
  'SideEffect',
  'Immunohis',
  'MoleDetec',
  // 随访信息
  'FollInfo',
];

// 全选字段，且导出记录数均为2时，计算总列数为817，实际表格总列数为1773（Excel列上限为16384）
// 在数据中，部分指标（如其它检查的一个字段会导出5个列字段，实验室检查的一个字段会导出3个列字段）
// 于是将colLimit大致设置为 16384/4 =4096
export const colLimit = 4096;
