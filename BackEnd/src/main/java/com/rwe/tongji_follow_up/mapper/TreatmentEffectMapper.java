package com.rwe.tongji_follow_up.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rwe.tongji_follow_up.model.TreatmentEffect;
import com.rwe.tongji_follow_up.model.dto.SampleTreatmentEffectDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TreatmentEffectMapper extends BaseMapper<TreatmentEffect> {
    List<SampleTreatmentEffectDTO> getTreatmentEffectBySampleIds(List<Integer> sampleIds);
}
