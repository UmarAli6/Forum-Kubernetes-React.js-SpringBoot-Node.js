package com.musu.post;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public record PostService(PostRepository postRepository) {

    public Post addNewPost(String content, Integer userAccountId) {
        Post post = Post.builder()
                .content(content)
                .userAccountId(userAccountId)
                .createdAt(LocalDateTime.now()).build();
        return postRepository.save(post);
    }

    public List<Post> getPostsByUserAccountId(Integer userAccountId) {
        try {
            return postRepository.findByUserAccountId(userAccountId);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
