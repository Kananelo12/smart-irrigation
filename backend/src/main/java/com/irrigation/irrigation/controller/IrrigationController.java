package com.irrigation.irrigation.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.irrigation.irrigation.model.SensorData;
import com.irrigation.irrigation.service.SensorSimulator;

@RestController
@RequestMapping("/api")
public class IrrigationController {

    @GetMapping("/irrigateData")
    public ResponseEntity<SensorData> simulateSensorData() {
        // Generate simulated sensor data
        SensorData sensorData = SensorSimulator.generateSensorData();
        return ResponseEntity.ok(sensorData);
    }
    
}
