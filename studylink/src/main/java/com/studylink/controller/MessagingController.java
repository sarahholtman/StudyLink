package com.studylink.controller;

import com.studylink.model.Message;
import com.studylink.service.MessagingService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessagingController {

    private final MessagingService messagingService;

    public MessagingController(MessagingService messagingService) {
        this.messagingService = messagingService;
    }

    @PostMapping
    public Message sendMessage(@RequestBody Message message) {
        return messagingService.sendMessage(message);
    }

    @GetMapping("/group/{groupId}")
    public List<Message> getMessagesByGroup(@PathVariable Long groupId) {
        return messagingService.getMessagesByGroup(groupId);
    }

    @GetMapping("/{messageId}")
    public Message getMessageById(@PathVariable Long messageId) {
        return messagingService.getMessageById(messageId);
    }

    @DeleteMapping("/{messageId}")
    public void deleteMessage(@PathVariable Long messageId) {
        messagingService.deleteMessage(messageId);
    }
}