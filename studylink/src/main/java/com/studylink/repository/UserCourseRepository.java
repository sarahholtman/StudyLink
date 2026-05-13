package com.studylink.repository;

import com.studylink.model.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {

    List<UserCourse> findByUser_UserId(Long userId);

    List<UserCourse> findByCourseCode(String courseCode);

    List<UserCourse> findBySchool(String school);

    List<UserCourse> findByProgram(String program);
}
