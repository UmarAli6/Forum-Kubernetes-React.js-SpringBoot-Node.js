package com.example.backend.services;

import com.example.backend.model.Message;
import com.example.backend.model.User;
import com.example.backend.repository.MessageRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    public List<Message> getCorrespondence(Long senderId, Long receiverId) {
        List<Message> list = messageRepository.getCorrespondence(senderId,receiverId);
        return list;
    }

    public Message addNewMessage(String content, Long senderId, Long receiverId) {
        Message newMessage = new Message(content);
        newMessage.setSender(userRepository.getById(senderId));
        newMessage.setReceiver(userRepository.getById(receiverId));
        return messageRepository.save(newMessage);
    }
}
