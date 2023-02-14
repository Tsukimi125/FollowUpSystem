package com.rwe.tongji_follow_up.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rwe.tongji_follow_up.model.Cycle;
import com.rwe.tongji_follow_up.model.dto.DetailAdmissionCycleDTO;
import com.rwe.tongji_follow_up.model.dto.DetailFollowUpCycleDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CycleMapper extends BaseMapper<Cycle> {
    List<DetailAdmissionCycleDTO> getDetailAdmissionCycleBySampleIds(List<Integer> sampleIds);
    List<DetailFollowUpCycleDTO> getDetailFollowUpCycleBySampleIds(List<Integer> sampleIds);
}
