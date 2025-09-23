package com.example.demo.Service;

import com.example.demo.DTO.SaleNotificationDTO;
import com.example.demo.RabbitMQConf.MessageNotification;
import com.example.demo.Event.SaleCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.transaction.event.TransactionPhase;

@Component
@RequiredArgsConstructor
public class SaleEventPublisher {

    private final MessageNotification messageNotification;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onSaleCreated(SaleCreatedEvent event) {
        SaleNotificationDTO dto = event.payload();
        messageNotification.sendSaleNotification(dto);
    }
}