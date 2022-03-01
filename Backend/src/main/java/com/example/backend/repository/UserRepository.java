package com.example.backend.repository;

import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByNameAndPassword(String name, String password);


    @Query("SELECT DISTINCT m.sender from Message m where m.receiver.id = ?1 ")
    List<User> getCorrespondents(Long receiverId);
}

