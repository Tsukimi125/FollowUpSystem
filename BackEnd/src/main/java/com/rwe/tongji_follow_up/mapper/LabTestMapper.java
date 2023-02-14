package com.rwe.tongji_follow_up.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rwe.tongji_follow_up.model.LabTest;
import com.rwe.tongji_follow_up.model.dto.DetailLabTestDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LabTestMapper extends BaseMapper<LabTest> {
    List<DetailLabTestDTO> getDetailLabTestBySampleIds(List<Integer> sampleIds);
}
