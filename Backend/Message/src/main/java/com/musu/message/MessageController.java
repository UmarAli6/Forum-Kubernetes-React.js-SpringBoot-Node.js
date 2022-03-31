package com.musu.message;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/messages")
public record MessageController(MessageService messageService) {

    @GetMapping(path = "/get/sender/{sId}/receiver/{rId}")
    public ResponseEntity<List<MessageGetResponse>> getCorrespondence(@PathVariable Integer sId, @PathVariable Integer rId) {
        List<Message> messages = messageService.getCorrespondence(sId, rId);
        List<MessageGetResponse> messageGetResponses = messages
                .stream()
                .map(message -> new MessageGetResponse(
                        message.getId(),
                        message.getCreatedAt(),
                        message.getContent(),
                        message.getSenderId(),
                        message.getSenderName()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(messageGetResponses, HttpStatus.OK);
    }

    @GetMapping(path = "/get/unread/{rId}")
    public ResponseEntity<List<UserUnreadMessageGetResponse>> getMessagesUsername(@PathVariable Integer rId) {
        List<Message> messages = messageService.getUnreadMessagesUsername(rId);
        List<UserUnreadMessageGetResponse> userUnreadMessageGetResponse = messages
                .stream()
                .map(message -> new UserUnreadMessageGetResponse(
                        message.getSenderId(),
                        message.getSenderName()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(userUnreadMessageGetResponse, HttpStatus.OK);
    }

    @PostMapping(path = "/create")
    public ResponseEntity<MessageGetResponse> createNewMessage(@RequestBody MessageCreationRequest messageCreationRequest) {
        Message message = messageService.addNewMessage(
                messageCreationRequest.content(),
                messageCreationRequest.senderId(),
                messageCreationRequest.senderName(),
                messageCreationRequest.receiverId());
        return new ResponseEntity<>(new MessageGetResponse(
                message.getId(),
                message.getCreatedAt(),
                message.getContent(),
                message.getSenderId(),
                message.getSenderName()), HttpStatus.OK);
    }
}
