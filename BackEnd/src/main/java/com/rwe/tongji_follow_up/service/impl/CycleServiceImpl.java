package com.rwe.tongji_follow_up.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.rwe.tongji_follow_up.enums.EnumMaps;
import com.rwe.tongji_follow_up.exception.exec.CommonException;
import com.rwe.tongji_follow_up.exception.exec.NotFoundException;
import com.rwe.tongji_follow_up.exception.exec.ParameterException;
import com.rwe.tongji_follow_up.mapper.*;
import com.rwe.tongji_follow_up.model.*;
import com.rwe.tongji_follow_up.resp.CycleRespData;
import com.rwe.tongji_follow_up.service.CycleService;
import com.rwe.tongji_follow_up.service.LabTestService;
import com.rwe.tongji_follow_up.util.CommonUtils;
import com.rwe.tongji_follow_up.util.DaoUtils;
import com.rwe.tongji_follow_up.util.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class CycleServiceImpl implements CycleService {

    private final CycleMapper cycleMapper;
    private final VitalSignsMapper vitalSignsMapper;
    private final ConditionScoreMapper conditionScoreMapper;
    private final TreatmentEffectMapper treatmentEffectMapper;
    private final PsychiatricRatingScaleMapper psychiatricRatingScaleMapper;
    private final LabTestMapper labTestMapper;

    private final LabTestService labTestService;

    @Autowired
    public CycleServiceImpl(CycleMapper cycleMapper,
                            VitalSignsMapper vitalSignsMapper,
                            ConditionScoreMapper conditionScoreMapper,
                            TreatmentEffectMapper treatmentEffectMapper,
                            PsychiatricRatingScaleMapper psychiatricRatingScaleMapper,
                            LabTestMapper labTestMapper,
                            LabTestService labTestService) {
        this.cycleMapper = cycleMapper;
        this.vitalSignsMapper = vitalSignsMapper;
        this.conditionScoreMapper = conditionScoreMapper;
        this.treatmentEffectMapper = treatmentEffectMapper;
        this.psychiatricRatingScaleMapper = psychiatricRatingScaleMapper;
        this.labTestMapper = labTestMapper;
        this.labTestService = labTestService;
    }


    @Override
    public List<Cycle> listCycle(int sampleId) {
        QueryWrapper<Cycle> wrapper=new QueryWrapper<>();
        wrapper.eq("sample_id",sampleId).eq("is_delete",0);

        return cycleMapper.selectList(wrapper);
    }

    @Override
    @Transactional
    public Cycle createCycle(int sampleId, int type, Date date) {
        Cycle cycle=new Cycle();
        if(!(type>=1&&type<=7)){
            throw new ParameterException();
        }
        cycle.setType(type);
        cycle.setSampleId(sampleId);
        cycle.setCreateTime(new Date());
        cycle.setUpdateTime(new Date());
        cycle.setDate(date);
        cycle.setName(EnumMaps.cycleType.get(type));

        if(type==7){
            // auto generate cycle name for type 7 cycle
            QueryWrapper<Cycle> wrapper=new QueryWrapper<>();
            wrapper.eq("sample_id",sampleId).eq("type",1);
            Cycle firstCycle=cycleMapper.selectOne(wrapper);
            Date firstDate=firstCycle.getDate();
            if(firstDate==null){
                throw new CommonException("入科第一天日期未填写");
            }
            if(firstDate.after(date)){
                throw new CommonException("所填日期早于入科第一天日期");
            }
            int diff=CommonUtils.getDayBetweenDate(firstDate,date);
            if (diff==0){
                throw new CommonException("所填日期不能为入科第一天日期");
            }
            diff++;
            cycle.setName("入科第"+diff+"天");
            wrapper=new QueryWrapper<>();
            wrapper.eq("name",cycle.getName()).eq("sample_id",sampleId);
            Cycle exist=cycleMapper.selectOne(wrapper);
            if(exist!=null){
                throw new CommonException("该日期的治疗信息已被创建");
            }
        }

        cycleMapper.insert(cycle);
        int cycleId=cycle.getId();

        if(type==1||type==2||type==7){
            VitalSigns vitalSigns=new VitalSigns();
            vitalSigns.setCycleId(cycleId);
            DaoUtils.initCreateModel(vitalSigns);
            vitalSignsMapper.insert(vitalSigns);

            labTestService.createLabTest(cycleId);
        }

        if(type==1){
            ConditionScore conditionScore=new ConditionScore();
            conditionScore.setCycleId(cycleId);
            DaoUtils.initCreateModel(conditionScore);
            conditionScoreMapper.insert(conditionScore);
        }

        if(type==2){
            TreatmentEffect treatmentEffect=new TreatmentEffect();
            treatmentEffect.setCycleId(cycleId);
            DaoUtils.initCreateModel(treatmentEffect);
            treatmentEffectMapper.insert(treatmentEffect);
        }

        PsychiatricRatingScale psychiatricRatingScale=new PsychiatricRatingScale();
        psychiatricRatingScale.setCycleId(cycleId);
        DaoUtils.initCreateModel(psychiatricRatingScale);
        psychiatricRatingScaleMapper.insert(psychiatricRatingScale);

        return cycle;

    }

    @Override
    public CycleRespData getCycle(int cycleId) {
        Cycle cycle=cycleMapper.selectById(cycleId);
        if(cycle==null){
            throw new NotFoundException();
        }
        CycleRespData resp=new CycleRespData(cycle);

        Map<String,Object> whereMap=new HashMap<>();
        whereMap.put("cycle_id",cycleId);

        List list;

        list=vitalSignsMapper.selectByMap(whereMap);
        resp.setVitalSigns(list.size()==0?null: (VitalSigns) list.get(0));

        list=conditionScoreMapper.selectByMap(whereMap);
        resp.setConditionScore(list.size()==0?null: (ConditionScore) list.get(0));

        list=treatmentEffectMapper.selectByMap(whereMap);
        resp.setTreatmentEffect(list.size()==0?null: (TreatmentEffect) list.get(0));

        list=psychiatricRatingScaleMapper.selectByMap(whereMap);
        resp.setPsychiatricRatingScale(list.size()==0?null: (PsychiatricRatingScale) list.get(0));

        list=labTestMapper.selectByMap(whereMap);
        resp.setLabTest(list.size()==0?null: (LabTest) list.get(0));

        return resp;
    }

    @Override
    public void updateCycle(Cycle cycle, int cycleId) {
        Cycle exist=cycleMapper.selectById(cycleId);
        if (exist == null) {
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,cycle);
        cycle.setType(exist.getType());
        cycle.setSampleId(exist.getSampleId());

        cycleMapper.updateById(cycle);
    }

    @Override
    public void updateVitalSigns(VitalSigns vitalSigns, int cycleId) {
        QueryWrapper<VitalSigns> wrapper=new QueryWrapper<>();
        wrapper.eq("cycle_id",cycleId);

        VitalSigns exist=vitalSignsMapper.selectOne(wrapper);

        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,vitalSigns);
        vitalSigns.setCycleId(cycleId);

        vitalSignsMapper.updateById(vitalSigns);
    }

    @Override
    public void updateConditionScore(ConditionScore conditionScore, int cycleId) {
        QueryWrapper<ConditionScore> wrapper=new QueryWrapper<>();
        wrapper.eq("cycle_id",cycleId);

        ConditionScore exist=conditionScoreMapper.selectOne(wrapper);

        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,conditionScore);
        conditionScore.setCycleId(cycleId);

        conditionScoreMapper.updateById(conditionScore);
    }

    @Override
    public void updateTreatmentEffect(TreatmentEffect treatmentEffect, int cycleId) {
        QueryWrapper<TreatmentEffect> wrapper=new QueryWrapper<>();
        wrapper.eq("cycle_id",cycleId);

        TreatmentEffect exist=treatmentEffectMapper.selectOne(wrapper);

        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,treatmentEffect);
        treatmentEffect.setCycleId(cycleId);

        treatmentEffectMapper.updateById(treatmentEffect);
    }

    @Override
    public void updatePsychiatricRatingScale(PsychiatricRatingScale psychiatricRatingScale, int cycleId) {
        QueryWrapper<PsychiatricRatingScale> wrapper=new QueryWrapper<>();
        wrapper.eq("cycle_id",cycleId);

        PsychiatricRatingScale exist=psychiatricRatingScaleMapper.selectOne(wrapper);

        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,psychiatricRatingScale);
        psychiatricRatingScale.setCycleId(cycleId);

        psychiatricRatingScaleMapper.updateById(psychiatricRatingScale);
    }

}
