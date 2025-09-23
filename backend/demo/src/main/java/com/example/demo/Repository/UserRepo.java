package com.example.demo.Repository;

import com.example.demo.DTO.UserDTO;
import com.example.demo.Data.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {




    // Kullanıcıyı username'e göre bul
    @Query("SELECT u FROM User u WHERE u.username = :username")
    Optional<User> findByUsername(@Param("username") String username);

    // Kullanıcı şifresini getirme
    @Query("SELECT u.password_hash FROM User u WHERE u.username = :username")
    Optional<String> getPasswordFromUser(@Param("username") String username);




    // Kullanıcı adı ve şifreyi güncelleme
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.username = :newUsername, u.password_hash = :newPassword WHERE u.username = :oldUsername")
    void updateUserCredentials(@Param("oldUsername") String oldUsername,
                               @Param("newUsername") String newUsername,
                               @Param("newPassword") String newPassword);

    // Kullanıcının bütçesini güncelleme
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.budget = :budget WHERE u.username = :username")
    void updateUserBudget(@Param("username") String username, @Param("budget") double budget);



    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.username = :username")
    boolean existsByUsername(@Param("username") String username);


}
