package com.rwe.tongji_follow_up.model.export;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.write.style.ContentStyle;
import com.alibaba.excel.annotation.write.style.HeadStyle;
import com.alibaba.excel.enums.poi.FillPatternTypeEnum;
import com.rwe.tongji_follow_up.enums.EnumMaps;
import com.rwe.tongji_follow_up.model.PsychiatricRatingScale;
import com.rwe.tongji_follow_up.util.ExportUtils;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowUpInformation extends BaseExportModel{
    @HeadStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.TypeHeaderColor)
    @ContentStyle(fillPatternType = FillPatternTypeEnum.SOLID_FOREGROUND,fillForegroundColor = BaseExportModel.TypeContentColor)
    @ExcelProperty("随访时间")
    private String cycleName;

    @ExcelProperty("CAM-ICU评分")
    private String cumIcu;
    @ExcelProperty("Moca评分")
    private String moca;
    @ExcelProperty("HADS评分")
    private String hads;
    @ExcelProperty("IES-R评分")
    private String iesR;

    public void fillPsychiatricRatingScale(PsychiatricRatingScale psychiatricRatingScale){
        this.setCumIcu(ExportUtils.getEnumWithNoteStr(psychiatricRatingScale.getCumIcu(), EnumMaps.camIcu));
        this.setMoca(ExportUtils.getEnumWithNoteStr(psychiatricRatingScale.getMoca(),EnumMaps.moca));
        this.setHads(ExportUtils.getEnumWithNoteStr(psychiatricRatingScale.getHads(),EnumMaps.hads));
        this.setIesR(ExportUtils.getEnumWithNoteStr(psychiatricRatingScale.getIesR(),EnumMaps.iesR));
    }
}
