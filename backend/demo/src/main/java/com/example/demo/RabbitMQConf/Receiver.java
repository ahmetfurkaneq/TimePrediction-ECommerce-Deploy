package com.example.demo.RabbitMQConf;

import com.example.demo.DTO.SaleNotificationDTO;
import com.example.demo.Service.EmailService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Receiver {

    private static final Logger log = LoggerFactory.getLogger(Receiver.class);
    private final EmailService emailService;

    @RabbitListener(queues = "${app.rabbitmq.queue}", containerFactory = "rabbitListenerContainerFactory")
    public void handleSaleNotification(SaleNotificationDTO message,
                                       @Header(name = "spring_returned_message_correlation", required = false) String corrId) {
        try {
            log.info("Sale notification received: userId={} productId={} corrId={}",
                    message.getUserId(), message.getProductId(), corrId);

            if (message.getEmail() == null || message.getEmail().isBlank()) {
                log.warn("No email for userId={}, skipping email send", message.getUserId());
                return;
            }

            String subject = "Satın Alma Bildirimi";
            String body = """
                <p>Merhaba %s,</p>
                <p>Aşağıdaki işlemi başarıyla gerçekleştirdiniz:</p>
                <ul>
                  <li>Ürün: %s (ID: %d)</li>
                  <li>Tutar: %s TL</li>
                  <li>Zaman: %s</li>
                </ul>
                <p>İyi günlerde kullanın!</p>
                """.formatted(
                    message.getUsername(),
                    message.getProductName(), message.getProductId(),
                    message.getPrice().toPlainString(),
                    message.getTimestamp()
            );

            emailService.sendSaleEmailHtml(message.getEmail(), subject, body); // 🔹 HTML gönder
        } catch (Exception e) {
            log.error("Email send failed, to DLQ. err={}", e.getMessage(), e);
            throw new AmqpRejectAndDontRequeueException("email-failed", e); // 🔹 DLQ
        }
    }
}
