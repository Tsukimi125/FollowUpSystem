package com.rwe.tongji_follow_up.controller;

import com.rwe.tongji_follow_up.exception.handler.Success;
import com.rwe.tongji_follow_up.model.DiseaseBaseInformation;
import com.rwe.tongji_follow_up.service.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/diseaseBaseInfo")
public class DiseaseBaseInfoController {

    private final SampleService sampleService;

    @Autowired
    public DiseaseBaseInfoController(SampleService sampleService) {
        this.sampleService = sampleService;
    }

    @PostMapping("/update")
    Success updateDiseaseBaseInfo(@RequestParam(value = "sampleId") int sampleId, @RequestBody DiseaseBaseInformation diseaseBaseInformation) {
        sampleService.updateSampleDiseaseBaseInformation(diseaseBaseInformation, sampleId);
        return new Success();
    }

    @GetMapping("/get")
    Success getDiseaseBaseInfo(@RequestParam(value = "sampleId") int sampleId) {
        return new Success(sampleService.getSampleDiseaseBaseInformation(sampleId));
    }
}
