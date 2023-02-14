package com.rwe.tongji_follow_up.model;


import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@TableName("rheumatism_14")
public class Rheumatism14 extends BaseModel {
    private String antinuclearAntibody;
    private String aniDna;
    private String antinuclearChromatinAntibody;
    private String aniRnpA;
    @TableField(value = "ani_rnp_68")
    private String aniRnp68;
    private String aniSmNrnp;
    private String aniSm;
    private String aniSsA;
    @TableField(value = "ani_ro_52")
    private String aniRo52;
    private String aniSsB;
    @TableField(value = "ani_scl_70")
    private String aniScl70;
    @TableField(value = "ani_jo_1")
    private String aniJo1;
    private String aniCentromereBProtein;
    private String aniChromatin;
    private String ribosomalPProtein;
    private Integer labTestId;
}
