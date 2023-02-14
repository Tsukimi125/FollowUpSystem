package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class SciResearchProject extends BaseModel {
    private String cellWidthMorphology;
    private String digitalPcr;
    private String presepsin;
    private String filmArrayVirusCheck;
    private String tat;
    private String compound;
    private Integer labTestId;
}
