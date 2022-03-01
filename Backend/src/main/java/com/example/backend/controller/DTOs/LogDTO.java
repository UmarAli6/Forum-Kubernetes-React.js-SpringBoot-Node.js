package com.example.backend.controller.DTOs;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LogDTO {
    private Long id;
    private LocalDateTime dateTime;
    private String content;
}
