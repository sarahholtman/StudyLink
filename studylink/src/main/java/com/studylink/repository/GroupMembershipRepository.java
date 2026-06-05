package com.studylink.repository;

import com.studylink.model.GroupMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMembershipRepository extends JpaRepository<GroupMembership, Long> {

    List<GroupMembership> findByUser_UserId(Long userId);

    List<GroupMembership> findByStudyGroup_GroupId(Long groupId);

    List<GroupMembership> findByUser_UserIdAndStudyGroup_GroupId(Long userId, Long groupId);

    boolean existsByUser_UserIdAndStudyGroup_GroupId(Long userId, Long groupId);
}