package com.musu.message;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Query(value = "SELECT * FROM message m " +
            "WHERE (m.sender_id = ?1 and m.receiver_id = ?2) " +
            "or (m.receiver_id = ?1 and m.sender_id = ?2) " +
            "ORDER BY m.created_at asc ",
            nativeQuery = true)
    List<Message> getCorrespondence(Integer senderId, Integer receiverId);

    @Query(value = "SELECT DISTINCT ON (m.sender_id) * FROM message m WHERE m.receiver_id = ?1 AND m.is_read = false",
            nativeQuery = true)
    List<Message> getMessagesUsername(Integer receiverId);
}
