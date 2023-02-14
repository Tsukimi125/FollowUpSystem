package com.rwe.tongji_follow_up.model.export;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.write.style.HeadStyle;
import com.alibaba.excel.enums.poi.FillPatternTypeEnum;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rwe.tongji_follow_up.enums.EnumMaps;
import com.rwe.tongji_follow_up.model.*;
import com.rwe.tongji_follow_up.util.CommonUtils;
import com.rwe.tongji_follow_up.util.ExportUtils;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BaseInformation extends BaseExportModel{
    @ExcelProperty("BMI")
    private Double bmi;
    @ExcelProperty("婚姻状况")
    private String maritalStatus;
    @ExcelProperty("文化程度")
    private String education;
    @ExcelProperty("职业")
    private String occupation;

    // 疾病基本信息
    @ExcelProperty("诊断")
    private String diagnosis;
    @ExcelProperty("既往史")
    private String pastHistory;
    @ExcelProperty("感染来源")
    private String infectionSource;

    // 分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty("病情相关量表评分")
    private String conditionScore;

    @ExcelProperty("APACHE II")
    private Integer apacheii;
    @ExcelProperty("SOFA")
    private Integer sofa;
    @ExcelProperty("GCS")
    private Integer gcs;

    // 分隔标题
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.SplitHeaderColor)
    @ExcelProperty("治疗情况及效果")
    private String treatmentEffect;

    @ExcelProperty("是否休克")
    private String shock;
    @ExcelProperty("缺氧时间")
    private String anoxiaTime;
    @ExcelProperty("是否吸氧")
    private String isUptakeOxygen;
    @ExcelProperty("有创呼吸机使用时长")
    private Integer userInvasiveVentilator;
    @ExcelProperty("无创呼吸机使用时长")
    private Integer userNonInvasiveVentilator;
    @ExcelProperty("是否使用镇静药")
    private String isUseSedative;
    @ExcelProperty("是否使用镇痛药")
    private String isUseAnalgesic;
    @ExcelProperty("是否出现谵妄")
    private String isDelirium;
    @ExcelProperty("确认感染性休克(严重脓毒症)后到抗菌药物给药名称和时间")
    private String antibacterialDrug;
    @ExcelProperty("是否使用神经保护剂")
    private String isUseNeuroprotectiveAgent;
    @ExcelProperty("ICU 入院后 72 小时内使用皮质类固醇名称和累积剂量")
    private String corticosteroidInIcu72;
    @ExcelProperty("血管活性药物使用名称和累积剂量")
    private String vasoactiveDrug;
    @ExcelProperty("治疗转归")
    private String treatmentOutcome;

    public void setBaseBySample(Sample sample){
        super.setBaseBySample(sample);
        this.setBmi(sample.getBmi());
        this.setMaritalStatus(EnumMaps.martialStatus.get(sample.getMaritalStatus()));
        this.setEducation(EnumMaps.education.get(sample.getEducation()));
        this.setOccupation(EnumMaps.occupation.get(sample.getOccupation()));
    }

    public void fillDiseaseBaseInformation(DiseaseBaseInformation information){
        this.setDiagnosis(information.getDiagnosis());
        if(information.getPastHistory()!=null){
            StringBuffer sb=new StringBuffer();
            // parse json string
            List<Integer> pastHistoryList=CommonUtils.parseJsonStrToList(information.getPastHistory());
            if (pastHistoryList==null){
                information.setPastHistory("");
            }else{
                for (Integer pastHistory:pastHistoryList){
                    if(pastHistory!=9){
                        sb.append(EnumMaps.pastHistory.get(pastHistory)).append(";");
                    }else{
                        sb.append(information.getPastHistoryOther()).append(";");
                    }
                }
                this.setPastHistory(sb.toString());
            }
        }
        if(information.getInfectionSource()!=null){
            if(information.getInfectionSource()!=5){
                this.setInfectionSource(EnumMaps.infectionSource.get(information.getInfectionSource()));
            }else{
                this.setPastHistory(information.getInfectionSourceOther());
            }
        }
    }

    public void fillConditionScore(ConditionScore conditionScore){
        this.setApacheii(conditionScore.getApacheii());
        this.setSofa(conditionScore.getSofa());
        this.setGcs(conditionScore.getGcs());
    }

    public void fillTreatmentEffect(TreatmentEffect effect){
        this.setShock(effect.getShock());
        this.setAnoxiaTime(effect.getAnoxiaTime());
        this.setIsUptakeOxygen(ExportUtils.getOxygenUptakeStr(effect.getOxygenUptake()));
        this.setUserInvasiveVentilator(effect.getUseInvasiveVentilator()==null?null:Integer.parseInt(effect.getUseInvasiveVentilator()));
        this.setUserNonInvasiveVentilator(effect.getUseNonInvasiveVentilator()==null?null:Integer.parseInt(effect.getUseNonInvasiveVentilator()));
        this.setIsUseSedative(ExportUtils.getIsUseDrugStr(effect.getSedative()));
        this.setIsUseAnalgesic(ExportUtils.getIsUseDrugStr(effect.getAnalgesic()));
        this.setIsDelirium(ExportUtils.getIsUseDrugStr(effect.getDelirium()));
        this.setAntibacterialDrug(ExportUtils.getDrugNameDosageTimeStr(effect.getAntibacterialDrug()));
        this.setIsUseNeuroprotectiveAgent(ExportUtils.getIsUseDrugStr(effect.getNeuroprotectiveAgent()));
        this.setCorticosteroidInIcu72(ExportUtils.getDrugNameDosageTimeStr(effect.getCorticosteroidInIcu72()));
        this.setVasoactiveDrug(ExportUtils.getDrugNameDosageTimeStr(effect.getVasoactiveDrug()));
        this.setTreatmentOutcome(EnumMaps.treatmentOutcome.getOrDefault(effect.getTreatmentOutcome(),""));
    }
}
