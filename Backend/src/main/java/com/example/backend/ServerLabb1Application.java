package com.example.backend;

import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;
import org.modelmapper.ModelMapper;

@SpringBootApplication
@RestController
public class ServerLabb1Application {


    @Bean
    public ModelMapper modelMapper(){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper;
    }
    public static void main(String[] args) {
        SpringApplication.run(ServerLabb1Application.class, args);
    }


}
