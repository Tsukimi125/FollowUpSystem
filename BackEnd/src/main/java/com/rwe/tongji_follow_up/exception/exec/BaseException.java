package com.rwe.tongji_follow_up.exception.exec;

import com.rwe.tongji_follow_up.enums.ErrorCode;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BaseException extends RuntimeException{
    private final ErrorCode error;
    private final Object data;
    private final String message;

    public BaseException(ErrorCode error, Object data) {
        super(error.getMessage());
        this.error = error;
        this.data = data;
        this.message = error.getMessage();
    }

    public BaseException(ErrorCode error) {
        super(error.getMessage());
        this.error = error;
        this.data = null;
        this.message = error.getMessage();
    }

    public BaseException(ErrorCode error, String message) {
        super(message);
        this.error = error;
        this.data = null;
        this.message = message;
    }

    public BaseException(ErrorCode error, String message, Object data) {
        super(message);
        this.error = error;
        this.data = data;
        this.message = message;
    }

    protected BaseException(ErrorCode error, Object data, Throwable cause) {
        super(error.getMessage(), cause);
        this.error = error;
        this.data = data;
        this.message = error.getMessage();
    }
}
