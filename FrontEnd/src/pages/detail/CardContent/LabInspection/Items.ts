import type { FormItemType } from '@/components/FormWithItems/data';

// 微生物组
export const Microbiome: FormItemType[] = [
  {
    label: '成人血培养+药敏（需氧菌+厌氧菌）',
    name: 'adultBloodCulture',
    componentType: 'string',
    remarks: '双侧双套送检，首套需为抗生素使用前',
  },
  {
    label: '普通细菌培养+药敏（非血非痰）',
    name: 'normalBacteriumCulture',
    componentType: 'string',
    remarks: '根据临床情况，局部感染部位送检',
  },
  {
    label: '真菌培养+药敏（非血）',
    name: 'fungalCulture',
    componentType: 'string',
    remarks: '根据临床情况，局部感染部位送检',
  },
  {
    label: '厌氧菌培养（非血）',
    name: 'anaerobicCulture',
    componentType: 'string',
    remarks: '根据临床情况，局部感染部位送检',
  },
  {
    label: '痰培养+药敏',
    name: 'sputumCulture',
    componentType: 'string',
    remarks: '根据临床情况，局部感染部位送检',
  },
  {
    label: '结核杆菌抗酸涂片+培养',
    name: 'tubercleBacillusCulture',
    componentType: 'string',
    remarks: '根据临床情况，局部感染部位送检',
  },
  {
    label: '微生物NGS(40种)',
    name: 'microbeNgs',
    componentType: 'string',
  },
];

// 风湿全套14
export const RheumatismFullSet: FormItemType[] = [
  {
    label: '抗核抗体',
    name: 'antinuclearAntibody',
    componentType: 'string',
  },
  {
    label: '抗双链DNA抗体',
    name: 'aniDna',
    componentType: 'string',
  },
  {
    label: '抗核染色质抗体',
    name: 'antinuclearChromatinAntibody',
    componentType: 'string',
  },
  {
    label: '抗RNP A抗体',
    name: 'aniRnpA',
    componentType: 'string',
  },
  {
    label: '抗RNP 68抗体',
    name: 'aniRnp68',
    componentType: 'string',
  },
  {
    label: '抗Sm/nRNP抗体',
    name: 'aniSmNrnp',
    componentType: 'string',
  },
  {
    label: '抗Sm抗体',
    name: 'aniSm',
    componentType: 'string',
  },
  {
    label: '抗SS-A抗体',
    name: 'aniSsA',
    componentType: 'string',
  },
  {
    label: '抗RO-52抗体',
    name: 'aniRo52',
    componentType: 'string',
  },
  {
    label: '抗SS-B抗体',
    name: 'aniSsB',
    componentType: 'string',
  },
  {
    label: '抗Scl-70抗体',
    name: 'aniScl70',
    componentType: 'string',
  },
  {
    label: '抗Jo-1抗体',
    name: 'aniJo1',
    componentType: 'string',
  },
  {
    label: '抗着丝点B蛋白抗体',
    name: 'aniCentromereBProtein',
    componentType: 'string',
  },
  {
    label: '抗染色质抗体',
    name: 'aniChromatin',
    componentType: 'string',
  },
  {
    label: '核糖体P蛋白',
    name: 'ribosomalPProtein',
    componentType: 'string',
  },
];

