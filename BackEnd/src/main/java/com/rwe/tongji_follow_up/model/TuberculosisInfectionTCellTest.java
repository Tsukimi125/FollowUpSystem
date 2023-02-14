package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TuberculosisInfectionTCellTest extends BaseModel {
    private String tuberculosisInfectionTCellTest;
    private Integer labTestId;
}
