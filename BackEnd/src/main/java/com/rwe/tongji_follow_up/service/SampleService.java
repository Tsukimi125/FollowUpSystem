package com.rwe.tongji_follow_up.service;

import com.rwe.tongji_follow_up.model.DiseaseBaseInformation;
import com.rwe.tongji_follow_up.model.ImagingTest;
import com.rwe.tongji_follow_up.model.Sample;
import com.rwe.tongji_follow_up.model.SampleFilter;
import com.rwe.tongji_follow_up.resp.ListRespData;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface SampleService {
    Sample getSample(int sampleId);
    ListRespData listSample(int limit, int offset, int userId);
    void submitSample(int sampleId);
    void dischargeSample(int sampleId);
    Sample createSample(Sample sample,int userId);
    void updateSample(Sample sample,int sampleId);
    void deleteSample(int sampleId);
    void updateSampleFilter(SampleFilter sampleFilter,int sampleId);
    SampleFilter getSampleFilter(int sampleId);
    void updateSampleDiseaseBaseInformation(DiseaseBaseInformation diseaseBaseInformation,int sampleId);
    DiseaseBaseInformation getSampleDiseaseBaseInformation(int sampleId);
    void updateImagingTest(ImagingTest imagingTest, int sampleId);
    ImagingTest getImagingTest(int sampleId);
    void uploadImagingTestPdf(MultipartFile file, int sampleId);
    void uploadImagingTestImg(MultipartFile file,int sampleId);
    ResponseEntity<Resource> downloadImagingTestPdf(int sampleId);
    ResponseEntity<Resource> downloadImagingTestImg(int sampleId);
    ResponseEntity<Resource> exportSample(List<Integer> sampleIds);
    void unlockSample(int sampleId);
}
