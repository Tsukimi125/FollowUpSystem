package com.rwe.tongji_follow_up.model.dto;

import com.rwe.tongji_follow_up.model.PsychiatricRatingScale;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DetailFollowUpCycleDTO {
    private Integer sampleId;
    private Integer cycleId;
    private String cycleName;
    private PsychiatricRatingScale psychiatricRatingScale;
}
