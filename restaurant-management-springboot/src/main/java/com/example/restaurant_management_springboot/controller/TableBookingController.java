// src/main/java/com/example/restaurant_management_springboot/controller/TableBookingController.java
package com.example.restaurant_management_springboot.controller;

import com.example.restaurant_management_springboot.entity.TableBooking;
import com.example.restaurant_management_springboot.service.TableBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/table-bookings")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class TableBookingController {
    
    private final TableBookingService tableBookingService;
    
    @PostMapping
    public ResponseEntity<TableBooking> createBooking(@RequestBody TableBooking booking) {
        try {
            TableBooking savedBooking = tableBookingService.createBooking(booking);
            return ResponseEntity.ok(savedBooking);
        } catch (Exception e) {
            System.err.println("Error creating booking: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/user/{mobileNumber}")
    public ResponseEntity<List<TableBooking>> getBookingsByMobile(
            @PathVariable String mobileNumber) {
        return ResponseEntity.ok(tableBookingService.getBookingsByMobileNumber(mobileNumber));
    }
    
    @GetMapping
    public ResponseEntity<List<TableBooking>> getAllBookings() {
        return ResponseEntity.ok(tableBookingService.getAllBookings());
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
        try {
            TableBooking booking = tableBookingService.cancelBooking(id);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}