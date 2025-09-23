package com.example.demo.RabbitMQConf;

import com.example.demo.DTO.SaleNotificationDTO;
import lombok.RequiredArgsConstructor;

import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class MessageNotification {

    private final RabbitTemplate rabbitTemplate;
    private final AppProps appProps; // 🔹 @ConfigurationProperties (aşağıda)

    public void sendSaleNotification(SaleNotificationDTO dto) {
        // şema sürümü set’le
        if (dto.getSchemaVersion() == null) dto.setSchemaVersion("1.0");

        // correlation id ile trace
        var correlation = new CorrelationData(UUID.randomUUID().toString());
        rabbitTemplate.convertAndSend(
                appProps.getExchange(),
                appProps.getRoutingKey(),
                dto,
                message -> {
                    message.getMessageProperties().setMessageId(correlation.getId());
                    message.getMessageProperties().setContentType(MessageProperties.CONTENT_TYPE_JSON);
                    return message;
                },
                correlation
        );
    }
}
