package com.studylink.service;

import com.studylink.model.GroupMembership;
import com.studylink.model.StudyGroup;
import com.studylink.model.User;
import com.studylink.repository.GroupMembershipRepository;
import com.studylink.repository.StudyGroupRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class StudyGroupServiceTest {

    @Mock
    private StudyGroupRepository studyGroupRepository;

    @Mock
    private GroupMembershipRepository groupMembershipRepository;

    @InjectMocks
    private StudyGroupService studyGroupService;

    @Test
    void joinGroupShouldSaveMembershipWhenUserIsNotAlreadyMember() {
        User user = new User();
        user.setUserId(1L);

        StudyGroup group = new StudyGroup();
        group.setGroupId(10L);

        GroupMembership membership = new GroupMembership();
        membership.setUser(user);
        membership.setStudyGroup(group);

        when(groupMembershipRepository.existsByUser_UserIdAndStudyGroup_GroupId(1L, 10L))
                .thenReturn(false);

        when(groupMembershipRepository.save(membership))
                .thenReturn(membership);

        GroupMembership result = studyGroupService.joinGroup(membership);

        assertNotNull(result);
        assertNotNull(result.getJoinedDate());

        verify(groupMembershipRepository).save(membership);
    }

    @Test
    void joinGroupShouldReturnNullWhenUserIsAlreadyMember() {
        User user = new User();
        user.setUserId(1L);

        StudyGroup group = new StudyGroup();
        group.setGroupId(10L);

        GroupMembership membership = new GroupMembership();
        membership.setUser(user);
        membership.setStudyGroup(group);

        when(groupMembershipRepository.existsByUser_UserIdAndStudyGroup_GroupId(1L, 10L))
                .thenReturn(true);

        GroupMembership result = studyGroupService.joinGroup(membership);

        assertNull(result);

        verify(groupMembershipRepository, never()).save(any());
    }

    @Test
    void leaveGroupShouldDeleteAllMatchingMemberships() {
        GroupMembership membership1 = new GroupMembership();
        GroupMembership membership2 = new GroupMembership();

        when(groupMembershipRepository.findByUser_UserIdAndStudyGroup_GroupId(1L, 10L))
                .thenReturn(List.of(membership1, membership2));

        studyGroupService.leaveGroup(1L, 10L);

        verify(groupMembershipRepository).deleteAll(List.of(membership1, membership2));
    }

    @Test
    void getStudyGroupByIdShouldReturnGroup() {

        StudyGroup group = new StudyGroup();
        group.setGroupId(1L);
        group.setGroupName("Database Study Group");

        when(studyGroupRepository.findById(1L))
                .thenReturn(Optional.of(group));

        StudyGroup result =
                studyGroupService.getStudyGroupById(1L);

        assertNotNull(result);
        assertEquals("Database Study Group",
                result.getGroupName());
    }
}
