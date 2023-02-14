package com.rwe.tongji_follow_up.controller;

import com.rwe.tongji_follow_up.exception.handler.Success;
import com.rwe.tongji_follow_up.model.SampleFilter;
import com.rwe.tongji_follow_up.service.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sampleFilter")
public class SampleFilterController {

    private final SampleService sampleService;

    @Autowired
    public SampleFilterController(SampleService sampleService) {
        this.sampleService = sampleService;
    }

    @PostMapping("/update")
    Success updateSampleFilter(@RequestParam(value = "sampleId") int sampleId, @RequestBody SampleFilter sampleFilter) {
        sampleService.updateSampleFilter(sampleFilter, sampleId);
        return new Success();
    }

    @GetMapping("/get")
    Success getSampleFilter(@RequestParam(value = "sampleId") int sampleId) {
        return new Success(sampleService.getSampleFilter(sampleId));
    }
}
