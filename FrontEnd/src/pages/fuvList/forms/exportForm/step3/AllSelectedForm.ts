/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-01-30 01:04:32
 */

export const AllSelectedForm = [
  // 治疗信息
  'TreRec', // 0
  'Surgery',
  'Radiotherapy',
  'OneToFive',

  // 实验室检查
  'BloodRoutine', // 4
  'BloodBio',
  'Thyroid',
  'Coagulation',
  'MyocardialEnzyme',
  'Cytokines',
  'LymSubsets',
  'UrineRoutine',
  'TumorMarker', // 12

  // 其他检查
  'Lung', // 13
  'OtherExams',
  'ImageExams', // 15

  // 免疫组化和分子检测
  'Signs', // 16
  'SideEffect',
  'Immunohis',
  'MoleDetec',
];

export const AllSelectedFormTreeNodes = [
  {
    title: '治疗记录(TreRec)',
    value: 'TreRec',
  },
  {
    title: '手术(Surgery)',
    value: 'Surgery',
  },
  {
    title: '放疗(Radiotherapy)',
    value: 'Radiotherapy',
  },
  {
    title: '多线治疗方案(Multiple)',
    value: 'OneToFive',
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
    title: '症状体征(Signs)',
    value: 'Signs',
  },
  {
    title: '副反应(SideEffect)',
    value: 'SideEffect',
  },
];
