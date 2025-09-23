package com.example.demo.Service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String fromAddress;

    public void sendSaleEmail(String to, String subject, String body) {


        // eski düz metin metodu istersen kalsın
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        if (StringUtils.hasText(fromAddress)) message.setFrom(fromAddress);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
        log.info("Sale email sent (plain) to {}", to);
    }

    public void sendSaleEmailHtml(String to, String subject, String htmlBody) {
        try {
            MimeMessage mime = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mime, true, StandardCharsets.UTF_8.name());
            helper.setTo(to);
            if (StringUtils.hasText(fromAddress)) helper.setFrom(fromAddress);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); //  HTML
            mailSender.send(mime);
            log.info("Sale email sent (HTML) to {}", to);
        } catch (Exception ex) {
            log.error("Failed to send HTML email to {}: {}", to, ex.getMessage(), ex);
            throw new IllegalStateException("MAIL_SEND_FAILED", ex);
        }
    }
}
