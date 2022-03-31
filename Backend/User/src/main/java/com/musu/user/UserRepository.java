package com.musu.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<UserAccount, Integer> {
    UserAccount findUserAccountByNameAndPassword(String name, String password);

    List<UserAccount> findAllByIdIsNot(Integer id);
}
