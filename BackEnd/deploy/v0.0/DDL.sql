create table arterial_blood_gas
(
    id                 int auto_increment
        primary key,
    create_time        datetime          not null,
    update_time        datetime          not null,
    is_delete          tinyint default 0 not null,
    ph                 double            null comment '酸碱度',
    pco_2              double            null comment '二氧化碳分压',
    oxygen_pressure    double            null comment '氧分压',
    oxygen_saturation  double            null comment '氧饱和度',
    actual_bicarbonate double            null comment '实际碳酸氢根',
    lactate            double            null comment '乳酸',
    lab_test_id        int               not null,
    constraint arterial_blood_gas_lab_test_id_uindex
        unique (lab_test_id)
)
    comment '动脉血气分析';

create table blood_biochemistry
(
    id                 int auto_increment
        primary key,
    create_time        datetime          not null,
    update_time        datetime          not null,
    is_delete          tinyint default 0 not null,
    alt                double            null comment '谷丙转氨酶',
    ast                double            null comment '谷草转氨酶',
    cholesterol        double            null comment '胆固醇',
    triglyceride       double            null comment '甘油三酯',
    total_bilirubin    double            null comment '总胆红素',
    direct_bilirubin   double            null comment '直接胆红素',
    indirect_bilirubin double            null comment '间接胆红素',
    blood_sugar        double            null comment '血糖',
    creatinine         double            null comment '肌酐',
    urea_nitrogen      double            null comment '尿素氮',
    lab_test_id        int               not null,
    constraint blood_biochemistry_lab_test_id_uindex
        unique (lab_test_id)
)
    comment '血生化';

create table blood_test
(
    id                 int auto_increment
        primary key,
    create_time        datetime          not null,
    update_time        datetime          not null,
    is_delete          tinyint default 0 not null,
    wbc                double            null comment '白细胞计数',
    rbc                double            null comment '红细胞计数',
    corpuscular_volume double            null comment '红细胞容积',
    hemoglobin         double            null comment '血红蛋白',
    bpc                double            null comment '血小板计数',
    lab_test_id        int               not null,
    constraint blood_test_lab_test_id_uindex
        unique (lab_test_id)
)
    comment '血常规';

create table coagulation_function
(
    id          int auto_increment
        primary key,
    create_time datetime          not null,
    update_time datetime          not null,
    is_delete   tinyint default 0 not null,
    tt          double            null comment '凝血酶时间',
    pt          double            null comment '凝血酶原时间',
    aptt        double            null comment '活化部分凝血酶原时间',
    d_d_dimer   double            null comment 'D-D二聚体',
    fdp         double            null comment '纤维蛋白降解产物',
    lab_test_id int               not null,
    constraint coagulation_function_lab_test_id_uindex
        unique (lab_test_id)
)
    comment '凝血功能';

create table condition_score
(
    id          int auto_increment
        primary key,
    create_time datetime          not null,
    update_time datetime          not null,
    is_delete   tinyint default 0 not null,
    apacheii    int               null comment 'APACHEII评分',
    sofa        int               null comment 'SOFA评分',
    gcs         int               null comment 'GCS评分',
    cycle_id    int               not null,
    constraint condition_score_cycle_id_uindex
        unique (cycle_id)
)
    comment '病情评分';

create table cycle
(
    id          int auto_increment
        primary key,
    create_time datetime          not null,
    update_time datetime          not null,
    is_delete   tinyint default 0 not null,
    sample_id   int               not null,
    type        tinyint           not null comment '周期类型枚举',
    date        datetime          null comment '日期'
)

create index cycle_sample_id_index
    on cycle (sample_id);

create table disease_base_information
(
    id                     int auto_increment
        primary key,
    create_time            datetime          not null,
    update_time            datetime          not null,
    is_delete              tinyint default 0 not null,
    diagnosis              text              null comment '诊断',
    past_history           tinyint           null comment '既往史',
    past_history_other     varchar(255)      null comment '其他既往史',
    infection_source       tinyint           null comment '感染来源',
    infection_source_other varchar(255)      null comment '其他感染来源',
    sample_id              int               not null,
    constraint disease_base_information_sample_id_uindex
        unique (sample_id)
)
    comment '疾病基本信息';

create table imaging_test
(
    id             int auto_increment
        primary key,
    create_time    datetime                  not null,
    update_time    datetime                  not null,
    is_delete      tinyint default 0         not null,
    imaging_num    varchar(255) charset utf8 null comment '影像号',
    report_content text charset utf8         null comment '报告',
    pdf_path       varchar(255) charset utf8 null comment '上传pdf文件路径',
    img_path       varchar(255) charset utf8 null comment '上传图像路径',
    is_exist       tinyint default 0         not null,
    cycle_id       int                       not null,
    constraint imaging_test_cycle_id_uindex
        unique (cycle_id)
)
    comment 'MRI+DWI影像学检查';

create table inflammation_indicators
(
    id          int auto_increment
        primary key,
    create_time datetime          not null,
    update_time datetime          not null,
    is_delete   tinyint default 0 not null,
    il_6        double            null comment 'IL-6',
    il_1b       double            null comment 'IL-1β',
    il_10       double            null comment 'IL-10',
    tnf_a       double            null comment 'TNF-a',
    pct         double            null comment 'PCT',
    crp         double            null comment 'CRP',
    ferritin    double            null comment '铁蛋白',
    lab_test_id int               not null,
    constraint inflammation_indicators_lab_test_id_uindex
        unique (lab_test_id)
)
    comment '炎症相关指标';

