package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class SpecialInspection extends BaseModel {
    private String cardiacUltrasound;
    private String electrocardiogram;
    private Double hsCtn;
    private Double proBnp;
    private String xRayChestFilm;
    private String bloodCulture;
    private Integer labTestId;
}
