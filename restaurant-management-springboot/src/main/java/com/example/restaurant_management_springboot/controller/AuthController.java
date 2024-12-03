package com.example.restaurant_management_springboot.controller;

import com.example.restaurant_management_springboot.dto.OtpRequest;
import com.example.restaurant_management_springboot.dto.OtpValidateRequest;
import com.example.restaurant_management_springboot.entity.User;
import com.example.restaurant_management_springboot.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final Map<String, String> otpStore = new HashMap<>();

    @PostMapping("/generate-otp")
    public ResponseEntity<?> generateOtp(@RequestBody OtpRequest request) {
        try {
            // Generate a 6-digit OTP
            String otp = String.format("%06d", (int)(Math.random() * 1000000));
            otpStore.put(request.getMobileNumber(), otp);
            
            // In real application, you would send this OTP via SMS
            System.out.println("OTP for " + request.getMobileNumber() + ": " + otp);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "OTP sent successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpValidateRequest request) {
        String storedOtp = otpStore.get(request.getMobileNumber());
        
        if (storedOtp != null && storedOtp.equals(request.getOtp())) {
            otpStore.remove(request.getMobileNumber()); // Remove used OTP
            
            // Find or create user
            User user = userService.findOrCreateUser(request.getMobileNumber());
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "OTP verified successfully");
            response.put("mobileNumber", request.getMobileNumber());
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Invalid OTP");
            return ResponseEntity.badRequest().body(response);
        }
    }
}