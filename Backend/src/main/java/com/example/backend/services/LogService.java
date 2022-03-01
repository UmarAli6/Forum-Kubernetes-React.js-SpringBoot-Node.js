package com.example.backend.services;

import com.example.backend.model.Log;
import com.example.backend.model.User;
import com.example.backend.repository.LogRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class LogService {

    private final LogRepository logRepository;
    private final UserRepository userRepository;

    @Autowired
    public LogService(LogRepository logRepository, UserRepository userRepository) {
        this.logRepository = logRepository;
        this.userRepository = userRepository;
    }

    public Log addNewLog(String content, Long userId){
      Log newLog = new Log(content);
      newLog.setUser(userRepository.getById(userId));
      return logRepository.save(newLog);
    }

    public List<Log> findLogsByUserId(Long id){
        List<Log> logs = logRepository.findByUserId(id);
        return logs;
    }
}
