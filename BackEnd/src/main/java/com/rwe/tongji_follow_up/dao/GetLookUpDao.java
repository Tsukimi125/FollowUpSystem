package com.rwe.tongji_follow_up.dao;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.rwe.tongji_follow_up.mapper.*;
import com.rwe.tongji_follow_up.model.ConditionScore;
import com.rwe.tongji_follow_up.model.DiseaseBaseInformation;
import com.rwe.tongji_follow_up.model.TreatmentEffect;
import com.rwe.tongji_follow_up.model.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class GetLookUpDao {

    private final DiseaseBaseInformationMapper diseaseBaseInformationMapper;
    private final ConditionScoreMapper conditionScoreMapper;
    private final TreatmentEffectMapper treatmentEffectMapper;
    private final CycleMapper cycleMapper;
    private final LabTestMapper labTestMapper;

    @Autowired
    public GetLookUpDao(DiseaseBaseInformationMapper diseaseBaseInformationMapper,
                        ConditionScoreMapper conditionScoreMapper,
                        TreatmentEffectMapper treatmentEffectMapper,
                        CycleMapper cycleMapper, LabTestMapper labTestMapper) {
        this.diseaseBaseInformationMapper = diseaseBaseInformationMapper;
        this.conditionScoreMapper = conditionScoreMapper;
        this.treatmentEffectMapper = treatmentEffectMapper;
        this.cycleMapper = cycleMapper;
        this.labTestMapper = labTestMapper;
    }

    public Map<Integer, DiseaseBaseInformation> getDiseaseBaseInformationSampleIdLookup(List<Integer> sampleIds){
        QueryWrapper<DiseaseBaseInformation> wrapper=new QueryWrapper<>();
        wrapper.in("sample_id",sampleIds);
        List<DiseaseBaseInformation> list=diseaseBaseInformationMapper.selectList(wrapper);
        HashMap<Integer,DiseaseBaseInformation> res=new HashMap<>();
        for(DiseaseBaseInformation item:list){
            res.put(item.getSampleId(),item);
        }
        return res;
    }

    public Map<Integer,ConditionScore> getConditionScoreSampleIdLookup(List<Integer> sampleIds){
        List<SampleConditionScoreDTO> list=conditionScoreMapper.getConditionBySampleIds(sampleIds);
        HashMap<Integer,ConditionScore> res=new HashMap<>();
        for(SampleConditionScoreDTO item:list){
            res.put(item.getSampleId(),item.getConditionScore());
        }
        return res;
    }

    public Map<Integer, TreatmentEffect> getTreatmentEffectSampleIdLookup(List<Integer> sampleIds){
        List<SampleTreatmentEffectDTO> list=treatmentEffectMapper.getTreatmentEffectBySampleIds(sampleIds);
        HashMap<Integer,TreatmentEffect> res=new HashMap<>();
        for(SampleTreatmentEffectDTO item:list){
            res.put(item.getSampleId(),item.getTreatmentEffect());
        }
        return res;
    }

    public Map<Integer,List<DetailAdmissionCycleDTO>> getDetailAdmissionCycleDTOSampleIdLookup(List<Integer> sampleIds){
        List<DetailAdmissionCycleDTO> list=cycleMapper.getDetailAdmissionCycleBySampleIds(sampleIds);
        HashMap<Integer,List<DetailAdmissionCycleDTO>> res=new HashMap<>();
        for(DetailAdmissionCycleDTO item:list){
            List<DetailAdmissionCycleDTO> v=res.getOrDefault(item.getSampleId(),null);
            if(v==null){
                v=new ArrayList<>();
            }
            v.add(item);
            res.put(item.getSampleId(),v);
        }
        return res;
    }

    public Map<Integer,DetailLabTestDTO> getDetailLabTestDTOCycleIdLookup(List<Integer> sampleIds){
        List<DetailLabTestDTO> list=labTestMapper.getDetailLabTestBySampleIds(sampleIds);
        HashMap<Integer,DetailLabTestDTO> res=new HashMap<>();
        for(DetailLabTestDTO item:list){
            res.put(item.getCycleId(),item);
        }
        return res;
    }

    public Map<Integer, List<DetailFollowUpCycleDTO>> getDetailFollowUpCycleDTOSampleIdLookup(List<Integer> sampleIds){
        List<DetailFollowUpCycleDTO> list=cycleMapper.getDetailFollowUpCycleBySampleIds(sampleIds);
        HashMap<Integer,List<DetailFollowUpCycleDTO>> res=new HashMap<>();
        for (DetailFollowUpCycleDTO item:list){
            List<DetailFollowUpCycleDTO> v=res.getOrDefault(item.getSampleId(),null);
            if(v==null){
                v=new ArrayList<>();
            }
            v.add(item);
            res.put(item.getSampleId(),v);
        }
        return res;
    }
}
