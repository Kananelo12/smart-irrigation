// TODO: not necessary
package com.irrigation.irrigation.dto;

import com.irrigation.irrigation.model.SensorData;
import java.time.format.DateTimeFormatter;

public class SensorDataDTO {
    private String timestamp;
    private double humidity;
    private double moisture;
    private double temperature;

    public SensorDataDTO(SensorData sensorData) {
        // Format the timestamp as an ISO string (or your preferred format)
        this.timestamp = sensorData.getTimestamp().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        this.humidity = sensorData.getHumidity();
        this.moisture = sensorData.getMoisture();
        this.temperature = sensorData.getTemperature();
    }

    // Getters and Setters

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public double getHumidity() {
        return humidity;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }

    public double getMoisture() {
        return moisture;
    }

    public void setMoisture(double moisture) {
        this.moisture = moisture;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }
}
