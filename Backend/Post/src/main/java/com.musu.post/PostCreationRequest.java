package com.musu.post;

public record PostCreationRequest(
        String content,
        Integer userId) {
}
