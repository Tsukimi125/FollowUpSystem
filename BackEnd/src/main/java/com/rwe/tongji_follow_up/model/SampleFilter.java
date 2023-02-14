package com.rwe.tongji_follow_up.model;


import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class SampleFilter extends BaseModel {
    private Integer isSepsis3Standard;
    private Integer isSuitableAge;
    @TableField(value = "is_icu_large_24h")
    private Integer isIcuLarge24H;
    private Integer isInformedConsent;
    private Integer isUnsuitableAge;
    private Integer isSufferedCancer;
    private Integer isCnsDiseases;
    private Integer isMentalIllness;
    private Integer isCannotFinish;
    private Integer isPregnancyLactation;
    private Integer isRefuseInformedConsent;
    private Integer sampleId;
}
