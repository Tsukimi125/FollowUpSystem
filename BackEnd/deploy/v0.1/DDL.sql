alter table imaging_test
    change cycle_id sample_id int not null;


alter table blood_biochemistry
    add y_gt double null comment 'γ-谷氨酰转肽酶';

alter table blood_biochemistry
    add alp double null comment '碱性磷酸酶';

alter table blood_biochemistry
    add hdl double null comment '高密度脂蛋白';

alter table blood_biochemistry
    add ldl double null comment '低密度脂蛋白';

alter table blood_biochemistry
    add creatine_kinase double null comment '肌酸激酶';

alter table blood_biochemistry
    add ldh double null comment '乳酸脱氢酶';

alter table blood_biochemistry
    add total_protein double null comment '总蛋白';

alter table blood_biochemistry
    add albumin double null comment '白蛋白';

alter table blood_biochemistry
    add globulin double null comment '球蛋白';

alter table blood_biochemistry
    add lactate double null comment '乳酸';

alter table blood_biochemistry
    add uric_acid double null comment '尿酸';

alter table blood_biochemistry
    add cystatin_c double null comment '胱抑素C';

alter table blood_biochemistry
    add cholinesterase double null comment '胆碱酯酶';

alter table blood_biochemistry
    add e_gfr double null comment 'eGFR';

alter table blood_biochemistry
    add potassium_ion double null comment '钾离子';

alter table blood_biochemistry
    add sodium_ion double null comment '钠离子';

alter table blood_biochemistry
    add calcium_ion double null comment '钙离子';


-- auto-generated definition
create table special_inspection
(
    id                 int auto_increment
        primary key,
    create_time        datetime          not null,
    update_time        datetime          not null,
    is_delete          tinyint default 0 not null,
    cardiac_ultrasound text              null comment '心脏超声',
    electrocardiogram  text              null comment '心电图',
    hs_ctn             double            null comment '高敏心肌肌钙蛋白',
    pro_bnp            double            null comment 'pro-BNP',
    x_ray_chest_film   text              null comment 'X线胸片',
    blood_culture      text              null comment '血培养',
    lab_test_id        int               not null,
    constraint special_inspection_lab_test_id_uindex
        unique (lab_test_id)
)
    comment '特殊检查';


alter table arterial_blood_gas
    change actual_bicarbonate carbonic_acid double null comment '碳酸';

alter table arterial_blood_gas
    drop column lactate;


alter table tongji_follow_up.psychiatric_rating_scale
    modify cum_icu varchar(255) null comment 'CUM-ICU评分';

alter table tongji_follow_up.psychiatric_rating_scale
    modify moca varchar(255) null comment 'moca评分';

alter table tongji_follow_up.psychiatric_rating_scale
    modify hads varchar(255) null comment 'HADS评分';

alter table tongji_follow_up.psychiatric_rating_scale
    modify ies_r varchar(255) null comment 'IES-R评分';

alter table tongji_follow_up.sample
    add is_discharge tinyint default 0 not null comment '是否出院' after occupation;

alter table tongji_follow_up.cycle
    add name varchar(255) null comment '访视名称';