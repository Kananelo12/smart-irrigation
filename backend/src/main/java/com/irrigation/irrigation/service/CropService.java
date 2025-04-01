package com.irrigation.irrigation.service;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.irrigation.irrigation.model.Crop;
import com.irrigation.irrigation.repository.CropRepository;

import java.io.IOException;
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
    public String importDataFromExcel(MultipartFile file) {
        try {
            // Convert the MultipartFile to a FileInputStream to work with Apache POI
            Workbook workbook = new XSSFWorkbook(file.getInputStream());  // Use input stream from MultipartFile
            Sheet sheet = workbook.getSheetAt(0); // Reading the first sheet
            List<Crop> crops = new ArrayList<>();

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {  // Skip header row
                    continue;
                }

                // Create a new Crop object and populate its fields from the Excel data
                Crop crop = new Crop();
                crop.setName(row.getCell(0).getStringCellValue());  // Name from first column
                crop.setWaterRequirement(row.getCell(1).getNumericCellValue());  // Water requirement from second column
                crop.setTemperatureRequirement(row.getCell(2).getNumericCellValue());  // Temperature from third column
                crop.setHumidityRequirement(row.getCell(3).getNumericCellValue());  // Humidity from fourth column
                crop.setMoistureRequirement(row.getCell(4).getNumericCellValue()); // Moisture from fourth column
                crops.add(crop);
            }

            // Save all crops to the database
            cropRepository.saveAll(crops);
            return "Excel data imported successfully!";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error importing Excel data: " + e.getMessage();
        }
    }
    
}