// 淋巴细胞亚群
export const LymphocyteSubsets: FormItemType[] = [
  {
    label: '总T淋巴细胞（CD3+CD19-）',
    name: 'tlymphocytesP',
    componentType: 'number',
    unit: '%',
  },
  {
    label: '总T淋巴细胞（CD3+CD19-）',
    name: 'tlymphocytesC',
    componentType: 'number',
    unit: '#',
  },
  {
    label: '总B淋巴细胞（CD3-CD19+）',
    name: 'blymphocytesP',
    componentType: 'number',
    unit: '%',
  },
  {
    label: '总B淋巴细胞（CD3-CD19+）',
    name: 'blymphocytesC',
    componentType: 'number',
    unit: '#',
  },
  {
    label: '辅助/诱导性T淋巴细胞（CD3+CD4+）',
    name: 'inducibleTLymphocytesP',
    componentType: 'number',
    unit: '%',
  },
  {
    label: '辅助/诱导性T淋巴细胞（CD3+CD4+）',
    name: 'inducibleTLymphocytesC',
    componentType: 'number',
    unit: '#',
  },
  {
    label: '抑制/细胞毒性T淋巴细胞（CD3+CD8+）',
    name: 'cytotoxicTLymphocytesP',
    componentType: 'number',
    unit: '%',
  },
  {
    label: '抑制/细胞毒性T淋巴细胞（CD3+CD8+）',
    name: 'cytotoxicTLymphocytesC',
    componentType: 'number',
    unit: '#',
  },
  {
    label: 'NK细胞（CD3-/CD16+CD56+）',
    name: 'nkCellP',
    componentType: 'number',
    unit: '%',
  },
  {
    label: 'NK细胞（CD3-/CD16+CD56+）',
    name: 'nkCellC',
    componentType: 'number',
    unit: '#',
  },
  {
    label: 'NK-T细胞（CD3+CD56+）',
    name: 'nkTCellP',
    componentType: 'number',
    unit: '%',
  },
  {
    label: 'NK-T细胞（CD3+CD56+）',
    name: 'nkTCellC',
    componentType: 'number',
    unit: '#',
  },
  {
    label: 'T淋巴细胞+B淋巴细胞+NK细胞',
    name: 'tbnkCellP',
    componentType: 'number',
    unit: '%',
  },
  {
    label: 'T淋巴细胞+B淋巴细胞+NK细胞',
    name: 'tbnkCellC',
    componentType: 'number',
    unit: '#',
  },
  {
    label: 'Th/Ts',
    name: 'thTs',
    componentType: 'number',
  },
];

// 细胞因子
export const Cytokine: FormItemType[] = [
  {
    label: 'IFN-γ',
    name: 'ifnY',
    componentType: 'number',
  },
  {
    label: 'TNF-α',
    name: 'tnfAlpha',
    componentType: 'number',
  },
  {
    label: '白介素10',
    name: 'interleukin10',
    componentType: 'number',
  },
  {
    label: '白介素6',
    name: 'interleukin6',
    componentType: 'number',
  },
  {
    label: '白介素4',
    name: 'interleukin4',
    componentType: 'number',
  },
  {
    label: '白介素2',
    name: 'interleukin2',
    componentType: 'number',
  },
];

// - 免疫全套IgGAM,C3
export const IgGAMC3: FormItemType[] = [
  {
    label: 'IgA',
    name: 'lgA',
    componentType: 'number',
  },
  {
    label: 'IgG',
    name: 'lgG',
    componentType: 'number',
  },
  {
    label: 'IgM',
    name: 'lgM',
    componentType: 'number',
  },
  {
    label: 'C3',
    name: 'c3',
    componentType: 'number',
  },
  {
    label: 'C4',
    name: 'c4',
    componentType: 'number',
  },
];

// GM试验-曲霉菌半乳甘露聚糖检测
export const GMTest: FormItemType[] = [
  {
    label: '真菌（1-3）-β-D葡聚糖',
    name: 'fungalBDGlucan',
    componentType: 'number',
  },
  {
    label: '曲霉菌半乳甘露聚糖',
    name: 'aspergillusGalactomannan',
    componentType: 'number',
  },
];

// 结核感染T细胞检测（文本格式）
export const TuberculosisInfectionTCellTest: FormItemType[] = [
  {
    label: '结核感染T细胞检测',
    name: 'tuberculosisInfectionTCellTest',
    componentType: 'string',
  },
];

// 分子组
export const MolecularGroup: FormItemType[] = [
  {
    label: 'EB病毒核酸检测',
    name: 'ebVirusNucleicAcid',
    componentType: 'string',
  },
  {
    label: '血浆EBV核酸定量',
    name: 'ebvNucleicAcidQuantification',
    componentType: 'string',
  },
  {
    label: '甲型流感',
    name: 'fluA',
    componentType: 'string',
  },
  {
    label: '乙型流感',
    name: 'fluB',
    componentType: 'string',
  },
  {
    label: '呼吸道合胞病毒',
    name: 'rsv',
    componentType: 'string',
  },
  {
    label: '腺病毒',
    name: 'adv',
    componentType: 'string',
  },
  {
    label: '副流感病毒1,2,3型',
    name: 'piv',
    componentType: 'string',
  },
  {
    label: '其他可疑病原菌核酸检测',
    name: 'others',
    componentType: 'string',
  },
];

