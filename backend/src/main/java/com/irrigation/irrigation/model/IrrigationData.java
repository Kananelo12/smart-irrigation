package com.irrigation.irrigation.model;

import jakarta.persistence.*;

@Entity
@Table(name = "irrigationData")
public class IrrigationData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double temperature;

    @Column(nullable = false)
    private double humidity;

    @Column(nullable = false)
    private double moisture;

    @ManyToOne
    @JoinColumn(name = "crop_id", referencedColumnName = "id", nullable = false)
    private Crop crop; // Establishing relationship with Crop

    public IrrigationData() {
    }

    public IrrigationData(Long id, double temperature, double humidity, double moisture, Crop crop) {
        this.id = id;
        this.temperature = temperature;
        this.humidity = humidity;
        this.moisture = moisture;
        this.crop = crop;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getMoisture() {
        return moisture;
    }

    public void setMoisture(double moisture) {
        this.moisture = moisture;
    }

    public double getHumidity() {
        return humidity;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }

    public Crop getCrop() {
        return crop;
    }

    public void setCrop(Crop crop) {
        this.crop = crop;
    }

}
