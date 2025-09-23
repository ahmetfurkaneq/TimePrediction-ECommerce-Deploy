package com.example.demo.Service;

import com.example.demo.Data.User;
import com.example.demo.DTO.UserDTO;
import com.example.demo.Repository.UserRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private  ModelMapper modelMapper;
    private  UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(ModelMapper modelMapper, UserRepo userRepo) {
        this.modelMapper = modelMapper;
        this.userRepo = userRepo;
    }

    @Override
    @Transactional
    public boolean editUser(String username, String newUsername, String newPassword) {
        Optional<User> userOptional = userRepo.findByUsername(username);
        if (userOptional.isEmpty()) {
            return false;
        }

        if (newUsername == null || newUsername.isEmpty() || newPassword == null || newPassword.isEmpty()) {
            return false;
        }
        userRepo.updateUserCredentials(username, newUsername, passwordEncoder.encode(newPassword));
        return true;
    }

    @Override
    @Transactional
    public boolean registerUser(UserDTO userDTO, String password) {
        if (userDTO.getUsername() == null || password == null || password.isEmpty()) {
            return false;
        }

        if (userRepo.findByUsername(userDTO.getUsername()).isPresent()) {
            return false;
        }

        User user = modelMapper.map(userDTO, User.class);
        user.setBudget(0.0);
        user.setPassword(passwordEncoder.encode(password));
        userRepo.save(user);
        return true;
    }

    @Override
    public boolean authenticateUser(String username, String password) {
        if (username == null || password == null || password.isEmpty()) {
            return false;
        }
        Optional<User> userOptional = userRepo.findByUsername(username);

        if (!userOptional.isPresent()){
            throw new UsernameNotFoundException("User not Found with username");
        }

        if (passwordEncoder.matches(password, userOptional.get().getPassword())){
            User user=userOptional.get();
            user.setIs_logged_in(true);
        try{
            userRepo.save(user);
            return true;
        }
        catch (Exception e){
            return false;
        }
        }
        return false;
    }

    @Override
    public double showBudget(String username) {
        return userRepo.findByUsername(username)
                .map(User::getBudget)
                .orElse(0.0);
    }

    @Override
    @Transactional
    public boolean updateBalance(String username, Double amount, boolean isAdding) {
        Optional<User> userOptional = userRepo.findByUsername(username);
        if (userOptional.isEmpty() || amount == null || amount <= 0) {
            return false;
        }

        User user = userOptional.get();
        double newBudget = isAdding ? user.getBudget() + amount : user.getBudget() - amount;
        if (newBudget < 0) {
            return false;
        }

        userRepo.updateUserBudget(username, newBudget);
        return true;
    }


    @Override
    public boolean exitUser(String username){
        Optional<User> userOptional = userRepo.findByUsername(username);
        User user =userOptional.get();
        user.setIs_logged_in(false);
        userRepo.save(user);
        return true;
    }

    @Override
    public List<UserDTO> getAllUsers(){
        List<User> users=userRepo.findAll();
     return  users.stream().map(user->modelMapper.map(user,UserDTO.class)).collect(Collectors.toList());
    }





}
