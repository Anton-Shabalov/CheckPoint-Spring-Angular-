package com.application.services;

import com.application.entities.Point;
import com.application.repositories.PointRepository;
import com.application.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Slf4j
@Service
public class PointService {
    private final PointRepository pointRepository;

    private final Tool tool;
    public PointService(Tool tool,PointRepository pointRepository){
        this.pointRepository=pointRepository;
        this.tool=tool;

    }
    public ResponseEntity<String> check(Map<String, String> request){
        double x = Double.parseDouble(request.get("x"));
        double y = Double.parseDouble(request.get("y").replace(",", "."));
        double r = Double.parseDouble(request.get("r"));
        String checkValid= tool.checkValid(request,x,y,r);
        if (request.get("userName") == null){
            checkValid="unAUT";
        }
        if(checkValid.trim().length()==0){
            String userName = request.get("userName");
            String income;
            if(tool.hitCheck(x,y,r)){
                income="Попал";
            }else{
                income="Не попал";
            }

            pointRepository.save(new Point(x, y, r, income, userName));
            log.info("Запрос от  {} с данными {} был сохранен в базу", userName, new Point(x, y, r, income, userName));
            return new ResponseEntity<>("Ok", HttpStatus.OK);

        }else{

            log.error("Пришел запрос с ошибочными данными ");
            log.error(checkValid);
            return new ResponseEntity<>(checkValid, HttpStatus.BAD_REQUEST);

        }
    }
    public List<Point> getPoint(String userName){
        log.info("Обмновление таблицы результатов у пользователя {}", userName);
        return pointRepository.findByUserName(userName);
    }

    public void dellPoint(String userName){
        log.info("Пользователь {} запросил удаление всех точек", userName);
        pointRepository.deleteByUserName(userName);
        pointRepository.flush();

    }

}
