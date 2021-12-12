package com.application.ConverterDTO;

import com.application.DTO.UserDTO;
import com.application.entities.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class UserDtoToUser {



    public User UserDtoToUser(UserDTO userDTO){
        User user=new User();
        user.setPassword(userDTO.getPassword());
        user.setUsername(userDTO.getUsername());
        return user;
    }
}
