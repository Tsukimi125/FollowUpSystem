package com.rwe.tongji_follow_up.model.export;
import java.util.Date;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.write.style.ContentStyle;
import com.alibaba.excel.annotation.write.style.HeadStyle;
import com.alibaba.excel.enums.poi.FillPatternTypeEnum;
import com.baomidou.mybatisplus.annotation.TableField;
import com.rwe.tongji_follow_up.enums.EnumMaps;
import com.rwe.tongji_follow_up.model.*;
import com.rwe.tongji_follow_up.model.dto.DetailLabTestDTO;
import com.rwe.tongji_follow_up.util.ExportUtils;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdmissionInformation extends BaseExportModel{
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.TypeHeaderColor)
    @ContentStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.TypeContentColor)
    @ExcelProperty("入院天数")
    private String cycleName;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty("生命体征")
    private String vitalSigns;

    @ExcelProperty("血压")
    private String bloodPressure;
    @ExcelProperty("呼吸")
    private Double breath;
    @ExcelProperty("心率")
    private Double heartRate;
    @ExcelProperty("体温")
    private Double bodyTemperature;
    @ExcelProperty("血氧饱和度")
    private Double oxygenSaturation;
    @ExcelProperty("吸入氧浓度")
    private Double fractionOfInspiredOxygen;
    @ExcelProperty("氧合指数")
    private Double oxygenationIndex;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty("精神量表评分")
    private String psychiatricRatingScale;

    @ExcelProperty("CAM-ICU评分")
    private String cumIcu;
    @ExcelProperty("Moca评分")
    private String moca;
    @ExcelProperty("HADS评分")
    private String hads;
    @ExcelProperty("IES-R评分")
    private String iesR;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty("炎症相关指标")
    private String inflammationIndicators;

    @ExcelProperty("IL-6")
    private Double il6;
    @ExcelProperty("IL-1β")
    private Double il1B;
    @ExcelProperty("IL-10")
    private Double il10;
    @ExcelProperty("TNF-a")
    private Double tnfA;
    @ExcelProperty("PCT")
    private Double pct;
    @ExcelProperty("CRP")
    private Double crp;
    @ExcelProperty("铁蛋白")
    private Double ferritin;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty("血常规")
    private String bloodTest;

    @ExcelProperty("白细胞计数")
    private Double wbc;
    @ExcelProperty("红细胞计数")
    private Double rbc;
