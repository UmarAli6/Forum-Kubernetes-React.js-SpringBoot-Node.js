package com.musu.message;

public record MessageCreationRequest(
        String content,
        Integer senderId,
        Integer receiverId,
        String senderName) {
}
