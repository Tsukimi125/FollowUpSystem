package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class VitalSigns extends BaseModel {
    private String bloodPressure;
    private Double breath;
    private Double heartRate;
    private Double bodyTemperature;
    private Double oxygenSaturation;
    private Double fractionOfInspiredOxygen;
    private Double oxygenationIndex;
    private Integer cycleId;
}
