package com.studylink.controller;

import com.studylink.model.StudySession;
import com.studylink.service.SessionSchedulingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/study-sessions")
@CrossOrigin(origins = "*") 
public class StudySessionController {

    private final SessionSchedulingService sessionService;

    public StudySessionController(SessionSchedulingService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping("/group/{groupId}")
    public List<StudySession> getSessionsByGroup(@PathVariable Long groupId) {
        return sessionService.getSessionsByGroup(groupId);
    }
}
