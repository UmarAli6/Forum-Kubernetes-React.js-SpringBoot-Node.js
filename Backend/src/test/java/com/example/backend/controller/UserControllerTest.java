package com.example.backend.controller;

import com.example.backend.controller.createDTOs.UserCreateDTO;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.services.UserService;
import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    MockMvc mvc;

    @MockBean
    UserService mockUserService;

    @MockBean
    UserRepository mockUserRepository;

    @Test
    void shouldCreateNewUser() throws Exception {
        UserCreateDTO request = new UserCreateDTO();
        request.setName("Stefan");
        request.setPassword("123456");
        String userJson = new Gson().toJson(request);

        User user = new User();
        user.setId(1L);
        user.setName(request.getName());

        when(mockUserService.addNewUser(any(User.class))).thenReturn(user);

        mvc.perform(MockMvcRequestBuilders.post("/api/v1/user/registration")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(request.getName()));
    }

    @Test
    void shouldLoginAMockUser() throws Exception {
        User mockUser = new User();
        mockUser.setId(1L);
        mockUser.setName("Stefan");

        UserCreateDTO loginRequestObj = new UserCreateDTO();
        loginRequestObj.setName("Stefan");
        loginRequestObj.setPassword("123456");

        String jsonRequest = new Gson().toJson(loginRequestObj);

        when(mockUserService.loginUser(anyString(), anyString())).thenReturn(mockUser);

        MvcResult res = mvc.perform(MockMvcRequestBuilders.post("/api/v1/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andReturn();
        assertEquals(new Gson().toJson(mockUser), res.getResponse().getContentAsString());
    }
}