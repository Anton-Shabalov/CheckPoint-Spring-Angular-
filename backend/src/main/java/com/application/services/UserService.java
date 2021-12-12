package com.application.services;

import com.application.ConverterDTO.UserDtoToUser;
import com.application.DTO.UserDTO;
import com.application.entities.LoginResponse;
import com.application.entities.User;
import com.application.repositories.UserRepository;
import com.application.security.jwt.JwtUtils;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import javax.validation.Valid;

@Service
@Slf4j
public class UserService implements UserDetailsService {
    final AuthenticationManager authenticationManager;
    final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserDtoToUser userDtoToUser;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils,UserDtoToUser userDtoToUser) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userDtoToUser=userDtoToUser;

    }
    public ResponseEntity<String> login(UserDTO userDTO){
        try {
            log.debug("Запрос пользователя на авторизацию", userDTO);
            Gson gson = new Gson();
            Long userId = userRepository.findByUsername(userDtoToUser.UserDtoToUser(userDTO).getUsername()).getId();
            LoginResponse loginResponse = new LoginResponse(getUserToken(userDtoToUser.UserDtoToUser(userDTO)), userId);
            return new ResponseEntity<>(gson.toJson(loginResponse), HttpStatus.OK);
        } catch (BadCredentialsException e) {
            log.error("Пользователь попытался авторизироваться, но ввел не те данные}");
            return new ResponseEntity<>("Неверные учетные данные пользователя", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Проишошла беда, при попытке авторизироваться", e.getMessage());
            return new ResponseEntity<>("Неведанная ошибка", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> register(UserDTO userDTO){
        try {
            log.debug("Данные от пользователя", userDTO);
            boolean isSaved = this.saveUser(userDtoToUser.UserDtoToUser(userDTO));
            return isSaved ? new ResponseEntity<>("Вы успешно зарегистрировались", HttpStatus.OK) :
                    new ResponseEntity<>("Пользователь с таким именем уже запегистрирован", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Проишошла беда, при попытке авторизироваться", e.getMessage());
            return new ResponseEntity<>("Проишошла беда, при попытке авторизироваться", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    @Transactional
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Нет пользователя в базе");
        }
        return user;
    }

    public boolean saveUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return false;
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return true;
    }

    public String getUserToken(User user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtUtils.generateJwtToken(authentication);
    }
}
