package com.rwe.tongji_follow_up.exception.exec;

import com.rwe.tongji_follow_up.enums.ErrorCode;

public class CommonException extends BaseException{
    public CommonException(String message) {
        super(ErrorCode.COMMON_ERROR,message);
    }
}
