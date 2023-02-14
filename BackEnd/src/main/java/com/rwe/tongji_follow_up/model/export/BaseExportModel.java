package com.rwe.tongji_follow_up.model.export;

import com.alibaba.excel.annotation.ExcelIgnore;
import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.format.DateTimeFormat;
import com.alibaba.excel.annotation.write.style.HeadFontStyle;
import com.alibaba.excel.annotation.write.style.HeadStyle;
import com.alibaba.excel.enums.poi.FillPatternTypeEnum;
import com.rwe.tongji_follow_up.model.Sample;
import lombok.Getter;
import lombok.Setter;
import org.apache.poi.ss.usermodel.IndexedColors;

import java.util.Date;

@Setter
@Getter
// color id = IndexedColors.WHITE.getIndex()
@HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = 9)
public class BaseExportModel {

    // RED
    protected static final int SplitHeaderColor=10;

    // SKY-BLUE
    protected static final int TypeHeaderColor=40;
    protected static final int TypeContentColor=40;

    @ExcelProperty(value = "医院",index = 0)
    private String hospital;
    @ExcelProperty(value = "住院号",index = 1)
    private String hospitalNumber;
    @ExcelProperty(value = "姓名",index = 2)
    private String name;
    @ExcelProperty(value = "性别",index = 3)
    private String sex;
    @ExcelProperty(value = "年龄",index = 4)
    private Integer age;
    @DateTimeFormat("yyyy年MM月dd日")
    @ExcelProperty(value = "入院日期",index = 5)
    private Date admissionDate;
    @ExcelProperty(value = "联系电话",index = 6)
    private String phone;

    public void setBaseBySample(Sample sample){
        this.setAge(sample.getAge());
        this.setHospital(sample.getHospital());
        this.setHospitalNumber(sample.getHospitalNumber());
        this.setName(sample.getName());
        this.setPhone(sample.getPhone());
        this.setSex(sample.getSex());
        this.setAdmissionDate(sample.getAdmissionDate());
    }
}
