package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class DiseaseBaseInformation extends BaseModel {
    private String diagnosis;
    private String pastHistory;
    private String pastHistoryOther;
    private Integer infectionSource;
    private String infectionSourceOther;
    private Integer sampleId;
}
