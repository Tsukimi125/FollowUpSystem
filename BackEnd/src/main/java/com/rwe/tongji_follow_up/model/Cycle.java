package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class Cycle extends BaseModel {
    private Integer sampleId;
    private Integer type;
    private Date date;
    private String name;
}
