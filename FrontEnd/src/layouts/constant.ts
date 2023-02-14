/*
 * @Author: linkenzone
 * @Date: 2021-07-19 20:32:55
 * @Descripttion: Do not edit
 */
export const treName = {
  one: '1线治疗',
  two: '2线治疗',
  three: '3线治疗',
  four: '4线治疗',
  five: '5线治疗',
  surgery: '手术治疗',
  radiotherapy: '放疗',
  other: '其他治疗',
};

export const trementSelectOptions = [
  {
    value: 'multiple',
    label: '多线治疗',
    children: [
      {
        value: '1',
        label: '1线',
      },
      {
        value: '2',
        label: '2线',
      },
      {
        value: '3',
        label: '3线',
      },
      {
        value: '4',
        label: '4线',
      },
      {
        value: '5',
        label: '5线',
      },
    ],
  },
  {
    value: 'surgery',
    label: '手术',
  },
  {
    value: 'radiotherapy',
    label: '放疗',
  },
  {
    value: 'other',
    label: '其他',
  },
];

export const specimentType = [
  {
    value: '血标本',
    label: '血标本',
    children: [
      {
        value: '血清',
        label: '血清',
      },
      {
        value: 'PBMC',
        label: 'PBMC',
      },
    ],
  },
  {
    value: '组织标本',
    label: '组织标本',
    children: [
      {
        value: '新鲜冰冻组织',
        label: '新鲜冰冻组织',
      },
      {
        value: '蜡块',
        label: '蜡块',
      },
      {
        value: '切片',
        label: '切片',
      },
    ],
  },
  {
    value: '胸腔积液',
    label: '胸腔积液',
  },
  {
    value: '腹腔积液',
    label: '腹腔积液',
  },
  {
    value: '脑脊液',
    label: '脑脊液',
  },
  {
    value: '其他',
    label: '其他',
  },
];

export const bioReasonOptions = [
  {
    value: 0,
    label: '初诊诊断',
  },
  {
    value: 1,
    label: '复发',
  },
  {
    value: 2,
    label: '靶向耐药',
  },
  {
    value: 3,
    label: '免疫耐药',
  },
  {
    value: 4,
    label: '特殊临床意义',
  },
  {
    value: 5,
    label: '其他',
  },
];

export const ModuleName = {
  BaseInfo: 'Patient',
  FirstDay: 'Patient',
  PastMedicalHistory: 'PastHis',
  DrugHistory: 'DrugHistory',
  FirstVisit: 'IniDiaPro',
  LaboratoryExamContent: '',
  OtherExamContent: '',
  ImmunohistochemistryContent: 'Immunohis',
  MolecularTestContent: 'MoleDetec',
  SpecimenInformation: 'SpecimenInfo',
  TreatmentRecord: 'DetailTrePlan',
  EfficacyEvaluationContent: 'TreRec',
  SymptomSignsContent: 'Signs',
  SideEffectsContent: 'SideEffect',
  // 其他检查
  Lung: 'Lung',
  OtherExams: 'OtherExams',
  ImageExams: 'ImageExams',
  // 实验室检查
  BloodRoutine: 'BloodRoutine',
  BloodBio: 'BloodBio',
  Thyroid: 'Thyroid',
  Coagulation: 'Coagulation',
  MyocardialEnzyme: 'MyocardialEnzyme',
  Cytokines: 'Cytokines',
  LymSubsets: 'LymSubsets',
  UrineRoutine: 'UrineRoutine',
  TumorMarker: 'TumorMarker',

  // ------
  OneToFive: 'OneToFive',
  Surgery: 'Surgery',
  Radiotherapy: 'Radiotherapy',
  FollInfo: 'FollInfo',
};

export const LungItem = {
  FVC: {
    name: 'FVC',
    label: '用力肺活量',
    code: 'FVC(L)',
  },
  FEV1_FVC: {
    name: 'FEV1_FVC',
    label: '用力呼气一秒率',
    code: 'FEV1/FVC(%)',
  },
  MEF: {
    name: 'MEF',
    label: '用力呼气中期流速',
    code: 'MEF(L/S)',
  },
  MEF25: {
    name: 'MEF25',
    label: '25%用力呼气流速',
    code: 'MEF25(L/S)',
  },
  MEF50: {
    name: 'MEF50',
    label: '50%用力呼气流速',
    code: 'MEF50(L/S)',
  },
  MEF75: {
    name: 'MEF75',
    label: '75%用力呼气流速',
    code: 'MEF75(L/S)',
  },
  TLC_sb: {
    name: 'TLC_sb',
    label: '肺总量',
    code: 'TLC’sb(L)',
  },
  RV: {
    name: 'RV',
    label: '残气容积',
    code: 'RV’(L)',
  },
  RV_TLC: {
    name: 'RV_TLC',
    label: '残气容积/肺总量比',
    code: 'RV’/TLC’(%)',
  },
  VC: {
    name: 'VC',
    label: '肺活量',
    code: 'VC(L)',
  },
  DLCO_ex: {
    name: 'DLCO_ex',
    label: '无需屏气弥散',
    code: 'DLCO-ex (mL/mmHg/Mi)',
  },
  DLCO_sb: {
    name: 'DLCO_sb',
    label: '肺一氧化碳弥散量',
    code: 'DLCO-sb (mL/mmHg/Mi)',
  },
  KCO: {
    name: 'KCO',
    label: '比弥散量',
    code: 'KCO',
  },
};
