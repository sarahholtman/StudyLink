package com.studylink.repository;

import com.studylink.model.StudyResource;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyResourceRepository
    extends JpaRepository<StudyResource, Long>
{
    List<StudyResource> findByStudyGroup_GroupId(Long groupId);
}
