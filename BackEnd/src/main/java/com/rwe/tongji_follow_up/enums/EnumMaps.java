package com.rwe.tongji_follow_up.enums;

import com.google.common.collect.ImmutableMap;

import java.util.Map;

public class EnumMaps {
    public final static Map<Integer,String> cycleType= ImmutableMap.<Integer,String>builder()
            .put(1,"入科第1天")
            .put(2,"出院或转出ICU 24小时内")
            .put(3,"入组第30天")
            .put(4,"入组第90天")
            .put(5,"入组第180天")
            .put(6,"入组第365天")
            .put(7,"入科第x天")
            .build();

    public final static Map<Integer,String> yesOrNo=ImmutableMap.<Integer,String>builder()
            .put(0,"否")
            .put(1,"是")
            .build();

    public final static Map<Integer,String> martialStatus=ImmutableMap.<Integer,String>builder()
            .put(0,"已婚")
            .put(1,"未婚")
            .put(2,"离异")
            .put(3,"丧偶")
            .build();

    public final static Map<Integer,String> education=ImmutableMap.<Integer,String>builder()
            .put(0,"未接受正规学校教育")
            .put(1,"小学")
            .put(2,"初中")
            .put(3,"高中/中专")
            .put(4,"本科/专科")
            .put(5,"研究生及以上")
            .build();

    public final static Map<Integer,String> occupation=ImmutableMap.<Integer,String>builder()
            .put(0,"农林牧渔人员")
            .put(1,"生产、运输设备操作及相关人员")
            .put(2,"机关单位人员")
            .put(3,"企业人员")
            .put(4,"商业及服务业人员")
            .put(5,"专业技术人员")
            .put(6,"退休人员")
            .put(7,"其他")
            .build();

    public final static Map<Integer,String> pastHistory=ImmutableMap.<Integer,String>builder()
            .put(0,"无")
            .put(1,"高血压")
            .put(2,"冠心病")
            .put(3,"高脂血症")
            .put(4,"脑血管性疾病")
            .put(5,"肾脏性疾病")
            .put(6,"肝脏性疾病")
            .put(7,"精神性疾病")
            .put(8,"恶性肿瘤")
            .put(9,"其他")
            .build();

    public final static Map<Integer,String> infectionSource=ImmutableMap.<Integer,String>builder()
            .put(0,"呼吸系统感染")
            .put(1,"泌尿系感染")
            .put(2,"皮肤软组织感染")
            .put(3,"消化系统感染")
            .put(4,"血源性感染")
            .put(5,"其他")
            .build();

    public final static Map<Integer,String> treatmentOutcome=ImmutableMap.<Integer,String>builder()
            .put(1,"出院")
            .put(2,"转归")
            .put(3,"死亡")
            .build();

    public final static Map<Integer,String> bloodCulture=ImmutableMap.<Integer,String>builder()
            .put(0,"阴性")
            .put(1,"阳性")
            .build();

    public final static Map<Integer,String> camIcu=ImmutableMap.<Integer,String>builder()
            .put(0,"-5")
            .put(1,"-4")
            .put(2,"-3")
            .put(3,"-2")
            .put(4,"-1")
            .put(5,"0")
            .put(6,"+1")
            .put(7,"+2")
            .put(8,"+3")
            .put(9,"+4")
            .build();

    public final static Map<Integer,String> moca=ImmutableMap.<Integer,String>builder()
            .put(0,"≥26分")
            .put(1,"18-26分")
            .put(2,"10-17分")
            .put(3,"＜10分")
            .build();

    public final static Map<Integer,String> hads=ImmutableMap.<Integer,String>builder()
            .put(0,"0-7分")
            .put(1,"8-10分")
            .put(2,"11-21分")
            .build();

    public final static Map<Integer,String> iesR=ImmutableMap.<Integer,String>builder()
            .put(0,"0-8分")
            .put(1,"9-25分")
            .put(2,"26-43分")
            .put(3,"44-88分")
            .build();
}
