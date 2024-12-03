// src/main/java/com/example/restaurant_management_springboot/controller/AdminController.java
package com.example.restaurant_management_springboot.controller;

import com.example.restaurant_management_springboot.dto.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if ("admin".equals(request.getUsername()) && 
            "admin".equals(request.getPassword())) {
            return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "username", request.getUsername()
            ));
        }
        return ResponseEntity.badRequest().body(Map.of(
            "message", "Invalid credentials"
        ));
    }

    // Add other admin endpoints here
}