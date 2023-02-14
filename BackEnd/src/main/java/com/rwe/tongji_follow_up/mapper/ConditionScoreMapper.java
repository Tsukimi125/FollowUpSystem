package com.rwe.tongji_follow_up.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rwe.tongji_follow_up.model.ConditionScore;
import com.rwe.tongji_follow_up.model.dto.SampleConditionScoreDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ConditionScoreMapper extends BaseMapper<ConditionScore> {
    List<SampleConditionScoreDTO> getConditionBySampleIds(List<Integer> sampleIds);
}
