package com.studylink.service;

import com.studylink.model.User;
import com.studylink.model.UserCourse;
import com.studylink.repository.UserCourseRepository;
import com.studylink.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserCourseService {

    private final UserCourseRepository userCourseRepository;
    private final UserRepository userRepository;

    public UserCourseService(UserCourseRepository userCourseRepository, UserRepository userRepository) {
        this.userCourseRepository = userCourseRepository;
        this.userRepository = userRepository;
    }

    public UserCourse addCourse(Long userId, UserCourse userCourse) {
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return null;
        }

        userCourse.setUser(user);
        return userCourseRepository.save(userCourse);
    }

    public List<UserCourse> getCoursesByUser(Long userId) {
        return userCourseRepository.findByUser_UserId(userId);
    }

    public void deleteCourse(Long courseId) {
        userCourseRepository.deleteById(courseId);
    }
}
