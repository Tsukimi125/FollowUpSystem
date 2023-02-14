package com.rwe.tongji_follow_up.exception.exec;

import com.rwe.tongji_follow_up.enums.ErrorCode;

public class NotFoundException extends BaseException{
    public NotFoundException(){
        super(ErrorCode.RESOURCE_NOT_FOUND);
    }
}
