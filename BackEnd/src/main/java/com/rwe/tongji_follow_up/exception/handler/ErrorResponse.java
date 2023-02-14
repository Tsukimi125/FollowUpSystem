package com.rwe.tongji_follow_up.exception.handler;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.rwe.tongji_follow_up.exception.exec.BaseException;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;

@Setter
@Getter
@ToString
public class ErrorResponse {
    private int code;
    private int status;
    private String message;
    private String path;
    private Instant timestamp;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object data;

    public ErrorResponse() {
    }

    public ErrorResponse(BaseException ex, String path) {
        this(ex.getError().getCode(), ex.getError().getStatus().value(), ex.getMessage(), path, ex.getData());
    }

    public ErrorResponse(int code, int status, String message, String path, Object data) {
        this.code = code;
        this.status = status;
        this.message = message;
        this.path = path;
        this.timestamp = Instant.now();
        this.data = data;
    }
}
