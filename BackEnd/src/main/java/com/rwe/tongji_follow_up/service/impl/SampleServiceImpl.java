package com.rwe.tongji_follow_up.service.impl;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.ExcelWriter;
import com.alibaba.excel.write.style.column.LongestMatchColumnWidthStyleStrategy;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.rwe.tongji_follow_up.dao.GetLookUpDao;
import com.rwe.tongji_follow_up.enums.Role;
import com.rwe.tongji_follow_up.exception.exec.CommonException;
import com.rwe.tongji_follow_up.exception.exec.NotFoundException;
import com.rwe.tongji_follow_up.exception.exec.ParameterException;
import com.rwe.tongji_follow_up.mapper.*;
import com.rwe.tongji_follow_up.model.*;
import com.rwe.tongji_follow_up.model.dto.DetailAdmissionCycleDTO;
import com.rwe.tongji_follow_up.model.dto.DetailFollowUpCycleDTO;
import com.rwe.tongji_follow_up.model.dto.DetailLabTestDTO;
import com.rwe.tongji_follow_up.model.export.AdmissionInformation;
import com.rwe.tongji_follow_up.model.export.BaseInformation;
import com.rwe.tongji_follow_up.model.export.FollowUpInformation;
import com.rwe.tongji_follow_up.model.rbac.RoleInfoData;
import com.rwe.tongji_follow_up.model.rbac.UserInfoData;
import com.rwe.tongji_follow_up.resp.ListRespData;
import com.rwe.tongji_follow_up.service.CycleService;
import com.rwe.tongji_follow_up.service.SampleService;
import com.rwe.tongji_follow_up.util.DaoUtils;
import com.rwe.tongji_follow_up.util.FileUtils;
import com.rwe.tongji_follow_up.util.RBACUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;

@Service
public class SampleServiceImpl implements SampleService {

    private final SampleMapper sampleMapper;
    private final SampleFilterMapper sampleFilterMapper;
    private final DiseaseBaseInformationMapper diseaseBaseInformationMapper;
    private final ImagingTestMapper imagingTestMapper;
    private final CycleMapper cycleMapper;
    private final PsychiatricRatingScaleMapper psychiatricRatingScaleMapper;

    private final CycleService cycleService;

    private final GetLookUpDao getLookUpDao;

    private final RBACUtils rbacUtils;

    @Autowired
    public SampleServiceImpl(SampleMapper sampleMapper,
                             SampleFilterMapper sampleFilterMapper,
                             DiseaseBaseInformationMapper diseaseBaseInformationMapper,
                             ImagingTestMapper imagingTestMapper,
                             CycleMapper cycleMapper,
                             PsychiatricRatingScaleMapper psychiatricRatingScaleMapper,
                             CycleService cycleService,
                             GetLookUpDao getLookUpDao, RBACUtils rbacUtils) {
        this.sampleMapper = sampleMapper;
        this.sampleFilterMapper = sampleFilterMapper;
        this.diseaseBaseInformationMapper = diseaseBaseInformationMapper;
        this.imagingTestMapper = imagingTestMapper;
        this.cycleMapper = cycleMapper;
        this.psychiatricRatingScaleMapper = psychiatricRatingScaleMapper;
        this.cycleService = cycleService;
        this.getLookUpDao = getLookUpDao;
        this.rbacUtils = rbacUtils;
    }

    @Override
    public Sample getSample(int sampleId) {
        Sample sample = sampleMapper.selectById(sampleId);
        if (sample == null) {
            throw new NotFoundException();
        }
        return sample;
    }

    @Override
    public ListRespData listSample(int limit, int offset, int userId) {
        QueryWrapper<Sample> wrapper=new QueryWrapper<>();
        wrapper.eq("is_delete",0);

        // decide condition according to user role
        RoleInfoData roleInfoData= rbacUtils.getUserRole(userId);
        if(roleInfoData.getRole_name().equals(Role.PI.getName())){
            UserInfoData userInfoData= rbacUtils.getUserInfo(userId);
            wrapper.eq("hospital",userInfoData.getResearch_center_name());
        }else if(roleInfoData.getRole_name().equals(Role.SI.getName())){
            wrapper.eq("user_id",userId);
        }

        int total=sampleMapper.selectCount(wrapper);

        wrapper.orderByDesc("create_time");
        wrapper.last("limit "+limit+" offset "+limit*(offset-1));
        List<Sample> samples = sampleMapper.selectList(wrapper);
        return new ListRespData(limit, offset, total, samples);
    }

