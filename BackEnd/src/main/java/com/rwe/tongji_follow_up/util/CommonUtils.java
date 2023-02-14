package com.rwe.tongji_follow_up.util;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Date;
import java.util.List;

public class CommonUtils {

    public static int getDayBetweenDate(Date a,Date b){
        return Math.abs((int) ((a.getTime()-b.getTime())/(1000*3600*24)));
    }

    public static <T> List<T> parseJsonStrToList(String jsonStr){
        ObjectMapper objectMapper=new ObjectMapper();
        try{
            return objectMapper.readValue(jsonStr,List.class);
        }catch (Exception e){
            return null;
        }
    }
}
