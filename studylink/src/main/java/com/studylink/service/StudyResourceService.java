package com.studylink.service;

import com.studylink.model.StudyResource;
import com.studylink.repository.StudyResourceRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class StudyResourceService {

    private final StudyResourceRepository studyResourceRepository;

    public StudyResourceService(
        StudyResourceRepository studyResourceRepository
    ) {
        this.studyResourceRepository = studyResourceRepository;
    }

    public StudyResource shareResource(StudyResource resource) {
        resource.setUploadDate(LocalDate.now());
        return studyResourceRepository.save(resource);
    }

    public List<StudyResource> getResourcesByGroup(Long groupId) {
        return studyResourceRepository.findByStudyGroup_GroupId(groupId);
    }
}
