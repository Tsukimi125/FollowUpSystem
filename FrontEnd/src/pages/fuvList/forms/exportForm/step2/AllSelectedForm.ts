/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-01-29 23:25:02
 */

export const AllSelectedForm = [
  // 基线资料
  'Patient', // 0
  'PastHis',
  'IniDiaPro',

  // 实验室检查
  'BloodRoutine', // 3
  'BloodBio',
  'Thyroid',
  'Coagulation',
  'MyocardialEnzyme',
  'Cytokines',
  'LymSubsets',
  'UrineRoutine',
  'TumorMarker', // 11

  // 其他检查
  'Lung', // 12
  'OtherExams',
  'ImageExams', // 14

  // 免疫组化和分子检测
  'Immunohis', // 15
  'MoleDetec',
  'SpecimenInfo',
];

export const AllSelectedFormTreeNodes = [
  {
    title: '基本信息(Patient)',
    value: 'Patient',
  },
  {
    title: '既往史(PastHis)',
    value: 'PastHis',
  },
  {
    title: '初诊过程(IniDiaPro)',
    value: 'IniDiaPro',
  },

  {
    title: '实验室检查(labExam)',
    value: 'labExam',
    // selectable: false,
    children: [
      {
        title: '血常规(BloodRoutine)',
        value: 'BloodRoutine',
      },
      {
        title: '血生化(BloodBio)',
        value: 'BloodBio',
      },
      {
        title: '甲状腺功能(Thyroid)',
        value: 'Thyroid',
      },
      {
        title: '凝血功能(Coagulation)',
        value: 'Coagulation',
      },
      {
        title: '心肌酶谱(MyocardialEnzyme)',
        value: 'MyocardialEnzyme',
      },
      {
        title: '细胞因子(Cytokines)',
        value: 'Cytokines',
      },
      {
        title: '淋巴细胞亚群(LymSubsets)',
        value: 'LymSubsets',
      },
      {
        title: '尿常规(UrineRoutine)',
        value: 'UrineRoutine',
      },
      {
        title: '肿瘤标志物(TumorMarker)',
        value: 'TumorMarker',
      },
    ],
  },

  {
    title: '其他检查(otherExam)',
    value: 'otherExam',
    // selectable: false,
    children: [
      {
        title: '肺功能(Lung)',
        value: 'Lung',
      },
      {
        title: '其他检查(OtherExams)',
        value: 'OtherExams',
      },
      {
        title: '影像学检查(ImageExams)',
        value: 'ImageExams',
      },
    ],
  },

  {
    title: '免疫组化(Immunohis)',
    value: 'Immunohis',
  },
  {
    title: '分子检测(MoleDetec)',
    value: 'MoleDetec',
  },

  {
    title: '标本信息(SpecimenInfo)',
    value: 'SpecimenInfo',
  },
];