//    @ExcelProperty("红细胞容积")
//    private Double corpuscularVolume;
    @ExcelProperty("血红蛋白")
    private Double hemoglobin;
    @ExcelProperty("血小板计数")
    private Double bpc;
    @ExcelProperty("中性粒细胞百分比")
    private Double neutrophilPercentage;
    @ExcelProperty("中性粒细胞")
    private Double neutrophil;
    @ExcelProperty("淋巴细胞百分比")
    private Double lymphocytesPercentage;
    @ExcelProperty("淋巴细胞")
    private Double lymphocytes;
    @ExcelProperty("单核细胞百分比")
    private Double monocytesPercentage;
    @ExcelProperty("单核细胞")
    private Double monocytes;
    @ExcelProperty("嗜酸细胞百分比")
    private Double acidophilPercentage;
    @ExcelProperty("嗜酸细胞")
    private Double acidophil;
    @ExcelProperty("嗜碱细胞百分比")
    private Double basophilPercentage;
    @ExcelProperty("嗜碱细胞")
    private Double basophil;
    @ExcelProperty("红细胞压积")
    private Double hct;
    @ExcelProperty("平均红细胞体积")
    private Double mcv;
    @ExcelProperty("平均血红蛋白含量")
    private Double mch;
    @ExcelProperty("平均血红蛋白浓度")
    private Double mchc;
    @ExcelProperty("红细胞分布宽度-CV值")
    private Double rdwCv;
    @ExcelProperty("红细胞分布宽度-SD值")
    private Double rdwSd;
    @ExcelProperty("PLT分布宽度")
    private Double pltDw;
    @ExcelProperty("平均PLT体积")
    private Double pltMv;
    @ExcelProperty("大血小板比率")
    private Double pLcr;
    @ExcelProperty("血小板压积")
    private Double thrombocytocrit;
    @ExcelProperty("红细胞沉降率")
    private Double esr;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty("血生化")
    private String bloodBiochemistry;

    @ExcelProperty("谷丙转氨酶")
    private Double alt;
    @ExcelProperty("谷草转氨酶")
    private Double ast;
    @ExcelProperty("胆固醇")
    private Double cholesterol;
    @ExcelProperty("甘油三酯")
    private Double triglyceride;
    @ExcelProperty("总胆红素")
    private Double totalBilirubin;
    @ExcelProperty("直接胆红素")
    private Double directBilirubin;
    @ExcelProperty("间接胆红素")
    private Double indirectBilirubin;
    @ExcelProperty("血糖")
    private Double bloodSugar;
    @ExcelProperty("肌酐")
    private Double creatinine;
    @ExcelProperty("尿素氮")
    private Double ureaNitrogen;
    @ExcelProperty("γ-谷氨酰转肽酶")
    private Double yGt;
    @ExcelProperty("碱性磷酸酶")
    private Double alp;
    @ExcelProperty("高密度脂蛋白")
    private Double hdl;
    @ExcelProperty("低密度脂蛋白")
    private Double ldl;
    @ExcelProperty("肌酸激酶")
    private Double creatineKinase;
    @ExcelProperty("乳酸脱氢酶")
    private Double ldh;
    @ExcelProperty("总蛋白")
    private Double totalProtein;
    @ExcelProperty("白蛋白")
    private Double albumin;
    @ExcelProperty("球蛋白")
    private Double globulin;
    @ExcelProperty("乳酸")
    private Double lactate;
    @ExcelProperty("尿酸")
    private Double uricAcid;
    @ExcelProperty("胱抑素C")
    private Double cystatinC;
    @ExcelProperty("胆碱酯酶")
    private Double cholinesterase;
    @ExcelProperty("eGFR")
    private Double eGfr;
    @ExcelProperty("钠离子")
    private Double potassiumIon;
    @ExcelProperty("钾离子")
    private Double sodiumIon;
    @ExcelProperty("钙离子")
    private Double calciumIon;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty("凝血功能")
    private String coagulationFunction;

    @ExcelProperty("凝血酶时间")
    private Double tt;
    @ExcelProperty("凝血酶原时间")
    private Double pt;
    @ExcelProperty("活化部分凝血酶原时间")
    private Double aptt;
    @ExcelProperty("D-D二聚体")
    private Double dDDimer;
    @ExcelProperty("纤维蛋白降解产物")
    private Double fdp;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty("动脉血气分析")
    private String arterialBloodGas;

    @ExcelProperty("酸碱度")
    private Double ph;
    @ExcelProperty("二氧化碳分压")
    private Double pco2;
    @ExcelProperty("氧分压")
    private Double oxygenPressure;
    @ExcelProperty("氧饱和度")
    private Double oxygenSaturation2;
    @ExcelProperty("碳酸")
    private Double carbonicAcid;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty("特殊检查")
    private String specialInspection;

    @ExcelProperty("高敏心肌肌钙蛋白")
    private Double hsCtn;
    @ExcelProperty("pro-BNP")
    private Double proBnp;
    @ExcelProperty("X线胸片")
    private String xRayChestFilm;
    @ExcelProperty("血培养")
    private String bloodCulture;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty(value = "微生物组")
    private String microbiome;

    @ExcelProperty(value="成人血培养+药敏（需氧菌+厌氧菌）")
    private String adultBloodCulture;
    @ExcelProperty(value="普通细菌培养+药敏（非血非痰）")
    private String normalBacteriumCulture;
    @ExcelProperty(value="真菌培养+药敏（非血）")
    private String fungalCulture;
    @ExcelProperty(value="厌氧菌培养（非血）")
    private String anaerobicCulture;
    @ExcelProperty(value="痰培养+药敏")
    private String sputumCulture;
    @ExcelProperty(value="结核杆菌抗酸涂片+培养")
    private String tubercleBacillusCulture;
    @ExcelProperty(value="微生物NGS(40种)")
    private String microbeNgs;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty(value = "风湿全套14")
    private String rheumatism14;

    @ExcelProperty(value="抗核抗体")
    private String antinuclearAntibody;
    @ExcelProperty(value="抗双链DNA抗体")
    private String aniDna;
    @ExcelProperty(value="抗核染色质抗体")
    private String antinuclearChromatinAntibody;
    @ExcelProperty(value="抗RNP A抗体")
    private String aniRnpA;
    @ExcelProperty(value="抗RNP 68抗体")
    private String aniRnp68;
    @ExcelProperty(value="抗Sm/nRNP抗体")
    private String aniSmNrnp;
    @ExcelProperty(value="抗Sm抗体")
    private String aniSm;
    @ExcelProperty(value="抗SS-A抗体")
    private String aniSsA;
    @ExcelProperty(value="抗RO-52抗体")
    private String aniRo52;
    @ExcelProperty(value="抗SS-B抗体")
    private String aniSsB;
    @ExcelProperty(value="抗Scl-70抗体")
    private String aniScl70;
    @ExcelProperty(value="抗Jo-1抗体")
    private String aniJo1;
    @ExcelProperty(value="抗着丝点B蛋白抗体")
    private String aniCentromereBProtein;
    @ExcelProperty(value="抗染色质抗体")
    private String aniChromatin;
    @ExcelProperty(value="核糖体P蛋白")
    private String ribosomalPProtein;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty(value = "淋巴细胞亚群")
    private String lymphocyteSubsets;

    @ExcelProperty(value="总T淋巴细胞（CD3+CD19-）%")
    private Double tLymphocytesP;
    @ExcelProperty(value="总T淋巴细胞（CD3+CD19-）#")
    private Double tLymphocytesC;
    @ExcelProperty(value="总B淋巴细胞（CD3-CD19+）%")
    private Double bLymphocytesP;
    @ExcelProperty(value="总B淋巴细胞（CD3-CD19+）#")
    private Double bLymphocytesC;
    @ExcelProperty(value="辅助/诱导性T淋巴细胞（CD3+CD4+）%")
    private Double inducibleTLymphocytesP;
    @ExcelProperty(value="辅助/诱导性T淋巴细胞（CD3+CD4+）#")
    private Double inducibleTLymphocytesC;
    @ExcelProperty(value="抑制/细胞毒性T淋巴细胞（CD3+CD8+）%")
    private Double cytotoxicTLymphocytesP;
    @ExcelProperty(value="抑制/细胞毒性T淋巴细胞（CD3+CD8+）#")
    private Double cytotoxicTLymphocytesC;
    @ExcelProperty(value="NK细胞（CD3-/CD16+CD56+）%")
    private Double nkCellP;
    @ExcelProperty(value="NK细胞（CD3-/CD16+CD56+）#")
    private Double nkCellC;
    @ExcelProperty(value="NK-T细胞（CD3+CD56+）%")
    private Double nkTCellP;
    @ExcelProperty(value="NK-T细胞（CD3+CD56+）#")
    private Double nkTCellC;
    @ExcelProperty(value="T淋巴细胞+B淋巴细胞+NK细胞%")
    private Double tBNkCellP;
    @ExcelProperty(value="T淋巴细胞+B淋巴细胞+NK细胞#")
    private Double tBNkCellC;
    @ExcelProperty(value="Th/Ts")
    private Double thTs;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty(value = "细胞因子")
    private String cellFactor;

    @ExcelProperty(value="IFN-γ")
    private Double ifnY;
    @ExcelProperty(value="TNF-α")
    private Double tnfAlpha;
    @ExcelProperty(value="白介素10")
    private Double interleukin10;
    @ExcelProperty(value="白介素6")
    private Double interleukin6;
    @ExcelProperty(value="白介素4")
    private Double interleukin4;
    @ExcelProperty(value="白介素2")
    private Double interleukin2;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty(value = "免疫全套IgGAM,C3")
    private String immune;

    @ExcelProperty(value="lgA")
    private Double lgA;
    @ExcelProperty(value="lgG")
    private Double lgG;
    @ExcelProperty(value="lgM")
    private Double lgM;
    @ExcelProperty(value="C3")
    private Double c3;
    @ExcelProperty(value="C4")
    private Double c4;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty(value = "GM试验-曲霉菌半乳甘露聚糖检测")
    private String gmTest;

    @ExcelProperty(value="真菌（1-3）-β-D葡聚糖")
    private Double fungalBDGlucan;
    @ExcelProperty(value="曲霉菌半乳甘露聚糖")
    private Double aspergillusGalactomannan;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty(value = "结核感染T细胞检测")
    private String tCellTest;

    @ExcelProperty(value = "检测内容")
    private String tuberculosisInfectionTCellTest;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty(value = "分子组")
    private String molecular;

    @ExcelProperty(value="EB病毒核酸检测")
    private String ebVirusNucleicAcid;
    @ExcelProperty(value="血浆EBV核酸定量")
    private String ebvNucleicAcidQuantification;
    @ExcelProperty(value="甲型流感")
    private String fluA;
    @ExcelProperty(value="乙型流感")
    private String fluB;
    @ExcelProperty(value="呼吸道合胞病毒")
    private String rsv;
    @ExcelProperty(value="腺病毒")
    private String adv;
    @ExcelProperty(value="副流感病毒1,2,3型")
    private String piv;
    @ExcelProperty(value="其他可疑病原菌核酸检测")
    private String others;

    //分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty(value = "科研项目")
    private String sciResearchProject;

    @ExcelProperty(value="单核细胞分布宽度（血常规）+外周血细胞形态")
    private String cellWidthMorphology;
    @ExcelProperty(value="数字PCR")
    private String digitalPcr;
    @ExcelProperty(value="Presepsin（sCD14-亚型）")
    private String presepsin;
    @ExcelProperty(value="Film array病毒检测")
    private String filmArrayVirusCheck;
    @ExcelProperty(value="凝血酶-抗凝血酶复合物（TAT）")
    private String tat;
    @ExcelProperty(value="复合物")
    private String compound;


    public void fillVitalSigns(VitalSigns vitalSigns){
        this.setBloodPressure(vitalSigns.getBloodPressure());
        this.setBreath(vitalSigns.getBreath());
        this.setHeartRate(vitalSigns.getHeartRate());
        this.setBodyTemperature(vitalSigns.getBodyTemperature());
        this.setOxygenSaturation(vitalSigns.getOxygenSaturation());
        this.setFractionOfInspiredOxygen(vitalSigns.getFractionOfInspiredOxygen());
        this.setOxygenationIndex(vitalSigns.getOxygenationIndex());
    }

    public void fillPsychiatricRatingScale(PsychiatricRatingScale psychiatricRatingScale){
        this.setCumIcu(ExportUtils.getEnumWithNoteStr(psychiatricRatingScale.getCumIcu(),EnumMaps.camIcu));
        this.setMoca(ExportUtils.getEnumWithNoteStr(psychiatricRatingScale.getMoca(),EnumMaps.moca));
        this.setHads(ExportUtils.getEnumWithNoteStr(psychiatricRatingScale.getHads(),EnumMaps.hads));
        this.setIesR(ExportUtils.getEnumWithNoteStr(psychiatricRatingScale.getIesR(),EnumMaps.iesR));
    }

    public void fillInflammationIndicators(InflammationIndicators inflammationIndicators){
        this.setIl6(inflammationIndicators.getIl6());
        this.setIl1B(inflammationIndicators.getIl1B());
        this.setIl10(inflammationIndicators.getIl10());
        this.setTnfA(inflammationIndicators.getTnfA());
        this.setPct(inflammationIndicators.getPct());
        this.setCrp(inflammationIndicators.getCrp());
        this.setFerritin(inflammationIndicators.getFerritin());
    }

    public void fillBloodTest(BloodTest bloodTest){
        this.setWbc(bloodTest.getWbc());
        this.setRbc(bloodTest.getRbc());
//        this.setCorpuscularVolume(bloodTest.getCorpuscularVolume());
        this.setHemoglobin(bloodTest.getHemoglobin());
        this.setBpc(bloodTest.getBpc());
        this.setNeutrophilPercentage(bloodTest.getNeutrophilPercentage());
        this.setNeutrophil(bloodTest.getNeutrophil());
        this.setLymphocytesPercentage(bloodTest.getLymphocytesPercentage());
        this.setLymphocytes(bloodTest.getLymphocytes());
        this.setMonocytesPercentage(bloodTest.getMonocytesPercentage());
        this.setMonocytes(bloodTest.getMonocytes());
        this.setAcidophilPercentage(bloodTest.getAcidophilPercentage());
        this.setAcidophil(bloodTest.getAcidophil());
        this.setBasophilPercentage(bloodTest.getBasophilPercentage());
        this.setBasophil(bloodTest.getBasophil());
        this.setHct(bloodTest.getHct());
        this.setMcv(bloodTest.getMcv());
        this.setMch(bloodTest.getMch());
        this.setMchc(bloodTest.getMchc());
        this.setRdwCv(bloodTest.getRdwCv());
        this.setRdwSd(bloodTest.getRdwSd());
        this.setPltDw(bloodTest.getPltDw());
        this.setPltMv(bloodTest.getPltMv());
        this.setPLcr(bloodTest.getPLcr());
        this.setThrombocytocrit(bloodTest.getThrombocytocrit());
        this.setEsr(bloodTest.getEsr());
    }

    public void fillBloodBiochemistry(BloodBiochemistry bloodBiochemistry){
        this.setAlt(bloodBiochemistry.getAlt());
        this.setAst(bloodBiochemistry.getAst());
        this.setCholesterol(bloodBiochemistry.getCholesterol());
        this.setTriglyceride(bloodBiochemistry.getTriglyceride());
        this.setTotalBilirubin(bloodBiochemistry.getTotalBilirubin());
        this.setDirectBilirubin(bloodBiochemistry.getDirectBilirubin());
        this.setIndirectBilirubin(bloodBiochemistry.getIndirectBilirubin());
        this.setBloodSugar(bloodBiochemistry.getBloodSugar());
        this.setCreatinine(bloodBiochemistry.getCreatinine());
        this.setUreaNitrogen(bloodBiochemistry.getUreaNitrogen());
        this.setYGt(bloodBiochemistry.getYGt());
        this.setAlp(bloodBiochemistry.getAlp());
        this.setHdl(bloodBiochemistry.getHdl());
        this.setLdl(bloodBiochemistry.getLdl());
        this.setCreatineKinase(bloodBiochemistry.getCreatineKinase());
        this.setLdh(bloodBiochemistry.getLdh());
        this.setTotalProtein(bloodBiochemistry.getTotalProtein());
        this.setAlbumin(bloodBiochemistry.getAlbumin());
        this.setGlobulin(bloodBiochemistry.getGlobulin());
        this.setLactate(bloodBiochemistry.getLactate());
        this.setUricAcid(bloodBiochemistry.getUricAcid());
        this.setCystatinC(bloodBiochemistry.getCystatinC());
        this.setCholinesterase(bloodBiochemistry.getCholinesterase());
        this.setEGfr(bloodBiochemistry.getEGfr());
        this.setPotassiumIon(bloodBiochemistry.getPotassiumIon());
        this.setSodiumIon(bloodBiochemistry.getSodiumIon());
        this.setCalciumIon(bloodBiochemistry.getCalciumIon());
    }

    public void fillCoagulationFunction(CoagulationFunction coagulationFunction){
        this.setTt(coagulationFunction.getTt());
        this.setPt(coagulationFunction.getPt());
        this.setAptt(coagulationFunction.getAptt());
        this.setDDDimer(coagulationFunction.getDDDimer());
        this.setFdp(coagulationFunction.getFdp());
    }

    public void fillArterialBloodGas(ArterialBloodGas arterialBloodGas){
        this.setPh(arterialBloodGas.getPh());
        this.setPco2(arterialBloodGas.getPco2());
        this.setOxygenPressure(arterialBloodGas.getOxygenPressure());
        this.setOxygenSaturation(arterialBloodGas.getOxygenSaturation());
        this.setCarbonicAcid(arterialBloodGas.getCarbonicAcid());
    }

    public void fillSpecialInspection(SpecialInspection specialInspection){
        this.setHsCtn(specialInspection.getHsCtn());
        this.setProBnp(specialInspection.getProBnp());
        this.setXRayChestFilm(specialInspection.getXRayChestFilm());
        this.setBloodCulture(ExportUtils.getEnumWithNoteStr(specialInspection.getBloodCulture(),EnumMaps.bloodCulture));
    }

    public void fillMicrobiome(Microbiome microbiome){
        this.setAdultBloodCulture(microbiome.getAdultBloodCulture());
        this.setNormalBacteriumCulture(microbiome.getNormalBacteriumCulture());
        this.setFungalCulture(microbiome.getFungalCulture());
        this.setAnaerobicCulture(microbiome.getAnaerobicCulture());
        this.setSputumCulture(microbiome.getSputumCulture());
        this.setTubercleBacillusCulture(microbiome.getTubercleBacillusCulture());
        this.setMicrobeNgs(microbiome.getMicrobeNgs());
    }

    public void fillRheumatism14(Rheumatism14 rheumatism14){
        this.setAntinuclearAntibody(rheumatism14.getAntinuclearAntibody());
        this.setAniDna(rheumatism14.getAniDna());
        this.setAntinuclearChromatinAntibody(rheumatism14.getAntinuclearChromatinAntibody());
        this.setAniRnpA(rheumatism14.getAniRnpA());
        this.setAniRnp68(rheumatism14.getAniRnp68());
        this.setAniSmNrnp(rheumatism14.getAniSmNrnp());
        this.setAniSm(rheumatism14.getAniSm());
        this.setAniSsA(rheumatism14.getAniSsA());
        this.setAniRo52(rheumatism14.getAniRo52());
        this.setAniSsB(rheumatism14.getAniSsB());
        this.setAniScl70(rheumatism14.getAniScl70());
        this.setAniJo1(rheumatism14.getAniJo1());
        this.setAniCentromereBProtein(rheumatism14.getAniCentromereBProtein());
        this.setAniChromatin(rheumatism14.getAniChromatin());
        this.setRibosomalPProtein(rheumatism14.getRibosomalPProtein());
    }

    public void fillLymphocyteSubsets(LymphocyteSubsets lymphocyteSubsets){
        this.setTLymphocytesP(lymphocyteSubsets.getTLymphocytesP());
        this.setTLymphocytesC(lymphocyteSubsets.getTLymphocytesC());
        this.setBLymphocytesP(lymphocyteSubsets.getBLymphocytesP());
        this.setBLymphocytesC(lymphocyteSubsets.getBLymphocytesC());
        this.setInducibleTLymphocytesP(lymphocyteSubsets.getInducibleTLymphocytesP());
        this.setInducibleTLymphocytesC(lymphocyteSubsets.getInducibleTLymphocytesC());
        this.setCytotoxicTLymphocytesP(lymphocyteSubsets.getCytotoxicTLymphocytesP());
        this.setCytotoxicTLymphocytesC(lymphocyteSubsets.getCytotoxicTLymphocytesC());
        this.setNkCellP(lymphocyteSubsets.getNkCellP());
        this.setNkCellC(lymphocyteSubsets.getNkCellC());
        this.setNkTCellP(lymphocyteSubsets.getNkTCellP());
        this.setNkTCellC(lymphocyteSubsets.getNkTCellC());
        this.setTBNkCellP(lymphocyteSubsets.getTBNkCellP());
        this.setTBNkCellC(lymphocyteSubsets.getTBNkCellC());
        this.setThTs(lymphocyteSubsets.getThTs());
    }

    public void fillCellFactor(CellFactor cellFactor){
        this.setIfnY(cellFactor.getIfnY());
        this.setTnfAlpha(cellFactor.getTnfAlpha());
        this.setInterleukin10(cellFactor.getInterleukin10());
        this.setInterleukin6(cellFactor.getInterleukin6());
        this.setInterleukin4(cellFactor.getInterleukin4());
        this.setInterleukin2(cellFactor.getInterleukin2());
    }

    public void fillImmune(Immune immune){
        this.setLgA(immune.getLgA());
        this.setLgG(immune.getLgG());
        this.setLgM(immune.getLgM());
        this.setC3(immune.getC3());
        this.setC4(immune.getC4());
    }

    public void fillGmTest(GmTest gmTest){
        this.setFungalBDGlucan(gmTest.getFungalBDGlucan());
        this.setAspergillusGalactomannan(gmTest.getAspergillusGalactomannan());
    }

    public void fillTCellTest(TuberculosisInfectionTCellTest tuberculosisInfectionTCellTest){
        this.setTuberculosisInfectionTCellTest(tuberculosisInfectionTCellTest.getTuberculosisInfectionTCellTest());
    }

    public void fillMolecular(Molecular molecular){
        this.setEbVirusNucleicAcid(molecular.getEbVirusNucleicAcid());
        this.setEbvNucleicAcidQuantification(molecular.getEbvNucleicAcidQuantification());
        this.setFluA(molecular.getFluA());
        this.setFluB(molecular.getFluB());
        this.setRsv(molecular.getRsv());
        this.setAdv(molecular.getAdv());
        this.setPiv(molecular.getPiv());
        this.setOthers(molecular.getOthers());
    }

    public void fillSciResearchProject(SciResearchProject sciResearchProject){
        this.setCellWidthMorphology(sciResearchProject.getCellWidthMorphology());
        this.setDigitalPcr(sciResearchProject.getDigitalPcr());
        this.setPresepsin(sciResearchProject.getPresepsin());
        this.setFilmArrayVirusCheck(sciResearchProject.getFilmArrayVirusCheck());
        this.setTat(sciResearchProject.getTat());
        this.setCompound(sciResearchProject.getCompound());
    }

    public void fillLabTest(DetailLabTestDTO detailLabTest){
        this.fillInflammationIndicators(detailLabTest.getInflammationIndicators());
        this.fillBloodTest(detailLabTest.getBloodTest());
        this.fillBloodBiochemistry(detailLabTest.getBloodBiochemistry());
        this.fillCoagulationFunction(detailLabTest.getCoagulationFunction());
        this.fillArterialBloodGas(detailLabTest.getArterialBloodGas());
        this.fillSpecialInspection(detailLabTest.getSpecialInspection());
        this.fillMicrobiome(detailLabTest.getMicrobiome());
        this.fillRheumatism14(detailLabTest.getRheumatism14());
        this.fillLymphocyteSubsets(detailLabTest.getLymphocyteSubsets());
        this.fillCellFactor(detailLabTest.getCellFactor());
        this.fillImmune(detailLabTest.getImmune());
        this.fillGmTest(detailLabTest.getGmTest());
        this.fillTCellTest(detailLabTest.getTuberculosisInfectionTCellTest());
        this.fillMolecular(detailLabTest.getMolecular());
        this.fillSciResearchProject(detailLabTest.getSciResearchProject());
    }
}
