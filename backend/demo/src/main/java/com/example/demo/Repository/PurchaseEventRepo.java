package com.example.demo.Repository;

import com.example.demo.Data.PurchaseEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseEventRepo extends JpaRepository<PurchaseEvent, Long> {
}
