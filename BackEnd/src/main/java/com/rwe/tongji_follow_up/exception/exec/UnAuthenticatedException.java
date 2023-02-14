package com.rwe.tongji_follow_up.exception.exec;

import com.rwe.tongji_follow_up.enums.ErrorCode;

public class UnAuthenticatedException extends BaseException{
    public UnAuthenticatedException(){
        super(ErrorCode.UNAUTHENTICATED);
    }
}
