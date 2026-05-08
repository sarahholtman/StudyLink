package com.studylink.repository;

import com.studylink.model.GroupMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMembershipRepository extends JpaRepository<GroupMembership, Long> {

    List<GroupMembership> findByUser_UserId(Long userId);

    List<GroupMembership> findByStudyGroup_GroupId(Long groupId);
}