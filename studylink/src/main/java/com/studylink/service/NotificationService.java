package com.studylink.service;

/*
 * Handles the notification functionality including:
 * - sending session reminders
 * - notifying group updates
 * - netifying new messages
 */

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studylink.model.Notification;
import com.studylink.model.User;
import com.studylink.repository.NotificationRepository;
import com.studylink.repository.UserRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Notification> getNotificationsForUser(Long userId) {

        return notificationRepository.findByUser_UserId(userId);
    }

    public Notification createNotification(
            Long userId,
            String message,
            String type) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Notification notification = new Notification();

        notification.setUser(user);
        notification.setMessage(message);
        notification.setType(type);
        notification.setDateSent(LocalDate.now());

        return notificationRepository.save(notification);
    }
}