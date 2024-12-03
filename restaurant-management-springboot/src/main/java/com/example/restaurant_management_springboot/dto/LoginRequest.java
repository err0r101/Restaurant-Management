// src/main/java/com/example/restaurant_management_springboot/dto/LoginRequest.java
package com.example.restaurant_management_springboot.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}