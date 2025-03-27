package com.irrigation.irrigation.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.irrigation.irrigation.dto.SensorDataDTO;
import com.irrigation.irrigation.model.IrrigationData;

import com.irrigation.irrigation.model.SensorData;
import com.irrigation.irrigation.repository.IrrigationDataRepository;
import com.irrigation.irrigation.service.SensorSimulator;

@RestController
@RequestMapping("/api")
public class IrrigationController {

    private final IrrigationDataRepository irrigationDataRepository;

    public IrrigationController(IrrigationDataRepository irrigationDataRepository) {
        this.irrigationDataRepository = irrigationDataRepository;
    }

    @GetMapping("/irrigateData")
    public ResponseEntity<SensorData> simulateSensorData() {
        // Generate simulated sensor data
        SensorData sensorData = SensorSimulator.generateSensorData();
        return ResponseEntity.ok(sensorData);
    }
    @PostMapping("/storeSensorData")
    public ResponseEntity<String> storeSimulatedData() {
        // Generate simulated sensor data
        SensorData sensorData = SensorSimulator.generateSensorData();

        // Convert SensorData to IrrigationData
        IrrigationData irrigationData = new IrrigationData();
        irrigationData.setHumidity(sensorData.getHumidity());
        irrigationData.setTemperature(sensorData.getTemperature());
        irrigationData.setMoisture(sensorData.getMoisture());
        irrigationData.setCrop(null);

        // Save to database
        irrigationDataRepository.save(irrigationData);

        return new ResponseEntity<>("Sensor data stored successfully!", HttpStatus.CREATED);
    }
     
}
