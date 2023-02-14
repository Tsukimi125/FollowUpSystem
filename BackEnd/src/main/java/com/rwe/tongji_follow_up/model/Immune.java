package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class Immune extends BaseModel {
    private Double lgA;
    private Double lgG;
    private Double lgM;
    private Double c3;
    private Double c4;
    private Integer labTestId;
}
