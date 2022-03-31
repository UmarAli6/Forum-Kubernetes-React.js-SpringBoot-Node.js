package com.musu.post;

import java.time.LocalDateTime;

public record PostGetResponse(
        Integer id,
        LocalDateTime createdAt,
        String content) {
}
