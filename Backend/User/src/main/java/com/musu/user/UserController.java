package com.musu.user;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/users")
public record UserController(UserService userService) {


    @GetMapping(path = "/{id}")
    public ResponseEntity<List<UserGetResponse>> getUsers(@PathVariable Integer id) {
        //TODO remove logged in user
        List<UserAccount> userAccounts = userService.getUserAccounts(id);
        List<UserGetResponse> userGetResponses = userAccounts
                .stream()
                .map(user -> new UserGetResponse(user.getId(), user.getName()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(userGetResponses, HttpStatus.OK);
    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<UserGetResponse> getUserById(@PathVariable Integer id) {
        UserAccount userAccount = userService.getUserAccountById(id);
        UserGetResponse userGetResponse = new UserGetResponse(userAccount.getId(), userAccount.getName());
        return new ResponseEntity<>(userGetResponse, HttpStatus.OK);
    }

    @PostMapping(path = "/registration")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationRequest userRegistrationRequest) {
        try {
            System.out.println("new user registration: " + userRegistrationRequest);
            UserAccount userAccount = userService.registerUser(userRegistrationRequest);
            UserGetResponse userGetResponse = new UserGetResponse(userAccount.getId(), userAccount.getName());
            return new ResponseEntity<>(userGetResponse, HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already taken");
        }
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody UserRegistrationRequest userRegistrationRequest) {
        UserAccount userAccount = userService.loginUserAccount(userRegistrationRequest.name(), userRegistrationRequest.password());
        if (userAccount != null) {
            UserGetResponse userGetResponse = new UserGetResponse(userAccount.getId(), userAccount.getName());
            return new ResponseEntity<>(userGetResponse, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Check login credentials");
        }
    }

}

