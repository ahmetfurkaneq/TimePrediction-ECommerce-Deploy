package com.example.demo.RabbitMQConf;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "app.rabbitmq")
@Getter
@Setter
@Component
public class AppProps {
    private String queue;
    private String exchange;
    private String routingKey;


}