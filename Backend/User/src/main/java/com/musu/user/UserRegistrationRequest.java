package com.musu.user;

public record UserRegistrationRequest(
        String name,
        String password) {
}
