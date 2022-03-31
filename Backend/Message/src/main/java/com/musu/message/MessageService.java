package com.musu.message;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public record MessageService(MessageRepository messageRepository) {

    public List<Message> getCorrespondence(Integer senderId, Integer receiverId) {
        List<Message> messages = messageRepository.getCorrespondence(senderId, receiverId);
        for (int i = messages.size() - 1; i > -1; i--) {
            Message m = messages.get(i);
            if (!m.isRead() && m.getReceiverId().equals(receiverId)) {
                m.setRead(true);
                messageRepository.save(m);
            } else {
                break;
            }
        }
        return messages;
    }

    public List<Message> getUnreadMessagesUsername(Integer receiverId) {
        return messageRepository.getMessagesUsername(receiverId);
    }

    public Message addNewMessage(String content, Integer senderId, String senderName, Integer receiverId) {
        Message message = Message.builder()
                .content(content)
                .createdAt(LocalDateTime.now())
                .senderId(senderId)
                .senderName(senderName)
                .isRead(false)
                .receiverId(receiverId).build();
        return messageRepository.save(message);
    }


}
