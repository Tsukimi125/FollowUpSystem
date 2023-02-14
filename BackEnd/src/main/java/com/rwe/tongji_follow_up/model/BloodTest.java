package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class BloodTest extends BaseModel {
    private Double wbc;
    private Double rbc;
    private Double corpuscularVolume;
    private Double hemoglobin;
    private Double bpc;
    private Double neutrophilPercentage;
    private Double neutrophil;
    private Double lymphocytesPercentage;
    private Double lymphocytes;
    private Double monocytesPercentage;
    private Double monocytes;
    private Double acidophilPercentage;
    private Double acidophil;
    private Double basophilPercentage;
    private Double basophil;
    private Double hct;
    private Double mcv;
    private Double mch;
    private Double mchc;
    private Double rdwCv;
    private Double rdwSd;
    private Double pltDw;
    private Double pltMv;
    private Double pLcr;
    private Double thrombocytocrit;
    private Double esr;
    private Integer labTestId;
}
