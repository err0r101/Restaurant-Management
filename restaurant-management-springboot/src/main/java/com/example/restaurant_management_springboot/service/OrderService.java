// src/main/java/com/example/restaurant_management_springboot/service/OrderService.java
package com.example.restaurant_management_springboot.service;

import com.example.restaurant_management_springboot.entity.Order;
import com.example.restaurant_management_springboot.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    
    public Order createOrder(Order order) {
        try {
            order.setOrderNumber("ORD" + System.currentTimeMillis());
            order.setOrderDate(LocalDateTime.now());
            order.setStatus("pending");
            
            // Validate order data
            validateOrder(order);
            
            // Save order
            return orderRepository.save(order);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create order: " + e.getMessage());
        }
    }
    
    // Add this method
    public List<Order> getOrdersByMobileNumber(String mobileNumber) {
        return orderRepository.findByMobileNumberOrderByOrderDateDesc(mobileNumber);
    }
    
    private void validateOrder(Order order) {
        if (order.getCustomerName() == null || order.getCustomerName().trim().isEmpty()) {
            throw new IllegalArgumentException("Customer name is required");
        }
        if (order.getMobileNumber() == null || order.getMobileNumber().trim().isEmpty()) {
            throw new IllegalArgumentException("Mobile number is required");
        }
        if (order.getItems() == null || order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order must contain at least one item");
        }
    }
}