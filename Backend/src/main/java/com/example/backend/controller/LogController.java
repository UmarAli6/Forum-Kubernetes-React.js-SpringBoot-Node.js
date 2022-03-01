package com.example.backend.controller;

import com.example.backend.controller.DTOs.LogDTO;
import com.example.backend.model.Log;
import com.example.backend.services.LogService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/log")
public class LogController {

    private final LogService logService;
    private final ModelMapper modelMapper;

    public LogController(LogService logService, ModelMapper modelMapper){
        this.logService = logService;
        this.modelMapper = modelMapper;
    }

    @PostMapping(path = "/create")
    public ResponseEntity<LogDTO> createNewLog(@RequestBody LogDTO logCreateDTO){
        Log log = logService.addNewLog(logCreateDTO.getContent(), logCreateDTO.getId());
        return new ResponseEntity<>(modelMapper.map(log, LogDTO.class), HttpStatus.OK);
    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<List<LogDTO>> findLogsByUserId(@PathVariable Long id){
        List<Log> logs = logService.findLogsByUserId(id);
        List<LogDTO> dtos = logs
                .stream()
                .map(log -> modelMapper.map(log, LogDTO.class))
                .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}
