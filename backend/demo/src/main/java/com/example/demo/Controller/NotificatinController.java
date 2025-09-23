/*package com.example.demo.Controller;
import com.example.demo.Service.MessageNotification;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificatinController {



    MessageNotification messageNotification;


    public NotificatinController(MessageNotification messageNotification) {
        this.messageNotification = messageNotification;
    }

    @PostMapping("/send")
    public String sendNotify(@RequestParam String message){
    messageNotification.sendNotification(message);
    return "Message sent: " + message;

    }




}
*/