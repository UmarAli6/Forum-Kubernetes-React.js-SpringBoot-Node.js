package com.musu.post;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/posts")
public record PostController(PostService postService) {

    @PostMapping(path = "/create")
    public ResponseEntity<PostGetResponse> createNewPost(@RequestBody PostCreationRequest postCreationRequest) {
        Post post = postService.addNewPost(postCreationRequest.content(), postCreationRequest.userId());
        return new ResponseEntity<>(new PostGetResponse(post.getId(), post.getCreatedAt(), post.getContent()), HttpStatus.OK);
    }

    @GetMapping(path = "/get/{id}")
    public ResponseEntity<List<PostGetResponse>> postsByUserId(@PathVariable Integer id) {
        List<Post> posts = postService.getPostsByUserAccountId(id);
        List<PostGetResponse> postGetResponses = posts.stream()
                .map(post -> new PostGetResponse(post.getId(), post.getCreatedAt(), post.getContent()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(postGetResponses, HttpStatus.OK);
    }
}
