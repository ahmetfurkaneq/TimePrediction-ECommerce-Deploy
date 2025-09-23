/*package com.example.demo.Service;

import com.example.demo.RabbitMQConf.RabbitMQConf;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageNotification {

    private  RabbitTemplate rabbitTemplate;
    private RabbitMQConf rabbitMQConf;

    public MessageNotification(RabbitTemplate rabbitTemplate){
        this.rabbitTemplate=rabbitTemplate;
    }

    public void sendNotification(String message){
        rabbitTemplate.convertAndSend(rabbitMQConf.getQueue(),message);
    }
}
*/