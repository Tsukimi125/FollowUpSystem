package com.rwe.tongji_follow_up.exception.handler;

import com.rwe.tongji_follow_up.exception.exec.BaseException;
import com.rwe.tongji_follow_up.exception.exec.NotFoundException;
import com.rwe.tongji_follow_up.exception.exec.ParameterException;
import com.rwe.tongji_follow_up.exception.exec.ServerErrorException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@ControllerAdvice
@ResponseBody
public class GlobalExceptionAdvice {

    //未知异常
    @ExceptionHandler(value = {Exception.class,Error.class})
    @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleException(HttpServletRequest req, Exception e) {
        log.error(getMethodUrl(req) + "      " + e.toString());//开发阶段直接打印出来
        ServerErrorException serverErrorException = new ServerErrorException();
        return new ErrorResponse(serverErrorException, getMethodUrl(req));
    }


    @ExceptionHandler(value = BaseException.class)
    public ResponseEntity<?> handleHttpException(HttpServletRequest req, BaseException e) {
        ErrorResponse representation = new ErrorResponse(e, getMethodUrl(req));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        ResponseEntity<ErrorResponse> r = new ResponseEntity<>(representation,headers,e.getError().getStatus());
        return r;
    }

    @ExceptionHandler(value = NotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(NotFoundException ex, HttpServletRequest req) {
        ErrorResponse errorResponse = new ErrorResponse(ex, getMethodUrl(req));
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    //统一参数错误
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleBeanValidation(HttpServletRequest req, MethodArgumentNotValidException e) {
        List<ObjectError> errors = e.getBindingResult().getAllErrors();
        String message = this.formatAllErrorMessages(errors);
        ParameterException parameterException = new ParameterException(message);
        return new ErrorResponse(parameterException, getMethodUrl(req));
    }

    private String formatAllErrorMessages(List<ObjectError> errors) {
        StringBuffer errorMsg = new StringBuffer();
        errors.forEach(error -> errorMsg.append(error.getDefaultMessage()).append(";") );
        return errorMsg.toString();
    }

    private String getMethodUrl(HttpServletRequest req) {
        String requestUrl = req.getRequestURI();
        String method = req.getMethod();
        return method + " " + requestUrl;
    }
}
