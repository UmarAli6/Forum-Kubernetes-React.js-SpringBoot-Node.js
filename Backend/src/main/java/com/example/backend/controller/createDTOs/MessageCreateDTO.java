package com.example.backend.controller.createDTOs;

import lombok.Data;

@Data
public class MessageCreateDTO {
    private String content;
    private Long senderId;
    private Long receiverId;
}
