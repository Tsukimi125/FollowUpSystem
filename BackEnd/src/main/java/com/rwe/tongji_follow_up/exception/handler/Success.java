package com.rwe.tongji_follow_up.exception.handler;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.Instant;

@Getter
@Setter
public class Success {
    private int code;
    private int status;
    private String message;
    private Instant timestamp;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object data;

    public Success(){
        this.code=200;
        this.status= HttpStatus.OK.value();
        this.message="ok";
        this.timestamp=Instant.now();
        this.data=null;
    }

    public Success(Object data){
        this.code=200;
        this.status= HttpStatus.OK.value();
        this.message="ok";
        this.timestamp=Instant.now();
        this.data=data;
    }
}
