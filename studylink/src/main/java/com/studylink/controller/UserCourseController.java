package com.studylink.controller;

import com.studylink.model.UserCourse;
import com.studylink.service.UserCourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-courses")
@CrossOrigin(origins = "*")
public class UserCourseController {

    private final UserCourseService userCourseService;

    public UserCourseController(UserCourseService userCourseService) {
        this.userCourseService = userCourseService;
    }

    @PostMapping("/{userId}")
    public UserCourse addCourse(@PathVariable Long userId, @RequestBody UserCourse userCourse) {
        return userCourseService.addCourse(userId, userCourse);
    }

    @GetMapping("/{userId}")
    public List<UserCourse> getCoursesByUser(@PathVariable Long userId) {
        return userCourseService.getCoursesByUser(userId);
    }

    @DeleteMapping("/{courseId}")
    public void deleteCourse(@PathVariable Long courseId) {
        userCourseService.deleteCourse(courseId);
    }
}
