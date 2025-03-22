/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.irrigation.irrigation.SensorSimulator.src.sensorsimulator;
import java.util.Random;
import java.math.BigDecimal;
import java.math.RoundingMode;
/**
 *
 * @author polok
 */

public class SensorSimulator {
    private static final Random random = new Random();

    public static SensorData generateSensorData() {
        double humidity = round(30 + random.nextDouble() * 70, 2); // Random humidity between 30% and 100%
        double moisture = round(10 + random.nextDouble() * 90, 2); // Random soil moisture between 10% and 100%
        double temperature = round(15 + random.nextDouble() * 25, 2); // Random temperature between 15°C and 40°C

        return new SensorData(humidity, moisture, temperature);
    }

    // Helper method to round numbers to two decimal places
    private static double round(double value, int places) {
        return new BigDecimal(value).setScale(places, RoundingMode.HALF_UP).doubleValue();
    }
}

