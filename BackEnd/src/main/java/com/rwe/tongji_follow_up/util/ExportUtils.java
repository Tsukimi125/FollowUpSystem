package com.rwe.tongji_follow_up.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rwe.tongji_follow_up.enums.EnumMaps;
import com.rwe.tongji_follow_up.model.Sample;
import com.rwe.tongji_follow_up.model.export.BaseExportModel;
import com.rwe.tongji_follow_up.model.json.DrugInformation;
import com.rwe.tongji_follow_up.model.json.EnumWithNote;
import com.rwe.tongji_follow_up.model.json.OxygenUptake;
import org.springframework.stereotype.Component;

import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class ExportUtils {
    public static String getDrugNameDosageTimeStr(String jsonStr){
        if(jsonStr==null){
            return "";
        }
        ObjectMapper objectMapper=new ObjectMapper();
        try{
            DrugInformation drugInformation=objectMapper.readValue(jsonStr,DrugInformation.class);
            if(drugInformation.getIsExist()!=null&&drugInformation.getIsExist()==0){
                return "";
            }
            StringBuffer stringBuffer=new StringBuffer();
            if(drugInformation.getDrugName()!=null){
                stringBuffer.append("药名:");
                stringBuffer.append(drugInformation.getDrugName());
                stringBuffer.append(";");
            }
            if(drugInformation.getDosage()!=null){
                stringBuffer.append("累积剂量:");
                stringBuffer.append(drugInformation.getDosage());
                stringBuffer.append(";");
            }
            if(drugInformation.getTime()!=null){
                stringBuffer.append("用药时间:");
                stringBuffer.append(drugInformation.getTime());
                stringBuffer.append(";");
            }
            return stringBuffer.toString();
        }catch (Exception e){
            e.printStackTrace();
            return "";
        }
    }

    public static String getIsUseDrugStr(String jsonStr){
        if(jsonStr==null){
            return "";
        }
        ObjectMapper objectMapper=new ObjectMapper();
        try {
            DrugInformation drugInformation=objectMapper.readValue(jsonStr,DrugInformation.class);
            if(drugInformation.getIsExist()==null){
               return "";
            }
            return EnumMaps.yesOrNo.get(drugInformation.getIsExist());
        }catch (Exception e){
            e.printStackTrace();
            return "";
        }
    }

    public static String getEnumWithNoteStr(String jsonStr, Map<Integer,String> enumMap){
        if (jsonStr==null){
            return "";
        }
        ObjectMapper objectMapper=new ObjectMapper();
        try {
            EnumWithNote enumWithNote=objectMapper.readValue(jsonStr,EnumWithNote.class);
            if (enumWithNote.getIsExist()==null){
                return "";
            }
            if (enumWithNote.getIsExist()==1){
                String res=enumMap.get(enumWithNote.getValue());
                if(enumWithNote.getNote()!=null){
                    res+=";备注:"+enumWithNote.getNote();
                }
                return res;
            }else{
                return "未填写，原因:"+enumWithNote.getNote();
            }
        }catch (Exception e){
            e.printStackTrace();
            return "";
        }
    }

    public static String getOxygenUptakeStr(String jsonStr){
        if(jsonStr==null){
            return "";
        }
        ObjectMapper objectMapper=new ObjectMapper();
        try {
            OxygenUptake oxygenUptake=objectMapper.readValue(jsonStr,OxygenUptake.class);
            StringBuffer stringBuffer=new StringBuffer();
            if (oxygenUptake.getFlow()!=null){
                stringBuffer.append("氧流量:");
                stringBuffer.append(oxygenUptake.getFlow());
                stringBuffer.append(";");
            }
            if (oxygenUptake.getMethod()!=null){
                stringBuffer.append("吸氧方式:");
                stringBuffer.append(oxygenUptake.getMethod());
                stringBuffer.append(";");
            }
            return stringBuffer.toString();
        }catch (Exception e){
            e.printStackTrace();
            return "";
        }
    }
}
