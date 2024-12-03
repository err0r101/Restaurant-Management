// src/main/java/com/example/restaurant_management_springboot/service/TableBookingService.java
package com.example.restaurant_management_springboot.service;

import com.example.restaurant_management_springboot.entity.TableBooking;
import com.example.restaurant_management_springboot.repository.TableBookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TableBookingService {
    
    private final TableBookingRepository tableBookingRepository;
    
    public TableBooking createBooking(TableBooking booking) {
        // Set initial status
        booking.setStatus("PENDING");
        return tableBookingRepository.save(booking);
    }
    
    public List<TableBooking> getBookingsByMobileNumber(String mobileNumber) {
        return tableBookingRepository.findByMobileNumber(mobileNumber);
    }
    
    public List<TableBooking> getAllBookings() {
        return tableBookingRepository.findAll();
    }

    public TableBooking cancelBooking(Long id) {
        TableBooking booking = tableBookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        if (!"PENDING".equals(booking.getStatus())) {
            throw new RuntimeException("Only pending bookings can be cancelled");
        }
        
        booking.setStatus("CANCELLED");
        return tableBookingRepository.save(booking);
    }
}

