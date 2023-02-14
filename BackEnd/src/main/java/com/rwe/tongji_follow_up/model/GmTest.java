package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class GmTest extends BaseModel {
    private Double fungalBDGlucan;
    private Double aspergillusGalactomannan;
    private Integer labTestId;
}
