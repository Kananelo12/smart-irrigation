package com.irrigation.irrigation.model;

import java.time.LocalDateTime;

public class SensorData {
    private LocalDateTime timestamp;
    private double humidity;
    private double moisture;
    private double temperature;

    public SensorData(double humidity, double moisture, double temperature) {
        this.timestamp = LocalDateTime.now();
        this.humidity = humidity;
        this.moisture = moisture;
        this.temperature = temperature;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public double getHumidity() {
        return humidity;
    }

    public double getMoisture() {
        return moisture;
    }

    public double getTemperature() {
        return temperature;
    }

    @Override
    public String toString() {
        return "Timestamp: " + timestamp + ", Humidity: " + humidity +
                "%, Moisture: " + moisture + "%, Temperature: " + temperature + "°C";
    }
}
