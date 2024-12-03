// src/main/java/com/example/restaurant_management_springboot/dto/OrderItemDTO.java
package com.example.restaurant_management_springboot.dto;

import lombok.Data;

@Data
public class OrderItemDTO {
    private String itemName;
    private Double price;
    private Integer quantity;
}