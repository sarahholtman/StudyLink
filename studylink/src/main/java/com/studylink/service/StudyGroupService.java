package com.studylink.service;

import com.studylink.model.GroupMembership;
import com.studylink.model.StudyGroup;
import com.studylink.repository.GroupMembershipRepository;
import com.studylink.repository.StudyGroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/*
 * Handles study group management functionality including:
 * - creating study groups
 * - search study group (TBA)
 * - join and leave groups (TBA)
 * - manage group members
 */

// TODO: Add leave-group functionality


@Service
public class StudyGroupService {

    private final StudyGroupRepository studyGroupRepository;
    private final GroupMembershipRepository groupMembershipRepository;

    public StudyGroupService(
            StudyGroupRepository studyGroupRepository,
            GroupMembershipRepository groupMembershipRepository) {
        this.studyGroupRepository = studyGroupRepository;
        this.groupMembershipRepository = groupMembershipRepository;
    }

    public StudyGroup createStudyGroup(StudyGroup studyGroup) {
        return studyGroupRepository.save(studyGroup);
    }

    public List<StudyGroup> getAllStudyGroups() {
        return studyGroupRepository.findAll();
    }

    public GroupMembership joinGroup(GroupMembership membership) {
        return groupMembershipRepository.save(membership);
    }

    public List<GroupMembership> getMembershipsByUserId(Long userId) {
        return groupMembershipRepository.findByUser_UserId(userId);
    }

    public List<GroupMembership> getMembershipsByGroupId(Long groupId) {
        return groupMembershipRepository.findByStudyGroup_GroupId(groupId);
    }

    public List<StudyGroup> searchStudyGroups(
            String schoolName,
            String courseName,
            String courseCode
    ) {
        String schoolSearch = schoolName == null ? "" : schoolName.trim().toLowerCase();
        String courseNameSearch = courseName == null ? "" : courseName.trim().toLowerCase();
        String courseCodeSearch = courseCode == null ? "" : courseCode.trim().toLowerCase();

        return studyGroupRepository.findAll()
                .stream()
                .filter(group -> {
                    String groupSchool = group.getSchoolName() == null ? "" : group.getSchoolName().toLowerCase();
                    String groupCourseName = group.getCourseName() == null ? "" : group.getCourseName().toLowerCase();
                    String groupCourseCode = group.getCourseCode() == null ? "" : group.getCourseCode().toLowerCase();

                    boolean matchesSchool =
                            schoolSearch.isBlank() || groupSchool.contains(schoolSearch);

                    boolean matchesCourseName =
                            courseNameSearch.isBlank() || groupCourseName.contains(courseNameSearch);

                    boolean matchesCourseCode =
                            courseCodeSearch.isBlank() || groupCourseCode.contains(courseCodeSearch);

                    return matchesSchool && matchesCourseName && matchesCourseCode;
                })
                .toList();
    }

    public StudyGroup getStudyGroupById(Long groupId) {
        return studyGroupRepository.findById(groupId).orElse(null);
    }
}
