package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ConditionScore extends BaseModel {
    private Integer apacheii;
    private Integer sofa;
    private Integer gcs;
    private Integer cycleId;
}
