// src/main/java/com/example/restaurant_management_springboot/entity/Admin.java
package com.example.restaurant_management_springboot.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "admin")
@Data
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String password;
}