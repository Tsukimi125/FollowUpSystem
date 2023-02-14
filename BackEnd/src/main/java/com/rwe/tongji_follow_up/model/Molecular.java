package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class Molecular extends BaseModel {
    private String ebVirusNucleicAcid;
    private String ebvNucleicAcidQuantification;
    private String fluA;
    private String fluB;
    private String rsv;
    private String adv;
    private String piv;
    private String others;
    private Integer labTestId;
}
