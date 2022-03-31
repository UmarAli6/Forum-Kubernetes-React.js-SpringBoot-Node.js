package com.musu.message;

import java.time.LocalDateTime;

public record MessageGetResponse(
        Integer id,
        LocalDateTime createdAt,
        String content,
        Integer senderId,
        String senderName) {
}
