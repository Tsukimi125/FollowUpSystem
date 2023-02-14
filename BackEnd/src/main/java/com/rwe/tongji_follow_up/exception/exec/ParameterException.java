package com.rwe.tongji_follow_up.exception.exec;

import com.rwe.tongji_follow_up.enums.ErrorCode;

public class ParameterException extends BaseException {
    public ParameterException() {
        super(ErrorCode.REQUEST_VALIDATION_FAILED);
    }

    public ParameterException(Object data) {
        super(ErrorCode.REQUEST_VALIDATION_FAILED, data);
    }
}
