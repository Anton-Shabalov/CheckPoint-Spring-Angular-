package com.application.DTO;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
@Data
public class UserDTO {
    @Null
    private Long id;

    @Size(min = 4, max = 20)
    @NotEmpty
    private String username;

    @Size(min = 4)
    @NotEmpty
    private String password;
}
