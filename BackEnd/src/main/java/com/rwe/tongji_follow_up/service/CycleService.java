package com.rwe.tongji_follow_up.service;

import com.rwe.tongji_follow_up.model.*;
import com.rwe.tongji_follow_up.resp.CycleRespData;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public interface CycleService {
    List<Cycle> listCycle(int sampleId);
    Cycle createCycle(int sampleId, int type, Date date);
    CycleRespData getCycle(int cycleId);
    void updateCycle(Cycle cycle,int cycleId);
    void updateVitalSigns(VitalSigns vitalSigns,int cycleId);
    void updateConditionScore(ConditionScore conditionScore,int cycleId);
    void updateTreatmentEffect(TreatmentEffect treatmentEffect,int cycleId);
    void updatePsychiatricRatingScale(PsychiatricRatingScale psychiatricRatingScale,int cycleId);
}
