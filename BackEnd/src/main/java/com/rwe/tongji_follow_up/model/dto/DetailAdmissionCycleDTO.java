package com.rwe.tongji_follow_up.model.dto;

import com.rwe.tongji_follow_up.model.PsychiatricRatingScale;
import com.rwe.tongji_follow_up.model.VitalSigns;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DetailAdmissionCycleDTO {
    private Integer sampleId;
    private Integer cycleId;
    private String cycleName;
    private VitalSigns vitalSigns;
    private PsychiatricRatingScale psychiatricRatingScale;
}
