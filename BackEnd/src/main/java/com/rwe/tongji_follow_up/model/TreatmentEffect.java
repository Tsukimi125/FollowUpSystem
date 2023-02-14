package com.rwe.tongji_follow_up.model;


import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TreatmentEffect extends BaseModel {
    private String shock;
    private String anoxiaTime;
    private String oxygenUptake;
    private String useInvasiveVentilator;
    private String useNonInvasiveVentilator;
    private String sedative;
    private String analgesic;
    private String delirium;
    private String antibacterialDrug;
    private String neuroprotectiveAgent;
    @TableField(value = "corticosteroid_in_icu_72")
    private String corticosteroidInIcu72;
    private String vasoactiveDrug;
    private Integer treatmentOutcome;
    private Integer cycleId;
}
