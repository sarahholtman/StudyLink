package com.studylink.controller;

import com.studylink.model.GroupMembership;
import com.studylink.model.StudyGroup;
import com.studylink.service.StudyGroupService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/study-groups")
@CrossOrigin(origins = "*")
public class StudyGroupController {

    private final StudyGroupService studyGroupService;

    public StudyGroupController(StudyGroupService studyGroupService) {
        this.studyGroupService = studyGroupService;
    }

    @PostMapping
    public StudyGroup createStudyGroup(@RequestBody StudyGroup studyGroup) {
        return studyGroupService.createStudyGroup(studyGroup);
    }

    @GetMapping
    public List<StudyGroup> getAllStudyGroups() {
        return studyGroupService.getAllStudyGroups();
    }

    @GetMapping("/search")
    public List<StudyGroup> searchStudyGroups(
            @RequestParam(required = false, defaultValue = "") String schoolName,
            @RequestParam(required = false, defaultValue = "") String courseName,
            @RequestParam(required = false, defaultValue = "") String courseCode
    ) {
        return studyGroupService.searchStudyGroups(schoolName, courseName, courseCode);
    }

    @PostMapping("/join")
    public GroupMembership joinGroup(@RequestBody GroupMembership membership) {
        return studyGroupService.joinGroup(membership);
    }

    @GetMapping("/user/{userId}")
    public List<GroupMembership> getMembershipsByUserId(@PathVariable Long userId) {
        return studyGroupService.getMembershipsByUserId(userId);
    }

    @GetMapping("/{groupId}/members")
    public List<GroupMembership> getMembershipsByGroupId(@PathVariable Long groupId) {
        return studyGroupService.getMembershipsByGroupId(groupId);
    }
}