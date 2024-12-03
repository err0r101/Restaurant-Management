package com.example.restaurant_management_springboot.controller;

import com.example.restaurant_management_springboot.entity.MenuItem;
import com.example.restaurant_management_springboot.repository.MenuItemRepository;
import com.example.restaurant_management_springboot.service.MenuItemService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class MenuController {

    @Autowired
    private MenuItemRepository menuItemRepository;
    
    private final MenuItemService menuItemService;

    // @GetMapping
    // public List<MenuItem> getAllItems() {
    //     return menuItemRepository.findAll();
    // }

    @PostMapping
    public MenuItem addItem(@RequestBody MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateItem(@PathVariable Long id, @RequestBody MenuItem menuItem) {
        if (!menuItemRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        menuItem.setId(id);
        return ResponseEntity.ok(menuItemRepository.save(menuItem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        if (!menuItemRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        menuItemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        return ResponseEntity.ok(menuItemService.getAllMenuItems());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        return ResponseEntity.ok(menuItemService.getAllCategories());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<MenuItem>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(menuItemService.getItemsByCategory(category));
    }
}