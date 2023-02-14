package com.rwe.tongji_follow_up.model;


import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ArterialBloodGas extends BaseModel {
    private Double ph;
    @TableField(value = "pco_2")
    private Double pco2;
    private Double oxygenPressure;
    private Double oxygenSaturation;
    private Double carbonicAcid;
    private Integer labTestId;
}
