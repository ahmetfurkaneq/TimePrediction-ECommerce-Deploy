package com.example.demo.Exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "Kullanıcı bulunamadı"),
    USERNAME_TAKEN(HttpStatus.CONFLICT, "Kullanıcı adı kullanımda"),
    PASSWORD_REQUIRED(HttpStatus.BAD_REQUEST, "Parola gerekli"),
    INVALID_INPUT(HttpStatus.BAD_REQUEST, "Geçersiz girdi"),
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "Ürün bulunamadı"),
    STOCK_EMPTY(HttpStatus.CONFLICT, "Stok tükendi"),
    INSUFFICIENT_FUNDS(HttpStatus.PAYMENT_REQUIRED, "Bütçe yetersiz"),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "Yetkisiz işlem");

    public final HttpStatus status;
    public final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}
