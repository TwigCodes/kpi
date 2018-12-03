package com.twigcodes.nwcdkpi.services;

import java.io.File;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

  private final JavaMailSender mailSender;

  public EmailService(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  public void sendSimpleMessage(
      String to, String subject, String text) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(to);
    message.setSubject(subject);
    message.setText(text);
    mailSender.send(message);
  }

  public void sendSimpleMessageUsingTemplate(String to,
      String subject,
      SimpleMailMessage template,
      String... templateArgs) {
    String text = String.format(template.getText(), templateArgs);
    sendSimpleMessage(to, subject, text);
  }

  public void sendMessageWithAttachment(String to,
      String subject,
      String text,
      String pathToAttachment) {
    try {
      MimeMessage message = mailSender.createMimeMessage();
      // pass 'true' to the constructor to create a multipart message
      MimeMessageHelper helper = new MimeMessageHelper(message, true);

      helper.setTo(to);
      helper.setSubject(subject);
      helper.setText(text);

      FileSystemResource file = new FileSystemResource(new File(pathToAttachment));
      helper.addAttachment("attachment", file);

      mailSender.send(message);
    } catch (MessagingException e) {
      e.printStackTrace();
    }
  }
}
