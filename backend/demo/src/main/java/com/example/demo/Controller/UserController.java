package com.example.demo.Controller;


import com.example.demo.DTO.UserDTO;
import com.example.demo.Data.User;
import com.example.demo.Repository.UserRepo;
import com.example.demo.Service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepo userRepo;


    private UserService userService;
    @Autowired
    public UserController(UserService userService){
        this.userService=userService;
    }


    @PostMapping("/authenticateUser/")
    public ResponseEntity<Boolean> authenticateUser(@RequestParam("username") String username,@RequestParam("password") String password){
        boolean isAuthenticated = userService.authenticateUser(username,password);
        return ResponseEntity.ok(isAuthenticated);
    }



    @PostMapping("/exitUser/")
    public ResponseEntity<Boolean> ExitUser(@RequestParam("username") String username){
        boolean isExit= userService.exitUser(username);
        return ResponseEntity.ok(isExit);
    }


    @PostMapping("/editUser")
    public ResponseEntity<Boolean>editUser(
            @RequestParam("username") String username,
            @RequestParam("newUsername") String newUsername,
            @RequestParam("newPassword") String newPassword){
       boolean isEdited = userService.editUser(username,newUsername,newPassword);

       return ResponseEntity.ok(isEdited);
    }

    @GetMapping("/showBudget")
    public ResponseEntity<Double> showBudget(
            @RequestParam String username
    ){
        double userBudget = userService.showBudget(username);
        return ResponseEntity.ok(userBudget);
    }

    @PostMapping("/registerUser")
    public ResponseEntity<Boolean> registerUser(UserDTO userDTO, String password) {
       boolean isRegistered=userService.registerUser(userDTO,password);
        return ResponseEntity.ok(isRegistered);
    }
    @PostMapping("/updateBalance")
    public ResponseEntity<Boolean> updateBalance(
            @RequestParam("username") String username,
            @RequestParam("money") double money,
            @RequestParam("isAdding") boolean isAdding){

        boolean isUpdatedBalance = userService.updateBalance(username,money,isAdding);

        return ResponseEntity.ok(isUpdatedBalance);
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }



    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
       Optional<User> user = userRepo.findByUsername(username);
        UserDTO dto = new UserDTO(user.get().getUsername(), user.get().getEmail(), user.get().getBudget());
        return ResponseEntity.ok(dto);
    }














}
