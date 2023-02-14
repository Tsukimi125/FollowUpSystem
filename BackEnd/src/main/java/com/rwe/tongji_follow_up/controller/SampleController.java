package com.rwe.tongji_follow_up.controller;

import com.rwe.tongji_follow_up.exception.handler.Success;
import com.rwe.tongji_follow_up.interceptors.RBACScope;
import com.rwe.tongji_follow_up.model.Sample;
import com.rwe.tongji_follow_up.model.req.SampleExportReq;
import com.rwe.tongji_follow_up.service.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/sample")
public class SampleController {

    private final SampleService sampleService;

    @Autowired
    public SampleController(SampleService sampleService) {
        this.sampleService = sampleService;
    }

    @GetMapping("/get")
    Success getSample(@RequestParam(value = "sampleId") int sampleId) {
        return new Success(sampleService.getSample(sampleId));
    }

    @GetMapping("/list")
    @RBACScope(scope = "ListSample")
    Success listSample(@RequestParam(value = "offset") int offset, @RequestParam(value = "limit") int limit,HttpServletRequest request) {
        return new Success(sampleService.listSample(limit, offset,(Integer)request.getAttribute("userId")));
    }

    @PostMapping("/create")
    @RBACScope(scope = "CreateSample")
    Success createSample(@RequestBody Sample sample, HttpServletRequest request) {
        return new Success(sampleService.createSample(sample, (Integer) request.getAttribute("userId")));
    }

    @PostMapping("/update")
    @RBACScope(scope = "UpdateSample")
    Success updateSample(@RequestBody Sample sample, @RequestParam(value = "sampleId") int sampleId) {
        sampleService.updateSample(sample, sampleId);
        return new Success();
    }

    @PostMapping("/submit")
    @RBACScope(scope = "SubmitSample")
    Success submitSample(@RequestParam(value = "sampleId") int sampleId) {
        sampleService.submitSample(sampleId);
        return new Success();
    }

    @PostMapping("/delete")
    Success deleteSample(@RequestParam(value = "sampleId") int sampleId) {
        sampleService.deleteSample(sampleId);
        return new Success();
    }

    @PostMapping("/discharge")
    Success dischargeSample(@RequestParam(value = "sampleId") int sampleId) {
        sampleService.dischargeSample(sampleId);
        return new Success();
    }

    @PostMapping("/export")
    @RBACScope(scope = "ExportSample")
    ResponseEntity<Resource> exportSample(@RequestBody SampleExportReq req) {
        return sampleService.exportSample(req.getSampleIds());
    }

    @PostMapping("/unlock")
    @RBACScope(scope = "UnlockSample")
    Success unlockSample(@RequestParam(value = "sampleId") int sampleId){
        sampleService.unlockSample(sampleId);
        return new Success();
    }
}
