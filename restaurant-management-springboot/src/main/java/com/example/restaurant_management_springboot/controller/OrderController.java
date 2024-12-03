package com.example.restaurant_management_springboot.controller;

import com.example.restaurant_management_springboot.dto.ErrorResponse;
import com.example.restaurant_management_springboot.dto.OrderDTO;
import com.example.restaurant_management_springboot.entity.Order;
import com.example.restaurant_management_springboot.entity.OrderItem;
import com.example.restaurant_management_springboot.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class OrderController {
    
    private final OrderService orderService;
    
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO) {
        try {
            System.out.println("Received order request: " + orderDTO);
            
            // Validate input
            if (orderDTO.getCustomerName() == null || orderDTO.getCustomerName().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Customer name is required"));
            }
            if (orderDTO.getMobileNumber() == null || orderDTO.getMobileNumber().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Mobile number is required"));
            }
            if (orderDTO.getItems() == null || orderDTO.getItems().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Order must contain items"));
            }

            Order order = new Order();
            order.setCustomerName(orderDTO.getCustomerName());
            order.setMobileNumber(orderDTO.getMobileNumber());
            order.setOrderType(orderDTO.getOrderType());
            order.setTableNumber(orderDTO.getTableNumber());
            order.setAddress(orderDTO.getAddress());
            order.setPaymentMethod(orderDTO.getPaymentMethod());
            order.setTotalAmount(orderDTO.getTotalAmount());
            
            List<OrderItem> orderItems = orderDTO.getItems().stream()
                .map(itemDTO -> {
                    OrderItem item = new OrderItem();
                    item.setItemName(itemDTO.getItemName());
                    item.setPrice(itemDTO.getPrice());
                    item.setQuantity(itemDTO.getQuantity());
                    item.setOrder(order);
                    return item;
                })
                .collect(Collectors.toList());
            
            order.setItems(orderItems);
            
            Order savedOrder = orderService.createOrder(order);
            System.out.println("Order created successfully: " + savedOrder.getOrderNumber());
            
            return ResponseEntity.ok(savedOrder);
        } catch (Exception e) {
            System.err.println("Error creating order: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Failed to create order: " + e.getMessage()));
        }
    }

    @GetMapping("/user/{mobileNumber}")
    public ResponseEntity<List<Order>> getOrdersByMobile(@PathVariable String mobileNumber) {
        return ResponseEntity.ok(orderService.getOrdersByMobileNumber(mobileNumber));
    }
}