create table lab_test
(
    id          int auto_increment
        primary key,
    create_time datetime          not null,
    update_time datetime          not null,
    is_delete   tinyint default 0 not null,
    cycle_id    int               not null,
    constraint lab_test_cycle_id_uindex
        unique (cycle_id)
)
    comment '实验室检查';

create table psychiatric_rating_scale
(
    id          int auto_increment
        primary key,
    create_time datetime          not null,
    update_time datetime          not null,
    is_delete   tinyint default 0 not null,
    cum_icu     int               null comment 'CUM-ICU评分',
    moca        int               null comment 'moca评分',
    hads        int               null comment 'HADS评分',
    ies_r       int               null comment 'IES-R评分',
    is_exist    tinyint default 0 not null,
    cycle_id    int               not null,
    constraint psychiatric_rating_scale_cycle_id_uindex
        unique (cycle_id)
)
    comment '精神量表';

create table sample
(
    id              int auto_increment
        primary key,
    create_time     datetime                    not null,
    update_time     datetime                    not null,
    is_delete       tinyint default 0           not null,
    hospital        varchar(255)                null comment '医院',
    hospital_number varchar(255)                null comment '住院号',
    admission_date  datetime                    null comment '入院日期',
    phone           varchar(255)                null comment '联系电话',
    name            varchar(255)                null,
    sex             varchar(255)                null,
    age             int                         null,
    height          double                      null,
    weight          double                      null,
    bmi             double                      null,
    marital_status  tinyint                     null comment '婚姻状况',
    education       tinyint                     null comment '文化程度',
    occupation      tinyint                     null comment '职业',
    is_submit       tinyint default 0           not null comment '是否提交',
    user_id         int                         not null
)
    comment '样本';

create table sample_filter
(
    id                         int auto_increment
        primary key,
    create_time                datetime          not null,
    update_time                datetime          not null,
    is_delete                  tinyint default 0 not null,
    is_sepsis3_standard        tinyint           null comment '是否符合sepsis3.0标准',
    is_suitable_age            tinyint           null comment '是否年龄>18岁且<80岁',
    is_icu_large_24h           tinyint           null comment '是否ICU入院时间>24h',
    is_informed_consent        tinyint           null comment '是否自愿签署知情同意书',
    is_unsuitable_age          tinyint           null comment '是否年龄＜18岁或＞80岁',
    is_suffered_cancer         tinyint           null comment '是否确诊为恶性肿瘤的患者',
    is_cns_diseases            tinyint           null comment '是否既往存在或新发各种中枢神经系统疾病',
    is_mental_illness          tinyint           null comment '是否已确诊为精神相关疾病',
    is_cannot_finish           tinyint           null comment '是否存在意识障碍、听力和视力受损等无法完成量表测试的情况',
    is_pregnancy_lactation     tinyint           null comment '是否为妊娠期、哺乳期女性患者',
    is_refuse_informed_consent tinyint           null comment '是否拒绝签署知情同意书',
    sample_id                  int               not null,
    constraint sample_filter_sample_id_uindex
        unique (sample_id)
)
    comment '受试者筛选';

create table treatment_effect
(
    id                          int auto_increment
        primary key,
    create_time                 datetime          not null,
    update_time                 datetime          not null,
    is_delete                   tinyint default 0 not null,
    shock                       varchar(255)      null comment '休克',
    anoxia_time                 varchar(255)      null comment '缺氧时间',
    oxygen_uptake               varchar(255)      null comment '氧流量;方式',
    use_invasive_ventilator     varchar(255)      null comment '有创呼吸机使用累积时间',
    use_non_invasive_ventilator varchar(255)      null comment '无创呼吸机使用累积时间',
    sedative                    varchar(255)      null comment '镇静药名称;累积剂量;时间',
    analgesic                   varchar(255)      null comment '镇痛药名称;累积剂量;时间',
    delirium                    varchar(255)      null comment '出现谵妄使用药名称;累积剂量;时间',
    antibacterial_drug          varchar(255)      null comment '确认感染性休克或严重脓毒症后到抗菌药物给药名称;时间',
    neuroprotective_agent       varchar(255)      null comment '神经保护剂名称;累积剂量;时间',
    corticosteroid_in_icu_72    varchar(255)      null comment 'ICU 入院后 72 小时内使用皮质类固醇名称;累积剂量',
    vasoactive_drug             varchar(255)      null comment '血管活性药物使用名称;累积剂量',
    treatment_outcome           tinyint           null comment '治疗转归',
    cycle_id                    int               not null,
    constraint treatment_effect_cycle_id_uindex
        unique (cycle_id)
)
    comment '治疗情况及效果';

create table vital_signs
(
    id                          int auto_increment
        primary key,
    create_time                 datetime          not null,
    update_time                 datetime          not null,
    is_delete                   tinyint default 0 not null,
    blood_pressure              double            null comment '血压（mmHg）',
    breath                      double            null comment '呼吸',
    heart_rate                  double            null comment '心率',
    body_temperature            double            null comment '体温',
    oxygen_saturation           double            null comment '血氧饱和度',
    fraction_of_inspired_oxygen double            null comment '吸入氧浓度',
    oxygenation_index           double            null comment '氧合指数',
    cycle_id                    int               not null,
    constraint vital_signs_cycle_id_uindex
        unique (cycle_id)
)
    comment '生命体征';

