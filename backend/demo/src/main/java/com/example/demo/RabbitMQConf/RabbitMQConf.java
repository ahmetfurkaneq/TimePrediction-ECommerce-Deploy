/*
package com.example.demo.RabbitMQConf;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConf {


    @Value("${rabbitmq.queue.name}")
    private  String queue;

    @Value("${rabbitmq.queue.json.name}")
    private  String jsonQueue;

    @Value("${rabbitmq.exchange.name}")
    private  String exchange;

    @Value("${rabbitmq.routing.key}")
    private String routing_key;

    @Value("${rabbitmq.routing.json.key}")
    private String json_routing_key;

    @Bean
    public Queue queue(){return new Queue(queue);}

    @Bean
    public Queue jsonQueue(){return new Queue(jsonQueue);}

    @Bean
    TopicExchange exchange(){return new TopicExchange(exchange);}

    @Bean
    public Binding baglanti(){return BindingBuilder.bind(queue()).to(exchange()).with("routing_key");
    }
    @Bean
    public Binding jsonBaglanti(){
        return BindingBuilder.bind(jsonQueue())
                .to(exchange())
                .with("json_routing_key");
    }

    @Bean
    public MessageConverter messageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory){
        RabbitTemplate rabbitTemplate=new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter());
        return rabbitTemplate;

    }


    public String getQueue() {
        return queue;
    }

    public void setQueue(String queue) {
        this.queue = queue;
    }

    public String getJsonQueue() {
        return jsonQueue;
    }

    public void setJsonQueue(String jsonQueue) {
        this.jsonQueue = jsonQueue;
    }

    public String getRouting_key() {
        return routing_key;
    }

    public void setRouting_key(String routing_key) {
        this.routing_key = routing_key;
    }

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }

    public String getJson_routing_key() {
        return json_routing_key;
    }

    public void setJson_routing_key(String json_routing_key) {
        this.json_routing_key = json_routing_key;
    }
}
*/