    @Override
    public void submitSample(int sampleId) {
        // get all cycles about this sample
        Map<String,Object> whereMap=new HashMap<>();
        whereMap.put("sample_id",sampleId);
        List<Cycle> cycles=cycleMapper.selectByMap(whereMap);

        // check if every psychiatric rating scale are complete
        whereMap.clear();
        for(Cycle cycle:cycles){
            whereMap.put("cycle_id",cycle.getId());
            whereMap.put("is_delete",0);
            PsychiatricRatingScale item=psychiatricRatingScaleMapper.selectByMap(whereMap).get(0);
            if (item.getCumIcu()==null||item.getHads()==null||item.getMoca()==null||item.getIesR()==null){
                throw new CommonException("精神量表未全部填写完毕，无法提交");
            }
        }

        sampleMapper.submitSample(sampleId);
    }

    @Override
    public void dischargeSample(int sampleId) {
        Sample sample=sampleMapper.selectById(sampleId);
        sample.setIsDischarge(1);
        sampleMapper.updateById(sample);
    }

    @Override
    @Transactional
    public Sample createSample(Sample sample, int userId) {
        // check phone number
        if(sample.getPhone().length()!=11){
            throw new ParameterException();
        }

        UserInfoData userInfo=rbacUtils.getUserInfo(userId);
        sample.setHospital(userInfo.getResearch_center_name());
        sample.setUserId(userId);
        sampleMapper.createSample(sample);

        // create sample filter
        SampleFilter sampleFilter = new SampleFilter();
        DaoUtils.initCreateModel(sampleFilter);
        sampleFilter.setSampleId(sample.getId());
        sampleFilterMapper.insert(sampleFilter);

        // create base disease info
        DiseaseBaseInformation diseaseBaseInformation = new DiseaseBaseInformation();
        DaoUtils.initCreateModel(diseaseBaseInformation);
        diseaseBaseInformation.setSampleId(sample.getId());
        diseaseBaseInformationMapper.insert(diseaseBaseInformation);

        // create imaging test
        ImagingTest imagingTest=new ImagingTest();
        DaoUtils.initCreateModel(imagingTest);
        imagingTest.setSampleId(sample.getId());
        imagingTestMapper.insert(imagingTest);

        // create six cycle
        for (int i = 1; i <= 6; i++) {
            cycleService.createCycle(sample.getId(), i, null);
        }

        sample.setIsSubmit(0);
        return sample;
    }

    @Override
    @Transactional
    public void updateSample(Sample sample, int sampleId) {
        Sample exist = sampleMapper.selectById(sampleId);
        if (exist == null) {
            throw new NotFoundException();
        } else {
            sample.setId(exist.getId());
            sample.setHospital(exist.getHospital());
            sampleMapper.updateSample(sample);
        }
    }

    @Override
    public void deleteSample(int sampleId) {
        sampleMapper.softDeleteSample(sampleId);
    }

    @Override
    @Transactional
    public void updateSampleFilter(SampleFilter sampleFilter, int sampleId) {
        QueryWrapper<SampleFilter> wrapper = new QueryWrapper<>();
        wrapper.eq("sample_id", sampleId).eq("is_delete", 0);

        SampleFilter exist = sampleFilterMapper.selectOne(wrapper);
        if (exist == null) {
            throw new NotFoundException();
        }

        sampleFilter.setSampleId(sampleId);
        DaoUtils.initUpdateModel(exist,sampleFilter);

        sampleFilterMapper.updateById(sampleFilter);
    }

    @Override
    public SampleFilter getSampleFilter(int sampleId) {
        QueryWrapper<SampleFilter> wrapper = new QueryWrapper<>();
        wrapper.eq("sample_id", sampleId).eq("is_delete", 0);

        return sampleFilterMapper.selectOne(wrapper);
    }

