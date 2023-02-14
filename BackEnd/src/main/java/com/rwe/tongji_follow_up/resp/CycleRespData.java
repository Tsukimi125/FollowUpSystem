package com.rwe.tongji_follow_up.resp;

import com.rwe.tongji_follow_up.model.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CycleRespData extends Cycle {
    private VitalSigns vitalSigns;
    private ConditionScore conditionScore;
    private TreatmentEffect treatmentEffect;
    private PsychiatricRatingScale psychiatricRatingScale;
    private LabTest labTest;

    public CycleRespData(Cycle cycle){
        this.setId(cycle.getId());
        this.setSampleId(cycle.getSampleId());
        this.setType(cycle.getType());
        this.setDate(cycle.getDate());
    }
}
