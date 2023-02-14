alter table disease_base_information
    modify past_history varchar(255) null comment '既往史';


alter table rheumatism_14
    modify antinuclear_antibody varchar(255) null comment '抗核抗体';

alter table rheumatism_14
    modify ani_dna varchar(255) null comment '抗双链DNA抗体';

alter table rheumatism_14
    modify antinuclear_chromatin_antibody varchar(255) null comment '抗核染色质抗体';

alter table rheumatism_14
    modify ani_rnp_a varchar(255) null comment '抗RNP A抗体';

alter table rheumatism_14
    modify ani_rnp_68 varchar(255) null comment '抗RNP 68抗体';

alter table rheumatism_14
    modify ani_sm_nrnp varchar(255) null comment '抗Sm/nRNP抗体';

alter table rheumatism_14
    modify ani_sm varchar(255) null comment '抗Sm抗体';

alter table rheumatism_14
    modify ani_ss_a varchar(255) null comment '抗SS-A抗体';

alter table rheumatism_14
    modify ani_ro_52 varchar(255) null comment '抗RO-52抗体';

alter table rheumatism_14
    modify ani_ss_b varchar(255) null comment '抗SS-B抗体';

alter table rheumatism_14
    modify ani_scl_70 varchar(255) null comment '抗Scl-70抗体';

alter table rheumatism_14
    modify ani_jo_1 varchar(255) null comment '抗Jo-1抗体';

alter table rheumatism_14
    modify ani_centromere_b_protein varchar(255) null comment '抗着丝点B蛋白抗体';

alter table rheumatism_14
    modify ani_chromatin varchar(255) null comment '抗染色质抗体';

alter table rheumatism_14
    modify ribosomal_p_protein varchar(255) null comment '核糖体P蛋白';


alter table molecular
    modify eb_virus_nucleic_acid varchar(255) null comment 'EB病毒核酸检测';

alter table molecular
    modify ebv_nucleic_acid_quantification varchar(255) null comment '血浆EBV核酸定量';

alter table molecular
    modify flu_a varchar(255) null comment '甲型流感';

alter table molecular
    modify flu_b varchar(255) null comment '乙型流感';

alter table molecular
    modify rsv varchar(255) null comment '呼吸道合胞病毒';

alter table molecular
    modify adv varchar(255) null comment '腺病毒';

alter table molecular
    modify piv varchar(255) null comment '副流感病毒1,2,3型';

