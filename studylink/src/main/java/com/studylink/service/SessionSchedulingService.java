package com.studylink.service;

import com.studylink.model.StudySession;
import com.studylink.repository.StudySessionRepository;
import java.util.List;
import org.springframework.stereotype.Service;

/*
 * Handles study session management including:
 * - creating study sessions
 * - schedule sessions
 * - update session details
 */

@Service
public class SessionSchedulingService {

    private final StudySessionRepository studySessionRepository;

    public SessionSchedulingService(
        StudySessionRepository studySessionRepository
    ) {
        this.studySessionRepository = studySessionRepository;
    }

    public StudySession createSession(StudySession session) {
        return studySessionRepository.save(session);
    }

    public List<StudySession> getSessionsByGroup(Long groupId) {
        return studySessionRepository.findByStudyGroup_GroupId(groupId);
    }

    public StudySession getSessionById(Long sessionId) {
        return studySessionRepository.findById(sessionId).orElse(null);
    }

    public StudySession updateSession(
        Long sessionId,
        StudySession updatedSession
    ) {
        StudySession session = studySessionRepository
            .findById(sessionId)
            .orElse(null);
        session.setSessionDate(updatedSession.getSessionDate());
        session.setSessionTime(updatedSession.getSessionTime());
        session.setLocation(updatedSession.getLocation());
        return studySessionRepository.save(session);
    }

    public void cancelSession(Long sessionId) {
        studySessionRepository.deleteById(sessionId);
    }
}