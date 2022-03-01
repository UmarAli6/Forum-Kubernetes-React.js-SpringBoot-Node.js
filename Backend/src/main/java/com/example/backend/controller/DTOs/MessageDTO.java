package com.example.backend.controller.DTOs;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDTO {

    private Long id;
    private LocalDateTime dateTime;
    private String content;
    private UserDTO sender;
}
