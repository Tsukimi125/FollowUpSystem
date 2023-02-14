package com.rwe.tongji_follow_up.model.json;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DrugInformation {
    private Integer isExist;
    private String drugName;
    private String dosage;
    private String time;
}
