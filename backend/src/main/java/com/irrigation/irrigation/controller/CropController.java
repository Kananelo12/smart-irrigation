package com.irrigation.irrigation.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.irrigation.irrigation.dto.CropRequest;
import com.irrigation.irrigation.model.Crop;
import com.irrigation.irrigation.repository.CropRepository;
import com.irrigation.irrigation.service.CropService;

import jakarta.validation.Valid;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CropController {

    private final CropService cropService;

    private final CropRepository cropRepository;

    @Autowired
    public CropController(CropRepository cropRepository, CropService cropService) {
        this.cropRepository = cropRepository;
        this.cropService = cropService;
    }

    @PostMapping("/addCrop")
    public ResponseEntity<?> addCrop(@RequestBody CropRequest cropRequest) {
        // check if crop already exists
        Optional<Crop> existingCrop = cropRepository.findByName(cropRequest.getName());
        if (existingCrop.isPresent()) {
            return new ResponseEntity<>("Crop already exists! Try again.", HttpStatus.BAD_REQUEST);
        }

        // create new crop entity
        Crop crop = new Crop();
        crop.setName(cropRequest.getName());
        crop.setTemperatureRequirement(cropRequest.getTemperature());
        crop.setWaterRequirement(cropRequest.getWaterRequirement());
        crop.setMoistureRequirement(cropRequest.getMoisture());
        crop.setHumidityRequirement(cropRequest.getHumidity());

        // save crop
        cropRepository.save(crop);

        // return success response
        return new ResponseEntity<>("Crop successfully added!", HttpStatus.CREATED);
    }
    @GetMapping("/getAllCrops")
    public ResponseEntity<?> getAllCrops() {
        try {
            List<Crop> crops = cropService.getAllCrops();

            // If crops are found, return them with a 200 OK status
            if (!crops.isEmpty()) {
                return ResponseEntity.ok(crops);
            } else {
                // If no crops are found, return an empty list with 204 No Content
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e) {
            // Handle any exceptions and return a 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving crops: " + e.getMessage());
        }
    }
    @DeleteMapping("/deleteCrop/{id}")
    public ResponseEntity<String> deleteCrop(@PathVariable Long id) {
        String response = cropService.deleteCrop(id);
        return ResponseEntity.ok(response);
    }
}