// 科研项目（文本格式）
export const ScientificResearchProjects: FormItemType[] = [
  {
    label: '单核细胞分布宽度（血常规）+外周血细胞形态',
    name: 'cellWidthMorphology',
    componentType: 'string',
    remarks: '需保存形态扫描图和仪器分类图、中性粒细胞参数 （若有，可添加）',
  },
  {
    label: '数字PCR',
    name: 'digitalPcr',
    componentType: 'string',
    remarks: '一次性使用游离DNA保存管',
  },
  {
    label: 'Presepsin（sCD14-亚型）',
    name: 'presepsin',
    componentType: 'string',
  },
  {
    label: 'Film array病毒检测',
    name: 'filmArrayVirusCheck',
    componentType: 'string',
  },
  {
    label: '凝血酶-抗凝血酶复合物（TAT）',
    name: 'tat',
    componentType: 'string',
  },
  {
    label: '复合物',
    name: 'compound',
    componentType: 'string',
  },
];

// 血常规
export const BloodRoutine: FormItemType[] = [
  {
    label: '白细胞计数',
    name: 'wbc',
    componentType: 'number',
  },
  {
    label: '中性粒细胞百分比',
    name: 'neutrophilPercentage',
    componentType: 'number',
  },
  {
    label: '中性粒细胞',
    name: 'neutrophil',
    componentType: 'number',
  },
  {
    label: '淋巴细胞百分比',
    name: 'lymphocytesPercentage',
    componentType: 'number',
  },
  {
    label: '淋巴细胞',
    name: 'lymphocytes',
    componentType: 'number',
  },
  {
    label: '单核细胞百分比',
    name: 'monocytesPercentage',
    componentType: 'number',
  },
  {
    label: '单核细胞',
    name: 'monocytes',
    componentType: 'number',
  },
  {
    label: '嗜酸细胞百分比',
    name: 'acidophilPercentage',
    componentType: 'number',
  },
  {
    label: '嗜酸细胞',
    name: 'acidophil',
    componentType: 'number',
  },
  {
    label: '嗜碱细胞百分比',
    name: 'basophilPercentage',
    componentType: 'number',
  },
  {
    label: '嗜碱细胞',
    name: 'basophil',
    componentType: 'number',
  },
  {
    label: '红细胞计数',
    name: 'rbc',
    componentType: 'number',
  },
  {
    label: '血红蛋白',
    name: 'hemoglobin',
    componentType: 'number',
  },
  {
    label: '红细胞压积',
    name: 'hct',
    componentType: 'number',
  },
  {
    label: '平均红细胞体积',
    name: 'mcv',
    componentType: 'number',
  },
  {
    label: '平均血红蛋白含量',
    name: 'mch',
    componentType: 'number',
  },
  {
    label: '平均血红蛋白浓度',
    name: 'mchc',
    componentType: 'number',
  },
  {
    label: '红细胞分布宽度-CV值',
    name: 'rdwCv',
    componentType: 'number',
  },
  {
    label: '红细胞分布宽度-SD值',
    name: 'rdwSd',
    componentType: 'number',
  },
  {
    label: '血小板计数',
    name: 'bpc',
    componentType: 'number',
  },
  {
    label: 'PLT分布宽度',
    name: 'pltDw',
    componentType: 'number',
  },
  {
    label: '平均PLT体积',
    name: 'pltMv',
    componentType: 'number',
  },
  {
    label: '大血小板比率',
    name: 'plcr',
    componentType: 'number',
  },
  {
    label: '血小板压积',
    name: 'pct',
    componentType: 'number',
  },
  {
    label: '红细胞沉降率',
    name: 'esr',
    componentType: 'number',
  },
];
