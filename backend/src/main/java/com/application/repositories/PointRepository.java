package com.application.repositories;

import com.application.entities.Point;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Integer> {
    List<Point> findByUserName(String userName);
    void deleteByUserName(String userName);
}
