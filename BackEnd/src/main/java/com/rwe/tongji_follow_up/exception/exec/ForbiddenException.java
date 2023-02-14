package com.rwe.tongji_follow_up.exception.exec;

import com.rwe.tongji_follow_up.enums.ErrorCode;

public class ForbiddenException extends BaseException{
    public ForbiddenException(){
        super(ErrorCode.FORBIDDEN);
    }
}
