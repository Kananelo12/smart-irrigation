package com.irrigation.irrigation.service;

import com.irrigation.irrigation.model.SensorData;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;

public class SensorSimulator {
    private static final Random random = new Random();

    /**
     * Generates simulated sensor data.
     * @return a SensorData instance with random values for humidity, moisture, and temperature.
     */
    public static SensorData generateSensorData() {
        double humidity = round(45 + random.nextDouble() * 70, 2);   // Random humidity between 30% and 100%
        double moisture = round(10 + random.nextDouble() * 90, 2);   // Random soil moisture between 10% and 100%
        double temperature = round(15 + random.nextDouble() * 5, 2); // Random temperature between 15°C and 20°C
        return new SensorData(humidity, moisture, temperature);
    }

    /**
     * Helper method to round a double value to the specified number of decimal places.
     * @param value the value to round.
     * @param places the number of decimal places.
     * @return the rounded value.
     */
    private static double round(double value, int places) {
        return new BigDecimal(value).setScale(places, RoundingMode.HALF_UP).doubleValue();
    }
}
