package com.irrigation.irrigation.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.irrigation.irrigation.dto.SensorDataDTO;
import com.irrigation.irrigation.model.Crop;
import com.irrigation.irrigation.model.User;
import com.irrigation.irrigation.repository.CropRepository;
import com.irrigation.irrigation.model.IrrigationData;
import java.util.Optional;

import com.irrigation.irrigation.model.SensorData;
import com.irrigation.irrigation.repository.IrrigationDataRepository;
import com.irrigation.irrigation.service.SensorSimulator;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class IrrigationController {

    private final IrrigationDataRepository irrigationDataRepository;
    private final CropRepository cropRepository;

    public IrrigationController(IrrigationDataRepository irrigationDataRepository, CropRepository cropRepository) {
        this.irrigationDataRepository = irrigationDataRepository;
        this.cropRepository = cropRepository;
    }

    @GetMapping("/irrigateData")
    public ResponseEntity<SensorData> simulateSensorData() {
        // Generate simulated sensor data
        SensorData sensorData = SensorSimulator.generateSensorData();
        return ResponseEntity.ok(sensorData);
    }
    @PostMapping("/storeSensorData")
    public ResponseEntity<String> storeSimulatedData(@RequestParam Long cropId, HttpSession session) {
        // Retrieve the logged-in user from session
        User user = (User) session.getAttribute("user");

        if (user == null) {
            return new ResponseEntity<>("User not logged in!", HttpStatus.UNAUTHORIZED);
        }

        // Generate simulated sensor data
        SensorData sensorData = SensorSimulator.generateSensorData();

        // Retrieve the crop from the database
        Optional<Crop> cropOptional = cropRepository.findById(cropId);
        if (cropOptional.isEmpty()) {
            return new ResponseEntity<>("Crop not found!", HttpStatus.BAD_REQUEST);
        }

        Crop crop = cropOptional.get();

        // Convert SensorData to IrrigationData
        IrrigationData irrigationData = new IrrigationData();
        irrigationData.setHumidity(sensorData.getHumidity());
        irrigationData.setTemperature(sensorData.getTemperature());
        irrigationData.setMoisture(sensorData.getMoisture());
        irrigationData.setCrop(crop);
        irrigationData.setUser(user); // Set the logged-in user

        // Save to database
        irrigationDataRepository.save(irrigationData);

        return new ResponseEntity<>("Sensor data stored successfully!", HttpStatus.CREATED);
    }
     
}
