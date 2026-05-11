package com.studylink.repository;

import com.studylink.model.StudySession;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudySessionRepository
    extends JpaRepository<StudySession, Long>
{
    List<StudySession> findByStudyGroup_GroupId(Long groupId);
}
