package com.rwe.tongji_follow_up.model;


import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class InflammationIndicators extends BaseModel {
    @TableField(value = "il_6")
    private Double il6;
    @TableField(value = "il_1b")
    private Double il1B;
    @TableField(value = "il_10")
    private Double il10;
    private Double tnfA;
    private Double pct;
    private Double crp;
    private Double ferritin;
    private Integer labTestId;
}
