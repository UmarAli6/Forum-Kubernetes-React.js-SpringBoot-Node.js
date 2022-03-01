package com.example.backend.controller;

import com.example.backend.controller.DTOs.LogDTO;
import com.example.backend.controller.DTOs.MessageDTO;
import com.example.backend.controller.createDTOs.MessageCreateDTO;
import com.example.backend.model.Message;
import com.example.backend.services.MessageService;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("api/v1/message")
public class MessageController {

    private final MessageService messageService;
    private final ModelMapper modelMapper;

    public MessageController(MessageService messageService, ModelMapper modelMapper) {
        this.messageService = messageService;
        this.modelMapper = modelMapper;
    }

    @GetMapping(path = "/get/sender/{sId}/receiver/{rId}")
    public ResponseEntity<List<MessageDTO>> getCorrespondence(@PathVariable Long sId, @PathVariable Long rId) {
        List<Message> messages = messageService.getCorrespondence(sId, rId);
        List<MessageDTO> dtos = messages
                .stream()
                .map(message -> modelMapper.map(message, MessageDTO.class))
                .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping(path = "/create")
    public ResponseEntity<MessageDTO> createNewMessage(@RequestBody MessageCreateDTO messageCreateDTO) {
        Message msg = messageService.addNewMessage(
                messageCreateDTO.getContent(),
                messageCreateDTO.getSenderId(),
                messageCreateDTO.getReceiverId());
        return new ResponseEntity<>(modelMapper.map(msg, MessageDTO.class), HttpStatus.OK);
    }

}
