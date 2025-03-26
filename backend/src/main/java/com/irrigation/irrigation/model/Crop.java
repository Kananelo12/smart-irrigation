package com.irrigation.irrigation.model;

import jakarta.persistence.*;

@Entity
@Table(name = "crops")
public class Crop {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private double waterRequirement;

    @Column(nullable = false)
    private double temperatureRequirement;

    @Column(nullable = false)
    private double humidityRequirement;

    @Column(nullable = false)
    private double moistureRequirement;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user; // Establishing relationship with User

    // Constructors
    public Crop() {
    }

    public Crop(Long id, String name, double waterRequirement, double temperatureRequirement, double humidityRequirement, double moistureRequirement, User user) {
        this.id = id;
        this.name = name;
        this.waterRequirement = waterRequirement;
        this.temperatureRequirement = temperatureRequirement;
        this.humidityRequirement = humidityRequirement;
        this.moistureRequirement = moistureRequirement;
        this.user = user;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getWaterRequirement() {
        return waterRequirement;
    }

    public void setWaterRequirement(double waterRequirement) {
        this.waterRequirement = waterRequirement;
    }

    public double getTemperatureRequirement() {
        return temperatureRequirement;
    }

    public void setTemperatureRequirement(double temperatureRequirement) {
        this.temperatureRequirement = temperatureRequirement;
    }

    public double getHumidityRequirement() {
        return humidityRequirement;
    }

    public void setHumidityRequirement(double humidityRequirement) {
        this.humidityRequirement = humidityRequirement;
    }

    public double getmoistureRequirement() {
        return moistureRequirement;
    }

    public void setmoistureRequirement(double moistureRequirement) {
        this.moistureRequirement = moistureRequirement;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

