// src/main/java/com/example/restaurant_management_springboot/repository/OrderRepository.java
package com.example.restaurant_management_springboot.repository;

import com.example.restaurant_management_springboot.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByMobileNumberOrderByOrderDateDesc(String mobileNumber);
}