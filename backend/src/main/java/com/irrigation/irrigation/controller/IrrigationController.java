package com.irrigation.irrigation.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.irrigation.irrigation.SensorSimulator.src.sensorsimulator.SensorData;
import com.irrigation.irrigation.SensorSimulator.src.sensorsimulator.SensorSimulator;
import com.irrigation.irrigation.dto.LoginRequest;

@RestController
@RequestMapping("/api")
public class IrrigationController {
    @PostMapping("/irrigateData")
    public ResponseEntity<?> irrigate(@RequestBody LoginRequest loginRequest) {
        SensorSimulator.generateSensorData();
        SensorData data = SensorSimulator.generateSensorData();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
    
}
