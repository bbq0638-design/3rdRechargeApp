package com.recharge.user.service;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    @Autowired
    JavaMailSender mailSender;

    public boolean sendEmail(String to, String subject, String content) {
        try {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("mirke725931@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true); // 🔥 HTML 모드 활성화

            mailSender.send(message);

            log.info("이메일 전송 성공! to={}", to);
            return true;

        } catch (Exception e) {
            log.error("이메일 전송 실패: {}", e.getMessage(), e);
            return false;
        }
    }
}