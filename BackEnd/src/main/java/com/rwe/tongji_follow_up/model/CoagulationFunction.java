package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CoagulationFunction extends BaseModel {
    private Double tt;
    private Double pt;
    private Double aptt;
    private Double dDDimer;
    private Double fdp;
    private Integer labTestId;
}
