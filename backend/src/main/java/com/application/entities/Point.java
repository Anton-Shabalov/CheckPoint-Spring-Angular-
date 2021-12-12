package com.application.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "point_lab4")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private double x;
    private double y;
    private double r;
    private String income;
    private String userName;


    public Point() {}

    public Point(double x, double y, double r, String income, String userName) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.income = income;
        this.userName = userName;
    }

    @Override
    public String toString(){
        return "point{" + "x = " + x + ", y = " + y + ", r = " + r + "}";
    }

}

