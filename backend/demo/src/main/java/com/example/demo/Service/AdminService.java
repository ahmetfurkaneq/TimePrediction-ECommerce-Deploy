package com.example.demo.Service;

import com.example.demo.DTO.ProductDTO;
import com.example.demo.DTO.UserDTO;

import java.util.List;


public interface AdminService {


    void addProduct(ProductDTO dto);

    void updateProduct(Long id, ProductDTO dto);

    void deleteProduct(Long id);

    List<UserDTO> getAllUsers();

    void updateUserBalance(String username, double amount);

    void editUser(UserDTO userDTO);

}
