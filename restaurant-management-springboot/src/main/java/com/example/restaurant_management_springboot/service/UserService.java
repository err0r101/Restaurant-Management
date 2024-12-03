package com.example.restaurant_management_springboot.service;

import com.example.restaurant_management_springboot.entity.User;
import com.example.restaurant_management_springboot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final Map<String, String> otpStore = new HashMap<>();
    
    public String generateAndSendOTP(String mobileNumber) {
        String otp = generateOTP();
        otpStore.put(mobileNumber, otp);
        System.out.println("Generated OTP for " + mobileNumber + ": " + otp);
        return otp;
    }
    
    public boolean validateOTP(String mobileNumber, String otp) {
        String storedOtp = otpStore.get(mobileNumber);
        System.out.println("Validating OTP for " + mobileNumber);
        System.out.println("Stored OTP: " + storedOtp);
        System.out.println("Received OTP: " + otp);
        
        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStore.remove(mobileNumber); // Remove OTP after successful validation
            return true;
        }
        return false;
    }

    // Add this method
    private String generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // Generates 6-digit OTP
        return String.valueOf(otp);
    }
    
    public User findOrCreateUser(String mobileNumber) {
        return userRepository.findByMobileNumber(mobileNumber)
            .orElseGet(() -> {
                User newUser = new User();
                newUser.setMobileNumber(mobileNumber);
                return userRepository.save(newUser);
            });
    }
}