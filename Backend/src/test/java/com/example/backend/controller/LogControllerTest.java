package com.example.backend.controller;

import com.example.backend.controller.DTOs.LogDTO;
import com.example.backend.model.Log;
import com.example.backend.model.User;
import com.example.backend.services.LogService;
import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(LogController.class)
class LogControllerTest {

    @Autowired
    MockMvc mvc;

    @MockBean
    LogService mockLogService;

    User mockUser;


    List<Log> mockLogs = new ArrayList<>();

    @Test
    void shouldFindLogsByUserId() throws Exception {
        popLogs();
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        when(mockLogService.findLogsByUserId(anyLong())).thenReturn(mockLogs);

        MvcResult res = mvc.perform(MockMvcRequestBuilders.get("/api/v1/log/get/{id}", "1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        System.out.println(res.getResponse().getContentAsString());
    }

    private void popLogs() {
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setName("Steffar");
        for (int i = 0; i < 10; i++) {
            Log log = new Log("LOG " + (i + 1));
            log.setUser(mockUser);
            mockLogs.add(log);
        }
    }
}