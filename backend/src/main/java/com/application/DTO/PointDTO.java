package com.application.DTO;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;
@Data
public class PointDTO {
    @Null
    private Integer id;
    @NotEmpty
    private double x;
    @NotEmpty
    private double y;
    @NotEmpty
    private double r;
    @NotEmpty
    private String income;
    @NotEmpty
    private String userName;
}
