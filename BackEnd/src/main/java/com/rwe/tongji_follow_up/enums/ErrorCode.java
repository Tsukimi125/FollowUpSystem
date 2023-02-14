package com.rwe.tongji_follow_up.enums;

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public enum ErrorCode {

    RESOURCE_NOT_FOUND(1001, HttpStatus.NOT_FOUND, "未找到该资源"),
    REQUEST_VALIDATION_FAILED(1002, HttpStatus.BAD_REQUEST, "请求数据格式验证失败"),
    UNAUTHENTICATED(1003, HttpStatus.UNAUTHORIZED,"未登录"),
    FORBIDDEN(1004,HttpStatus.FORBIDDEN,"权限不足"),
    SPIDER_ERROR(1007,HttpStatus.BAD_REQUEST,"请求外部接口失败"),
    COMMON_ERROR(1008,HttpStatus.OK,""),
    INTERNAL_SERVER_ERROR(500, HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");

    private final int code;

    private final HttpStatus status;

    private final String message;

    ErrorCode(int code, HttpStatus status, String message) {
        this.code = code;
        this.status = status;
        this.message = message;
    }
}
