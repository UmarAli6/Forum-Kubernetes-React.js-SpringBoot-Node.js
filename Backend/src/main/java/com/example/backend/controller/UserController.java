package com.example.backend.controller;

import com.example.backend.controller.createDTOs.UserCreateDTO;
import com.example.backend.controller.DTOs.UserDTO;
import com.example.backend.model.User;
import com.example.backend.services.UserService;

import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/user")
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = userService.getUsers();
        List<UserDTO> dtos = users
                .stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping(path = "get/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        UserDTO dto = modelMapper.map(user, UserDTO.class);
        return new ResponseEntity<UserDTO>(dto, HttpStatus.OK);
    }

    @PostMapping(path = "/registration")
    public ResponseEntity<?> createNewUser(@RequestBody UserCreateDTO userCreateDTO) {
        try {
            User newUser = modelMapper.map(userCreateDTO, User.class);
            User registeredUser = userService.addNewUser(newUser);
            return new ResponseEntity<UserDTO>(modelMapper.map(registeredUser, UserDTO.class), HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already taken");
        }
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody UserCreateDTO userCreateDTO) {
        User user = userService.loginUser(userCreateDTO.getName(), userCreateDTO.getPassword());
        if (user != null) {
            return new ResponseEntity<UserDTO>(modelMapper.map(user, UserDTO.class), HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Check login credentials");
        }
    }

    @GetMapping(path = "/inbox/get/{id}")
    public ResponseEntity<?> getInbox(@PathVariable Long id){
        List<User> messages = userService.getSenders(id);
        List<UserDTO> dtos = messages
                .stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}
