package com.application.ConverterDTO;

import com.application.DTO.PointDTO;
import com.application.entities.Point;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class PointDtoToPoint {

   public Point PointDtoToPoint(PointDTO pointDTO){
       Point point=new Point();
       point.setX(pointDTO.getX());
       point.setY(pointDTO.getY());
       point.setR(pointDTO.getR());
       point.setIncome(pointDTO.getIncome());
       point.setUserName(pointDTO.getUserName());
       return point;
   }
}
