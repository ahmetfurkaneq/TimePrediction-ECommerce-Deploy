package com.example.demo.Data;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "purchase_events",
        indexes = {
                @Index(name = "idx_pe_product_time", columnList = "product_id, created_at"),
                @Index(name = "idx_pe_time", columnList = "created_at")
        })
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PurchaseEvent {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id")
    private User user; // guest olabilir -> null

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false) private Integer quantity;          // bizde 1
    @Column(name="unit_price", nullable = false, precision=12, scale=2)
    private BigDecimal unitPrice;

    @Column(nullable = false) private Boolean success;           // TRUE/FALSE
    private Integer stockBefore;
    private Integer stockAfter;

    @Column(name="created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist void prePersist() {
        if (createdAt == null) createdAt = Instant.now(); // UTC
    }
}
