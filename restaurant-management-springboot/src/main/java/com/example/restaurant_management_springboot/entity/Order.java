package com.example.restaurant_management_springboot.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String orderNumber;
    private String customerName;
    private String mobileNumber;
    private String orderType;
    private String tableNumber;
    private String address;
    private String paymentMethod;
    private Double totalAmount;
    
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime orderDate;
    
    private String status;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    @JsonManagedReference
    private List<OrderItem> items = new ArrayList<>();

    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }
}