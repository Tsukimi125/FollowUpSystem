package com.rwe.tongji_follow_up.controller;

import com.rwe.tongji_follow_up.exception.exec.ParameterException;
import com.rwe.tongji_follow_up.exception.handler.Success;
import com.rwe.tongji_follow_up.model.*;
import com.rwe.tongji_follow_up.service.CycleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cycle")
public class CycleController {

    private final CycleService cycleService;

    @Autowired
    public CycleController(CycleService cycleService) {
        this.cycleService = cycleService;
    }

    @PostMapping("/create")
    Success listCycle(@RequestParam("sampleId") int sampleId, @RequestBody Cycle cycle) {
        // only allow to create type 7 cycle
        if (cycle.getType() != 7) {
            throw new ParameterException();
        }

        return new Success(cycleService.createCycle(sampleId, cycle.getType(), cycle.getDate()));
    }

    @GetMapping("/list")
    Success listCycle(@RequestParam("sampleId") int sampleId) {
        return new Success(cycleService.listCycle(sampleId));
    }

    @GetMapping("/get")
    Success getCycle(@RequestParam("cycleId") int cycleId) {
        return new Success(cycleService.getCycle(cycleId));
    }

    @PostMapping("/update")
    Success updateCycle(@RequestBody Cycle cycle, @RequestParam(value = "cycleId") int cycleId) {
        cycleService.updateCycle(cycle, cycleId);
        return new Success();
    }

    @PostMapping("/vitalSigns/update")
    Success updateVitalSigns(@RequestBody VitalSigns vitalSigns, @RequestParam(value = "cycleId") int cycleId) {
        cycleService.updateVitalSigns(vitalSigns, cycleId);
        return new Success();
    }

    @PostMapping("/conditionScore/update")
    Success updateConditionScore(@RequestBody ConditionScore conditionScore, @RequestParam(value = "cycleId") int cycleId) {
        cycleService.updateConditionScore(conditionScore, cycleId);
        return new Success();
    }

    @PostMapping("/treatmentEffect/update")
    Success updateTreatmentEffect(@RequestBody TreatmentEffect treatmentEffect, @RequestParam(value = "cycleId") int cycleId) {
        cycleService.updateTreatmentEffect(treatmentEffect, cycleId);
        return new Success();
    }

    @PostMapping("/psychiatricRatingScale/update")
    Success updatePsychiatricRatingScale(@RequestBody PsychiatricRatingScale psychiatricRatingScale, @RequestParam(value = "cycleId") int cycleId) {
        cycleService.updatePsychiatricRatingScale(psychiatricRatingScale, cycleId);
        return new Success();
    }
}
