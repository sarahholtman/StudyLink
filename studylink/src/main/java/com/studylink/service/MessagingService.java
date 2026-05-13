package com.studylink.service;

import com.studylink.model.Message;
import com.studylink.repository.MessageRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;

/*
 * Handles the messaging functionality including:
 * - sending messages
 * - retrieving group messages
 * - support features for communications between team members
 */

@Service
public class MessagingService {

    private final MessageRepository messageRepository;

    public MessagingService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message sendMessage(Message message) {
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }

    public List<Message> getMessagesByGroup(Long groupId) {
        return messageRepository.findByStudyGroup_GroupId(groupId);
    }

    public Message getMessageById(Long messageId) {
        return messageRepository.findById(messageId).orElse(null);
    }

    public void deleteMessage(Long messageId) {
        messageRepository.deleteById(messageId);
    }
}