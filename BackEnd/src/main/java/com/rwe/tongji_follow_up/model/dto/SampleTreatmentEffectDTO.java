package com.rwe.tongji_follow_up.model.dto;

import com.rwe.tongji_follow_up.model.TreatmentEffect;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SampleTreatmentEffectDTO {
    private Integer sampleId;
    private TreatmentEffect treatmentEffect;
}
