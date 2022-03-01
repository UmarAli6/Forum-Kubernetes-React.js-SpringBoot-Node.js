package com.example.backend.repository;

import com.example.backend.model.Message;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m " +
            "WHERE (m.sender.id = ?1 and m.receiver.id = ?2) " +
            "or (m.receiver.id = ?1 and m.sender.id = ?2)" +
            "ORDER BY m.dateTime asc ")
    List<Message> getCorrespondence(Long senderId, Long receiverId);
}
