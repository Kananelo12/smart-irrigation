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
    public ResponseEntity<?> getLatestIrrigationData(HttpSession session) {
        // Retrieve the logged-in user from the session
        User user = (User) session.getAttribute("loggedInUser");

        if (user == null) {
            return new ResponseEntity<String>("User not logged in!", HttpStatus.UNAUTHORIZED);
        }

        // Fetch the most recent irrigation data for the logged-in user
        IrrigationData latestIrrigationData = irrigationDataRepository
                .findTopByUserOrderByTimestampDesc(user);

        if (latestIrrigationData == null) {
            return new ResponseEntity<>("No irrigation data found for this user!", HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(latestIrrigationData);
    }
    @PostMapping("/storeSensorData")
    public ResponseEntity<String> storeSimulatedData(HttpSession session) {
        // Retrieve the logged-in user from session
        User user = (User) session.getAttribute("loggedInUser");

        if (user == null) {
            return new ResponseEntity<>("User not logged in!", HttpStatus.UNAUTHORIZED);
        }

        // Retrieve the crop the user is associated with from the user table
        Crop userCrop = user.getSelectedCrop(); // Assuming 'getSelectedCrop()' returns the crop the user is associated with

        if (userCrop == null) {
            return new ResponseEntity<>("User does not have an associated crop.", HttpStatus.BAD_REQUEST);
        }

        // Generate simulated sensor data
        SensorData sensorData = SensorSimulator.generateSensorData();

        // Convert SensorData to IrrigationData
        IrrigationData irrigationData = new IrrigationData();
        irrigationData.setHumidity(sensorData.getHumidity());
        irrigationData.setTemperature(sensorData.getTemperature());
        irrigationData.setMoisture(sensorData.getMoisture());
        irrigationData.setCrop(userCrop); // Use the crop associated with the user
        irrigationData.setUser(user); // Associate the user with the irrigation data

        // Save to database
        irrigationDataRepository.save(irrigationData);

        return new ResponseEntity<>("Sensor data stored successfully!", HttpStatus.CREATED);
    }
     
    @GetMapping("/irrigate")
    public ResponseEntity<?> irrigate(HttpSession session) {
        // Retrieve the logged-in user from session
        User user = (User) session.getAttribute("loggedInUser");

        if (user == null) {
            return new ResponseEntity<>("User not logged in!", HttpStatus.UNAUTHORIZED);
        }

        // Fetch the most recent irrigation data for the logged-in user
        IrrigationData latestIrrigationData = irrigationDataRepository
            .findTopByUserOrderByTimestampDesc(user);

        if (latestIrrigationData == null) {
            return new ResponseEntity<>("No irrigation data found for this user!", HttpStatus.NOT_FOUND);
        }

        IrrigationData irrigationData = latestIrrigationData;

        // Check the moisture level or other parameters (You can add more conditions)
        double moisture = irrigationData.getMoisture();

        // Example threshold for irrigation
        double moistureThreshold = 30.0; // Moisture below 30% means irrigation needed

        // Decision making
        if (moisture < moistureThreshold) {
            // Irrigate the plant (you can add any additional logic here)
            return new ResponseEntity<>("Irrigation needed. Irrigating the plant.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No irrigation needed. Moisture level is sufficient.", HttpStatus.OK);
        }
    }
}
