package com.rwe.tongji_follow_up.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.rwe.tongji_follow_up.model.Sample;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SampleMapper extends BaseMapper<Sample> {
    List<Sample> listSample(int limit,int offset);
    void updateSample(Sample sample);
    void createSample(Sample sample);
    void softDeleteSample(int sampleId);
    void submitSample(int sampleId);
    int countSample();
}
