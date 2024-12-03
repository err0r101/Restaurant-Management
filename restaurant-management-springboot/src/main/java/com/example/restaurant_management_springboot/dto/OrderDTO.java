// src/main/java/com/example/restaurant_management_springboot/dto/OrderDTO.java
package com.example.restaurant_management_springboot.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderDTO {
    private String customerName;
    private String mobileNumber;
    private String orderType;
    private String tableNumber;
    private String address;
    private String paymentMethod;
    private Double totalAmount;
    private List<OrderItemDTO> items;
}