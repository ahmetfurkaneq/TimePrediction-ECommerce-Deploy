package com.example.demo.Controller;


import com.example.demo.DTO.ProductDTO;
import com.example.demo.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('Admin'')")
public class AdminController {

    @Autowired
    public AdminService adminService;


    @PostMapping("/addProduct")
    public ResponseEntity<String> addProduct(@RequestBody ProductDTO dto) {
        adminService.addProduct(dto);
        return ResponseEntity.ok("Ürün başarıyla eklendi");
    }


}
