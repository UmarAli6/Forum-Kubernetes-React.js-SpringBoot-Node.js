package com.example.backend.services;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.getById(id);
    }

    public User addNewUser(User user) throws DataIntegrityViolationException {
        return userRepository.save(user);
    }

    public User loginUser(String name, String password) {
        return userRepository.findUserByNameAndPassword(name, password);
    }

    public List<User> getSenders(Long receiverId){
        List<User> userList = userRepository.getCorrespondents(receiverId);
        Collections.reverse(userList);
        return userList;
    }
}