    @Override
    public void updateSampleDiseaseBaseInformation(DiseaseBaseInformation diseaseBaseInformation, int sampleId) {
        QueryWrapper<DiseaseBaseInformation> wrapper = new QueryWrapper<>();
        wrapper.eq("sample_id", sampleId).eq("is_delete", 0);

        DiseaseBaseInformation exist = diseaseBaseInformationMapper.selectOne(wrapper);
        if (exist == null) {
            throw new NotFoundException();
        }

        diseaseBaseInformation.setSampleId(sampleId);
        DaoUtils.initUpdateModel(exist,diseaseBaseInformation);

        diseaseBaseInformationMapper.updateById(diseaseBaseInformation);
    }

    @Override
    public DiseaseBaseInformation getSampleDiseaseBaseInformation(int sampleId) {
        QueryWrapper<DiseaseBaseInformation> wrapper = new QueryWrapper<>();
        wrapper.eq("sample_id", sampleId).eq("is_delete", 0);

        return diseaseBaseInformationMapper.selectOne(wrapper);
    }

    @Override
    public void updateImagingTest(ImagingTest imagingTest, int sampleId) {
        QueryWrapper<ImagingTest> wrapper=new QueryWrapper<>();
        wrapper.eq("sample_id",sampleId);

        ImagingTest exist=imagingTestMapper.selectOne(wrapper);

        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,imagingTest);
        imagingTest.setSampleId(sampleId);
        imagingTest.setImgPath(exist.getImgPath());
        imagingTest.setPdfPath(exist.getPdfPath());

