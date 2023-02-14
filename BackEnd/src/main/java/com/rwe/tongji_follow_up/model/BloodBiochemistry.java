package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class BloodBiochemistry extends BaseModel {
    private Double alt;
    private Double ast;
    private Double cholesterol;
    private Double triglyceride;
    private Double totalBilirubin;
    private Double directBilirubin;
    private Double indirectBilirubin;
    private Double bloodSugar;
    private Double creatinine;
    private Double ureaNitrogen;
    private Double yGt;
    private Double alp;
    private Double hdl;
    private Double ldl;
    private Double creatineKinase;
    private Double ldh;
    private Double totalProtein;
    private Double albumin;
    private Double globulin;
    private Double lactate;
    private Double uricAcid;
    private Double cystatinC;
    private Double cholinesterase;
    private Double eGfr;
    private Double potassiumIon;
    private Double sodiumIon;
    private Double calciumIon;
    private Integer labTestId;
}
