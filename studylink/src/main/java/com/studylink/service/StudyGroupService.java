package com.studylink.service;

import com.studylink.model.GroupMembership;
import com.studylink.model.StudyGroup;
import com.studylink.repository.GroupMembershipRepository;
import com.studylink.repository.StudyGroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
