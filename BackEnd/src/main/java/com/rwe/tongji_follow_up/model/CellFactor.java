package com.rwe.tongji_follow_up.model;


import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CellFactor extends BaseModel {
    private Double ifnY;
    private Double tnfAlpha;
    @TableField(value = "interleukin_10")
    private Double interleukin10;
    @TableField(value = "interleukin_6")
    private Double interleukin6;
    @TableField(value = "interleukin_4")
    private Double interleukin4;
    @TableField(value = "interleukin_2")
    private Double interleukin2;
    private Integer labTestId;
}
