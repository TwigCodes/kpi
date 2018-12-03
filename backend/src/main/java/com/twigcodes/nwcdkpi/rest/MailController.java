package com.twigcodes.nwcdkpi.rest;

import com.twigcodes.nwcdkpi.services.EmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/api/mail")
public class MailController {
  private final EmailService emailService;

  public MailController(EmailService emailService) {
    this.emailService = emailService;
  }

  @GetMapping("/send")
  public void sendEmail() {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setText(
        "This is the test email template for your email:\n%s\n");
    emailService.sendSimpleMessageUsingTemplate("wpcfan@163.com", "This is a test", message, "hello");
  }
}
