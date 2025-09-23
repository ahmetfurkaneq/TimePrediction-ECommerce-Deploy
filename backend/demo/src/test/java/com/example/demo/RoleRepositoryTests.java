package com.example.demo;


import com.example.demo.Data.Role;
import com.example.demo.Repository.RoleRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class RoleRepositoryTests {

    @Autowired public RoleRepo roleRepository;

    @Test
    public void testCreateRoles() {

        Role admin=new Role("ROLE_ADMIN");

        Role editor=new Role("ROLE_EDITOR");

        Role customer=new Role("ROLE_CUSTOMER");

        roleRepository.saveAll(List.of(admin,editor,customer));

        long numbersOfRoles= roleRepository.count();





    }


}
