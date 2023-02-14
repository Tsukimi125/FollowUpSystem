package com.rwe.tongji_follow_up.model.dto;

import com.rwe.tongji_follow_up.model.ConditionScore;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SampleConditionScoreDTO {
    private Integer sampleId;
    private ConditionScore conditionScore;
}
