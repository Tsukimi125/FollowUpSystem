package com.rwe.tongji_follow_up.util;

import com.rwe.tongji_follow_up.model.BaseModel;

import java.util.Date;

public class DaoUtils {
    public static void initCreateModel(BaseModel model){
        model.setCreateTime(new Date());
        model.setUpdateTime(new Date());
    }

    public static void initUpdateModel(BaseModel exist,BaseModel update){
        update.setId(exist.getId());
        update.setCreateTime(exist.getCreateTime());
        update.setUpdateTime(new Date());
        update.setIsDelete(exist.getIsDelete());
    }
}
