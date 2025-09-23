package com.example.demo.Exception;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


public class BusinessException extends RuntimeException {

    private final ErrorCode code;

    public BusinessException(ErrorCode code) {
        super(code.message);
        this.code = code;
    }

    public BusinessException(ErrorCode code, String details) {
        super(code.message + (details != null ? " - " + details : ""));
        this.code = code;
    }

    public ErrorCode getCode() {
        return code;
    }
}