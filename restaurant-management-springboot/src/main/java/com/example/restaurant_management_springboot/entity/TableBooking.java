// src/main/java/com/example/restaurant_management_springboot/entity/TableBooking.java
package com.example.restaurant_management_springboot.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "table_bookings")
@Data
public class TableBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String customerName;
    private String mobileNumber;
    private LocalDateTime bookingDateTime;
    private Integer numberOfPeople;
    private String status; // PENDING, CONFIRMED, CANCELLED
    private String specialRequests;
}