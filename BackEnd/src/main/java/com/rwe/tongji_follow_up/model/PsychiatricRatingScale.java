package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class PsychiatricRatingScale extends BaseModel {
    private String cumIcu;
    private String moca;
    private String hads;
    private String iesR;
    private Integer isExist;
    private Integer cycleId;
}
