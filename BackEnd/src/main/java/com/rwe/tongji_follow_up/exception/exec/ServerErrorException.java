package com.rwe.tongji_follow_up.exception.exec;

import com.rwe.tongji_follow_up.enums.ErrorCode;

public class ServerErrorException extends BaseException{
    public ServerErrorException(){
        super(ErrorCode.INTERNAL_SERVER_ERROR);
    }

    public ServerErrorException(String message){
        super(ErrorCode.INTERNAL_SERVER_ERROR,message);
    }
}
