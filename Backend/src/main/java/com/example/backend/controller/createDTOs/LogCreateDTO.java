package com.example.backend.controller.createDTOs;

import com.example.backend.controller.DTOs.UserDTO;
import lombok.Data;

@Data
public class LogCreateDTO {

    private String content;
    private Long userId;
}
