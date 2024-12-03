// src/main/java/com/example/restaurant_management_springboot/repository/TableBookingRepository.java
package com.example.restaurant_management_springboot.repository;

import com.example.restaurant_management_springboot.entity.TableBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TableBookingRepository extends JpaRepository<TableBooking, Long> {
    List<TableBooking> findByMobileNumber(String mobileNumber);
}