package com.application.entities;

public class LoginResponse {
    String token;
    Long id;

    public LoginResponse(String token, Long id) {
        this.token = token;
        this.id = id;
    }
}
