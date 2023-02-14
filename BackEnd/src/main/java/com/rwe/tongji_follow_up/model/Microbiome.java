package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class Microbiome extends BaseModel {
    private String adultBloodCulture;
    private String normalBacteriumCulture;
    private String fungalCulture;
    private String anaerobicCulture;
    private String sputumCulture;
    private String tubercleBacillusCulture;
    private String microbeNgs;
    private Integer labTestId;
}
