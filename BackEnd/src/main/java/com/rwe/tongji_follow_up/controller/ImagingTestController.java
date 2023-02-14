package com.rwe.tongji_follow_up.controller;

import com.rwe.tongji_follow_up.exception.handler.Success;
import com.rwe.tongji_follow_up.model.ImagingTest;
import com.rwe.tongji_follow_up.service.SampleService;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/imagingTest")
public class ImagingTestController {
    private final SampleService sampleService;

    public ImagingTestController(SampleService sampleService) {
        this.sampleService = sampleService;
    }

    @PostMapping("/update")
    Success updateImagingTest(@RequestBody ImagingTest imagingTest, @RequestParam(value = "sampleId") int sampleId) {
        sampleService.updateImagingTest(imagingTest, sampleId);
        return new Success();
    }

    @GetMapping("/get")
    Success getImagingTest(@RequestParam(value = "sampleId") int sampleId) {
        return new Success(sampleService.getImagingTest(sampleId));
    }

    @PostMapping("/uploadPdf")
    Success uploadImagingTestPdf(@RequestParam("file") MultipartFile file, @RequestParam(value = "sampleId") int sampleId) {
        sampleService.uploadImagingTestPdf(file, sampleId);
        return new Success();
    }

    @PostMapping("/uploadImg")
    Success uploadImagingTestImg(@RequestParam("file") MultipartFile file, @RequestParam(value = "sampleId") int sampleId) {
        sampleService.uploadImagingTestImg(file, sampleId);
        return new Success();
    }

    @GetMapping("/downloadPdf")
    ResponseEntity<Resource> downloadImagingTestPdf(@RequestParam(value = "sampleId") int sampleId) {
        return sampleService.downloadImagingTestPdf(sampleId);
    }

    @GetMapping("/downloadImg")
    ResponseEntity<Resource> downloadImagingTestImg(@RequestParam(value = "sampleId") int sampleId) {
        return sampleService.downloadImagingTestImg(sampleId);
    }
}
