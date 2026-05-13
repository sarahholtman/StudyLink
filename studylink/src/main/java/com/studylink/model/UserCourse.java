package com.studylink.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_courses")
public class UserCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    private String courseCode;

    private String school;

    private String program;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public UserCourse() {
    }

    public UserCourse(String courseCode, String school, String program, User user) {
        this.courseCode = courseCode;
        this.school = school;
        this.program = program;
        this.user = user;
    }

    public Long getCourseId() {
        return courseId;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
