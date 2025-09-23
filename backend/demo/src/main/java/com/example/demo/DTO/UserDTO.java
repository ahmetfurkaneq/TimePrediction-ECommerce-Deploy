package com.example.demo.DTO;


import com.example.demo.Data.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class UserDTO {

    private Long id;

    private String username;

    private String email;

    private double budget;

    private boolean is_admin;



    public UserDTO(Long id,String username,String email,double budget,boolean is_admin){
        this.id=id;
        this.username=username;
        this.email=email;
        this.budget=budget;
        this.is_admin=is_admin;
    }
    public UserDTO(){

    }

    public UserDTO(String username, String email, double budget) {
        this.username=username;
        this.email=email;
        this.budget=budget;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public double getBudget() {
        return budget;
    }

    public void setBudget(double budget) {
        this.budget = budget;
    }
    public boolean getIs_Admin()
    {
        return is_admin;
    }

    public void setIs_admin(boolean is_admin){
        this.is_admin=is_admin;
    }

}
