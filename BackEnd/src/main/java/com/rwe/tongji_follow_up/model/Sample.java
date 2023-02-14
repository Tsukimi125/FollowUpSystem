package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class Sample extends BaseModel {
    private String hospital;
    private String hospitalNumber;
    private Date admissionDate;
    private String phone;
    private String name;
    private String sex;
    private Integer age;
    private double height;
    private double weight;
    private double bmi;
    private Integer maritalStatus;
    private Integer education;
    private Integer occupation;
    private Integer isDischarge;
    private Integer isSubmit;
    private Integer userId;

}
