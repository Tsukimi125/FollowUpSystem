package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ImagingTest extends BaseModel {
    private String imagingNum;
    private String reportContent;
    private String pdfPath;
    private String imgPath;
    private Integer isExist;
    private Integer sampleId;
}
