package com.example.demo.Service;

import com.example.demo.DTO.UserDTO;
import com.example.demo.Data.User;

import java.util.List;
import java.util.Optional;

public interface UserService {


    boolean editUser(String username, String new_username, String new_password);

    boolean registerUser(UserDTO userDTO, String password);

    boolean authenticateUser(String username, String password);

    double showBudget(String username);

    boolean updateBalance(String username, Double amount, boolean isAdding);

    boolean exitUser(String username);

    List<UserDTO> getAllUsers();



}
