package com.irrigation.irrigation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.irrigation.irrigation.model.Crop;
import com.irrigation.irrigation.repository.CropRepository;
import java.util.*;
@Service
public class CropService {
    @Autowired
    private CropRepository cropRepository;

    public List<Crop> getAllCrops() {
        return cropRepository.findAll();
    }
    // Method to delete a crop by ID
    public String deleteCrop(Long id) {
        // Check if crop exists before deletion
        Optional<Crop> crop = cropRepository.findById(id);
        if (crop.isPresent()) {
            cropRepository.deleteById(id);  // Delete the crop
            return "Crop with ID " + id + " has been deleted successfully.";
        } else {
            return "Crop with ID " + id + " not found.";
        }
    }
}