        imagingTestMapper.updateById(imagingTest);
    }

    @Override
    public ImagingTest getImagingTest(int sampleId) {
        QueryWrapper<ImagingTest> wrapper=new QueryWrapper<>();
        wrapper.eq("sample_id",sampleId).eq("is_delete",0);

        return imagingTestMapper.selectOne(wrapper);
    }

    @Override
    public void uploadImagingTestPdf(MultipartFile file, int sampleId) {
        String fileName= FileUtils.saveFileToResourceWithFolderName("imaging_test_pdf",file);

        QueryWrapper<ImagingTest> wrapper=new QueryWrapper<>();
        wrapper.eq("sample_id",sampleId);

        ImagingTest imagingTest=imagingTestMapper.selectOne(wrapper);
        imagingTest.setPdfPath("imaging_test_pdf/"+fileName);

        imagingTestMapper.updateById(imagingTest);
    }

    @Override
    public void uploadImagingTestImg(MultipartFile file, int sampleId) {
        String fileName=FileUtils.saveFileToResourceWithFolderName("imaging_test_img",file);

        QueryWrapper<ImagingTest> wrapper=new QueryWrapper<>();
        wrapper.eq("sample_id",sampleId);

        ImagingTest imagingTest=imagingTestMapper.selectOne(wrapper);
        imagingTest.setImgPath("imaging_test_img/"+fileName);

        imagingTestMapper.updateById(imagingTest);
    }

    @Override
    public ResponseEntity<Resource> downloadImagingTestPdf(int sampleId) {
        QueryWrapper<ImagingTest> wrapper=new QueryWrapper<>();
        wrapper.eq("sample_id",sampleId);

        ImagingTest imagingTest=imagingTestMapper.selectOne(wrapper);
        String path="resource/"+imagingTest.getPdfPath();
        String type=path.split("\\.")[1];
        return FileUtils.getDownloadFileResp(path,"sample_"+sampleId+"_imagingTest."+type,"application/"+type);
    }

    @Override
    public ResponseEntity<Resource> downloadImagingTestImg(int sampleId) {
        QueryWrapper<ImagingTest> wrapper=new QueryWrapper<>();
        wrapper.eq("sample_id",sampleId);

        ImagingTest imagingTest=imagingTestMapper.selectOne(wrapper);
        String path="resource/"+imagingTest.getImgPath();
        String type=path.split("\\.")[1];
        return FileUtils.getDownloadFileResp(path,"sample_"+sampleId+"_imagingTest."+type,"image/"+type);
    }

    @Override
    public ResponseEntity<Resource> exportSample(List<Integer> sampleIds) {
        QueryWrapper<Sample> wrapper=new QueryWrapper<>();
        wrapper.in("id",sampleIds).orderByDesc("create_time");

        List<Sample> samples=sampleMapper.selectList(wrapper);

        // 填充基本资料
        List<BaseInformation> baseInformationList=new ArrayList<>();
        Map<Integer,DiseaseBaseInformation> diseaseBaseInformationMap= getLookUpDao.getDiseaseBaseInformationSampleIdLookup(sampleIds);
        Map<Integer,ConditionScore> conditionScoreMap=getLookUpDao.getConditionScoreSampleIdLookup(sampleIds);
        Map<Integer,TreatmentEffect> treatmentEffectMap=getLookUpDao.getTreatmentEffectSampleIdLookup(sampleIds);
        for(Sample sample:samples){
            BaseInformation baseInformation=new BaseInformation();
            baseInformation.setBaseBySample(sample);
            baseInformation.fillDiseaseBaseInformation(diseaseBaseInformationMap.get(sample.getId()));
            baseInformation.fillConditionScore(conditionScoreMap.getOrDefault(sample.getId(),new ConditionScore()));
            baseInformation.fillTreatmentEffect(treatmentEffectMap.getOrDefault(sample.getId(),new TreatmentEffect()));
            baseInformationList.add(baseInformation);
        }

        // 填充入院信息
        List<AdmissionInformation> admissionInformationList=new ArrayList<>();
        Map<Integer,List<DetailAdmissionCycleDTO>> detailAdmissionCycleMap=getLookUpDao.getDetailAdmissionCycleDTOSampleIdLookup(sampleIds);
        Map<Integer,DetailLabTestDTO> detailLabTestMap=getLookUpDao.getDetailLabTestDTOCycleIdLookup(sampleIds);
        for(Sample sample:samples){
            for(DetailAdmissionCycleDTO admissionCycle:detailAdmissionCycleMap.get(sample.getId())){
                AdmissionInformation admissionInformation=new AdmissionInformation();
                admissionInformation.setBaseBySample(sample);
                admissionInformation.setCycleName(admissionCycle.getCycleName());
                admissionInformation.fillVitalSigns(admissionCycle.getVitalSigns());
                admissionInformation.fillPsychiatricRatingScale(admissionCycle.getPsychiatricRatingScale());
                admissionInformation.fillLabTest(detailLabTestMap.get(admissionCycle.getCycleId()));
                admissionInformationList.add(admissionInformation);
            }
        }

        // 填充随访信息
        List<FollowUpInformation> followUpInformationList=new ArrayList<>();
        Map<Integer,List<DetailFollowUpCycleDTO>> detailFollowUpCycleMap=getLookUpDao.getDetailFollowUpCycleDTOSampleIdLookup(sampleIds);
        for (Sample sample:samples){
            for (DetailFollowUpCycleDTO detailFollowUpCycle:detailFollowUpCycleMap.get(sample.getId())){
                FollowUpInformation followUpInformation=new FollowUpInformation();
                followUpInformation.setBaseBySample(sample);
                followUpInformation.setCycleName(detailFollowUpCycle.getCycleName());
                followUpInformation.fillPsychiatricRatingScale(detailFollowUpCycle.getPsychiatricRatingScale());
                followUpInformationList.add(followUpInformation);
            }
        }

        File file=new File("export.xlsx");
        ExcelWriter excelWriter=EasyExcel.write(file).registerWriteHandler(new LongestMatchColumnWidthStyleStrategy()).build();

        excelWriter.write(baseInformationList,EasyExcel.writerSheet(0,"基本资料").head(BaseInformation.class).build());
        excelWriter.write(admissionInformationList,EasyExcel.writerSheet(1,"入院信息").head(AdmissionInformation.class).build());
        excelWriter.write(followUpInformationList,EasyExcel.writerSheet(2,"随访信息").head(FollowUpInformation.class).build());
        excelWriter.finish();
        return FileUtils.getDownloadFileResp(file,"application/xlsx");
    }

    @Override
    public void unlockSample(int sampleId) {
        Sample sample=sampleMapper.selectById(sampleId);
        sample.setIsSubmit(0);
        sampleMapper.updateById(sample);
    }

}
