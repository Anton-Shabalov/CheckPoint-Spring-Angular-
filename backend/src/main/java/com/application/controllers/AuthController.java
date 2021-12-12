package com.application.controllers;


import com.application.DTO.UserDTO;
import com.application.entities.LoginResponse;
import com.application.entities.User;
import com.application.repositories.UserRepository;
import com.application.services.UserService;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@Slf4j
@RestController
public class AuthController {
    private final UserService userService;



    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserDTO userDTO) {
    return userService.register(userDTO);
    }
    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid UserDTO userDTO) {
        return userService.login(userDTO);
    }
}
