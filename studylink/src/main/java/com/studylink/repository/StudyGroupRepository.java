package com.studylink.repository;

import com.studylink.model.StudyGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyGroupRepository extends JpaRepository<StudyGroup, Long> {

    List<StudyGroup> findByCourseCodeContainingIgnoreCase(String courseCode);

    List<StudyGroup> findBySchoolNameContainingIgnoreCase(String schoolName);

    List<StudyGroup> findByCourseNameContainingIgnoreCase(String courseName);

    List<StudyGroup> findBySchoolNameContainingIgnoreCaseOrCourseNameContainingIgnoreCaseOrCourseCodeContainingIgnoreCase(
        String schoolName,
        String courseName,
        String courseCode
    );
}