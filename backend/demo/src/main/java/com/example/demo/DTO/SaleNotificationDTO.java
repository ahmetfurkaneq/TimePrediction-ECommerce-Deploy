package com.example.demo.DTO;

import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleNotificationDTO implements Serializable {   // 🔹 JSON için iyi pratik
    private static final long serialVersionUID = 1L;

    private long userId;
    private String username;
    private String email;
    private long productId;
    private String productName;
    private BigDecimal price;
    private Instant timestamp;
    private String schemaVersion; // 🔹 ileriye dönük şema değişimi için

    // builder kullanırken:
    // .schemaVersion("1.0")
}